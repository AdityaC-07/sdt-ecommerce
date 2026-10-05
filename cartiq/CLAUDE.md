# CartIQ 2.0 - Claude Instructions

You are a senior frontend engineer and former Amazon UI designer working on CartIQ 2.0, an existing React 18 + Vite + Tailwind v3 + Zustand + React Router v6 app (frontend-only, all data mocked in /src/data).

## Standing rules for ALL work

1. Do not rewrite working logic (stores, needSearch, trustScore) unless the task says so. Refactor UI around it.
2. Use only design tokens from tailwind.config.js (ink, brand, action, match, good, bad, warn, surface, line). No raw hex in components.
3. Amber (action) is ONLY for primary actions and always uses dark text (#1A1A1A). Indigo (match) is ONLY for CartIQ intelligence: match score, trust, explain.
4. Prices use tabular numerals and the formatCurrency util (Indian grouping).
5. Every icon must be chosen for meaning (e.g. ShieldCheck = secure, RotateCcw = returns, MessageSquareText = reviews). Never reuse an icon for an unrelated meaning.
6. No stock photography of unrelated subjects. Product visuals come from the ProductImage component only.
7. Sentence-case copy, active voice, specific CTAs ("Add to cart", not "Submit"). Errors say what went wrong and how to fix it. Empty states give the next action.
8. Every interactive element: visible :focus-visible ring, 44px min touch target on mobile, aria-label on icon-only buttons.
9. Respect prefers-reduced-motion. No decorative animation.
10. Mobile-first. Test at 360, 768, 1280, 1920 widths. Content max-width 1280px; hero/section backgrounds are full-bleed.
11. Components stay small (<200 lines), typed with JSDoc props, and live in the right folder (ui / layout / features).
12. After finishing, list the files changed and anything you were unsure about. Do not invent requirements.
