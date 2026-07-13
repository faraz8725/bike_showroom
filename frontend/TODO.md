# Conversion / React SPA Migration Plan

## Info gathered

- Current app is TanStack Start + file-based routes under `src/routes/*`.
- There is no visible `index.html` or `src/main.tsx` SPA entry in this repo (TanStack Start drives runtime).
- UI is already React/TSX; key blocker for `localhost:5173` “standard Vite SPA” is wiring to a Vite SPA entry.
- Routing links currently use `@tanstack/react-router` (`Link`).

## Goal

Run locally on `http://localhost:5173` with a typical Vite React SPA structure and React Router DOM, without changing UI design/content.

## Plan (file level)

1. Add Vite SPA entrypoint files:
   - `index.html`
   - `src/main.tsx`
   - `src/App.tsx`
2. Add React Router DOM client routing mapping existing pages:
   - `/` -> existing Home page from `src/routes/index.tsx`
   - `/auth` -> existing Auth page from `src/routes/auth.tsx`
   - `/admin` -> existing Admin page from `src/routes/_authenticated/admin.tsx`
   - `/bikes/:id` -> existing Bike detail page from `src/routes/bikes.$id.tsx`
3. Replace TanStack Router dependencies in UI glue:
   - Convert page-level usage of `createFileRoute`, `Route.useParams`, `Link`, etc., into React Router equivalents.
   - Update navigation components (`src/components/site-header.tsx`) to use `react-router-dom` `Link`.
4. Preserve existing Supabase/auth logic and hooks:
   - Keep `useAuth`, `supabase` auth state listener logic.
5. Ensure global styles loaded:
   - Import `src/styles.css` from `src/main.tsx`.
6. Update/remove TanStack-specific root wiring:
   - Ensure TanStack Start server entry is not required for dev SPA.
   - (Only adjust Vite config if necessary.)
7. Test:
   - `bun run dev`
   - Verify each route renders and links work.

## Followup steps

- Run `bun run dev` and confirm `localhost:5173` loads the homepage.
- Navigate to `/admin`, `/auth`, and `/bikes/<id>`.
