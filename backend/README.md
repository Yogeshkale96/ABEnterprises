# AB Enterprises — Backend API

Express + MySQL API for the public website and the admin dashboard.

## Setup

```bash
cd backend
npm install
cp .env.example .env    # fill in DB credentials, JWT_SECRET, seed vars
npm run db:migrate      # creates database + tables (idempotent)
npm run db:seed         # catalogue data + legacy admin seed (optional)
npm run seed:admin      # create/update the administrator account (required env vars)
npm run dev             # http://localhost:5000
```

## Admin seed (`npm run seed:admin`)

Creates the administrator account idempotently. **All three vars are required** —
the script aborts without changes if any is missing, and never invents defaults.

| Env var | Required | Notes |
| --- | --- | --- |
| `SEED_ADMIN_NAME` | yes | Display name |
| `SEED_ADMIN_EMAIL` | yes | Login email |
| `SEED_ADMIN_PASSWORD` | yes | Hashed with bcrypt(12); never stored in plain text |
| `SEED_ADMIN_UPDATE_PASSWORD` | no | Set to `1` to also re-hash/update the password when the account already exists |

Behavior:
- New email → creates the admin user with the `admin` role.
- Existing email → syncs name/role only; **password is left unchanged** unless `SEED_ADMIN_UPDATE_PASSWORD=1`.
- The legacy `db:seed` also creates an admin from `ADMIN_EMAIL`/`ADMIN_PASSWORD`; `seed:admin` is the safer dedicated command for deployments.

## Authentication & security model

**Tokens** — the API issues a token pair on login:

| Token | Lifetime | Storage (browser) | Storage (native app) |
| --- | --- | --- | --- |
| Access JWT | `JWT_ACCESS_EXPIRES_IN` (default 15m) | HttpOnly cookie `abe_admin_token` | `@capacitor/preferences` → `Authorization: Bearer` |
| Refresh JWT | `JWT_REFRESH_EXPIRES_IN` (default 7d) | HttpOnly cookie `abe_admin_refresh` | `@capacitor/preferences` → sent in `/auth/refresh` body |

- Access tokens are signed with `JWT_ACCESS_SECRET`, verified for signature,
  expiry, `iss`, `aud`, and `type: 'access'` on every request.
- Refresh tokens are signed with a **separate** `JWT_REFRESH_SECRET` and only the
  **SHA-256 hash** is persisted in `refresh_tokens`. Every `/auth/refresh` call
  rotates the pair; presenting an already-rotated (revoked) token revokes the
  user's entire session chain — stolen-token detection.
- `/auth/logout` revokes the presented refresh token and clears both cookies.
- `/auth/change-password` verifies the current password, enforces strength
  rules, then revokes all sessions.

**CSRF** — cookie-authenticated mutating requests (POST/PATCH/PUT/DELETE) must
carry an `Origin`/`Referer` matching `FRONTEND_URL` or a native WebView origin.
Bearer-token requests skip the check since they are not ambient credentials.

**Password rotation** — admins can rotate via `POST /api/v1/auth/change-password`,
or re-run `npm run seed:admin` with `SEED_ADMIN_UPDATE_PASSWORD=1`. Never recover
a password from a hash — reset it.

**Required env vars** (no defaults in production):

```
JWT_ACCESS_SECRET, JWT_REFRESH_SECRET   # two DIFFERENT strong random secrets
JWT_ACCESS_EXPIRES_IN, JWT_REFRESH_EXPIRES_IN
JWT_ISSUER, JWT_AUDIENCE
FRONTEND_URL                            # comma-separated allowed origins
SEED_ADMIN_NAME, SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD
```

## Admin endpoints (all require `admin` role + session cookie)

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/api/v1/auth/login` | Admin login (rate-limited) |
| POST | `/api/v1/auth/refresh` | Rotate the token pair (rate-limited) |
| POST | `/api/v1/auth/logout` | Revoke refresh token + clear session |
| GET | `/api/v1/auth/me` | Current admin session |
| POST | `/api/v1/auth/change-password` | Rotate password, revokes all sessions |
| GET | `/api/v1/admin/stats` | Dashboard counts (total, per status, per type, 30-day) |
| GET | `/api/v1/admin/enquiries` | List: `page`, `limit`, `status`, `type`, `search`, `from`, `to` |
| GET | `/api/v1/admin/enquiries/:id` | Detail: all fields + quote items + internal notes |
| POST | `/api/v1/admin/enquiries/:id/notes` | Add an internal admin note |
| PATCH | `/api/v1/admin/enquiries/:id/status` | Update status: `new`, `in_progress`, `resolved`, `closed` |

Public form submissions hit `POST /api/v1/enquiries` (validated, rate-limited,
honeypot-protected) and are stored in the same `enquiries` table the admin
dashboard reads.
