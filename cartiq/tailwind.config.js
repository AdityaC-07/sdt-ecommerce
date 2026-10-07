/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Sunset Bazaar 3.0 type system
        sans: ['Figtree', 'system-ui', 'sans-serif'],
        display: ['Bricolage Grotesque', 'system-ui', 'sans-serif'],
        // Legacy aliases (kept for backward compat)
        serif: ['Bricolage Grotesque', 'system-ui', 'sans-serif'],
      },
      colors: {
        // ── Sunset Bazaar 3.0 palette ──────────────────────────────
        // Stage (dark canvas)
        night: {
          950: '#150A24',
          900: '#2B1148',
          800: '#3D1A60',
        },
        // Shelf (light canvas)
        shelf: {
          50: '#F8F3FB',
          0: '#FFFFFF',
        },
        // Ink (text)
        ink: {
          900: '#1E1230',
          600: '#5E5272',
          300: '#9AA8BA',
        },
        // Hibiscus — deals, wishlist, "hot" moments
        hibiscus: {
          500: '#FF2E63',
          700: '#C70F45',
        },
        // Marigold — ALL primary actions (with ink-900 text)
        marigold: {
          400: '#FFC247',
          500: '#FFB020',
          600: '#E09910',
        },
        // Mango — bridge tone, gradients
        mango: {
          500: '#FF7A3D',
        },
        // Orchid — CartIQ intelligence ONLY
        orchid: {
          400: '#B592FF',
          600: '#6E3FE0',
        },
        // Lime-tea — success, in-stock, savings
        lime: {
          500: '#B8E65C',
          800: '#3F5A00',
        },
        // Category identity colors
        category: {
          laptops: '#B592FF',    // orchid-400
          headphones: '#FF2E63', // hibiscus-500
          smartphones: '#FFB020',// marigold-500
          cameras: '#FF7A3D',    // mango-500
          smartwatches: '#B8E65C',// lime-500
          tablets: '#FFD66B',
          speakers: '#FF9ECD',
          televisions: '#7CF2D4',
        },

        // ── Legacy 2.0 aliases (backward compat) ─────────────────
        brand: {
          900: '#150A24', // → night-950
          800: '#2B1148', // → night-900
          700: '#3D1A60', // → night-800
          100: '#F8F3FB', // → shelf-50
        },
        action: {
          400: '#FFC247', // → marigold-400
          500: '#FFB020', // → marigold-500
          600: '#E09910', // → marigold-600
        },
        match: {
          50: '#F3EEFF',
          100: '#E8DBFF',
          600: '#6E3FE0', // → orchid-600
          700: '#5A2FC0',
        },
        good: {
          50: '#F0FAE0',
          600: '#3F5A00', // → lime-800
        },
        bad: {
          50: '#FFF0F3',
          600: '#C70F45', // → hibiscus-700
        },
        warn: {
          50: '#FFF8E8',
          500: '#E09910', // → marigold-600
        },
        surface: {
          0: '#FFFFFF',
          50: '#F8F3FB', // → shelf-50
          100: '#EDE5F5',
        },
        line: '#D9CEEA',
        primary: '#2B1148',
        accent: '#FFB020',
        success: '#3F5A00',
        danger: '#C70F45',
        trust: '#6E3FE0',
      },
      fontSize: {
        xs:   ['12px', { lineHeight: '16px' }],
        sm:   ['14px', { lineHeight: '20px' }],
        base: ['16px', { lineHeight: '24px' }],
        lg:   ['18px', { lineHeight: '28px' }],
        xl:   ['22px', { lineHeight: '30px' }],
        '2xl':['30px', { lineHeight: '38px', letterSpacing: '-0.01em' }],
        '3xl':['44px', { lineHeight: '50px', letterSpacing: '-0.02em' }],
        hero: ['clamp(56px,9vw,128px)', { lineHeight: '1.0', letterSpacing: '-0.02em' }],
      },
      borderRadius: {
        arch:  '999px 999px 24px 24px', // jharokha arch motif
        card:  '20px',
        pill:  '9999px',
        input: '14px',
      },
      backgroundImage: {
        // Signature gradients
        sunset: 'linear-gradient(100deg, #FF2E63 0%, #FF7A3D 55%, #FFB020 100%)',
        'iq-conic': 'conic-gradient(from 210deg, #B592FF, #FF2E63, #FFB020, #B592FF)',
        'night-stage': 'radial-gradient(ellipse at 50% 0%, #2B1148 0%, #150A24 100%)',
      },
      animation: {
        'orb-breathe': 'orb-breathe 3s ease-in-out infinite',
        'orb-spin':    'orb-spin 1.5s linear infinite',
        'orb-pulse':   'orb-pulse 0.4s ease-out',
        'drift-1':     'drift-1 18s ease-in-out infinite alternate',
        'drift-2':     'drift-2 22s ease-in-out infinite alternate',
      },
      keyframes: {
        'orb-breathe': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.9' },
          '50%':       { transform: 'scale(1.06)', opacity: '1' },
        },
        'orb-spin': {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
        'orb-pulse': {
          '0%':   { transform: 'scale(1)' },
          '50%':  { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        },
        'drift-1': {
          '0%':   { transform: 'translate(0, 0) scale(1)' },
          '100%': { transform: 'translate(40px, -30px) scale(1.1)' },
        },
        'drift-2': {
          '0%':   { transform: 'translate(0, 0) scale(1.1)' },
          '100%': { transform: 'translate(-30px, 40px) scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
