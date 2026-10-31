#!/usr/bin/env node
/* Fail if /plumbing no longer matches the Larkspur site export.

   The page is static HTML with every scenario written into it (the tabs are
   progressive JS), so this reads the HTML as served, before any script runs.

     node scripts/check-plumbing-drift.js <export dir> [page]
     node scripts/check-plumbing-drift.js ../agent-fleet/site-exports/2026-10-20/larkspur

   <export dir> holds index.json and one JSON per scenario. [page] defaults to
   public/plumbing/index.html. No dependencies. Exits 1 on any mismatch.

   Draft text, subjects and reasons must match the export exactly: no
   paraphrase, no curly quotes, no non-breaking spaces. Every scenario in
   index.json must be on the page, in order. Every dollar figure, invoice,
   quote and job ID, date and day count inside a scenario must appear in that
   scenario's export; outside the scenarios (hero, pain lines) they must
   appear in some export file. The price section is not export data and is
   skipped. */
'use strict';
const fs = require('fs');
const path = require('path');

const [expArg, pageArg] = process.argv.slice(2);
if (!expArg) {
  console.error('usage: node scripts/check-plumbing-drift.js <export dir> [page]');
  process.exit(2);
}
const EXP = path.resolve(expArg);
const PAGE = path.resolve(pageArg || path.join(__dirname, '..', 'public', 'plumbing', 'index.html'));

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
  { kind: 'ID', re: /\b(?:INV-\d+|Q-\d+|J\d{2,})\b/g, val: s => s },
  { kind: 'date', re: /\b20\d\d-\d\d-\d\d\b/g, val: s => s },
  { kind: 'day count', re: /\b(\d+) days\b/g, val: s => Number(s.split(' ')[0]), inNums: true },
];
function sweep(label, str, jsonTexts, nums) {
  let n = 0;
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

/* ---- proof line ---- */
console.log('proof line');
const proof = all(doc, n => 'data-proof' in n.attrs);
eq('one proof line', proof.length, 1);
if (proof[0]) eq('proof text', flat(proof[0]).replace(/\u00a0/g, ' '),
  'Test run ' + md(ev.date) + ', ' + ev.date.slice(0, 4) + ', on data as of ' + md(index.as_of) + ': ' +
  ev.cases_passed + ' of ' + ev.cases_total + ' eval cases passed on ' + ev.model + '.');
const sample = all(doc, n => n.tag === 'p' && cls(n).includes('sample'));
ok('sample note names the run date', sample[0] && flat(sample[0]).replace(/\u00a0/g, ' ').includes('test run on ' + md(index.run_date) + ', ' + index.run_date.slice(0, 4)));

/* ---- scenarios present, in order ---- */
console.log('scenarios');
const arts = all(doc, n => n.tag === 'article' && 'data-scenario' in n.attrs);
eq('scenarios on the page', arts.map(a => a.attrs['data-scenario'] + ':' + a.attrs['data-export']),
  index.scenarios.map(s => s.scenario + ':' + s.file));
const tabs = all(doc, n => n.attrs.role === 'tab');
eq('tab titles', tabs.map(t => loose(flat(all(t, n => cls(n).includes('tt'))[0] || t))), index.scenarios.map(s => loose(s.title)));

for (const s of index.scenarios) {
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
    eq('drafts on the page', pageDrafts.map(n => n.attrs['data-draft']).sort(), d.drafts.map(x => x.invoice_id || x.quote_id).sort());
    for (const dr of d.drafts) {
      const id = dr.invoice_id || dr.quote_id;
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

  // Collections: disputed invoices are held back, never drafted. (The brief's records are the whole ledger.)
  const disputed = d.routine !== 'weekly-collections-draft' ? [] : ((d.records && d.records.invoices) || []).filter(i => i.disputed).map(i => i.id);
  eq('held invoices shown with no draft', all(art, n => 'data-held' in n.attrs).map(n => n.attrs['data-held']).sort(), disputed.sort());
  if (!isBrief) ok('no draft for a disputed invoice', !d.drafts.some(x => disputed.includes(x.invoice_id)));

  // The illustrative blocked example, if shown, is one the export marks as illustrative.
  for (const ex of all(art, n => 'data-example' in n.attrs)) {
    const bodies = (d.rejected_examples || []).filter(r => r.illustrative).flatMap(r => [].concat(r.draft).map(x => x.body));
    ok('example is an illustrative rejected draft from the export', bodies.includes(f(ex, 'p').map(text).join('\n\n')));
    ok('example is labelled "Example of what the checks block"', flat(ex).startsWith('Example of what the checks block'));
  }
  // Flags on the page match flagged_for_owner.
  const tags = all(art, n => cls(n).includes('tag')).map(flat);
  eq('flagged on the page iff flagged in the export', tags.includes('Flagged'), d.flagged_for_owner.length > 0);
  // Customer notes quoted verbatim from the record.
  const said = [];
  for (const k of ['invoices', 'quotes']) for (const r of (d.records && d.records[k]) || []) {
    if (r.last_customer_note) said.push(r.last_customer_note);
    if (r.last_customer_message) said.push(r.last_customer_message);
  }
  for (const q of f(art, 'note')) ok('customer note "' + text(q) + '" is in the record', said.includes(text(q)));
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
const inputs = Object.values(exportsByLetter).flatMap(d => [].concat((d.model_input || {}).invoices || [], (d.model_input || {}).quotes || []));
for (const row of all(doc, n => cls(n).includes('chore'))) {
  const t = words(row);
  const id = (t.match(/\b(INV-\d+|Q-\d+)\b/) || [])[1];
  if (!id) continue;
  const rec = inputs.find(x => x.id === id);
  if (!ok('hero ' + id + ' is in the export', !!rec)) continue;
  if (id.startsWith('INV-')) eq('hero ' + id + ' days overdue', (t.match(/(\d+) days overdue/) || [])[1], String(rec.days_overdue));
  else eq('hero ' + id + ' sent days ago', (t.match(/sent (\d+) days ago/) || [])[1], String(rec.sent_days_ago));
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
// Copy that is not export data: "3 to 14 days" and "30 minutes" describe the schedule, not a record.
const restData = rest.replace(/3 to 14 days ago/g, '').replace(/At 7 every Monday/g, '');
console.log('  ' + sweep('page', restData, allJsonText, allNums) + ' figures and IDs swept outside the scenarios');
const q301 = inputs.find(x => x.id === 'Q-301');
ok('Q-301 is a water heater in the record', q301 && /water heater/.test(q301.job_type));

console.log('');
if (fails) {
  console.log(fails + ' mismatch(es), ' + oks + ' passed. Re-copy from the export, or fix the page to match it.');
  process.exit(1);
}
console.log('page matches the export: ' + oks + ' checks passed');
