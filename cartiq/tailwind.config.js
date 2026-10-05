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
        display: ['Fraunces', 'serif'],
        serif: ['DM Serif Display', 'serif'],
      },
      colors: {
        ink: {
          900: '#12263F',
          700: '#334A66',
          500: '#5B6F89',
          300: '#9AA8BA',
        },
        brand: {
          900: '#10294A',
          800: '#1B3A63',
          700: '#27507F',
          100: '#E6EDF7',
        },
        action: {
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
        },
        match: {
          50: '#EEF0FF',
          100: '#E0E3FF',
          600: '#4F46E5',
          700: '#4338CA',
        },
        good: {
          50: '#ECFDF5',
          600: '#059669',
        },
        bad: {
          50: '#FEF2F2',
          600: '#DC2626',
        },
        warn: {
          50: '#FFFBEB',
          500: '#D97706',
        },
        surface: {
          0: '#FFFFFF',
          50: '#F7F8FA',
          100: '#EEF1F5',
        },
        line: '#E3E8EF',
        primary: '#1B3A63',
        accent: '#F59E0B',
        success: '#059669',
        danger: '#DC2626',
        trust: '#4F46E5',
      },
      fontSize: {
        xs: ['12px', { lineHeight: '16px' }],
        sm: ['14px', { lineHeight: '20px' }],
        base: ['16px', { lineHeight: '24px' }],
        lg: ['18px', { lineHeight: '28px' }],
        xl: ['24px', { lineHeight: '32px' }],
        '2xl': ['32px', { lineHeight: '40px', letterSpacing: '-0.01em' }],
        '3xl': ['48px', { lineHeight: '52px', letterSpacing: '-0.02em' }],
      },
      borderRadius: {
        card: '12px',
        pill: '9999px',
      },
    },
  },
  plugins: [],
}
