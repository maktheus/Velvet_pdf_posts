import type { Config } from 'tailwindcss';
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        coral: '#ed6058', cream: '#fdfedf', pink: '#fcebf1',
        ink: '#2a1612', bg: '#faf6ef', gold: '#f2c98a',
      },
    },
  },
  plugins: [],
} satisfies Config;
