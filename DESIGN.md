# Design System: upwardvx.com

## 1. Visual Theme & Atmosphere

A dark editorial interface with the confidence of a well-designed book and the restraint of a luxury product. Near-black base, warm gold accent, bold serif headlines that mean something. This isn't a startup that's trying to look established — it's someone who already is, saying so quietly.

Density: 4/10 (airy, generous whitespace — the negative space earns trust)
Variance: 7/10 (offset layouts, asymmetric hero, cards that don't all look the same)
Motion: 7/10 (fluid spring physics, scroll-driven reveals, one R3F 3D element — earns every frame)

The site feels like Linear meets Stripe Press: dark, confident, no decoration for its own sake. Every element either delivers copy or gets out of the way.

---

## 2. Color Palette & Roles

- **Pitch Canvas** (`#080808`) — Primary background. Near-black with warmth. Never use pure `#000000`.
- **Lifted Surface** (`#111111`) — Card backgrounds, nav background after scroll blur.
- **Structural Border** (`#1E1E1E`) — 1px dividers, card outlines, section separators.
- **Warm Mist** (`#F5F5F0`) — Primary text. Warm white, not pure — easy on the eyes against near-black.
- **Steel Secondary** (`#888880`) — Captions, labels, secondary body text, metadata.
- **Brass Accent** (`#C9A96E`) — Single accent. CTAs, active states, highlighted proof phrases in the credibility section, hover glow on buttons. Saturation < 80%. Never use for large fills.
- **Accent Dimmed** (`rgba(201, 169, 110, 0.12)`) — Subtle hover backgrounds, card active states.
- **Accent Glow** (`rgba(201, 169, 110, 0.08)`) — Button glow on hover (inward shadow only, no neon outer ring).

**Banned palette:** Purple gradients. Neon blue or cyan. Pure `#000000` or `#FFFFFF`. Any second accent color. Gradient text on large headers.

---

## 3. Typography Rules

### Fonts
- **Display/Headlines:** Cormorant Garamond — weight 600 for body headlines, 700 for hero. Letter-spacing: `-0.02em`. This is the editorial voice of the site. It should feel like something worth reading.
- **Body/UI:** Geist — weight 400 for body, 500 for labels, 600 for nav CTA and button text. Geist is sharp and modern without being clinical.
- **Mono (optional):** Geist Mono — for any code or technical labels, if needed in tech audit context.

### Scale (mobile → desktop via `clamp()`)
```
Hero headline:    clamp(3rem, 8vw, 7rem)    — Cormorant 700, line-height 0.95
Section heading:  clamp(2rem, 4vw, 3.5rem)  — Cormorant 600, line-height 1.05
Card title:       clamp(1.25rem, 2vw, 1.5rem) — Cormorant 600
Body:             clamp(1rem, 1.2vw, 1.125rem) — Geist 400, line-height 1.65
Label/caption:    0.875rem                    — Geist 500, letter-spacing 0.06em, uppercase
```

### Anti-patterns
- No Inter. No Times New Roman, Georgia, Garamond (use Cormorant specifically).
- No Title Case in section headings — sentence case always.
- No bold text within body copy for emphasis. Use the accent color or italic if needed.
- Body text max-width: 65ch. Never let lines run full container width.

---

## 4. Component Stylings

### Buttons
- **Primary CTA:** `background: #C9A96E`, `color: #080808`, `font: Geist 600`, `padding: 0.875rem 1.75rem`, `border-radius: 0.375rem`.
- **Hover state:** `translateY(-1px)` + subtle `box-shadow: 0 4px 24px rgba(201,169,110,0.2)` (inward warmth, not neon ring).
- **Active state:** `translateY(1px)` — tactile press feedback.
- **Ghost/outline:** `border: 1px solid #1E1E1E`, `color: #F5F5F0`. Hover: border brightens to `#888880`.
- **No neon outer glow.** No custom mouse cursors.

### Cards (RaaS, Services)
- `background: #111111`, `border: 1px solid #1E1E1E`, `border-radius: 1rem`.
- Hover: `border-color` lifts to `rgba(201,169,110,0.3)`, `translateY(-2px)` with Framer Motion spring.
- 3D tilt on hover (RaaS cards only): Framer Motion `rotateX` / `rotateY` driven by mouse position. Max 8° tilt. CSS `perspective: 1000px` on parent.
- No heavy box shadows. If shadow needed: `box-shadow: 0 1px 3px rgba(0,0,0,0.5)` — minimal, dark-tuned.
- No 3-column equal grid. RaaS: 3 staggered cards with slight vertical offset. Services: 2-column grid, full-width on mobile.

### Navigation
- `position: sticky`, `top: 0`, `z-index: 50`.
- Initial state: `background: transparent`.
- After 20px scroll: `background: rgba(8,8,8,0.8)`, `backdrop-filter: blur(12px)`. Framer Motion opacity/blur transition.
- Logo: Geist 600, `#F5F5F0`. No icon — wordmark only.
- CTA: Primary button (small variant). Right-aligned.

### The Shift Section (two-column contrast)
- Left column: `color: #888880`, items with subtle strikethrough animation on scroll entry.
- Right column: `color: #F5F5F0`, items that brighten from secondary to primary as left column dims.
- Divider: `1px solid #1E1E1E` vertical line between columns on desktop.

### Credibility Section
- Full story in one typographic block. Geist body, `#F5F5F0`, max-width 65ch, centered.
- Key phrases (`"Win rates, retention, and NPS"`, `"two quarters"`, `"ICP confusion"`) highlighted in `#C9A96E` on scroll reveal — GSAP ScrollTrigger controls the color pulse.
- 3 proof markers below: left-border accent line (`border-left: 2px solid #C9A96E`), Geist 500, `#888880`.

### Grain Texture Overlay
```css
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,..."); /* SVG noise */
  opacity: 0.035;
  pointer-events: none;
  z-index: 9999;
  animation: grain 0.5s steps(2) infinite;
}
@keyframes grain {
  0% { transform: translate(0, 0); }
  25% { transform: translate(-1%, 1%); }
  50% { transform: translate(1%, -1%); }
  75% { transform: translate(-1%, -1%); }
  100% { transform: translate(0, 0); }
}
```

---

## 5. Layout Principles

- **Max content width:** `1280px`, centered, `padding: 0 clamp(1.5rem, 5vw, 5rem)`.
- **Section vertical spacing:** `clamp(5rem, 10vw, 9rem)` between sections.
- **CSS Grid over Flexbox math.** No `calc()` percentage hacks.
- **Full-height sections:** `min-h-[100dvh]` — never `h-screen` (iOS Safari bug).
- **Hero layout:** Left-aligned headline (not centered). R3F particle field positioned right of center in background. CTA below sub text, left-aligned.
- **No overlapping elements.** Every element has its own clean spatial zone.
- **Services grid:** `grid-template-columns: repeat(2, 1fr)` on desktop. Single column on mobile.
- **Centered hero layout is banned** — force left-aligned with generous left margin.

---

## 6. Motion & Interaction

### Lenis (smooth scroll foundation)
```ts
const lenis = new Lenis({ lerp: 0.08, smoothWheel: true })
// Connect to GSAP ticker
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
```

### Framer Motion defaults
```ts
// Shared spring — weighty, premium
export const spring = { type: 'spring', stiffness: 80, damping: 18 }

// Standard entrance
export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: spring,
}

// Stagger container
export const stagger = {
  animate: { transition: { staggerChildren: 0.08 } }
}
```

### GSAP ScrollTrigger
- Hero headline: word-by-word reveal using `SplitText`. Each word fades up with 40ms stagger, triggered on mount (not scroll).
- Credibility section: scrub-linked reveal. As user scrolls through the story, lines reveal line-by-line. Accent phrases pulse to `#C9A96E` when entering viewport.
- Trigger defaults: `start: 'top 80%'`, `toggleActions: 'play none none reverse'`.

### React Three Fiber (Hero particle field)
- ~800 particles, slow drift, mouse-responsive (mouse position rotates the field ±5°).
- Color: `#C9A96E` at 15% opacity — barely visible, atmospheric.
- Lazy loaded: `next/dynamic` with `ssr: false`.
- Disabled on mobile and `prefers-reduced-motion`.

### Performance rules
- Animate only `transform` and `opacity`. Never `top`, `left`, `width`, `height`.
- Grain overlay on `position: fixed` pseudo-element (GPU composited layer).
- No `will-change` on more than 3 elements simultaneously.

---

## 7. Responsive Rules

- **< 768px (mobile):** All multi-column layouts collapse to single column. Services 2-col → 1-col. RaaS 3-card row → vertical stack.
- **Hero on mobile:** Headline scales via `clamp()`. R3F particle field disabled (replaced by CSS gradient blob). Sub text and CTA stack cleanly.
- **Navigation on mobile:** CTA button remains visible. Logo left, CTA right. No hamburger menu needed for single-page site.
- **Touch targets:** All buttons and interactive elements minimum `44px` tap target.
- **Typography:** Body text minimum `1rem`. No text below `14px` anywhere.
- **Spacing:** Section gaps reduce: `clamp(3rem, 8vw, 9rem)`.

---

## 8. Anti-Patterns (Banned)

- No emojis anywhere on the site.
- No Inter font.
- No generic serifs (Times New Roman, Georgia plain Garamond). Cormorant Garamond specifically.
- No pure `#000000` or `#FFFFFF`.
- No neon glow shadows or outer ring effects.
- No oversaturated accent colors.
- No gradient text on large headlines.
- No custom mouse cursor.
- No overlapping elements — every element has its own clean spatial zone.
- No 3-column equal card grid. Staggered or offset always.
- No AI copywriting clichés ("Elevate", "Seamless", "Unleash", "Next-Gen", "Game-changer").
- No filler scroll indicators ("Scroll to explore", bouncing chevrons, scroll arrows).
- No fake metrics or statistics. If a number isn't real, don't show a number.
- No centered hero layout.
- No stock photos.
- No Lottie (redundant with Framer Motion).
- No custom cursor (vanity, zero conversion value).
- No Remotion in the site itself (Phase 2: content marketing only).
