/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      fontSize: {
        'xxs': '2.5rem', // 8px
        'xxxs': '0.700rem', // 6px
      }
    },
  },
  plugins: [require('daisyui')],
}

