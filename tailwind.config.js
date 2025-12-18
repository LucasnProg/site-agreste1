/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        adBlue: '#0f172a',
        adGold: '#d4af37',
      },
    },
  },
  plugins: [],
}