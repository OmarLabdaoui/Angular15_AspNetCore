/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}', './projects/**/*.{html,ts}', 'node_modules/preline/dist/*.js'],
  theme: {
    extend: {},
  },
  plugins: [require('preline/plugin')],
}