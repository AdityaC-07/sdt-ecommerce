# CartIQ 3.0 — "Sunset Bazaar" Rebuild Prompt Guide

**A fully working, frontend-only e-commerce prototype: unique visual identity, real API architecture, matching product imagery, Groq-powered "Ask IQ" shopping assistant.**

> **Relationship to the 2.0 guide.** This guide **supersedes the 2.0 visual direction.** I proposed navy + amber + indigo there. Your feedback is right: that palette is a safer, more generic take than this project deserves. Everything visual below is new. Where the 2.0 guide's *functional* specs (checkout validation rules, returns wizard, seller/admin tables, test kit) are still good, this guide points to them by ID (e.g. "2.0 · P7.2") and re-skins and re-wires them to the new API layer instead of repeating them.

---

## 0. How to use this guide

1. Run prompts **in order**. One prompt per IDE chat. Commit after each (`git commit -m "3.0: P4.2"`).
2. Every build prompt (**B**) is followed by an **Enhance** prompt (**E**). Run the B first. Run the E when the B works, or skip it if you're short on time.
3. Paste **P0.1 (Global preamble)** into your IDE as a persistent rule (Cursor rules / `CLAUDE.md` / Copilot instructions) before anything else.
4. After each phase, run the **Critique prompt** (Appendix A).
5. `[BRACKETS]` = fill in yourself.

**If you only have time for ~12 prompts:** P0.2 → P1.1 → P2.1 → P2.2 → P2.3 → P3.2 → P3.4 → P4.2 → P4.3 → P5.2 → P6.1 → P8.1 + P8.3. That gives you a stunning landing page, matching images, a real API layer, and a working AI assistant.

**Counts:** 12 phases · 52 prompts (build + enhance) · critique prompt · definition of done.

---

## 1. Audit v2: what the deployed site (sdt-ecommerce.vercel.app) shows

Your two new screenshots are from the **deployed** build, and they reveal problems that your local screenshots hid. Overall rating you gave: 3.5/10. Agreed. Here's the diagnosis. These are **in addition to** audit items A1–A15 from the 2.0 guide (random landscape product photos, identical category icons, wrong trust icons, etc.), which all still apply.

| ID | Sev | Observation | Likely cause | Fixed in |
|----|-----|-------------|--------------|----------|
| B1 | 🔴 | **Hero search input is invisible.** On the navy hero there's a faint placeholder and no white field; only the amber button reads. The primary action of the whole product has no visible input. | Input has no background / transparent bg after a style change; placeholder color is dark on dark. | P0.2 |
| B2 | 🔴 | **`/design-process` has no layout container.** Headings, cards and the persona row are flush against the left edge (x=0) and bleed to the right edge, while the navbar is centered at ~1170px. Content and nav don't align. | The page isn't wrapped in `PageWrapper` / `.container`; also no top padding under the fixed nav, so the H1 touches it. | P0.2, P4.1 |
| B3 | 🔴 | **Web fonts aren't loading in production.** The headline renders in a generic system serif (Georgia-like), not DM Serif Display. Your local screenshots showed the real font. | Google Fonts `<link>` missing/blocked in the built `index.html`, or the weight/family string is wrong. | P0.2 (self-host fonts) |
| B4 | 🟠 | Persona cards are bare name buttons: no avatar, no role, no hint they're clickable, no expanded state visible. | Placeholder UI. | P11.2 |
| B5 | 🟠 | The problem-statement block uses an alarm-red border and pink fill. Reads like an error banner, not an editorial quote. | Wrong semantic color use. | P11.2 |
| B6 | 🟠 | Production vs local drift: different hero width, different fonts, different layout. | No design tokens; styling depends on environment (font load, container). | P0.2, P1.1 |
| B7 | 🟡 | Nav search "By Name / By Need" segmented control is visually heavier than the search field itself. | Control hierarchy inverted. | P4.1 |
| B8 | 🟡 | Hero "How CartIQ works" icons clip at the fold; the page has no visual personality beyond a flat gradient. | Template-level design. | P4.2–P4.7 |

**Root problem:** there's no design system, no image strategy, and no data/API layer, so every page is a one-off. This guide fixes the foundation first, then builds a signature experience on top.

---

## 2. Brand and visual system: "Sunset Bazaar"

**One-line idea:** *an Indian night market at golden hour, rebuilt as a smart store.* Deep plum nights, marigold and hibiscus glow, jharokha (arched window) frames around products, and a block-print texture. It is warm, loud in the right places, and not a SaaS wrapper.

### 2.1 Palette

| Role | Token | Hex | Use |
|------|-------|-----|-----|
| Stage (dark canvas) | `night-950` / `night-900` | `#150A24` / `#2B1148` | Header, hero, assistant, footer, spotlight sections |
| Shelf (light canvas) | `shelf-50` / `shelf-0` | `#F8F3FB` (lilac mist) / `#FFFFFF` | Product grids, PDP, cart, tables (legibility first) |
| Ink | `ink-900` / `ink-600` | `#1E1230` / `#5E5272` | Text on light |
| **Hibiscus** | `hibiscus-500` / `hibiscus-700` | `#FF2E63` / `#C70F45` | Deals, wishlist, "hot" moments. **Use 700 for text on light** (500 is only 3.6:1 on white) |
| **Marigold** | `marigold-400` / `marigold-500` | `#FFC247` / `#FFB020` | **All primary actions** (buy, search, continue). Always with `ink-900` text |
| **Mango** | `mango-500` | `#FF7A3D` | Bridge tone between hibiscus and marigold; gradients, cameras |
| **Orchid** | `orchid-400` / `orchid-600` | `#B592FF` / `#6E3FE0` | **Only for CartIQ intelligence:** IQ orb, match halo, explanations |
| Lime-tea | `lime-500` / `lime-800` | `#B8E65C` / `#3F5A00` | Success, in-stock, savings (text uses 800 on light) |

**Signature gradients**
- `--sunset`: `linear-gradient(100deg, #FF2E63 0%, #FF7A3D 55%, #FFB020 100%)`: the brand thread (logo mark, progress bars, active underlines, focus glow).
- `--iq`: `conic-gradient(from 210deg, #B592FF, #FF2E63, #FFB020, #B592FF)`: the IQ orb and match halo only.
- Dark stage wash: radial `#2B1148` → `#150A24`, with two blurred color blobs (hibiscus 18% opacity, orchid 14%) that drift very slowly.

**Category identity colors** (used for aisle tiles, chips, plinths): Laptops `orchid-400` · Headphones `hibiscus-500` · Smartphones `marigold-500` · Cameras `mango-500` · Smartwatches `lime-500` · Tablets `#FFD66B` · Speakers `#FF9ECD` · Televisions `#7CF2D4`.

**Rules:** no pure white-on-blue anywhere; no green-as-primary; no blue at all except none. Max 2 accent hues visible in any single viewport region.

### 2.2 Type
- **Display:** *Bricolage Grotesque* (variable, `wght` 700–800, `wdth` and `opsz` axes). Expressive grotesque with character; used for hero, section titles and prices-as-hero. Self-hosted via `@fontsource-variable/bricolage-grotesque`.
- **UI/body:** *Figtree* (variable) via `@fontsource-variable/figtree`, with `font-variant-numeric: tabular-nums` on all prices.
- Scale: 12 / 14 / 16 / 18 / 22 / 30 / 44 / `clamp(56px, 9vw, 128px)` for the hero. Display tracking −0.02em only at ≥44px; body tracking 0.
- No all-caps eyebrow labels above every heading. No spaced-em-dash labels. No arrow glyph appended to every button.

### 2.3 Shape, texture, motion
- **Arch frame (the shape motif):** product plinths, aisle tiles and hero orbit frames use a jharokha arch: `border-radius: 999px 999px 24px 24px`. Everything else: cards 20px, buttons fully pill, inputs 14px.
- **Texture:** 4% SVG film-grain overlay on dark stages only. A repeating block-print motif (simple geometric lotus/diamond SVG, 6% opacity) as section dividers. Nothing else decorative.
- **Elevation:** on light surfaces, use colored shadows derived from the product's story color (see 2.4) rather than generic gray.
- **Motion:** spring physics (`stiffness 260, damping 26`) for responses to user action; one orchestrated hero sequence on load; scroll-pinned storytelling in exactly one section; everything respects `prefers-reduced-motion`.

### 2.4 Five signature ideas (the "never seen before" part)
1. **IQ Orb.** A breathing conic-gradient orb is the face of the AI assistant. It idles, spins while thinking, and pulses once on answer. It appears in the header, hero composer, PDP and chat.
2. **Color-story.** At build time every product image is analyzed for its dominant color. That color becomes `--story` on the card, plinth, PDP background wash, and "Add to cart" glow. Browsing feels like walking past differently lit stalls.
3. **Lenses.** A persona "lens" (Student, Pro, Family, Easy) re-themes the entire site live: palette emphasis, density, which signals show first. It makes the Design Thinking personas something you can *see*.
4. **Departure-board deals.** Today's deals shown as a split-flap airport board with live countdowns. Bazaar energy, zero SaaS.
5. **No-surprise receipt.** The trust section is a torn-edge thermal-receipt card that itemizes MRP, discount, delivery ₹0, packaging ₹0, total. It makes "no hidden costs" a literal object.

---

## 3. Architecture: the "proper API structure"

### 3.1 Stack
React 18 + Vite · Tailwind v3 (tokens via CSS variables) · React Router v6.4+ **data router** (`createBrowserRouter`) · **TanStack Query** (server state) · **Zustand** (UI/session state only) · **zod** (schemas shared by mock server and client) · **MSW** (Mock Service Worker: a real `/api/v1/*` REST API running in the browser, visible in the Network tab, working on Vercel) · **idb-keyval** (persists the mock DB) · **motion** (`motion/react`, formerly framer-motion) · Radix UI primitives · Lucide icons · **Vercel serverless function** for the Groq proxy (`/api/ai/*`) so the API key never reaches the browser.

### 3.2 Folder structure (feature-sliced)

```text
/api                         ← Vercel serverless functions (real server code)
  ai/chat.js                    Groq streaming proxy
  ai/health.js
/scripts                     ← build-time tooling (node)
  generateCatalog.mjs           seeded catalog generator
  generateImages.mjs            image generation/sourcing (resumable)
  postprocessImages.mjs         cut-out, webp, thumbs, dominant color, blurhash
  verifyImages.mjs              Groq-vision match check
  summarizeReviews.mjs          Groq build-time review insights
  evalAssistant.mjs             golden-set evaluation
/public/products/{id}/{n}.webp  ← final images
/src
  /app            router.jsx, routes.config.js, providers.jsx, guards.jsx, meta.js
  /api            client.js (fetch wrapper), endpoints.js, errors.js, queryKeys.js,
                  /schemas (zod), /services (catalog, cart, orders, auth, ai ...)
  /mocks          browser.js, handlers/*.js, db.js (in-memory + IndexedDB), seed/*.json, latency.js
  /features       catalog, search, cart, checkout, orders, account, seller, admin, assistant, landing
                  (each: components/, hooks/, utils/)
  /components     ui/ (primitives), layout/, brand/ (Orb, ArchFrame, Wordmark, Halo)
  /design         tokens.css, themes (lens-*.css), motion.js, fonts.js
  /lib            money.js, dates.js, storage.js, analytics.js, a11y.js
  /pages          thin route components that compose features
```

### 3.3 REST contract (`/api/v1`, served by MSW)

Response envelope for **every** endpoint:

```json
{ "data": {}, "meta": { "page": 1, "limit": 24, "total": 96, "hasMore": true }, "error": null }
```
Errors: `{ "data": null, "error": { "code": "VALIDATION_FAILED", "message": "…", "fields": { "pincode": "Enter 6 digits" } } }` with real HTTP status codes (400/401/403/404/409/422/429/500). Simulated latency 120–450ms (configurable), optional failure injection (`?__fail=0.1` or a dev panel).

| Domain | Endpoints |
|--------|-----------|
| **Aggregates** | `GET /home` (hero previews, deals, shelves, stats, lens presets, in one payload) |
| **Auth** | `POST /auth/register` · `POST /auth/login` · `POST /auth/logout` · `GET /auth/me` · `PATCH /auth/me` (persona, lens, budget, easyMode) |
| **Catalog** | `GET /categories` · `GET /products` (`q, category, brand[], priceMin, priceMax, rating, discount, delivery, inStock, tags[], sort, page, limit`) · `GET /products/:id` · `GET /products/:id/related` · `GET /products/:id/price-history?days=` · `GET /deals` |
| **Search** | `GET /search/suggest?q=` · `POST /search/need` (body: `{ query, weights? }` → parsed intent + ranked products with `matchScore, components, reasons, tradeoffs`) |
| **Reviews / Q&A** | `GET/POST /products/:id/reviews` · `POST /reviews/:id/helpful` · `GET/POST /products/:id/questions` |
| **Compare** | `POST /compare` (body `{ ids[], weights? }` → table rows, winners, verdict) |
| **Cart** | `GET /cart` · `PUT /cart/items/:productId` (qty, variant) · `DELETE /cart/items/:productId` · `POST /cart/coupon` · `DELETE /cart/coupon` · `POST /cart/merge` (guest → user) · `POST /cart/save-for-later/:productId` |
| **Wishlist & alerts** | `GET /wishlist` · `PUT/DELETE /wishlist/:productId` · `GET/POST/DELETE /price-alerts` |
| **Delivery** | `GET /delivery/estimate?pincode=&productId=` |
| **Addresses** | `GET/POST /addresses` · `PATCH/DELETE /addresses/:id` |
| **Checkout & orders** | `POST /checkout/quote` (itemized totals, fees, offers) · `POST /payments/intent` · `POST /payments/confirm` · `POST /orders` · `GET /orders` · `GET /orders/:id` · `GET /orders/:id/tracking` · `POST /orders/:id/cancel` · `POST /orders/:id/returns` |
| **Notifications** | `GET /notifications` · `PATCH /notifications/:id/read` |
| **Seller** | `GET /seller/overview` · `GET/POST /seller/products` · `PUT/DELETE /seller/products/:id` · `GET /seller/orders` · `PATCH /seller/orders/:id` |
| **Admin** | `GET /admin/overview` · `GET /admin/users` · `PATCH /admin/users/:id` · `GET /admin/reviews?status=` · `PATCH /admin/reviews/:id` · `GET /admin/insights` |
| **Feedback / telemetry** | `POST /feedback` · `POST /events` · `POST /surveys/sus` |
| **AI (real serverless, not mocked)** | `POST /api/ai/chat` (SSE stream) · `GET /api/ai/health` |

### 3.4 Route table (React Router data router)

| Path | Page | Guard | Loader prefetch | `<title>` |
|------|------|-------|-----------------|-----------|
| `/` | Landing | none | `GET /home` | CartIQ: Say what you need |
| `/search` | Results | none | `/search/need` or `/products` from URL params | Results for "{q}" |
| `/c/:categorySlug` | Category | none | `/products?category=` | {Category} |
| `/p/:productId` | Product | none | product, related, price-history, reviews page 1 | {Brand} {Name} |
| `/compare` | Compare | none | `POST /compare` from `?ids=` | Compare |
| `/cart` | Cart | none (guest cart allowed) | `/cart` | Your cart |
| `/checkout` | Checkout | none (guest allowed) | `/cart`, `/addresses` | Checkout |
| `/orders` · `/orders/:id` | Orders / Tracking | `customer` | orders | Your orders |
| `/account/*` | Profile, addresses, wishlist, alerts, preferences | `customer` | per tab | Account |
| `/login` · `/register` | Auth | redirect if logged in | none | Sign in |
| `/sell/*` | Seller panel | `seller` | `/seller/overview` | Seller |
| `/admin/*` | Admin panel | `admin` | `/admin/overview` | Admin |
| `/case-study` | Design Thinking showcase | none | none | Our design process |
| `*` | NotFound | none | none | Page not found |

Every route object has `{ path, lazy, loader, errorElement, handle: { title, breadcrumb, guard } }`. Guards are loader-level redirects (not render-time flashes). Titles update `document.title`.

### 3.5 Environment variables
```text
VITE_USE_MOCK_API=true            # start MSW
VITE_API_BASE=/api/v1
VITE_AI_ENDPOINT=/api/ai/chat
GROQ_API_KEY=...                  # server only (Vercel env), never VITE_ prefixed
GROQ_MODEL=llama-3.3-70b-versatile  # verify current ids in console.groq.com/docs/models before use
GROQ_VISION_MODEL=[a vision-capable model id from the Groq console]
IMAGE_PROVIDER=pollinations|together|replicate|manual   # scripts only
IMAGE_API_KEY=...                 # scripts only
```
