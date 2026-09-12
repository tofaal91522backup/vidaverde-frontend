# Admin Dashboard — API Integration Plan

> **Ei file ta live progress tracker.** Proti step sesh howar por "Progress Log" section
> update hobe. Onno kono AI/dev ei file porei bujhte parbe ki hoyeche ar next ki.

- **Scope:** shudhu Admin dashboard — student ([STUDENT_API_INTEGRATION.md](STUDENT_API_INTEGRATION.md)) shesh, marketing baki
- **Backend commit:** `f7ccf8b` ([docs/bruno/administrator/](../bruno/administrator/))
- **Started:** 2026-09-12
- **Current step:** ✅ **All admin API integration steps complete**

---

## Ground rules (student plan-er moto-i)

1. **Project convention mante hobe** — [CLAUDE.md](../../CLAUDE.md) er structure, naming, pattern
2. **Notun kichu banabo na jodi already thake** — shared component reuse
3. **Ek step-e ek jinis** — "next" bolle porer step, ager gula te hat dibo na
4. **Proti step sesh-e ei MD update** — ki file, ki bodlalo, keno
5. **Mock step-wise jabe** — je part integrate hocche shudhu setar

---

## Student kaj theke ja ready ache (reuse hobe)

| Jinis | File |
|---|---|
| Envelope types | [api-response.type.ts](../../src/types/api-response.type.ts) — `ApiResponse`, `ListResponse<T>`, `PaginatedResponse<T>` |
| Blob download | `request.getBlob()` — CSV export-e lagbe |
| File upload | [upload-file.service.ts](../../src/services/upload-file.service.ts) — **thik kora hoyeche**, `SingleFileUploader`/`MultiFileUploader` ekhon kaj korbe |
| Table pattern | admin `packages` module already ei shape-e |

⚠️ **`format-local-datetime.ts` admin-e shoja use kora jabe na.** Oita `start_local`
dhore banano. Admin session response-e `start_local` **nai** — shudhu `start_datetime`
(school time, America/Guayaquil). Admin-er jonno alada helper lagbe (Step 0).

---

## ⚠️ Shobcheye boro fada: admin response envelope **ek rokom na**

Student-e prai shob `{ success, results }` chhilo. Admin-e proti endpoint alada —
**proti ta te bru file dekhe type korte hobe**, dhore neওয়া jabe na.

| Endpoint | Response shape |
|---|---|
| `POST /administrator/teachers/` | `{ success, teacher: {...} }` |
| `POST /administrator/packages/` | **bare object** — `{ id, title_en, ... }` |
| `POST /administrator/testimonials/` | **bare object** |
| `POST /administrator/admins/` | `{ success, admin: {...} }` |
| `POST /administrator/teachers/:id/time-off/` | `{ success, time_off: {...} }` |
| `PATCH /administrator/contact-messages/:id/` | `{ success, message_detail: {...} }` |
| `GET /administrator/sessions/calendar/` | `{ success, timezone, events: [...] }` |
| `GET` list gula (students, sessions, bookings, leads, emails) | paginated, **`success` key nai** |
| `GET /administrator/upload/` | `{ success, url, filename, size }` |

---

## Existing mock vs real — boro mismatch

### Teachers — form puro notun kore likhte hobe
| Mock | Real |
|---|---|
| `bio` | `description_en` + `description_es` |
| `photo` | `profile_img_url` |
| `specialisations[]` | `tags[]` |
| `isActive` | `active` (+ alada `accepting_students`) |
| `schedule: { monday: ["09:00","10:00"] }` | `availability: [{ day: "mon", start: "08:00", end: "16:00" }]` |
| — | `institute`, `google_calendar_id`, `meet_link`, `time_off[]` |

**`schedule` → `availability` shape ekdom alada** — mock-e time slot-er list, real-e
time **range**. Form-er oi part ta notun kore banate hobe.

### Bookings — puro bhul model
Mock-e `booking` mane ekta class booking (`student`, `teacher`, `date`, `time`,
`status: pending|confirmed|cancelled`). **Backend-e "booking" mane ekta purchase** —
`package_title`, `amount_paid`, `payment_status: pending|paid|failed|refunded`,
`classes_total/used/remaining`, `invoice{}`. **Teacher/date/time nai-i.**
→ Column, filter, type — shob notun kore.

### Blogs
| Mock | Real |
|---|---|
| `title` | `title_en` + `title_es` |
| `content` | `body_en` + `body_es` (rich HTML) |
| `excerpt` | `excerpt_en` + `excerpt_es` |
| `image` (single) | `image_urls[]` (list, prothom ta thumbnail) |
| `category` (free text) | **enum**: `spanish_learning_tips`, `ecuador_travel`, `school_news`, `student_stories`, `culture_and_language` |
| — | `slug`, `meta_title`, `meta_description`; read-only `reading_time`, `author` |

### Packages
| Mock | Real |
|---|---|
| `name` | `title_en` + `title_es` |
| `price: number` | `price: **string**` ("250.00") |
| `classesCount` | `total_classes` |
| `validityDays` | `validity_days` |
| `isActive` | `active` |
| — | `description_en/es`, `image_url`, `is_first_lesson`, `sort_order` |

### Sessions
| Mock | Real |
|---|---|
| `student:{}`, `teacher:{}` | flat — `student_name`, `student_email`, `teacher_name`, `teacher` (uuid) |
| `date` + `time` | `start_datetime` + `end_datetime` (**school time**, `start_local` nai) |
| `duration` | `duration_minutes` |
| `status: upcoming\|no-show` | `scheduled\|completed\|no_show\|cancelled\|rescheduled` |
| `adminNotes` | `admin_notes` |

PATCH-e **shudhu `status` ar `admin_notes`** lekha jay — time/teacher bodlate hole
reschedule endpoint.

### Calendar
Mock flat session list chay. Real dey **calendar-ready events**:
`{ id, title, start, end, status, teacher_id, teacher_name, student_name, meet_link, color }`
— `color` backend-i teacher onujayi fixed palette theke dey, tai frontend-e rong banano lagbe na.

---

## Endpoints (17 ta)

| # | Method | Path | Screen | Ekhon ache? |
|---|---|---|---|---|
| 1 | GET | `/administrator/dashboard/summary/` | Overview | screen ache, mock |
| 2 | GET/POST | `/administrator/teachers/` (+ `:id/` GET/PATCH/DELETE) | Teachers | screen ache, mock |
| 3 | GET/POST | `/administrator/teachers/:id/time-off/` (+ `/time-off/:id/`) | Teacher detail | **screen nai** |
| 4 | GET/POST | `/administrator/packages/` (+ `:id/`) | Packages | screen ache, mock |
| 5 | GET/POST | `/administrator/blogs/` (+ `:id/`) | Blogs | screen ache, mock |
| 6 | GET | `/administrator/sessions/` | Sessions | screen ache, mock |
| 7 | PATCH | `/administrator/sessions/:id/` | Sessions | screen ache, mock |
| 8 | GET | `/administrator/sessions/calendar/` | Calendar | screen ache, mock |
| 9 | GET | `/administrator/bookings/` | Bookings | screen ache, mock |
| 10 | GET | `/administrator/bookings/export/` | Bookings (CSV) | **nai** |
| 11 | GET | `/administrator/students/` (+ `:id/`) | Students | **screen nai** |
| 12 | GET/POST | `/administrator/testimonials/` (+ `:id/`) | Testimonials | **screen nai** |
| 13 | GET/PATCH | `/administrator/contact-messages/` (+ `:id/`) | Contact | **screen nai** |
| 14 | GET | `/administrator/leads/` (+ `/export/`) | Leads | **screen nai** |
| 15 | GET | `/administrator/emails/` | Email outbox | **screen nai** |
| 16 | GET/POST | `/administrator/admins/` (+ `:id/`) | Admins (**master only**) | **screen nai** |
| 17 | POST | `/administrator/upload/` | shob form | ✅ ready |

---

## STEPS

### Step 0 — Admin types + setup
- `dashboard/admin/types/admin.types.ts` — shob entity + response type (envelope proti ta alada!)
- `dashboard/admin/utils/format-school-datetime.ts` — admin time helper
  (`start_local` nai, school time dekhate hobe)
- Sidebar nav audit — kon kon item lagbe thik kora
- **Master/manager role gating er obostha dekha** (niche "Blocker" dekho)

### Step 1 — Dashboard Overview → `GET /administrator/dashboard/summary/`
- `overview/queries/use-admin-dashboard.ts`
- `overview/index.tsx` — hardcoded number gula real `cards` diye
  (students, teachers, sessions_upcoming/today, bookings_30d, revenue_30d, leads, contact_unhandled, blogs_draft, emails_pending/failed)
- `sessions_by_status` + `upcoming_sessions` dekhano
- `emails_failed > 0` hole alert (backend doc-e bola ache surface korte)

### Step 2 — Teachers → `/administrator/teachers/`
- Mock delete, list + create + edit + deactivate
- **`availability` editor notun kore** — day × start/end range (mock-er slot list na)
- `SingleFileUploader` diye `profile_img_url`
- `tags[]` chip input
- `description_en` / `description_es` (bilingual)
- DELETE = deactivate (row thake)

### Step 3 — Teacher time-off → `/administrator/teachers/:id/time-off/`
- Teacher edit page-e ekta section
- List + add (start/end datetime + reason) + delete
- Note: already-booked class cancel hoy na — UI te bole dite hobe

### Step 4 — Packages → `/administrator/packages/`
- Mock delete; `price` **string** handle, bilingual title/description
- `is_first_lesson` toggle (shudhu ekta package-e thaka uchit — warn kora jete pare)
- `sort_order`, `image_url`
- Not paginated

### Step 5 — Blogs → `/administrator/blogs/`
- Bilingual title/excerpt/body; body-te `RichTextEditor`/`TipTapTextEditor`
- `image_urls[]` → `MultiFileUploader`
- `category` enum select; `status` draft/published
- SEO: `meta_title`, `meta_description`
- `slug` optional (na dile auto), `reading_time`/`author` read-only
- **DELETE ekhane sotti delete kore**

### Step 6 — Sessions → `GET` + `PATCH /administrator/sessions/:id/`
- Filter: `filter` (upcoming/past), `teacher`, `status`, `from`, `to`
- Status + admin notes update (shudhu ei duto lekha jay)
- Notun status value (`no_show`, `cancelled`)

### Step 7 — Calendar → `GET /administrator/sessions/calendar/`
- `events[]` shape-e adapt, backend-er `color` use kore teacher-wise rong
- `from`/`to` month/week onujayi, `teacher` + `status` filter
- Event click → detail (`/administrator/sessions/:id/`)

### Step 8 — Bookings → `/administrator/bookings/` + CSV export
- **Type puro notun** (purchase, class booking na)
- Filter: `payment_status`, `teacher`, `from`, `to`, `search` (email)
- "Export CSV" button → `request.getBlob()` diye `/bookings/export/`

### Step 9 — Students → `/administrator/students/` (notun screen)
- List + search + pagination
- Detail page: profile + package + session (read-only, admin edit kore na)

### Step 10 — Testimonials → `/administrator/testimonials/` (notun screen)
- List + create/edit/delete, `photo_url` upload, `rating`, `sort_order`, `active`
- Bilingual `outcome_en/es`

### Step 11 — Contact messages → `/administrator/contact-messages/` (notun screen)
- List + `handled` / `subject` filter
- PATCH: `handled` toggle + `admin_notes` (baki shob read-only)

### Step 12 — Leads → `/administrator/leads/` (notun screen)
- Read-only list + `subscribed`/`converted`/`search` filter
- CSV export (`/leads/export/`)
- `nurture_stage` dekhano

### Step 13 — Email outbox → `/administrator/emails/` (notun screen)
- Read-only list + `status` filter
- `failed` row-e `error` dekhano, `attempts`

### Step 14 — Admins → `/administrator/admins/` (notun screen, **master only**)
- List + create + edit + deactivate
- ⚠️ `password_txt` clear-text pathay — **shudhu master-ke, ar kothao leak kora jabe na**
- Manager ei screen dekhbe na (role gating — Step 0-er blocker dekho)

### Step 15 — Final pass
- Mock baki ache kina, loading/error state, `npm run build` (**dotenv chhara!**)

---

## Known blockers / age theke thaka jinish

### ⚠️ Master vs manager role — session-e nai
`admins/` endpoint shudhu **master** admin-er jonno. Kintu login response-e
`role: "ADMIN"` ar sub-role (`master`/`manager`) ache `profile.role` e —
ar [sign-in.action.ts](../../src/features/auth/pages/signin/actions/sign-in.action.ts)
session-e shudhu `data.role` rakhe, `profile` rakhe na.
→ **Step 14-er age** session-e `profile.role` rakhte hobe, na hole master-only UI gate kora jabe na.

### Auth / routing (student plan theke, ekhono baki)
- Login-er por redirect nai
- Route guard nai — `src/proxy.ts` khali stub (`export async function proxy() {}`)
- Cookie `secure: true` hardcoded — local http dev-e session boshte nao pare

### Build
- Build **shob shomoy `npm run build`** diye. `dotenv -e .env` diye chalale
  `.env`-er `NODE_ENV=development` dhuke prerender bhenge jay (project-er bug na)

---

## Progress Log

| Step | Status | Date | Ki hoyeche |
|---|---|---|---|
| 0. Types + setup | ✅ Done | 2026-09-12 | `admin.types.ts`, shared domain enum, school-time helper, sidebar audit |
| 1. Dashboard summary | ✅ Done | 2026-09-12 | Prothom admin API. 12 ta hardcoded number → real, failed-email alert |
| 2. Teachers | ✅ Done | 2026-09-12 | Shobcheye boro rewrite. `availability` shape bodlano, slot-grid delete |
| 3. Teacher time-off | ✅ Done | 2026-09-12 | Notun section teacher edit page-e, school-offset converter |
| 4. Packages | ✅ Done | 2026-09-12 | Mock delete, `price` string handle, bilingual field |
| 5. Blogs | ✅ Done | 2026-09-12 | Bilingual body/excerpt, category enum, `image_urls[]`, real DELETE |
| 13. Email outbox | ✅ Done | 2026-09-12 | Read-only paginated outbox, status filter, failed-delivery error and attempt count |
| 14. Admins | ✅ Done | 2026-09-12 | Master-only list/create/edit/deactivate, session sub-role and server/sidebar gates; passwords never displayed |
| 15. Final pass | ✅ Done | 2026-09-12 | Admin mock audit clean; all list/detail/calendar loading and error states present; `npm run build` passed |
| 6. Sessions | ✅ Done | 2026-09-12 | Real filter (teacher/status/date), notun status value, fake search bad |
| 7. Calendar | ✅ Done | 2026-09-12 | `events[]` shape, backend-er teacher color, filter repaint bug fix |
| 8. Bookings + CSV | ✅ Done | 2026-09-12 | Type puro notun (purchase), asol streaming CSV export |
| 9. Students | ✅ Done | 2026-09-12 | Prothom ekdom notun screen — list + detail |
| 10. Testimonials | ✅ Done | 2026-09-12 | Notun screen — list + create/edit, hide vs delete alada |
| 11. Contact messages | ✅ Done | 2026-09-12 | Notun screen — read dialog, handled toggle, internal note |
| 12. Leads | ✅ Done | 2026-09-12 | Notun screen — read-only list + filter + CSV export |
| 13. Email outbox | ⬜ Not started | — | — |
| 14. Admins (master) | ⬜ Not started | — | — |
| 15. Final pass | ⬜ Not started | — | — |

**Next:** Step 13 — Email outbox → `/administrator/emails/` (notun screen)

### Detailed log

#### Step 0 — Types + setup · 2026-09-12 · ✅

**Notun file:**

| File | Ki |
|---|---|
| `src/types/domain.type.ts` | `SessionStatus`, `SpanishLevel`, `WeekDay` — student ar admin duitai use kore |
| `src/utils/iso-datetime.ts` | Generic ISO formatter (`isoTime`, `isoDate`, `isoDateTime`, `isoDateKey`, `localDateInput`, `todayInput`) |
| `admin/utils/format-school-datetime.ts` | Admin wrapper + `SCHOOL_TIMEZONE`, `SCHOOL_TIMEZONE_LABEL` |
| `admin/types/admin.types.ts` | Admin-er shob entity + response type |

**Modified (duita, dui tai non-breaking):**
- `student/types/student.types.ts` — `SessionStatus`/`SpanishLevel` nijer theke na likhe
  `@/types/domain.type` theke import + re-export. **Ager kono import bhange ni.**
- `student/utils/format-local-datetime.ts` — logic `@/utils/iso-datetime` e shorano,
  ekhane shudhu student-er naam diye re-export. **Export naam ek-i, kono call-site bodlay ni.**

**Keno duplicate na kore shorano:** admin-eo hubohu ek-i date logic lagbe (offset-er ager
naive part pora). Duita copy thakle ekta te bug thik korle onno tay theke jeto.

**Time — student ar admin alada:**
| | Student | Admin |
|---|---|---|
| Field | `start_local` (+ `start_datetime`) | shudhu `start_datetime` |
| Zone | student-er nijer timezone | **school time** (America/Guayaquil) |
| UI te | "Times shown in `<tz>`" | `SCHOOL_TIMEZONE_LABEL` dekhano uchit |

**Types-e ja dhora porlo:**
- Envelope proti endpoint-e alada — proti response type-er upore shape likhe rakha ache
- Paginated list gula te (`sessions`, `bookings`, `students`, `leads`, `emails`) `success`
  key **nai** — student-er theke alada
- `AdminBooking` = **purchase**, class booking na — teacher/date/time nai
- `AdminSession` e `start_local` ar `teacher_img` nai, kintu `student_email` ache
- `AdminCalendarEvent` e backend-i `color` dey (teacher onujayi fixed palette)
- `price`, `amount_paid`, `revenue_30d` — shob **decimal string**
- `password_txt` (admins) clear-text — type-e warning comment dewa ache

**⚠️ 4 tar list-shape bru te nai** (`packages`, `teachers`, `testimonials`, `admins`) —
POST bare object dey ar doc bole "not paginated", kintu GET list-er example nai. Ekhon
`ListResponse<T> | T[]` union kora ache; **Step 2/4/10/14-e asol API dekhe confirm kore
ek ta te thik korte hobe.**

**Sidebar audit** — ekhon 7 ta item ache (Dashboard, Teachers, Bookings, Sessions,
Packages, Blogs, Calendar). **6 ta lagbe:** Students, Testimonials, Contact messages,
Leads, Email outbox, Admins. Screen na banano porjonto add korchi na (404 hobe) —
proti step-e sheta-r nav item boshbe.

**🔴 Role gating blocker — confirm kora holo (Step 14-er age thik korte hobe):**
Login response-e `role: "ADMIN"` ar asol sub-role `profile.role` (`master`/`manager`).
Kintu [sign-in.action.ts](../../src/features/auth/pages/signin/actions/sign-in.action.ts)
session-e **shudhu `data.role`** rakhe, `profile` puro fele dey — ar `Session` type-eo
`profile` er jayga nai. **Ekhon session dekhe master/manager alada kora jabe na.**
→ Step 14-er age `Session` type + login action e `profile.role` jog korte hobe.
Ei step-e auth file-e hat dei ni (alada concern, student-o ei session use kore).

**Verify:** `typecheck` clean · `eslint` clean (student folder shoho — refactor kichu bhange ni)

---

#### Step 1 — Dashboard Overview · 2026-09-12 · ✅

**Prothom admin API call.** `/administrator/dashboard/summary/` live.

**Notun file:**
- `overview/queries/use-admin-dashboard.ts` — `ADMIN_DASHBOARD_QUERY_KEY = "admin-dashboard"`
- `overview/components/summary-tiles.tsx` — KPI tile + "Needs attention" row
- `overview/components/upcoming-sessions.tsx` — porer 10 ta class + status breakdown

**Modified:** `overview/index.tsx` — `"use client"`, `AsyncStateWrapper`, banano number bad

**Hardcoded → real (12 ta number):**
`students` · `teachers` · `revenue_30d` · `bookings_30d` · `leads_total` · `leads_30d` ·
`sessions_today` · `sessions_upcoming` · `contact_unhandled` · `blogs_draft` ·
`emails_pending` · `emails_failed`

**Chart banai ni — ichchhe kore.** `dataviz` skill-er niyom onujayi ekok shonkhar jonno
chart na, **stat tile**. `sessions_by_status`-o chhoto count, tai labeled badge — pie chart
hole shudhu noise barto.

**Status rong-er shathe shob shomoy icon + lekha** — "Emails failed" e `AlertTriangle` +
text, jate rong na dekhleo (ba colorblind holeo) bojha jay. Value 0 hole tile neutral hoye
jay, shudhu shudhu lal thake na.

**`emails_failed > 0` hole alada alert banner** — backend doc sposhto bole ei ta surface
korte (cron 3 bar try korar por-o pathate pare ni).

**Section card-er badge shudhu jekhane API number dey:**
| Card | Badge |
|---|---|
| Teachers | `teachers` |
| Bookings | `bookings_30d` |
| Sessions | `sessions_upcoming` + `sessions_today` |
| Blogs | `blogs_draft` |
| Calendar | `sessions_upcoming` |
| **Packages** | **badge nai** — summary response-e packages-er kono number nai |

Age Packages card-e "4 Active, 1 Inactive" lekha chhilo — pura banano. Number na thakle
badge na dewa-i shot.

**School time:** "Next classes" list-e `formatSchoolDateTime` + `SCHOOL_TIMEZONE_LABEL`
("Times in school time (America/Guayaquil)") — admin jate student-er zone bhebe bhul na kore.

**Verify:** `typecheck` clean · `eslint` overview folder clean

---

#### Step 2 — Teachers · 2026-09-12 · ✅

**Ei plan-er shobcheye boro rewrite.** Mock delete, list + create + edit + activate/deactivate live.

**Notun file:**
- `admin/utils/to-list.ts` — `toList()`, uncertain list-shape normalize kore
- `teachers/components/availability-editor.tsx` — notun weekly hours editor
- `teachers/components/tags-input.tsx` — free-text chip input

**Deleted:**
- `teachers/components/weekly-schedule-grid.tsx` — **ei shape backend-e nei-i**
  (`{ monday: ["09:00","10:00"] }` slot grid). Rekhe dile bhul bujhato.

**Modified:** `queries/use-teachers.ts` · `schemas/teacher.schema.ts` ·
`components/teacher-form.tsx` · `teachers-column.tsx` · `teachers-table.tsx` ·
`edit-teacher-page.tsx` · `hooks/use-zod-tanstack-form.ts` (`AnyMutationLike` export)

**`availability` — mul kaj.** Mock-e chhilo ghonta tick korar grid
(`{ monday: ["09:00","10:00"] }`). Backend chay **time range**-er list
(`[{ day: "mon", start: "08:00", end: "16:00" }]`). Notun editor-e proti din-e
ek ba ekadhik range add/remove kora jay. Bookable slot backend nijei ei range theke
hisheb kore (booked class + time-off bad diye), tai ghonta tick korar kichu nai.
Zod-e `start < end` ar `HH:MM` validate kora hoy — backend-e 400 khaওয়ার age-i dhora pore.

**Form-e notun field:** `institute`, `description_es` (bilingual bio),
`accepting_students` (`active` theke **alada**), `google_calendar_id`, `meet_link`.

**`tags` ekhon free-text chip** — age 10 ta hardcoded checkbox chhilo
("Business Spanish", "DELE Preparation"...), kintu backend bole free-text.
Hardcoded list-e backend-er asol tag (`beginners`, `conversation`) chhilo-i na.

**Delete button shoriye dilam.** Backend-e `DELETE` asholei deactivate kore
(row thake, karon session teacher ke `PROTECT` kore) — ar sheta "Deactivate"
button-i kore. Duita rakhle admin bhabto data mucche jacche. Toggle ekhon PATCH diye,
karon activate korte-o PATCH-i lage.

**`<Pagination>` boshai ni** — backend doc-e ei endpoint-e pagination-er ullekh nai.
List shape-o nishchit na, tai `toList()` diye normalize kora hocche (bare array ba
envelope — dui tai chole). **Asol API dekhe confirm kore ek ta te thik korte hobe.**

**Edit page-e ekta fada eriye gelam:** age `defaultValues={data}` kore puro API object
form-e dhele deওয়া hoto — `id`, `created_at`, `time_off` shoho. Sheta submit-er shomoy
backend-e chole jeto. Ekhon `toFormValues()` diye shudhu form-er field gula neওয়া hoy.

**`AnyMutationLike` export kora holo** (`use-zod-tanstack-form.ts`) — form-er `mutation`
prop type korte. Age `mutation: any` chhilo; ekhon type-safe. Purono form gula bhange ni.

**Verify:** `typecheck` clean · `eslint` admin folder clean · `npm run build` 48/48

---

#### Step 3 — Teacher time-off · 2026-09-12 · ✅

**Notun file:**
- `teachers/queries/use-teacher-time-off.ts` — list + create
- `teachers/schemas/time-off.schema.ts`
- `teachers/components/time-off-section.tsx` — list + add form + delete

**Modified:**
- `admin/utils/format-school-datetime.ts` — `toSchoolIso()` + `toDatetimeLocalValue()` add
- `teachers/edit-teacher-page.tsx` — teacher form-er niche section boshlo

**Datetime-e ekta asol shomossha chhilo.** `<input type="datetime-local">` dey
"2026-12-24T00:00" — **offset chhara**. Backend chay ISO-8601 **with offset**. Tai
`toSchoolIso()` likhlam ja school offset (`-05:00`) joriye dey. Ecuador-e DST nai,
bochor bhor UTC-5 — tai hardcode kora nirapod, ar ek jaygay ache.

**`src/utils/datetime.ts` er `toDatetimeLocal()` use kori ni** — oita `toISOString()`
use kore, mane **UTC** e convert kore dey. School time-er jonno sheta vul value dito.

**Backend-er ekta niyom UI te bole dite holo:** time-off boshale oi window-er slot
booking theke uthe jay, **kintu age theke book hoye thaka class cancel hoy na**.
Tai section-e ekta amber note — "Move or cancel those from the sessions list."
Na bolle admin bhabto chhuti dileই shob class bati hoye gelo.

**Delete-e `DeleteMutation` reuse kora holo** — notun kichu banai ni. Kintu route ta
teacher-er niche na: `/administrator/time-off/:id/` (teacher-er niche shudhu list + create).

**Invalidate duito key** — time-off list, ar teacher detail (karon detail response-e
`time_off` embed thake, na korle bashi data theke jeto).

---

#### Step 4 — Packages · 2026-09-12 · ✅

**Modified:** `queries/use-packages.ts` · `schemas/package.schema.ts` ·
`components/package-form.tsx` · `packages-column.tsx` · `packages-table.tsx` ·
`edit-package-page.tsx`

**`price` string-i rakhlam, number korini.** Backend decimal string chay ("250.00").
Form-e `type="number"` dile "250" hoye jeto ar float-er gondogol dhukto. Tai
`inputMode="decimal"` wala text input + Zod regex (`^\d+(\.\d{1,2})?$`).
Column-eo `toFixed()` nai — string direct dekhano hoy (**eta-i student invoice-e
crash korar karon chhilo**, tai age thekei sabdhan holam).

**Bilingual field add holo:** `title_es`, `description_en`, `description_es` —
mock-e shudhu ekta `name` chhilo. Spanish khali thakle public API English e fallback kore,
placeholder-e sheta bola ache.

**Notun field:** `image_url` (uploader), `is_first_lesson`, `sort_order`.

**`is_first_lesson` on korle warning dekhay** — backend doc bole ei flag **shudhu ekta
package-e** thaka uchit (oita highlighted card hoy ar ek email-e ekbar-i kena jay).
`form.Subscribe` diye shudhu on thakle note ta dekhay.

**Delete button shoriye dilam** (teachers-er motoi) — backend-e DELETE deactivate kore,
karon purchase package ke `PROTECT` kore reference kore; sotti delete hole karo invoice
history orphan hoye jeto.

**Search client-side** — ei endpoint `search` param ney na ar "not paginated", tai
`useMemo` diye filter. `<Pagination>`-o boshai ni.

**Edit page-e ek-i fada eriye gelam** — API-r computed field (`title`, `description`,
`lang`) ar `id`/`created_at` form-e dhukiye dile submit-e chole jeto. `toFormValues()`
diye shudhu form-er field neওয়া hoy.

**Verify:** `typecheck` clean · `eslint` admin clean · `npm run build` 48/48

---

#### Step 5 — Blogs · 2026-09-12 · ✅

**Modified:** `queries/use-blogs.ts` · `schemas/blog.schema.ts` ·
`components/blog-form.tsx` · `blogs-column.tsx` · `blogs-table.tsx` · `edit-blog-page.tsx`

**Field puro bodle gelo:**
| Mock | Ekhon |
|---|---|
| `title` | `title_en` + `title_es` |
| `content` (ek ta editor) | `body_en` + `body_es` (**duita** rich editor) |
| `excerpt` | `excerpt_en` + `excerpt_es` |
| `image` (SingleFileUploader) | `image_urls[]` (**MultiFileUploader**) |
| `category` free text | **enum** — 5 ta fixed option |
| — | `slug`, `meta_title`, `meta_description` |

**`category` free text chhilo — ekhon enum.** Mock-e "Travel", "Grammar", "Student Stories"
lekha chhilo, kintu backend shudhu 5 ta value ney (`spanish_learning_tips`, `ecuador_travel`,
`school_news`, `student_stories`, `culture_and_language`). Purono value pathale 400 khato.

**Blog-e DELETE button rakhlam** — teachers/packages theke **alada**. Backend doc sposhto:
"here `DELETE` really does delete". Tai `DeleteMutation` reuse kora holo, ar confirm text-e
bola ache eta shudhu lukano na.

**Read-only field form-e nai, kintu edit page-e dekhano hoy** — `author` ar `reading_time`
uporer ekta box-e. `slug` form-e ache kintu placeholder bole "Auto-generated from the title"
(khali dile backend banay ar unique kore).

**`published_at` niye ekta jinis** — backend ekbar-i stamp kore. Unpublish kore abar publish
korleo prothom tarikh-i thake; query hook-er comment-e lekha ache jate keu bug bhebe na bose.

**Search box shoriye dilam** — mock-e search chhilo, kintu ei endpoint **search param ney na**
(bru te shudhu `status` ar `category`). Fake search box rakhle admin type kore bhabto kaj korche.

**Pagination ache** — ei endpoint sotti paginated (teachers/packages-er moto na).

**Verify:** `typecheck` clean · `eslint` admin clean · `npm run build` 48/48

---

#### Step 6 — Sessions · 2026-09-12 · ✅

**Modified:** `queries/use-sessions.ts` · `components/sessions-column.tsx` ·
`sessions-table.tsx` · `types/admin.types.ts` (`AdminSessionResponse` add)

**Filter ekhon backend-er nijer param diye:**
| Filter | Param |
|---|---|
| Upcoming / Past tab | `filter` |
| Teacher dropdown | `teacher` (UUID) — `useTeachers()` theke option |
| Status dropdown | `status` |
| From / To date | `from` / `to` (YYYY-MM-DD) |

**Ekta boro bhul thik holo — tab ta `status` e pathacchilo.** Mock-e "Past" tab
`status: "completed,no-show,rescheduled"` pathato — ekta comma-separated string ja
backend bujhto-i na. Backend-e `filter=upcoming|past` alada param, ar `status` ekta
single value. Ekhon duito alada.

**Fake search box shoriye dilam** — ei endpoint-eo `search` param nai (blogs-er motoi).
Mock-e "Search by student or teacher..." chhilo ja kichui korto na.

**Status value bodleche:** `upcoming`→`scheduled`, `no-show`→`no_show`, ar notun
`cancelled` add. Action menu-te ekhon 4 ta outcome (age 3 ta chhilo, `cancelled` chhilo na).

**Column-e notun field:** `student_email`, `package_title`. `date`+`time` alada chhilo,
ekhon `start_datetime` theke duito-i, `duration_minutes` shoho. School time label table-er
upore.

**Notes dialog-e ekta chhoto jinis** — bondho kore abar khulle ekhon server-er value
dekhay (age half-edit kora text roye jeto). Notes thakle button-e ekta chhoto dot.

**Verify:** `typecheck` clean · `eslint` admin clean

---

#### Step 7 — Calendar · 2026-09-12 · ✅

**Modified:** `queries/use-calendar-sessions.ts` · `components/admin-calendar.tsx`

**Shape puro alada chhilo.** Mock flat session list chaito
(`student:{}`, `teacher:{}`, `date`, `time`). Backend dey **calendar-ready event**:
`{ id, title, start, end, status, teacher_id, teacher_name, student_name, meet_link, color }`.

**Teacher-er rong ekhon backend theke — ekta asol bug thik holo.**
Mock-e frontend nijer `TEACHER_COLORS` palette theke **je order-e teacher data-te ashto
shei onujayi** rong boshato (`idx % TEACHER_COLORS.length`). Mane **teacher filter
bodlalei baki teacher-der rong bodle jeto** — admin ekta rong mone rekhe kaj korte parto na.
Backend fixed palette theke teacher-er order onujayi `color` dey, tai reload ba filter-e
rong ek-i thake. Ekhon `style={{ backgroundColor: event.color }}` — frontend-e kono
palette nai.

**Filter add holo:** teacher (UUID) ar status — duito-i backend-e jay (age shudhu
client-side teacher filter chhilo).

**`from`/`to` required kora holo** — backend doc bole date range na pathale **shob kichu**
ferot dey. Hook-e `enabled: Boolean(from && to)`.

**"Today" bug ekhaneo chhilo** — `formatIso()` `toISOString()` (UTC) use korto.
Ekhon shared `localDateInput()`. (Student calendar-e ei ek-i bug Step 5-e thik korechilam.)

**Legend ekhon range-er asol teacher theke** — ar backend-er rong-i dekhay.

**Ekta render bug-o thik holo** — `data?.events ?? []` proti render-e notun array banato,
tate legend-er `useMemo` ar child-er grouping proti bar-i abar cholto. Ekhon memo kora.

**Verify:** `typecheck` clean · `eslint` admin clean

---

#### Step 8 — Bookings + CSV export · 2026-09-12 · ✅

**Notun file:** `src/utils/save-blob.ts` — `saveBlob()` + `dateStamp()`

**Modified:** `queries/use-bookings.ts` · `bookings-column.tsx` · `bookings-table.tsx` ·
student-er `use-download-invoice.ts` (shared `saveBlob` use kore, logic ek-i)

**Type puro notun.** Mock-e booking = ekta class booking
(`student:{}`, `teacher:{}`, `date`, `time`, `status: pending|confirmed|cancelled`).
Backend-e booking = **ekta purchase** — `package_title`, `amount_paid`, `payment_status`,
`classes_total/used/remaining`, `progress_percent`, `expires_at`, `invoice{}`.
**Teacher, date, time ei row-e nai-i.** Column shob notun kore likha holo.

**CSV export nokol chhilo — ekhon asol.** Mock-e `exportToCsv()` frontend-e
**shudhu cholti page-er row** niye string join kore CSV banato. Mane 3 page booking
thakle 1 page namto, ar admin bujhtei parto na. Ekhon
`GET /administrator/bookings/export/` — backend `.iterator()` diye stream kore,
filename-o backend-er format-e (`vidaverde-bookings-YYYYMMDD.csv`).

**⚠️ Export ar table-er filter ek na — UI te bole dilam.** Export endpoint shudhu
`payment_status`, `from`, `to` mane; **`teacher` ar `search` ignore kore**. Oi duita
filter deওয়া thakle table-er niche amber line dekhay. Na bolle admin bhabto je ja
dekhche tai download hocche.

**`amount_paid` decimal string** — `toFixed()` nai (packages-er motoi), `invoice.currency`
shoho dekhano hoy.

**Search-er mane bodleche** — mock-e "student or teacher" khujto; backend-e `search`
shudhu **student email**-er ongsho match kore. Placeholder-e sheta lekha ache.

**Verify:** `typecheck` clean · `eslint` clean (student folder shoho — `saveBlob` refactor kichu bhange ni)

---

#### Step 9 — Students · 2026-09-12 · ✅

**Ei plan-er prothom ekdom notun screen** (ekhon porjonto shob mock replace chhilo).

**Notun file:**
- `students/queries/use-students.ts` — list + detail
- `students/components/students-column.tsx` · `students-table.tsx`
- `students/index.tsx` · `student-detail-page.tsx`
- `app/(protected)/dashboard/admin/students/page.tsx` + `[id]/page.tsx`

**Modified:** `sidebar/admin-sidebar-nav-items.ts` — "Students" item (Teachers-er niche) ·
`types/admin.types.ts` — `AdminStudentDetailResponse`

**Read-only screen** — backend doc sposhto: "admins do not edit student profiles".
Tai kono edit form nai, shudhu "View" button. Column-e naam/email, country, timezone,
level, joined, status.

**Detail page-e tinta section:** Profile · Packages (ki kineche, koto baki, koto dilo) ·
Classes (ja hoyeche ba book kora, school time-e).

**⚠️ Detail response-er shape bru te dekhano nai.** Doc shudhu bole "profile, every
package they bought, and every class they have had or are booked into" — kintu key-er
naam ba nesting dekhano nai. Tai:
- Type-e shob key **optional** rakha holo
- UI `data.student ?? data.profile` duitai try kore, ar `packages`/`sessions` na thakle
  empty state dekhay
- **Asol API cholle shape confirm kore ek ta te thik korte hobe** — type-e comment ache

Eta guess kore ekta shape hardcode korar cheye nirapod: shape alada hole page khali
dekhabe, crash korbe na.

**Verify:** `typecheck` clean · `eslint` admin + route clean

---

#### Step 10 — Testimonials · 2026-09-12 · ✅

**Notun file:** `testimonials/` puro folder — `schemas/testimonial.schema.ts` ·
`queries/use-testimonials.ts` · `components/testimonial-form.tsx` ·
`testimonials-column.tsx` · `testimonials-table.tsx` · `index.tsx` ·
`create-testimonial-page.tsx` · `edit-testimonial-page.tsx` ·
3 ta route (`/`, `/create`, `/[id]/edit`)

**Modified:** `sidebar/admin-sidebar-nav-items.ts` — "Testimonials" item

**"Hide" ar "Delete" alada rakhlam.** `active` toggle → public site theke shoray kintu
row thake. Delete → sotti muche fele. Delete-er confirm text-e bola ache: "To keep it but
take it off the site, use Hide instead." Duita ek kore dile admin bhul kore data harato.

**Delete sotti delete kore dhore nilam** — teachers/packages-er doc-e sposhto lekha chhilo
"deactivates rather than deletes", **testimonials-er doc-e sheta lekha nai**. Tai eta real
delete. (Blog-er motoi.) Column-e comment kora ache.

**Backend-er ekta content niyom UI te tullam** — doc bole outcome **specific** hote hobe,
generic proshongsha na ("Great school!" convert kore na). Form-e helper text-e sheta ache
ar placeholder-e asol example.

**Bilingual:** `outcome_en` required, `outcome_es` optional (khali hole English fallback).

**Search client-side** — packages-er motoi, endpoint search param ney na ar "not paginated".

**Verify:** `typecheck` clean · `eslint` admin + route clean

---

#### Step 11 — Contact messages · 2026-09-12 · ✅

**Notun file:** `contact-messages/queries/use-contact-messages.ts` ·
`components/contact-messages-column.tsx` · `contact-messages-table.tsx` · `index.tsx` ·
route `/dashboard/admin/enquiries`

**Modified:** `sidebar/admin-sidebar-nav-items.ts` — "Enquiries" item

**Message ta read-only rakha holo.** Backend doc: "the submitted content itself is a record
and stays as the visitor sent it" — shudhu `handled` ar `admin_notes` lekha jay. Tai dialog-e
message ta ekta box-e dekhano hoy, edit kora jay na.

**Puro message dialog-e** — table-er column-e truncate, karon message lomba hote pare
ar table bhenge jeto. "Read" button-e puro ta + internal note ek shathe.

**`handled` toggle duidik-e chole** — "Mark handled" ar "Reopen". `handled: true` pathale
backend nijei `handled_at` stamp kore, tai frontend theke pathano hoy na.

**Dashboard-o invalidate kori** — summary-te `contact_unhandled` count ache; na korle
enquiry handle korar por-o dashboard-e purono shonkha dekhato.

**Subject filter free-text** — backend `?subject=` ney, kintu **valid value gula documented
na** (example-e shudhu `immersion` → "Immersion Programme" dekhano). Dropdown banate gele
value guess korte hoto, tai text input + placeholder-e example.

**Note dialog-e ek-i shabdhanota** — bondho kore abar khulle server-er value dekhay
(sessions-er notes-er motoi).

**Verify:** `typecheck` clean · `eslint` admin + route clean

---

#### Step 12 — Leads · 2026-09-12 · ✅

**Notun file:** `leads/queries/use-leads.ts` · `components/leads-column.tsx` ·
`leads-table.tsx` · `index.tsx` · route `/dashboard/admin/leads`

**Modified:** `sidebar/admin-sidebar-nav-items.ts` — "Leads" item

**Puro read-only** — doc bole "Read-only". Kono edit/delete button nai, shudhu filter +
export. Nurture sequence backend nijei chalay.

**Column-e ja dekhachhi:** naam/email, source, guide kobe gelo, `nurture_stage` (`2 / 4`
format — 4 mane tinta follow-up-i schedule hoyeche), subscribed (unsubscribe-er tarikh shoho),
converted (booking-er tarikh shoho), GDPR consent.

**`converted_at` backend nijei stamp kore** jokhon oi email diye checkout complete hoy —
column-e comment kora ache jate keu manually set korar chesta na kore.

**CSV export `saveBlob` reuse kore** (Step 8-e shared kora holo) — filename
`vidaverde-leads-YYYYMMDD.csv`.

**⚠️ Export-er filter niye ekta oniশ্চoyota:** doc shudhu bole "downloads the same list as
CSV" — **kon filter gula mane bola nai**. Bookings export-e teacher/search ignore korto, tai
ekhane dhore neওয়া jay na. Ekhon list-er filter gula pathano hocche; **asol API cholle
verify kora dorkar** — hook-e comment kora ache. Bookings-er moto amber warning dei ni,
karon ekhane ignore kore kina sheta-i jana nai.

**Verify:** `typecheck` clean · `eslint` admin + route clean
