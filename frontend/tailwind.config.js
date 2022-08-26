module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        128: '32rem',
      },
    },
    colors: {
      transparent: '#00000000',
      grey: '#BCC3CE',
      'dark-grey': '#4C5767',
      field: '#DBDBDB',
      inactive: '#DAE0E7',
      placeholder: '#BCC3CE',
      black: '#202020',
      background: '#FAFAFA',
      'green-2': '#26C485',
      blue: '#083D77',
      green: '#1B9AAA',
      orange: '#F87060',
      red: '#BB1128',
      white: '#FFFFFF',
      'dark-blue': '#052D58',
      hover: '#17569C',
      'red-2': '#F0544F',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
