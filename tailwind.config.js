module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      keyframes: {
        dash: {
          '0%': { 'stroke-dasharray': '1, 150', 'stroke-dashoffset': '0' },
          '50%': { 'stroke-dasharray': '90, 150', 'stroke-dashoffset': '-35' },
          '100%': {
            'stroke-dasharray': '90, 150',
            'stroke-dashoffset': '-124',
          },
        },
      },
      animation: {
        dash: 'dash 1.5s ease-in-out infinite',
      },
    },
  },
  variants: {
    extend: {
      borderStyle: ['hover', 'focus-within'],
    },
  },
  plugins: [],
};
