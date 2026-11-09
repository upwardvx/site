#!/usr/bin/env python3
"""Fail when a page in public/ links to a local file or anchor that doesn't exist."""
import pathlib
import sys
from html.parser import HTMLParser
from urllib.parse import unquote, urlsplit

ROOT = pathlib.Path("public").resolve()
LINK_ATTRS = {"href", "src", "poster"}


class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.links, self.ids = [], set()

    def handle_starttag(self, tag, attrs):
        for name, value in attrs:
            if value is None:
                continue
            if name in LINK_ATTRS:
                self.links.append(value.strip())
            elif name == "srcset":
                self.links += [part.split()[0] for part in value.split(",") if part.strip()]
            elif name == "id" or (name == "name" and tag == "a"):
                self.ids.add(value)


def parse(path):
    page = Page()
    page.feed(path.read_text(encoding="utf-8"))
    return page


def resolve(path):
    """Return the file a server would send for this path, or None."""
    if path.is_file():
        return path
    for candidate in (path / "index.html", path.with_name(path.name + ".html")):
        if candidate.is_file():
            return candidate
    return None


def main():
    pages = sorted(ROOT.rglob("*.html"))
    if not pages:
        print("No HTML files found in public/")
        return 1
    parsed = {page: parse(page) for page in pages}
    problems = []
    for page, data in parsed.items():
        for link in data.links:
            parts = urlsplit(link)
            if parts.scheme or parts.netloc or not (parts.path or parts.fragment):
                continue
            where = page.relative_to(ROOT)
            if parts.path.startswith("/"):
                target = ROOT / unquote(parts.path).lstrip("/")
            elif parts.path:
                target = page.parent / unquote(parts.path)
            else:
                target = page
            target = target.resolve()
            if not target.is_relative_to(ROOT):
                problems.append(f"{where}: {link} points outside public/")
                continue
            found = resolve(target)
            if found is None:
                problems.append(f"{where}: {link} does not exist")
            elif parts.fragment and found.suffix == ".html":
                ids = parsed[found].ids if found in parsed else set()
                if unquote(parts.fragment) not in ids and parts.fragment != "top":
                    problems.append(f"{where}: {link} has no matching anchor")
    for problem in problems:
        print(problem)
    print(f"Checked {len(pages)} pages, {len(problems)} problems")
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main())
