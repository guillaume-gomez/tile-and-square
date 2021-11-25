const COLORS = ['gray', 'red','yellow', 'green', 'blue', 'indigo', 'purple', 'pink'];
const VARIANTS = [100, 200, 300, 400, 500, 600, 700, 800, 900];

const safelist = []
COLORS.forEach((color) => {
  VARIANTS.forEach((variant) => {
    safelist.push(`bg-${color}-${variant}`)
  })
});

module.exports = {
  purge: {
    enable: process.env.NODE_ENV === "production",
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    safelist
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}
