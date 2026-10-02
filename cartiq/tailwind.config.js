/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['DM Serif Display', 'serif'],
      },
      colors: {
        primary: '#1E3A5F',
        accent: '#F59E0B',
        success: '#10B981',
        danger: '#EF4444',
        trust: '#6366F1',
      },
      borderRadius: {
        card: '12px',
        pill: '9999px',
      },
    },
  },
  plugins: [],
}
