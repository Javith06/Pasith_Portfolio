/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'warm-white': 'var(--bg-primary)',
        'warm-offwhite': 'var(--bg-secondary)',
        'dark-section': 'var(--bg-dark)',
        'dark-card': 'var(--bg-dark-card)',
        silver: 'var(--text-on-dark-muted)',
        charcoal: {
          DEFAULT: 'var(--text-main)',
          light: 'var(--bg-dark-card)',
          mid: 'var(--text-muted)',
        },
        stone: 'var(--border-color)',
        accent: {
          DEFAULT: 'var(--accent)',
          hover: 'var(--accent-hover)',
          text: 'var(--accent-text)',
        }
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
