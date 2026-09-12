# Student Portal — API Integration Plan

> **Ei file ta live progress tracker.** Proti step sesh howar por "Progress Log" section
> update hobe. Onno kono AI/dev ei file porei bujhte parbe ki hoyeche ar next ki.
>
> **Manually test korte:** [STUDENT_TEST_PLAN.md](STUDENT_TEST_PLAN.md) — route-wise checklist.

- **Scope:** shudhu Student (customer) dashboard — admin/marketing ei plan-e nai
- **Backend commit:** `f7ccf8b` ([docs/bruno/](../bruno/))
- **Started:** 2026-09-12
- **Current step:** ✅ **Shob step (0–9) shesh** — student portal puro real API-te
- **Baki:** 3 ta blocker, ei plan-er baire (niche "Known blockers" dekho)
- **Mock status:** student feature ekhon **puro mock-free** ✅

---

## Ground rules (proti step-e follow korte hobe)

1. **Project convention mante hobe** — [CLAUDE.md](../../CLAUDE.md) er file structure, naming, pattern
2. **Notun kichu banabo na jodi already thake** — shared component gulo reuse korte hobe
3. **Ek step-e ek jinis** — user "next" bolle porer step, ager gula te hat dibo na
4. **Proti step sesh-e ei MD-r Progress Log update** — ki file change holo, ki baki
5. **Mock data delete kora hobe na ekbare** — step-wise, je part integrate hocche shudhu shetar mock jabe

---

## Building blocks (ja ache, jegula use hobe)

| Ja lagbe | File |
|---|---|
| GET | [use-fetch-data.ts](../../src/hooks/use-fetch-data.ts) |
| POST/PATCH/DELETE | [use-mutation-handler.ts](../../src/hooks/use-mutation-handler.ts) |
| Form + Zod | [use-zod-tanstack-form.ts](../../src/hooks/use-zod-tanstack-form.ts) |
| Field UI | [form-field-wrapper.tsx](../../src/components/shared/form-related/form-field-wrapper.tsx) |
| Submit | [submit-button.tsx](../../src/components/shared/form-related/submit-button.tsx) · [submit-error-summary.tsx](../../src/components/shared/form-related/submit-error-summary.tsx) |
| Select | [reusable-select.tsx](../../src/components/shared/form-related/reusable-select.tsx) |
| Image upload | [single-file-uploader.tsx](../../src/components/shared/form-related/single-file-uploader.tsx) |
| Table | [data-table.tsx](../../src/components/shared/data-table.tsx) · [pagination.tsx](../../src/components/shared/pagination.tsx) |
| Loading/error | [async-state-wrapper.tsx](../../src/components/shared/async-state-wrapper.tsx) |
| Modal | [app-dialog.tsx](../../src/components/shared/app-dialog.tsx) |
| Query string | [make-endpoint.ts](../../src/lib/http/make-endpoint.ts) |

**Use korbo na:** `native-select.tsx` ar `multi-step-form-wrapper.tsx` — egula react-hook-form
er jonno, baki shob tanstack-form. Mix korle inconsistent hoye jabe.

---

## Decisions (already thik kora, argue korar dorkar nai)

1. **`customer` → `student` rename** — backend role `STUDENT`, tai frontend-eo `student`
2. **Response envelope** — shob response `{ success: true, ... }` shape-e ashe.
   `useFetchData<T>`-e T hobe **puro envelope type**, component-e `data?.results` pore nibo.
   `useFetchData` hook-e hat dibo na.
3. **Public endpoint (`/public/teachers/`, slots)** — student logged-in thake, tai
   normal `request.get` diyei call hobe; `publicApiClient` lagbe na.
4. **Invoice PDF** — backend real PDF (binary) dey. Ekhon-kar client-side HTML print
   ([invoice-pdf.ts](../../src/features/protected/pages/dashboard/customer/pages/invoices/components/invoice-pdf.ts))
   bad jabe. `request`-e ekta `getBlob` add korte hobe.
5. **Timezone** — backend proti response-e `timezone` + `start_local` pathay.
   Frontend nijer theke convert korbe na, `start_local` render korbe.

---

## Field mapping (mock → real API)

Ei mismatch gulai main kaj. Mock camelCase, backend snake_case + onek notun field.

### My Packages — `GET /student/packages/`
| Mock | Real | Note |
|---|---|---|
| `name` | `package_title` | |
| `classesTotal` | `classes_total` | |
| `classesUsed` | `classes_used` | |
| `expiryDate` | `expires_at` | |
| `isActive` | `can_book` / `is_expired` | `can_book` diye "Book a class" button gate hobe |
| `teacher` | — | **nai** — package-e teacher bandha na |
| `purchaseDate` | `created_at` / `paid_at` | |
| — | `classes_remaining`, `progress_percent`, `payment_status`, `amount_paid`, `invoice{}`, `package_data{}` | **notun** |

### Invoices — `GET /student/invoices/`
| Mock | Real | Note |
|---|---|---|
| `invoiceNumber` | `number` | |
| `date` | `issued_at` | |
| `package` | `package_title` | |
| `amount` (number) | `amount` (**string**) | `"12.00"` — parse lagbe |
| `paymentStatus` | — | **nai** invoice list-e |
| `teacher`, `sessions` | — | **nai** |
| — | `currency` | notun |

### Sessions — `GET /student/sessions/`
| Mock | Real | Note |
|---|---|---|
| `teacher: {id, name}` | `teacher` (uuid) + `teacher_name` + `teacher_img` | flat hoye geche |
| `date` + `timeUtc` | `start_datetime` + `start_local` + `end_datetime` | |
| `duration` | `duration_minutes` | |
| `status: upcoming` | `status: scheduled` | value bodleche: `scheduled`/`completed`/`no_show`/`cancelled`/`rescheduled` |
| `meetingLink` | `meet_link` | |
| `package` | `package_title` | |
| — | `can_reschedule`, `rescheduled_from`, `student_package` | notun |

---

## Endpoints (shob student API)

| # | Method | Path | Kothay lagbe |
|---|---|---|---|
| 1 | GET | `/student/dashboard/` | Overview |
| 2 | GET/PATCH | `/student/me/` | Profile |
| 3 | GET | `/student/packages/` | My Packages |
| 4 | GET | `/student/invoices/` | Invoices |
| 5 | GET | `/student/invoices/:id/pdf/` | Invoice download (binary) |
| 6 | GET | `/student/sessions/?filter=&p=` | Calendar / My Sessions |
| 7 | POST | `/student/sessions/` | Book a class |
| 8 | POST | `/student/sessions/:id/reschedule/` | Reschedule |
| 9 | POST | `/student/sessions/:id/cancel/` | Cancel |
| 10 | GET | `/public/teachers/` | Book flow — teacher picker |
| 11 | GET | `/public/teachers/:id/slots/` | Book/reschedule — slot picker |

---

## STEPS

### Step 0 — `customer` → `student` rename
Kono API kaj nai, shudhu naming thik kora. Ei ta age korle porer shob step clean.

**Move:**
- `src/features/protected/pages/dashboard/customer/` → `.../student/`
- `src/app/(protected)/dashboard/customer/` → `.../student/`

**Rename:**
- `CustomerSidebar` → `StudentSidebar`, file `customer-sidebar.tsx` → `student-sidebar.tsx`
- `CustomerSidebarNavItems` → `StudentSidebarNavItems`, file → `student-sidebar-nav-items.ts`
- `useCustomerSessions` → `useStudentSessions`, file `use-customer-sessions.ts` → `use-student-sessions.ts`
- `CustomerSession` type → `StudentSession`
- `CustomerDashboardLayout` → `StudentDashboardLayout`
- `CustomerDashboardIndex` → `StudentDashboardIndex`
- Query keys: `"customer-sessions"` → `"student-sessions"`, `"customer-my-packages"` → `"student-packages"`, `"customer-invoices"` → `"student-invoices"`

**URL update:** nav items + overview card links + form redirects — `/dashboard/customer/*` → `/dashboard/student/*`

**Verify:** `grep -ri "customer" src/` — dashboard-e kono customer ref na thaka

---

### Step 1 — Student types + folder skeleton
- `src/features/protected/pages/dashboard/student/types/student.type.ts`
  — shob envelope + entity type ek jaygay (`StudentSession`, `StudentPackage`, `StudentInvoice`, `StudentProfile`, `DashboardResponse`, paginated wrapper)
- `src/lib/http/request.ts` — `getBlob(url): Promise<Blob>` add (Step 4-e lagbe)

---

### Step 2 — Dashboard Overview → `GET /student/dashboard/`
- `pages/overview/queries/use-student-dashboard.ts` — `STUDENT_DASHBOARD_QUERY_KEY`
- `pages/overview/index.tsx` — hardcoded card number gulo real data diye replace
  (`next_session`, `packages[]`, `recent_invoices[]`)
- `next_session === null` hole empty state
- `AsyncStateWrapper` diye loading/error

---

### Step 3 — My Packages → `GET /student/packages/`
- `queries/use-my-packages.ts` — mock delete, real `useFetchData`
- `components/package-card.tsx` — notun field-e map (`progress_percent` bar, `classes_remaining`, `expires_at`, `payment_status` badge)
- `can_book === true` hole "Book a class" button (Step 7-e wire hobe, ekhon disabled/placeholder)

---

### Step 4 — Invoices → `GET /student/invoices/` + PDF
- `queries/use-invoices.ts` — mock delete, real call
- `components/invoices-column.tsx` — `number`, `issued_at`, `package_title`, `amount`+`currency`
  (`teacher`/`sessions`/`paymentStatus` column bad — backend dey na)
- `invoice-pdf.ts` **replace** → `/student/invoices/:id/pdf/` theke blob niye download
- Download button-e loading state

---

### Step 5 — Sessions / Calendar → `GET /student/sessions/`
- `queries/use-student-sessions.ts` — `filter` (`upcoming`/`past`/`all`) + `p` param
- `components/student-calendar.tsx` — `start_local` render, notun status value handle
  (`scheduled`/`completed`/`no_show`/`cancelled`/`rescheduled`), `meet_link` join button
- Calendar month/week view er date range → backend `filter`+pagination-e adapt
- Response-er `timezone` label hisebe dekhano

---

### Step 6 — Cancel + Reschedule
- `queries/use-session-actions.ts`:
  - `useCancelSession` → `POST /student/sessions/:id/cancel/` (no body)
  - `useRescheduleSession` → `POST /student/sessions/:id/reschedule/`
- Cancel: confirm dialog + response-er `class_returned` onujayi message
- Reschedule: `AppDialog` + slot picker (`/public/teachers/:id/slots/`), optional teacher change
- `can_reschedule === false` hole button disabled (24h cutoff)
- `invalidateKeys`: sessions + packages + dashboard

---

### Step 7 — Book a class
- `pages/book-class/` — notun page
- `queries/use-book-session.ts` → `POST /student/sessions/`
- `queries/use-teacher-slots.ts` → `GET /public/teachers/:id/slots/?date=&tz=&days=7`
- `queries/use-public-teachers.ts` → `GET /public/teachers/`
- `schemas/book-session.schema.ts` — `student_package`, `teacher`, `start_datetime`
- Flow: package select (`can_book` wala) → teacher → slot → confirm
- `start_utc` verbatim pathate hobe (convert kora jabe na)
- Route: `src/app/(protected)/dashboard/student/book-class/page.tsx` + nav item

---

### Step 8 — Profile → `GET/PATCH /student/me/`
- `pages/profile/` — notun page (ekhon `src/app/(protected)/profile/` alada ache, check kore decide)
- `queries/use-student-profile.ts` — GET + PATCH mutation
- `schemas/student-profile.schema.ts` — `name`, `profile_img_url`, `country`, `phone_number`, `timezone`, `current_spanish_level`
- Form: `useZodTanstackForm` + `FormFieldWrapper` + `ReusableSelect` (level, timezone) + `SingleFileUploader` (profile_img_url)
- `id`/`email`/`active` read-only — form-e disabled

---

### Step 9 — Final pass
- Shob page-e loading/error/empty state check
- `grep` kore dekha kono mock/`enabled: false` student part-e baki ase kina
- Timezone label consistent kina
- `npm run build` clean kina

---

## Known blockers (ei plan-er baire)

### Frontend — auth/routing (age thekei)
- **Login-er por redirect nai** — `/dashboard/student`-e manually jete hobe test korte
- **`middleware.ts` nai** — protected route unguarded
- **Cookie `secure: true` hardcoded** — local http dev-e session nao boshte pare
  ([session.ts](../../src/features/auth/utils/session.ts))

### Frontend — build
- ✅ **Kono shomossha nai.** `npm run build` 48/48 page clean build kore.
- ⚠️ Build **shob shomoy `npm run build`** diye chalate hobe. `dotenv -e .env` diye
  chalale `.env`-er `NODE_ENV=development` build-e dhuke jay ar prerender bhenge
  `Cannot read properties of null (reading 'use')` dey — eta project-er bug na,
  command-er bhul.

### Backend theke ja chaite hobe (priority onujayi)

**1. `/student/sessions/` e date-range filter**
Calendar month/week grid date range chay, kintu endpoint shudhu `upcoming`/`past`/`all` dey.
Ekhon `filter=all&page_size=200` ene client-side e bhag kora hoy — 200-er beshi session hole
truncate hobe (UI-te warning dekhay).
→ *Chai:* `?from=YYYY-MM-DD&to=YYYY-MM-DD`, jemon admin-er
`/administrator/sessions/calendar/` e already ache.

**2. `/student/invoices/` e `payment_status`**
Invoice list-e status field nai, tai "Paid/Pending" column bad dite holo (mock-e chhilo).
→ *Chai:* `payment_status` field, ba nishchit kore dao invoice mane always paid.

**3. (chhoto) `/student/invoices/` e pagination**
Ekhon puro list ek shathe ashe, search-o client-side. Onek invoice hole shomossha hobe.
→ *Chai:* `p` / `page_size`, jemon sessions-e ache.

### ✅ File upload — thik kora hoyeche (2026-09-12)
Prothome bhebechilam `/administrator/upload/` admin-only, tai student profile-e URL text
input diyechilam. **Project owner confirm korechen route ta shob role-er jonno.** Tai:
- `services/upload-file.service.ts` **thik kora holo** — age `/upload-file/` e pathato ar
  `res.stored_path` porto; ekhon `/administrator/upload/` ar `res.url`. Ei ek fix-e
  admin-er blog/teacher form-er upload-o thik hoye gelo (oigula age theke-i bhanga chhilo).
- Student profile-e URL input shoriye `SingleFileUploader` (asol file picker) boshano holo.

### Backend (age thekei, tracker-e ache)
- **Registration + verify-email endpoint nai** — frontend page ache kintu backend-e nai;
  signup asholei `/public/bookings/checkout/` er bhitore hoy

---

## Progress Log

| Step | Status | Date | Ki hoyeche |
|---|---|---|---|
| 0. Rename customer→student | ✅ Done | 2026-09-12 | Folder/file/identifier/URL shob rename, typecheck clean |
| 1. Types + skeleton | ✅ Done | 2026-09-12 | `student.types.ts` + global `api-response.type.ts` + `request.getBlob` |
| 2. Dashboard overview | ✅ Done | 2026-09-12 | **Prothom real API call.** `/student/dashboard/` live, next-class card + real stats |
| 3. My Packages | ✅ Done | 2026-09-12 | Mock delete, `/student/packages/` live, `Date.now()` eslint error-o gelo |
| 4. Invoices + PDF | ✅ Done | 2026-09-12 | Mock delete, real PDF download, nokol PDF generator delete |
| 5. Sessions/Calendar | ✅ Done | 2026-09-12 | Shesh mock ta gelo. Timezone + "today" bug fix, 2 ta purono warning-o gelo |
| 6. Cancel + Reschedule | ✅ Done | 2026-09-12 | Prothom mutation. Cancel + reschedule + slot picker live |
| 7. Book a class | ✅ Done | 2026-09-12 | Notun page + 3-step flow, Step 6-er teacher-change baki ta-o shesh |
| 8. Profile | ✅ Done | 2026-09-12 | Notun page, asol tanstack-form. 2 ta backend blocker paoa gelo |
| 9. Final pass | ✅ Done | 2026-09-12 | Shob verify. Build-e **pre-existing** project-wide prerender error dhora porlo |

**Next:** — (shob step shesh)

### Detailed log

#### Step 0 — Rename `customer` → `student` · 2026-09-12 · ✅

**Moved (git mv, history rokkha kore):**
- `src/features/protected/pages/dashboard/customer/` → `.../student/`
- `src/app/(protected)/dashboard/customer/` → `.../student/`

**File rename:**
| Age | Ekhon |
|---|---|
| `sidebar/customer-sidebar.tsx` | `sidebar/student-sidebar.tsx` |
| `sidebar/customer-sidebar-nav-items.ts` | `sidebar/student-sidebar-nav-items.ts` |
| `pages/calendar/queries/use-customer-sessions.ts` | `.../use-student-sessions.ts` |
| `pages/calendar/components/customer-calendar.tsx` | `.../student-calendar.tsx` |

**Identifier rename:**
`CustomerSidebar`→`StudentSidebar` · `CustomerSidebarNavItems`→`StudentSidebarNavItems` ·
`useCustomerSessions`→`useStudentSessions` · `CustomerSession`→`StudentSession` ·
`CustomerCalendar`→`StudentCalendar` · `CustomerDashboardLayout`→`StudentDashboardLayout` ·
`CustomerDashboardIndex`→`StudentDashboardIndex` · `CUSTOMER_SESSIONS_QUERY_KEY`→`STUDENT_SESSIONS_QUERY_KEY` ·
`MOCK_CUSTOMER_SESSIONS`→`MOCK_STUDENT_SESSIONS`

**Query key value:**
`"customer-sessions"`→`"student-sessions"` · `"customer-my-packages"`→`"student-packages"` ·
`"customer-invoices"`→`"student-invoices"`

**URL:** `/dashboard/customer/*` → `/dashboard/student/*` (nav items 4ta, overview card link 3ta)

**Placeholder URL:** `/api/customer/*` → `/api/student/*` — eigula ekhono **bhul**, Step 3/4/5-e
real path (`/student/packages/`, `/student/invoices/`, `/student/sessions/`) boshbe.

**Verify:** `grep -ri customer src/` → dashboard-e kichu nai (shudhu privacy/terms-er legal
text-e word hisebe ache, oigula ichchhe kore rakha) · `npm run typecheck` → clean

**Ja change hoy nai:** kono mock data, kono API call, kono UI — shudhu naming.

---

#### Step 1 — Types + `request.getBlob` · 2026-09-12 · ✅

**Notun file:**

`src/types/api-response.type.ts` — **plan-e chhilo na, kintu add korlam.** Envelope
shape ta puro backend-er common (admin-eo lagbe), tai student folder-e na rekhe global
korlam. Ache: `ApiResponse`, `ListResponse<T>`, `PaginatedResponse<T>`, `ApiErrorResponse`.

`src/features/protected/pages/dashboard/student/types/student.types.ts` — student-er shob type:

| Group | Ki ache |
|---|---|
| Enum | `SessionStatus` (`scheduled`/`completed`/`no_show`/`cancelled`/`rescheduled`), `SpanishLevel` |
| Entity | `StudentInvoice`, `StudentPackage`, `PackageSnapshot`, `StudentSession`, `StudentProfile` |
| Response | `StudentDashboardResponse`, `StudentPackagesResponse`, `StudentInvoicesResponse`, `StudentSessionsResponse`, `StudentProfileResponse`, `BookSessionResponse`, `RescheduleSessionResponse`, `CancelSessionResponse` |
| Payload | `BookSessionPayload`, `RescheduleSessionPayload`, `UpdateStudentProfilePayload` |
| Public | `TeacherSlot`, `TeacherSlotDay`, `TeacherSlotsResponse` (Step 6/7-e lagbe) |

**Modified:** [request.ts](../../src/lib/http/request.ts) — `getBlob(url): Promise<Blob>`
add kora holo (`responseType: "blob"`), Step 4-er invoice PDF er jonno.

**Khyal rakhar moto:**
- `amount`, `price`, `amount_paid` — shob **decimal string** (`"12.00"`), number na. Render
  ba calculate korar age parse lagbe.
- `DashboardNextSession` ar book/reschedule er `session` — full `StudentSession` na, chhoto
  subset. Tai `Pick<>` diye derive kora, jate backend bodlale ek jaygay thik korlei hoy.
- `start_local` ache mane frontend-e nijer theke timezone convert kora **jabe na**.

**Ja change hoy nai:** kono query hook, kono component, kono mock — ekhono kono API call hoy nai.

---

#### Step 2 — Dashboard overview · 2026-09-12 · ✅

**Ei step theke asol API call shuru.** `/student/dashboard/` ekhon live.

**Notun file:**
- `pages/overview/queries/use-student-dashboard.ts` — `STUDENT_DASHBOARD_QUERY_KEY = "student-dashboard"`, `useFetchData<StudentDashboardResponse>`
- `pages/overview/components/next-class-card.tsx` — next class card + `next_session === null` hole empty state ("Book one from your packages" CTA shoho)
- `student/utils/format-local-datetime.ts` — **plan-e chhilo na, kintu lagse** (niche dekho keno)

**Modified:**
- `pages/overview/index.tsx` — `"use client"` hoye geche (hook lage), `AsyncStateWrapper` diye
  loading/error, hardcoded stat gula real data theke compute hocche

**Hardcoded → real:**
| Card | Age (miththa) | Ekhon |
|---|---|---|
| Invoices | "3 Paid, 1 Pending" | `recent_invoices.length` → "N recent" |
| Packages | "2 Active, 2 Completed" | `packages.filter(can_book).length` + total `classes_remaining` |
| Calendar | "5 Upcoming this month" | `next_session` ache kina |

Invoice-e "Paid/Pending" badge bad dilam — **backend invoice list-e `payment_status` field-i nai**,
tai oi number ta banano chhara upay chhilo na.

**⚠️ Timezone — important:**
`start_local` te `new Date().toLocaleString()` chalale browser-er zone-e **abar convert** hoye
vul shomoy dekhato. Tai `format-local-datetime.ts` util banalam ja ISO string-er naive part
(offset-er age tuku) direct pore. Step 5/6-eo ei util-i use hobe.

**Verify:** `npm run typecheck` clean · `eslint` ei step-er file gulo te clean

**Ager theke thaka 2 ta issue (ami banai ni, porer step-e thik hobe):**
- `package-card.tsx:32` — eslint **error**: render-e `Date.now()` (impure). Step 3-e ei file
  rewrite hobe, ar backend `is_expired` computed diye dey, tai `Date.now()` lagbei na
- `student-calendar.tsx:307,312` — 2 ta unused-expression warning. Step 5-e dekhbo

---

#### Step 3 — My Packages · 2026-09-12 · ✅

**Modified:**
- `queries/use-my-packages.ts` — **mock puro delete**, real `GET /student/packages/`.
  Query key value `"customer-my-packages"` → `"student-packages"`. Return type ekhon
  `StudentPackagesResponse` (envelope), tai component-e `data?.results`.
- `components/package-card.tsx` — notun field-e map, `"use client"` add
- `index.tsx` — `AsyncStateWrapper` boshlo, `data?.results` pore, active/past split ekhon
  `can_book` diye (age `isActive` chhilo)

**Field mapping (Step 1-er table onujayi):**
| Age | Ekhon |
|---|---|
| `name` | `package_title` |
| `classesTotal` / `classesUsed` | `classes_total` / `classes_used` |
| computed `remaining` | `classes_remaining` (backend computed) |
| computed `pct` | `progress_percent` (backend computed) |
| `expiryDate` | `expires_at` |
| computed `isExpired` | `is_expired` (backend computed) |
| `isActive` | `can_book` |
| `purchaseDate` | `paid_at` (fallback `created_at`) |

**`teacher` field bad dite holo** — backend package-e teacher bandhe na (ek package-er
different class different teacher-er kachhe newa jay). Tar jaygay `amount_paid` + currency
dekhachhi.

**Notun ja dekhano hocche:** `invoice.number`, `payment_status` badge (unpaid hole),
`package_data.is_first_lesson` badge.

**Ager eslint error ta chole geche** — `package-card.tsx` e `Date.now()` diye "days left"
hisheb hocchilo (impure in render). Backend `is_expired` computed diye dey, tai oi tile ta
bad diye shudhu expiry date + expired styling rakhlam. Ekhon lint clean.

**`can_book` hole "Book a class" button ache kintu `disabled`** — `TODO(Step 7)` comment
shoho. Step 7-e booking flow toiri hole enable hobe.

**Verify:** `typecheck` clean · `eslint` my-packages folder clean
· mock baki ache shudhu invoices (Step 4) ar calendar (Step 5)-e

---

#### Step 4 — Invoices + PDF · 2026-09-12 · ✅

**Deleted:**
- `components/invoice-pdf.ts` — **eta nokol PDF chhilo.** Browser-e HTML likhe
  `window.print()` marto, asol PDF na. Backend weasyprint diye real PDF dey, tai bad.

**Notun file:**
- `queries/use-download-invoice.ts` — `GET /student/invoices/:id/pdf/` theke blob
  niye browser diye save koray. `useMutationHandler` use kore, tai error toast + `isPending` free.

**Modified:**
- `queries/use-invoices.ts` — mock delete, real call. **Kono param ney na ekhon.**
- `components/invoices-column.tsx` — notun field, `DownloadPdfButton` (per-row spinner shoho)
- `components/invoices-table.tsx` — search ekhon client-side, pagination + status filter bad

**Backend-e ja nai, tai UI theke bad dite holo:**
| Ja chhilo | Keno bad |
|---|---|
| Status column (Paid/Pending/Failed) | invoice response-e `payment_status` field-i **nai** |
| Status filter dropdown | oi field na thakle filter korar kichhu nai |
| `<Pagination>` | endpoint `count`/pagination dey na, puro list ek shathe ashe |
| Server-side search | endpoint kono query param ney na |

**Search rakhlam kintu client-side** — puro list ek shathei ashe, ar ek student-er invoice
beshi hobe na, tai `useMemo` diye filter. Fake API param pathanor cheye eta shot.

**Field mapping:** `invoiceNumber`→`number` · `date`→`issued_at` · `package`→`package_title`
· `amount` ekhon **decimal string**, tai `toFixed()` bad diye `{amount} {currency}` dekhachhi
(age `amount.toFixed(2)` chhilo — string-e crash korto)

**Ekta design note:** download ta `mutationFn`-er bhitorei kora hoy, karon
`useMutationHandler`-er `onSuccess` shudhu `data` pay, `variables` pay na — ar filename-e
invoice `number` ta lage.

**Verify:** `typecheck` clean · `eslint` invoices folder clean

---

#### Step 5 — Sessions / Calendar · 2026-09-12 · ✅

**Shesh mock ta delete holo — student feature ekhon puro real API-te.**

**Modified:**
- `queries/use-student-sessions.ts` — mock + local `StudentSession` type delete,
  shared type use kore. Param ekhon `filter`/`p`/`page_size` (age `startDate`/`endDate` chhilo)
- `components/student-calendar.tsx` — puro field remap + 3 ta bug fix

**Boro mismatch: backend date-range filter dey na.**
Calendar month/week grid date range chay, kintu endpoint shudhu `upcoming`/`past`/`all` +
pagination dey. Tai `filter=all&page_size=200` diye ene client-side e date onujayi bhag kora
hoy. `count > results.length` hole upore ekta line dekhay ("Showing the most recent N of M"),
jate chupchap data harano na jay.

**Field mapping:** `teacher.name`→`teacher_name` · `date`+`timeUtc`→`start_local` ·
`duration`→`duration_minutes` · `meetingLink`→`meet_link` · `package`→`package_title`

**Status value bodleche:** `upcoming`→`scheduled` · `no-show`→`no_show` · notun `cancelled`
add (legend + color + badge shob jaygay)

**3 ta bug fix hoyeche:**

1. **Timezone vul chhilo (boro ta).** Age `Intl.DateTimeFormat().resolvedOptions().timeZone`
   diye **browser-er** zone dhore UTC theke convert korto. Kintu shotto utsho student-er
   **profile-er** timezone, ja backend `timezone` field-e dey ar `start_local`-e already
   apply kora thake. Student jodi onno zone-er device theke dekhto, vul shomoy dekhto.
   Ekhon `start_local` direct render hoy, label-o API-r `timezone` theke.

2. **"Today" highlight ek din age/pore hote parto.** `formatIso()` `toISOString()` use korto
   ja **UTC** date dey — UTC-5 e raat 8tay UTC date already porer din. Notun `localIso()`
   local date part theke banay.

3. **2 ta purono eslint warning** (line 307, 312) — `cond ? a() : b()` statement hisebe
   chhilo, `if/else` kore dilam.

**Verify:** `typecheck` clean · **puro `student/` folder eslint clean** (ager 1 error + 2
warning shob gone) · `grep MOCK_|enabled: false|/api/student/` → kichu nai

**Ekhon je endpoint gula live:** `/student/dashboard/` · `/student/packages/` ·
`/student/invoices/` · `/student/invoices/:id/pdf/` · `/student/sessions/`

---

#### Step 6 — Cancel + Reschedule · 2026-09-12 · ✅

**Ei step-e prothom mutation (ekhon porjonto shob read chhilo).**

**Notun file:**
- `student/queries/use-teacher-slots.ts` — **page-er bahire, `student/queries/`-e rakhlam**,
  karon Step 7-er booking flow-eo lagbe
- `pages/calendar/queries/use-session-actions.ts` — `useCancelSession` + `useRescheduleSession`
- `pages/calendar/components/session-actions.tsx` — `SessionActions` (cancel + reschedule
  trigger) ar `ReschedulePanel` (slot picker)

**Modified:**
- `components/student-calendar.tsx` — `SessionDot` ekhon `details` / `reschedule` mode swap kore

**Nested dialog eriye gelam.** Session detail already ekta `AppDialog`-er bhitore; tar bhitore
arekta dialog dile Radix-e focus problem hoy. Tai ek-i dialog-er content swap kora hoy
(`mode` state), ar cancel-er confirm-o inline (alada AlertDialog na).

**Gating — backend rule onujayi:**
| Rule | Ki kora holo |
|---|---|
| Shudhu `scheduled` class-e action chole | `status !== "scheduled"` hole `SessionActions` render-i hoy na |
| `can_reschedule: false` = 24 ghontar bhitore | Reschedule button `disabled` + `title`-e karon |
| Cutoff-er bhitore cancel korle class **nosto** hoy | Confirm text-e sposhto lekha — "this class will be lost" |

**Toast message backend theke ashe.** `showSuccessToast: false` kore `onSuccess`-e
`data.message` toast kori — karon backend nijei bole class ferot elo (`class_returned: true`)
naki nosto holo. Static string diye eta bola jeto na.

**`invalidateKeys` alada:**
- Cancel → sessions + **packages** + dashboard (class ferot ashte pare, tai package bashi)
- Reschedule → sessions + dashboard shudhu (**extra class kate na**, package bodlay na)

**Slot picker:** date input (default: ekhonkar class-er date) → `days=7` er slot,
`tz` student-er timezone theke. Selected slot-er `start_utc` **hubohu** payload-e jay.

**⚠️ Ja kori nai:** reschedule-e **teacher bodlanor option nai** — ekhon ek-i teacher thake.
Payload-e `teacher` field optional hisebe support ache, kintu teacher list-er hook
(`use-public-teachers.ts`) Step 7-e ashbe. Tokhon ei panel-e jog kora jabe.

**Verify:** `typecheck` clean · `eslint` student folder clean

---

#### Step 7 — Book a class · 2026-09-12 · ✅

**Notun file:**
- `student/queries/use-public-teachers.ts` — `GET /public/teachers/`
- `pages/book-class/schemas/book-session.schema.ts` — `BookSessionSchema`
- `pages/book-class/queries/use-book-session.ts` — `POST /student/sessions/`
- `pages/book-class/components/step-package.tsx` · `step-teacher.tsx` · `step-slot.tsx`
- `pages/book-class/index.tsx` — 3-step orchestration
- `app/(protected)/dashboard/student/book-class/page.tsx` — **`<Suspense>` mora**
  (`useSearchParams()` use hoy, na hole build-e error)

**Modified:**
- `sidebar/student-sidebar-nav-items.ts` — "Book a Class" nav item add
- `pages/my-packages/components/package-card.tsx` — Step 3-er **disabled button ekhon live**,
  `?package=<id>` diye package preselect kore
- `types/student.types.ts` — `PublicTeacher`, `TeacherAvailabilityRule` add
- `pages/calendar/components/session-actions.tsx` — reschedule-e teacher bodlanor option
  (Step 6-e ja baki rekhechilam)

**⚠️ `/public/teachers/` bare array dey, envelope na.** Baki shob student endpoint
`{ success, results }` dey, kintu eta shoja `[...]`. Tai return type `PublicTeacher[]`,
ar component-e `data ?? []` (`data?.results` **na**). Type-e comment diye rakha ache.

**Flow:** package (shudhu `can_book` wala) → teacher → slot → confirm.
Ager step-e fire jawa jay, shamner step-e lafano jay na.

**Schema use kora holo, kintu `useZodTanstackForm` na.** Eta text-input form na — tinta
selection. Tai local state + submit-er age `BookSessionSchema.safeParse()`, ar error gula
`SubmitErrorSummary`-te dekhano hoy (ek-i `SubmitErrorItem` shape). `multi-step-form-wrapper`
use kori nai — oita react-hook-form based, project-er baki form tanstack-form.

**`start_utc` hubohu jay** — slot button theke ja pai tai `start_datetime` e boshe. Kono
convert/rebuild kora hoy na, backend eta re-validate kore.

**`invalidateKeys`:** sessions + packages + dashboard (booking ekta class kate, tai package bashi)

**Reschedule-e teacher change (Step 6-er baki kaj):** default ekhonkar teacher; bodlale
slot list-o notun teacher-er onujayi refetch hoy, ar payload-e `teacher` jay. **Na bodlale
field ta pathanoi hoy na** — backend tokhon purono teacher rakhe.

**Verify:** `typecheck` clean · `eslint` student + app route clean

---

#### Step 8 — Profile · 2026-09-12 · ✅

**Ei prothom asol `useZodTanstackForm` use holo** (Step 7-er booking selection-based chhilo).

**Notun file:**
- `pages/profile/schemas/student-profile.schema.ts` — `StudentProfileSchema` + level options
- `pages/profile/queries/use-student-profile.ts` — GET + PATCH
- `pages/profile/components/profile-form.tsx` — `useZodTanstackForm` + `FormFieldWrapper`
  + `ReusableSelect` + `SubmitErrorSummary` + `SubmitButton`
- `pages/profile/index.tsx`
- `app/(protected)/dashboard/student/profile/page.tsx`

**Modified:** `sidebar/student-sidebar-nav-items.ts` — "My Profile" add

**Read-only field gula form-e nai** — `email` ar `active` upore ekta box-e dekhano hoy,
edit kora jay na (backend-eo read-only). `id` dekhanoi hoy na.

**`defaultValues` timing:** `useZodTanstackForm` mount-er shomoy default ney, pore data
elei update hoy na. Tai `index.tsx` data asar **por-i** `<ProfileForm>` mount kore.

**Timezone select:** `Intl.supportedValuesOf("timeZone")` theke puro IANA list, purono
browser hole chhoto fallback. Free-text dile ochena zone-e backend 400 dito.

**`invalidateKeys`-e sessions + dashboard-o ache** — timezone bodlale `start_local` bodle
jay, tai oi duto cache bashi hoye jay.

---

### ⚠️ Dui ta blocker paoa gelo (backend-er kaj)

**1. Student profile image upload kora jabe na.**
`me.bru` bole `profile_img_url` e `POST /administrator/upload/` er URL boshate — kintu oita
**admin-only** (`/administrator/` prefix, admin bearer). Student-er token-e 403 khabe.
Tai file picker (`SingleFileUploader`) na diye **URL text input** dilam, shathe note:
"Direct upload is not available yet". Backend-e student-er jonno upload route ele
`SingleFileUploader` boshiye dile hobe.

**2. `uploadSingleFile` service ta bhanga** — ei step-e byabohar kori nai, kintu chokhe porlo:
`src/services/upload-file.service.ts` `POST /upload-file/` e pathay ar `res.stored_path`
pore. Asol endpoint `/administrator/upload/`, ar response key `url`
(`{ success, url, filename, size }`). **Admin integration-er age eta thik korte hobe.**

**Arekta chhoto jinis:** `src/app/(protected)/profile/` e ekta purono page ache ja puro
hardcoded fake data ("Sarah Johnson"). Shared `user-menu-popover` ar `app-sidebar-footer`
theke `/profile` e link ache (admin-o use kore), tai hat dei nai — student-er asol profile
`/dashboard/student/profile`. Oi purono page ta admin phase-e dekhte hobe.

---

#### Step 9 — Final pass · 2026-09-12 · ✅

**Verify kora holo:**

| Check | Result |
|---|---|
| `grep MOCK_ \| enabled: false \| initialData \| /api/student` | ✅ kichu nai |
| `grep -i customer` (student folder + route) | ✅ kichu nai |
| `npm run typecheck` | ✅ clean |
| `eslint` (student feature + app route) | ✅ clean |
| Plan-er 11 ta endpoint | ✅ shob 11 ta wired |
| Loading/error state | ✅ shob page-e (invoices `<DataTable loading error />` diye) |

**11 ta endpoint, kothay:**
| Endpoint | File |
|---|---|
| GET `/student/dashboard/` | `overview/queries/use-student-dashboard.ts` |
| GET `/student/packages/` | `my-packages/queries/use-my-packages.ts` |
| GET `/student/invoices/` | `invoices/queries/use-invoices.ts` |
| GET `/student/invoices/:id/pdf/` | `invoices/queries/use-download-invoice.ts` |
| GET `/student/sessions/` | `calendar/queries/use-student-sessions.ts` |
| POST `/student/sessions/` | `book-class/queries/use-book-session.ts` |
| POST `/student/sessions/:id/cancel/` | `calendar/queries/use-session-actions.ts` |
| POST `/student/sessions/:id/reschedule/` | `calendar/queries/use-session-actions.ts` |
| GET + PATCH `/student/me/` | `profile/queries/use-student-profile.ts` |
| GET `/public/teachers/` | `student/queries/use-public-teachers.ts` |
| GET `/public/teachers/:id/slots/` | `student/queries/use-teacher-slots.ts` |

**✅ `npm run build` clean — 48/48 page generate hoy**, student-er 6 ta route shoho
(`/dashboard/student`, `/book-class`, `/calendar`, `/invoices`, `/my-packages`, `/profile`
— shob `ƒ Dynamic`, jemon hoya uchit).

> **Songshodhon:** ei section-e prothome likhechilam "build-e project-wide prerender error
> ache". **Sheta bhul chhilo — amar nijer bhul command-er jonno.** Ami
> `npx dotenv -e .env -- next build` chalacchilam, ja `.env`-er `NODE_ENV=development`
> build process-e dhukiye dito. Tate Next dev/prod mishiye build korto ar React-er
> internals null hoye `TypeError: Cannot read properties of null (reading 'use')` dito.
> `.env`-er oi line-tar pashei comment ache: *"remove this line in production"*.
>
> **Thik command `npm run build`** (mane `next build --turbopack`, dotenv chhara) — tate
> Next nije `NODE_ENV=production` set kore ar `.env` thik moto pore. Ei command-e build
> shob shomoy-i pass korto.
>
> Shikha: build-e **project-er nijer script** (`npm run build`) use korte hobe, nijer kore
> banano command na. `dev`/`start` script dotenv use kore, `build` **ichchhe kore kore na**.
