# upwardvx.com — CLAUDE.md

Static one-page site. `public/index.html` is the entire site; `public/brand/` holds the logos. Deployed to Render as a static site via `render.yaml`. No framework, no build. JavaScript only as small, progressive vanilla scripts (the stamps, the away slip, the off-desk tab and the booking slip); the page must read fully without it.

## Rules
- Read DESIGN.md before any visual change. Don't add colors, fonts or sections without approval.
- Copy is reader-based and owner-facing. Proof is past tense or a labelled sample — no client claims until real clients exist.
- Never name the current employer on the page.
- Keep the no-orphan line-break rules (`text-wrap`, `&nbsp;` before the last word of headlines, buttons and short lines).
- Verify with a real browser at 1280px and 375px before calling a change done: no horizontal scroll, no console errors.
- The Larkspur drafts and proof line on `/plumbing` are copied from `agent-fleet/site-exports/`. Run `python3 scripts/check-plumbing-drafts.py` after any change to them or when a new export lands.
