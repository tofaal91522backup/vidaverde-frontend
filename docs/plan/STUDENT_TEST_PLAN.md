# Student Portal — Manual Test Plan

Route-wise checklist. Ek ek page e giye tick kore jao.

- **Scope:** student section-er ja ja API integrate kora hoyeche ([STUDENT_API_INTEGRATION.md](STUDENT_API_INTEGRATION.md))
- **Backend:** `Ongshak-Tech/vidaVerdeBackend` @ `f7ccf8b`
- **Banano:** 2026-09-12

---

## 0. Shuru korar age

### Cholano
```bash
npm run dev          # build na, dev server
```
Backend-o cholte hobe, ar `.env`-er `BACKEND_URL` shei server-e point korte hobe.

### Login
Route: **`/auth/signin`**

Seed student (backend `seed_demo` theke):
```
email:    ana.lopez@example.com
password: student123
```

> ⚠️ **Login-er por nijer theke dashboard-e niye jabe na** — redirect ekhono lekha hoy ni.
> Toast "Login successful!" dekhle URL-e manually `/dashboard/student` likhe jao.

> ⚠️ **Route guard ekhono nai** (`src/proxy.ts` khali stub). Tai login chhara-o
> `/dashboard/student` khola jabe — kintu API 401 debe ar page khali/error dekhabe.
> Eta expected, bug na.

> ⚠️ **Local http-e cookie na-o boshte pare** — `session.ts` e `secure: true` hardcoded.
> Login "successful" dekhiyeo data na ashle ei karone. `https` ba oi flag ta dev-e
> conditional korle chole.

### Admin diye data toiri kore nao (test korar moto data lagbe)
Student-er ekta **paid package with classes remaining** na thakle book/cancel kichui test
kora jabe na. Bruno diye admin login kore package/booking banate paro, ba public checkout
(`/online-classes/book` — ekhono integrate kora hoy nai) er bodole Bruno-r
`public/checkout` request chalate paro.

---

## 1. `/dashboard/student` — Overview

**API:** `GET /student/dashboard/`

| # | Ki korbe | Ki dekhbe |
|---|---|---|
| 1.1 | Page kholo | Upore "Next class" card, niche 3 ta card |
| 1.2 | Next class card | Package name, teacher name, date+time, duration, status badge |
| 1.3 | Time ta check koro | Tomar **profile-er timezone** onujayi (browser-er na — niche 7.1 dekho) |
| 1.4 | Upore-dane label | "Times shown in `<timezone>`" |
| 1.5 | "Join on Google Meet" | Shudhu `meet_link` thakle dekhabe; click korle notun tab-e Meet khulbe |
| 1.6 | **Kono upcoming class na thakle** | "No class scheduled" + "View my packages" button |
| 1.7 | My Invoices card | "N recent" — N = shesh 5 ta invoice-er shonkha |
| 1.8 | My Packages card | "X active" (book kora jay emon) + "Y classes left" (shob package-er total) |
| 1.9 | My Calendar card | Next class thakle "1 class scheduled", na thakle "0 classes scheduled" |
| 1.10 | 3 ta card e click koro | Thik page e niye jabe |
| 1.11 | Backend bondho kore refresh | "Failed to load your dashboard." dekhabe |

**Cross-check:** 1.7/1.8-er number gula `/invoices` ar `/my-packages` page-er shathe milbe.

---

## 2. `/dashboard/student/my-packages` — My Packages

**API:** `GET /student/packages/`

| # | Ki korbe | Ki dekhbe |
|---|---|---|
| 2.1 | Page kholo | Duita section: **Active** ar **Past / Completed** |
| 2.2 | Active card | Package name, koto taka dewa hoyeche, "Active" badge |
| 2.3 | Progress bar | `classes_used of classes_total used` ar % — hishebe milbe |
| 2.4 | Classes remaining | Total − used er shathe milbe |
| 2.5 | Expires / Purchased | Date thik dekhacche |
| 2.6 | Invoice | Invoice number dekhacche (`/invoices` page-er shathe milbe) |
| 2.7 | First-lesson package | Extra "First lesson" badge |
| 2.8 | **Expired package** | Past section-e, halka (dim), "Expired" badge, **Book button nai** |
| 2.9 | **Shesh hoye jawa package** (0 baki) | Past section-e, "Completed" badge |
| 2.10 | Unpaid package thakle | Badge-e `payment_status` dekhabe (jemon "pending") |
| 2.11 | "Book a class" button | Shudhu Active card-e. Click → `/dashboard/student/book-class?package=<id>` |
| 2.12 | Kono package na thakle | "You have not purchased any packages yet." |

> ℹ️ **Teacher name ei page-e nai — eta bug na.** Backend package-er shathe teacher bandhe
> na (ek package-er different class different teacher-er kachhe newa jay).

---

## 3. `/dashboard/student/book-class` — Book a Class

**API:** `GET /student/packages/` · `GET /public/teachers/` · `GET /public/teachers/:id/slots/` · `POST /student/sessions/`

| # | Ki korbe | Ki dekhbe |
|---|---|---|
| 3.1 | Sidebar theke "Book a Class" | Step 1 (Choose package) theke shuru |
| 3.2 | Package list | **Shudhu book kora jay emon** package (expired/shesh hoye jawa gula nai) |
| 3.3 | Package e click | Nijei step 2 e chole jabe |
| 3.4 | Teacher list | Naam, photo, "Accepting new students"/"Limited availability", tag |
| 3.5 | Teacher e click | Step 3 (slot) e jabe |
| 3.6 | Date input | Default aj; **ager date select kora jabe na** |
| 3.7 | Slot list | Din onujayi bhag kora, shudhu jei dine slot ache |
| 3.8 | Niche label | "Times shown in `<tz>` · 60 min lessons" |
| 3.9 | Date bodlao | Slot list notun kore ashbe |
| 3.10 | Slot e click | Highlight hobe, "Confirm booking" enable hobe |
| 3.11 | **Confirm booking** | Toast "Your class is booked..." → **`/calendar` e niye jabe** |
| 3.12 | Stepper-er number e click | **Ager** step e jawa jay, shamner step e **jay na** |
| 3.13 | "Back" button | Ager step e nibe |

**Edge case:**

| # | Ki korbe | Ki dekhbe |
|---|---|---|
| 3.14 | Book kora jay emon package na thakle | "No package available to book" + "View my packages" link |
| 3.15 | Emon date dao jekhane 7 dine slot nai | "No free slots in the 7 days from this date. Try a later date." |
| 3.16 | My Packages theke "Book a class" | Package **already select kora**, shoja step 2 e |
| 3.17 | **Book korar por `/my-packages` e jao** | `classes_remaining` **ek kome gese** (cache refresh hoyeche kina) |
| 3.18 | Book korar por `/dashboard/student` | Next class card-e notun class ta ache |
| 3.19 | Bruno diye oi slot ta age book kore felo, tarpor confirm koro | Backend-er error toast ("That slot has just been taken...") |

---

## 4. `/dashboard/student/calendar` — My Calendar

**API:** `GET /student/sessions/` · `POST .../cancel/` · `POST .../reschedule/` · `GET /public/teachers/:id/slots/`

### 4a. View

| # | Ki korbe | Ki dekhbe |
|---|---|---|
| 4.1 | Page kholo | Month view, cholti mash |
| 4.2 | **Aj-ker date** | Gol highlight — **thik aj-er ghore** (kal/porshu na) |
| 4.3 | Session chip | Time + teacher name, status onujayi rong |
| 4.4 | Legend | scheduled / completed / no show / cancelled / rescheduled |
| 4.5 | Prev / Next | Mash bodlabe |
| 4.6 | "Today" | Cholti mashe fire ashbe |
| 4.7 | Week toggle | 7 din-er view; Prev/Next ekhon **saptaho** bodlabe |
| 4.8 | Timezone label | "Times in `<tz>`" — API theke asha zone |
| 4.9 | Ek dine 3+ session | "+N more" dekhabe |

### 4b. Session details

| # | Ki korbe | Ki dekhbe |
|---|---|---|
| 4.10 | Chip e click | Dialog: Teacher, Status, Date, Time, Duration, Package |
| 4.11 | Upcoming class | "Join on Google Meet" link |
| 4.12 | **Completed/cancelled class** | Meet link **nai**, Reschedule/Cancel button-o **nai** |

### 4c. Cancel

| # | Ki korbe | Ki dekhbe |
|---|---|---|
| 4.13 | "Cancel class" | Inline confirm box (notun popup na) |
| 4.14 | **24 ghontar beshi baki** | "It will be returned to your package." |
| 4.15 | **24 ghontar kom baki** | Lal text: "It is inside the 24-hour window, so this class will be lost." |
| 4.16 | "Keep it" | Confirm box bondho, kichu hoy na |
| 4.17 | "Yes, cancel" | Backend-er nijer message toast (✅ ba ⚠️), dialog bondho |
| 4.18 | Cancel-er por calendar | Session ta ar upcoming hisebe nai |
| 4.19 | **24h+ cancel korar por `/my-packages`** | `classes_remaining` **ek bere gese** |

### 4d. Reschedule

| # | Ki korbe | Ki dekhbe |
|---|---|---|
| 4.20 | "Reschedule" | Ek-i dialog-e panel bodlabe ("Move this class") |
| 4.21 | **`can_reschedule` false hole** | Button **disabled**; hover korle karon dekhabe |
| 4.22 | Upore box | "Currently booked" — ekhonkar date/time + teacher |
| 4.23 | Date input | Default ekhonkar class-er date |
| 4.24 | **Teacher dropdown** | Default ekhonkar teacher |
| 4.25 | Teacher bodlao | Slot list **notun teacher-er** onujayi ashbe |
| 4.26 | Slot select → "Confirm new time" | Backend message toast, dialog bondho |
| 4.27 | Reschedule-er por calendar | Notun time-e chole geche |
| 4.28 | **Reschedule-er por `/my-packages`** | `classes_remaining` **bodlay ni** (extra class kate na) |
| 4.29 | "Back" | Details panel-e fire jabe |

---

## 5. `/dashboard/student/invoices` — My Invoices

**API:** `GET /student/invoices/` · `GET /student/invoices/:id/pdf/`

| # | Ki korbe | Ki dekhbe |
|---|---|---|
| 5.1 | Page kholo | Table: Invoice #, Date, Package, Amount, PDF button |
| 5.2 | Amount column | `12.00 USD` type — **crash korbe na, "NaN" dekhabe na** |
| 5.3 | Invoice number | `/my-packages` er invoice number-er shathe milbe |
| 5.4 | Search box e package name | Client-side filter hobe |
| 5.5 | Search box e invoice number | Oi row ta-i thakbe |
| 5.6 | Search khali koro | Shob fire ashbe |
| 5.7 | **PDF button** | Spinner → file download hobe, naam `<invoice-number>.pdf` |
| 5.8 | Download kora file kholo | **Asol PDF** (print dialog na, HTML page na) |
| 5.9 | Kono invoice na thakle | Table-e khali message |
| 5.10 | Backend bondho kore PDF click | Toast "Could not download this invoice." |

> ℹ️ **Status column (Paid/Pending) nai — eta bug na.** Backend invoice list-e
> `payment_status` field dey na. Pagination-o nai, puro list ek shathe ashe.

---

## 6. `/dashboard/student/profile` — My Profile

**API:** `GET /student/me/` · `PATCH /student/me/` · `POST /administrator/upload/`

| # | Ki korbe | Ki dekhbe |
|---|---|---|
| 6.1 | Page kholo | Upore box-e Email + Account status (**edit kora jay na**) |
| 6.2 | Field gula | Name, Country, Phone, Timezone, Spanish level, Profile photo — shob e data bhorati |
| 6.3 | Name khali kore Save | Error summary: "Full name: Name is required" |
| 6.4 | Name bodle Save | Toast "Profile updated." |
| 6.5 | Refresh koro | Notun name theke gese |
| 6.6 | Country / Phone bodlao | Save hoy, refresh-e theke jay |
| 6.7 | Spanish level dropdown | 5 ta option; select kore save → theke jay |
| 6.8 | Timezone dropdown | Lomba IANA list (Europe/Berlin, Asia/Dhaka...) |
| 6.9 | **Profile photo upload** | File select → upload hoy → preview dekhay |
| 6.10 | Photo upload-er por Save → refresh | Photo theke gese |
| 6.11 | 20 MB-er boro file | Backend 400 debe, error dekhabe |

### ⭐ 6.12 — Shobcheye important test (timezone)
1. Profile-e timezone bodlao (jemon `Asia/Dhaka` → `Europe/Berlin`), Save koro
2. `/dashboard/student/calendar` e jao
3. **Class-er time notun timezone onujayi bodlano thakbe**, ar label-e notun zone dekhabe
4. `/dashboard/student` overview-eo ek-i rokom bodlabe

---

## 7. Shob page-e common

| # | Ki korbe | Ki dekhbe |
|---|---|---|
| **7.1** ⭐ | **Computer-er timezone bodlao** (OS settings), kintu profile-er timezone hat dio na. Calendar refresh koro | **Time bodlabe NA** — profile-er zone-i thakbe. (Eta ekta bug chhilo, thik kora hoyeche — bodle gele report koro) |
| 7.2 | Backend bondho kore proti page refresh | Protita page-e error message (shada screen/crash na) |
| 7.3 | Slow network (DevTools throttle) | Loading spinner dekhabe |
| 7.4 | Mobile width (DevTools) | Sidebar, table, calendar, form — shob use kora jay |
| 7.5 | Sidebar-er 6 ta link | Dashboard, Book a Class, My Invoices, My Packages, My Calendar, My Profile — shob kaj kore |
| 7.6 | Bruno diye token expire koriye page refresh | Auto refresh hobe (`/get-access-token/`), na parle logout |

---

## 8. Known limitation (bug hisebe report korar dorkar nai)

| Jinis | Keno |
|---|---|
| Invoice-e status column nai | Backend `payment_status` dey na |
| Invoice-e pagination nai, search client-side | Backend param ney na |
| Package card-e teacher name nai | Backend package-e teacher bandhe na |
| Calendar 200 session obdi dekhay | Backend date-range filter dey na; 200+ hole upore warning dekhabe |
| Login-er por auto redirect nai | Ekhono lekha hoy ni |
| Login chhara dashboard khola jay | `src/proxy.ts` khali stub, guard nai |

---

## 9. Report korar somoy

Bug pele ei format-e dile debug korte shuvidha:

```
Route:     /dashboard/student/calendar
Ki korlam: 24 ghontar beshi baki emon class cancel korlam
Ki holo:   Toast elo kintu my-packages e classes_remaining barlo na
Ki howa uchit chhilo: 1 bara uchit chhilo
Console/Network e ki: POST /student/sessions/<id>/cancel/ → 200, class_returned: true
```
