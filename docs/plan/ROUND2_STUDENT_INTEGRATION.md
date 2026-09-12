# Student Portal — Round 2 API Integration Plan

> **Ei file live progress tracker.** Proti step shesh e "Progress Log" update hobe.
> Scope: shudhu backend `f7ccf8b` → `63c01f5` er student-side effect.
> Round 1-er kaj: [STUDENT_API_INTEGRATION.md](STUDENT_API_INTEGRATION.md)

- **Source of truth:** [docs/bruno/student/](../bruno/student/)
- **Index:** [ROUND2_INDEX.md](ROUND2_INDEX.md)
- **Started:** 2026-09-12
- **Current step:** ✅ **Shob step (0–2) shesh**
- **Status:** complete

---

## Age ek ta katha — student-e notun endpoint nai

Changelog-e student folder-e ja "Added" dekhacche:

| File | Obostha |
|---|---|
| `student/my profile.bru` (`GET /student/me/`) | ✅ Round 1-e integrated — [use-student-profile.ts](../../src/features/protected/pages/dashboard/student/pages/profile/queries/use-student-profile.ts) |
| `student/update my profile.bru` (`PATCH /student/me/`) | ✅ ek-i file-e integrated |
| `student/registration/*` | ➡️ auth-er kaj — [ROUND2_AUTH_INTEGRATION.md](ROUND2_AUTH_INTEGRATION.md) |

Baki `student/*.bru` gula "Updated" — kintu oi gulor doc-e kono `## Changelog`
section nai, mane shudhu wording/comment poriskar kora hoyeche, contract bodlay ni.
(Verified: shob bru file-e `## Changelog` grep kora hoyeche — student-er kono
file-e nai.)

**Tobu kaj ache** — karon public-side-er **package→teacher restriction** student
portal-eo enforce hoy, ar amader picker seta mane na.

---

## Asol shomoshya

`package teachers.bru` docs bole:

> *"The restriction is enforced again at checkout **and when a student books a
> later class from the portal** — filtering this list is not the only guard."*

Ekhon student portal-e teacher list ashe `/public/teachers/` theke — mane **shob**
active teacher:

| Kothay | File | Ki dake |
|---|---|---|
| Book a class → step 2 | [step-teacher.tsx](../../src/features/protected/pages/dashboard/student/pages/book-class/components/step-teacher.tsx) | `usePublicTeachers()` — shob teacher |
| Reschedule dialog | [session-actions.tsx](../../src/features/protected/pages/dashboard/student/pages/calendar/components/session-actions.tsx#L131) | `usePublicTeachers()` — shob teacher |

**Ki hobe:** student restricted package kinlo (dhoro shudhu senior teacher-er
jonno), portal-e giye onno teacher select korlo, slot balo, submit korlo →
**backend 400**. Student bujhbe na keno.

**Bhaggo bhalo:** flow already thik order-e —
`book-class/index.tsx` er `STEPS` = `["Choose package", "Choose teacher", "Pick a time"]`.
Package age-i select hoy, tai shudhu teacher list-er source bodlalei hoye jay.

**Ar ek ta bhalo khobor:** `StudentPackage.package` field-e catalogue package-er
UUID ache ([student.types.ts:53](../../src/features/protected/pages/dashboard/student/types/student.types.ts#L53)),
tai `/public/packages/<pkg.package>/teachers/` shoja dakte para jabe. Notun
backend endpoint lagbe na.

---

## Rules

1. `/public/...` endpoint hole-o student portal theke dakle problem nai — Round 1-e
   already `use-public-teachers.ts` ar `use-teacher-slots.ts` student folder-e ache.
   Oi pattern-i follow korbo.
2. Student-er **nijer timezone** (`profile.timezone`) `tz` param-e jabe, browser-er ta na.
   Portal shob jaygay student-er zone-e render hoy.
3. `start_utc` hubohu `POST /student/sessions/` e `start_datetime` hisebe jabe.
4. Public booking-e ja hook likhbo (Round 2 Public Step 1), student folder theke
   seta reuse korbo — duito jaygay duita kore likhbo na.

---

## Step-by-step

### Step 0 — Shared `usePackageTeachers` student folder-e
**File:** `src/features/protected/pages/dashboard/student/queries/use-package-teachers.ts`

- Public-er `PackageTeachersResponse` type reuse (`marketing/types/public-api.types.ts`)
- `useFetchData` + `makeEndpoint("/public/packages/<id>/teachers/", { date, days, tz, lang })`
- `tz` = student profile-er timezone
- `enabled: Boolean(packageId)`

⚠️ **Dependency:** ei step-er age **Public Step 0 + Step 1** shesh howa lagbe
(type + hook oikhane toiri hoy). Public section age korle eta 10 minute-er kaj.

**Done jokhon:** hook ache, typecheck clean.

> **✅ Shesh — ja jana gelo:**
> - **Type duplicate kori nai, marketing theke import korechi.** Eta feature-er
>   nijer shape na — backend-er contract. Duita copy rakhle backend field add
>   korle ek ta chup-chap purono theke jeto. **Type-only import**, tai marketing-er
>   kono runtime code student bundle-e ashe na. (Auth-e `SPANISH_LEVEL_OPTIONS`
>   shorate hoyechilo karon oita runtime **value** chilo — ekhane shudhu type.)
> - `client: "public"` **deya hoy nai**, ichchha kore — student portal-e user
>   logged-in, ar pasher `use-teacher-slots.ts` ek-i public endpoint normal
>   authenticated `request` diye dake. Ek folder-e duita alada niyom rakha hoto.
> - Param-e sposhto likha ache `packageId` mane **catalogue** package
>   (`StudentPackage.package`), `StudentPackage.id` na — ei duita golale khali
>   list ashto ar keu dhorte parto na.

---

### Step 1 — Book a class: teacher list restrict koro
**File:** `book-class/index.tsx`, `components/step-teacher.tsx`, `components/step-slot.tsx`

- `usePublicTeachers()` → `usePackageTeachers(selectedPackage.package)`
- Teacher card-e `next_available` badge
- **Bonus:** response-e slot already ache → `step-slot.tsx` ekhon je alada
  `useTeacherSlots()` dake, seta baad — ek call kome jabe
- `package.restricted` true hole ek ta chhoto note: "This package can be booked
  with these teachers only"
- Teacher list khali hole: "No open times in the next 7 days" + window barano-r
  option (`days` 7 → 14)

**Done jokhon:** book-class-e shudhu allowed teacher dekhay, slot ek call-e ashe.

> **✅ Shesh — ja jana gelo:**
> - **Duita id alada rakhte hoyeche.** `StudentPackage.id` jay `student_package`
>   hisebe API te; `StudentPackage.package` (catalogue UUID) jay teachers
>   endpoint-e. `StepPackage` ekhon duita-i fire dey.
> - 🔴 **My Packages-er "Book a class" shortcut bhenge jacchilo.** Oi link
>   `?package=<StudentPackage.id>` pathay — catalogue id thake na, tai teacher
>   list ana-i jeto na. Prothome "package abar bachao" likhechilam, kintu oita
>   shortcut-er mane-i noshto kore. Ekhon `useMyPackages()` theke mile ber kora
>   hoy — `StepPackage`-o ei hook dake, tai React Query cache theke ashe, **extra
>   request jay na**.
> - **Ekta call kome gelo** — `step-slot.tsx` ar `useTeacherSlots` dake na,
>   teacher-er `days` prop hisebe pay (public side-er moto).
> - **Date control teacher step-e uthe eseche.** Slot step-e thakle mone hoto
>   shudhu somoy filter hocche, othocho date teacher list-o bodlay.

---

### Step 2 — Reschedule: teacher list restrict koro
**File:** `calendar/components/session-actions.tsx`

- `usePublicTeachers()` → `usePackageTeachers(session-er package id)`
- ⚠️ **Verify korte hobe:** `StudentSession` type-e catalogue package UUID ache
  kina, na ki shudhu `package_title`. Na thakle `/student/packages/` theke title
  mile ber korte hobe — ba backend-ke `package` id add korte bolte hobe.
  Ei step-er prothom kaj-i oi verification.
- Teacher na bodlale payload-e `teacher` jay na — oi behaviour thik ache, rakhbo

**Done jokhon:** reschedule-e-o invalid teacher select kora jay na.

> **✅ Shesh — verify-er uttor + ja jana gelo:**
> - ❓ **Khola proshno 1-er uttor: `StudentSession` e catalogue package id NAI.**
>   Shudhu `student_package` (student-er kena copy-r uuid) ar `package_title`.
>   Bru-r example response dekhe confirm kora. Backend-ke kichu add korte bola
>   lage ni — `useMyPackages()` theke `student_package` mile catalogue id ber kora
>   jay, thik jemon `book-class/index.tsx` kore.
> - Package list ekhono loading thakle ba package na pele hook disabled thake ar
>   teacher dropdown khali ashe. Tokhon-o **somoy bodlano jay** — `teacherId`
>   default session-er teacher, ar teacher na bodlale payload-e `teacher` jay-i na.
> - ⚠️ Ekhankar teacher-er jodi oi window-e slot na thake, backend take list
>   theke bad dey — tai dropdown-e nijer teacher-o na dekhate pare. `teacherId`
>   tokhon-o take dhore rakhe, tai kichu bhange na.
> - **Purono `use-public-teachers.ts` ar `use-teacher-slots.ts` delete kora holo.**
>   Ar kothao import chilo na. Rekhe dile porer dev abar "shob teacher" dekhano
>   hook duita peye bhul jaygay use korto — ei step-e ja thik korlam thik seta-i.

---

## Progress Log

| Step | Obostha | Tarikh | Ki korechi |
|---|---|---|---|
| 0 — `usePackageTeachers` hook | ✅ done | 2026-09-12 | Notun `student/queries/use-package-teachers.ts` — marketing-er `PackageTeachersResponse` type-only import, authenticated `request` (public hook-er moto `client: "public"` na) |
| 1 — Book a class restrict | ✅ done | 2026-09-12 | `step-teacher.tsx` `usePackageTeachers`-e, date control ekhane uthe eseche, `restricted` note; `step-slot.tsx` ar fetch kore na (`days` prop); `step-package.tsx` duita id dey; `index.tsx` catalogue id resolve kore |
| 2 — Reschedule restrict | ✅ done | 2026-09-12 | `session-actions.tsx` — `usePackageTeachers`-e, catalogue id `useMyPackages()` theke resolve, slot ei response theke. Purono `use-public-teachers.ts` + `use-teacher-slots.ts` **delete** (dead) |

---

## Round 1 theke ja ekhon-o thik ache (bodlano lagbe na)

Backend source pore confirm kora (`student/views.py`):

- `MyInvoicesView` — pagination nai, `payment_status` filter nai ✅ jemon documented
- `MySessionsView` — shudhu `filter=upcoming|past|all` + pagination, **date range nai**
  ✅ ei karonei calendar-e `page_size=200` workaround
- `GET /student/me/` + `PATCH /student/me/` ✅ integrated

---

## Khola proshno

1. **`StudentSession`-e catalogue package id ache?** Step 2-er blocker. Na thakle
   backend dev-ke bolte hobe.
2. **Restricted package asholei ache?** Shob seeded package ekhon unrestricted
   (`teachers: []`). Test korte hole admin theke ek ta package restrict korte hobe
   — seta **Admin Round 2 Step 1**-er UI diye. Tai test-er jonno admin section
   age korle shubidha.
