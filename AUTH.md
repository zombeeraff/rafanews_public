# Auth Layer

Auth.js v5 (next-auth@beta) with Google OAuth. Protects `/gallery` and `/blog` (and all sub-routes) from unauthenticated access.

## Files

| File | Purpose |
|------|---------|
| `src/auth.ts` | NextAuth config — provider, protected routes, authorized callback |
| `src/middleware.ts` | Edge middleware — runs on every request, enforces access control |
| `src/app/api/auth/[...nextauth]/route.ts` | API handler for Auth.js (OAuth callbacks, session management) |
| `src/app/signin/page.tsx` | Custom sign-in page for direct URL access |
| `src/components/Navbar.tsx` | Intercepts clicks on protected links and shows sign-in modal |
| `src/components/ClientProviders.tsx` | Wraps the app in `SessionProvider` so client components can read session |

## How it works

### Navbar click (primary path)
1. User clicks Gallery or Blog while signed out
2. `handleLinkClick` in Navbar detects the route is protected and the user has no session
3. Navigation is cancelled (`e.preventDefault()`)
4. A modal appears with a "Continue with Google" button
5. `signIn("google", { callbackUrl: href })` sends the user through Google OAuth
6. After auth, Google redirects back to `/api/auth/callback/google`, which redirects to the original page

### Direct URL access (fallback)
1. User navigates directly to `/gallery` or `/blog` (e.g. via a shared link)
2. `src/middleware.ts` runs on the Edge before the page renders
3. The `authorized` callback in `src/auth.ts` checks for a valid session
4. If no session → 307 redirect to `/signin?callbackUrl=<original-url>`
5. `/signin` shows the same Google button; after auth, redirects to `callbackUrl`

### Sign-out
- "Sign out" button in the Navbar calls `signOut()` from `next-auth/react`
- Session cookie is cleared; user stays on the current page (redirected away if on a protected route)

## Protected vs public routes

Defined in `src/auth.ts`:

```ts
const publicPaths = ["/", "/about", "/signin"];
```

Everything not in this list requires a valid session. To make a new route public, add its exact path to `publicPaths`. To protect a new route, just add it — the middleware matcher already covers all app routes.

The Navbar also maintains a parallel `PROTECTED` list in `src/components/Navbar.tsx` to know when to show the modal:

```ts
const PROTECTED = ["/gallery", "/blog"];
```

Add any new protected routes here so the modal fires on navbar clicks too.

## Environment variables

| Variable | Description |
|----------|-------------|
| `AUTH_SECRET` | Random secret used to sign session JWTs. Generate with `openssl rand -base64 32`. |
| `AUTH_GOOGLE_ID` | OAuth client ID from Google Cloud Console |
| `AUTH_GOOGLE_SECRET` | OAuth client secret from Google Cloud Console |

Set these in `.env.local` for development. `.env.local` is gitignored — never commit it.

## Deployment (Vercel)

1. Add `AUTH_SECRET`, `AUTH_GOOGLE_ID`, and `AUTH_GOOGLE_SECRET` to Vercel → Project → Settings → Environment Variables
2. In Google Cloud Console → APIs & Services → Credentials → your OAuth client, add the production redirect URI:
   ```
   https://yourdomain.com/api/auth/callback/google
   ```

## Google Cloud Console setup

- Project: any existing GCP project works
- OAuth consent screen: External, add your email as a test user during development
- Credentials → OAuth 2.0 Client ID → Web application
- Authorized redirect URIs:
  - `http://localhost:3000/api/auth/callback/google` (dev)
  - `https://yourdomain.com/api/auth/callback/google` (prod)
