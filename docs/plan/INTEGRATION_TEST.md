# Vida Verde — Integration Test (manual)

Ek taana flow: **Admin → Public → Student → abar Admin**. Ek jaygay kora kaj onno
jaygay dekhacche kina — sheta-i ei test-er mul uddeshyo.

- **Niyom:** upor theke niche ek taana koro. Ek step-er data porer step-e lage.
- **Field-by-field test na** — "ei section-e banalam, oi section-e dekhacche to?"
- Fail hole `Result` column-e likhe rakho, thik korar por abar chalao.

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
| A2 | `/dashboard/admin/packages/create` | Package banau — English title, price (jemon `50.00`), classes `5`, validity `90`, Active on | Package list-e ashbe, price ar classes thik dekhabe | ☐ | |
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

| # | Route | Ki korbe | Ki dekhbe | ☐ | Result |
|---|---|---|---|---|---|
| D1 | `/online-classes/book` | Step 1 — **A1-er teacher** select koro | Step 2-e chole jabe | ☐ | |
| D2 | — | Step 2 — **A2-er package** select koro | Step 3-e jabe | ☐ | |
| D3 | — | Step 3 — date select koro | **A1-e je din/time set korechile** shei onujayi slot dekhabe. Niche timezone + lesson duration lekha thakbe | ☐ | |
| D4 | — | Ekta slot select kore Continue | Step 4-e jabe | ☐ | |
| D5 | — | Step 4 — first name + **notun ekta email** (ja age use koro nai) + Spanish level dao | Continue kaj korbe | ☐ | |
| D6 | — | Step 5 — Review dekho | **Kono Card Number / CVC field NAI** (ichchhe kore shorano) | ☐ | |
| D7 | — | **Confirm booking** click | Confirmation page: teacher, package, date/time, **invoice number**, amount, classes remaining, ar "Join on Google Meet" link | ☐ | |
| D8 | — | Confirmation-e note dekho | Notun email diyechile bole **"We created your student account"** note thakbe | ☐ | |

> **D5-er email ta likhe rakho** — Phase F-e ei account diye login korte hobe. Password
> backend email kore.

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

## Known limitation (bug hisebe report korar dorkar nai)

| Jinis | Keno |
|---|---|
| Blog **detail** page shob shomoy English | Server component, bhasha client-side context-e — SEO-r jonno neওয়া trade-off |
| Login-er por auto redirect nai | Ekhono lekha hoy ni |
| Login chhara dashboard URL khole | `src/proxy.ts` khali stub, route guard nai |
| Student invoice-e status column nai | Backend `payment_status` dey na |
| Package card-e teacher naam nai | Backend package-e teacher bandhe na |
| Booking-e card field nai | Phase 1-e dummy gateway; asol Stripe pore |
| Admin calendar 200 session obdi | Backend date-range filter dey na |

---

## Bug report format

```
Step:      E4
Ki korlam: D-te booking korar por admin sessions Upcoming tab kholam
Ki holo:   Class ta list-e nai
Ki howa uchit: D-te book kora class ta thaka uchit
Network:   GET /administrator/sessions/?filter=upcoming&p=1 → 200, results: []
```

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
