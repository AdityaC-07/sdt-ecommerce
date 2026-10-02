# CartIQ — IDE Prompt Guide
**Frontend-Only · React + Vite + Tailwind · Software Design Thinking Mini-Project**

---

## Project Name

### **CartIQ**
*Cart + IQ — smart shopping intelligence*

**Rationale:** Short, memorable, and immediately communicates the project's core differentiator: an *intelligent* shopping experience, not just another product listing. It subtly signals the Design Thinking angle (helping users make *smarter* decisions) without being over-wordy on a project sheet. Tagline suggestion: **"Shop smarter, not harder."**

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS v3 |
| Routing | React Router v6 |
| State | Zustand |
| UI Components | shadcn/ui (Radix primitives) |
| Icons | Lucide React |
| Fonts | Google Fonts (Inter + DM Serif Display) |
| Mock Data | Local JSON files in `/src/data/` |
| Auth Simulation | localStorage + Zustand |

All data is mocked — no backend needed. This is a purely frontend prototype.

---

## How to Use These Prompts

Paste each prompt directly into your IDE AI assistant (Cursor, Windsurf, GitHub Copilot Chat, or Claude Code). Run them **in order** — each phase builds on the previous one. Read the **Goal** line before pasting so you know what to expect.

---

---

# PHASE 1 — Project Scaffolding

---

### Prompt 1.1 — Initialize the Project

**Goal:** Create the Vite + React project with all dependencies installed and folder structure set up.

```
Create a new Vite + React project called "cartiq" with the following setup:

1. Initialize with: npm create vite@latest cartiq -- --template react
2. Install dependencies:
   - tailwindcss postcss autoprefixer
   - react-router-dom
   - zustand
   - lucide-react
   - @radix-ui/react-dialog @radix-ui/react-popover @radix-ui/react-slider @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-select @radix-ui/react-progress
   - clsx tailwind-merge
3. Run: npx tailwindcss init -p
4. Configure tailwind.config.js to include "./src/**/*.{js,jsx}" in content
5. Replace index.css with Tailwind directives (@tailwind base/components/utilities)
6. Create this folder structure inside /src:
   /assets
   /components
     /ui          ← reusable primitives (Button, Badge, Card, Input, etc.)
     /layout      ← Navbar, Footer, Sidebar, PageWrapper
     /features    ← feature-specific composite components
   /pages
     /customer    ← Home, Search, ProductList, ProductDetail, Cart, Checkout, OrderTracking
     /seller      ← SellerDashboard, ProductListing, InventoryManager, OrderManager
     /admin       ← AdminDashboard, UserManager, ProductManager, ReviewModeration
     /auth        ← Login, Register
   /data          ← products.json, categories.json, users.json, orders.json, reviews.json
   /store         ← cartStore.js, authStore.js, searchStore.js, uiStore.js
   /hooks         ← useSearch.js, useCart.js, useAuth.js, useFilters.js
   /utils         ← trustScore.js, matchScore.js, formatCurrency.js, reviewSummarizer.js
   /constants     ← routes.js, personas.js

7. In main.jsx, wrap App in <BrowserRouter>
8. Add Google Fonts import (Inter 400/500/600, DM Serif Display 400) in index.html
9. Set up Tailwind theme extension in tailwind.config.js with:
   - fontFamily: { sans: ['Inter', 'sans-serif'], serif: ['DM Serif Display', 'serif'] }
   - Custom colors: primary: '#1E3A5F', accent: '#F59E0B', success: '#10B981', danger: '#EF4444', trust: '#6366F1'
   - Custom borderRadius: card: '12px', pill: '9999px'
```

---

### Prompt 1.2 — Mock Data Files

**Goal:** Populate all data files so every page has realistic content to display.

```
Create the following mock data files inside /src/data/:

--- products.json ---
Create an array of 30 products across 5 categories: Laptops, Headphones, Smartphones, Cameras, Smartwatches.
Each product object should have:
{
  "id": "p001",
  "name": "...",
  "brand": "...",
  "category": "Laptops",
  "subcategory": "...",
  "price": 68999,
  "originalPrice": 74999,
  "discount": 7,
  "images": ["/assets/products/p001-1.jpg"],   ← use placeholder URLs from picsum.photos
  "rating": 4.3,
  "reviewCount": 1284,
  "inStock": true,
  "seller": { "id": "s001", "name": "TechZone", "rating": 4.6, "verified": true },
  "specs": { "RAM": "16GB", "Storage": "512GB SSD", "Processor": "Intel i7-13th Gen", "Battery": "8 hrs", "Weight": "1.8kg", "Display": "15.6 FHD" },
  "tags": ["coding", "ML", "performance", "student"],
  "badges": ["Best Seller", "Top Rated"],
  "trustScore": 88,
  "deliveryDays": 2,
  "returnPolicy": "10-day returns",
  "reviews": [
    { "id": "r001", "user": "Aarav S.", "rating": 5, "title": "Great for programming", "body": "...", "verified": true, "date": "2026-08-12", "helpful": 42 }
  ],
  "reviewSummary": {
    "pros": ["Long battery life", "Fast processor", "Good build quality"],
    "cons": ["Slightly heavy", "No Thunderbolt port"],
    "sentiment": "Mostly positive"
  },
  "needTags": ["programming", "machine learning", "student", "budget-conscious"]
}

--- categories.json ---
Array of 5 categories, each with:
{ "id": "cat01", "name": "Laptops", "icon": "Laptop", "subcategories": ["Gaming", "Ultrabook", "Business", "Student"] }

--- users.json ---
Array of 8 users representing the 5 customer personas + seller + delivery + admin:
{ "id": "u001", "name": "Aarav Shah", "email": "aarav@example.com", "password": "test123", "role": "customer", "persona": "student", "budget": 50000, "seniorMode": false, "wishlist": [], "orderHistory": [] }
Include one user with "role": "seller", one with "role": "admin".

--- orders.json ---
Array of 5 sample orders, each with:
{ "id": "ord001", "userId": "u001", "items": [...], "status": "Out for Delivery", "placedAt": "2026-09-28", "estimatedDelivery": "2026-10-02", "trackingSteps": [ { "step": "Order Placed", "done": true }, { "step": "Packed", "done": true }, { "step": "Shipped", "done": true }, { "step": "Out for Delivery", "done": true }, { "step": "Delivered", "done": false } ], "total": 68999, "paymentMethod": "UPI" }
```

---

### Prompt 1.3 — Zustand Stores

**Goal:** Set up all global state stores.

```
Create the following Zustand stores in /src/store/:

--- authStore.js ---
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import users from '../data/users.json'

Store should have:
- state: { user: null, isLoggedIn: false }
- actions:
  - login(email, password): finds user in users.json, sets user + isLoggedIn, returns { success, role }
  - logout(): clears user
  - toggleSeniorMode(): flips user.seniorMode boolean
- Persist to localStorage

--- cartStore.js ---
State: { items: [], coupon: null }
Actions:
- addItem(product, qty=1)
- removeItem(productId)
- updateQty(productId, qty)
- clearCart()
- applyCoupon(code) — simulate 2 coupon codes: "SAVE10" (10% off) and "STUDENT15" (15% off)
- computed: totalItems, subtotal, discount, total
Persist to localStorage

--- searchStore.js ---
State: { query: '', needQuery: '', filters: { category: null, minPrice: 0, maxPrice: 200000, minRating: 0, sortBy: 'relevance', tags: [] }, results: [], isSearching: false }
Actions:
- setQuery(q), setNeedQuery(q), setFilter(key, val), resetFilters(), setResults(products), setSearching(bool)

--- uiStore.js ---
State: { comparisonList: [], toastMessage: null, isSeniorMode: false }
Actions:
- addToComparison(product) — max 3 products
- removeFromComparison(id)
- clearComparison()
- showToast(message, type) — type: 'success'|'error'|'info'
- toggleSeniorMode()
```

---

### Prompt 1.4 — Router Setup

**Goal:** Set up all application routes with role-based redirection.

```
In /src/App.jsx, set up React Router v6 with these routes:

Public routes (no auth needed):
- "/" → Home
- "/search" → ProductList (with query params ?q=...&category=...)
- "/product/:id" → ProductDetail
- "/login" → Login
- "/register" → Register

Protected customer routes (must be logged in, role=customer):
- "/cart" → Cart
- "/checkout" → Checkout
- "/orders" → OrderHistory
- "/orders/:id" → OrderTracking
- "/profile" → Profile

Protected seller routes (role=seller):
- "/seller" → SellerDashboard
- "/seller/products" → ProductListing
- "/seller/inventory" → InventoryManager
- "/seller/orders" → SellerOrders

Protected admin routes (role=admin):
- "/admin" → AdminDashboard
- "/admin/users" → UserManager
- "/admin/products" → AdminProductManager
- "/admin/reviews" → ReviewModeration

Create a <ProtectedRoute> wrapper component in /src/components/layout/ that:
- Reads isLoggedIn and user.role from authStore
- Redirects to /login if not logged in
- Redirects to / if role doesn't match required role
- Accepts a `requiredRole` prop

Create placeholder page components (just return a <div> with the page name) for all pages — we'll fill them in later.

Create /src/constants/routes.js exporting an object of all path strings.
```

---

---

# PHASE 2 — Design System & Global Layout

---

### Prompt 2.1 — UI Primitives

**Goal:** Build the reusable component library that all pages will use.

```
Create the following reusable components in /src/components/ui/:

Button.jsx:
- Props: variant ('primary'|'secondary'|'outline'|'ghost'|'danger'), size ('sm'|'md'|'lg'), loading (bool), disabled (bool), fullWidth (bool), icon (ReactNode)
- Primary: bg-[#1E3A5F] text-white rounded-pill
- Secondary: bg-amber-500 text-white
- Outline: border-2 border-[#1E3A5F] text-[#1E3A5F]
- Show spinner SVG when loading=true

Badge.jsx:
- Props: label, color ('green'|'amber'|'red'|'indigo'|'gray')
- Pill-shaped, small text, colored background

Card.jsx:
- Props: children, className, hoverable (adds shadow + scale on hover), onClick
- rounded-[12px] bg-white shadow-sm border border-gray-100

Input.jsx:
- Props: label, placeholder, value, onChange, type, error, icon (left), helperText, disabled
- Show red border + error message when error prop provided

StarRating.jsx:
- Props: rating (number), count (number, optional), size ('sm'|'md'|'lg')
- Render filled/half/empty stars using Lucide icons
- Show count in gray next to stars

PriceTag.jsx:
- Props: price, originalPrice, showDiscount (bool)
- Format as ₹X,XX,XXX (Indian number format)
- Show strikethrough original price + green discount % badge

TrustScoreBadge.jsx:
- Props: score (0-100)
- Circular progress ring or horizontal bar in indigo
- Score 80+ = "High Trust", 60–79 = "Moderate", below 60 = "Low"
- Tooltip on hover explaining: "Based on review consistency, seller reputation, verified purchases"

ProgressBar.jsx:
- Props: value (0-100), color, label, showValue

Tag.jsx:
- Small rounded pill, colored, for product tags

Skeleton.jsx:
- Animated pulse placeholder blocks for loading states
- Variants: SkeletonText, SkeletonCard, SkeletonProductCard

Toast.jsx:
- Reads from uiStore.toastMessage
- Fixed bottom-right, animated slide-in
- Auto-dismiss after 3 seconds
- Success = green, error = red, info = indigo
```

---

### Prompt 2.2 — Navbar

**Goal:** Create the main navigation bar.

```
Create /src/components/layout/Navbar.jsx:

Layout: Fixed top, full width, z-50, bg-white shadow-sm, height 64px

Left section:
- CartIQ logo (DM Serif Display font, text-[#1E3A5F], with a small lightning bolt icon from Lucide)
- Category dropdown (triggered on hover, shows grid of 5 categories with icons)

Center section:
- Search bar (full width on desktop, collapsible icon on mobile)
- Two tabs inside search bar: "By Name" (default) | "By Need" — the By Need tab is CartIQ's signature feature
- Placeholder for By Name: "Search products..."
- Placeholder for By Need: "e.g. Laptop for coding under ₹70,000"
- On submit: navigate to /search with query params

Right section:
- If NOT logged in: Login + Register buttons
- If logged in as customer: WishlistIcon (Heart), CartIcon (ShoppingCart with item count badge from cartStore), UserAvatar dropdown with: Profile, My Orders, Logout
- If logged in as seller: "Seller Dashboard" link, UserAvatar with Logout
- If logged in as admin: "Admin Panel" link, UserAvatar with Logout
- Senior Mode toggle (accessibility icon, toggles uiStore.isSeniorMode) — always visible

Mobile (< 768px):
- Hamburger menu
- Search icon that expands full-width search
- Cart icon with count

When isSeniorMode is true from uiStore:
- Increase font size (add class text-lg to container)
- Increase button padding
- High contrast borders
```

---

### Prompt 2.3 — Footer

**Goal:** Create the site footer.

```
Create /src/components/layout/Footer.jsx:

Four-column footer (collapses to 2 on mobile, 1 on xs):
Column 1 — Brand:
- CartIQ logo + tagline "Shop smarter, not harder."
- Short paragraph about the platform's mission (user-centered discovery)

Column 2 — Shop:
- Links: All Products, Best Sellers, New Arrivals, Deals of the Day, Gift Cards

Column 3 — Account:
- Links: My Account, My Orders, Wishlist, Return an Item, Track Order

Column 4 — Trust & Support:
- Links: Help Center, Return Policy, Privacy Policy, Terms of Service
- Trust badges row: "100% Secure Payments", "Easy Returns", "Verified Sellers" (simple icon + text pills)

Bottom bar:
- © 2026 CartIQ. All rights reserved.
- Payment method icons (placeholder pill badges: UPI, Visa, Mastercard, NetBanking)

Colors: bg-[#1E3A5F] text-white, links: text-amber-300 hover:text-amber-400

Design note: Make the footer feel substantial and trustworthy — it directly addresses the "uncertainty about delivery and returns" pain point.
```

---

### Prompt 2.4 — PageWrapper

**Goal:** Consistent layout wrapper for all pages.

```
Create /src/components/layout/PageWrapper.jsx:
- Props: children, className, maxWidth ('sm'|'md'|'lg'|'xl'|'full')
- Wraps children in a centered container with horizontal padding
- Adds top padding for fixed Navbar height (pt-16)
- Applies senior mode font scaling if uiStore.isSeniorMode

Create /src/components/layout/SectionHeader.jsx:
- Props: title, subtitle, action (ReactNode — optional right-side button/link)
- Used for consistent section headings across all pages

Also apply global senior mode handling:
- When uiStore.isSeniorMode = true, add class 'senior-mode' to <html>
- In index.css add: .senior-mode { font-size: 118%; letter-spacing: 0.01em; }
- .senior-mode button, .senior-mode input { min-height: 48px; }
- .senior-mode a { text-decoration: underline; }
```

---

---

# PHASE 3 — Customer-Side Pages

---

### Prompt 3.1 — Home Page

**Goal:** The landing page that introduces CartIQ's smart discovery concept.

```
Create /src/pages/customer/Home.jsx:

SECTION 1 — Hero:
- Full-width banner, bg-gradient from #1E3A5F to #2D5986
- Headline (DM Serif Display, large): "Find exactly what you need — not just what's popular."
- Sub-headline: "CartIQ understands your needs, budget, and priorities. No more scrolling through 500 results."
- Large "Smart Search" input with placeholder "e.g. Wireless headphones under ₹5,000 for travel"
- "Find My Match" button (amber)
- Below input: Quick example chips the user can click: ["Laptop for ML ₹70k", "Phone under ₹20k with good camera", "Headphones for gym under ₹3k"]

SECTION 2 — How CartIQ Works:
- 3-step visual flow (horizontal on desktop, vertical on mobile):
  Step 1 → "Tell us what you need" (not just the product name)
  Step 2 → "We match by your priorities" (battery, budget, use case)
  Step 3 → "Choose confidently" (transparent comparisons + trust scores)
- Each step: icon (Lucide), number, title, short description

SECTION 3 — Shop by Category:
- 5 category cards in a responsive grid
- Each card: icon, category name, product count, hover lift effect
- Clicking navigates to /search?category=...

SECTION 4 — Featured/Trending Products:
- Horizontal scrollable row of 8 ProductCards (see Prompt 3.3 for ProductCard component)
- Tab bar above: "Best Sellers" | "Top Rated" | "Deals Today"
- Filter products from products.json based on active tab

SECTION 5 — Trust Banner:
- 4 icon + text blocks in a light-gray bar:
  "Verified Sellers Only" | "Transparent Reviews" | "Secure Payments" | "Easy 10-day Returns"

SECTION 6 — Persona Callouts (Design Thinking showcase):
- 3 cards targeting different personas:
  Card 1: "For Students — Smart budget filters + student-focused specs"
  Card 2: "For Professionals — Quick picks + time-saving comparison"
  Card 3: "For Seniors — Simplified view + larger text mode"
- Each card has a "Shop Your Way →" CTA
```

---

### Prompt 3.2 — Product List Page (Search Results)

**Goal:** The main browsing and filtering page.

```
Create /src/pages/customer/ProductList.jsx:

Read URL params on load: ?q=..., ?needQuery=..., ?category=...
- If needQuery present, show "Smart Search Mode" banner at top
- Filter/sort products.json accordingly (client-side)

LAYOUT (desktop): Left sidebar (280px) + main content area

LEFT SIDEBAR — Filters:
- Category: radio buttons for all 5 categories
- Price Range: dual-handle slider (₹0 to ₹2,00,000) using @radix-ui/react-slider
  Show inputs for min/max below slider
- Brand: checkboxes (derive unique brands from products.json)
- Rating: "4★ & above" | "3★ & above" | "All" radio
- Delivery: "2-day delivery" checkbox
- Tags: multi-select chips (coding, travel, gaming, student, business, etc.)
- "Reset All Filters" button at bottom

TOP BAR — Sort & Result Count:
- "Showing X results for 'Y'"
- Sort dropdown: Relevance | Price: Low to High | Price: High to Low | Rating | Newest
- Toggle between Grid view (default) and List view

MAIN CONTENT:
- Grid: 3 columns (desktop), 2 (tablet), 1 (mobile)
- Each product = <ProductCard /> component (see Prompt 3.3)
- Loading state: show 9 <SkeletonCard /> placeholders for 500ms on initial load
- Empty state: friendly illustration + "No products match your filters. Try adjusting the filters or search differently."

Mobile: Sidebar becomes a bottom sheet triggered by a "Filters" button
Active filter count shown as badge on Filters button

If "Smart Search Mode" is active (needQuery param):
- Show a teal banner: "CartIQ analyzed your request: '[needQuery]'. Showing X products sorted by your priorities."
- Add "Priority Match %" column visible in list view
```

---

### Prompt 3.3 — ProductCard Component

**Goal:** The reusable card used everywhere a product is shown.

```
Create /src/components/features/ProductCard.jsx:
Props: product (object), variant ('grid'|'list'|'compact')

GRID variant:
- Product image (aspect-ratio 1:1, object-cover, rounded-t-card)
- Wishlist toggle (Heart icon, top-right corner, absolute)
- Brand + Name (2-line clamp)
- <StarRating /> component
- <PriceTag /> component
- If product.badges has items: show first badge as green pill below name
- <TrustScoreBadge score={product.trustScore} /> — compact version (just score + colored dot)
- "Add to Cart" button (full width, amber, on hover reveals)
- If product has "Best Seller" badge: amber ribbon top-left corner
- Quick compare: small checkbox "Compare" that adds to uiStore.comparisonList (disabled if list has 3)

LIST variant (horizontal):
- Image left (200px wide)
- All content right
- Show full specs summary (3 key specs from product.specs as small tags)
- Priority Match % if in Smart Search mode (from searchStore)
- "Why this product?" expandable section if in Smart Search mode
- Add to Cart button + Compare checkbox

COMPACT variant (used in recommendation rows):
- Image + name + price + rating only, no badges

Hover state (grid): card lifts (translateY(-4px) shadow-lg), "Add to Cart" button slides up from bottom
```

---

### Prompt 3.4 — Product Detail Page

**Goal:** The richest page — covers product info, trust, reviews, and smart recommendations.

```
Create /src/pages/customer/ProductDetail.jsx with route /product/:id

Read product from products.json by id param.

SECTION 1 — Product Gallery + Summary (2-column layout):
LEFT: Image gallery
- Main large image
- Thumbnail row below (4 images, click to change main)

RIGHT: Product info
- Brand (linked to brand search), Name (H1, DM Serif)
- <StarRating /> with review count link that scrolls to reviews section
- <TrustScoreBadge score={product.trustScore} size="lg" /> with "What is this?" tooltip
- <PriceTag price={product.price} originalPrice={product.originalPrice} showDiscount />
- Seller info: "Sold by {seller.name}" + seller rating + Verified badge
- Delivery info: "Estimated delivery in {product.deliveryDays} days" + return policy
- Quantity selector (number input with + / - buttons)
- CTA row: "Add to Cart" (primary, large) + "Add to Wishlist" (outline)
- "Add to Comparison" button
- Share button

SECTION 2 — Why This Product? (CartIQ Signature Feature)
- Card with indigo left border
- Header: "Why CartIQ recommends this"
- Bullet list of matching reasons (derive from needTags vs active needQuery in searchStore):
  ✓ Within your budget (₹X) | ✓ Suitable for {use case} | ✓ {top spec} | ✓ {rating}
- If no needQuery active: show general highlights instead

SECTION 3 — Specifications
- Two-column table of all product.specs entries
- Clean, alternating row background

SECTION 4 — Review Summary (Signature Feature)
- Left half: "What buyers love" (pros list with green checkmarks)
- Right half: "Common complaints" (cons list with amber warning icons)
- Rating breakdown: 5★ → 1★ horizontal bars with percentage
- sentiment badge: "Mostly Positive" / "Mixed" / "Mostly Negative"

SECTION 5 — Individual Reviews
- Sort: Most Helpful | Most Recent | Positive | Critical
- Each review card: user avatar initials, name, rating, date, title (bold), body, "Helpful? Yes/No"
- "Verified Purchase" green badge
- Show 4 reviews, "Load More" button

SECTION 6 — Similar Products (horizontal scroll)
- 6 <ProductCard variant="compact" /> filtered by same category

SECTION 7 — Comparison Drawer (floating):
- If uiStore.comparisonList has 2+ products: show floating bar at bottom
  "X products selected for comparison → Compare Now"
```

---

### Prompt 3.5 — Cart Page

**Goal:** Clear, trustworthy cart page that surfaces the total cost transparently (addresses "hidden costs" pain point).

```
Create /src/pages/customer/Cart.jsx

TWO-COLUMN LAYOUT (desktop): Cart items (left, 65%) + Order Summary (right, 35%)

LEFT — Cart Items:
- If empty: illustration + "Your cart is empty" + "Start Shopping" button
- Each item row:
  - Product image (80×80)
  - Name + key spec snippet (e.g. "16GB RAM · 512GB SSD")
  - Seller name
  - Quantity control (+/-/input) — updates cartStore
  - Price (updated based on qty)
  - Remove button (trash icon, confirm on click)
  - "Save for Later" (moves to wishlist)
- Show delivery estimate per item: "Arrives by {date}"

RIGHT — Order Summary Card:
- Section title: "Price Details" (transparent, like Flipkart — addresses hidden cost pain point)
- Line items: Price (X items), Product Discounts, Coupon Discount, Delivery (FREE if over ₹999), Total
- All amounts clearly labeled with ₹
- Coupon input: text field + "Apply" — tries cartStore.applyCoupon()
  On success: show "SAVE10 applied! You save ₹XXX" in green
- "Total Savings: ₹XXX" highlighted in green at bottom
- "Proceed to Checkout" button (large, amber, full width)
- Trust badges: "Safe & Secure" | "100% Authentic"

Show a "Frequently Bought Together" section below the cart items.
```

---

### Prompt 3.6 — Checkout Page

**Goal:** Simple, friction-reducing checkout (fewer steps = Design Thinking improvement).

```
Create /src/pages/customer/Checkout.jsx

Step indicator at top: 1. Address → 2. Payment → 3. Confirm
(use uiStore local step state)

STEP 1 — Delivery Address:
- Form: Full Name, Phone, Address Line 1, Address Line 2, City, State, Pincode
- Validation: all required, phone = 10 digits, pincode = 6 digits
- "Save this address" checkbox
- On Submit: go to Step 2

STEP 2 — Payment:
- Radio options:
  a) UPI (text field for UPI ID)
  b) Credit/Debit Card (card number, expiry, CVV — visual card mockup that updates as user types)
  c) Net Banking (bank dropdown)
  d) Cash on Delivery
- "Your payment is 100% secure" banner with lock icon
- Order summary mini-card on the right (items + total)
- "Pay ₹XX,XXX" button — simulates 2 second payment processing (loading state) then goes to Step 3

STEP 3 — Order Confirmed:
- Full-page success state:
  - Green checkmark animation (CSS, no library)
  - "Order Placed Successfully!"
  - Order ID (random generated)
  - Estimated delivery date
  - "Track Your Order" button → /orders/:id
  - "Continue Shopping" button → /
- Clear cartStore on reaching this step

For SENIOR MODE (uiStore.isSeniorMode):
- Reduce checkout to 2 steps (merge address + payment on one long page with clear sections)
- Larger font, more padding, fewer steps = less cognitive load
```

---

### Prompt 3.7 — Order Tracking Page

**Goal:** Visual, reassuring delivery tracking.

```
Create /src/pages/customer/OrderTracking.jsx with route /orders/:id

Read order from orders.json by id.

TOP — Order Header:
- "Order #ORD001" | Placed on: date | ₹total
- Products ordered (thumbnail + name for each item)

CENTER — Tracking Timeline:
- Vertical stepper (5 steps):
  Order Placed → Packed → Shipped → Out for Delivery → Delivered
- Each step: icon (from Lucide), label, timestamp if done
- Current step: pulsing amber indicator
- Done steps: filled indigo circle with checkmark
- Future steps: gray unfilled circle

- Horizontal progress bar below: X of 5 steps complete

BOTTOM SECTIONS:
- Delivery address summary card
- "Need help with this order?" section: Return Item button, Contact Support button
- Related: "You might also like" (3 product cards from same category)

If step 5 (Delivered) is done:
- Show "Leave a Review" prompt card
- Rate the product (star click) + text area + Submit
```

---

---

# PHASE 4 — Smart Features (CartIQ's Differentiators)

---

### Prompt 4.1 — Need-Based Search Engine

**Goal:** The flagship feature — parse natural language needs and return matched products.

```
Create /src/utils/needSearch.js:

Export a function: matchProductsToNeed(needQuery, products)

The function should:
1. Parse the needQuery string for:
   - Category keywords: "laptop" → Laptops, "headphones" → Headphones, etc.
   - Budget: extract numbers preceded by ₹ or "under/below/within"
   - Use case tags: "coding"/"programming" → ["coding"], "travel" → ["travel"], "gaming" → ["gaming"], etc.
   - Priority keywords: "battery" → weights battery spec higher, "light/lightweight" → weights weight lower

2. Filter products:
   - Match category if detected
   - Exclude products above detected budget

3. Score each remaining product (0-100) using:
   - Tag match: +15 per matching tag
   - Budget fit: within 80% of budget = +20, exactly at budget = +15
   - Rating contribution: (rating/5) * 20
   - Trust score contribution: (trustScore/100) * 15
   - Priority keyword bonuses: if "battery" in query and battery spec exists, +10

4. Sort by score descending

5. Return array of { ...product, matchScore, matchReasons: string[] }
   matchReasons examples: ["Within your budget", "Optimized for programming", "40hr battery life", "4.3★ rating"]

Create /src/hooks/useNeedSearch.js that:
- Reads needQuery from searchStore
- Calls matchProductsToNeed
- Returns { results, isSearching, topMatch }

In ProductList.jsx:
- If ?needQuery is in URL: show "Smart Match Mode" teal banner + use useNeedSearch hook
- Add "Match Score" column to list view: pill showing "92% match"
- Sort by matchScore by default in Smart Match Mode
```

---

### Prompt 4.2 — Explainable Recommendations

**Goal:** Show users *why* something is recommended.

```
Create /src/components/features/ExplainCard.jsx:
Props: product (with matchScore + matchReasons), needQuery

Render:
- Card with left indigo border
- Header: "Why we suggest this for you"
- Bullet list using product.matchReasons with relevant icons:
  ✓ "Within your ₹70,000 budget" (green, ₹ icon)
  ✓ "Tagged for programming and ML" (indigo, Tag icon)
  ✓ "40-hour battery life" (amber, Battery icon)
  ✓ "Rated 4.5 by 1,200+ buyers" (gold, Star icon)
- Match score pill at bottom: "92% match for your needs"
- Subtle: "Based on: {needQuery}"

Use ExplainCard:
- In ProductDetail.jsx (Section 2 — Why This Product?)
- In ProductCard (list variant) when Smart Search is active
- As a floating "insight" card in ProductList when Smart Search mode is on
```

---

### Prompt 4.3 — Smart Product Comparison

**Goal:** Side-by-side comparison weighted by user priorities.

```
Create /src/pages/customer/ProductComparison.jsx with route /compare

Reads products from uiStore.comparisonList (2–3 products).
If list is empty: show "Add products to compare" state with a "Browse Products" button.

LAYOUT:
- Sticky header row: product image + name + price for each column
- Below: feature comparison table rows

Rows to show:
- Price
- Rating (show stars, not just number)
- Trust Score (TrustScoreBadge for each)
- All shared spec keys (union of all specs across compared products)
- Delivery estimate
- Return policy
- Seller + seller rating

Smart Priority Match row (if needQuery is active in searchStore):
- Row label: "Priority Match for Your Search"
- Each column: matchScore% with colored bar (green if highest, gray if not)
- Highlight the column with highest matchScore with a "Best Match" banner

Pros/Cons rows:
- "What buyers love" row: each column shows its reviewSummary.pros as small green chips
- "Common complaints" row: each column shows reviewSummary.cons as amber chips

WINNER LOGIC:
- For each spec row: bold + light green background on the best value column
  (lowest price = best, highest battery = best, highest rating = best)
- Show "Add to Cart" under each product column

Mobile: horizontal scroll of columns (sticky first column)
```

---

### Prompt 4.4 — Trust Score Calculator & Display

**Goal:** Make trust visible and explainable to address buyer anxiety.

```
Create /src/utils/trustScore.js:

Export computeTrustScore(product):
  Weighted formula:
  - Review consistency (variance in ratings low = high score): 20 pts max
    → If reviewCount > 500 and rating > 4.0: full 20 pts
    → 100–500 reviews: 15 pts
    → < 100 reviews: 10 pts
  - Seller verified badge: +15 pts
  - Seller rating > 4.5: +10 pts
  - Return policy exists: +10 pts
  - Verified purchase reviews > 70%: +15 pts
  - Product info completeness (all spec keys filled): +15 pts
  - Discount not too aggressive (not > 50% — red flag): +5 if <50%, 0 if >50%
  
  Cap at 100. Add descriptive label: 80–100 = "High Trust", 60–79 = "Moderate Trust", <60 = "Lower Trust"

Create /src/components/features/TrustBreakdown.jsx:
- Expandable panel (click to reveal)
- Shows each trust factor as a row:
  icon | Factor label | Score earned / Max score | Short explanation
- Overall score with circular progress
- "What does trust score mean?" tooltip

Use in ProductDetail.jsx next to TrustScoreBadge.
Also use in ProductComparison.jsx as a row.
```

---

---

# PHASE 5 — Seller Dashboard

---

### Prompt 5.1 — Seller Dashboard

**Goal:** A clean seller-side experience for listing and managing products.

```
Create /src/pages/seller/SellerDashboard.jsx

LAYOUT: Left sidebar nav + main content area

SIDEBAR NAVIGATION:
- Logo + "Seller Panel" label
- Links with Lucide icons:
  Dashboard | My Products | Add Product | Orders | Inventory | Earnings | Help

DASHBOARD HOME (main content):
Summary stat cards (4 across):
- Total Products Listed
- Active Orders
- Total Revenue (₹)
- Average Product Rating

Recent Orders table:
Columns: Order ID | Product | Buyer City | Qty | Amount | Status | Action
Status badges: Pending (amber) | Shipped (indigo) | Delivered (green)
Action: "Mark Shipped" button for Pending orders

Top Performing Products:
- 3 cards with product name, revenue, units sold, rating

Notifications panel:
- "2 orders need action", "Stock low for Product X", "New review on Product Y"
```

---

### Prompt 5.2 — Add/Edit Product Form

**Goal:** Seller's product listing form.

```
Create /src/pages/seller/ProductForm.jsx (used for both Add and Edit)

Multi-step form (3 steps):

STEP 1 — Basic Info:
- Product Name, Brand, Category (dropdown), Subcategory
- Description (rich text area, at least 200 chars)
- Price (₹ input), MRP/Original Price, Stock Quantity
- Use case tags: multi-select chips (coding, gaming, travel, student, professional, senior-friendly)

STEP 2 — Specifications:
- Dynamic key-value spec builder
  "Add Spec" button adds a row: [Spec Name input] [Spec Value input] [Remove]
  Pre-populate common spec templates when category is selected
  (Laptop template: RAM, Storage, Processor, Battery, Weight, Display)

STEP 3 — Images & Review:
- Image URL inputs (up to 5) — use picsum.photos placeholders
- Preview thumbnails
- Full product preview card (renders <ProductCard /> with entered data)
- "Publish Product" button

Validation: all required fields, price > 0, at least 1 image
On submit: add to a local sellerProducts list in Zustand (or localStorage)
Show success toast and redirect to /seller/products
```

---

---

# PHASE 6 — Admin Panel

---

### Prompt 6.1 — Admin Dashboard

**Goal:** Platform oversight and moderation controls.

```
Create /src/pages/admin/AdminDashboard.jsx

Same sidebar-based layout as Seller.

SIDEBAR LINKS:
Dashboard | Users | Products | Sellers | Reviews | Reports

DASHBOARD HOME:
Platform Overview stats (6 cards):
Total Users | Total Sellers | Total Products | Orders Today | Revenue Today | Flagged Reviews

Quick Actions section:
- "Review 3 flagged reviews" → /admin/reviews
- "Approve 2 new seller accounts" → approve inline
- "Low stock alerts: X products"

User Activity chart placeholder (static bar chart using pure CSS/SVG):
- New users per day (last 7 days) — use hardcoded numbers
- Simple bar visualization

Recent Users table:
Columns: Name | Email | Role | Joined | Status | Action (Suspend/Activate)
```

---

### Prompt 6.2 — Review Moderation

**Goal:** Admin tool to moderate potentially fake or abusive reviews.

```
Create /src/pages/admin/ReviewModeration.jsx

Filter tabs: All | Flagged | Verified | Unverified | 1-Star

Each review card shows:
- Product name + image
- Reviewer name + date
- Review text
- Rating
- "Verified Purchase" badge or "Unverified" warning
- Trust signals: account age, review count from this user
- Action buttons:
  [Approve] (green) | [Remove] (red) | [Flag for Review] (amber)
  
"Why might this be suspicious?" expandable:
- Posted within 1 day of purchase
- Reviewer only has 1 review
- Unusually short/long
- Rating inconsistent with text sentiment

Bulk actions: Select All Flagged → Remove All

Show success toast after each action.
```

---

---

# PHASE 7 — Polish, Accessibility & Senior Mode

---

### Prompt 7.1 — Senior-Friendly Mode

**Goal:** Full senior-mode experience toggle.

```
Create /src/components/features/SeniorModeOverlay.jsx:
Triggered when uiStore.isSeniorMode = true (toggled from Navbar)

When active:
1. Add class "senior" to <html> element

2. In index.css:
.senior { font-size: 120%; }
.senior button { min-height: 52px; min-width: 120px; border-width: 2px; }
.senior input, .senior select { min-height: 52px; font-size: 1.1rem; }
.senior a { text-decoration: underline; color: #1E40AF; }
.senior .text-xs, .senior .text-sm { font-size: 1rem; }
.senior nav a { padding: 12px 16px; }

3. In Navbar: Senior Mode button becomes visually prominent when active (amber background)

4. In Checkout: when senior mode is on, show a simplified 2-section layout 
   (Address + Payment on one long scroll) instead of multi-step

5. Add "Need help?" floating button (bottom-left) that shows a modal:
   "Call our support team: 1800-XXX-XXXX (Toll Free)" 
   + "Chat with us" (opens a dummy chat bubble)

6. In Home page hero: show "Simplified Shopping Mode Active" banner
   with "Turn off" link

7. Voice search placeholder:
   In the Navbar search bar when Senior Mode is on, 
   show a Mic icon that (when clicked) shows: 
   "Voice search coming soon — for now, type your need in the search box."
```

---

### Prompt 7.2 — Accessibility & Responsive Polish

**Goal:** Ensure the app is keyboard-navigable, mobile-first, and screen-reader friendly.

```
Do a full accessibility and responsiveness pass on the entire application:

KEYBOARD NAVIGATION:
- All interactive elements (buttons, links, inputs, cards) must be focusable
- Custom focus ring: outline: 2px solid #F59E0B; outline-offset: 2px on :focus-visible
- ProductCard "Add to Cart" should be keyboard-activatable
- Comparison checkbox must be operable via Space key
- Modal/dialog (use @radix-ui/react-dialog) must trap focus when open
- Toast must announce via aria-live="polite"

ARIA & SEMANTIC HTML:
- Navbar: <nav aria-label="Main navigation">
- ProductList: <main>, results wrapped in <ul> with <li> for each ProductCard
- StarRating: aria-label="Rating: 4.3 out of 5 stars"
- TrustScoreBadge: aria-label="Trust score: 88 out of 100. High trust."
- Cart item quantity: aria-label="Quantity for {product name}"
- All icon-only buttons must have aria-label
- Images: descriptive alt text ("Sony WH-1000XM5 Wireless Headphones in Black")

RESPONSIVE BREAKPOINTS:
- xs (< 480px): Single column, collapsed nav, stacked checkout
- sm (480–768px): 2-column product grid, visible search
- md (768–1024px): 2-column product grid + filter sidebar as sheet
- lg (> 1024px): Full 3-column grid + persistent filter sidebar

PERFORMANCE (perception):
- ProductCard images: loading="lazy" attribute
- Skeleton loaders on all data-fetching simulations (setTimeout 600ms)
- Smooth page transitions: add a CSS fade-in on each page mount using a CSS class added on component mount

COLOR CONTRAST:
- All text on white: minimum 4.5:1 contrast ratio
- #1E3A5F on white: ✅ passes
- Amber buttons (#F59E0B): use dark text (#1a1a1a), not white
- Error red (#EF4444) on white: ✅ passes
```

---

### Prompt 7.3 — Design Thinking Showcase Page

**Goal:** A special `/about` page that makes the SDT process visible to your instructor/evaluator.

```
Create /src/pages/DesignProcess.jsx with route /design-process

This page documents CartIQ's Design Thinking journey — ideal for presenting to your evaluator.

SECTIONS:

1. The Problem Space
   - Quote the problem statement from the project
   - 3-column pain point cards: "Information Overload" | "Fake Reviews" | "Hidden Costs"

2. Our Personas (interactive)
   - 5 clickable persona cards (Aarav, Priya, Rohan, Neha, Mr. Sharma)
   - Click to expand: Goals, Frustrations, How CartIQ helps them
   - Use /src/constants/personas.js data

3. User Journey Map (visual)
   - Horizontal scrollable timeline of the 12 customer journey steps
   - Each step: icon + step name + emotional state (Happy/Neutral/Frustrated emoji)
   - Color-coded: green = positive touchpoint, amber = neutral, red = pain point

4. Design Thinking Alignment Table
   Columns: Stage | Activity | CartIQ Feature Built
   Row examples:
   - Empathize | User interviews, empathy maps | Persona-based UI modes
   - Define | POV statements, pain points | Smart Search, Trust Score
   - Ideate | SCAMPER, brainstorming | ExplainCard, Need-Based Search
   - Prototype | Wireframes → functional UI | This application
   - Test | Usability testing plan | (describe the plan)
   - Iterate | Feedback loops | Senior Mode, Review Summarization

5. Key Innovations
   Cards for each signature feature with a "Problem It Solves" label:
   - Need-Based Search → "Information overload, too many choices"
   - Trust Score → "Fake reviews, seller uncertainty"
   - Explainable Recommendations → "Blind algorithm distrust"
   - Smart Comparison → "Difficulty comparing products"
   - Senior Mode → "Accessibility for elderly users"
   - Review Summarization → "Reading 2,000 reviews"

Style this page as a clean, magazine-editorial layout — it's a showpiece.
```

---

### Prompt 7.4 — Final Integration Checklist

**Goal:** Connect all pieces and verify the complete app works end-to-end.

```
Do a final integration pass to verify the following user journeys work completely:

JOURNEY 1 — Smart Discovery:
Home → type "wireless headphones under ₹5000 for travel" in Smart Search →
ProductList (Smart Match Mode, sorted by matchScore) → 
click top product → ProductDetail (ExplainCard shows match reasons) →
Add to Cart → Cart → Checkout → Order Confirmed → Order Tracking

JOURNEY 2 — Comparison Flow:
ProductList → tick "Compare" on 3 products →
floating comparison bar appears → click "Compare Now" →
ProductComparison page (best match highlighted, specs compared) →
Add to Cart one product

JOURNEY 3 — Seller Flow:
Login as seller → SellerDashboard → Add Product (3-step form) →
product appears in ProductList → mark order as shipped

JOURNEY 4 — Admin Flow:
Login as admin → AdminDashboard → ReviewModeration →
approve/remove flagged reviews

JOURNEY 5 — Senior Mode:
Toggle Senior Mode from Navbar → 
everything scales up →
visit Home, ProductDetail, Checkout (simplified) →
Help overlay available

For each journey, fix any broken routes, missing imports, or undefined data.
Ensure cartStore persists across page refreshes.
Ensure authStore redirects unauthenticated users correctly.
Ensure Toast notifications appear for: Add to Cart, Coupon Applied, Order Placed, Review Submitted.
```

---

---

## Summary Table — Pages & Prompts

| Phase | Prompt | Output |
|---|---|---|
| 1 | 1.1 | Vite + React project + folder structure |
| 1 | 1.2 | Mock data JSON files |
| 1 | 1.3 | Zustand stores (auth, cart, search, ui) |
| 1 | 1.4 | React Router setup + ProtectedRoute |
| 2 | 2.1 | UI primitives (Button, Badge, Card, etc.) |
| 2 | 2.2 | Navbar (with Smart Search tabs) |
| 2 | 2.3 | Footer |
| 2 | 2.4 | PageWrapper + Senior Mode CSS |
| 3 | 3.1 | Home page |
| 3 | 3.2 | Product List (search results + filters) |
| 3 | 3.3 | ProductCard component |
| 3 | 3.4 | Product Detail page |
| 3 | 3.5 | Cart page |
| 3 | 3.6 | Checkout (3-step) |
| 3 | 3.7 | Order Tracking |
| 4 | 4.1 | Need-Based Search engine |
| 4 | 4.2 | Explainable Recommendations |
| 4 | 4.3 | Smart Product Comparison |
| 4 | 4.4 | Trust Score calculator |
| 5 | 5.1 | Seller Dashboard |
| 5 | 5.2 | Add/Edit Product form |
| 6 | 6.1 | Admin Dashboard |
| 6 | 6.2 | Review Moderation |
| 7 | 7.1 | Senior-Friendly Mode |
| 7 | 7.2 | Accessibility & Responsive Polish |
| 7 | 7.3 | Design Process showcase page |
| 7 | 7.4 | Final integration + E2E journey testing |

---

*CartIQ — Designed with empathy. Built with purpose.*
