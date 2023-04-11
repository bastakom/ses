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
        heading: ['Exo 2', 'sans-serif'],
        body: ['Poppins', 'sans-serif'],
        a: ['Climate Crisise', 'cursive']
      }
    }
  },
  plugins: []
}
