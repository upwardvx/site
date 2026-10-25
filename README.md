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

The Larkspur drafts and the test result on `/plumbing` are copied by hand from `agent-fleet/site-exports/<run date>/larkspur/`. After touching them, or when a new export lands, run:

```bash
python3 scripts/check-plumbing-drafts.py
```

It finds the newest export next to this repo (or takes `--export DIR`) and exits 1 if any draft, record figure or the proof line differs. There is no CI: the exports live in another repo, so a Render build can't run it.
