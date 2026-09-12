# Auth — Round 2 API Integration Plan

> **Ei file live progress tracker.** Proti step shesh e "Progress Log" update hobe.
> Scope: shudhu backend `f7ccf8b` → `63c01f5` er auth-related notun endpoint.

- **Source of truth:** [docs/bruno/student/registration/](../bruno/student/registration/) · [docs/bruno/authentication/](../bruno/authentication/)
- **Index:** [ROUND2_INDEX.md](ROUND2_INDEX.md)
- **Started:** 2026-09-12
- **Current step:** ✅ **Shob step (0–6) shesh**
- **Status:** complete

---

## Keno ei section age

Round 1-er tracker-e lekha chilo:

> *"Registration -- page + action ache, kintu backend-e registration endpoint **nai**.
> Notun student account shudhu `/public/bookings/checkout/` diye auto-create hoy"*

**Oi blocker ekhon nei.** Backend commit `46e48ae` (*"Add student registration"*)
puro flow diyeche:

| Method | Path | Ki kore |
|---|---|---|
| POST | `/student/registration/` | `User` (is_student) + `Student` profile **ek call-e** |
| POST | `/student/registration/verify-email/` | key verify → **puro login payload fire dey** |
| POST | `/student/registration/resend-email/` | notun confirmation link |
| POST | `/rest-auth/token/refresh/` | access token refresh |
| POST | `/api/token/verify/` | token ekhono valid kina |
| GET/PATCH/PUT | `/rest-auth/user/` | auth record (first/last name) |

---

## Ekhon-kar obostha vs backend

| Jinis | Ekhon frontend-e | Backend spec | Kaj |
|---|---|---|---|
| Register path | `POST /rest-auth/registration/` | canonical `POST /student/registration/` | path bodlao |
| Register body | `username`, `email`, `password1`, `password2` | `email`, `password1`, `password2`, `first_name` (**required**), `last_name`, `country`, `phone_number`, `timezone`, `current_spanish_level` | `username` bad, 6 ta field add |
| Register response | `data.detail` dhore toast | duita shape — `email_verification_required: true` (token nai) **othoba** `access`/`refresh`/`role`/`profile` | branch handle korte hobe |
| Confirm email | `POST /rest-auth/registration/account-confirm-email/` → 5s countdown → `/auth/signin` | `POST /student/registration/verify-email/` → **login payload fire dey** | session banao, shoja dashboard |
| Resend link | **nai** | `POST /student/registration/resend-email/` | notun UI |
| Token refresh | **nai** — access expire hole 401 → `destroySession()` | `/rest-auth/token/refresh/` | session e refresh token rakho |
| `/rest-auth/user/` | wired na | first/last name | Step 6-e shidhanto |

---

## Rules

1. Auth page gula **Pattern B** — `"use server"` action + `useActionState`. Ei
   niyom bhanga jabe na. (`CLAUDE.md` → Form Pattern)
2. Register + verify + resend **unauthenticated** → `publicApiClient` / raw axios
   in server action. `apiClient` na.
3. Registration-er response-e token thakle `CreateSession` dakte **hobe** —
   na dakle user register kore-o logged out thakbe.
4. `EMAIL_VERIFICATION_REQUIRED` backend env — frontend **janena**. Duita branch-i
   response dekhe handle korte hobe, hardcode kora jabe na.
5. Resend endpoint iccha kore ek-i 200 dey (email ache ba nai) — enumeration
   thekano. UI-te "email pathano hoyeche" type generic message-i dekhaite hobe,
   "ei email nai" bola jabe na.

---

## Step-by-step

### Step 0 — Types + schema base
**File:** `src/features/auth/types/auth.types.ts`, `src/types/domain.type.ts`

- `StudentRegistrationPayload` — spec-er 9 ta field, required/optional thik kore
- `RegistrationPendingResponse` = `{ success, email_verification_required: true, email, message }`
- `RegistrationLoggedInResponse` = login payload (`access`, `refresh`, `user`, `role`, `profile`, `message`)
- `StudentRegistrationResponse` = duitar union + ek ta narrowing helper
  (`"access" in res`)
- `VerifyEmailResponse` = login payload-i
- `ResendVerificationResponse` = `{ success, message }`
- `SpanishLevel` already `domain.type.ts` e ache — reuse, notun kore likhbo na

**Done jokhon:** typecheck clean, kono UI file touch kori nai.

> **✅ Shesh — ja jana gelo:**
> - Login (`sign-in.action.ts`) puro untyped (`data?.access` etc). Verify-email
>   hubohu ek-i payload dey, tai `AuthSuccessResponse` ek jaygay likhe duitatei
>   use kora jabe — Step 3-e sign-in-o type kore dile bhalo.
> - Plan-e `/dashboard/customer` lekha chilo — asol route **`/dashboard/student`**
>   (folder rename hoye gese). Ei file-e thik kora holo.
> - `RegistrationType.errors.username` **ekhono ache**, `@deprecated` mark kora —
>   shorale Step 1/2-er file 3 jaygay typecheck bhenge jay. **Step 1-e muchte hobe.**

---

### Step 1 — Registration schema + server action
**File:** `src/features/auth/pages/registration/schemas/registration.schema.ts`,
`.../actions/registration.action.ts`

- Schema theke `username` bad
- `first_name` required; `last_name`, `country`, `phone_number` optional
- `password1` min 8 (backend Django validator-o chalabe — server error map korte hobe)
- `password2` `.refine()` diye match check
- `timezone` optional; **default browser-er zone** (`Intl.DateTimeFormat().resolvedOptions().timeZone`)
- `current_spanish_level` enum, default `"none"`
- Action-e URL `/student/registration/`
- Response branch:
  - token ache → `CreateSession(...)` → `{ success: true, redirectTo: "/dashboard/student" }`
  - token nai → `{ success: true, verificationRequired: true, email }`
- Error map: backend field-wise array dey (`email`, `password1`…) — ekhon-kar
  `getRegistrationErrors` `username` dhore, seta `first_name`/`last_name`-e bodlao

**Done jokhon:** typecheck clean; form ekhono purono field dekhabe (Step 2-e thik hobe).

> **✅ Shesh — ja jana gelo:**
> - **Khali string backend-e pathano jabe na.** Khali `<input>` theke FormData
>   `""` pathay, ar `timezone: ""` ba `current_spanish_level: ""` dile backend
>   **400** dey. Tai `omitEmpty()` diye pathanor age chhente fela hoy.
> - **Password min 6 chilo, backend chay 8** — schema-te thik kora holo. Kintu
>   Django-r baki validator (email-er shathe mil, common password, shudhu number)
>   shudhu server-e dhora pore, tai `password1` error map kora achhe.
> - `SPANISH_LEVEL_OPTIONS` `marketing/schemas/checkout.schema.ts` e chilo. Auth
>   theke marketing-e import kora mane duita domain jodiye fela — tai
>   **`src/constants/spanish-levels.ts`** e shorano holo, checkout oikhan theke
>   re-export kore.
> - ⚠️ **`RegistrationType.errors.username` ekhono ache.** Action theke gese,
>   kintu `registration.form.tsx` ekhono dhore ache. **Step 2-e muchte hobe** —
>   ager step-e ami "Step 1-e muchbo" likhechilam, oita vul chilo; form Step 2-er kaj.

---

### Step 2 — Registration form UI
**File:** `.../registration/components/registration.form.tsx`

- `username` input shoriye `first_name` + `last_name`
- Optional: country, phone, spanish level select (`SPANISH_LEVEL_OPTIONS` marketing
  checkout theke reuse kora jay kina dekhbo — na hole shared kori)
- Timezone hidden input, mount-e browser zone bosano
- Submit-er por:
  - `verificationRequired` → `/auth/verify-email?email=...` (email query-te, resend-er jonno)
  - session toiri → `router.push("/dashboard/student")`
- Ekhon `router.push("/auth/verify-email")` hardcoded — oita branch-based korte hobe

**Done jokhon:** registration page-e notun field dekhay, typecheck + eslint clean.

> **✅ Shesh — ja jana gelo:**
> - Timezone-ta `useState` e rakhi nai. Browser zone shudhu client-e jana jay, tai
>   state rakhle SSR-e khali → client-e bhora = hydration mismatch, ar repo-te
>   `set-state-in-effect` lint rule-o ache (age confirm-email-e ei ta-i dhorechilo).
>   Hidden input-e `ref` diye DOM value boshano hoyeche — extra render nai, lint nai.
>   Kono karone khali theke gele action-e strip hoye jabe, backend school zone dhorbe.
> - Select-er jonno `components/ui/native-select.tsx` use kora hoyeche — Pattern B
>   (server action + FormData) e plain `<select>`-i thik, Radix `select.tsx` controlled
>   state chay ar FormData-te value dey na.
> - `RegistrationType.errors.username` **muche fela hoyeche** — ar kono file oita dhore nai.

---

### Step 3 — Verify email page (confirm-email rewrite)
**File:** `src/features/auth/pages/confirm-email/index.tsx`

- Path `/rest-auth/registration/account-confirm-email/` → `/student/registration/verify-email/`
- Success response **login payload** — mane:
  - Server action-e niye giye `CreateSession` dakte hobe (client theke httpOnly
    cookie set kora jabe na)
  - Tai ek ta chhoto `"use server"` action lagbe: `VerifyEmailAction(key)`
- Success-e "Go to Sign In" er bodole **shoja `/dashboard/student`**, countdown 3s
- 400 → "link invalid ba expire" + **Resend button** (Step 4)

⚠️ Ekhon ei page `unAuthorizedApiClient.post` client theke dake. Session banate
hobe bole server action-e shorate hobe — eta structural change, chhoto na.

**Done jokhon:** verify link click korle logged-in obosthay dashboard-e pouchay.

> **✅ Shesh — ja jana gelo:**
> - Route ta `/auth/email/confirm/[token]` — bru doc-e AccountAdapter ja bole
>   (`{{frontend_url}}/auth/email/confirm/<key>`) tar shathe **already mile jay**.
>   Backend-e kichu bodlate hobe na.
> - Success-er por `router.refresh()` dakte hoy `push()` er age. Action notun
>   session cookie boshay, kintu layout-er RSC cache-e purono (logged-out)
>   session thake — refresh na dile protected route khali dekhabe.
> - Error state-e "Send me a new link" button `/auth/verify-email` e pathay.
>   Key single-use, tai fail korle notun link-i ekmatro poth. Oi page-e asol
>   resend form Step 4-e boshbe.
> - `success-e /auth/signin` er purono countdown baad — user tokhon **already
>   logged in**, take login page-e pathanor kono mane nai.

---

### Step 4 — Resend verification
**File:** `src/features/auth/pages/verify-email/` (+ confirm-email er error state)

- `POST /student/registration/resend-email/` — `useMutationHandler`, body `{ email }`
- `/auth/verify-email` page-e email query param theke prefill; na thakle input
- Generic success message — backend-er message-i dekhao, "email nai" bolbo na
- Rate-limit nai, tai button-e 30s cooldown (client-side) rakhbo

**Done jokhon:** verify-email page theke notun link chaite para jay.

> **✅ Shesh — ja jana gelo:**
> - **Server action na, `useMutationHandler`.** Baki auth page gula Pattern B
>   karon tara session banay; resend kono session banay na, tai httpOnly cookie-r
>   dorkar nai. Shadharon public mutation — project-er normal pattern-i thik,
>   ar `isPending` binamulye pawa jay.
> - **Backend-er message hubohu dekhano hoy.** Response iccha kore ambiguous
>   ("If that address needs confirming…") — email registered kina faash na korar
>   jonno. Nijer theke "sent!" ba "email nai" lekha mane oi protection-ta noshto kora.
> - Backend-e rate limit nai, tai **30s cooldown client-e** rakha hoyeche.
> - `?email=` na thakle input khali thake — expired link theke ashle emon-i hobe.

---

### Step 5 — Token refresh
**File:** `src/features/auth/utils/session.ts`, `src/lib/http/api-client.ts`

- Login/verify response-e `refresh` ashe — ekhon **feled dicchi**. Session-e rakhte hobe
- `apiClient` response interceptor ekhon 401-e shoja `destroySession()` —
  seta `POST /rest-auth/token/refresh/` try korbe, fail korle-i destroy
- Infinite loop thekate: refresh call-ta interceptor bypass korbe, ar ek bar-er
  beshi retry korbe na
- `POST /api/token/verify/` — layout-e session valid kina check korar jonno
  (optional; refresh thakle eta lage na — Step 5-e shidhanto nebo)

⚠️ Eta touch korle **shob logged-in user-er session behaviour bodlabe**. Ei step
alada kore test kora lagbe (`INTEGRATION_TEST.md`-e ek ta phase add hobe).

**Done jokhon:** access expire hole chup-chap refresh hoy, user logout hoy na.

> **✅ Shesh — ja jana gelo (ei step-e shobcheye boro abishkar):**
> - 🔴 **`api-client.ts` e duita 401 interceptor chilo.** Prothom ta 401 dekhlei
>   `destroySession()` dito; tar pore-r ta refresh korar cheshta korto. Axios
>   register-er order-e chole, tai **prothom ta age-i session muche dito ar
>   refresh-er code-e kokhono pouchato na** — mane access token expire howa
>   mane-i logout. Refresh-er puro block-ta **dead code** chilo.
>   `api-server.ts` e oi interceptor **comment kora** chilo — keu ek bar
>   dhorechilo, kintu shudhu server-side-e thik korechilo.
> - **Amar plan-e `/rest-auth/token/refresh/` e jete bola chilo — oita vul.**
>   Bru doc nijei bole: *"Pick one and stay with it; `/get-access-token/` is the
>   one the rest of this collection uses."* Tai purono path-i rakha holo.
> - Response-e **shudhu `access`** ashe, refresh token rotate hoy na — tai purono
>   refresh token rekhe deya hoy.
> - **Single-flight shudhu client-e.** Page load-e 4-5 ta query ek shathe jay;
>   expire thakle shob 401 khay ar guard chara protyek-ta alada refresh korto.
>   Browser-e module state per-tab bole eta nirapod. **Server-e kora jabe na** —
>   oikhane module state shob request-e share hoy, ek user-er promise onno
>   user-er kache chole jeto.

---

### Step 6 — `/rest-auth/user/` — shidhanto
**File:** shidhanto-r upor

- `GET /rest-auth/user/` shudhu `pk`, `username`, `email`, `first_name`, `last_name`
- `GET /student/me/` already **beshi** dey (name, country, timezone, level, img)
  ar oita already integrated
- **Amar mot: skip.** Duita source-e ek-i naam rakhle drift hobe
- Shudhu tokhon lagbe jodi first/last name alada kore edit korte hoy — student
  profile page-e `name` ek ta field, split na
- Ei step-e shudhu jachai kore plan file-e "skipped, karon X" likhbo

**Done jokhon:** shidhanto ei file-e lekha.

> **✅ Shesh — shidhanto: SKIP, wire kora hoy nai.**
>
> Backend-er nijer doc-i eta bole:
> - `GET /rest-auth/user/` → *"For anything role-aware prefer the payload from
>   **login**, or `GET /student/me/`… This is kept because dj-rest-auth routes it
>   and some clients expect it."*
> - `PATCH /rest-auth/user/` → *"Changing the name here **does not rename the
>   student in the admin dashboard**, so prefer `/student/me/`."*
>
> Mane eta wire korle ek ta **dwitiyo naam** toiri hoto ja admin dashboard-e
> dekhato na — chup-chap drift. `/student/me/` already integrated ar beshi dey.
> Ei endpoint tokhon-i lagbe jodi `first_name`/`last_name` alada kore edit korar
> dorkar hoy, kintu student profile-e `name` ek-ta-i field.
>
> **Ei step-e ek ta bug dhora porlo:** `sign-in.action.ts` session-e
> `name: data.user.username` boshato, kintu backend-e **`username` asole email**
> (`"username": "master@vidaverde.test"`). Tai login korle sidebar-e naam-er
> jaygay-o email dekhato. Asol naam `profile.name` e — login response-e eta
> 2026-09-05 e joda hoyeche, amra dhori ni. Thik kore deya holo, ar login
> response-ta `AuthSuccessResponse` diye type kora holo (Step 0-e eta note kora chilo).

---

## Progress Log

| Step | Obostha | Tarikh | Ki korechi |
|---|---|---|---|
| 0 — Types | ✅ done | 2026-09-12 | `auth.types.ts` — `AuthSuccessResponse` (login/verify ek-i payload), `StudentRegistrationPayload`, `RegistrationPendingResponse`, union + `isAuthSuccess()` narrowing helper, `VerifyEmailResponse`, `ResendVerificationResponse`. `RegistrationType.errors` notun field-e bodlano. `SpanishLevel` `domain.type.ts` theke reuse. |
| 1 — Register schema + action | ✅ done | 2026-09-12 | `registration.schema.ts` (username bad, 6 notun field, min 8), `registration.action.ts` (path `/student/registration/`, duita response branch, khali value strip), notun `src/constants/spanish-levels.ts` |
| 2 — Register form UI | ✅ done | 2026-09-12 | `registration.form.tsx` — `username` input bad, `first_name`/`last_name`/`country`/`phone_number`/level select add, hidden timezone (ref diye), branch-based redirect. `RegistrationType.errors.username` **muche fela hoyeche**. |
| 3 — Verify email | ✅ done | 2026-09-12 | Notun `confirm-email/actions/verify-email.action.ts` (server action, session banay), `confirm-email/index.tsx` rewrite — client axios bad, success-e shoja dashboard, error-e "Send me a new link". `VerifyEmailState` type add. |
| 4 — Resend | ✅ done | 2026-09-12 | Notun `verify-email/queries/use-resend-verification.ts` + `components/resend-verification-form.tsx` (30s cooldown), `verify-email/index.tsx` + route-e `?email=` prefill |
| 5 — Token refresh | ✅ done | 2026-09-12 | `api-client.ts` rewrite — **duplicate 401 interceptor mucha** (eta-i refresh block korchilo), single-flight guard, `_retry` loop guard. `api-server.ts` e dead code mucha + keno single-flight nai ta documented. `INTEGRATION_TEST.md` e Phase J add. |
| 6 — `/rest-auth/user/` shidhanto | ✅ done | 2026-09-12 | **Skip kora holo** (karon niche). Ei step-e sign-in-er ekta bug dhora porlo — `sign-in.action.ts` e session `name` thik kora + `AuthSuccessResponse` diye type kora. |

---

## Khola proshno — **backend source theke uttor deya holo (2026-09-12)**

### 1. `EMAIL_VERIFICATION_REQUIRED` on na off? → ✅ **ON (default `True`)**

`server/.env.example:22` → `EMAIL_VERIFICATION_REQUIRED=True`, ar `AGENTS.md`:

> *"`True` (default) sends a confirmation link and blocks login until it is
> clicked; `False` issues tokens immediately."*

Mane **Step 3/4 (verify + resend) ta-i live path**. Registration-er "token ashe"
branch ta shudhu tokhon-i chalbe jodi keu iccha kore off kore.

⚠️ **Ar ekta jinis backend doc-e ache ja jana dorkar:**

> *"Verification is an explicit state, not a missing record. Only registration
> creates an `EmailAddress` row. Admins, seeded users and checkout students have
> none… so `is_email_verified()` treats 'no row' as verified."*

Mane **guest checkout-e banano account ar seeded user — tara verified hisebe
gonno hoy**, tader verify korte hoy na. Shudhu `/student/registration/` diye
banano account-i link click korar jonno atke thake. Test korar shomoy eta mathay
rakhte hobe — purono account diye verify flow test kora jabe na.

### 2. 🔴 Token refresh ekhon-kar setting-e **kokhono kaj korbe na**

`server/server/settings.py:175`:

```python
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(days=30),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=30),
    "ROTATE_REFRESH_TOKENS": False,
    ...
}
```

Duita token-i **30 din**, ar rotate hoy na — mane duita-i login-er ek-i muhurte
issue hoy ar **ek-i shomoy expire kore**. Access token morar din refresh token-o
mora. Tai refresh call ta 401 khabe ar shoja logout hobe — thik jemon purono
buggy code korto.

Tar upor amader session cookie `SESSION_MAX_AGE_DAYS=15` — mane **15 din-e-i user
logout hobe**, token gula (30 din) chhoar age-i. Refresh path-e pouchano-i jabe na.

**Step 5-er code vul na** — oita thik, ar interceptor-er bug-ta sotti chilo. Kintu
**ekhon-kar setting-e oi code kokhono chalbe na**, ar "token expire hole logout"
shomoshha ta-o asholei ghote na.

**Backend dev-ke bolar jinis:** refresh token-er mane-i hocche access token chhoto
hobe. Standard: `ACCESS_TOKEN_LIFETIME` 15-60 minute, `REFRESH_TOKEN_LIFETIME`
30 din. Tahole Step 5-er code kaje lagbe ar Phase J test-o kora jabe.

### 3. Guest checkout-e banano email-e abar register?

Ekhon-o live-e jachai kora hoy ni. `register.bru` bole "must not already exist --
including an account created earlier by a guest checkout", tai 400 asha uchit.
Step 1-e error map kora ache; asol message ta test-e dekhe nite hobe.

### 4. Google OAuth (`/rest-auth/google/`)

Ekhon-o wired na — ei round-er scope-e rakha hoy nai. Chaile alada step.
