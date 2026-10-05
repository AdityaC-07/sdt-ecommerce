# CartIQ 2.0 — Makeover Prompt Guide

**Frontend-only · React 18 + Vite + Tailwind v3 + Zustand · Feedback-driven redesign, heavy UI polish, new features**

> Companion to the original *CartIQ IDE Prompt Guide* (Phases 1–7). That guide built the product. This one makes it feel like a product people would actually shop on. The bar: **Amazon-grade clarity and density, with CartIQ's own differentiator (guided, explainable, trustworthy decisions) as the visible hero.**

---

## 0. How to use this guide

1. Run prompts **in order**. Each phase assumes the previous one is merged.
2. **One prompt per IDE session/chat.** Commit after each prompt (`git commit -m "2.0: <prompt id>"`). If a prompt goes sideways, revert instead of arguing with the model.
3. Always paste the **Global Preamble (P0.1)** at the start of a new chat, or save it as a Cursor rule / `CLAUDE.md` / `.github/copilot-instructions.md` so it is applied automatically.
4. Every prompt has a **Goal**, the **Prompt** (paste-ready), and **Done when** (acceptance checks you verify yourself in the browser).
5. After each *phase*, run the **Phase Critique Prompt** in Appendix A. It makes the model audit its own work against the design principles, which catches most "looks AI-generated" problems.
6. Anything in `[BRACKETS]` is for you to fill in.

**Prompt count:** 14 phases (0–13) · 46 prompts · 1 critique prompt · 1 QA checklist.

---

## 1. Audit: what's wrong with the current build

Heuristic review of the three screenshots (Home hero, Shop by Category + Featured Products, Trust strip + Shop Your Way + Design Thinking banner). Severity: 🔴 breaks credibility, 🟠 hurts usability/conversion, 🟡 polish.

| ID | Sev | Observation | Why it matters | Fixed in |
|----|-----|-------------|----------------|----------|
| A1 | 🔴 | Product images are random `picsum.photos` landscapes (a cliff with houses, a forest road, a beach) on laptops and headphones. | Nobody trusts a store whose Dell XPS is a photo of a road. It also undermines the "Trust Score" promise. | P1.1, P1.2 |
| A2 | 🔴 | All five category cards show the **same magnifier icon**. The icon-name lookup from `categories.json` is falling back to a default. | Looks broken; kills scanability of categories. | P1.3 |
| A3 | 🔴 | Trust strip icons are semantically wrong: lightning bolt = "Transparent Reviews", target = "Secure Payments", accessibility figure = "Easy Returns". | Icons are the fastest-read signal. Wrong icons erode the exact trust the strip is meant to build. | P1.3, P3.5 |
| A4 | 🟠 | The hero sits in a ~1170px box with white gutters while the navbar spans full width. It reads as a card, not a hero. | Weak first impression on wide screens; wasted space. | P2.4, P3.1 |
| A5 | 🟠 | Two competing search entry points (nav search with By Name/By Need toggle, and a hero "Find My Match" input). Different mental models, duplicated UI. | Users don't know which is "the" search; the flagship By Need feature is hidden in a tiny toggle. | P2.1, P3.1, P4.1 |
| A6 | 🟠 | "Learn About Our Design Thinking Journey" banner sits in the consumer storefront. | It's evaluator content, not shopper content. Breaks the illusion of a real store. Belongs in the footer / a `/case-study` route. | P3.5, P13.2 |
| A7 | 🟠 | Three identical "Shop Your Way →" buttons for Students / Professionals / Seniors. | Same label, three destinations, no indication of what happens. Should apply a persona preset. | P3.4, P8.1 |
| A8 | 🟠 | Featured product cards: weak hierarchy (brand, name, price only above the fold), no rating, discount, delivery or trust cue visible; the tab pills have no clear active state. | Cards are the unit of conversion. Amazon shows rating, review count, price anchoring, delivery promise at a glance. | P4.3, P3.2 |
| A9 | 🟠 | "6 products" per category. | A catalog this thin makes filters and smart match feel fake. | P1.2 |
| A10 | 🟡 | Typography: very tight tracking on the heavy serif (glyphs collide, e.g. "Sony" renders like "Sopy"); section headings inconsistent in scale (huge hero, ~28px elsewhere); serif used for UI-level headings. | Reads unrefined; no clear type scale. | P0.2 |
| A11 | 🟡 | Every section repeats the same pattern: centered heading, lavender icon bubble, two lines of gray text. Three accent systems (navy, amber, indigo/lavender) compete. | Monotone rhythm; no focal point; palette feels templated. | P0.2, P3.x |
| A12 | 🟡 | Navbar: logged-out state shows only Login/Register. No cart, wishlist, location/pincode, or orders. The senior-mode icon is an unlabeled glyph. | Guests can't see the cart; the accessibility feature, a key differentiator, is undiscoverable. | P2.1, P11.1 |
| A13 | 🟠 | Amazon-parity gaps: no delivery promise by pincode, no deals urgency, no recently viewed, no price anchoring, no price history, no bank offers/EMI, no "bought together." | These are the patterns shoppers rely on to decide quickly. | P3.2, P5.x, P7.x |
| A14 | 🟡 | "How CartIQ Works" is generic icon-in-bubble steps with no demonstration. | The best way to explain "smart match" is to *show* it with a live example. | P3.3 |
| A15 | 🟡 | Sections alternate white / near-white with almost no separation. | Page feels flat; scroll rhythm is lost. | P0.2, P2.4 |

---

## 2. Feedback intake (plug your real user feedback in here)

The audit above is heuristic. The strongest version of this project ties every redesign decision to a **real quote from a real tester**. Fill this table from your usability sessions, survey, or classmates' reactions, then reference the IDs (F1, F2, ...) in your commit messages and in the `/case-study` page (P13.2).

| ID | Source (tester / persona) | Verbatim feedback | Theme | Severity | Addressed by prompt |
|----|---------------------------|-------------------|-------|----------|---------------------|
| F1 | [e.g. Tester 1 — student] | "[quote]" | [Trust / Search / Layout / Speed / Accessibility] | [H/M/L] | [P#.#] |
| F2 | | | | | |
| F3 | | | | | |

**Starter themes that almost always show up** (use them as interview probes if you haven't tested yet):
- "I couldn't tell where to start." → P3.1, P4.1
- "The pictures look fake / don't match the product." → P1.1
- "I wasn't sure if the recommendation was real." → P4.5, P5.2
- "I want to know when it'll arrive at *my* place." → P5.1, P7.2
- "Too many steps to buy." → P7.2
- "Text is too small / I can't find the button." → P11.1

---

## 3. Design direction (the north star every prompt references)

**Concept: "The Confident Shelf."** A calm, well-lit store where the shopper is guided to a decision. Quiet chrome, dense useful product information, and one memorable thing: the **Match Ring**, a small circular match-percentage indicator that appears everywhere a recommendation appears and is always explainable on hover/tap.

**Principles**
1. **Decide, don't browse.** Every screen answers "what should I buy and why?"
2. **Show your work.** Any score (match, trust, value) must expand into its reasons in one tap.
3. **Density with order.** Amazon-level information per card, with strict hierarchy: price, rating, delivery, trust.
4. **Real content only.** No lorem, no landscape photos, no generic icons. Copy is specific and in plain sentence case.
5. **One bold move per screen.** The rest stays quiet.
6. **Accessible by default,** not as a bolt-on mode.

**Proposed tokens** (override in P0.2 if you prefer another palette):

| Role | Token | Value |
|------|-------|-------|
| Ink (text, primary surfaces) | `ink-900` / `ink-700` | `#12263F` / `#334A66` |
| Brand navy (header, hero) | `brand-800` | `#1B3A63` |
| Action (CTAs only) | `action-500` | `#F59E0B` with **`#1A1A1A` text** |
| Match / trust (the one cool accent) | `match-600` | `#4F46E5` |
| Positive / Negative / Warning | `good-600` / `bad-600` / `warn-500` | `#059669` / `#DC2626` / `#D97706` |
| Surface | `surface-0` / `surface-50` / `surface-100` | `#FFFFFF` / `#F7F8FA` / `#EEF1F5` |
| Hairline | `line` | `#E3E8EF` |

Rule: **amber means "do the thing" (buy / search / continue) and nothing else. Indigo means "CartIQ intelligence" (match, trust, explain) and nothing else.** That ends the competing-accent problem from A11.

**Type:** UI and body in **Inter** (with `font-variant-numeric: tabular-nums` on every price). Display in a single serif, used **only** for the hero headline and editorial pages (case study), not for section titles or card titles. Define a 7-step scale: 12 / 14 / 16 / 18 / 24 / 32 / 48, with line heights and tracking set per step. **No negative tracking below 32px.**

**Motion:** one orchestrated page-load moment on Home; everything else is *response to user action* (add to cart, expand, confirm). Respect `prefers-reduced-motion`.

---

# PHASE 0 — Foundations (don't skip; everything else depends on it)

### P0.1 — Global preamble (paste first in every new chat)

**Goal:** Give the AI assistant the standing rules so output stays consistent.

```text
You are a senior frontend engineer and former Amazon UI designer working on CartIQ 2.0, an existing React 18 + Vite + Tailwind v3 + Zustand + React Router v6 app (frontend-only, all data mocked in /src/data).

Standing rules for ALL work:
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
```

**Done when:** it's saved as a persistent rule file in your IDE.

---

### P0.2 — Design tokens, type scale, global CSS

**Goal:** Replace ad-hoc colors and fonts with a real token system (fixes A10, A11, A15).

```text
Refactor the design foundation of CartIQ.

1. tailwind.config.js: replace the existing custom colors with the token set below, and keep old names (primary, accent, trust) as aliases temporarily so nothing breaks.
   ink: { 900:'#12263F', 700:'#334A66', 500:'#5B6F89', 300:'#9AA8BA' }
   brand: { 900:'#10294A', 800:'#1B3A63', 700:'#27507F', 100:'#E6EDF7' }
   action: { 400:'#FBBF24', 500:'#F59E0B', 600:'#D97706' }
   match: { 50:'#EEF0FF', 100:'#E0E3FF', 600:'#4F46E5', 700:'#4338CA' }
   good: { 50:'#ECFDF5', 600:'#059669' }  bad: { 50:'#FEF2F2', 600:'#DC2626' }  warn: { 50:'#FFFBEB', 500:'#D97706' }
   surface: { 0:'#FFFFFF', 50:'#F7F8FA', 100:'#EEF1F5' }  line: '#E3E8EF'
2. Type scale in tailwind fontSize with line-height and letterSpacing: xs 12/16, sm 14/20, base 16/24, lg 18/28, xl 24/32, 2xl 32/40 (tracking -0.01em), 3xl 48/52 (tracking -0.02em). Never negative tracking below 32px.
3. Fonts: Inter (400/500/600/700) for UI. One display serif (use "Fraunces" 600, opsz auto) ONLY for the hero headline and the case-study page. Remove the serif from section headings, card titles and the logo wordmark (logo becomes Inter 700, tight but readable).
4. index.css: CSS custom properties for the tokens (so senior/dark/high-contrast themes can override them later), tabular-nums utility class `.num`, a global focus-visible ring (2px outline in action-500, offset 2px), `scroll-behavior: smooth` guarded by prefers-reduced-motion, and a `.container-page` utility (max-w 1280px, px-4 sm:px-6 lg:px-8, mx-auto).
5. Create a section-rhythm utility: alternating section backgrounds use surface-0 and surface-50 with a 1px line divider so sections are visibly separated.
6. Create /src/components/ui/Typography.jsx exporting <H1>, <H2>, <H3>, <Body>, <Caption> bound to the scale.
7. Search the codebase and replace hard-coded hex colors and font-serif usages with tokens.

Do not change layout or copy yet.
```

**Done when:** the app looks nearly the same but headings no longer collide, and `grep -R "#1E3A5F" src` returns nothing outside the config.

---

### P0.3 — Project hygiene and safety nets

**Goal:** Make later refactors safe and the app resilient.

```text
Add engineering hygiene to CartIQ without changing UI:
1. Path alias "@/" -> /src in vite.config.js and jsconfig.json; migrate imports gradually (only files you touch).
2. ESLint + Prettier (react, react-hooks, jsx-a11y plugins). Fix auto-fixable issues; list the rest.
3. A global <ErrorBoundary> in App with a friendly fallback ("Something went wrong on our side. Reload the page or go back home.") and a reset button.
4. A <NotFound/> page for unknown routes with search box and top categories.
5. Route-level code splitting with React.lazy + Suspense using SkeletonPage fallbacks (create SkeletonPage in ui/Skeleton.jsx).
6. ScrollToTop on route change (but preserve scroll on back navigation using location.key).
7. A /src/lib/storage.js wrapper around localStorage with try/catch and versioned keys ("cartiq:v2:...") and a one-time migration that clears old keys.
8. Add `npm run lint` and `npm run build` to a README "Quality gates" section.
```

**Done when:** `npm run build` and `npm run lint` pass; visiting `/nope` shows the 404.

---

# PHASE 1 — Visual identity, assets, and a believable catalog

### P1.1 — ProductImage system (fixes A1)

**Goal:** Kill the random landscape photos. Every product gets a believable, consistent visual with no external dependency.

```text
Create /src/components/ui/ProductImage.jsx and an asset strategy so no product ever shows an unrelated photo.

Approach (implement in this order of preference, with graceful fallback):
A) If product.images[i] points to a file in /public/products/, render it with <img loading="lazy" decoding="async" width/height set> inside a fixed aspect-ratio box with `object-contain` on a soft surface-50 background and 8% inner padding (product-on-white, like Amazon).
B) If the image is missing or errors, render a generated SVG "product render" tailored to the category: a clean flat-vector laptop, headphones, phone, camera or smartwatch silhouette, tinted by a per-product accent color derived deterministically from product.id, with the brand name as a small wordmark and a subtle ground shadow. Build one small SVG component per category in /src/components/ui/product-art/ (LaptopArt, HeadphonesArt, PhoneArt, CameraArt, WatchArt, plus TabletArt, SpeakerArt, TvArt for new categories). Each accepts {accent, brand, variant} so different products of the same category look different (e.g. laptop lid color, headphone cup shape, phone camera-bump layout).
C) Support multiple "views": variant 0 = hero angle, 1 = side, 2 = detail/close-up, 3 = in-use context chip (e.g. "Gym", "Travel", "Desk") so the PDP gallery has 4 distinct frames.

Also:
- Props: product, index=0, size ('thumb'|'card'|'hero'), priority (bool for eager load), zoomable (bool).
- Add a skeleton shimmer until the image is decoded.
- alt text auto-generated: "{brand} {name} — {color/variant} {category}" and view name.
- Replace every image usage across the app (cards, cart, checkout summary, orders, comparison, seller form preview) with <ProductImage/>.
- Remove all picsum.photos URLs from /src/data/products.json.
- Document in README how to drop real photos into /public/products/{id}-{n}.webp and have them picked up automatically.
```

**Done when:** no screen shows a landscape photo; two laptops look different from each other; PDP gallery shows 4 distinct frames.

---

### P1.2 — Expand and enrich the catalog (fixes A9, supports A13)

**Goal:** A catalog big enough that filters, smart match, and comparison feel real, plus the fields Amazon-style pages need.

```text
Rewrite /src/data/products.json generation. Create a Node script /scripts/generateProducts.mjs (seeded RNG so output is stable) that outputs /src/data/products.json with 96 products:
- 8 categories x 12 products: Laptops, Headphones, Smartphones, Cameras, Smartwatches, Tablets, Speakers, Televisions. Update categories.json (icons chosen for meaning: Laptop, Headphones, Smartphone, Camera, Watch, Tablet, Speaker, Tv) with subcategories.
- Use REAL, plausible brands and model names for the Indian market, with realistic specs and INR prices. Spread prices across budget / mid / premium so "under ₹20k with good camera" has several valid answers.
Each product keeps existing fields and adds:
  images: ["p001-1","p001-2","p001-3","p001-4"] (ids resolved by ProductImage)
  colors: [{name:"Graphite", hex:"#3A3F47"}, ...] 2-4 per product
  variants: [{id, label:"16GB / 512GB", price, stock}]  (where relevant)
  stockCount: number (low stock if <8 shows "Only X left")
  priceHistory: 90 daily points ending at current price, with realistic dips and one "lowest in 90 days" event for ~20% of products
  offers: [{type:"bank", text:"₹1,500 off with HDFC cards"}, {type:"emi", text:"No-cost EMI from ₹3,833/mo"}, {type:"exchange", text:"Up to ₹6,000 off on exchange"}]
  deliveryRules: { standardDays, expressDays, codAvailable, returnDays, replacementOnly }
  warranty: "1 year manufacturer"
  highlights: 4-5 short bullet strings (what a human would put in "About this item")
  qa: 3-5 {question, answer, answeredBy:"Seller"|"Verified buyer", helpful}
  reviews: 8-14 realistic reviews each with aspect tags (e.g. ["battery","display"]) and sentiment per aspect
  aspectSentiment: { battery:{positive:81,negative:9}, display:{...}, build:{...}, value:{...} }
  ratingBreakdown: {5:..,4:..,3:..,2:..,1:..} consistent with rating and reviewCount
  valueScore: 0-100 (computed: spec-per-rupee vs category median)
  needTags: richer set (e.g. "video editing","travel","commute","gym","kids","gifting","one-handed use")
  releaseDate for "Newest" sort.
Make the data internally consistent (discount% = (original-price)/original; ratingBreakdown sums to reviewCount).
Also generate /src/data/pincodes.json with ~40 Indian pincodes across metros/tier-2/remote and deliveryDays modifiers (metro +0, tier-2 +1, remote +3) for the delivery estimator.
Keep trustScore computed by utils/trustScore.js, not hard-coded.
```

**Done when:** every category shows 12 products; two budget phones under ₹20k exist with strong camera tags; price history arrays render.

---

### P1.3 — Icon system audit (fixes A2, A3)

**Goal:** Every icon means what it says.

```text
Create /src/components/ui/Icon.jsx: a single registry component <Icon name="shield" size={20} />. Map semantic names to Lucide icons in ONE place (/src/constants/icons.js):
  secure: ShieldCheck | returns: RotateCcw | reviews: MessageSquareText | verified: BadgeCheck | delivery: Truck | fastDelivery: Zap | cod: Banknote | upi: Smartphone | warranty: ShieldPlus | trust: ShieldHalf | match: Target | compare: Columns3 | wishlist: Heart | cart: ShoppingCart | seniorMode: Accessibility (also label it with text, see P11.1) | support: Headset | offers: BadgePercent | priceDrop: TrendingDown | location: MapPin | categories: LayoutGrid
In dev mode, if a name is missing from the registry, render a red dashed box with the missing name and console.warn (never silently fall back to Search).
Fix the root cause of the identical category icons: categories.json "icon" strings must resolve through the registry; add a unit test that every category.icon resolves.
Replace every direct lucide import in components with <Icon/> where the icon carries meaning.
```

**Done when:** all category cards have distinct icons; the missing-icon dev warning never fires.

---

# PHASE 2 — Global shell (Navbar, search, footer, layout)

### P2.1 — Navbar v2 (fixes A5, A12)

**Goal:** A two-tier, Amazon-style header that surfaces cart, location, and the flagship By Need search, on every state.

```text
Rebuild /src/components/layout/Navbar.jsx as a two-tier header (sticky, z-50).

TIER 1 (brand-900 background, 64px desktop / 56px mobile):
- Logo (Inter 700 wordmark "CartIQ" + small bolt mark; the "IQ" in action-400).
- Deliver-to selector: MapPin + "Deliver to Mumbai 400001" (two-line: small label / bold pincode). Click opens a Popover to enter a 6-digit pincode (validate against pincodes.json) and stores it in a new locationStore (persisted). Used later by delivery estimates.
- Unified search (center, flexible width, 44px tall): a segmented control INSIDE the field: [Smart ▾]. Default mode = "Describe what you need" with the placeholder rotating every 4s through examples ("Laptop for ML under ₹70,000", "Headphones for gym under ₹3,000", "Phone with great camera under ₹20,000"). A small secondary toggle "Search by product name" switches modes. Both modes submit to /search (needQuery or q). Magnifier button in action-500 with dark icon.
- Right cluster: Account ("Hello, Aarav" / "Sign in" with dropdown), Orders (returns & orders link), Wishlist (count badge), Cart (count badge, links to /cart, opens the mini-cart drawer on hover/focus desktop, see P7.1). Cart is visible even when logged out.
- Accessibility button: labeled pill "Easy mode" with Accessibility icon (not an anonymous glyph); when active, shows "Easy mode on" in action-500.

TIER 2 (brand-800, 40px, horizontally scrollable on mobile):
- "All categories" button opening a mega menu (see below), then category links (Laptops, Headphones, Smartphones, ...), "Deals", "Best sellers", "Compare (n)" if comparisonList has items, "Help".

MEGA MENU (desktop): full-width panel below the header; left column lists categories, right shows subcategories, a "Shop by need" column with 4 need chips per category (e.g. Laptops: "Coding & ML", "Video editing", "Student budget", "Light & portable") that deep-link to need searches, and a promo card for current deals. Keyboard: arrow keys move between categories, Esc closes, focus is trapped while open.

MOBILE: top bar with hamburger, logo, cart. Search is a full-width field on its own row below. Hamburger opens a left drawer (Radix Dialog) with account block, categories accordion, Easy mode toggle, help. Add a fixed BOTTOM NAV (Home, Categories, Smart search, Cart, Account) with 56px height; hide on checkout.

Technical: header must not cause layout shift on scroll; add a subtle shadow only after scrollY > 8. All dropdowns are closable by Esc and outside click. Do not use hover-only interactions on touch devices.
```

**Done when:** a logged-out visitor sees cart + deliver-to; By Need is the default search; mega menu is fully keyboard-operable; mobile bottom nav appears.

---

### P2.2 — Search typeahead + command palette

**Goal:** Fast, forgiving search that teaches the By Need syntax.

```text
Build search suggestions and a global command palette.

1. /src/components/features/SearchSuggest.jsx rendered under the navbar search field (Radix Popover, aria-combobox pattern, up/down/enter/esc keyboard support):
   - Empty focus: "Recent searches" (last 6, from searchStore persisted, each with a remove x), "Trending needs" (4 curated need queries), "Browse categories" chips.
   - Typing (debounce 150ms): sections "Products" (top 4 by name match with thumbnail + price, highlighted matched substring), "Categories", and "Smart searches" (2-3 generated phrasings, e.g. typing "headph" suggests "Headphones under ₹5,000 for travel"). Use a small fuzzy matcher (implement scoring yourself or add fuse.js).
   - In needs mode, show a live "We understood: Category Laptops · Budget ≤ ₹70,000 · Use ML" chips preview parsed by needSearch.parseNeed (export that function if it's currently private). Each chip is removable and re-submits.
2. Command palette: Cmd/Ctrl+K opens a Radix Dialog palette with actions (Go to Cart, Orders, Compare, Toggle Easy mode, Toggle dark mode, Search "..."), recent products, and categories. Also "/" focuses the search field.
3. Persist recent searches (max 10, deduped). Add a "Clear history" link.
4. Zero results: suggest widening budget by 15%, dropping the least important tag, or a different category, each as a one-click chip.
```

**Done when:** typing "lap" shows products with thumbnails; Cmd+K works; the parsed chips are removable.

---

### P2.3 — Footer v2 (fixes A6 partially)

**Goal:** Substantial, trustworthy footer; home for the design-process link.

```text
Redesign /src/components/layout/Footer.jsx.
- Top strip (surface-100): "Back to top" button full-width like Amazon.
- Four link columns + a fifth "About CartIQ" column that contains: How smart match works (opens a Dialog explaining need parsing and scoring in plain language), How trust score works (links to a /trust-score explainer anchor), Accessibility statement, and "Our design process" (link to /case-study). This is where the Design Thinking material lives, not on the storefront.
- Delivery & returns block with three concrete promises (icons from registry): "10-day returns on most items", "Pay after delivery on eligible orders", "Delivery estimate shown before you pay".
- Newsletter field (validates email, success toast "You're subscribed. First deal alert coming soon.").
- Language and region selectors (visual only for now: English / हिन्दी, India).
- Bottom bar: © 2026 CartIQ, payment method chips as simple outlined pills (UPI, Visa, Mastercard, NetBanking, COD), small "Made for a Software Design Thinking project" line with link to /case-study.
Colors: brand-900 background, link text white at 80% with underline on hover (not amber).
```

**Done when:** the DT journey is reachable only from the footer and `/case-study`, not the Home page.

---

### P2.4 — Layout grid, full-bleed sections, breadcrumbs, transitions (fixes A4, A15)

**Goal:** Fix the boxed-in feeling and give every page a consistent structure.

```text
Update PageWrapper and layout primitives:
1. <Section bleed bg="surface-0|surface-50|brand" > component: background spans full viewport width; inner content uses .container-page. Replace the boxed hero container and section backgrounds on Home with <Section>.
2. <Breadcrumbs/> component (semantic nav aria-label="Breadcrumb", schema-friendly markup) used on Search, Product, Compare, Cart, Checkout, Orders. Auto-derive from route + category.
3. Page header pattern: H1 + optional subtitle + right-side actions, consistent spacing (24px below nav, 32px between sections).
4. Route transitions: a single 150ms opacity transition on the <main> outlet; disabled for reduced motion. Remove per-component fade-in classes.
5. Remove fixed pt-16 hacks; header height is a CSS variable (--header-h) used by sticky elements (filters, buy box) so offsets are never hard-coded.
6. Skip link ("Skip to content") as the first focusable element.
```

**Done when:** at 1920px the hero background reaches both edges and content stays at 1280px.

---

# PHASE 3 — Home v2

### P3.1 — Hero as the Need Composer (fixes A4, A5)

**Goal:** The hero IS the product. Show smart match working instead of describing it.

```text
Rebuild the Home hero in /src/pages/customer/Home.jsx using <Section bleed bg="brand">.

Layout (desktop): two columns, 7/5.
LEFT: serif H1 "Tell us what you need. We'll find what fits." (48/52, max 12 words, no one-word color accent), one supporting sentence ("Describe your budget and priorities in your own words. CartIQ shows the best matches and explains each one."), then the NEED COMPOSER:
  - Large text field with rotating example placeholder.
  - Under it, three quick controls that write into the sentence AND the parsed state: Budget slider (₹5k–₹2L, with preset chips ₹10k / ₹25k / ₹50k / ₹1L), Use-case chips (Study, Work, Gaming, Travel, Fitness, Gifting) and a "What matters most" 3-way priority rank (drag or tap to order: Battery, Performance, Camera, Weight, Price, Sound).
  - Primary button "Show my matches" (action-500, dark text). Secondary text link "Or browse by category".
RIGHT: a LIVE PREVIEW card stack that updates (debounced 300ms) as the user types or changes controls: the top 3 matches from matchProductsToNeed rendered as compact cards with Match Ring (percentage), price, and one reason line each ("Within budget · 14hr battery"). If nothing is typed, cycle a pre-baked example every 6s with a pause on hover/focus. This is the single orchestrated motion on the page.

Below the composer: example chips ("Laptop for ML ₹70k", "Phone under ₹20k with good camera", "Headphones for gym under ₹3k") that fill the composer and trigger the preview, not navigate immediately.

Mobile: composer first, preview becomes a horizontally snapping carousel below. Hero must be fully usable without scrolling past one viewport at 390x844.
Remove the "Simplified Shopping Mode" banner from the hero; Easy mode state is shown in the header (P2.1).
```

**Done when:** typing "laptop under 70k for ML" instantly shows 3 live matches with Match Rings; the example chips fill the field.

---

### P3.2 — Personalized shelves (fixes A8, A13)

**Goal:** A home page that has something for returning users and creates urgency honestly.

```text
Below the hero, add these shelves (each is a horizontally scrollable <Shelf> with arrow buttons, scroll-snap, and keyboard support; no auto-play):
1. "Continue where you left off": last 6 viewed products (from a persisted recentlyViewedStore) + saved search chips. Hidden if empty.
2. "Top matches for students on a ₹50k budget" etc.: shelf title derives from the active persona/budget in authStore; if logged out, use "Popular needs this week" (4 need tiles: each a mini-card with an image collage of 3 ProductImage thumbnails, the need sentence, and "12 matches").
3. "Today's deals": product cards with discount badge, a strike-through original price, and a REAL countdown to midnight (client clock) labeled "Deals refresh in 06:42:10". Claimed % bar ("62% claimed") derived from stockCount.
4. "Biggest price drops": products whose priceHistory shows a drop in the last 7 days with a tiny sparkline and "Lowest in 90 days" chip.
5. "Best sellers by category": tabs per category (Radix Tabs), 6 cards each.
Tab pills for Best sellers / Top rated / Deals must show a clear active state (filled brand-800, white text) and keyboard arrow navigation.
Every card uses ProductCard v2 (P4.3). Skeleton shelves for 400ms on first load only.
```

**Done when:** viewing 3 products makes "Continue where you left off" appear; the deal countdown ticks.

---

### P3.3 — "How CartIQ works", demonstrated (fixes A14)

**Goal:** Replace generic icon steps with an interactive, three-frame explanation.

```text
Replace SECTION 2. Build a 3-step explainer where each step is a real mini-UI, not an icon:
 Step 1 "Say what you need": a static example sentence with parsed chips highlighted beneath it (Category, Budget, Use, Priority).
 Step 2 "We rank by your priorities": three tiny bar-score rows (Price fit, Battery, Rating) animating once when scrolled into view (IntersectionObserver, once only).
 Step 3 "See why, then decide": an ExplainCard (compact) with the Match Ring and three reason lines.
Steps are connected by a thin line on desktop, stacked on mobile. Step numbers are shown because this IS a sequence. Copy is one sentence per step. A text link "Try it with your own need" scrolls to and focuses the hero composer.
```

**Done when:** the section communicates the concept without reading paragraphs.

---

### P3.4 — Shop by category and "Shop your way" that actually do something (fixes A2, A7)

**Goal:** Real category tiles and persona presets with distinct, honest CTAs.

```text
1. Category grid: 8 tiles (4x2 desktop, 2x4 mobile). Each tile: a 2x2 mosaic of ProductImage thumbnails from that category's top items, category name, "12 products" and the lowest price ("from ₹2,499"). Hover: border color change and image scale 1.03 (no lift/shadow combo). Fix icon usage through <Icon/>.
2. Replace "Shop Your Way" with three distinct cards, each applying a PRESET and navigating:
   - "Student budget": CTA "See laptops and phones under ₹50,000" -> /search?preset=student (sets budgetMode, sorts by valueScore, filters tag "student").
   - "Busy professional": CTA "Get 3 quick picks in a minute" -> opens the Need Wizard (P4.1) pre-set to "fast decision" mode.
   - "Easy shopping": CTA "Turn on larger text and simpler pages" -> toggles Easy mode (shows toast "Easy mode on. You can turn it off from the header.") and stays on page.
   Each card shows a 2-line "what changes" list (e.g. "Budget slider pinned. Value score shown on cards.").
3. Persist chosen preset in a personaStore; show a dismissible chip in the header area ("Student budget · Change").
```

**Done when:** three different outcomes; the preset chip appears and can be changed.

---

### P3.5 — Trust strip and storefront cleanup (fixes A3, A6)

```text
Rebuild the trust strip with correct icons from the registry and slightly richer, specific copy:
 - ShieldCheck "Pay securely" / "UPI, cards, net banking and pay on delivery"
 - BadgeCheck "Verified sellers" / "Every seller is identity-checked"
 - MessageSquareText "Reviews we summarize for you" / "Pros and cons from thousands of reviews"
 - RotateCcw "10-day returns" / "Free pickup on eligible items"
Each item is a link to the relevant explainer (Dialog). Remove the "Learn About Our Design Thinking Journey" banner from Home entirely (it lives in the footer and /case-study).
Add a slim "Why shoppers trust CartIQ" row of three real-looking stats derived from the mock data (e.g. "4.4 average seller rating", "96% reviews from verified buyers", "Median delivery 2 days"), computed at build time from products.json, not hard-coded.
```

**Done when:** every icon matches its label; no academic banner on the storefront.

---

# PHASE 4 — Discovery (the flagship experience)

### P4.1 — Need Wizard with live priority sliders

**Goal:** The "which product should I actually buy?" moment, turned into a guided, reversible flow.

```text
Create /src/pages/customer/NeedWizard.jsx (route /find) and a reusable <PriorityPanel/>.

Flow (single page, 3 collapsible steps with a progress header, answers editable at any time):
 1. What are you shopping for? Category tiles (with ProductImage mosaic) or free text.
 2. Budget & use: budget range slider with histogram of how many products fall at each price (draw with divs), and use-case chips specific to the category (Laptops: Coding, ML, Video editing, Student, Business; Headphones: Gym, Travel, Calls, Gaming, Studio).
 3. What matters most? 5 priority sliders (0–100, default 50): Price, Performance, Battery, Portability, Rating/Reviews (labels adapt per category). Show "Top priority: Battery" summary.
Right-hand RESULTS RAIL updates live (debounced): top 6 matches, each with a Match Ring, a delta chip when ranking changes ("↑2" / "new"), and the single biggest reason. Moving a slider re-ranks with a 200ms reorder animation (FLIP) only if reduced-motion is off.
Extend needSearch: matchProductsToNeed(needQuery, products, weights) accepts a weights object that scales each scoring component; keep backward compatibility. Add unit tests for: weights default equals old behavior; raising battery weight promotes the longest-battery product; budget excludes over-budget items; zero results returns a relaxation suggestion.
"Share this search" copies a URL encoding category, budget, tags and weights in query params; opening that URL restores the wizard state.
Embed <PriorityPanel/> also at the top of the ProductList in Smart Match mode (collapsible "Adjust priorities").
```

**Done when:** dragging "Battery" to 100 visibly reorders results; the shared URL restores state.

---

### P4.2 — ProductList v2: sticky filter bar, facets, applied-filter chips

**Goal:** Amazon-grade filtering without the clutter.

```text
Redo /src/pages/customer/ProductList.jsx layout and filter UX.
DESKTOP: left facet column (260px, sticky below header via --header-h, own scroll) + results.
Facets (collapsible groups with counts that update as other filters change): Category, Price (dual slider + min/max inputs + histogram), Brand (searchable, top 6 + "See more"), Customer rating (4★ & up with stars), Delivery (Tomorrow, 2 days, Pay on delivery), Discount (10%+, 25%+, 40%+), Trust (High trust only), Availability (hide out of stock), Key specs that depend on category (RAM, Storage, Battery hrs, Display size), Use-case tags.
TOP BAR: result count + the parsed query summary, Sort select (Best match, Price low-high, Price high-low, Rating, Newest, Value for money, Trust), view toggle (grid/list/compare-friendly table), density toggle (comfortable/compact).
APPLIED FILTERS: a chip row above results, each removable, plus "Clear all". Filters sync to the URL query string (back button and shared links work).
MOBILE: single "Filters (3)" button opens a full-height bottom sheet with an apply button showing live count ("Show 18 results"); Sort is a separate sheet.
RESULTS: pagination with "Load more" button (24 per page) plus "Showing 24 of 63"; restore scroll and loaded count when returning from a PDP.
SMART MODE: teal-free; use a match-50 banner: "Showing 12 matches for 'Laptop for ML under ₹70k'. Understood: Laptops · ≤ ₹70,000 · ML." with chips to edit, and a "Why these?" disclosure.
STATES: skeleton grid on first load, an empty state with relaxation suggestions (widen price +15%, drop a tag, nearby categories), and an error state.
Performance: memoize filtered results; derive facet counts in one pass.
```

**Done when:** facet counts change when filters change; browser back restores scroll and filters.

---

### P4.3 — ProductCard v2 (fixes A8)

**Goal:** A card that carries the decision information at a glance.

```text
Rebuild /src/components/features/ProductCard.jsx (variants: grid, list, compact, shelf). Keep the public props.

GRID card anatomy, top to bottom:
 - Image area (ProductImage, 1:1) with: wishlist heart (top-right, 40px target, animates fill on toggle with aria-pressed), badge stack top-left (max 2: "Best seller", "Lowest in 90 days", "Only 3 left" in warn), and on hover/focus a second frame (view 1) crossfades in.
 - Color swatches (up to 4 dots + "+2") that swap the image tint.
 - Brand (xs, ink-500) and 2-line title (sm, 600).
 - Rating row: StarRating + review count (e.g. 4.4 · 1,284) as a link to #reviews.
 - Price row: ₹68,999 (lg, 700, .num) + strike-through MRP + "7% off" in good-600.
 - Key spec line: 2-3 specs relevant to category as a single muted line ("16GB · 512GB SSD · 8 hr").
 - Delivery line: "Get it by Thu, 8 Oct" in good-600 if within 2 days, using locationStore pincode; "Free delivery" if over ₹999.
 - Footer row: Trust chip (shield + score, tooltip) and, in Smart mode, the Match Ring (28px) with percentage.
 - Actions: primary "Add to cart" (always visible on touch; on desktop appears on hover/focus but reserves its space so the grid does not jump) and a quiet "Compare" checkbox with label.
Interaction: whole card is a link to the PDP (single focus target for the image/title), nested buttons are real buttons with stopPropagation; no nested interactive elements inside anchors (use the stretched-link pattern).
LIST card: horizontal; adds 3 highlights bullets, offers line, and an inline "Why this?" disclosure.
SHELF card: fixed 220px width for horizontal shelves. COMPACT: image, title, price, rating only.
Add-to-cart feedback: button morphs to "Added ✓" for 1.5s and opens the mini-cart drawer (P7.1) instead of only a toast.
Respect Easy mode: bigger text, larger buttons, no hover-dependent controls.
```

**Done when:** the card shows rating, discount, delivery, trust, and match without clutter; no layout jump on hover.

---

### P4.4 — Quick view

```text
Add a "Quick view" button (eye icon, shown on card hover/focus, keyboard reachable) that opens a Radix Dialog with: gallery (4 frames), title, rating, price block, 5 highlights, variant selector, quantity, Add to cart, "See full details" link, and the ExplainCard if in Smart mode. Dialog traps focus, closes on Esc and returns focus to the trigger. URL is not changed. On mobile, it opens as a bottom sheet.
```

---

### P4.5 — Match Ring and ExplainCard v2 (the signature element)

**Goal:** Make the explainability visible, memorable and consistent. This is the "one bold move."

```text
Create <MatchRing percent size="sm|md|lg" /> (SVG ring, match-600 stroke, tabular % in the center, aria-label "Match: 92 percent for your needs"). Clicking/focusing it opens a Popover with a breakdown.

Rebuild ExplainCard as <ExplainCard variant="compact|full">:
 - Header: "Why we picked this" + Match Ring (lg).
 - Reasons as a list with icons chosen for meaning: Within budget (BadgePercent), Fits your use (Target), Strong on your top priority (Zap), Well rated by verified buyers (Star), Arrives fast (Truck).
 - A **score breakdown bar** list: Price fit 20/20, Use-case fit 30/30, Rating 17/20, Trust 13/15, Priority bonus 10/15 (derived from the actual scoring function, return the components from needSearch, don't fake them).
 - A "Trade-offs" block (honest, important for trust): up to 2 items such as "Heavier than your usual pick (1.8 kg)" or "Only 8 hrs battery, you ranked battery first", derived from comparing to the top match.
 - "Based on: {needQuery}" and a link "Adjust priorities".
Make needSearch return {score, components, reasons, tradeoffs}. Add tests. Use ExplainCard: PDP, list cards, Quick view, comparison header, and a floating "insight" at the top of Smart results.
```

**Done when:** every score is expandable into real components; trade-offs appear for non-top matches.

---

# PHASE 5 — Product detail page v2

### P5.1 — PDP layout, buy box, delivery by pincode (fixes A13)

```text
Rebuild /src/pages/customer/ProductDetail.jsx in the proven three-zone layout.

DESKTOP (12-col): Gallery (5) | Details (4) | Sticky Buy box (3).
GALLERY: vertical thumbnail rail (4 frames) + main ProductImage; hover-zoom lens on desktop (2x, pointer only), pinch/tap zoom lightbox on mobile (swipe between frames, keyboard arrows, Esc). Frame 4 is the in-use context chip.
DETAILS: Brand link, H1 title (Inter 600, 24/32), rating + "1,284 ratings" jump link, "Bought 2k+ times in the past month" (derive from data), Trust badge + Value score badge, price block (price, MRP struck, % off, "Inclusive of all taxes"), color swatches and variant selector (storage/RAM) that update price, stock and images, offers carousel (bank / EMI / exchange cards, each expandable), "About this item" highlights, return/warranty icons row (Returns 10 days, Warranty 1 year, Pay on delivery yes/no).
BUY BOX (sticky under header): price, delivery block: "Delivery by Thu, 8 Oct" computed from pincode and deliveryRules, change-pincode link (Popover), "In stock" / "Only 3 left" in warn, seller info with rating and verified badge, quantity stepper (aria-labelled), primary "Add to cart" (action) and secondary "Buy now" (brand-800), wishlist, "Add to compare", secure transaction line. "Buy now" goes straight to checkout with only this item.
MOBILE: gallery carousel with dots, details stacked, and a STICKY BOTTOM BAR with price and "Add to cart" + "Buy now" that hides when the in-page buy box is visible (IntersectionObserver).
Also: breadcrumbs, JSON-LD Product schema in a <script type="application/ld+json">, and a "Report an issue with this listing" link opening a Dialog.
Track recently viewed in recentlyViewedStore on mount.
```

**Done when:** changing variant updates price/images; entering pincode 110001 vs 799001 changes the delivery date.

---

### P5.2 — "Why CartIQ recommends this" + Trust breakdown

```text
Place directly under the details column on desktop (full-width section on mobile) an ExplainCard (full) driven by the active needQuery. If there is no active query, show a "Best for" panel: 3 need tags with matching evidence ("Best for travel: 40 hr battery, 250 g") and a "Not ideal for" line (honest).
Next to the Trust badge, open TrustBreakdown in a Popover (desktop) / bottom sheet (mobile): ring + 7 factor rows (earned/max, one-line reason, a tiny meter), a plain-language sentence at the top ("High trust because this seller has 4.7★ across 12,000 orders and 91% of reviews come from verified buyers."), and a footnote "How we calculate this" linking to /trust-score.
Add a "Value for money" meter (0–100) with a 3-word verdict (Great / Fair / Pricey) and the comparison basis ("vs. median laptop at this spec").
```

---

### P5.3 — Reviews v2: aspect summary, authenticity, Q&A

**Goal:** Turn the "read 2,000 reviews" pain into a 10-second read, and make it credible.

```text
Rebuild the reviews area.
1. Summary header: big average rating, stars, "Based on 1,284 ratings", interactive histogram (click a bar to filter), and an AI-style summary sentence generated by utils/reviewSummarizer.js from aspectSentiment ("Buyers praise the battery and display; a few mention heat under load.") with a visible label "Summarized from 1,284 reviews. 91% verified." (no pretend-AI branding).
2. Aspect bars: Battery 81% positive, Display 88%, Build 76%, Value 70% — each a clickable chip that filters reviews mentioning that aspect and highlights the matching phrase in the review text.
3. Authenticity signals on each review: Verified purchase badge, "Reviewed in India on 12 Aug 2026", reviewer history ("7 reviews"), variant purchased, helpful count with Yes/No buttons (optimistic UI, once per review), image placeholders. Reviews flagged by a simple heuristic (very short, extreme rating, posted <1 day after delivery) show a subtle "Unusual pattern" note and are down-ranked by default.
4. Controls: sort (Top, Most recent, Positive, Critical), filter by rating, verified only toggle, "Only reviews similar to my use (e.g. coding)" toggle driven by needTags.
5. Pagination: 5 at a time with "Show more". "Write a review" button (logged in, purchased) opens a Dialog with star input, title, body (char counter), aspect checkboxes.
6. Q&A: "Customer questions" accordion with search box; each Q has answer(s) with Seller/Verified buyer label and helpful vote; "Ask a question" Dialog posts to a local store with a toast.
```

---

### P5.4 — Price history, price alert, related content

```text
1. Price history card: SVG line chart (no chart lib needed; or recharts if already installed) over 30/90 days with min/max markers, today's price dot, a tooltip on hover/focus (keyboard accessible via arrow keys), and a verdict line ("₹3,000 above the 90-day low. Good time to buy" or "Wait for a deal"). Never fabricate urgency; verdict derived from the data.
2. "Notify me when price drops": opens Popover with target price (default 5% lower) -> saves an alert in a persisted alertsStore, shown later on Wishlist (P8.2) with a simulated "price dropped" demo trigger button for testing.
3. "Frequently bought together": 3 items with checkboxes, combined price, "Add all 3 to cart" (compute bundle saving only if a real bundle discount exists in data).
4. "Customers also viewed" and "Similar products" shelves (use match against needTags and price band, not just category).
5. "Recently viewed" shelf at the bottom.
```

**Done when:** the chart is keyboard accessible; verdict text changes with data.

---

# PHASE 6 — Comparison v2

### P6.1 — Compare tray and page that reaches a verdict

```text
1. Compare tray: replace the floating bar with a bottom tray (desktop) showing up to 3 product thumbnails with remove buttons, a "Compare (3)" primary button, and a disabled state with helper text when fewer than 2. Tray persists across routes.
2. /compare page:
   - Sticky header with product cards (image, title, price, Add to cart, remove). On mobile, horizontal scroll with sticky first column.
   - "Verdict" card at the top, generated from data: "Best overall: X. Best value: Y. Best for battery: Z." each with Match Rings and one-sentence reasons. Also "Skip this one if..." for each product (honest negatives).
   - Toggle "Show differences only" (default on) hides rows where all values are equal.
   - Priority weights: reuse <PriorityPanel/>; the verdict and Match row recompute live.
   - Row groups (collapsible): Overview (price, rating, trust, value score, delivery, return), Performance, Display, Battery & portability, Connectivity, Seller & warranty. Winner cells get a good-50 background, a check icon and bold weight (not color alone). Ties show "Tie".
   - Reviews row with pros/cons chips and aspect bars side by side.
   - "Share comparison" copies a URL with the product ids and weights.
   - Print-friendly stylesheet.
3. Accessibility: a real <table> with scope attributes and a caption; winners announced via visually-hidden text ("Best in this row").
```

**Done when:** "Differences only" reduces rows; changing weights changes the verdict text.

---

# PHASE 7 — Cart, checkout, orders

### P7.1 — Mini-cart drawer and Cart v2

```text
1. Mini-cart: Radix Dialog drawer from the right, opened by add-to-cart (and by Cart icon hover on desktop). Shows the just-added item highlighted, subtotal, free delivery progress bar ("Add ₹412 more for free delivery"), "View cart" and "Checkout" buttons, and a cross-sell shelf of 3 accessories. Auto-focus the drawer heading; Esc closes. Undo toast on remove ("Removed Sony WH-1000XM5. Undo").
2. Cart page v2: keep the 65/35 layout; add: grouped by seller with delivery date per group, per-item stock warnings ("Only 2 left"), price-changed banner ("Price dropped ₹500 since you added this"), "Save for later" section that really persists, quantity stepper with min/max validation and debounce, line total, offers applied, coupon input with suggestions chips (SAVE10, STUDENT15) and an inline invalid state, gift options (visual), and a "Price details" summary with every line itemized (Price (n items), Discount, Coupon, Delivery, Packaging fee shown as ₹0 — no surprise fees), "You save ₹X on this order" in good-600, and a sticky summary on desktop / sticky bottom bar on mobile.
3. Empty cart: concise message, recently viewed shelf, and a "Describe what you need" CTA to the composer.
4. Easy mode: bigger steppers, "Remove" is a labeled text button with a confirm dialog.
```

---

### P7.2 — Checkout v2: one page, honest, fast

**Goal:** Fewer steps and no surprises (feedback theme: "too many steps").

```text
Rebuild /src/pages/customer/Checkout.jsx as a single-page accordion with 3 sections (Delivery, Payment, Review) that the user can complete in any order after Delivery; the right column is a sticky order summary. A progress line on top shows completed sections, but it is NOT a multi-page wizard. In Easy mode, all sections are expanded in one scroll.
DELIVERY: guest checkout allowed (email or phone). Saved address cards (radio) + "Add new address" inline form. Pincode field auto-fills City/State from pincodes.json and updates the delivery estimate immediately. Phone and pincode validate on blur with specific messages ("Enter a 10-digit mobile number"). Delivery speed options (Standard free / Express ₹99) with dates.
PAYMENT: UPI (VPA validation pattern + "Pay with any UPI app" visual), Card (live card mockup, Luhn validation, expiry and CVV masks, brand detection from the number), Net banking (searchable bank list with popular banks as chips), Pay on delivery (shows a ₹40 handling fee ONLY if applicable, disclosed before selection, and disabled with a reason for orders above ₹50,000). Offers panel applies bank offers automatically when the matching option is chosen.
REVIEW: itemized items, address, payment, total with every fee, "Place order" (action, full-width on mobile). Simulate processing with a progress state ("Contacting your bank…") and a 10% simulated failure mode toggled from a hidden dev flag to test the failure UI (clear message, keep all entered data, "Try another payment method").
SUCCESS PAGE: animated check (CSS only, respects reduced motion), order id, delivery date, "Track order", "Continue shopping", a "What happens next" 3-step note, and a gentle "Create an account to track orders" prompt if guest. Clear cart only after success. Prevent double-submit.
Persist form progress in sessionStorage so refresh doesn't lose data. Trap no one: always show "Back to cart".
```

**Done when:** a guest can place an order in under 60 seconds; failed payment preserves all inputs.

---

### P7.3 — Orders, tracking, returns

```text
1. /orders: filter by time (3 months / 2026 / all) and status chips, search within orders, each order card with item thumbnails, status chip, delivery date, and buttons (Track, Buy again, Write a review, Return). "Buy again" adds items and opens the mini-cart.
2. /orders/:id tracking v2: vertical timeline with timestamps and location text for each scan ("Mumbai hub · 5 Oct, 7:42 am"), a courier info card (name, "Call courier" disabled in demo with tooltip), delivery OTP display ("Share OTP 4821 with the delivery partner"), expected delivery window, and a compact "Delivery address" card. Current step has a pulsing indicator (reduced-motion safe). A "Simulate next step" dev button advances state to demo all statuses.
3. Return/replace wizard (Dialog, 3 steps): choose item -> reason (radio, with "Product not as described / Defective / Wrong item / Changed mind") -> resolution (refund to original method / refund to wallet / replacement) + pickup slot. Produces a return id and updates order status. Show clear refund timeline ("Refund within 3–5 days of pickup").
4. Review prompt after Delivered, with star click, aspect checkboxes and a text area with a minimum of 20 chars; posts to the local review store and the PDP updates.
```

---

# PHASE 8 — Account and personalization

### P8.1 — First-run persona onboarding (fixes A7)

```text
After first visit (or Register), show a skippable 3-question Dialog "Set up CartIQ for you" (~20 seconds):
 1. What do you mostly shop for? (multi-select chips of categories)
 2. Typical budget? (slider + "I'll decide later")
 3. How do you prefer to shop? (Fast picks / Detailed specs / Simple and large text / Best value)
Outcome mapping: Fast picks -> hero composer prioritized and Verdict-first PDP; Detailed specs -> spec tables expanded by default; Simple -> Easy mode on; Best value -> value-score sort default.
Persist to personaStore and show an editable "Your preferences" card on Profile. Also show an inline "Because you chose Student budget" line on relevant shelves so personalization is never a black box. Provide "Reset personalization".
```

### P8.2 — Wishlist, addresses, profile, notifications

```text
1. /wishlist: grid of saved items with price-change indicators ("₹1,000 lower than when you saved it"), price alert status, move to cart, remove, "Share list" (copy link), and bulk select.
2. /profile: tabs (Overview, Addresses, Preferences, Security). Address CRUD with default selection and validation; Preferences hosts persona/budget/Easy mode/dark mode; Security is a mock password change form with strength meter.
3. Notification center (bell in header, Popover): order updates, price drop alerts, review replies; unread count; "Mark all read"; each item deep-links. Seed with realistic items tied to the user's orders and alerts; provide a dev button to push a test notification.
```

---

# PHASE 9 — CartIQ Assistant

### P9.1 — Conversational shopping assistant (mock, optionally LLM-backed)

```text
Add a floating assistant (bottom-right, 56px button with MessageCircle icon and label "Ask CartIQ" on desktop; bottom-sheet on mobile, positioned above the mobile bottom nav). Panel features:
 - Starts with 3 suggestion chips ("Find me a laptop for ML under ₹70k", "Compare these two", "Is this a good price?") that depend on the current page (PDP -> "Is this a good price?" uses price history; Compare -> "Which should I pick?" reads the verdict).
 - Rule-based engine in /src/utils/assistant.js: intent detection (find, compare, explain, track order, return policy) using keyword/regex and parseNeed; answers use real data: top 3 matches as inline mini-cards with Match Rings and "Open" buttons, price verdicts from priceHistory, order status from orders.json.
 - Typing indicator (400ms), message history persisted per session, "Clear chat", keyboard accessible (role="log" aria-live="polite" for new messages).
 - Optional LLM adapter: /src/lib/llm.js with a single `askModel(messages, context)` function that, when VITE_LLM_ENDPOINT is set, POSTs there and otherwise falls back to the rule engine. Never ship API keys in the frontend; document using a proxy.
 - Always disclose: "I use CartIQ's product data to answer. I can make mistakes. Check the product page."
In Easy mode, the assistant button is larger and its first message offers "Call support" and "Walk me through buying".
```

---

# PHASE 10 — Seller and admin polish

### P10.1 — Shared data-table and chart primitives

```text
Create /src/components/ui/DataTable.jsx: sortable columns, sticky header, column visibility menu, row selection with bulk-action bar, text search, filter chips, pagination (10/25/50), density toggle, empty and loading states, CSV export of the current view, keyboard navigation, and responsive "stacked card" layout below 768px. Create <Sparkline/>, <BarChart/> and <DonutChart/> in pure SVG (or recharts) with accessible titles/descriptions and a data-table fallback "View as table". Create <StatCard/> with value, delta (up/down with arrow and color AND text), and sparkline.
```

### P10.2 — Seller dashboard v2

```text
Refine Seller pages using the shared primitives:
 - Dashboard: 4 StatCards with 7-day sparkline, revenue chart (30 days), orders needing action list with inline "Mark packed/shipped" (updates a shared ordersStore so the customer's tracking page reflects it), low-stock alerts with "Restock" quick edit, review inbox (reply to review).
 - Listing quality score: for each product show a 0–100 score with a checklist (≥4 images, 200+ char description, all spec keys, price vs median, returns policy set) and one-click "Fix" links to the form step. Higher score = a visible "Better visibility" note.
 - ProductForm: autosave drafts, live preview of the ProductCard AND the PDP header, image reorder (drag or arrow buttons), duplicate product, bulk CSV import (parse and validate with a row-level error report), and a "published products appear on the storefront" integration via sellerProducts merged into the catalog selector.
 - Earnings page: payout schedule table and fee breakdown (commission, shipping, GST) with a plain-language explainer.
```

### P10.3 — Admin v2

```text
 - Dashboard: 6 StatCards, flagged-activity timeline, seller approvals queue with approve/reject + reason, system alerts.
 - ReviewModeration v2: queue layout (list left, detail right), keyboard shortcuts (J/K move, A approve, R remove, F flag, ? shows help), suspicion score computed from heuristics with each signal listed and weighted, side-by-side "Reviewer history", bulk actions with confirm Dialog and an Undo toast, an audit log tab (who did what, when) persisted locally.
 - Users and Products tables built on DataTable with suspend/activate, role badges, and detail drawers.
 - Reports page: top searched needs, zero-result searches (feeds product gaps), conversion funnel (view -> add to cart -> checkout -> paid) from the event log in P13.1.
```

---

# PHASE 11 — Accessibility, Easy mode v2, themes, language

### P11.1 — Easy mode as a real theme (fixes A12)

```text
Replace the font-size scaling hack with a theme driven by CSS variables on <html data-mode="easy">:
 - Base font 18px, line-height 1.6, minimum 48px targets, 2px borders on inputs and buttons, 3px focus ring, increased spacing scale (--space-* x1.25), no hover-only controls, icons paired with text labels everywhere, simplified cards (hide Compare checkbox and badges beyond one), simplified navbar (Search, Cart, Orders, Help only; other items under a "More" button), links underlined, color contrast boosted to 7:1 for body text, motion fully off.
 - Entry points: the labeled "Easy mode" button in the header, first-run onboarding, Profile preferences, and a keyboard shortcut Alt+E. Persist the choice; announce changes via aria-live ("Easy mode on").
 - VOICE SEARCH: use the Web Speech API (SpeechRecognition / webkitSpeechRecognition) in the search field; mic button toggles listening with a visible pulsing "Listening…" state, interim transcript appears in the field, language en-IN, graceful fallback message when unsupported ("Voice search isn't supported in this browser. Type your need instead.").
 - "Need help?" floating button bottom-left: opens a Dialog with a click-to-call number (tel:), "Chat with us" (opens the Assistant), and "Walk me through buying" -> a step-by-step coach-mark tour (3-5 highlighted steps) over Home/PDP/Cart.
 - Simplified checkout: all sections expanded, single column, larger summary.
 - Add a visible "Switch back to standard view" link in the page header when active.
```

**Done when:** toggling Easy mode produces a clearly different, calmer layout, not just bigger text; voice search fills the field in Chrome.

### P11.2 — Dark mode, high contrast, reduced motion

```text
Implement theme switching via CSS variables: light (default), dark, and high-contrast, with prefers-color-scheme and prefers-contrast as initial values and a user toggle in header menu and Profile. Ensure ProductImage backgrounds, charts, Match Ring, badges, and focus rings all have dark-mode variants. Verify contrast ratios (text 4.5:1, large text/UI 3:1) with a small script or axe. Add a global `useReducedMotion` hook; disable parallax/FLIP/pulse/count-up when set.
```

### P11.3 — Accessibility audit pass

```text
Run a full audit and fix:
 1. Install @axe-core/react (dev only) and vitest-axe; add tests that render Home, ProductList, PDP, Cart, Checkout and assert zero critical violations.
 2. Keyboard: tab order matches visual order on every page; all dialogs trap and restore focus; menus support arrow keys; no keyboard traps; skip link works; the Compare checkbox and rating filters work with Space/Enter.
 3. Screen readers: landmarks (header, nav, main, aside for filters, footer), headings in logical order (one H1), live regions for toasts, cart updates ("2 items in cart"), and filter result counts ("18 results") announced politely.
 4. Forms: programmatic labels, aria-invalid + aria-describedby for errors, error summary at top on submit failure with links to fields, autocomplete attributes (name, tel, postal-code, cc-number).
 5. Images: meaningful alt for product art, decorative art aria-hidden. Charts: text alternatives.
 6. Target size: 24px minimum everywhere, 44px on touch.
Produce /docs/accessibility-report.md listing fixes and any remaining known issues.
```

### P11.4 — Hindi (and i18n scaffolding)

```text
Add lightweight i18n with react-i18next: extract UI strings from Navbar, Home hero, ProductCard, Cart and Checkout into /src/locales/en.json and /src/locales/hi.json (translate the extracted strings into natural Hindi, not literal). Language switcher in header and footer persisted. Use Intl.NumberFormat('en-IN') for currency and Intl.DateTimeFormat for dates. Ensure Devanagari renders with a suitable font (Noto Sans Devanagari via Google Fonts, fallback stack) and layouts tolerate ~30% longer strings (no fixed widths on buttons).
```

---

# PHASE 12 — Motion, microcopy, performance

### P12.1 — Micro-interactions that answer user actions

```text
Add a small motion layer (CSS transitions first; framer-motion only if needed) limited to responses to user action: add-to-cart (button morph + cart icon bump + badge increment), wishlist toggle (heart fill), accordion expand/collapse (height + opacity 160ms), toast slide-in (respects reduced motion), tab underline slide, compare tray slide-up, Match Ring stroke draw on first appearance only, skeleton shimmer. Remove any scroll-triggered or looping decorative animation except the hero preview cycle. Define motion tokens (duration 120/200/320ms, easing cubic-bezier(.2,.8,.2,1)) in Tailwind.
```

### P12.2 — Microcopy and empty/error states pass

```text
Audit every string in the app against these rules: sentence case, active voice, buttons say what happens ("Add to cart", "Place order", "Apply coupon"), consistent vocabulary (always "cart", never "basket"; "Easy mode" never "senior mode" in user-facing text), errors state the problem and the fix, empty states give the next action, no filler like "Oops!". Produce /docs/copy-deck.md with all key strings by screen and apply it. Add friendly 404, offline banner (navigator.onLine), payment-failed, out-of-stock, no-results, and session-expired states with illustrations built from the ProductImage SVG language.
```

### P12.3 — Performance budget

```text
Optimize: route-level splitting (done in P0.3) plus component-level lazy for Compare, Assistant, charts; memoize ProductCard with a stable props shape; virtualize long lists in admin tables; use content-visibility:auto on below-the-fold sections; preconnect fonts, subset Inter to Latin and Devanagari (font-display: swap); set explicit width/height on all images to avoid CLS; debounce store-driven filtering; avoid re-render storms by using Zustand selectors (never subscribe to the whole store). Add `npm run analyze` (rollup-plugin-visualizer). Targets: Lighthouse mobile Performance ≥ 90, Accessibility ≥ 95, CLS < 0.05, LCP < 2.5s, main bundle < 200KB gzipped. Report before/after numbers in /docs/perf.md.
```

---

# PHASE 13 — Test, iterate, and show the design thinking

### P13.1 — In-app feedback capture and event log

**Goal:** Close the Test → Feedback → Iterate loop *inside* the product, so you can show evaluators real data.

```text
1. Event logger /src/lib/analytics.js (local only): track(eventName, props) writes to a persisted ring buffer (max 2,000) with timestamp and session id. Instrument: search_submitted (mode, parsed), result_clicked (position, matchScore), add_to_cart, compare_added, filter_changed, checkout_step_completed, payment_failed, easy_mode_toggled, assistant_used, zero_results.
2. Feedback widget: a small "Feedback" tab docked on the right edge (keyboard accessible). Dialog with: 1–5 emoji satisfaction, "What were you trying to do?" (chips + free text), "What got in your way?" textarea, optional email. Auto-attach page, viewport, mode (Easy/Dark), and last 5 events. Saved to a feedbackStore with a toast "Thanks. This helps us improve CartIQ."
3. After a successful order (once per session), show a 3-question micro-survey: ease of finding product (1–5), confidence in your choice (1–5), "Would you recommend CartIQ?" (0–10 NPS).
4. SUS survey page /sus: the standard 10 questions (1–5 Likert), computes the SUS score with the correct formula ((sum of odd−1) + (5−even)) × 2.5 and shows the interpretation band; stores results.
5. /admin/insights (admin only): NPS, average SUS, satisfaction trend, top zero-result searches, funnel with drop-off percentages, and a table of raw feedback tagged by theme with a "Link to change" field so each item can reference the prompt/commit that addressed it. "Export JSON/CSV" buttons.
```

**Done when:** a test session produces a SUS score and a funnel chart visible to admin.

### P13.2 — /case-study v2 (replaces the /design-process page; evaluator-facing)

```text
Rebuild the Design Thinking showcase at /case-study (keep /design-process as a redirect). Editorial layout using the display serif for the page title only, Inter for everything else, a sticky left table of contents with scrollspy, comfortable 70-character line length.
Sections:
 1. Problem and POV statements (with HMW questions).
 2. Personas (5 customer + seller + delivery + payment) as an interactive tab set with goals, frustrations and the CartIQ feature that serves each.
 3. Journey map: the 12-step customer journey as an SVG swimlane (steps across the top; emotion curve line; pain points marked; opportunity callouts linking to features). Must be accessible (data table alternative).
 4. Ideation: brainstorming clusters + SCAMPER grid + prioritization matrix (impact vs effort scatter built with SVG).
 5. **Version 1 → Version 2:** before/after sliders (a draggable divider) for Home, Product card, PDP, Compare using real screenshots in /public/case-study/ (I will supply them). Under each, a bullet list "What users told us" (quote with feedback ID F#) -> "What we changed" (with audit ID A#).
 6. Usability testing: method, tasks, participants table, results (live SUS/NPS pulled from the feedbackStore, falling back to seed data), and a "Findings → fixes" table.
 7. Feature-to-problem map (Need search, Match Ring/Explain, Trust score, Compare verdict, Review summary, Easy mode, Assistant).
 8. Reflection and next steps.
Include a "Print / save as PDF" stylesheet so it can be submitted as a report appendix.
```

### P13.3 — Usability test kit (documentation deliverable)

```text
Generate /docs/usability-test-kit.md containing: (1) a one-page facilitator script (intro, consent, think-aloud instruction, wrap-up), (2) six task scenarios with success criteria and max time — e.g. "You have ₹60,000 and need a laptop for coding. Find one and decide why", "Compare two headphones and pick for travel", "Find out when an order will arrive", "Return an item", "Use Easy mode to buy a phone", "Find the seller's return policy" — (3) an observation sheet (task, completed Y/N, time, errors, quotes, severity 0–4 using Nielsen's scale), (4) a post-test questionnaire (SUS link + 3 open questions), (5) a recruitment grid covering the 5 personas with at least 2 participants each, and (6) a findings template mapped to the feedback table (F#) and audit IDs (A#).
```

### P13.4 — Automated tests

```text
Set up Vitest + React Testing Library + vitest-axe, and Playwright for E2E.
Unit: needSearch (parse, weights, budget filter, relaxation), trustScore, formatCurrency, cartStore (add/remove/coupon/totals/persistence), pincode delivery estimate, SUS calculation, review heuristics.
Component: ProductCard (badges, keyboard, add to cart), SearchSuggest keyboard behavior, Checkout validation messages, Compare winner logic.
E2E (Playwright, Chromium + mobile viewport): the five journeys from the original guide (Smart discovery, Comparison, Seller flow, Admin flow, Easy mode) plus: guest checkout under 60s, failed-payment recovery, deep-link restore of filters, pincode change updates delivery date, Cmd+K palette. Use data-testid sparingly; prefer roles and labels. CI script `npm run test:all`.
```

### P13.5 — Final integration pass

```text
Do a final pass and fix every issue:
1. Resolve all console errors and warnings; no unused exports; no dead routes.
2. Verify every icon resolves, every image renders from ProductImage, no picsum URLs remain (`grep -R picsum src public` is empty).
3. Re-run the audit table from section 1 of the makeover guide: for each A1–A15, state PASS/FAIL with evidence (screenshot path or code reference) and fix any FAIL.
4. Run Lighthouse (mobile + desktop) on Home, Search, PDP, Cart and record results.
5. Manually test widths 360 / 768 / 1280 / 1920, light/dark, Easy mode on/off, keyboard only, and one screen reader pass.
6. Update README with setup, scripts, architecture diagram (mermaid), decisions log, and known limitations.
Output a short /docs/release-notes-2.0.md.
```

---

# Appendix A — Phase critique prompt (run after every phase)

```text
Act as a skeptical design lead reviewing the work just completed. Do not praise. For each screen touched in this phase:
1. List anything that looks templated or generic (identical card patterns everywhere, decoration without meaning, repeated icon bubbles, wrong or reused icons, all-caps eyebrows, arrows appended to every CTA).
2. List information hierarchy problems: what is the first, second, third thing the eye sees, and is that the right order for a shopper trying to decide?
3. Check against standing rules: tokens only, amber only for actions with dark text, indigo only for intelligence, tabular numerals on prices, sentence-case copy, no landscape or unrelated imagery.
4. Check states: loading, empty, error, success, disabled, focus, hover, Easy mode, dark mode, 360px width.
5. Check accessibility: keyboard path, labels, contrast, target sizes, reduced motion.
6. Propose the 5 highest-impact fixes ranked by effort vs impact, then implement the top 3 and list what remains.
```

# Appendix B — Run order and dependency map

| Phase | Prompts | Depends on | Visible result |
|-------|---------|-----------|----------------|
| 0 Foundations | P0.1–P0.3 | none | Cleaner type and colors, safer code |
| 1 Identity & catalog | P1.1–P1.3 | 0 | Believable products, correct icons |
| 2 Global shell | P2.1–P2.4 | 0, 1 | New header, search, footer, layout |
| 3 Home | P3.1–P3.5 | 1, 2 (P4.3 for cards) | New home with live match hero |
| 4 Discovery | P4.1–P4.5 | 1, 2 | Wizard, filters, new cards, Match Ring |
| 5 PDP | P5.1–P5.4 | 4 | Buy box, reviews v2, price history |
| 6 Compare | P6.1 | 4 | Verdict-driven comparison |
| 7 Cart / checkout / orders | P7.1–P7.3 | 4, 5 | Mini-cart, one-page checkout, returns |
| 8 Account | P8.1–P8.2 | 3, 7 | Onboarding, wishlist, notifications |
| 9 Assistant | P9.1 | 4, 5 | Chat helper |
| 10 Seller/Admin | P10.1–P10.3 | 1 | Dashboards on shared primitives |
| 11 A11y/themes/i18n | P11.1–P11.4 | all UI | Easy mode v2, dark, Hindi |
| 12 Motion/copy/perf | P12.1–P12.3 | all UI | Polish and speed |
| 13 Test & evidence | P13.1–P13.5 | all | Feedback loop, case study, QA |

**Tip on ordering if time is short (minimum credible makeover, ~10 prompts):** P0.2 → P1.1 → P1.2 → P1.3 → P2.1 → P3.1 → P4.3 → P5.1 → P7.2 → P13.2. That alone fixes every 🔴 and most 🟠 audit items.

# Appendix C — Definition of done for CartIQ 2.0

- [ ] No unrelated imagery; every product has a consistent, believable visual.
- [ ] Every icon means what it says; no silent fallback icons.
- [ ] A shopper can go from describing a need to a placed order with every score explained.
- [ ] Delivery date appears on cards, PDP, cart and checkout and responds to pincode.
- [ ] No surprise fees: every charge is visible before "Place order."
- [ ] Easy mode is a distinct, calmer experience and discoverable by label.
- [ ] Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95; axe: zero critical violations.
- [ ] Feedback table (F#) filled from real testers; each item linked to a change.
- [ ] SUS and NPS collected and visible in `/admin/insights` and `/case-study`.
- [ ] The five original journeys plus the new E2E flows pass in CI.

---

*CartIQ 2.0 — Designed with empathy. Built with purpose. Shop smarter, not harder.*
