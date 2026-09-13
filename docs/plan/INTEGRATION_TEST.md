# Vida Verde — Integration Test (manual)

Ek taana flow: **Admin → Public → Student → abar Admin**. Ek jaygay kora kaj onno
jaygay dekhacche kina — sheta-i ei test-er mul uddeshyo.

- **Niyom:** upor theke niche ek taana koro. Ek step-er data porer step-e lage.
- **Field-by-field test na** — "ei section-e banalam, oi section-e dekhacche to?"
- Fail hole `Result` column-e likhe rakho, thik korar por abar chalao.

> **Round 2-er por update kora (2026-09-13).** Ja bodleche:
> - **Phase D puro notun kore lekha** — booking flow-er order bodle geche
>   (age teacher→package→slot, ekhon **package→teacher+time**), 5 step theke 4 step.
> - **Notun phase K, L, M** — package teacher-restriction, teacher-first booking
>   entry, ar registration/email-verification.
> - **Phase J (token refresh) ekhon blocked** — backend setting na bodlale chalano jabe na.
> - Purono "known limitation" table-e duita jinis **vul chilo**, thik kora holo.

---

## 0. Shuru korar age

```bash
npm run dev
```

Backend cholte hobe ar `.env`-er `BACKEND_URL` shei server-e point korte hobe.

| Ki | Value |
|---|---|
| Admin login | `/auth/signin` → `master@vidaverde.test` / `vidaverde123` |
| Student login | `/auth/signin` → checkout-e banano account (password email-e jabe) |
| Admin dashboard | `/dashboard/admin` |
| Student dashboard | `/dashboard/student` |

> ⚠️ **Login-er por nijei dashboard-e jabe na** — redirect lekha nai. Toast dekhle URL-e
> manually `/dashboard/admin` likho.
>
> ⚠️ **Local http-e cookie na-o boshte pare** (`session.ts` e `secure: true`). Login
> "successful" dekhiyeo data na ashle ei karone.

**Test data-r naam ekটu alada rakho** (jemon "TEST Teacher A") — pore public-e khuje
pete shubidha hobe.

---

## Phase A — Admin-e base data banao

| # | Route | Ki korbe | Ki dekhbe | ☐ | Result |
|---|---|---|---|---|---|
| A1 | `/dashboard/admin/teachers/create` | Teacher banau — naam, tag, bio (English), ar **weekly availability** (jemon Mon–Fri 08:00–16:00), Active + Accepting students on | Save-er por teacher list-e ashbe, "Weekly hours" column-e din-er shonkha dekhabe | ☐ | |
| A2 | `/dashboard/admin/packages/create` | Package banau — English title, price (jemon `50.00`), classes `5`, validity `90`, Active on. **"Bookable with" section-e kichu tick koro NA** | Package list-e ashbe. "Teachers" column-e **"All teachers"** lekha thakbe (khali = shobai, "keu na" **na**) | ☐ | |
| A3 | `/dashboard/admin/testimonials/create` | Testimonial banau — student naam, country, outcome (English), rating 5, **Shown** on | List-e "Shown" badge shoho ashbe | ☐ | |
| A4 | `/dashboard/admin/blogs/create` | Blog banau — English title + body, category select, status **Draft** | List-e "Draft" badge shoho ashbe | ☐ | |
| A5 | `/dashboard/admin` | Dashboard kholo | Teachers/Students-er shonkha ar niche "Next classes" list dekhabe (ekhon khali thakte pare) | ☐ | |

---

## Phase B — Public-e oigula dekhacche kina

| # | Route | Ki korbe | Ki dekhbe | ☐ | Result |
|---|---|---|---|---|---|
| B1 | `/courses` | Pricing section dekho | **A2-er package** card-e ache, price thik | ☐ | |
| B2 | `/online-classes` | Teacher section dekho | **A1-er teacher** ache, "Accepting new students" badge | ☐ | |
| B3 | `/` (homepage) | Teacher + testimonial section dekho | A1-er teacher ar **A3-er testimonial** carousel-e ache | ☐ | |
| B4 | `/blog` | Blog list dekho | **A4-er draft post ta NAI** (draft public-e ashar kotha na) | ☐ | |
| B5 | `/dashboard/admin/blogs` | A4-er post-e **Publish** click koro | Badge "Published" hobe | ☐ | |
| B6 | `/blog` | Refresh koro | Ekhon post ta **ache**, category badge + reading time dekhabe | ☐ | |
| B7 | `/blog` | Oi post-er **category pill**-e click koro | Shudhu oi category-r post thakbe, page 1-e fire jabe | ☐ | |
| B8 | `/blog` → post-e click | Detail page kholo | Title, body, related posts dekhabe. **404 na** | ☐ | |
| B9 | `/blog/vul-slug-likhe-dekho` | Emon ekta slug likho ja nai | **404 page** dekhabe (khali page na, crash na) | ☐ | |

---

## Phase C — Public form → Admin-e ashe kina

| # | Route | Ki korbe | Ki dekhbe | ☐ | Result |
|---|---|---|---|---|---|
| C1 | `/` (homepage) | Lead/guide form-e naam + email dao, GDPR tick kore submit | Success message dekhabe (page crash na) | ☐ | |
| C2 | `/dashboard/admin/leads` | Leads kholo | **C1-er email** list-e ache, source ar GDPR column thik | ☐ | |
| C3 | `/contact` | Contact form bhoro — naam, email, subject dropdown theke select, message | Success message dekhabe | ☐ | |
| C4 | `/dashboard/admin/enquiries` | Enquiries kholo | **C3-er message** ache, status "Open" | ☐ | |
| C5 | `/dashboard/admin/enquiries` | Oi row-e **Read** → note likho → Save → tarpor **Mark handled** | Note save hobe, badge "Handled" hobe | ☐ | |
| C6 | `/dashboard/admin` | Dashboard-e fire jao | "Unhandled enquiries" shonkha **ek kome geche** | ☐ | |

---

## Phase D — Public booking (checkout)

> 🔁 **Ei phase Round 2-e puro bodle geche.** Booking ekhon **package age, tarpor
> teacher** — backend-er documented order. Teacher ar somoy **ek-i screen-e**, karon
> ek call-e duita-i ashe. 5 step theke **4 step**.

| # | Route | Ki korbe | Ki dekhbe | ☐ | Result |
|---|---|---|---|---|---|
| D1 | `/courses` | Pricing card-e A2-er package dekho | Price-er niche **"N teachers available"** lekha (`teacher_count`) | ☐ | |
| D2 | `/online-classes/book` | Step 1 — **A2-er package** select koro | Card select hobe, Continue enable | ☐ | |
| D3 | — | Continue → Step 2 **"Teacher & Time"** | Upore "Show availability from" date + **"Window" dropdown (7/14/21 din)**. Niche **A1-er teacher** card-e **"Next available: <din> <time> · N slots"** | ☐ | |
| D4 | — | Teacher card-e click koro | Ek-i screen-er **niche** slot gula khule jabe — **notun kono loading nai** (slot age theke-i eshe geche) | ☐ | |
| D5 | — | Ekta slot select kore Continue | Step 3-e jabe | ☐ | |
| D6 | — | Step 3 — first name + **notun ekta email** (ja age use koro nai) + Spanish level dao | Continue kaj korbe | ☐ | |
| D7 | — | Step 4 — Review dekho | **Kono Card Number / CVC field NAI** (ichchhe kore shorano) | ☐ | |
| D8 | — | **Confirm booking** click | Confirmation page: teacher, package, date/time, **invoice number**, amount, classes remaining, ar "Join on Google Meet" link | ☐ | |
| D9 | — | Confirmation-e note dekho | Notun email diyechile bole **"We created your student account"** note thakbe | ☐ | |

### Khali window-er behaviour — alada kore dekho

| # | Route | Ki korbe | Ki dekhbe | ☐ | Result |
|---|---|---|---|---|---|
| D10 | `/online-classes/book` | Step 2-e date ta **onek dur-e** dao (jemon 3 mash pore, jekhane teacher-er availability nai) | Message: **"No one has a free slot in the next 7 days from this date"** + "this package is still available to book". ⚠️ **"No teachers" jeno NA bole** | ☐ | |
| D11 | — | Window dropdown **14** ba **21** koro | List abar bodlabe (window barale teacher fire ashte pare) | ☐ | |

> **Keno eta alada kore test korchi:** jei teacher-er oi window-e ekta-o slot nai,
> backend take **list theke bad diye dey**. Tai khali list mane *"ei koy din-e keu
> free nai"* — *"package-e teacher nai"* **na**. UI-te ei duita alada kore bola hoy;
> na hole visitor bhabto package ta noshto.

---

## Phase E — Booking ta admin-e fire eseche kina

| # | Route | Ki korbe | Ki dekhbe | ☐ | Result |
|---|---|---|---|---|---|
| E1 | `/dashboard/admin/bookings` | Bookings kholo | **D-er purchase** ache — student naam/email, package, amount, "Paid", classes used/total | ☐ | |
| E2 | `/dashboard/admin/students` | Students kholo | **D5-er student** ache | ☐ | |
| E3 | `/dashboard/admin/students` | Oi student-er **View** e click | Profile + Packages + Classes tinta section-e data dekhabe | ☐ | |
| E4 | `/dashboard/admin/sessions` | Upcoming tab | **D-te book kora class ta** ache — student, teacher, package, school time | ☐ | |
| E5 | `/dashboard/admin/calendar` | Oi month-e jao | Class ta calendar-e ache, teacher-er rong-e | ☐ | |
| E6 | `/dashboard/admin/calendar` | Teacher dropdown theke **onno teacher** select koro, tarpor abar "All teachers" | Filter kaj korbe, ar **A1-er teacher-er rong bodlabe na** | ☐ | |
| E7 | `/dashboard/admin/emails` | Email outbox kholo | Booking confirmation / credentials / reminder — ei rokom row ache | ☐ | |
| E8 | `/dashboard/admin` | Dashboard | Students, Revenue (30 days), Upcoming classes — shonkha bereche | ☐ | |

---

## Phase F — Student portal

Student email-e paওয়া password diye `/auth/signin` → tarpor URL-e `/dashboard/student`.

| # | Route | Ki korbe | Ki dekhbe | ☐ | Result |
|---|---|---|---|---|---|
| F1 | `/dashboard/student` | Dashboard kholo | **"Next class"** card-e D-er class ta — teacher, package, time, Join button | ☐ | |
| F2 | `/dashboard/student/my-packages` | My Packages | **A2-er package** Active section-e, progress bar ar classes remaining thik | ☐ | |
| F3 | `/dashboard/student/invoices` | Invoices | **E1-er invoice number** ta ache, amount thik (crash/NaN na) | ☐ | |
| F4 | `/dashboard/student/invoices` | **PDF** button click | Asol PDF download hobe (`<invoice-number>.pdf`), kholle PDF-i hobe | ☐ | |
| F5 | `/dashboard/student/calendar` | Calendar | Class ta thik date-e, ar upore timezone label | ☐ | |
| F6 | `/dashboard/student/calendar` | Class chip-e click | Dialog-e teacher, status, time, package + Join link | ☐ | |
| F7 | `/dashboard/student/book-class` | Package select → teacher → slot → **Confirm booking** | Calendar-e niye jabe, notun class dekhabe | ☐ | |
| F8 | `/dashboard/student/my-packages` | Fire jao | **`classes remaining` ek kome geche** | ☐ | |
| F9 | `/dashboard/student/profile` | Timezone bodlao (jemon `Asia/Dhaka`) → Save | "Profile updated" toast | ☐ | |
| F10 | `/dashboard/student/calendar` | Calendar-e fire jao | **Class-er time notun timezone onujayi bodleche**, label-eo notun zone | ☐ | |

---

## Phase G — Student-er kaj admin-e fire ashe kina

| # | Route | Ki korbe | Ki dekhbe | ☐ | Result |
|---|---|---|---|---|---|
| G1 | `/dashboard/admin/sessions` | Upcoming tab | **F7-e book kora class ta**-o ekhane ache | ☐ | |
| G2 | `/dashboard/student/calendar` | Ekta class-e click → **Reschedule** → notun slot → Confirm | Toast ashbe, calendar-e notun time-e chole jabe | ☐ | |
| G3 | `/dashboard/student/my-packages` | Dekho | **`classes remaining` bodlay NAI** (reschedule extra class kate na) | ☐ | |
| G4 | `/dashboard/admin/sessions` | Dekho | Class ta notun time-e, ar ekta row `rescheduled` status-e thakte pare | ☐ | |
| G5 | `/dashboard/student/calendar` | Ekta class **Cancel** koro (24 ghontar beshi baki emon) | Message-e bolbe class package-e **ferot geche** | ☐ | |
| G6 | `/dashboard/student/my-packages` | Dekho | **`classes remaining` ek bereche** | ☐ | |
| G7 | `/dashboard/admin/sessions` | Status filter = Cancelled | Cancel kora class ta ache | ☐ | |
| G8 | `/dashboard/admin/sessions` | Ekta `scheduled` class-e **Action → Mark completed**, ar **Notes**-e kichu likho | Badge "completed" hobe, note save hobe | ☐ | |
| G9 | `/dashboard/student/calendar` | Student-e fire jao | Oi class ekhon "completed", ar **Reschedule/Cancel button nai** | ☐ | |

---

## Phase H — Admin-e bondho korle public-e uthe jay kina

| # | Route | Ki korbe | Ki dekhbe | ☐ | Result |
|---|---|---|---|---|---|
| H1 | `/dashboard/admin/teachers/<A1-teacher>/edit` | Niche **Time off** section-e — emon ekta window dao jekhane teacher-er slot chhilo | Time off list-e ashbe | ☐ | |
| H2 | `/online-classes/book` | Oi teacher + oi date select koro | **Oi window-er slot gula ar nai** | ☐ | |
| H3 | `/dashboard/admin/packages` | A2-er package **Deactivate** koro | Badge "Inactive" hobe | ☐ | |
| H4 | `/courses` | Refresh koro | **Package ta ar public-e nai** | ☐ | |
| H5 | `/dashboard/admin/teachers` | A1-er teacher **Deactivate** koro | Badge "Inactive" | ☐ | |
| H6 | `/online-classes` | Refresh koro | **Teacher ta ar public-e nai** | ☐ | |
| H7 | `/dashboard/admin/testimonials` | A3-er testimonial **Hide** koro | Badge "Hidden" | ☐ | |
| H8 | `/` (homepage) | Refresh koro | **Testimonial ta carousel-e nai** | ☐ | |
| H9 | `/dashboard/admin/blogs` | A4-er post **Unpublish** koro | Badge "Draft" | ☐ | |
| H10 | `/blog` | Refresh koro | **Post ta ar nai** | ☐ | |

---

## Phase I — Unsubscribe

| # | Route | Ki korbe | Ki dekhbe | ☐ | Result |
|---|---|---|---|---|---|
| I1 | `/dashboard/admin/leads` | C1-er lead ta "Subscribed" ache kina dekho | Badge "Subscribed" | ☐ | |
| I2 | `/unsubscribe/<token>` | Lead-er `unsubscribe_token` niye (DB ba email theke) ei URL-e jao | "You're unsubscribed" + marketing/class email-er parthokko bola thakbe | ☐ | |
| I3 | `/dashboard/admin/leads` | Refresh koro | Oi lead ekhon **"Unsubscribed"**, tarikh shoho | ☐ | |
| I4 | `/unsubscribe/vul-token-123` | Vul token diye jao | **"not valid any more"** message (crash na, khali page na) | ☐ | |

---

## Phase J — Session refresh (token expire)

> Round 2 Auth Step 5-e joda holo. Ager code-e access token expire mane-i logout
> chilo — refresh-er code thaklen-o cholto na.
>
> 🔴 **Ei phase ekhon chalano jabe na — backend setting bodlate hobe age.**
>
> `server/server/settings.py`: `ACCESS_TOKEN_LIFETIME` = **30 din**,
> `REFRESH_TOKEN_LIFETIME` = **30 din**, `ROTATE_REFRESH_TOKENS` = False.
>
> Duita token-i login-er ek-i muhurte issue hoy ar **ek-i shomoy expire kore**,
> tai refresh kokhono shofol hote pare na. Tar upor amader session cookie 15 din
> (`SESSION_MAX_AGE_DAYS`), tai oi porjonto pouchano-i jay na.
>
> **Backend dev-ke bolte hobe:** `ACCESS_TOKEN_LIFETIME` 15-60 minute koro,
> `REFRESH_TOKEN_LIFETIME` 30 din-i thak. Tar por ei phase chalano jabe.

| # | Ki korba | Ki dekhbe | ✅ |
|---|---|---|---|
| J1 | Student hisebe login koro, dashboard khulo | Shob data ashe | ☐ |
| J2 | Access token expire porjonto opekkha koro (ba backend-e lifetime kombou), tarpor **Invoices** page-e jao | **Logout hobe na.** Data ashe. Network tab-e ekta 401 → ekta `/get-access-token/` → oi request-er retry dekhbe | ☐ |
| J3 | Expire obosthay dashboard **reload** koro (ek shathe 4-5 ta query jay) | Network-e **ekta-i** `/get-access-token/` call — proti query-r jonno alada na (single-flight kaj korche) | ☐ |
| J4 | Refresh token-o expire kore dao (ba cookie-r `refreshToken` noshto koro), tarpor kono page-e jao | Ebar logout hobe, `/`-e ferot pathabe. **Infinite loop ba bar bar reload hobe na** | ☐ |
| J5 | Admin diye J2 abar koro | Ek-i rokom — admin-o logout hoy na | ☐ |

**Keno eta alada phase:** ei change-ta app-er **proti ta logged-in request**-er upor
diye jay. Vul thakle hoy shobai logout hobe, na hoy refresh loop-e porbe — duitai
onno kono test-e dhora porbe na.

---

## Phase K — Package-e teacher restriction 🔴 Round 2-er mul feature

> Package ekhon nirdishto teacher-e **shimito** kora jay. Backend eta **tin
> jaygay** enforce kore: public booking list, checkout, ar student portal-er booking.
>
> ⚠️ **Ei phase-er age ar kono restriction test kora jabe na** — seed data-y
> **ekta-o restricted package nai**. K1-i oita banay.
>
> **Dorkar:** Phase A-r teacher (A1) + aro **ekta dwitiyo teacher** (K0-te banao).

| # | Route | Ki korbe | Ki dekhbe | ☐ | Result |
|---|---|---|---|---|---|
| K0 | `/dashboard/admin/teachers/create` | **Dwitiyo ekta teacher** banau, availability shoho (A1-er moto) | List-e duijon teacher | ☐ | |
| K1 | `/dashboard/admin/packages/<A2>/edit` | "Bookable with" section-e **shudhu A1-er teacher** tick koro → Save | Save hobe | ☐ | |
| K2 | `/dashboard/admin/packages/<A2>/edit` | Page ta **abar kholo** | Tick ta **theke geche** (save sotti hoyeche) | ☐ | |
| K3 | — | Helper text poro | **"Limited to 1 teacher. Untick them all to allow everyone again."** | ☐ | |
| K4 | `/dashboard/admin/packages` | List-e dekho | "Teachers" column-e **"1 teacher"** badge; hover korle naam | ☐ | |
| K5 | `/online-classes/book` | Step 1-e **A2** select → Step 2 | Ekta note: **"This package can be booked with the teachers below only."** ar **shudhu A1** ache — **K0-er teacher NAI** | ☐ | |
| K6 | `/online-classes/book` | Step 1-e **onno ekta (unrestricted) package** select → Step 2 | **Duijon teacher-i** ache | ☐ | |
| K7 | `/courses` | A2-er pricing card | **"1 teacher available"** (age "2 teachers" chilo) | ☐ | |
| K8 | `/dashboard/student/book-class` | Restricted package (A2) select → teacher step | **Shudhu A1**, ar oi-i note ta | ☐ | |
| K9 | `/dashboard/student/calendar` | A2-er ekta class-e **Reschedule** kholo | Teacher dropdown-e **shudhu A1** | ☐ | |
| K10 | `/dashboard/admin/packages/<A2>/edit` | Shob tick **tule felo** → Save | Helper text abar **"Every teacher can be booked"**, list-e **"All teachers"** | ☐ | |
| K11 | `/online-classes/book` | A2 select → Step 2 | **Duijon teacher-i fire eseche** | ☐ | |

---

## Phase L — Teacher-first booking entry (Round 2-e notun)

> Mul flow package-first. Kintu keu teacher card theke shuru korle age jante hobe
> **oi teacher-er shathe kon package kena jay** — tai teacher profile-e ekta
> packages section eseche.

| # | Route | Ki korbe | Ki dekhbe | ☐ | Result |
|---|---|---|---|---|---|
| L1 | `/online-classes` | Teacher card-e **"Book with <naam>"** click | **`/book` e jay NA** — teacher profile page-e `#packages` section-e niye jay | ☐ | |
| L2 | — | Oi section dekho | "Choose your package" + **"Next available: <din> <time>"** (upore ekbar, proti card-e na) | ☐ | |
| L3 | — | Package card gula dekho | Oi teacher-er shathe kena jay emon package. **Restricted package-e "Exclusive" badge** | ☐ | |
| L4 | — | Ekta package card-e click | `/online-classes/book?package=…&teacher=…` e jabe, **package already select** | ☐ | |
| L5 | — | Step 2-e jao | Oi teacher already select thakbe ba list-e thakbe | ☐ | |
| L6 | `/` (homepage) | Homepage-er teacher card-e "Book with" | L1-er moto-i profile-er `#packages` e jabe | ☐ | |

---

## Phase M — Registration + email verification (Round 2-e notun)

> Age registration page chilo kintu **backend endpoint chilo na**. Ekhon ache.
>
> ⚠️ **Notun email lago** — purono account diye ei phase test kora **jabe na**.
> Backend-er niyom: shudhu registration-i `EmailAddress` row banay; seeded user ar
> guest-checkout student **verified hisebe gonno hoy**, tai tara verify flow-e dhoke na.

| # | Route | Ki korbe | Ki dekhbe | ☐ | Result |
|---|---|---|---|---|---|
| M1 | `/auth/registration` | Form dekho | **"Username" field NAI**. First name (required), last name, country, phone, Spanish level ache | ☐ | |
| M2 | — | Password `12345` dao | **"at least 8 characters"** error (backend 8 chay) | ☐ | |
| M3 | — | Shob thik kore **notun email** diye submit | `/auth/verify-email?email=…` e jabe, ar **oi email ta page-e dekhabe** | ☐ | |
| M4 | — | Ekhon-i **`/auth/signin`** e oi account diye login korar cheshta koro | **Login hobe na** (403 — email confirm kora hoy nai) | ☐ | |
| M5 | `/auth/verify-email` | **"Send a new link"** click | Message ashbe, ar button **30 second-er countdown**-e chole jabe | ☐ | |
| M6 | — | Ekta **fake email** diye resend koro | **Ek-i rokom message** ashbe. ⚠️ **"email nai" jeno NA bole** (oita bolle ke registered ta faash hoye jeto) | ☐ | |
| M7 | Email inbox | Confirmation link-e click | `/auth/email/confirm/<key>` e jabe | ☐ | |
| M8 | — | Page ta dekho | **"Email confirmed"** + **"You're signed in"** + 3 second countdown. ⚠️ **"Go to Sign In" jeno NA bole** — verify korle backend nijei login kore dey | ☐ | |
| M9 | — | Opekkha koro (ba button click) | Shoja **`/dashboard/student`** e dhukbe, **abar login korte hobe na** | ☐ | |
| M10 | — | Sidebar-er niche naam dekho | **Asol naam** dekhabe, **email na** | ☐ | |
| M11 | — | Ek-i confirm link **abar** kholo | "Confirmation failed" + **"Send me a new link"** button (key single-use) | ☐ | |
| M12 | `/auth/registration` | **Login thaka obosthay** ei URL-e jao | Dashboard-e bounce kore dibe | ☐ | |
| M13 | `/auth/signin` | Login thaka obosthay | Dashboard-e bounce | ☐ | |

### M10 keno alada kore likha

Ager code sidebar-e `username` dekhato, kintu backend **email-ke-i username hisebe
rakhe** — tai naam-er jaygay email ar niche abar email dekhato. Ekhon `profile.name`
pora hoy. Login ar registration duita path theke-i ek-i naam asha uchit.

---

## Known limitation (bug hisebe report korar dorkar nai)

| Jinis | Keno |
|---|---|
| Blog **detail** page shob shomoy English | Server component, bhasha client-side context-e — SEO-r jonno neওয়া trade-off |
| Student invoice-e status column nai | Backend `payment_status` dey na |
| Booking-e card field nai | Phase 1-e dummy gateway; asol Stripe pore |
| Admin calendar 200 session obdi | Backend date-range filter dey na |
| Leads **Export** e filter kaj kore na | Backend `LeadExportView` query param **porei na** — shob shomoy puro list. UI-te amber warning ache. (Bookings export-e filter thik ache) |
| Teacher URL-e UUID, slug na | Backend-e Teacher model-e `slug` field **nai** (shudhu Blog-e ache). SEO slug chaile backend-e add korte hobe |
| `TEACHER` role-e login korle `/` e jay | Backend ei role fire dite pare, kintu teacher portal ekhono banano hoy ni |
| Phase J (token refresh) chalano jay na | Backend `ACCESS_TOKEN_LIFETIME` 30 din — dekho Phase J-er note |
| 20-class package-er price | $250.00 na $254.64 — ekhono product shidhanto hoy ni |

### Age ei table-e ja lekha chilo, ar **ekhon vul**

| Purono lekha | Asol obostha |
|---|---|
| ~~"Login-er por auto redirect nai"~~ | **Kaj kore.** `sign-in.form.tsx` `state.redirectTo` dhore role onujayi dashboard-e pathay |
| ~~"Login chhara dashboard URL khole — `src/proxy.ts` khali stub, route guard nai"~~ | **Guard ache ar kaj kore.** Next 16-e `middleware.ts`-er notun naam `proxy.ts`. Logged-out → signin, vul role → nijer dashboard. Round 2-e register/forgot/verify page-o bounce kore |
| ~~"Package card-e teacher naam nai"~~ | **Ekhon ache.** `teacher_count` pricing card-e, ar restriction Phase K-te |

---

## Bug report format

```
Step:      E4
Ki korlam: D-te booking korar por admin sessions Upcoming tab kholam
Ki holo:   Class ta list-e nai
Ki howa uchit: D-te book kora class ta thaka uchit
Network:   GET /administrator/sessions/?filter=upcoming&p=1 → 200, results: []
```
