#!/usr/bin/env python3
"""Fail if the Larkspur copy on /plumbing no longer matches the site export.

The three drafts, the disputed-invoice card and the proof line are copied by
hand from agent-fleet/site-exports/<run date>/larkspur/. Nothing reads the
export at build time, so this script is the only thing that notices drift.

    python3 scripts/check-plumbing-drafts.py
    python3 scripts/check-plumbing-drafts.py --export /path/to/larkspur

Export lookup: --export, then $LARKSPUR_EXPORT_DIR, then the newest
../agent-fleet/site-exports/*/larkspur next to this repo or its main
checkout (so it works from a git worktree). Standard library only.

Only typography is normalised before comparing: non-breaking spaces become
spaces and curly quotes become straight ones. Words, numbers and order must
match exactly.
"""
import argparse
import json
import os
import re
import subprocess
import sys
from datetime import date
from html.parser import HTMLParser
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
PAGE = REPO / "public" / "plumbing" / "index.html"
VOID = {"br", "hr", "img", "meta", "link", "input", "source", "wbr"}


class Node:
    def __init__(self, tag, attrs, parent):
        self.tag, self.attrs, self.parent, self.kids = tag, dict(attrs), parent, []

    def classes(self):
        return (self.attrs.get("class") or "").split()

    def walk(self):
        for k in self.kids:
            if isinstance(k, Node):
                yield k
                yield from k.walk()

    def find_all(self, tag=None, cls=None, **attrs):
        for n in self.walk():
            if tag and n.tag != tag:
                continue
            if cls and cls not in n.classes():
                continue
            if any(n.attrs.get(k.replace("_", "-")) != v for k, v in attrs.items()):
                continue
            yield n

    def text(self):
        out = []
        for k in self.kids:
            if isinstance(k, str):
                out.append(re.sub(r"\s+", " ", k))
            elif k.tag == "br":
                out.append("\n")
            else:
                out.append(k.text())
        return "".join(out)


class Tree(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = Node("root", {}, None)
        self.cur = self.root

    def handle_starttag(self, tag, attrs):
        n = Node(tag, attrs, self.cur)
        self.cur.kids.append(n)
        if tag not in VOID:
            self.cur = n

    def handle_startendtag(self, tag, attrs):
        self.cur.kids.append(Node(tag, attrs, self.cur))

    def handle_endtag(self, tag):
        n = self.cur
        while n is not self.root and n.tag != tag:
            n = n.parent
        if n is not self.root:
            self.cur = n.parent

    def handle_data(self, data):
        self.cur.kids.append(data)


def norm(s):
    s = s.replace(" ", " ").replace("’", "'").replace("‘", "'")
    s = s.replace("“", '"').replace("”", '"')
    return "\n".join(re.sub(r" +", " ", line).strip() for line in s.split("\n")).strip()


def money(n):
    return f"${n:,}"


def short_date(iso):
    d = date.fromisoformat(iso)
    return f"{d:%b} {d.day}"


def find_export(arg):
    if arg:
        return Path(arg)
    if os.environ.get("LARKSPUR_EXPORT_DIR"):
        return Path(os.environ["LARKSPUR_EXPORT_DIR"])
    roots = {REPO.parent}
    try:
        common = subprocess.check_output(
            ["git", "rev-parse", "--path-format=absolute", "--git-common-dir"],
            cwd=REPO, text=True, stderr=subprocess.DEVNULL).strip()
        roots.add(Path(common).parent.parent)
    except Exception:
        pass
    found = sorted(p for r in roots for p in (r / "agent-fleet" / "site-exports").glob("*/larkspur")
                   if (p / "index.json").exists())
    if not found:
        sys.exit("No export found. Pass --export DIR or set LARKSPUR_EXPORT_DIR "
                 "(agent-fleet/site-exports/<date>/larkspur).")
    return max(found, key=lambda p: p.parent.name)


failures = []


def check(label, got, want):
    if got == want:
        print(f"  ok    {label}")
    else:
        print(f"  FAIL  {label}\n          page:   {got!r}\n          export: {want!r}")
        failures.append(label)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--export", help="export directory (…/site-exports/<date>/larkspur)")
    ap.add_argument("--page", default=str(PAGE))
    args = ap.parse_args()
    export = find_export(args.export)
    print(f"page:   {args.page}\nexport: {export}")

    t = Tree()
    t.feed(Path(args.page).read_text())
    index = json.loads((export / "index.json").read_text())
    ev, run, as_of = index["eval"], index["run_date"], index["as_of"]

    print("proof line")
    proof = list(t.root.find_all("p", cls="proof"))
    check("one proof line", len(proof), 1)
    if proof:
        check("proof text", norm(proof[0].text()),
              f"Live test: {ev['cases_passed']} of {ev['cases_total']} cases passed "
              f"({short_date(ev['date'])}), run on records as of {short_date(as_of)}")

    intro = list(t.root.find_all("p", cls="drafts-intro"))
    check("drafts intro names the run date", bool(intro) and f"test run on {short_date(run)}" in norm(intro[0].text()), True)

    articles = list(t.root.find_all("article", cls="draft"))
    check("articles on the page", [a.attrs.get("data-export") for a in articles],
          ["b-paid-part-of-it.json", "d-eleven-year-customer.json", "c-disputed.json"])

    for art in articles:
        name = art.attrs.get("data-export")
        print(name)
        d = json.loads((export / name).read_text())
        check("export run date and eval match index", (d["run_date"], d["eval"], d["as_of"]), (run, ev, as_of))
        f = {n.attrs["data-f"]: norm(n.text()) for n in art.find_all() if "data-f" in n.attrs}
        inv_id = art.attrs.get("data-invoice")
        if inv_id is None:
            # a drafted message
            check("exactly one draft", len(d["drafts"]), 1)
            dr, mi = d["drafts"][0], d["model_input"]["invoices"][0]
            check("flagged_for_owner and dropped_by_checks empty", (d["flagged_for_owner"], d["dropped_by_checks"]), ([], []))
            want = {
                "channel": dr["channel"], "invoice_id": dr["invoice_id"], "customer": mi["customer"],
                "balance": money(mi["balance"]), "days_overdue": str(mi["days_overdue"]),
                "subject": dr["subject"], "reason": dr["reason"],
                "body": "\n\n".join(norm(p) for p in dr["body"].split("\n\n")),
            }
            check("invoice id matches model input", dr["invoice_id"], mi["id"])
            body = art.find_all(**{"data_f": "body"})
            paras = [norm(p.text()) for n in body for p in n.find_all("p")]
            f["body"] = "\n\n".join(paras)
            for k, v in want.items():
                check(k, f.get(k), norm(v))
        else:
            # a held invoice: no draft, shown from the records
            rec = next(i for i in d["records"]["invoices"] if i["id"] == inv_id)
            cust = next(c for c in d["records"]["customers"] if c["id"] == rec["customer_id"])
            check("no draft for the held invoice", [x for x in d["drafts"] if x["invoice_id"] == inv_id], [])
            check("held invoice is marked disputed", rec["disputed"], True)
            check("held invoice has no payment and no reminder",
                  ([p for p in d["records"].get("payments", []) if p["invoice_id"] == inv_id], rec["last_reminded_on"], rec["prior_reminders"]),
                  ([], None, 0))
            want = {"invoice_id": rec["id"], "customer": cust["name"], "amount": money(rec["amount_due"]),
                    "due_on": short_date(rec["due_on"]), "note": rec["last_customer_note"]}
            for k, v in want.items():
                check(k, f.get(k), norm(v))
            skip = list(art.find_all("p", cls="skip"))
            check("skip label", norm(skip[0].text()) if skip else None, "Skipped: the customer disputes the invoice")

    print()
    if failures:
        print(f"{len(failures)} mismatch(es). Re-copy from the export, or update the page text to match.")
        sys.exit(1)
    print("page matches the export")


main()
