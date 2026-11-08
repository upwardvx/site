#!/usr/bin/env node
// Prices are written by hand on every page. This is the one place they're defined:
// it fails if any page's price rows, FAQ prices or schema.org offers drift from it.
// Usage: node scripts/check-prices.js   (no dependencies)
const fs = require('fs');
const path = require('path');

const PRICES = {
  'Setup, one job': '$1,500',
  'Looking after it': '$500',
  'Software': '$0',
  'Audit': '$1,500',
};
const SETUP = 1500, MONTHLY = 500, AUDIT = 1500;

const pub = path.join(__dirname, '..', 'public');
const pages = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name === 'index.html') pages.push(p);
  }
})(pub);

const norm = s => s.replace(/&nbsp;| /g, ' ').replace(/\s+/g, ' ').trim();
const money = s => Number(s.replace(/[$,]/g, ''));
const errors = [];
let rows = 0;

for (const file of pages) {
  const rel = path.relative(pub, file);
  const html = fs.readFileSync(file, 'utf8');

  // Price table rows: <strong>Label</strong><div class="amt">$X<small>
  for (const m of html.matchAll(/<strong>([^<]+)<\/strong><div class="amt">([^<]+)<small>/g)) {
    const label = norm(m[1]), amt = m[2].trim();
    if (!(label in PRICES)) continue;
    rows++;
    if (amt !== PRICES[label]) errors.push(`${rel}: "${label}" shows ${amt}, expected ${PRICES[label]}`);
  }

  // Prose prices: "$N to set up" and "$N a month" anywhere in visible copy.
  const text = norm(html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' '));
  for (const m of text.matchAll(/\$([\d,]+) to set up/g))
    if (money(m[1]) !== SETUP) errors.push(`${rel}: "$${m[1]} to set up", expected $${SETUP}`);
  for (const m of text.matchAll(/\$([\d,]+) a month/g))
    if (money(m[1]) !== MONTHLY) errors.push(`${rel}: "$${m[1]} a month", expected $${MONTHLY}`);

  // schema.org offers
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    let data;
    try { data = JSON.parse(m[1]); } catch (e) { errors.push(`${rel}: ld+json does not parse (${e.message})`); continue; }
    const offers = [].concat(data.offers || []);
    for (const o of offers) {
      const want = /audit/i.test(data.name || '') ? AUDIT : SETUP;
      if (Number(o.price) !== want) errors.push(`${rel}: schema offer price ${o.price}, expected ${want}`);
    }
  }
}

if (!rows) errors.push('no price rows found: the page markup changed, so update this script');
if (errors.length) {
  console.error(`check-prices: ${errors.length} problem(s)\n  ` + errors.join('\n  '));
  process.exit(1);
}
console.log(`check-prices: ${rows} price rows across ${pages.length} pages match`);
