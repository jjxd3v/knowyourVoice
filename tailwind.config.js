
/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#FAFAF8',
        'background-dark': '#0F172A',
        text: '#1A1A2E',
        'text-dark': '#F1F5F9',
        primary: '#0D9488',
        'primary-hover': '#0F766E',
        secondary: '#F59E0B',
        surface: '#FFFFFF',
        'surface-dark': '#1E293B',
        'border-dark': '#334155',
      },
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
        serif: ['"DM Serif Display"', 'serif'],
      },
    },
  },
  plugins: [],
}
