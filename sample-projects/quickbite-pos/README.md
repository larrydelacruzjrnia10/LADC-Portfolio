# QuickBite POS Sample

QuickBite POS is a portfolio-ready fast-food Point of Sale UI/UX sample with:

- React + Vite + Tailwind CSS frontend
- Cashier, kitchen, and admin workflows
- Local simulation data with persistent browser storage

Dedicated frontend-only repo:

`https://github.com/larrydelacruzjrnia10/QuickBite-POS`

## Folder structure

```text
sample-projects/quickbite-pos/
  frontend/
    src/
      components/
      data/
      lib/
    index.html
    package.json
    tailwind.config.js
    vite.config.js
  backend/   <- future backend phase, not required for the current UI demo
```

## Core features

- Menu category filtering for burgers, drinks, fries, and combo meals
- Add-to-cart flow with quantity controls and add-ons
- Fast checkout with cash, card, and GCash simulation
- Receipt preview modal
- Kitchen Display System with Pending -> Preparing -> Ready status flow
- Inventory alerts with quick restock and item availability toggle
- Daily sales dashboard with revenue and top-selling items
- Frontend-only simulation using demo data and local storage cache

## Current project scope

This version focuses on UI and UX only.

- No live database is required
- No backend server is required
- Orders, inventory movement, and reports are simulated in the browser
- State is persisted through local storage for demo purposes

## Frontend setup

1. Open a second terminal in `sample-projects/quickbite-pos/frontend`
2. Install dependencies:

```bash
npm install
```

3. Start the Vite dev server:

```bash
npm run dev
```

## Notes

- Orders, inventory deductions, kitchen updates, and dashboard metrics are all simulated locally in the browser.
- The admin dashboard can restock products and toggle item availability.
- This sample is intentionally frontend-first so the portfolio focuses on layout, interaction quality, and operational flow.
- The `backend/` and Hostinger VPS deployment docs are retained only as a future expansion path for a later full-stack version.
