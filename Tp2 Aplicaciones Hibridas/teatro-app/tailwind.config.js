/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        headline: ['Your Headline Font', 'sans-serif'], 
      },
      spacing: {
        'square': '100%', 
      },
    },
  },
  plugins: [],
}