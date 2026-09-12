# Admin Dashboard — Round 2 API Integration Plan

> **Ei file live progress tracker.** Proti step shesh e "Progress Log" update hobe.
> Scope: shudhu backend `f7ccf8b` → `63c01f5` er admin-side notun jinis.
> Round 1-er kaj: [ADMIN_API_INTEGRATION.md](ADMIN_API_INTEGRATION.md)

- **Source of truth:** [docs/bruno/administrator/](../bruno/administrator/)
- **Index:** [ROUND2_INDEX.md](ROUND2_INDEX.md)
- **Started:** 2026-09-12
- **Current step:** ✅ **Shob step (0–2) shesh**
- **Status:** complete

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

> **✅ Shesh — ja jana gelo:**
> - Create ar edit duita path-i ek-i `PackageSchema` use kore, tai ek jaygay
>   field add korlei duitatei chole eseche.
> - `teacher_names` **schema-te rakha hoy nai** — read-only. Rakhle form submit-e
>   backend-e chole jeto.
> - `edit-package-page.tsx` er `toFormValues()` iccha kore shudhu form-er field
>   gula tule ney (computed `title`/`description`/`lang` bad) — oi pattern-e
>   `teachers` joda kora holo.
> - Default `[]` = **unrestricted**, mane notun package purono behaviour-i rakhe.

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

> **✅ Shesh — ja jana gelo:**
> - ❓ **Khola proshno 1-er uttor: multi-select component nai.** `components/ui/`
>   e shudhu `checkbox.tsx` ar `popover.tsx` — `command`/`combobox` nai. Teacher
>   hate gona koyekjon, tai checkbox list-i kora holo, notun shadcn component ana
>   hoy nai.
> - **Helper text duita obostha alada kore bole.** Khali hole: *"Every teacher can
>   be booked with this package"*. Select thakle: *"Limited to N teachers. Untick
>   them all to allow everyone again."* — "0 selected" dhoroner lekha thakle admin
>   ulta bujhto.
> - `active: true` — deactivated teacher assign korar mane nai.
> - PATCH-e backend list ta **replace** kore (merge na), tai form shobshomoy puro
>   list pathay — `form.Field` niজei ta kore, alada kichu korte hoy nai.
> - `to-list.ts` er comment-e lekha chilo shape "nishchit na". Backend source
>   theke ager ei session-e confirm kora hoyechilo, tai comment-ta update kore
>   asol karon likhe deya holo (duijon dui style-e likheche).

---

### Step 2 — Table-e restriction dekhao
**File:** `admin/pages/packages/components/packages-column.tsx`, `packages-table.tsx`

- Notun column "Teachers":
  - `teacher_names` khali → `All teachers` (muted badge)
  - na hole count + hover-e naam (`3 teachers`)
- Column ta chhoto rakhbo, table already chowra

**Done jokhon:** package list dekhei bojha jay kon ta restricted.

> **✅ Shesh — ja jana gelo:**
> - Khali obosthay **"All teachers"** lekha hoy — **"0" ba "None" na**. Table-e
>   "0" dekhle admin bhabto package ta mora. Ei ek-i shidhanto form-er helper
>   text-eo (Step 1).
> - Naam gula `title=` attribute-e — column chhoto rakhte hoy, table already chowra.
> - `teacher_names` (read-only echo) pora hoy, `teachers` (uuid) na — table-e
>   naam dorkar, id na.

---

## Progress Log

| Step | Obostha | Tarikh | Ki korechi |
|---|---|---|---|
| 0 — Type + schema | ✅ done | 2026-09-12 | `admin.types.ts` e `teachers` + `teacher_names`, `package.schema.ts` e `teachers` (default `[]`), `package-form.tsx` + `edit-package-page.tsx` er defaultValues |
| 1 — Form picker | ✅ done | 2026-09-12 | Notun `packages/components/teacher-picker.tsx` (checkbox list, `active: true`, sposhto helper text), `package-form.tsx` e `teachers` field. `to-list.ts` er comment backend source diye update |
| 2 — Table column | ✅ done | 2026-09-12 | `packages-column.tsx` e "Teachers" column — khali hole "All teachers", na hole count badge + hover-e naam |

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
