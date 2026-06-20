/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'portfolio-black': '#000000',
        'portfolio-white': '#FFFFFF',
        'portfolio-gray': '#666666',
        'portfolio-bg': '#FAFAFA',
        'portfolio-text': '#1A1A1A',
      },
      fontFamily: {
        'sans': ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
