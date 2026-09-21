/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'warm-white': 'var(--bg-warm-white)',
        'warm-offwhite': 'var(--bg-warm-offwhite)',
        silver: 'var(--color-silver)',
        charcoal: {
          DEFAULT: 'var(--color-charcoal)',
          light: 'var(--color-charcoal-light)',
          mid: 'var(--color-charcoal-mid)',
        },
        stone: 'var(--color-stone)',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'ultra-wide': '0.3em',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
}
