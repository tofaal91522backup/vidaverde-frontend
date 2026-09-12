# Admin Dashboard — Round 2 API Integration Plan

> **Ei file live progress tracker.** Proti step shesh e "Progress Log" update hobe.
> Scope: shudhu backend `f7ccf8b` → `63c01f5` er admin-side notun jinis.
> Round 1-er kaj: [ADMIN_API_INTEGRATION.md](ADMIN_API_INTEGRATION.md)

- **Source of truth:** [docs/bruno/administrator/](../bruno/administrator/)
- **Index:** [ROUND2_INDEX.md](ROUND2_INDEX.md)
- **Started:** —
- **Current step:** **Step 0** (shuru hoy nai)
- **Status:** planned

---

## Age ek ta katha — 35 ta "Added" er moddhe kaj ek ta

Changelog-e `administrator/` folder-e **35 ta file** "Added" dekhabe:
`create teacher.bru`, `update teacher.bru`, `deactivate teacher.bru`,
`replace package.bru`, `blog detail.bru`… — ei rokom.

**Eigula notun endpoint na.** Age ek ta `teachers.bru` te GET/POST/PUT/PATCH/DELETE
shob ek shathe chilo; backend dev proti method-ke alada file kore diyeche. Sync
script file-name dhore compare kore, tai "notun" mone hoyeche.

Shob gula Round 1-e integrated. Spot-check:

| Endpoint | Frontend | Obostha |
|---|---|---|
| `POST /administrator/teachers/` | `admin/pages/teachers/queries/use-teachers.ts` | ✅ |
| `PATCH /administrator/packages/:id/` | `admin/pages/packages/queries/use-packages.ts` | ✅ |
| `DELETE /administrator/blogs/:id/` | `admin/pages/blogs/queries/use-blogs.ts` | ✅ |
| `GET /administrator/students/:id/` | `admin/pages/students/queries/use-students.ts` | ✅ |
| `GET /administrator/leads/export/` | `admin/pages/leads/queries/use-leads.ts` | ✅ |
| `POST /administrator/upload/` | `src/services/upload-file.service.ts` | ✅ live-tested |

**Asol notun jinis ek ta-i:** package-e teacher assign korar `teachers` field.

---

## Asol kaj — package restriction

`administrator/create package.bru` → Changelog:

> *"2026-09-05: Added the `teachers` field — an optional list of teacher UUIDs
> limiting who the package can be booked with. Empty (the default) keeps every
> package open to all active teachers, so existing packages are unaffected."*

| Field | Direction | Type | Mane |
|---|---|---|---|
| `teachers` | write (POST/PUT/PATCH) | `string[]` (UUID) | kon teacher-der shathe book kora jabe |
| `teacher_names` | read-only | `string[]` | assignment-ta naam diye echo kore |

**Khali list = unrestricted** (shob active teacher), **"kono teacher na" noy.**
Ei jaygay vul bujhle pura feature ulta hoye jabe.

Ei field-ta drive kore:
- `GET /public/packages/:id/teachers/` — public booking step 2
- Checkout-er validation (allowed na hole 400)
- Student portal-er booking

**Ekhon frontend-e ei field nai-i** — na schema-te, na form-e, na type-e.
Verified: `grep -rn "teacher_names\|teachers" admin/pages/packages/` → khali.

**Effect:** admin ekhon kono package restrict korte pare na. Feature ta backend-e
ache, UI-te pouchay na.

---

## Rules

1. `admin/pages/packages/` er existing structure-i maintain hobe —
   `schemas/package.schema.ts` → `queries/use-packages.ts` → `components/package-form.tsx`.
2. Teacher list `GET /administrator/teachers/?active=true` theke — **admin** endpoint,
   public ta na (admin inactive teacher-o dekhte pare, kintu assign-er jonno
   active-i chai).
3. `teacher_names` read-only — schema-r **input** e rakha jabe na, shudhu response type-e.
4. PATCH-e `teachers` **na pathale** backend purono list-i rakhe. Pathale **replace**
   kore (merge na). Form-e field-ta chhule-i puro list pathabo.

---

## Step-by-step

### Step 0 — Type + schema
**File:** `admin/types/admin.types.ts`, `admin/pages/packages/schemas/package.schema.ts`

- `AdminPackage`-e `teachers: string[]` + `teacher_names: string[]` add
- `PackageSchema`-e `teachers: z.array(z.string().uuid()).default([])`
- Doc comment-e sposhto: **khali = unrestricted**
- Create ar edit duita path-i ek-i schema use kore kina check korbo

**Done jokhon:** typecheck clean, form ekhono field dekhabe na.

---

### Step 1 — Package form-e teacher picker
**File:** `admin/pages/packages/components/package-form.tsx`

- `useTeachers({ active: true })` diye list
- Multi-select — project-e ekhon kono multi-select component ache kina age dekhbo;
  na thakle checkbox list (shodhu koyekta teacher, dropdown-er dorkar nai)
- Upore sposhto helper text: **"Leave empty to allow every teacher"**
- Edit form-e existing `teachers` prefill
- Loading/error state `AsyncStateWrapper` diye

**Done jokhon:** create + edit duitatei teacher assign kora jay, save hoy.

---

### Step 2 — Table-e restriction dekhao
**File:** `admin/pages/packages/components/packages-column.tsx`, `packages-table.tsx`

- Notun column "Teachers":
  - `teacher_names` khali → `All teachers` (muted badge)
  - na hole count + hover-e naam (`3 teachers`)
- Column ta chhoto rakhbo, table already chowra

**Done jokhon:** package list dekhei bojha jay kon ta restricted.

---

## Progress Log

| Step | Obostha | Tarikh | Ki korechi |
|---|---|---|---|
| 0 — Type + schema | ⬜ baki | — | — |
| 1 — Form picker | ⬜ baki | — | — |
| 2 — Table column | ⬜ baki | — | — |

---

## Round 1 theke ja backend source-e confirm kora (bodlano lagbe na)

- **`/administrator/leads/export/` kono filter mane na** — `funnel.py` → `LeadExportView`
  shoja `Lead.objects.iterator()` chalay. Tai param pathano bondho ache + UI-te
  amber warning ache. ✅
- **`/administrator/bookings/export/` filter mane** (`payment_status`, `from`, `to`). ✅
- **List envelope inconsistent keno** — teachers/admins hand-written `APIView`
  (`{success, results}`), packages/blogs/testimonials DRF `ListCreateAPIView`
  (bare array). Duita coding style, design decision na. `toList()` duitai dhore. ✅
- **`GET /administrator/students/:id/`** → `{ success, student, packages, sessions }` ✅
- **`POST /administrator/upload/`** → `permission_classes = [IsAuthenticated]`,
  **admin-only na** — student-o parbe. Response key gula external transfer
  service theke shoja spread hoy, tai `stored_path` ashe, doc-er `url`/`size` na. ✅

---

## Khola proshno

1. **Multi-select component ache?** `components/ui/` e dekhte hobe. Na thakle
   Step 1-e checkbox list-i korbo — shadcn theke notun component ana-r ageh bolbo.
2. **Restriction UI-te koto jorurot?** Ekhon shob seeded package unrestricted.
   Rosa/Mateo asholei senior-teacher-only package chan kina — product shidhanto.
   Kintu backend-e field ache, UI-te na thakle feature ta mora.
3. **20-class package-er price** ekhon-o unresolved (`create package.bru`-er note:
   spec $250.00, copy deck $254.64). Frontend-er kaj na, kintu launch-er age
   backend dev-ke mone koriye dite hobe.
