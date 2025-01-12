/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#425372',
      },
      spacing: {
        '60px': '60px',
      },
      fontFamily: {
        bulgaria: ['"Bulgaria Glorious Cyr"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

