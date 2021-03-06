// tailwind.config.js
module.exports = {
  purge: [
    '../app/views/**/*.html.erb',
    '../app/views/*.html.erb'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
}
