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
- Figures and labels: IBM Plex Mono

## Shape and motion
- Square corners everywhere. Hairline, thick and double rules carry the structure.
- Two inks: red means it needs you, forest means it's off your desk. On load the forest OFF YOUR DESK stamp presses onto each hero row (once, no loop) and the old status stays visible, struck through. On phones it fires when the ledger scrolls into view.
- The sample brief feeds out as you scroll (scroll-driven CSS where supported, fully shown elsewhere) and its last line gets the same stamp.
- "While you were away": after a visitor leaves the tab for 60s+ and returns, one dismissible slip says nothing here needed them. Once per session.
- The circled ↗ is the link cursor on desktop. Nothing else follows the mouse.
- Under `prefers-reduced-motion` everything renders already stamped and printed.
- Logos: `brand/logos/wordmark-black.svg` on sand, `wordmark-white.svg` on the closing band (tightly cropped copies of the originals).
- Share image: `brand/og.png` (1200×630). PNG favicon and apple-touch-icon sit beside the SVG icon for Safari.
- Headshot: `brand/siddharth.webp` with a `.jpg` fallback, square, ledger-style double outline. 240px column on desktop, 200px on phones.
