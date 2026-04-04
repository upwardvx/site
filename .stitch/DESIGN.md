# Design System: Upward Ventures

## 1. Visual Theme & Atmosphere
Operator-grade consulting brand. Premium without ornamentation. The design communicates earned credibility, not manufactured prestige. Think: a founder who has shipped real products and knows what matters. Dark editorial or clean typographic — never generic SaaS.

## 2. Color Palette & Roles
- **Charcoal** (#343439) — Brand wordmark primary
- **Midgray** (#807d7e) — Brand secondary, secondary text
- **Canvas** (#F5F4F0) — Light section background
- **Ink** (#080808) — Dark section background
- **YellowGreen** (#C5C900) — Action accent (light sections)
- **Gold** (#C9A96E) — Action accent (dark sections)
- **Text Primary Light** (#000000)
- **Text Primary Dark** (#F5F5F0)

## 3. Typography Rules
- **Display:** Barlow, 700–900 weight, -0.02em tracking, uppercase
- **Body:** Geist, 400–500 weight, 1.65 line-height
- **Label:** Geist, 500 weight, uppercase, 0.1em tracking, 0.875rem
- Scale: clamp() throughout — mobile-first fluid type

## 4. Component Stylings
- **Buttons:** Sharp corners (2px radius), invert on hover (black↔white), no gradients
- **Cards:** 1px border rgba(0,0,0,0.1), white bg, 3D tilt on hover (Framer Motion)
- **Nav:** Transparent initially, backdrop-blur + 0.9 opacity on scroll
- **Grain:** 0.032 opacity animated SVG noise on body::before (always present)

## 5. Layout Principles
- Max width: 1280px centered
- Section padding: clamp(5rem, 10vw, 9rem) vertical
- Horizontal: clamp(1.5rem, 5vw, 5rem)
- Scroll snap on section level (y mandatory)

## 6. Motion Philosophy
- Lenis smooth scroll, lerp 0.08
- Framer Motion for component entrances (fadeUp, spring stiffness 80 damping 18)
- GSAP ScrollTrigger for text reveals
- Motion serves copy — never decorates empty space
- Reduced motion: all animation disabled, layout preserved

## Anti-Patterns
- No gradient text
- No neon glows or purple/blue gradients
- No rounded pill buttons
- No Inter font
- No Lorem ipsum in any component (real copy only)
- No generic hero images
