import { defineConfig } from 'windicss/helpers';
import formsPlugin from 'windicss/plugin/forms';

export default defineConfig({
  attributify: true,
  // darkMode: 'class',
  // safelist: 'p-3 p-4 p-5',
  theme: {
    extend: {
      colors: {
        primary: '#03438D',
        dark: {
          '100': '#EFECE7',
          '200': '#00040029',
          '300': '#9B9893',
          '400': '#707070',
          '500': '#000400',
        },
        danger: '#F57375',
        active: '#FECB02',
        icon: {
          '100': '#E2EDFA',
        },
      },
      fontFamily: {
        paytone: ['Paytone One', 'sans-serif'],
        helvetica: ['Helvetica Neue', 'sans-serif'],
      },
      boxShadow: {
        main: '-8px 8px 0px #00040029',
      },
      lineHeight: {
        text: '1.4',
      },
      transitionDuration: {
        base: '0.3s',
      },
    },
  },
  plugins: [formsPlugin],
});
