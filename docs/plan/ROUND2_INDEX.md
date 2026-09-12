# Round 2 — Notun API Integration (index)

> Round 1-e (`f3eeda0` → `f7ccf8b`) student, admin, public tinta section-i real
> API-te chole gese. Ei folder-er Round 2 plan gula **shudhu** backend commit
> `f7ccf8b` → `63c01f5` e ja notun eseche, tar jonno.
>
> Changelog: [docs/api-changes/2026-09-12_15-37_f7ccf8b-to-63c01f5.md](../api-changes/2026-09-12_15-37_f7ccf8b-to-63c01f5.md)

- **Started:** 2026-09-12
- **Backend commit:** `63c01f5`
- **Status:** ✅ **complete — 18/18 step shesh** (2026-09-12). Kono step browser-e test kora hoy nai; checklist `HANDOFF.md` e.

---

## ⚠️ Age eta poro — "Added" list-er 90% kaj na

Changelog-e **61 ta "Added"** dekhabe. Ghabrano jabe na — tar beshirbhag-i
**bru file split**, notun endpoint na.

Age ek ta `teachers.bru`-te GET/POST/PUT/PATCH/DELETE shob ek shathe lekha chilo.
Backend dev proti method-ke alada file kore diyeche (`create teacher.bru`,
`update teacher.bru`, `deactivate teacher.bru`…). Sync script file dhore
dhore compare kore, tai proti ta "notun" mone hoyeche.

**Ei gula shob Round 1-e already integrated:**

| Group | File | Obostha |
|---|---|---|
| admin teachers / packages / blogs / testimonials / admins / time-off er CRUD | 25+ ta split file | ✅ done |
| `/administrator/leads/export/` | `leads export.bru` | ✅ done |
| `/administrator/students/:id/`, `/sessions/:id/` | detail file | ✅ done |
| `/public/blogs/categories/`, `/public/contact/subjects/` | split | ✅ done |
| `/public/blogs/:slug/`, `/public/packages/:id/`, `/public/teachers/:id/` | split | ✅ done |
| `GET`/`PATCH` `/student/me/` | split | ✅ done |
| `authentication/legacy/*` | purono dj-rest-auth path | ⏭️ skip — canonical path use korchi |

Verify korte chaile: `grep -rn "<path>" src/`.

---

## Asol notun kaj — 4 ta section

| Section | Plan file | Step | Keno dorkar | Priority |
|---|---|---|---|---|
| **Auth** | [ROUND2_AUTH_INTEGRATION.md](ROUND2_AUTH_INTEGRATION.md) | ✅ 7/7 shesh | Student registration backend-e **ekhon ache** — ager blocker khule gese | ✅ done |
| **Public** | [ROUND2_PUBLIC_INTEGRATION.md](ROUND2_PUBLIC_INTEGRATION.md) | ✅ 5/5 shesh | Booking flow order bodleche + package-e teacher restriction | ✅ done |
| **Student** | [ROUND2_STUDENT_INTEGRATION.md](ROUND2_STUDENT_INTEGRATION.md) | ✅ 3/3 shesh | Portal-e teacher picker restriction mane na → 400 khabe | ✅ done |
| **Admin** | [ROUND2_ADMIN_INTEGRATION.md](ROUND2_ADMIN_INTEGRATION.md) | ✅ 3/3 shesh | Package-e teacher assign korar UI nai | ✅ done |

**Mot 18 ta step.**

---

## Kivabe cholbe (Round 1-er moto)

1. Tumi bolba **"next"** → ami **ek ta step** korbo, ar kichu na.
2. Step shesh e oi section-er plan file-er **Progress Log** update hobe — ki
   korechi, kon file touch korechi, ki baki.
3. Build na, shudhu `npx tsc --noEmit` (typecheck) + oi folder-er eslint.
4. Ek section shesh hole porer section, upor-er priority order-e.
5. Section bodlate chaile bolo — "public ta age koro" — ami oi file dhorbo.

**Ekhon kothay:** ✅ **Char ta section-i shesh, 18/18.** Porer kaj code lekha na — **manual testing**. Order ar checklist `HANDOFF.md` e.

---

## Keno ei order

**Auth age**, karon:
- Round 1-er `PROGRESS_TRACKER.md`-e lekha chilo *"backend-e registration endpoint **nai**"* — ekhon `POST /student/registration/` ache. Oi blocker-ta-i shobcheye purono.
- Ekhon-o `/rest-auth/registration/` (legacy path) e `username` pathacchi, ja notun spec-e **nei-i**. Mane registration form ekhon-o thik na.
- `verify-email` success-e backend puro login payload (access/refresh/role/profile) dey — mane email confirm korle **shoja dashboard-e** dhukiye deya jay, "abar sign in koro" bolte hobe na.

**Tarpor public**, karon booking flow-er order bodleche (teacher→package→slot theke package→teacher+slot) — eta UI-r shobcheye boro change, ar student/admin duitar restriction feature ei flow-er upor dariye.

---

## Backend-ke bolar jinis

1. `docs/bruno/administrator/upload.bru` doc-e `url` ar `size` lekha, kintu live
   API `stored_path` ar `compression_started` dey. Doc ta thik korte bolo.
   (Verified: `server/utils/upload.py` external transfer service-er JSON shoja
   spread kore, tai Django-r nijer kono key nai.)
2. `GET /administrator/leads/export/` kono query param mane na (`Lead.objects.iterator()`),
   kintu `bookings export` mane. Ek rokom kora jay kina jigges koro.
