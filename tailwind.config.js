/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Yusei Magic', 'sans-serif'],
        headingKorean: ['Gugi', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

