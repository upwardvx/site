# Design — "Ledger, Workshop colors"

The page reads like a ledger statement: ruled lines, square corners, figures in mono, overdue items stamped. The warmth comes from the Workshop palette.

## Color
| Token | Value | Use |
|---|---|---|
| paper | #EADFCC | page background |
| ink | #1E3A2F | text, rules |
| muted | #4A4636 | secondary text |
| hair | #C4B293 | thin row dividers |
| accent | #A8431F | underline, buttons, overdue figures and stamps (darkened terracotta for AA on sand) |
| statement | #FBF6EC | sample statement card |
| night | #1E3A2F | closing band; text #F7F0E3, muted #CBD6CC |

## Type
- Display: Bricolage Grotesque 500/700/800
- Body: IBM Plex Sans 400/500/600
- Figures and labels: IBM Plex Mono, never below 12px
- The hero headline has fixed line breaks per breakpoint, matching where Bricolage breaks on its own, and the fallback is local Arial scaled to Bricolage's width, so nothing shifts when the font loads.

## Shape and motion
- Square corners everywhere. Hairline, thick and double rules carry the structure.
- Two inks: red means it needs you, forest means it's off your desk. On load the hero chores start as loose slips, the forest OFF YOUR DESK stamp presses onto each one (once, no loop) and each files flat into the ledger and the old status stays visible, struck through. On phones it fires when the ledger scrolls into view.
- The sample brief swings down from its top edge as it feeds out on scroll (scroll-driven CSS where supported, fully shown elsewhere) and its last line gets the same stamp.
- "While you were away": after a visitor leaves the tab for 60s+ and returns, one dismissible slip says nothing here needed them. Once per session.
- The circled ↗ is the link cursor on desktop; while pressed it becomes the forest stamp. Nothing else follows the mouse.
- The off-desk tab: after a visitor has been in another tab for 2s, the favicon becomes the forest stamp and the title reads “Nothing needs you · Upward Ventures”. Both switch back the moment they return; the away slip takes over from there.
- The booking slip: a plain same-tab click on the “or book a 30-minute call” link feeds a small perforated slip out under it. Three red ledger dots stamp forest one at a time, then close into the circled ↗, labelled “Opening the calendar”. Never on cmd/ctrl/middle clicks; it retracts after 8s and resets when the page is restored from the back/forward cache.
- Under `prefers-reduced-motion` everything renders already stamped and printed.

## The ask and the long parts
- Email is the one main ask. "Email me" sits in the masthead, and the primary buttons are mailto links to siddharth@upwardvx.com with a pre-filled subject. The calendar appears once per page, as a secondary text link under the hero button.
- Price rows show the label, the amount and one fragment quoted verbatim from the terms. The full terms, unchanged, sit in a native `<details>` labelled "Full terms", so they work without JS.
- /plumbing's scenarios are tabs on desktop and a ruled list with one 44px+ row per case below 700px. On phones each case's checks collapse into a `<details>` summary.
- Logos: `brand/logos/wordmark-black.svg` on sand, `wordmark-white.svg` on the closing band (tightly cropped copies of the originals).
- Share image: `brand/og.png` (1200×630). PNG favicon and apple-touch-icon sit beside the SVG icon for Safari.
- Headshot: `brand/siddharth.webp` with a `.jpg` fallback, square, ledger-style double outline. 240px column on desktop, 200px on phones.
