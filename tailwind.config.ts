import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
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
