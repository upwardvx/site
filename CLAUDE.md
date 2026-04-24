@AGENTS.md

## Design System
Always read DESIGN.md before making any visual or UI decisions.
All font choices, colors, spacing, and aesthetic direction are defined there.
Do not deviate without explicit user approval.
In QA mode, flag any code that doesn't match DESIGN.md.

## Key rules for this project
- Geist Mono only. No other fonts.
- Brass `#C9A96E` is the single accent. Never introduce a second accent.
- Hard corners everywhere — border-radius: 0. No exceptions.
- No Framer Motion, Lenis, GSAP, or R3F. The terminal works without them.
- No scroll narrative. Navigation is page-based via nav bar or keyboard.
- The boot sequence "DISABLING ADVISORY_MODE" line is sacred. Do not remove it.
