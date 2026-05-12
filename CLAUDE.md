# Personal Website

## Stack
- **Framework:** Next.js 15 (App Router, TypeScript)
- **Styling:** Tailwind CSS v4 + @tailwindcss/typography
- **Deployment:** Vercel
- **Images:** Next.js Image component with quality=90

## Project Structure
```
src/
  app/           — Pages (Home, About, Gallery)
  components/    — Reusable components (Navbar, Footer)
  content/       — Markdown or data files for text content
public/
  photos/        — High-res photo files for the gallery
```

## Blog Thumbnail Sizes (on blog landing page)
- **Reads** (book covers): `thumbnailClass: "w-16"`
- **Travel**: set per post based on image composition
- Use the `thumbnailClass` field on each post entry in `src/app/blog/page.tsx`

## Conventions
- Always use the Next.js `<Image>` component for photos (never raw `<img>`)
- Set `quality={90}` and proper `sizes` attribute on all gallery images
- Use Tailwind utility classes for styling; no separate CSS files beyond globals.css
- The About page uses `prose` classes from @tailwindcss/typography
- Keep components in `src/components/` with PascalCase filenames
- Photos go in `public/photos/` — add them to the `photos` array in `gallery/page.tsx`

## Auth Layer

Authentication is handled by **NextAuth v5 (Auth.js)** with Google OAuth. It protects private pages (e.g. `/private`) behind an email allowlist.

### Key files
- `src/auth.ts` — NextAuth config: Google provider, allowed emails, public/protected path logic
- `src/middleware.ts` — Re-exports `auth` from NextAuth; runs on every non-static route
- `src/app/api/auth/[...nextauth]/route.ts` — NextAuth catch-all route handler
- `src/app/signin/page.tsx` — Sign-in page with "Continue with Google" button

### How it works
1. Middleware intercepts every request (excluding `api/`, `_next/`, images, and static assets).
2. If the route is in `publicPaths` (`/`, `/about`, `/signin`), it passes through unauthenticated.
3. All other routes require a valid session; unauthenticated users are redirected to `/signin`.
4. After Google OAuth completes, the `signIn` callback checks the user's email against `allowedEmails` in `src/auth.ts`. Access is denied if the email isn't listed.

### Adding a new protected page
No changes needed — any route not in `publicPaths` is automatically protected.

### Adding an allowed user
Edit the `allowedEmails` array in `src/auth.ts`.

### Making a page public
Add its path to the `publicPaths` array in `src/auth.ts`.

### Environment variables
| Variable | Purpose |
|---|---|
| `AUTH_SECRET` | NextAuth session encryption key |
| `AUTH_GOOGLE_ID` | Google OAuth client ID |
| `AUTH_GOOGLE_SECRET` | Google OAuth client secret |

Set all three in `.env.local` (dev) and in Vercel environment variables (prod).

### Google Cloud Console setup
In your OAuth 2.0 Client ID, **Authorized redirect URIs** must include:
- `http://localhost:3000/api/auth/callback/google` (dev)
- `https://www.rafa.news/api/auth/callback/google` (prod)

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run lint` — Run ESLint
