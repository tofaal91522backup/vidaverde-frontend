# Public Marketing — Round 2 API Integration Plan

> **Ei file live progress tracker.** Proti step shesh e "Progress Log" update hobe.
> Scope: shudhu backend `f7ccf8b` → `63c01f5` er public-side notun jinis.
> Round 1-er kaj: [PUBLIC_API_INTEGRATION.md](PUBLIC_API_INTEGRATION.md)

- **Source of truth:** [docs/bruno/public/](../bruno/public/)
- **Index:** [ROUND2_INDEX.md](ROUND2_INDEX.md)
- **Started:** —
- **Current step:** **Step 0** (shuru hoy nai)
- **Status:** planned

---

## Ki bodleche

Backend duita commit-e booking flow-er order-i bodle diyeche:

```
29d9584  Add teacher -> packages endpoint, and fix the eligibility split-brain
eca895a  Add package -> teachers endpoint for booking step 2
```

### Notun endpoint

| Method | Path | Ki dey |
|---|---|---|
| GET | `/public/packages/:id/teachers/` | oi package-e book kora jay emon teacher + **protyek-er puro slot list**, ek call-e |
| GET | `/public/teachers/:id/packages/` | oi teacher-er shathe kena jay emon package |

### Notun field

| Kothay | Field | Mane |
|---|---|---|
| `GET /public/packages/` | `teacher_count` | koyjon teacher-er shathe book kora jay ("4 teachers available") |
| `packages/:id/teachers/` → `package` | `restricted` | package ta limited kina |
| `teachers/:id/packages/` → proti package | `restricted_to_listed_teachers` | ei teacher-ke **explicitly** name kora hoyeche kina |

### Behaviour change

- **Checkout ekhon reject kore** jodi teacher oi package-e allowed na hoy
  (`public/checkout.bru` changelog, 2026-09-05). Ager flow-e emon combo banano
  shombhob chilo — ekhon 400 khabe.

---

## Ekhon-kar flow vs backend-er flow

**Ekhon** ([book/index.tsx](../../src/features/marketing/pages/book/index.tsx)) — 5 step:

```
1. Choose Your Teacher   → GET /public/teachers/
2. Choose Your Package   → GET /public/packages/
3. Date & Time           → GET /public/teachers/:id/slots/
4. Your Details
5. Payment
```

**Backend ja bole** (`package teachers.bru` docs):

> *"The flow is: 1. choose package → 2. choose teacher → 3. fill in details and pay."*

```
1. Choose Package        → GET /public/packages/
2. Teacher + Time        → GET /public/packages/:id/teachers/   ← EK call, slot shoho
3. Your Details
4. Payment
```

**Keno backend-er ta bhalo:**
- Package age chaile teacher list-i filter hoye ashe → invalid combo banano-i jay na
- Teacher + slot ek call-e → per-teacher slot fetch nai, waterfall nai
- `next_available` ache → "Next available: Mon 14:00" badge shoja dekhano jay
- `days` array-e **khali din-o thake** → week grid-e gap pore na

---

## Rules

1. Public API — `publicApiClient` / `publicRequest`. Token na.
2. `start_utc` **hubohu** checkout-e `start_datetime` hisebe jabe. `new Date()`
   diye re-format kore pathano jabe na.
3. `start_local`-e offset ache — render-er shomoy `slice()` kore naive ongsho
   nite hobe, `toLocaleString()` chalale browser zone-e abar convert hoye vul dekhabe.
   (Round 1-e ei bug dhora porechilo — `formatSlotDate` already thik ache, oi
   pattern-i rakhbo.)
4. `price` decimal string (`"135.00"`) — `toFixed()` na.
5. `tz` param-e visitor-er zone pathabo (`getPublicTimeZone()` already ache).

---

## Step-by-step

### Step 0 — Types
**File:** `src/features/marketing/types/public-api.types.ts`

- `PublicPackage`-e `teacher_count: number` add (ekhon **missing** — backend
  pathacche, amra feled dicchi)
- `PublicPackageTeacher` = `PublicTeacher` + `next_available`, `slot_count`, `days`
- `PackageTeachersResponse` = `{ success, package: {...restricted}, timezone,
  duration_minutes, from_date, days_requested, teachers[] }`
- `TeacherPackagesResponse` = `{ success, teacher: {...next_available}, timezone,
  days_searched, packages[] }`
- `PublicSlotRef` (`start_utc`, `start_local`, `label`, `date`) — `next_available`
  e `date` extra ache, existing `PublicTeacherSlot`-e nai

**Done jokhon:** typecheck clean, kono component touch kori nai.

---

### Step 1 — `usePackageTeachers` hook
**File:** `src/features/marketing/pages/book/queries/use-package-teachers.ts`

- `useFetchData<PackageTeachersResponse>` + `makeEndpoint`
- Params: `id`, `date`, `days` (default 7), `tz`, `lang`
- `PACKAGE_TEACHERS_QUERY_KEY` constant, key `[KEY, params]`
- `enabled: Boolean(packageId)`
- Doc comment-e: khali-slot teacher backend **bad diye dey**, tai list chhoto
  hoye ashte pare — "no teachers" mane teacher nai na, oi window-te slot nai

**Done jokhon:** hook ache, typecheck clean, kono page e ekhono use hoy nai.

---

### Step 2 — Booking flow reorder 🔴 (boro step)
**File:** `src/features/marketing/pages/book/index.tsx`, `components/SlotPicker.tsx`

- `STEPS` → `["Choose Your Package", "Teacher & Time", "Your Details", "Payment"]`
- Step 1: package grid (`usePublicPackages` already ache), `teacher_count` badge
- Step 2: `usePackageTeachers(packageId)` — teacher card, protyek-e
  `next_available` badge; teacher select korle **oi teacher-er `days`** theke-i
  SlotPicker chole (notun fetch na)
- `SlotPicker` ekhon `useTeacherSlots` nijei dake — refactor kore `days` prop
  hisebe nite hobe (ba duitai support korbe)
- `?teacher=` query param (teacher card theke "Book with X") — Step 3-e handle
- `?package=` query param support rakhbo

⚠️ Ei step-e 5-step → 4-step hocche, state machine bodlabe. Ek shathe onek file
touch hobe — ei ek ta step-i alada `next`.

**Done jokhon:** package → teacher+time → details → payment flow cholche, checkout
ek-i moto kaj kore.

---

### Step 3 — Teacher-first entry (`/public/teachers/:id/packages/`)
**File:** `src/features/marketing/pages/book/queries/use-teacher-packages.ts`,
`courses/teacher-profile/index.tsx`, `courses/components/OnlineTeachersSection.tsx`,
`marketing/components/TeachersSection.tsx`

- Hook: `useTeacherPackages(teacherId, { days, tz, lang })`
- Teacher profile page-e "Book with {name}" section — oi teacher-er shathe kena
  jay emon package card
- `restricted_to_listed_teachers: true` hole "Exclusive" badge
- Card click → `/book?package=<id>&teacher=<id>` → Step 2-er flow-e teacher
  pre-selected
- `teacher.next_available` `null` hole "No open times in the next 14 days" —
  kintu package gula **tokhon-o kena jay**, tai disable korbo na

**Done jokhon:** teacher card/profile theke booking-e jawa jay, teacher already select thake.

---

### Step 4 — `teacher_count` + checkout restriction error
**File:** `courses/components/PricingSection.tsx`, `queries/use-checkout.ts`

- Pricing card-e `teacher_count` — "Book with any of 4 teachers"
- `teacher_count` 0 hole badge-i dekhabo na (edge case)
- Checkout 400-e "teacher not allowed on this package" ashle generic error na
  dekhiye sposhto message + Step 2-e ferot pathabo
- Ei error ekhon UI-te dhora nai — restriction feature-er direct effect

**Done jokhon:** pricing card-e count dekhay, invalid combo-te bodhgommo error.

---

## Progress Log

| Step | Obostha | Tarikh | Ki korechi |
|---|---|---|---|
| 0 — Types | ⬜ baki | — | — |
| 1 — `usePackageTeachers` | ⬜ baki | — | — |
| 2 — Flow reorder | ⬜ baki | — | — |
| 3 — Teacher-first entry | ⬜ baki | — | — |
| 4 — `teacher_count` + error | ⬜ baki | — | — |

---

## Khola proshno

1. **Teacher URL ekhon-o UUID-based** (Round 1-er khola issue). `/online-classes/teachers/[name]`
   route ache — oita UUID na slug, seta ei round-e-o meta hoy nai. Step 3-e
   teacher profile touch korar shomoy abar uthbe.
2. **"Match me" option** — Round 1-e disable kora hoyechilo (checkout concrete
   teacher chay). Package-first flow-e eta abar kora jay kina — `packages/:id/teachers/`
   theke `next_available` shobcheye kacher jon-ke auto-pick kora jete pare.
   Product shidhanto, ekhon scope-e nai.
3. **`days` default 7 na 14?** `packages/:id/teachers/` default 7, `teachers/:id/packages/`
   default 14. Booking grid-e ek week dekhabo, tai 7 rakhchi — beshi chaile bolo.
