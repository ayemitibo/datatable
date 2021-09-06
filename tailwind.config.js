module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'findox-blue': '#5c99b7',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
