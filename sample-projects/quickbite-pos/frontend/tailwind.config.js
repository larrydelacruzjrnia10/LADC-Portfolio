/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ketchup: '#b91c1c',
        mustard: '#facc15',
        bun: '#fff7ed',
        grill: '#1f2937',
      },
      boxShadow: {
        order: '0 24px 45px rgba(15, 23, 42, 0.12)',
      },
      fontFamily: {
        sans: ['Be Vietnam Pro', 'Segoe UI', 'sans-serif'],
        display: ['Sora', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
