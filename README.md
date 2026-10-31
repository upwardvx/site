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

It reads the export and the static HTML (what a visitor sees with JS off) and exits 1 if any scenario is missing, any draft, subject or reason differs from the export, or any figure, ID, date or day count on the page isn't in the export. No dependencies. There is no CI: the exports live in another repo, so a Render build can't run it.
