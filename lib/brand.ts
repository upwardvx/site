// Upward Ventures — single source of truth for brand constants
// Used by components, skills (.stitch/DESIGN.md), and react-components (style-guide.json)

export const BRAND = {
  colors: {
    charcoal: '#343439',         // primary wordmark color
    midgray: '#807d7e',          // secondary / icon element
    accentYellowGreen: '#C5C900', // action accent (light sections)
    accentGold: '#C9A96E',        // action accent (dark sections)
    bgLight: '#F5F4F0',
    bgDark: '#080808',
    textLight: '#000000',
    textDark: '#F5F5F0',
  },
  fonts: {
    display: 'Barlow',
    body: 'Geist',
    displayDark: 'Cormorant Garamond', // used in variant/dark
  },
  logos: {
    black: '/brand/logos/black.svg',  // for light backgrounds
    white: '/brand/logos/white.svg',  // for dark backgrounds
    color: '/brand/logos/color.svg',  // OG image / special use
  },
  icons: {
    black: '/brand/icons/black.svg',   // favicon / mobile
    profile: '/brand/icons/profile.svg', // square profile
  },
  booking: 'https://calendar.app.google/aUBpNXrjnjj6jeUE9',
} as const

export type BrandColors = typeof BRAND.colors
export type BrandLogos = typeof BRAND.logos
