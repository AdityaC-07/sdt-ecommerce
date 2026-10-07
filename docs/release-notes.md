# CartIQ Demo Eve Polish — Release Notes

## Summary of Completed Work

### 1. Standing Rules & Design System ("Sunset Bazaar")
- Applied Sunset Bazaar palette: dark plum stage (`night-950`), light lilac-mist shelf (`shelf-50`), marigold (`marigold-500`) for primary actions with dark ink text, orchid (`orchid-600`) reserved exclusively for IQ intelligence, lime (`lime-500`/`lime-800`) for savings & success.
- Shape language enforced across the entire app: pill-shaped controls (`rounded-full`), 20px radius cards (`rounded-[20px]`), 14px form fields, and Jharokha arch frames (`arch` / `rounded-t-full rounded-b-[24px]`).
- Cleaned title case to strict sentence case ("Add to cart", "Shop by aisle", "Say what you need").

### 2. Product Framing & Imagery (D1.1 & D1.4)
- Created `<ProductFrame>` component enforcing fixed ratio, arch clip geometry, gradient overlay, loading skeleton, and SVG vector art fallbacks.
- Redesigned `<ProductCard>` (grid, list, compact variants) with clean title parsing (strips duplicate brand prefix), star rating + trust badge pill, single badge, wishlist heart, key specs, delivery line, and morphing "Add to cart" checkmark button.

### 3. Hero & Brand Assets (D2.1 & D2.2)
- Rebuilt Home Hero (v2) with low-horizon radial sunset glow, blurred atmospheric blobs, film grain, balanced headline text, white composer pill, and Live Match Preview stack on the right column that updates live on query/chip selection.
- Created `<IQOrb>`, `<Logomark>`, and `<Wordmark>` brand components.

### 4. Navigation & Header Polish (D2.3)
- Added 2px sunset gradient hairline on header bottom edge.
- Single search entry control: header search hides on Home while hero composer is in view, sliding in when scrolled past.
- Added All Categories mega menu panel, Easy mode toggle button, cart count badge, and user menu dropdown.

### 5. Wow Sections & Page Rhythm (D3.1 – D3.5)
- **Watch IQ Think** (D3.1): Interactive 3-step visualization (Parse -> Filter -> Rank) showing candidate evaluation live.
- **Shop by Aisle** (D2.4): 3:4 arch-shaped category tiles with color washes and cutout images.
- **Departure Board Deals** (D3.2): Tabular countdown and split-flap style deal board.
- **No-Surprise Receipt** (D3.3): Thermal receipt card showing full cost breakdown and COD fee toggle.
- **Lens Cards** (D3.4): Persona cards for Student lens, Professional lens, and Easy mode.
- **Footer Finale** (D3.5): Large watermark, newsletter form, design process links, and credit lines.

### 6. Journey Hardening & Router Config (D0.2, D4.1 – D4.5)
- Fixed missing routes in `App.jsx` (`/search`, `/product/:id`, `/cart`, `/checkout`, `/orders`, `/orders/:id`, `/profile`, `/compare`, `/login`, `/register`, `/seller`, `/admin`).
- Added `DemoResetHandler` listening to `?demo=reset` to clear cart/session and seed demo accounts.
- Built interactive `ProductComparison` page for comparing up to 3 products side-by-side with IQ Verdict.
- Implemented `Login` with one-click demo credentials chips (`student@cartiq.demo`, `seller@cartiq.demo`, `admin@cartiq.demo`).
- Updated `OrderHistory` and `Profile` pages.
