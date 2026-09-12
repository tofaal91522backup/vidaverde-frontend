# Project Progress Tracker
Last updated: 2026-09-12

> **Student portal API integration ✅ SHESH** (2026-09-12) — 11 ta endpoint live, kono mock nai.
> Plan + log: [STUDENT_API_INTEGRATION.md](STUDENT_API_INTEGRATION.md) ·
> Manual test: [STUDENT_TEST_PLAN.md](STUDENT_TEST_PLAN.md)
>
> **Admin dashboard integration — plan ready, kaj shuru hoy nai:**
> [ADMIN_API_INTEGRATION.md](ADMIN_API_INTEGRATION.md) (17 endpoint, 15 step)
>
> Niche-r "Dashboard — Student" section-er info ekhon purono; oi file gula-i shotto.

## Roles confirmed
- **Admin** (backend: `ADMIN` — master / manager sub-roles)
- **Student** (backend: `STUDENT`; frontend folder naam `customer`)
- **Teacher** (backend: `TEACHER` — Phase 2, kono endpoint nai, frontend nai)

## Current Status
- Active module: Marketing + both Dashboards (UI done), Auth (partly wired)
- Current step: **Integration** (backend API ekhon available, frontend ekhono mock-e)
- Status: **in progress** — UI ~pura, API integration prai shuru-i hoyni

## Module Log

### 1. Auth
- **Plan:** signin / registration / forget-password / reset-password / verify-email / confirm-email — shob page + server action ache
- **Integration:**
  - Signin -> real `POST /rest-auth/login/` ([sign-in.action.ts](../../src/features/auth/pages/signin/actions/sign-in.action.ts)), session toiri hoy
  - forget-password / reset-password action ache -- backend `/rest-auth/password/reset/` + `/reset/confirm/` er sathe field mil jachai kora hoyni
  - **Registration** -- page + action ache, kintu backend-e registration endpoint **nai**. Notun student account shudhu `/public/bookings/checkout/` diye auto-create hoy (password email-e jay)
  - **verify-email / email confirm** -- frontend page ache, backend endpoint **nai**
  - **Google OAuth** -- backend `/rest-auth/google/` ache, frontend-e wired na
  - **Post-login redirect nai** -- success-e shudhu `router.refresh()` + toast, `/dashboard/admin` ba `/dashboard/customer`-e push kore na, user `/signin`-e thake jay
  - **`middleware.ts` nai** -- kono route protection nai
  - Protected layout (`admin/layout.tsx`, `customer/layout.tsx`) `getSession()` dake kintu `null` hole redirect kore na -- logged-out obosthay-o dashboard khole
  - Role-based gating nai -- STUDENT `/dashboard/admin`-e dhukte parbe, ultaTao
  - `(auth)/layout.tsx`-e logged-in user-ke `/signin`-e gele bounce korar check nai
  - Cookie-te `secure: true` hardcoded ([session.ts](../../src/features/auth/utils/session.ts)) -- local http dev-e cookie set nao hote pare
- **Result:** Issues found -- registration/verify-email flow-er backend counterpart nai; routing/guard implement howa baki
- **Status:** In progress

### 2. Dashboard — Admin
- **Plan:** teachers, bookings, sessions, calendar, packages, blogs, overview -- shob screen + column + form toiri
- **Integration:** Kichu-i wired na. 6ta query hook-i `MOCK_*` data, `enabled: false`. Commented placeholder URL gulo-o bhul (`/api/blogs/`, `/api/teachers/`) -- asol path `/administrator/...`
  - `/administrator/dashboard/summary/` -> overview cards-e hardcoded shongkha
  - `/administrator/blogs/` · `/administrator/teachers/` (+ `:id/time-off/`) · `/administrator/sessions/` (+ `:id/` update) · `/administrator/sessions/calendar/` · `/administrator/bookings/` (+ `export/`) · `/administrator/packages/` · `/administrator/upload/`
  - Screen nai: `admins/`, `testimonials/`, `contact-messages/`, `leads/`, `emails/`
- **Status:** In progress (UI complete, integration 0%)

### 3. Dashboard — Student (customer)
- **Plan:** overview, invoices, my-packages, calendar -- screen toiri
- **Integration:** Shob mock, `enabled: false`. Placeholder URL bhul (`/api/customer/...`) -- asol `/student/...`
  - `/student/dashboard/` · `/student/invoices/` (+ `:id/pdf/`) · `/student/packages/` · `/student/sessions/` · `PATCH /student/me/`
  - Flow nai: session book / cancel / reschedule (`/student/sessions/...`)
- **Status:** In progress (UI complete, integration 0%)

### 4. Marketing / Public
- **Plan:** home, our-school, courses, online-classes (+ teachers, book), activities, homestay, travel-spanish, study-in-quito, blog (+ slug), contact, privacy, terms -- shob page toiri
- **Integration:** Shob static `data/` folder theke cholche
  - **Book flow** ([book/index.tsx](../../src/features/marketing/pages/book/index.tsx)): pura local state -- hardcoded teacher/package/time, `handleConfirm` shudhu ekta boolean set kore, payment ekta nokol card form (Stripe nai). Asol: `/public/teachers/` · `/public/packages/` · `/public/teachers/:id/slots/` · `POST /public/bookings/checkout/`
  - Blog list/detail -> `/public/blogs/` (category, lang, pagination shoho) wired na
  - Teachers / testimonials -> `/public/teachers/`, `/public/testimonials/` wired na
  - Contact form -> `/public/contact/` wired na
  - Newsletter/lead -> `/public/leads/` (+ `unsubscribe/:token/`) wired na
- **Status:** In progress (UI complete, integration 0%)

## Open Issues / Blockers
- Registration + email-verify frontend ache kintu backend-e nai -- signup asholei checkout-er bhitore hoy. Product-level shidhanto darkar.
- Shob dashboard/public query hook-er commented placeholder URL bhul prefix (`/api/...`) -- integration-er shomoy `/administrator/`, `/student/`, `/public/`-e bodlate hobe.
- Mock type gulo (camelCase: `isActive`, `paymentStatus`) backend response (snake_case, `{success, ...}` envelope, `results/count` pagination) er sathe milbe na -- schema/type pura notun kore map korte hobe.
- Booking payment: backend Phase 1-e dummy gateway (`"declined"` chara shob pass). Stripe UI ekhon cosmetic.
- Auth: login-er por redirect nai, `middleware.ts` nai, protected route gulo unguarded, role gating nai.

## Notes for next session
- Integration priority suggestion: (1) Auth routing fix (redirect + middleware + role guard), (2) Public -- teachers/packages/slots/checkout diye book flow live kora, (3) Student dashboard, (4) Admin dashboard, (5) registration/verify decision + google oauth
- Proti module-e pattern: `schema` -> `queries/use-*.ts` (mock shoriye `useFetchData`/`useMutationHandler`) -> column/form -> detail view
- Full endpoint reference: [docs/bruno/](../bruno/) (44 endpoint) ar [docs/bruno/collection.bru](../bruno/collection.bru) (prefix + auth + response shape)
