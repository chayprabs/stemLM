export const colors = {
  bg: '#0C0C0F',
  surface: '#141418',
  surface2: '#1A1A22',
  border: '#1E1E24',
  border2: '#2A2A35',

  text1: '#F0F0F2',
  text2: '#8A8A9A',
  text3: '#4A4A5A',

  accent: '#0EA5A0',
  accentHover: '#0D9490',
  accentDim: '#0EA5A015',

  amber: '#F59E0B',
  amberDim: '#F59E0B15',

  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',

  // Light mode (website only)
  bgLight: '#F8F9FC',
  surfaceLight: '#FFFFFF',
  borderLight: '#E2E8F0',
  text1Light: '#0F1117',
  text2Light: '#64748B',
} as const

export const fonts = {
  sans: 'Inter, system-ui, sans-serif',
  wordmark: 'Geist, Inter, sans-serif',
  mono: "'JetBrains Mono', 'Courier New', monospace",
} as const

export const fontSizes = {
  xs: '11px',
  sm: '13px',
  base: '15px',
  lg: '18px',
  xl: '22px',
  '2xl': '28px',
  '3xl': '36px',
  '4xl': '48px',
} as const

export const spacing = {
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
} as const

export const radius = {
  sm: '6px',
  md: '10px',
  lg: '14px',
  xl: '20px',
} as const

export const animation = {
  micro: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  transition: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
  enter: '350ms cubic-bezier(0, 0, 0.2, 1)',
} as const

export const brand = {
  name: 'stemLM',
  wordmark: 'stemLM',
  tagline: 'Solve STEM problems the right way, every time',
  accentLetters: 'LM', // these render in accent color
} as const
