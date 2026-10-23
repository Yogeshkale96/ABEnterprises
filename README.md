# AB ENTERPRISES PRIVATE LIMITED — Corporate Website

Full-stack corporate website for **AB ENTERPRISES PRIVATE LIMITED** —
_Tech Solutions for Every Need._

- **Frontend:** React 19 + Vite, Tailwind CSS v4, React Router, Framer Motion, Lucide, Axios, React Hook Form + Zod, React Hot Toast
- **Backend:** Node.js + Express, MySQL (mysql2 pool), Helmet, CORS, rate limiting, JWT auth (HTTP-only cookie), Zod validation, Winston logging

## Project structure

```
frontend/   React + Vite app (landing page, website, admin dashboard)
backend/    Express API + MySQL schema, migrations and seeds
```

## Prerequisites

- Node.js 20+ and npm
- MySQL 8.x running locally (or a reachable instance)

## Backend setup

```powershell
cd backend
npm install
copy .env.example .env     # then edit .env with your MySQL credentials + JWT_SECRET
npm run db:migrate         # creates the ab_enterprises database and tables
npm run db:seed            # seeds categories, services, products, industries + admin user
npm run dev                # http://localhost:5000/api/v1
```

Health check: `GET http://localhost:5000/api/v1/health`

Default seeded admin login (change via `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `.env` **before** seeding, or update the user afterwards):

- Email: `abenterprises@gmail.com`
- Password: `abenterprises@123`

## Frontend setup

```powershell
cd frontend
npm install
copy .env.example .env     # optional — defaults work in dev
npm run dev                # http://localhost:5173
```

Vite proxies `/api/*` to `http://localhost:5000`, so `VITE_API_BASE_URL=/api/v1` works without extra config. For a different backend URL, set `VITE_API_BASE_URL` in `frontend/.env`.

## Routes

| Path | Page |
|---|---|
| `/` | Landing / entry page |
| `/home` | Main homepage |
| `/about`, `/services`, `/services/:slug` | Company & services |
| `/products`, `/products/:slug` | Product catalogue |
| `/industries`, `/industries/:slug` | Industry solutions |
| `/amc-support`, `/contact`, `/request-quote` | Support & forms |
| `/search?q=...` | Search results |
| `/privacy-policy`, `/terms` | Legal |
| `/admin/login`, `/admin/dashboard` | Protected admin |

## Brand assets

Placeholder SVG logo + monogram live in `frontend/src/assets/brand/` and `frontend/public/favicon/`. Replace `ab-enterprises-logo.svg` (full logo) and `ab-enterprises-logo-compact.svg` (square monogram) with the official artwork — the shared `Logo` component keeps proportions automatically.

## Company details

Contact address, phone, email, hours and stats are placeholders in `frontend/src/config/siteConfig.js` — update with verified business information before launch.

## Troubleshooting

- **`'vite' is not recognized`** → run `npm install` inside `frontend/` first.
- **`MySQL not reachable`** → check `DB_*` values in `backend/.env` and that MySQL is running.
- **CORS errors** → set `FRONTEND_URL` in `backend/.env` to the exact origin (e.g. `http://localhost:5173`).
- **Login fails** → re-run `npm run db:seed` after setting `ADMIN_EMAIL`/`ADMIN_PASSWORD`.
