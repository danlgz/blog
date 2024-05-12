import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Roboto Mono"', 'sans-serif'],
      },
      colors: {
        'main': '#3A4D39',
        'main-dark': '#ECE3CE',
        'background': '#ECE3CE',
        'background-dark': '#3A4D39',
      }
    },
  },
  plugins: [],
} satisfies Config
