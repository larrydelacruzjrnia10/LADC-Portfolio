/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#effbfd',
          100: '#d8f5fb',
          200: '#b6edf7',
          300: '#7fe0ef',
          400: '#40cbe1',
          500: '#19acc5',
          600: '#13899f',
          700: '#156c7f',
          800: '#175567',
          900: '#174756',
        },
        mint: {
          50: '#f1fcf8',
          100: '#d6f7e8',
          200: '#b0eed2',
          300: '#7adfb2',
          400: '#46c98f',
          500: '#24ae72',
          600: '#1b8c5d',
          700: '#18714d',
          800: '#165a3f',
          900: '#124a35',
        },
        slate: {
          950: '#07141f',
        },
      },
      boxShadow: {
        soft: '0 24px 60px rgba(7, 20, 31, 0.08)',
        lift: '0 20px 45px rgba(21, 108, 127, 0.14)',
      },
      fontFamily: {
        sans: ['Manrope', 'Segoe UI', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
