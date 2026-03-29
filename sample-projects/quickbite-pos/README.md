# QuickBite POS Sample

QuickBite POS is a portfolio-ready fast-food Point of Sale system sample with:

- React + Vite + Tailwind CSS frontend
- Node.js + Express backend
- MongoDB database
- Cashier, kitchen, and admin workflows

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
  backend/
    src/
      config/
      controllers/
      data/
      middleware/
      models/
      routes/
      utils/
      app.js
      seed.js
      server.js
    .env.example
    package.json
```

## Core features

- Menu category filtering for burgers, drinks, fries, and combo meals
- Add-to-cart flow with quantity controls and add-ons
- Fast checkout with cash, card, and GCash simulation
- Receipt preview modal
- Kitchen Display System with Pending -> Preparing -> Ready status flow
- Inventory alerts with quick restock and item availability toggle
- Daily sales dashboard with revenue and top-selling items
- Offline-ready frontend fallback using demo data and local storage cache

## API endpoints

- `GET /api/products`
- `PUT /api/products/:id`
- `GET /api/orders`
- `POST /api/orders`
- `PUT /api/orders/:id/status`
- `GET /api/reports/daily`

## Sample users

- Cashier: `cashier.demo` / `Cashier123!`
- Admin: `admin.demo` / `Admin123!`

These are included as sample seed records. The frontend currently uses a role switcher instead of a login form to keep the demo focused on operations flow.

## Backend setup

1. Open a terminal in `sample-projects/quickbite-pos/backend`
2. Install dependencies:

```bash
npm install
```

3. Create `.env` from `.env.example`
4. Make sure MongoDB is running locally
5. Seed the demo database:

```bash
npm run seed
```

6. Start the backend server:

```bash
npm run dev
```

The backend runs on `http://localhost:5000` by default.

## Hostinger database deployment

### Recommended option for this project

This POS backend is built with MongoDB, so the best Hostinger-compatible setup is:

- Hostinger VPS
- MongoDB installed on the VPS
- Node.js + Express backend running on the same VPS or another server

Use `backend/.env.hostinger-vps.example` as the starting point for the production MongoDB connection string.

### Important compatibility note

Hostinger's regular Web and Cloud hosting database offering is MySQL/MariaDB, not MongoDB. If you want to stay on standard Hostinger database hosting instead of VPS, this backend would need to be rewritten from MongoDB/Mongoose to MySQL.

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

The frontend expects the backend API at `http://localhost:5000/api`.

## Notes

- If the backend is unavailable, the frontend falls back to demo data and local storage so the UI still works as a sample.
- Inventory is deducted when orders are created.
- The admin dashboard can restock products and toggle item availability.
- This sample is intended as a realistic portfolio piece, not a production restaurant deployment.
- For a Hostinger VPS deployment walkthrough, see `sample-projects/quickbite-pos/DEPLOY-HOSTINGER-VPS.md`.
