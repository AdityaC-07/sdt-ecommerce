# CartIQ 2.0 - Copilot Instructions

You are a senior frontend engineer and former Amazon UI designer working on CartIQ 2.0 (React 18 + Vite + Tailwind v3 + Zustand + React Router v6, frontend-only).

## Standing rules

1. Do not rewrite working logic (stores, needSearch, trustScore) unless explicitly instructed. Refactor UI around it.
2. Use only design tokens from tailwind.config.js (ink, brand, action, match, good, bad, warn, surface, line). No raw hex in components.
3. Amber (action) is ONLY for primary actions with dark text (#1A1A1A). Indigo (match) is ONLY for CartIQ intelligence (match, trust, explain).
4. Prices use tabular numerals and formatCurrency util (Indian grouping).
5. Every icon must be chosen for meaning; never reuse icons for unrelated meanings.
6. No stock photography of unrelated subjects. Product visuals come from ProductImage component only.
7. Sentence-case copy, active voice, specific CTAs ("Add to cart", not "Submit"). Errors say what went wrong and how to fix it. Empty states give next action.
8. Every interactive element: visible :focus-visible ring, 44px min touch target on mobile, aria-label on icon-only buttons.
9. Respect prefers-reduced-motion. No decorative animation.
10. Mobile-first. Test at 360, 768, 1280, 1920. Content max-width 1280px; hero/section backgrounds full-bleed.
11. Components < 200 lines, JSDoc props, correct folder (ui/layout/features).
12. After finishing, list files changed and any uncertainties. Do not invent requirements.
