# Design System — upwardvx.com

## Product Context

- **What this is:** Upward Ventures consulting site — operator-positioned, Results as a Service model
- **Who it's for:** Series A founders, technical and non-technical, who are stuck and need someone who's been inside the machine
- **Space/industry:** Consulting / fractional executive / operator-advisory
- **Project type:** Single-page marketing site with application-style navigation

---

## Memorable Thing

> "This person operates, not advises."

Filter every decision through this. The site should feel like a tool that runs results, not a brochure that pitches services. If an element makes the site feel more like a consultant's portfolio and less like an operator's OS, cut it.

The reference point for taste: **what would Shreyas Doshi choose?** Sharp, direct, unusual without trying to be, craft visible in small decisions.

---

## Aesthetic Direction

- **Direction:** Retro-Operator Terminal — a CRT-era OS running modern consulting logic
- **Decoration level:** Intentional — every effect is functional. Scanlines say "terminal." Vignette says "display." Nothing decorative for its own sake.
- **Mood:** Serious professional tool. Warm precision. Like a Bloomberg terminal that costs less and gives better advice.
- **Reference:** [zui.ooo](https://zui.ooo) — adapted. Brass accent instead of green, operator copy instead of developer copy.

---

## Color

**Approach:** Matrix green — single accent, CRT terminal aesthetic.

```css
--bg:           #000d00   /* Near-black with green tint. Never pure #000000. */
--bg-elevated:  #001400   /* Card/surface layer */
--fg:           #c8d8c8   /* Cool off-white. Never pure #FFFFFF. */
--accent:       #00FF41   /* Matrix green. Single accent. */
--accent-dim:   rgba(0, 255, 65, 0.12)   /* Hover/active backgrounds */
--accent-glow:  rgba(0, 255, 65, 0.06)   /* Subtle row highlight */
--dim:          #2d5c2d   /* Muted green-gray — captions, metadata */
--dim-light:    #4a8a4a   /* Slightly brighter muted — labels */
--warn:         #39ff14   /* Bright green warning */
--border:       rgba(0, 255, 65, 0.12)   /* Hairline borders */
--border-mid:   rgba(0, 255, 65, 0.22)   /* Elevated borders on hover */
```

**Dark mode:** This IS the dark mode. No light mode variant.

**Banned palette:**
- Purple gradients
- Neon blue or cyan
- Warm brass or gold tones
- Pure `#000000` or `#FFFFFF`
- Any second accent color
- Gradient text

---

## Typography

**Approach:** Geist Mono throughout. Monospace is the statement — it signals precision and differentiation without explanation.

```
Font:       Geist Mono (loaded via next/font/google)
Variable:   --font-mono
Fallback:   'Courier New', monospace
```

**Scale:**
```
Base:        14px, line-height 1.65     — readability at warm-on-dark contrast
Page title:  20px, weight 600           — brass accent, letter-spacing 0.05em
Sys header:  11px, letter-spacing 0.06em
Nav items:   11px, letter-spacing 0.08em
Body copy:   14px, line-height 1.75
File table:  12px
Boot lines:  12px, letter-spacing 0.04em
Cmd bar:     12px
```

**Rules:**
- No font switching between sections — monospace everywhere
- All caps only for: sys-header labels, nav items, table headers, cmd hints
- Never sentence-case headings in the sys-header
- Page titles in brass (`--accent`), subtitles in `--dim-light`

---

## Layout

**Structure:** Fixed-viewport OS chrome. Not a scrolling document.

```
┌─────────────────────────────────┐
│ sys-header (fixed top)          │
├─────────────────────────────────┤
│                                 │
│  terminal-main (scrollable)     │
│                                 │
├─────────────────────────────────┤
│ nav-bar                         │
│  ├─ cmd-result (when active)    │
│  ├─ $ [input]  ← nav-prompt     │
│  └─ [HOME] [ABOUT] … nav-list   │
└─────────────────────────────────┘
```

**Content well:** Max-width 760px, centered in terminal-main.

**No sections.** No scroll narrative. Visitors navigate between pages (HOME / ABOUT / SERVICES / APPROACH / CONTACT) via nav bar or keyboard.

**Page transitions:** `opacity 0 → 1` with `translateY(4px → 0)`, 200ms. Nothing more.

**Border radius:** 0 everywhere. Terminal aesthetic uses hard corners.

**Grid:** None. Terminal layout is single-column within the content well.

---

## Navigation System

Five pages, keyboard-navigable:

| Page | Cmd | Content |
|------|-----|---------|
| HOME | `cd ~` | Hero + CTAs |
| ABOUT | `cat about.txt` | Credibility story + proof points |
| SERVICES | `ls -la /services/` | File table, click to expand outcomes |
| APPROACH | `man results-as-a-service` | RaaS cards |
| CONTACT | `mail ss@upwardvx.com` | Contact info + booking |

**Keyboard:** `←` / `→` arrow keys cycle pages when input is not focused. Any printable key (except Space) auto-focuses the command input.

**Cmd input:** Lives inside the nav-bar as `nav-prompt`. Placeholder shows the current page's canonical command (e.g., `cd ~/`, `cat about.md`). Commands navigate pages, show output in `cmd-result` strip, or perform actions (`book`, `clear`, `help`). History via ↑/↓. Escape clears and blurs.

---

## Overlay Effects

**CRT Scanlines** (`body::before`):
```css
background: repeating-linear-gradient(
  0deg,
  transparent,
  transparent 2px,
  rgba(0, 0, 0, 0.10) 2px,
  rgba(0, 0, 0, 0.10) 4px
);
position: fixed; inset: 0; pointer-events: none; z-index: 9998;
```

**Vignette** (`body::after`):
```css
background: radial-gradient(ellipse at center, transparent 45%, rgba(0, 0, 0, 0.70) 100%);
position: fixed; inset: 0; pointer-events: none; z-index: 9997;
```

**No film grain.** No noise texture. The scanlines are the only texture.

---

## Boot Sequence

One-shot animation on first load. Fades out after ~4 seconds.

**Lines (in order):**
```
UVX_OS v2.0.0
[blank]
BOOTING RESULTS_ENGINE....................... OK
LOADING OPERATOR_CONTEXT..................... OK
CALIBRATING OUTCOME_METRICS................. OK
VERIFYING CREDENTIALS: SS@UPWARDVX.COM...... [email]
CREDENTIALS ACCEPTED........................ OK
DISABLING ADVISORY_MODE.................... DONE
MOUNTING /services /clients /contact........ OK
[blank]
SYSTEM READY. AGENT INFRASTRUCTURE ONLINE.
```

**Rules:**
- "DISABLING ADVISORY_MODE" is the critical line. It does the positioning work in the boot sequence. Never remove it.
- Brass cursor blinks during boot. Removed when boot completes.
- Boot overlay fades out over 600ms after the last line.

---

## Motion

**Approach:** Minimal-functional. Nothing that runs on a loop after page load.

| Element | Motion | Duration |
|---------|--------|----------|
| Boot sequence | Lines appear staggered | 300ms apart |
| Boot overlay exit | `opacity: 0` | 600ms |
| Page change | `opacity + translateY(4px)` | 200ms |
| Cmd bar text | Shows on nav, clears after | 800ms |
| Boot cursor | Blink | 0.9s, step-end, infinite |

**Animate only:** `opacity`, `transform`. Never `height`, `width`, `top`, `left`.

**No Framer Motion.** No GSAP. No Lenis. Pure CSS animations and React state.

**Reduced motion:** Cursor blink disabled, boot overlay hidden immediately.

---

## Components

### Sys Header
```
SYS.NAME: UVX_OS  |  AUTH: GUEST  |  UPTIME: 00:00:00  |  MODE: RAAS
```
- Font: 11px, letter-spacing 0.06em
- Labels in `--dim`, values in `--accent`
- MODE:RAAS in `--warn` (amber) — the one status that should draw the eye

### Nav Bar
- `[HOME] [ABOUT] [SERVICES] [APPROACH] [CONTACT]`
- Active: `color: --accent`, `background: --accent-dim`
- Inactive: `color: --dim`, hover `color: --fg`
- Brackets (`[` `]`) at 50% opacity — decorative terminals

### Cmd Input (inside nav-bar)
- `$ ` prompt in `--accent` (Matrix green)
- Text input in `--fg`, font-size 12px
- Caret color: `--accent`
- Placeholder: current page's canonical command, in `--dim` at 50% opacity
- `cmd-result` strip renders above the prompt when a command produces output

### File Table (Services)
- No Unix permissions column — removed. Operator-legible, not developer-speak.
- Columns: SERVICE (brass, monospace slug) / TYPE (dim label) / PROBLEM (fg)
- Row hover: `background: --accent-glow`
- Click to expand outcome detail (`.service-detail` with brass left-border effect)

### Block Cards (Approach/RaaS)
- `border: 1px solid --border`, `background: --bg-elevated`
- Section number in `--dim` (small, 11px)
- Title in `--accent`
- Body in `--fg` at 0.9 opacity
- Hover: border lifts to `--border-mid`

### Proof List (About)
- `//` prefix in `--accent`, body in `--fg`
- Separated by hairline borders (`rgba(201, 169, 110, 0.05)`)

### CTA Button (Primary)
```css
background: var(--accent);
color: var(--bg);
font-family: var(--font-mono);
font-size: 12px;
letter-spacing: 0.08em;
text-transform: uppercase;
padding: 0.6rem 1.5rem;
border-radius: 0;  /* Hard corners. Terminal aesthetic. */
```

### CTA Button (Ghost)
```css
color: var(--accent);
background: transparent;
border: 1px solid var(--accent);
/* Same type spec as primary */
```

---

## Scrollbar
```css
scrollbar-width: thin;
scrollbar-color: var(--border-mid) transparent;
/* 3px width in webkit */
```

The scrollbar is subtle but visible — part of the OS aesthetic.

---

## Anti-Patterns (Banned)

- No rounded corners. Hard edges everywhere.
- No Inter, Roboto, or sans-serif fonts. Geist Mono only.
- No purple gradients, neon glows, or outer ring shadows.
- No second accent color.
- No pure `#000000` or `#FFFFFF`.
- No film grain (scanlines already carry the texture).
- No Lenis, Framer Motion, GSAP, or R3F — removed in this redesign.
- No Three.js particle field.
- No scrolling sections. Page-based navigation only.
- No centered hero layout. Left-aligned within the content well.
- No stock photos, no images.
- No Unix permissions in user-facing tables (`drwxr-xr-x` is dev-speak).
- No emoji.
- No "Elevate", "Seamless", "Unleash", "Game-changer" copy anywhere.
- No decorative scroll indicators.

---

## Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-04-24 | Switched from Cormorant Garamond editorial to Geist Mono terminal | ZUI-inspired redesign. Terminal aesthetic self-selects the right clients. |
| 2026-04-24 | Brass `#C9A96E` instead of ZUI green `#4ade80` | Warmer, more premium. Consistent with UVX brand from prior system. |
| 2026-04-24 | Dropped `drwxr-xr-x` from services table | Unix permissions are developer-speak. Founders who aren't developers disengage. |
| 2026-04-24 | Base font 14px (up from 13px) | 13px too tight for warm-on-dark contrast at Retina. Readability > density here. |
| 2026-04-24 | No scroll narrative — page-based navigation | Intentional engagement signal. Visitors who navigate are interested. Lower passive conversion is acceptable. |
| 2026-04-24 | "DISABLING ADVISORY_MODE" boot line | Does more positioning work than most hero headlines. Earns the boot sequence. |
| 2026-04-24 | Removed Lenis, Framer Motion, GSAP, R3F | Performance and simplicity. The terminal aesthetic needs none of them. |
| 2026-06-17 | Switched accent from brass `#C9A96E` to Matrix green `#00FF41` | CRT terminal aesthetic reads stronger and more differentiated in green. Brass felt warm/premium but wrong for an OS-style interface. |
| 2026-06-17 | Merged cmd-bar into nav-bar as `nav-prompt` | Simpler 3-layer structure. Input above nav buttons, cmd-result strip appears when needed. Separate 36px bottom strip was unnecessary real estate. |
| 2026-06-17 | Changed boot last line to "AGENT INFRASTRUCTURE ONLINE" | Positions UVX-OS as the product, not just RaaS as a model. More accurate to what Siddharth actually built. |
