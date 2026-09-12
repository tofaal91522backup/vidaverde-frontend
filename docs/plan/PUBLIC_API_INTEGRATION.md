# Public Marketing Site — API Integration Plan

> **Ei file ta live progress tracker.** Proti step sesh howar por “Progress
> Log” update hobe. Ekhane shudhu unauthenticated marketing/public API scope;
> student ar admin dashboard-er API alada plan-e ache.

- **Source of truth:** [docs/bruno/public/](../bruno/public/)
- **Started:** 2026-09-12
- **Current step:** ✅ **Shob step (0–11) shesh** — public marketing site puro real API-te
- **Status:** complete

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
- `contact/subjects/` and `blogs/categories/` return `{ success, subjects/categories:
  [{ value, label }] }` (live-verified 2026-09-12).
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
4. **Subject/category helpers verified.** Both routes return `value`/`label`
   option arrays; the types are in place for their later UI steps.
5. **No API exists for most editorial pages.** Their current static data is not
   a mock to remove: activities, homestay, programme copy, legal content and
   school-history sections remain content-managed in the frontend for now.

---

## Progress log

| Step | Status | Date | What changed |
|---|---|---|---|
| 0. Public foundation | ✅ Done | 2026-09-12 | Public request path, exhaustive API types, shared language/timezone helpers; subjects/categories response shapes live-verified |
| 1. Packages | ✅ Done | 2026-09-12 | Live package query, API sort order, dynamic pricing cards/images/fallbacks, and UUID preselection in booking |
| 2. Teachers | ✅ Done | 2026-09-12 | Live teacher list/detail on home, Online Classes, booking and profile; UUID profile links; match-me option removed because checkout requires a teacher UUID |
| 3. Testimonials | ✅ Done | 2026-09-12 | Live testimonial carousel with rating, programme/country, photo fallback, and accessible duplicated marquee items |
| 4. Lead capture | ✅ Done | 2026-09-12 | Shared validated lead form/mutation wired to homepage guide and blog newsletter with source, GDPR consent, pending/error and API-response success states |
| 5. Contact | ✅ Done | 2026-09-12 | API-provided subject labels, `ContactSchema` + `useSendContactMessage`, real pending/error/success states, programme prefill |
| 6. Blog list | ✅ Done | 2026-09-12 | Live blog list + API category pills, pagination, loading/error/empty; static `posts.data` list-e ar use hoy na |
| 7. Blog detail | ✅ Done | 2026-09-12 | Server-side fetch + real 404, sanitized rich HTML body, API SEO/related posts; static blog data delete |
| 8. Availability | ✅ Done | 2026-09-12 | Fake time list shoriye asol slot API; `start_utc` rakha hoy, teacher/date bodlale slot clear |
| 9. Checkout | ✅ Done | 2026-09-12 | Real checkout call, fake card form deleted, backend booking data-te confirmation, backend error message surfaced |
| 10. Unsubscribe | ✅ Done | 2026-09-12 | Notun `/unsubscribe/[token]` route, server-side idempotent call, invalid-token state, noindex |
| 11. Final pass | ✅ Done | 2026-09-12 | Dead static data delete, 13 ta endpoint verify, state audit; blog-detail language limitation documented |

---

## Detailed log

### Step 5 — Contact · 2026-09-12 · ✅

**Log ta pore likha holo.** Kaj-ta age hoye giyechilo kintu ei table-e `Not started`
theke giyechilo — keu plan porle abar Step 5 dhorto.

**Files:** `queries/use-contact.ts` · `schemas/contact.schema.ts` ·
`pages/contact/components/contact-form.tsx` · `pages/contact/index.tsx`

Subject label gula `GET /public/contact/subjects/` theke ashe (hardcode kora na),
`POST /public/contact/` e `name`/`email`/`subject`/`message` + optional `programme` jay,
ar mutation-e `showSuccessToast`/`showErrorToast` off kore form-er nijer state-e
message dekhano hoy.

### Step 6 — Blog listing · 2026-09-12 · ✅

**New:** `pages/blog/queries/use-public-blogs.ts` (list + categories) ·
`pages/blog/components/BlogGrid.tsx`

**Modified:** `pages/blog/index.tsx` — static import shoriye `<BlogGrid />`

**Field mapping:** `post.category` → `category_label` · `post.readingTime` →
`reading_time` (min read) · `post.date` → `published_at` · `post.image` → `thumbnail`.

**Category pill ekhon API theke.** Age `posts.data.ts`-er hardcoded `categories` array
chhilo ar pill gula **`<span>`** — click kora jeto na, shudhu dekhte button-er moto chhilo.
Ekhon `GET /public/blogs/categories/` theke value+label, asol `<button>` with
`aria-pressed`, ar category bodlale page 1-e fire jay.

**⚠️ `page_size` 10-i rakhte holo.** Shared `<Pagination>` component
`Math.ceil(total / 10)` **hardcode** kore. 9 rakhle (3-column grid-e dekhte bhalo hoto)
page count kom dekhato ar **shesh page gula te jawa-i jeto na** — chupchap post harato.
Query file-e comment kore rakha hoyeche.

**Draft post niye kichu korte hoy ni** — public list API nijei shudhu published dey.

**`posts.data.ts` delete kori nai** — blog **detail** (Step 7) ar
`app/(marketing)/blog/[slug]/page.tsx` ekhono oita use kore. Step 7-e ek shathe jabe.

### Step 7 — Blog detail · 2026-09-12 · ✅

**New:** `queries/get-public-blog-detail.ts` · `utils/sanitize-blog-html.ts` ·
`vv-prose` styles in `app/globals.css`

**Modified:** `PostDetail.tsx` · `app/(marketing)/blog/[slug]/page.tsx`

**Deleted:** `pages/blog/data/posts.data.ts` — ar kono file eta use kore na
(Step 6-e list, ekhane detail — duitai API-te)

**Notun dependency: `sanitize-html` 2.17.7** (+ `@types/sanitize-html`).
Backend `body` **rich HTML** dey ar sheta `dangerouslySetInnerHTML` diye boshate hoy.
Plan-er niyom chhilo sanitization policy chhara render na kora. Hand-roll kora
nirapod na, project-e kono sanitizer chhilo-o na — tai library.

**Policy `sanitize-blog-html.ts` e, allowlist-based:**
- Tag: `p`, heading, list, `blockquote`, `a`, `img`, `figure`, `code`/`pre`, table
- Attribute khub kom; **`class` bad** (editor-er class amader token-er shathe milto na)
- Scheme shudhu `http`/`https`/`mailto` — `javascript:` ba `data:` href atke jay
- `<a>` e `target="_blank"` + **`rel="noopener noreferrer"`** (na dile
  reverse-tabnabbing er jayga thakto)
- `nonTextTags` e `script`/`style` — bad deওয়া tag-er **bhitorer text-o** jay na

**Sanitize server-e hoy** — blog detail ekta server component, tai kacha HTML
browser porjonto pouchay-i na.

**`generateStaticParams` shoriye dilam.** Oita `posts.data.ts` theke slug list banato —
ekhon slug CMS-e, build-time-e jana jay na. Route ekhon `ƒ Dynamic`, mane **notun post
publish korle rebuild chhara-i dekha jabe**.

**404 ta asol.** `getPublicBlogDetail()` shudhu **API 404** hole `null` dey; onno error
(server down, network) **throw kore** — na hole "backend down" ke "post nai" bole
dekhato, ar Google oi URL de-index kore dito.

**SEO:** `meta_title`/`meta_description` backend dile sheta, na hole documented
`title | Vida Verde Blog` + `excerpt` fallback.

**Related posts:** API-r `related_posts` (3 tar cap), thumbnail khali hole warm block.

**`vv-prose` CSS add korte holo** — sanitized HTML-er tag gula kono class pay na
(policy-te `class` bad), tai `globals.css`-e heading/list/quote/code/table-er style.

**Verify:** `typecheck` clean · `eslint` marketing clean · `npm run build` 49/49,
`/blog/[slug]` ekhon `ƒ Dynamic`

### Step 8 — Availability · 2026-09-12 · ✅

**New:** `pages/book/queries/use-public-teacher-slots.ts` ·
`pages/book/components/SlotPicker.tsx`

**Modified:** `pages/book/index.tsx`

**Fake time list gelo.** Age step 3-e hardcoded `["9:00 AM", "10:00 AM", ...]` chhilo —
teacher ke, kobe, ki kore free, kichhur shathe kono somporko chhilo na. Visitor emon
time-e "book" korte parto jokhon teacher-er kono availability-i nai. Ekhon
`GET /public/teachers/:id/slots/` — backend weekly rule theke hisheb kore, booked class,
time-off ar 12 ghontar lead time bad diye.

**State bodlano holo:** `selectedTime: string` (label) → `selectedSlot: PublicTeacherSlot`.
Label ta dekhanor jonno, kintu **`start_utc` ta-i asol** — Step 9-e checkout-e hubohu
`start_datetime` hisebe jabe. Label theke time banale backend re-validate-e fail korto.

**Stale selection clear kora hoy** — teacher ba date bodlale `selectedSlot` null hoy
(`changeTeacher` / `changeDate`). Na korle onno teacher-er slot niye porer step-e chole
jeto, ar checkout-e giye 400 khato.

**Timezone visitor-er nijer** — `getPublicTimeZone()` (Step 0-e banano) theke, ar `tz`
param hisebe jay. Purono copy-te lekha chhilo "Ecuador is GMT−5" — ekhon backend-er
ferot deওয়া `timezone` + `duration_minutes` dekhano hoy.

**`todayInput()` local date theke** — `toISOString()` UTC dey, tate date input-er `min`
ek din agiye jete parto ar aj-ker slot lukiye jeto.

**State handle kora:** loading · error · "no free times in the 7 days" (later date/onno
teacher-er suggestion shoho) · teacher select na kora obostha (`enabled: false`).

**Refetch shudhu teacher/date/tz bodlale** — query key-e oi tinta-i.

**Verify:** `typecheck` clean · `eslint` marketing clean · `npm run build` 49/49

### Step 9 — Checkout · 2026-09-12 · ✅

**New:** `schemas/checkout.schema.ts` · `queries/use-checkout.ts`

**Modified:** `pages/book/index.tsx`

**Fake card form delete kora holo.** Age Card Number / Expiry / CVC input chhilo ar
"Secure payment via Stripe" lekha chhilo — kintu oi data **kothao jeto na**, kono
gateway-o chhilo na. Sheta rekhe deওয়া mane visitor-ke card number likhte bola, ja
kono kaje lagto na ar amader **PCI scope-e** dhukiye dito. Backend Phase 1-e dummy
gateway chalay ar shudhu `payment_method` token ney — tai `DUMMY_PAYMENT_METHOD`
pathano hoy, ar UI te sposhto lekha: "No card details are collected on this page."

**Booking ekhon sotti hoy.** Age `handleConfirm` shudhu `setConfirmed(true)` korto —
visitor "You're booked!" dekhto kintu **backend-e kichu-i jeto na**. Ekhon
`POST /public/bookings/checkout/`.

**Field gula API enum-e bodlano:** free-text `level` ("Complete beginner. I know very
little Spanish") → `spanish_level` enum (`none`/`beginner`/...). Purono string pathale
backend 400 dito. `firstName`/`lastName` → `first_name`/`last_name`, ar `phone_number`,
`country`, `timezone` add.

**`last_name` ekhon optional** — age `required` chhilo ar `canAdvance`-eo lagto, kintu
backend-e optional. Ek naam-er lok ke atkano hoto.

**Confirmation puro backend data theke** — `message`, `teacher`, `package_title`,
`start_local`, `timezone`, `duration_minutes`, `invoice_number`, `amount_paid` +
`currency`, `classes_remaining`. Ar "Add to Calendar" er dead `href="#"` er jaygay
asol `meet_link`.

**`account_created` true hole-i** "check your email for your password" note dekhay —
purono student-ke oi kotha bola bhul hoto.

**Error false-confirm kore na.** `showErrorToast` off, error form-er nichei dekhano hoy
backend-er nijer message diye (slot chole geche / lead time / first-lesson limit /
declined card). `checkout.isPending` e button disable — duplicate submit bondho.

**`start_utc` hubohu jay** `start_datetime` hisebe (Step 8-e store kora), kono convert
chhara.

**Verify:** `typecheck` clean · `eslint` marketing clean · `npm run build` 49/49

### Step 10 — Unsubscribe · 2026-09-12 · ✅

**New:** `pages/unsubscribe/queries/get-public-unsubscribe.ts` ·
`pages/unsubscribe/index.tsx` · route `app/(marketing)/unsubscribe/[token]/page.tsx`

**Server component, hook na.** Email-er footer theke click kore ashe, tai JS chhara-o
kaj kora uchit ar loading flash thaka uchit na. Endpoint idempotent, tai proti request-e
call kora nirapod.

**Error duibhagey bhaga holo — eta-i main kaj:**
- **404/400** → "This unsubscribe link is not valid any more" (token-er dosh)
- **onno kichu** (server down, network) → "We could not process this request right now.
  Please try the link again shortly."

Shob error-ke "invalid link" bole dile emon user ke bola hoto je **token thik chhilo,
shudhu server down chhilo** — tara bhabto unsubscribe kaj korchhe na ar spam report korto.
Legal dik theke-o eta jhuki.

**Ei page-e ichchhe kore kono lead/newsletter form nai** — je matro unsubscribe korlo
take abar subscribe korte bola oshovyo. `(marketing)` layout-er footer check kore
dekhechi, ওkhane-o kono form nai.

**`robots: noindex, nofollow`** — email link, search result-e ashar kono karon nai
(ar token URL index hoye jaওয়া-o thik na).

**Success copy-te sposhto kore bola** je marketing email bondho hocche, kintu booking/class
email ashte thakbe — na hole user bhabto class-er reminder-o bondho hoye gelo.

**Verify:** `typecheck` clean · `eslint` marketing clean · `npm run build` 49/49,
`/unsubscribe/[token]` → `ƒ Dynamic`

### Step 11 — Final public pass · 2026-09-12 · ✅

**Deleted (API-te replace hoye giyechilo, ar kothao use hocchilo na):**
`pages/courses/data/online-classes.data.ts` theke `pricingPackages` + `PricingPackage`
ar `onlineTeachers` + `OnlineTeacher`. `howItWorksSteps` ar `onlineClassesFaqs` rekhe
deওয়া holo — oigular kono endpoint nai.

**Static content ja ichchhe kore rakha holo** (kono backend endpoint nai): activities,
homestay, study-in-quito programme copy, privacy/terms, home-er `socialStats`, FAQ,
how-it-works.

**13 ta public endpoint-i wired:**
`/public/packages/` · `/public/teachers/` · `/public/teachers/:id/` ·
`/public/teachers/:id/slots/` · `/public/testimonials/` · `/public/blogs/` ·
`/public/blogs/categories/` · `/public/blogs/:slug/` · `/public/contact/` ·
`/public/contact/subjects/` · `/public/leads/` ·
`/public/leads/unsubscribe/:token/` · `/public/bookings/checkout/`

**State audit** — data-driven 11 ta component-er protita te loading ar error state ache;
list wala gula te empty state-o (teachers, packages, testimonials, blogs, slots).
Teacher profile detail-e `isError || !teacher` → sposhto "not found" panel.

**Verify:** `typecheck` clean · `eslint` marketing/lib/route-e **0 error**
(purono `CountUpStat` warning ta ei kaj-er na) · `npm run build` 49/49

---

## ⚠️ Known limitation — blog detail shob shomoy English

`/blog/[slug]` ekta **server component** (SEO-r jonno, Step 7). Kintu visitor-er bhasha
`LanguageProvider`-e — ekta **client-side context** ja localStorage pore. Server sheta
porte pare na, tai blog detail `DEFAULT_PUBLIC_LANGUAGE` (`en`) diye fetch kore.

Mane: **site Spanish-e rakhleo blog post ta English-e dekhabe** (baki shob page thik
kore Spanish dey).

Thik korar poth (product siddhanto dorkar):
1. `/es/blog/...` er moto **locale-based routing** — SEO-r jonno shobcheye bhalo, kintu
   puro site-er routing bodlate hobe
2. `?lang=es` **search param** — chhoto kaj, kintu link share korle bhasha hariye jete pare
3. Detail-ta **client-side** kore deওয়া — bhasha thik hobe kintu server-rendered SEO
   metadata hariye jabe

Ekhon-ker obostha ichchhe kore neওয়া trade-off: **SEO > detail page-er bhasha**.
