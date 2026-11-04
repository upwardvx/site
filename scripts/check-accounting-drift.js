#!/usr/bin/env node
/* Fail if /accounting no longer matches the Hollis & Wren site export.

   The page is static HTML with every scenario written into it (the tabs are
   progressive JS), so this reads the HTML as served, before any script runs.

     node scripts/check-accounting-drift.js <export dir> [page]
     node scripts/check-accounting-drift.js ../agent-fleet/site-exports/2026-10-20/hollis-wren

   <export dir> holds index.json and one JSON per scenario. [page] defaults to
   public/accounting/index.html. No dependencies. Exits 1 on any mismatch.
   The rules mirror check-plumbing-drift.js:

   Draft text, subjects and reasons must match the export exactly: no
   paraphrase, no curly quotes, no non-breaking spaces. Every scenario in
   index.json must be on the page except the ones named in SKIP below, in
   page order: document chases first, then the Monday brief, then prior-year
   fee reminders (ROUTINE_ORDER), keeping the export's order inside each.
   Every dollar figure, invoice, client, return and document ID, date, day
   count and tax form (W-2, 1099-B and so on) inside a scenario must appear
   in that scenario's export; outside the scenarios (hero, pain lines) they
   must appear in some export file. The price section is not export data and
   is skipped.

   Held items: if the export lists "held" items (a client or invoice the firm
   must handle, so no draft is written), each must be on the page as a
   data-held block with the export's reason verbatim in data-f="held-reason",
   and no draft may exist for it. An export with no "held" key falls back to
   disputed invoices in a fee-reminder run.

   No-draft scenarios: when there is no draft (everything held, or nothing
   due, like a return on extension), no draft checks ran. The scenario must
   have no checks panel (no checks summary, no check rows); a plain line
   saying so is fine.

   SKIP: scenarios that are in the export but deliberately not on the page.
   Each is named here with a reason, is reported on every run, and fails if
   it shows up on the page (so a skip can't go stale). Adding a scenario to
   the page means deleting its entry. */
'use strict';
const fs = require('fs');
const path = require('path');

const [expArg, pageArg] = process.argv.slice(2);
if (!expArg) {
  console.error('usage: node scripts/check-accounting-drift.js <export dir> [page]');
  process.exit(2);
}
const SKIP = {
  e: 'Monday brief: in the 2026-10-20 export it fails "Does not read the spike as the firm falling behind" on its own negated line (fixed in hollis-wren-tax-demo #8); add it from the next export',
};
const ROUTINE_ORDER = ['weekly-missing-docs-chase', 'monday-firm-brief', 'weekly-prior-year-fee-reminder'];
const FIRM = 'Hollis & Wren Tax';
const EXP = path.resolve(expArg);
const PAGE = path.resolve(pageArg || path.join(__dirname, '..', 'public', 'accounting', 'index.html'));

/* ---- a small HTML tree ---- */
const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
const RAW = new Set(['script', 'style']);
const NAMED = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: '\u00a0' };
function decode(s) {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => {
    if (e[0] === '#') return String.fromCodePoint(e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10));
    if (!(e.toLowerCase() in NAMED)) throw new Error('unknown entity ' + m);
    return NAMED[e.toLowerCase()];
  });
}
function parse(html) {
  const root = { tag: '#root', attrs: {}, kids: [], parent: null };
  let cur = root, i = 0;
  const re = /<!--[\s\S]*?-->|<!doctype[^>]*>|<\/?([a-zA-Z][\w-]*)((?:\s+[^\s=>\/]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?)*)\s*\/?>/gi;
  let m;
  while ((m = re.exec(html))) {
    if (m.index > i) cur.kids.push(decode(html.slice(i, m.index)));
    i = re.lastIndex;
    if (!m[1]) continue; // comment or doctype
    const tag = m[1].toLowerCase();
    if (m[0][1] === '/') {
      let n = cur;
      while (n !== root && n.tag !== tag) n = n.parent;
      if (n !== root) cur = n.parent;
      continue;
    }
    const attrs = {};
    (m[2] || '').replace(/([^\s=>\/]+)(?:\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+)))?/g, (x, k, v, a, b, c) => {
      attrs[k.toLowerCase()] = v === undefined ? '' : decode(a !== undefined ? a : b !== undefined ? b : c);
    });
    const node = { tag, attrs, kids: [], parent: cur };
    cur.kids.push(node);
    if (RAW.has(tag)) {
      const end = html.toLowerCase().indexOf('</' + tag, i);
      node.kids.push(html.slice(i, end));
      i = end;
      re.lastIndex = end;
      continue;
    }
    if (!VOID.has(tag) && !m[0].endsWith('/>')) cur = node;
  }
  if (i < html.length) cur.kids.push(decode(html.slice(i)));
  return root;
}
function* walk(n) { for (const k of n.kids) if (typeof k !== 'string') { yield k; yield* walk(k); } }
const cls = n => (n.attrs.class || '').split(/\s+/);
const all = (n, pred) => [...walk(n)].filter(pred);
function text(n) {
  if (typeof n === 'string') return n;
  if (RAW.has(n.tag)) return '';
  return n.kids.map(text).join('');
}
const flat = n => text(n).replace(/\s+/g, ' ').trim();
// For sweeps: separate every element's text so adjacent cells never run together.
function spaced(n) {
  if (typeof n === 'string') return n;
  if (RAW.has(n.tag)) return ' ';
  return ' ' + n.kids.map(spaced).join(' ') + ' ';
}
const words = n => spaced(n).replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();
// Labels only (titles, check names): typography may differ from the export.
const loose = s => s.replace(/[\u2018\u2019]/g, "'").replace(/[\u201c\u201d]/g, '').replace(/\u2011/g, '-').replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();

/* ---- reporting ---- */
let fails = 0, oks = 0;
function eq(label, got, want) {
  const same = JSON.stringify(got) === JSON.stringify(want);
  if (same) { oks++; return true; }
  fails++;
  console.log('  FAIL  ' + label + '\n          page:   ' + JSON.stringify(got) + '\n          export: ' + JSON.stringify(want));
  return false;
}
function ok(label, cond, detail) {
  if (cond) { oks++; return true; }
  fails++;
  console.log('  FAIL  ' + label + (detail ? '\n          ' + detail : ''));
  return false;
}

/* ---- load ---- */
const readJson = f => JSON.parse(fs.readFileSync(path.join(EXP, f), 'utf8'));
const html = fs.readFileSync(PAGE, 'utf8');
const doc = parse(html);
const index = readJson('index.json');
const ev = index.eval;
const evPassed = ev && (ev.passed !== undefined ? ev.passed : ev.cases_passed);
const evTotal = ev && (ev.total !== undefined ? ev.total : ev.cases_total);
for (const k of ['run_date', 'as_of', 'eval', 'scenarios']) if (!index[k]) {
  console.error('index.json has no "' + k + '": not a site export this script understands (' + EXP + ')');
  process.exit(1);
}
const exportsByLetter = {};
const allJsonText = [];
for (const s of index.scenarios) {
  const d = readJson(s.file);
  exportsByLetter[s.scenario] = d;
  allJsonText.push(JSON.stringify(d));
}
console.log('page:   ' + path.relative(process.cwd(), PAGE));
console.log('export: ' + EXP + ' (run ' + index.run_date + ', ' + index.scenarios.length + ' scenarios)');

const M = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const md = iso => { const p = iso.split('-').map(Number); return M[p[1] - 1] + ' ' + p[2]; };

/* ---- figures: what may appear on the page ---- */
function numbersIn(v, out = new Set()) {
  if (typeof v === 'number') out.add(v);
  else if (typeof v === 'string') (v.match(/\d[\d,]*/g) || []).forEach(x => out.add(Number(x.replace(/,/g, ''))));
  else if (v && typeof v === 'object') Object.values(v).forEach(x => numbersIn(x, out));
  return out;
}
const FIG = [
  { kind: 'dollar figure', re: /\$\d[\d,]*/g, val: s => Number(s.slice(1).replace(/,/g, '')), inNums: true },
  { kind: 'ID', re: /\b(?:INV|CL|TR|DOC)-\d+\b/g, val: s => s },
  { kind: 'tax form', re: /\b(?:W-2|1098(?:-[A-Z]+)?|1099-[A-Z]+)\b/g, val: s => s },
  { kind: 'date', re: /\b20\d\d-\d\d-\d\d\b/g, val: s => s },
  { kind: 'day count', re: /\b(\d+) days\b/g, val: s => Number(s.split(' ')[0]), inNums: true },
];
function sweep(label, str, jsonTexts, nums) {
  let n = 0;
  str = str.replace(/[\u2010\u2011]/g, '-');
  for (const f of FIG) for (const m of str.match(f.re) || []) {
    const v = f.val(m);
    n++;
    ok(label + ': ' + f.kind + ' ' + m + ' is in the export', f.inNums ? nums.has(v) : jsonTexts.some(t => t.includes(v)));
  }
  return n;
}

/* ---- no placeholders anywhere in the file ---- */
console.log('placeholders');
const ph = html.match(/TODO|CONFIRM|PLACEHOLDER|FIXME|lorem ipsum|\{\{\w+\}\}/gi);
eq('no TODO / CONFIRM / placeholder markers', ph || [], []);

/* ---- proof line: the sample label and the eval result in one line ---- */
console.log('proof line');
const proof = all(doc, n => 'data-proof' in n.attrs);
eq('one proof line', proof.length, 1);
// "all N test cases passed" is only true when the eval passed every case.
eq('eval passed every case (' + evPassed + ' of ' + evTotal + ')', evPassed, evTotal);
eq('eval date is the run date', ev.date, index.run_date);
if (proof[0]) eq('proof text', flat(proof[0]).replace(/\u00a0/g, ' '),
  'Sample: ' + FIRM + ' and its clients are made up, and no real taxpayer data is used. The drafts are unedited AI output from a test run on ' +
  md(ev.date) + ', ' + ev.date.slice(0, 4) + ', where all ' + evTotal + ' test cases passed.');
ok('proof line is labelled as a sample', proof[0] && cls(proof[0]).includes('sample'));

/* ---- scenarios present, in order ---- */
console.log('scenarios');
const arts = all(doc, n => n.tag === 'article' && 'data-scenario' in n.attrs);
for (const s of index.scenarios) ok('scenario ' + s.scenario + ' routine ' + s.routine + ' has a place in ROUTINE_ORDER', ROUTINE_ORDER.includes(s.routine));
const shown = index.scenarios.filter(s => !(s.scenario in SKIP))
  .map((s, i) => [s, i]).sort((a, b) => ROUTINE_ORDER.indexOf(a[0].routine) - ROUTINE_ORDER.indexOf(b[0].routine) || a[1] - b[1]).map(x => x[0]);
for (const s of index.scenarios) if (s.scenario in SKIP) {
  console.log('  SKIP  ' + s.scenario + ' ' + s.slug + ': ' + SKIP[s.scenario]);
  ok('skipped scenario ' + s.scenario + ' is not on the page (remove it from SKIP if it is)', !arts.some(a => a.attrs['data-scenario'] === s.scenario));
}
for (const k of Object.keys(SKIP)) ok('SKIP entry ' + k + ' names a scenario in the export', index.scenarios.some(s => s.scenario === k));
eq('scenarios on the page, in page order', arts.map(a => a.attrs['data-scenario'] + ':' + a.attrs['data-export']),
  shown.map(s => s.scenario + ':' + s.file));
const tabs = all(doc, n => n.attrs.role === 'tab');
eq('tab titles', tabs.map(t => loose(flat(all(t, n => cls(n).includes('tt'))[0] || t))), shown.map(s => loose(s.title)));

for (const s of shown) {
  const d = exportsByLetter[s.scenario];
  const art = arts.find(a => a.attrs['data-scenario'] === s.scenario);
  console.log(s.scenario + ' ' + s.slug);
  if (!ok('on the page', !!art)) continue;
  eq('export matches index run, eval and as-of', [d.run_date, d.eval, d.as_of], [index.run_date, ev, index.as_of]);
  eq('every check in the export passed', d.checks.filter(c => !c.passed).map(c => c.name), []);
  eq('nothing dropped by the checks', d.dropped_by_checks, []);
  const f = (n, k) => all(n, x => x.attrs['data-f'] === k);
  const pageDrafts = all(art, n => 'data-draft' in n.attrs);
  const isBrief = !Array.isArray(d.drafts);

  if (isBrief) {
    eq('one brief', pageDrafts.length, 1);
    const pd = pageDrafts[0];
    if (pd) {
      eq('brief lines, verbatim', f(pd, 'p').map(text), d.drafts.lines);
      eq('worth a look, verbatim', f(pd, 'look').map(text), [d.drafts.look_at.why]);
    }
  } else {
    eq('drafts on the page', pageDrafts.map(n => n.attrs['data-draft']).sort(), d.drafts.map(x => x.client_id || x.invoice_id).sort());
    for (const dr of d.drafts) {
      const id = dr.client_id || dr.invoice_id;
      const pd = pageDrafts.find(n => n.attrs['data-draft'] === id);
      if (!pd) continue;
      eq(id + ' channel', pd.attrs['data-channel'], dr.channel);
      eq(id + ' body, verbatim', f(pd, 'p').map(text).join('\n\n'), dr.body);
      // Email subjects are shown verbatim; a text message has no subject line on the page.
      eq(id + ' subject, verbatim', f(pd, 'subject').map(text), dr.channel === 'email' && dr.subject ? [dr.subject] : []);
    }
    const reasons = f(art, 'reason').map(text);
    eq('reasons, verbatim', reasons.slice().sort(), d.drafts.map(x => x.reason).sort());
  }

  // Held items (disputed invoices, price questions) are shown with the export's reason and never drafted.
  // Older exports have no "held" key: there, disputed invoices in a collections run (not the brief's whole ledger).
  const heldList = Array.isArray(d.held) ? d.held
    : (d.routine !== 'weekly-prior-year-fee-reminder' ? [] : ((d.records && d.records.invoices) || []).filter(i => i.disputed).map(i => ({ id: i.id })));
  const heldIds = heldList.map(h => h.id);
  const heldOnPage = all(art, n => 'data-held' in n.attrs);
  eq('held items shown with no draft', heldOnPage.map(n => n.attrs['data-held']).sort(), heldIds.slice().sort());
  if (Array.isArray(d.held)) for (const h of d.held) {
    const el = heldOnPage.find(n => n.attrs['data-held'] === h.id);
    if (el) eq(h.id + ' held reason, verbatim', f(el, 'held-reason').map(text), [h.reason]);
  }
  if (!isBrief) ok('no draft for a held item', !d.drafts.some(x => heldIds.includes(x.client_id || x.invoice_id)) && !pageDrafts.some(n => heldIds.includes(n.attrs['data-draft'])));

  // The illustrative blocked example, if shown, is one the export marks as illustrative.
  for (const ex of all(art, n => 'data-example' in n.attrs)) {
    const bodies = (d.rejected_examples || []).filter(r => r.illustrative).flatMap(r => [].concat(r.draft).map(x => x.body));
    ok('example is an illustrative rejected draft from the export', bodies.includes(f(ex, 'p').map(text).join('\n\n')));
    ok('example is labelled "Example of what the checks block"', flat(ex).startsWith('Example of what the checks block'));
  }
  // Flags on the page match flagged_for_owner.
  const tags = all(art, n => cls(n).includes('tag')).map(flat);
  eq('flagged on the page iff flagged in the export', tags.includes('For the team'), d.flagged_for_owner.length > 0);
  // Client notes quoted verbatim from the record.
  const said = [];
  for (const k of ['invoices', 'returns']) for (const r of (d.records && d.records[k]) || []) {
    if (r.last_client_note) said.push(r.last_client_note);
  }
  for (const q of f(art, 'note')) ok('client note "' + text(q) + '" is in the record', said.includes(text(q)));
  const noDraft = !isBrief && d.drafts.length === 0;
  if (noDraft) {
    eq('no draft: no draft on the page', pageDrafts.length, 0);
    eq('no draft: no checks panel', [all(art, n => 'data-checks-run' in n.attrs).length, all(art, n => n.tag === 'details' || n.tag === 'summary').length, f(art, 'check').length], [0, 0, 0]);
    console.log('  ' + sweep(s.scenario, words(art), [JSON.stringify(d)], numbersIn(d)) + ' figures and IDs swept (no draft)');
    continue;
  }
  // The phone summary counts every check the export ran for this case, all passed.
  const shownChecks = f(art, 'check');
  const run = all(art, n => 'data-checks-run' in n.attrs);
  eq('checks summary', run.map(n => [n.attrs['data-checks-run'], flat(n)]), [[String(d.checks.length), d.checks.length + ' checks passed']]);
  const sum = all(art, n => n.tag === 'summary')[0];
  ok('checks summary says how many are shown', sum && flat(sum).includes(', ' + shownChecks.length + ' shown'), sum && flat(sum));
  // Check names shown are export checks, and passed.
  for (const c of f(art, 'check')) {
    const hit = d.checks.find(x => loose(x.name) === loose(text(c)));
    ok('check "' + text(c) + '" is in the export and passed', hit && hit.passed);
  }
  // Every figure in the scenario comes from this scenario's export.
  const jt = JSON.stringify(d);
  const n = sweep(s.scenario, words(art), [jt], numbersIn(d));
  console.log('  ' + n + ' figures and IDs swept');
}

/* ---- hero and the rest of the page ---- */
console.log('hero and page copy');
const inputs = Object.values(exportsByLetter).flatMap(d => [].concat((d.model_input || {}).invoices || [], (d.model_input || {}).clients || []));
for (const row of all(doc, n => cls(n).includes('chore'))) {
  const t = words(row).replace(/[‐‑]/g, '-');
  const id = (t.match(/\b(INV-\d+|CL-\d+)\b/) || [])[1];
  if (!id) continue;
  const rec = inputs.find(x => x.id === id);
  if (!ok('hero ' + id + ' is in the export', !!rec)) continue;
  if (id.startsWith('INV-')) eq('hero ' + id + ' days overdue', (t.match(/(\d+) days overdue/) || [])[1], String(rec.days_overdue));
  else {
    const forms = t.match(/\b(?:W-2|1098(?:-[A-Z]+)?|1099-[A-Z]+)\b/g) || [];
    ok('hero ' + id + ' names a form', forms.length > 0);
    for (const fm of forms) ok('hero ' + id + ' ' + fm + ' is on its missing list', rec.missing.some(m => m.type === fm));
    if (/still missing/.test(t)) ok('hero ' + id + ' says "still missing" and nothing was received for it', forms.every(fm => !rec.received.some(r => r.type === fm)));
  }
}
const main = all(doc, n => n.tag === 'main')[0];
function outside(n) { // page text minus scenarios and the price section
  if (typeof n === 'string') return n;
  if (RAW.has(n.tag) || n.attrs.id === 'scen' || cls(n).includes('price')) return ' ';
  return ' ' + n.kids.map(outside).join(' ') + ' ';
}
const allNums = new Set();
Object.values(exportsByLetter).forEach(d => numbersIn(d, allNums));
const rest = outside(main).replace(/\u00a0/g, ' ').replace(/\s+/g, ' ');
// Copy that is not export data: the schedule, not a record.
const restData = rest.replace(/At 7 every Monday/g, '');
console.log('  ' + sweep('page', restData, allJsonText, allNums) + ' figures and IDs swept outside the scenarios');

console.log('');
if (fails) {
  console.log(fails + ' mismatch(es), ' + oks + ' passed. Re-copy from the export, or fix the page to match it.');
  process.exit(1);
}
console.log('page matches the export: ' + oks + ' checks passed');
