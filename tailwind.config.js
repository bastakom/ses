/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './utils/**/*.js'
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['EB Garamond', 'sans-serif'],
        body: ['Montserrat', 'sans-serif'],
        a: ['Montserrat', 'sans-serif']
      }
    }
  },
  plugins: []
}
