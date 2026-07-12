import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './lib/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        teal: '#009999',
        'teal-dark': '#00736B',
        'teal-deeper': '#0C3B3B',
        purple: '#7242BA',
        'purple-deep': '#372358',
        lavender: '#AF92FF',
        lime: '#DFFF4F',
        ice: '#BFFCFB',
        off: '#F5FBFB',
        green: '#0F6E56',
        amber: '#9C7A3C',
        warm: '#FFF6E9',
        red: '#B3543F',
        gray: '#8A9AA0',
      },
      fontFamily: {
        sans: ['Tahoma', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        xl2: '22px',
      },
    },
  },
  plugins: [],
};

export default config;
