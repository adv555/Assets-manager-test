const REM_SIZE = 16;
const pxToRem = (px) => `${px / REM_SIZE}rem`;
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        128: '32rem',
      },

      colors: {
        text: {
          DEFAULT: '#1B212D',
        },
        error: {
          DEFAULT: '#D34E24',
        },
        gray: {
          DEFAULT: '#909590',
          dark: '#292D32',
          light: '#D4D5D4',
          ultralight: '#fafafa',
        },
        blue: {
          DEFAULT: '#175676',
          dark: '#113E55',
          light: '#1E7099',
        },
        green: {
          DEFAULT: '#169873',
          dark: '#1A3131',
          light: '#c8ee44',
          ultralight: '#EEFEF2',
        },
      },
      fontSize: {
        h1: [pxToRem(32), pxToRem(42)],
        h2: [pxToRem(28), pxToRem(40)],
        h3: [pxToRem(24), pxToRem(32)],
        h4: [pxToRem(20), pxToRem(30)],
        'Ag-18': [pxToRem(18), pxToRem(27)],
        'Ag-16': [pxToRem(16), pxToRem(20)],
        'Ag-15': [pxToRem(15), pxToRem(22)],
        'Ag-14': [pxToRem(14), pxToRem(21)],
        'Ag-13': [pxToRem(13), pxToRem(21)],
        'Ag-10': [pxToRem(10), pxToRem(18)],
        'Ag-12': [pxToRem(12), pxToRem(18)],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
