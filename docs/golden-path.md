# CartIQ Demo Golden Path

**Demo Day Runbook — Golden Path Instructions**

### Demo Reset URL
Visit `http://localhost:5173/?demo=reset` (or deployed URL with `?demo=reset`) at any time to:
- Reset shopping cart & session state
- Clear temporary in-session orders
- Seed demo accounts (`student@cartiq.demo`, `seller@cartiq.demo`, `admin@cartiq.demo`)
- Show toast confirmation "Demo reset" and redirect to `/`

---

## 6-Step Golden Path Walkthrough

1. **Step 1: Home — Need Search**
   - Type `"laptop for ML under 70000"` in the Hero composer input.
   - Observe live right-hand Match Preview cards updating dynamically.
   - Click **Find matches**.

2. **Step 2: Results Page — Explainable IQ Matches**
   - Verify smart-match banner shows understood query filters (`Laptops`, `≤ ₹70,000`, `ML`).
   - Cards display match halos (e.g. `96% Match`), trust badges (`Trust 88`), and key specs (`16GB RAM · 512GB SSD`).
   - Toggle filters or sort options; observe crisp pill UI.

3. **Step 3: Product Detail — Transparency & Trust**
   - Click **Dell XPS 15** to enter PDP.
   - View Jharokha arch gallery frame.
   - Check delivery estimate by pincode, trust score breakdown popover, and review summary chips ("What buyers love").

4. **Step 4: Comparison & Cart**
   - Click **Compare** on 2-3 products and open `/compare`.
   - Observe side-by-side spec evaluation and **IQ Best Choice** verdict.
   - Click **Add to cart**, navigate to `/cart`, and apply coupon `SAVE10`.

5. **Step 5: Checkout & Order Completion**
   - Click **Proceed to checkout**.
   - Select payment method (UPI / COD), complete address, and place order.
   - View success checkmark animation, Order ID, and launch `/orders/o001` tracking timeline.

6. **Step 6: Persona Lens & Easy Mode**
   - Click **Easy mode** in the header or persona lens card.
   - Page visibly scales with higher contrast and larger touch targets.
