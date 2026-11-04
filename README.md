# upwardvx.com

One static page for Upward Ventures. No build step and no dependencies: `public/index.html` is the whole site, with the brand files under `public/brand/`.

## Run locally

```bash
python3 -m http.server 8000 --directory public
```

Then open http://localhost:8000.

## Deploy

Render reads `render.yaml` and serves `public/` as a static site. In the Render dashboard, create a Blueprint from this repo, then point the upwardvx.com domain at the new service.

## Editing

Read `DESIGN.md` before changing anything visual. Copy changes go straight into `public/index.html`.

## Checks

The Larkspur scenarios and the test result on `/plumbing` are copied from `agent-fleet/site-exports/<run date>/larkspur/`. After touching them, or when a new export lands, run:

```bash
node scripts/check-plumbing-drift.js ../agent-fleet/site-exports/<run date>/larkspur
```

It reads the export and the static HTML (what a visitor sees with JS off) and exits 1 if any scenario is missing, any draft, subject or reason differs from the export, or any figure, ID, date or day count on the page isn't in the export. No dependencies. Scenarios listed in `SKIP` at the top of the script (currently h, the review reply, which has no tab yet) are reported on every run and fail the check if they appear on the page without being removed from `SKIP`. There is no CI: the exports live in another repo, so a Render build can't run it.

The Hollis & Wren scenarios and the test result on `/accounting` are copied from `agent-fleet/site-exports/<run date>/hollis-wren/` and checked the same way:

```bash
node scripts/check-accounting-drift.js ../agent-fleet/site-exports/<run date>/hollis-wren
```

It applies the plumbing rules to the tax export, with these differences. Scenarios appear in page order: document chases first, then the Monday brief, then prior-year fee reminders (`ROUTINE_ORDER`), in export order within each. A scenario with no draft (everything held, or a return on extension) must show no checks panel. Client, return, document and invoice IDs, dates, day counts and tax forms (W-2, 1099-B and so on) must come from the export. `SKIP` currently holds e, the Monday brief, which fails one check in the 2026-10-20 export.
