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
- One motion only: the three hero ledger rows lift off up and to the right one at a time on a 12s loop, then return. Runs only in the two-column layout (above 900px) and never under `prefers-reduced-motion`.
- Logos: `brand/logos/wordmark-black.svg` on sand, `wordmark-white.svg` on the closing band (tightly cropped copies of the originals).
- Share image: `brand/og.png` (1200×630). PNG favicon and apple-touch-icon sit beside the SVG icon for Safari.
- Headshot: `brand/siddharth.webp` with a `.jpg` fallback, square, ledger-style double outline. 240px column on desktop, 200px on phones.
