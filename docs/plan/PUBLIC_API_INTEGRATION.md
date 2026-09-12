# Public Marketing Site — API Integration Plan

> **Ei file ta live progress tracker.** Proti step sesh howar por “Progress
> Log” update hobe. Ekhane shudhu unauthenticated marketing/public API scope;
> student ar admin dashboard-er API alada plan-e ache.

- **Source of truth:** [docs/bruno/public/](../bruno/public/)
- **Started:** 2026-09-12
- **Current step:** **Step 0 — public data foundation**
- **Status:** not started

---

## Scope and rules

1. **Public API only.** Path gula `/public/...`; kono access token, cookie, ba
   protected `apiClient` use kora jabe na.
2. **Existing project pattern.** GET client-side data `useFetchData`, write
   operation `useMutationHandler`, ar Axios direct feature code-e na.
3. **Real API shape age.** Existing marketing data camelCase/static; backend
   snake_case and endpoint-varying envelopes. UI-te map korar age exact type
   define korte hobe.
4. **No raw card collection.** Backend-er Phase 1 checkout `payment_method`
   token ney; current fake card-number/CVC inputs backend-e pathano jabe na.
5. **SEO preserve korte hobe.** Blog list/detail-er title, description, 404,
   pagination ar metadata real API data diye maintain korte hobe.
6. **Proti step-er pore ei file update hobe.** Shudhu oi step-er scope change
   hobe; pore-r feature age touch kora jabe na.

---

## API inventory — 13 operations

| # | Method | Path | Current UI | Main integration target |
|---|---|---|---|---|
| 1 | GET | `/public/packages/` | hardcoded pricing + booking packages | Online Classes pricing, booking step 2 |
| 2 | GET | `/public/packages/:id/` | no direct API detail use | fallback/direct package resolution if needed |
| 3 | GET | `/public/teachers/` | hardcoded teacher cards | home, Online Classes, booking step 1 |
| 4 | GET | `/public/teachers/:id/` | static teacher profile | teacher profile page |
| 5 | GET | `/public/teachers/:id/slots/` | fake fixed times | booking step 3 |
| 6 | POST | `/public/bookings/checkout/` | fake successful booking | booking step 5 + confirmation |
| 7 | POST | `/public/leads/` | fake homepage/newsletter success | free guide + blog newsletter |
| 8 | GET | `/public/leads/unsubscribe/:token/` | no page | email unsubscribe landing page |
| 9 | POST | `/public/contact/` | fake contact success | contact + programme enquiry CTAs |
| 10 | GET | `/public/contact/subjects/` | hardcoded display labels | contact subject select |
| 11 | GET | `/public/blogs/` + `/categories/` | static blog grid/tabs | blog list, category filter, pagination |
| 12 | GET | `/public/blogs/:slug/` | static post detail | article, metadata, related posts, 404 |
| 13 | GET | `/public/testimonials/` | static carousel/testimonial data | homepage testimonials |

### Response-shape notes

- `packages`, `teachers`, and `testimonials` return **bare arrays**, not
  `{ success, results }`.
- `blogs` returns a paginated object (`count`, `results`, etc.); only published
  posts are public. Detail has `body` plus `related_posts`.
- `slots`, checkout, contact, lead, and unsubscribe use `{ success, ... }`.
- `contact/subjects/` and `blogs/categories/` are documented as helper routes,
  but their response examples are absent from the Bruno files. Their real
  response shapes must be checked before finalising their types.
- Translated reads accept `lang=en|es`: packages, blogs, testimonials and
  teacher bios. Spanish falls back to English.

---

## Existing UI mismatches / decisions before implementation

| Area | Current UI | Backend reality / required decision |
|---|---|---|
| “Match me” booking option | Lets visitor continue without a teacher | Checkout requires a concrete `teacher` UUID; no matching endpoint exists. Remove/disable this option, or obtain a backend/product rule for selecting a teacher. |
| Teacher URLs | Static routes use a name/slug and pre-generated params | API identifies teachers by UUID, while no public slug is documented. Decide whether the public URL becomes UUID-based or backend adds a slug. |
| Teacher photo/content | Local images plus invented experience/availability prose | API returns `profile_img_url`, tags, institute, description, `availability_label`; retain local image only as an empty-image fallback. |
| Booking dates/times | A date input and fixed local times | Fetch real slots by teacher/date/timezone; submit `start_utc` unchanged as `start_datetime`. |
| Payment form | Collects cosmetic card number, expiry and CVC | Dummy checkout accepts a payment-method token/string. Remove raw card fields until a real Stripe integration exists. |
| Blog content | Static markdown-like post data and generated static params | API returns rendered HTML `body`; sanitize/render deliberately and generate metadata/404 from API. |
| Contact subjects | Human-readable values are submitted | API expects enum keys; load labels from helper endpoint and submit its value. |
| Lead capture | Simulated timeout | Must send first name, email, explicit GDPR consent and `source` (`homepage`/`blog_post`). |
| Public images | `next/image` currently uses local image paths | Remote backend URLs need configured `images.remotePatterns`, or intentional `<img>` handling with safe fallback. |

---

## Steps

### Step 0 — Public HTTP setup, types, and route audit

- Add a typed public request path backed by `publicApiClient`; `/public/` calls
  must not pass through authenticated session/token interceptors.
- Keep the shared request/hook conventions intact so feature code still uses
  `useFetchData` and `useMutationHandler` rather than direct Axios.
- Add `features/marketing/types/public-api.types.ts` for public package,
  teacher, slot, checkout, lead, contact, blog, and testimonial responses.
- Add shared language source (`en` now; make `es` ready without duplicating
  every endpoint) and browser timezone helper using
  `Intl.DateTimeFormat().resolvedOptions().timeZone` with the documented
  Guayaquil fallback.
- Audit marketing routes that currently depend on local teacher/blog data and
  decide UUID-vs-slug teacher URL handling before the profile step.
- Verify live shapes for `/public/contact/subjects/` and
  `/public/blogs/categories/`; do not guess their option object keys.

### Step 1 — Public packages → `GET /public/packages/`

- Create `pages/courses/queries/use-public-packages.ts` with
  `PUBLIC_PACKAGES_QUERY_KEY`.
- Replace `pricingPackages` on the Online Classes pricing section with active
  API packages sorted by API order.
- Render title, description, decimal-string price, class count, validity, image
  and `is_first_lesson`; maintain local presentational badges only where they
  do not change purchase semantics.
- Make pricing CTA carry the selected package UUID into the booking flow.
- Use a local image/placeholder fallback when `image_url` is empty.

### Step 2 — Public teachers → list and detail

- Add public teacher list/detail queries and replace static teacher arrays in:
  - homepage `TeachersSection`;
  - Online Classes `OnlineTeachersSection`;
  - booking step 1;
  - teacher profile route.
- Map API `tags`, `institute`, `description`, `availability_label`, and
  `accepting_students`; do not expose raw weekly `availability` as visitor
  bookable times.
- Change booking links to carry a teacher UUID, preserving a readable teacher
  profile route only after the Step 0 URL decision.
- Replace static profile metadata and `generateStaticParams` strategy with
  server-safe public fetching (or make profile pages dynamic) so a new active
  teacher is visible without a frontend redeploy.

### Step 3 — Public testimonials → `GET /public/testimonials/`

- Add `use-public-testimonials.ts` and replace the homepage carousel’s local
  testimonial list.
- Render outcome, student name, country/programme, rating and photo with an
  avatar fallback; preserve carousel accessibility and motion behaviour.
- Keep aggregate social/TripAdvisor statistics static unless the backend later
  exposes a metrics endpoint.

### Step 4 — Lead capture → `POST /public/leads/`

- Create a shared lead schema and mutation for both homepage free-guide and
  blog newsletter forms.
- Validate first name, email and required GDPR consent; send `source=homepage`
  or `source=blog_post` as appropriate.
- Replace fake delays with mutation pending/error/success UI and use the API’s
  idempotent success message for repeat subscriptions.
- Preserve the privacy link and do not report success if the API fails.

### Step 5 — Contact form and programme enquiries

- Add a contact subject query once its helper-route shape is verified, then
  replace hardcoded subject labels with API-provided labels/enum values.
- Add `ContactSchema` and `useSendContactMessage`; submit `name`, `email`,
  `subject`, `message`, and optional `programme` to `/public/contact/`.
- Replace simulated submit state with API message/error handling.
- Wire “Inquire about this programme” CTAs on Study in Quito pages to prefill
  the documented `programme` field (or route them to `/contact` with a safe
  query parameter that the form consumes).

### Step 6 — Blog listing and category navigation

- Add blog list/category query hooks with `p`, `page_size`, `category`, and
  `lang`; use the full params object in each query key.
- Convert category pills into accessible buttons/links that update the API
  filter and reset page to 1.
- Replace static post cards with `title`, `excerpt`, `thumbnail`,
  `category_label`, `reading_time`, and `published_at`.
- Add pagination using the shared component and loading/error/empty states.
- Do not expose draft posts: the public list/detail API is the authority.

### Step 7 — Blog detail, metadata, related posts

- Fetch `/public/blogs/:slug/` server-side through the public request wrapper;
  return `notFound()` on API 404.
- Replace static article data and generated static slug list with API detail
  data; render `body` as the backend’s rich HTML only after an explicit
  sanitization policy is implemented.
- Use API title/excerpt/SEO fields if supplied for `generateMetadata`; otherwise
  use the documented title/excerpt fallbacks.
- Render up to three API `related_posts`; use API thumbnail/category data and
  a safe image fallback.

### Step 8 — Real availability → `GET /public/teachers/:id/slots/`

- Replace booking step 3’s date/time mocks with a date/week picker driven by
  `date`, visitor `tz`, and `days` (start with 7).
- Display the backend-ready `label` and store the matching `start_utc`; show
  `start_local`/timezone in the confirmation UI.
- Refetch only when teacher, date/week, or timezone changes; handle no slots,
  malformed timezone, stale selection, loading and error states.
- Clear a previously selected slot whenever the teacher or date changes.

### Step 9 — Checkout → `POST /public/bookings/checkout/`

- Rebuild the booking form around the real sequence: teacher UUID → package
  UUID → verified slot → student details → checkout confirmation.
- Add a Zod schema for first name, optional last name/phone/country, email,
  API Spanish-level enum, timezone, and the required selected UUIDs/slot.
- Remove raw card inputs. Phase 1 sends the documented dummy
  `payment_method` only; real Stripe Elements is a future backend/product
  scope.
- Submit the exact `start_utc` as `start_datetime`; disable duplicate submits.
- On success, render backend booking data (teacher, package, `start_local`,
  Meet link, invoice number, amount/currency, classes remaining) and show the
  account-created email notice only when `account_created` is true.
- Surface the backend’s slot-taken, lead-time, first-lesson, and declined-card
  messages without leaving a false confirmed state.

### Step 10 — Unsubscribe landing page → `GET /public/leads/unsubscribe/:token/`

- Add an unauthenticated `/unsubscribe/[token]` route matching the email-link
  contract.
- Call the idempotent endpoint once, show its success message, and provide a
  clear invalid/expired-token error state.
- Ensure the page has no marketing lead form and no auth requirement.

### Step 11 — Final public pass

- Remove only the static data replaced by public API work; retain static
  marketing content for which no backend endpoint exists (activities,
  homestay, immersion/programme editorial copy, legal pages).
- Check every public read/write state: loading, empty, API error, retry, image
  fallback and mobile layout.
- Check language parameter fallback, dynamic SEO metadata, public 404s, form
  validation and booking double-submit/stale-slot paths.
- Run `npm run typecheck`, ESLint for changed files, and plain `npm run build`
  (not `dotenv -e .env`).

---

## Known blockers / out-of-scope decisions

1. **Teacher slug absent.** A UUID public URL works immediately but is not
   pretty. A backend `slug` field is needed for stable readable profile URLs.
2. **“Match me” has no API contract.** It cannot safely submit checkout without
   a chosen teacher UUID.
3. **Payment is not Stripe yet.** Phase 1 intentionally uses a dummy gateway;
   no card data should be handled by this frontend.
4. **Subject/category helper response shapes need one real API check.** The
   routes are documented but their JSON examples are not.
5. **No API exists for most editorial pages.** Their current static data is not
   a mock to remove: activities, homestay, programme copy, legal content and
   school-history sections remain content-managed in the frontend for now.

---

## Progress log

| Step | Status | Date | What changed |
|---|---|---|---|
| 0. Public foundation | ⏳ Next | — | Types, public request path, language/timezone helpers, helper-route verification |
| 1. Packages | ⬜ Not started | — | — |
| 2. Teachers | ⬜ Not started | — | — |
| 3. Testimonials | ⬜ Not started | — | — |
| 4. Lead capture | ⬜ Not started | — | — |
| 5. Contact | ⬜ Not started | — | — |
| 6. Blog list | ⬜ Not started | — | — |
| 7. Blog detail | ⬜ Not started | — | — |
| 8. Availability | ⬜ Not started | — | — |
| 9. Checkout | ⬜ Not started | — | — |
| 10. Unsubscribe | ⬜ Not started | — | — |
| 11. Final pass | ⬜ Not started | — | — |
