const config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0C0C0F',
        surface: '#141418',
        'surface-2': '#1A1A22',
        border: '#1E1E24',
        'border-2': '#2A2A35',
        'text-1': '#F0F0F2',
        'text-2': '#8A8A9A',
        'text-3': '#4A4A5A',
        accent: '#0EA5A0',
        'accent-hover': '#0D9490',
        amber: '#F59E0B',
        'bg-light': '#F8F9FC',
        'text-1-light': '#0F1117',
        'text-2-light': '#64748B',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        wordmark: ['var(--font-geist-sans)', 'Inter', 'sans-serif'],
        mono: ['var(--font-mono)', 'Courier New', 'monospace'],
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '14px',
        xl: '20px',
      },
      fontSize: {
        xs: ['11px', { lineHeight: '1.5' }],
        sm: ['13px', { lineHeight: '1.6' }],
        base: ['15px', { lineHeight: '1.7' }],
        lg: ['18px', { lineHeight: '1.5' }],
        xl: ['22px', { lineHeight: '1.3' }],
        '2xl': ['28px', { lineHeight: '1.25' }],
        '3xl': ['36px', { lineHeight: '1.15' }],
        '4xl': ['48px', { lineHeight: '1.1' }],
      },
    },
  },
  plugins: [],
}

export default config
