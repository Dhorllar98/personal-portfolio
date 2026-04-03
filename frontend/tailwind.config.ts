import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      colors: {
        background: 'var(--bg-primary)',
        surface:    'var(--bg-secondary)',
        card:       'var(--bg-card)',
        'text-primary':   'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        cyan: {
          DEFAULT: '#00d4ff',
          dim:     'rgba(0,212,255,0.10)',
          border:  'rgba(0,212,255,0.30)',
          glow:    'rgba(0,212,255,0.50)',
        },
        violet: {
          DEFAULT: '#7928ca',
          dim:     'rgba(121,40,202,0.10)',
          border:  'rgba(121,40,202,0.30)',
          glow:    'rgba(121,40,202,0.50)',
        },
      },
      boxShadow: {
        'cyan-glow':   '0 0 18px rgba(0,212,255,0.25), 0 0 48px rgba(0,212,255,0.08)',
        'violet-glow': '0 0 18px rgba(121,40,202,0.25), 0 0 48px rgba(121,40,202,0.08)',
      },
      animation: {
        'gradient-shift': 'gradientShift 10s ease infinite',
        'fade-up':        'fadeUp 0.55s ease-out forwards',
        'fade-in':        'fadeIn  0.4s  ease-out forwards',
      },
      keyframes: {
        gradientShift: {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%':     { backgroundPosition: '100% 50%' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(22px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
