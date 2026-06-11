# Vida Verde. Development Plan Phase 1.0

## Overview

| Area | Scope |
| :---- | :---- |
| Public | Booking, lead capture, blogs, packages, marketing pages |
| Admin | Auth, manage teachers/bookings/sessions/blogs/packages, calendar |
| Customer | Auth, invoices, packages, calendar |

## Project Setup

- **Framework**: Next.js 15+ App Router. `src/app/` for thin page wrappers, `src/features/` for all business logic
- **Stack**: Tailwind CSS v4 + shadcn/ui + TanStack Query v5 + TanStack Form v1 + Zod + Axios
- **Conventions**: Follow CLAUDE.md exactly. Kebab-case files, PascalCase components, `useFetchData` / `useMutationHandler` hooks, never call Axios directly
- **Base layout**: Default project layout is already in place. Extend it, don't replace it

---

## Status Key

| Symbol | Meaning |
| :---- | :---- |
| ✅ | Done |
| 🔄 | Partial / needs fix |
| ❌ | Missing. Needs to be built |

---

## 1. Global Elements

### 1.1 Navbar (`src/components/layout/navbar/Navbar.tsx`)

| Item | Status | Notes |
| :---- | :---- | :---- |
| Sticky navbar | ✅ | |
| Vida Verde logo → homepage | ✅ | |
| Nav: Online Classes | 🔄 | URL is `/courses`. Rename to `/online-classes` |
| Nav: Study in Quito | ✅ | |
| Nav: Study in Quito sub-items (Quito Immersion, Travelling Classroom, Puerto López, Homestay) | ❌ | Currently no dropdown sub-nav |
| Nav: Travel Spanish | ❌ | Missing nav item and page |
| Nav: Our School | ✅ | |
| Nav: Contact | ✅ | |
| Homestay moved to sub-item under Study in Quito | ❌ | Currently top-level nav item |
| Language toggle EN/ES (right side, persistent) | 🔄 | UI exists; no `/es/` URL routing |
| Desktop CTA "Book Your First Lesson" always visible | ✅ | |
| Desktop CTA links to `/book` | 🔄 | Currently links to `/#book` |
| Mobile: hamburger menu | ✅ | |
| Mobile: CTA collapses into menu | ❌ | CTA not present inside the mobile Sheet menu |

### 1.2 Footer (`src/components/layout/footer/Footer.tsx`)

| Item | Status | Notes |
| :---- | :---- | :---- |
| School name + tagline | ✅ | |
| AECEE certification badge (logo image) | ❌ | Text mention only; needs actual badge/logo |
| Quick links: Online Classes, Study in Quito, Homestay, Our School, Blog, Contact, Privacy, Terms | 🔄 | Terms link missing; Online Classes links to `/courses` |
| Contact block: email, WhatsApp, address | ✅ | |
| Social: Instagram + Facebook only (no Twitter/X, no LinkedIn) | ✅ | |
| Copyright line | ✅ | |
| Language toggle repeated in footer | ❌ | Not present in footer |

### 1.3 Floating WhatsApp Button

| Item | Status | Notes |
| :---- | :---- | :---- |
| Persistent floating button, all pages/scroll positions | ✅ | `WhatsAppFloat` component in marketing layout |
| Pre-filled message on click | ✅ | |
| Doesn't obstruct key content on mobile | ✅ | |

### 1.4 Trust Bar

| Item | Status | Notes |
| :---- | :---- | :---- |
| Trust bar on Homepage (AECEE · Est. 1999 · 4,700+ Students · All Levels Welcome · Google Meet) | ✅ | `TrustSection` component |
| Trust bar also on Online Classes page | ❌ | Not present on courses page |

---

## 2. Public Pages

### 2.1 Homepage (`/`)

**Route**: `src/app/(marketing)/(home)/page.tsx` → `src/features/marketing/pages/home/index.tsx`

| Section | Status | Notes |
| :---- | :---- | :---- |
| A. Hero: real photo bg, primary CTA "Start for $12", secondary CTA "Explore All Programs", trust bar below CTAs | ✅ | `HeroSection` |
| B. Why Vida Verde? (4 differentiator cards) | ✅ | `WhyVidaVerde` |
| C. Course Selector (4 cards: Online Classes, Study in Quito, Travel Spanish, Free Guide → `#lead-capture`) | 🔄 | `ProgramsSection` exists; verify Travel Spanish card present and Free Guide links to `#lead-capture` |
| D. Social Proof (3-5 outcome-specific testimonials with photo + flag, TripAdvisor badge, stats block) | 🔄 | `TestimonialSection` exists; TripAdvisor badge and stats block need verification |
| E. Meet the Teachers (photo, name, style, "Book with [Name]" CTA → `/online-classes/book?teacher=[name]`) | 🔄 | `TeachersSection` exists; verify CTA destination |
| F. About Block ("Teaching Since 1999", AECEE badge, "Our Story →" → `/our-school`) | ✅ | `LearnAboutSchoolSection` |
| G. Lead Capture (first name + email, GDPR checkbox, privacy link, success message) | ✅ | `LeadCaptureSection` with `id="lead-capture"` anchor, GDPR checkbox confirmed |

### 2.2 Online Classes (`/online-classes`)

> **Action needed**: Rename route from `/courses` → `/online-classes`. Update all internal links.

**Route**: `src/app/(marketing)/courses/page.tsx` → `src/features/marketing/pages/courses/index.tsx`

| Section | Status | Notes |
| :---- | :---- | :---- |
| A. Hero (headline, trust bar, primary CTA "Book Assessment & First Lesson") | ✅ | `OnlineClassesHero` |
| B. How It Works (4-step flow with icons) | ✅ | `HowItWorksSection` |
| C. Pricing (Assessment $12, 10-class, 20-class, Single; currency note USD) | ✅ | `PricingSection` |
| D. Choose Your Teacher (cards with photo, bio, availability, "Book with [Name]" CTA) | ✅ | `OnlineTeachersSection` |
| E. FAQ Accordion (6-8 questions) | ✅ | `OnlineClassesFAQ` |
| F. Bottom CTA ("Ready to Start? Your First Lesson Is Just $12.") | ✅ | `OnlineClassesBottomCTA` |

### 2.3 Teacher Profile Pages (`/online-classes/teachers/[name]`)

> **Status**: Entire feature missing. Spec requires one page per teacher, usable as SEO landing pages.

**Route to create**: `src/app/(marketing)/online-classes/teachers/[name]/page.tsx`
**Feature to create**: `src/features/marketing/pages/online-classes/pages/teacher-profile/`

| Item | Status | Notes |
| :---- | :---- | :---- |
| Dynamic route `/online-classes/teachers/[name]` | ❌ | |
| Profile photo (large) | ❌ | |
| Name, university/qualification, years experience, languages spoken | ❌ | |
| First-person teaching bio (3-5 sentences) | ❌ | |
| Specialisations list | ❌ | |
| Availability status ("Accepting new students. Next available: [date]") | ❌ | |
| 2-3 student testimonials specific to this teacher | ❌ | |
| CTA: "Book Your First Lesson with [Name]" → `/online-classes/book?teacher=[name]` | ❌ | |
| Secondary CTA: "Back to all teachers →" | ❌ | |

### 2.4 Booking Flow (`/book`)

> **Note**: Spec defines URL as `/online-classes/book`. Currently at `/book`. Keep `/book` as the canonical URL or add redirect. Confirm with team.

**Route**: `src/app/(marketing)/book/page.tsx` → `src/features/marketing/pages/book/index.tsx`

| Step | Status | Notes |
| :---- | :---- | :---- |
| 6-step progress indicator | ✅ | |
| Step 1: Select teacher (pre-populate from `?teacher=` param) | 🔄 | UI exists; verify `?teacher=` query param pre-fills selection |
| Step 2: Select package (First Lesson highlighted as primary) | ✅ | |
| Step 3: Date/time (real availability, timezone auto-detect GMT-5, manual override) | 🔄 | UI exists; timezone auto-detection not confirmed |
| Step 4: Details (first name, last name, email, Spanish level dropdown) | ✅ | |
| Step 5: Dummy payment gateway (Stripe-ready layout) | ✅ | |
| Step 6: Confirmation (summary, teacher, date/time in user timezone, Google Meet link) | ✅ | |
| Fully mobile-optimised | ✅ | |
| Free reschedule up to 24h; cancellation within 24h forfeits fee (displayed before payment) | ❌ | Policy text not shown in booking flow |

### 2.5 Study in Quito (`/study-in-quito`)

**Route**: `src/app/(marketing)/study-in-quito/page.tsx` → `src/features/marketing/pages/study-in-quito/index.tsx`

| Section | Status | Notes |
| :---- | :---- | :---- |
| A. Hero (headline, "Explore Programmes ↓" scroll, "Contact Us to Plan Your Stay") | ✅ | |
| B. Programme cards (Quito Immersion, Travelling Classroom, Puerto López, Jungle) | 🔄 | `programs.data.ts` has quito-immersion, travelling-classroom, puerto-lopez only; Jungle missing (confirm active status with Vida Verde before adding) |
| C. Homestay Preview (2-3 sentences, photo, "Learn About Homestay →" CTA) | ✅ | |
| D. Enquiry CTA (WhatsApp + "Send a Message" → `/contact`) | ✅ | |

### 2.6 Programme Detail Pages (`/study-in-quito/[slug]`)

**Route**: `src/app/(marketing)/study-in-quito/[slug]/page.tsx` → `src/features/marketing/pages/study-in-quito/ProgramDetail.tsx`

| Section | Status | Notes |
| :---- | :---- | :---- |
| Hero (programme name, 1-line description, primary CTA, real photo bg) | ✅ | |
| What's Included (bullet list) | ✅ | |
| Sample Schedule (table: day, activity, type) | ✅ | |
| Pricing Table (by duration: 1 week, 2 weeks, 4 weeks) | ✅ | |
| Programme-specific photo gallery (3-6 real photos) | ❌ | Spec requires gallery; `ProgramDetail` has no gallery section |
| Testimonial (1-2 testimonials) | ✅ | |
| Enquiry CTA (WhatsApp + "Send an Enquiry →" → `/contact`) | ✅ | |

### 2.7 Homestay (`/homestay`)

**Route**: `src/app/(marketing)/homestay/page.tsx` → `src/features/marketing/pages/homestay/index.tsx`

| Item | Status | Notes |
| :---- | :---- | :---- |
| Hero ("Homestay with an Ecuadorian familia.") | ✅ | |
| Gallery mosaic | ✅ | `GallerySection` |
| Why Homestay / pillars (2-3 paragraphs as feature cards) | ✅ | |
| What's Included (item cards) | ✅ | |
| Host family profiles (2-3 vignettes: photo, first names, neighbourhood, about blurb) | ❌ | Not implemented |
| Pricing ($26/night with tiers, extras noted) | ✅ | |
| Combination offers (homestay + classes bookable together, links to immersion programmes) | ❌ | Not implemented |
| Safety note (Vida Verde vets all families, safe neighbourhoods, 24/7 support) | ❌ | Not implemented |
| FAQ accordion | ✅ | |
| CTA ("Add Homestay to Your Programme" → `/contact`) | ❌ | No closing CTA section on page |

### 2.8 Travel Spanish (`/travel-spanish`)

> **Status**: Entirely missing. Not in nav, no route, no feature folder.

**Route to create**: `src/app/(marketing)/travel-spanish/page.tsx`
**Feature to create**: `src/features/marketing/pages/travel-spanish/`

| Item | Status | Notes |
| :---- | :---- | :---- |
| Hero headline: "Travelling to Ecuador? Learn the Spanish You'll Actually Use." | ❌ | |
| Offering description (short-stay classes, in-person or online, homestay option, travel advisory) | ❌ | |
| Travel advisory mention (Ecuador routes, safety, local recommendations) | ❌ | Confirm scope with Vida Verde |
| TripAdvisor rating + 2-3 review excerpts from travellers | ❌ | Vida Verde to supply TripAdvisor profile URL |
| Pricing note (no fixed table. Custom quote) | ❌ | |
| Primary CTA: "Plan My Travel Spanish. WhatsApp Us" | ❌ | |
| Secondary CTA: "Send Us a Message →" → `/contact` | ❌ | |

### 2.9 Our School (`/our-school`)

**Route**: `src/app/(marketing)/our-school/page.tsx` → `src/features/marketing/pages/our-school/index.tsx`

| Item | Status | Notes |
| :---- | :---- | :---- |
| Page headline ("25 Years. 4,700 Students. Lasting Connections.") | ✅ | |
| Rosa's story (3-5 paragraphs, first-person) | ✅ | |
| Photo of Rosa/team | ✅ | |
| AECEE Certification sub-section (what it is, logo, link to AECEE site) | ✅ | |
| La Floresta context paragraph | ✅ | |
| Teacher bios (full. All teachers with photo, credentials, experience, philosophy) | ✅ | |
| School gallery (6-12 photos) | ✅ | |
| CTA ("Ready to Start?" → `/online-classes`) | 🔄 | Verify CTA links to `/online-classes` not `/courses` |

### 2.10 Blog (`/blog`, `/blog/[slug]`)

**Routes**: `src/app/(marketing)/blog/` → `src/features/marketing/pages/blog/`

| Item | Status | Notes |
| :---- | :---- | :---- |
| Index: card grid (thumbnail, title, date, category, excerpt, Read More) | ✅ | |
| Category filter pills | ✅ | |
| Post: single-column layout | ✅ | |
| Post: date, category, estimated reading time | ✅ | |
| Post: author name | ❌ | Not displayed; add to `BlogPost` type and `posts.data.ts` |
| Post: social share buttons (WhatsApp, Facebook, Email) | ❌ | Not implemented |
| Post: related posts at bottom | ✅ | |
| Post: lead capture widget (first name + email form. Same as homepage Section G) | ❌ | Current has an inline "Book My First Lesson" CTA link; spec requires actual email capture form |

### 2.11 Contact (`/contact`)

**Route**: `src/app/(marketing)/contact/page.tsx` → `src/features/marketing/pages/contact/index.tsx`

| Item | Status | Notes |
| :---- | :---- | :---- |
| Page headline "Start the Conversation." | ✅ | |
| Form: name, email, subject dropdown (Online Classes / Immersion / Homestay / Travel Spanish / Other), message | ✅ | |
| Response time note ("within 48 hours, Mon-Fri") | ✅ | |
| WhatsApp CTA (large, prominent, pre-filled message) | ✅ | |
| Email address (plain text) | ✅ | |
| Phone / WhatsApp number | ✅ | |
| Embedded Google Map (La Floresta, Quito) | ✅ | |
| School address below map | ✅ | |

### 2.12 Privacy Policy (`/privacy`)

| Item | Status | Notes |
| :---- | :---- | :---- |
| Page (required for GDPR / email capture) | ❌ | No route, no page. Lead capture form already links to `/privacy`. |

### 2.13 Terms of Service (`/terms`)

| Item | Status | Notes |
| :---- | :---- | :---- |
| Page (required for payment processing) | ❌ | No route, no page. |

---

## 3. Admin Panel

**Routes**: `src/app/(protected)/dashboard/admin/`
**Features**: `src/features/protected/pages/dashboard/admin/`

### 3.1 Authentication

| Item | Status | Notes |
| :---- | :---- | :---- |
| Email + password login | ✅ | `src/features/auth/pages/signin/` |
| Password reset via email | ✅ | `src/features/auth/pages/forget-password/` + `reset-password/` |

### 3.2 Admin Dashboard

| Item | Status | Notes |
| :---- | :---- | :---- |
| Summary cards (key metrics: bookings, sessions, revenue, active students) | ❌ | Stub text only |
| Sidebar items: Dashboard, Bookings, Sessions, Teachers, Packages, Blog, Calendar | ❌ | **Current sidebar is wrong**. Has "User Management" and "Student Management" with sub-items; needs full replacement per spec |

> **Action**: Rewrite `admin-sidebar-nav-items.ts` with correct items: Dashboard, Bookings, Sessions, Teachers, Packages, Blog, Calendar.

### 3.3 Manage Teachers

**Route to create**: `src/app/(protected)/dashboard/admin/teachers/`
**Feature to create**: `src/features/protected/pages/dashboard/admin/pages/teachers/`

| Item | Status | Notes |
| :---- | :---- | :---- |
| List teachers (data table) | ❌ | |
| Add teacher: name, bio, photo, specialisations, availability status | ❌ | |
| Edit teacher | ❌ | |
| Deactivate teacher (soft delete / toggle) | ❌ | |
| Weekly availability schedule per teacher | ❌ | |

### 3.4 Manage Bookings

**Route to create**: `src/app/(protected)/dashboard/admin/bookings/`
**Feature to create**: `src/features/protected/pages/dashboard/admin/pages/bookings/`

| Item | Status | Notes |
| :---- | :---- | :---- |
| List bookings with filters (teacher, date range, status) | ❌ | |
| Data table with sort/filter | ❌ | |
| Export CSV | ❌ | |

### 3.5 Manage Sessions

**Route to create**: `src/app/(protected)/dashboard/admin/sessions/`
**Feature to create**: `src/features/protected/pages/dashboard/admin/pages/sessions/`

| Item | Status | Notes |
| :---- | :---- | :---- |
| View upcoming and past sessions | ❌ | |
| Mark session as Completed / No-Show / Rescheduled | ❌ | |
| Add admin notes per session | ❌ | |

### 3.6 Manage Blog

**Route to create**: `src/app/(protected)/dashboard/admin/blog/`
**Feature to create**: `src/features/protected/pages/dashboard/admin/pages/blog/`

| Item | Status | Notes |
| :---- | :---- | :---- |
| List posts (title, date, status, category) | ❌ | |
| Create post: rich text editor, image upload, SEO fields, publish toggle | ❌ | |
| Edit post | ❌ | |
| Delete post | ❌ | |

### 3.7 Manage Packages

**Route to create**: `src/app/(protected)/dashboard/admin/packages/`
**Feature to create**: `src/features/protected/pages/dashboard/admin/pages/packages/`

| Item | Status | Notes |
| :---- | :---- | :---- |
| View all package types | ❌ | |
| Create package: name, price, classes, validity, active toggle | ❌ | |
| Edit package | ❌ | |
| Active/inactive toggle | ❌ | |

### 3.8 Admin Calendar

**Route to create**: `src/app/(protected)/dashboard/admin/calendar/`
**Feature to create**: `src/features/protected/pages/dashboard/admin/pages/calendar/`

| Item | Status | Notes |
| :---- | :---- | :---- |
| Monthly/weekly calendar view of all sessions | ❌ | |
| Filter by teacher | ❌ | |
| Click session → details popup | ❌ | |
| Color-coded by teacher | ❌ | |

---

## 4. Customer Portal

**Routes**: `src/app/(protected)/dashboard/student/`
**Features**: `src/features/protected/pages/dashboard/student/`

### 4.1 Authentication

| Item | Status | Notes |
| :---- | :---- | :---- |
| Account auto-created on first completed booking | ❌ | Not implemented |
| Welcome email with auto-generated password + change link | ❌ | Not implemented |
| Email + password login | ✅ | Uses same auth as admin |
| Password reset via email | ✅ | |

### 4.2 Customer Dashboard

| Item | Status | Notes |
| :---- | :---- | :---- |
| Upcoming session widget | ❌ | Stub only |
| Package progress bar (classes remaining / used) | ❌ | |
| Recent invoices section | ❌ | |
| Sidebar items: Dashboard, My Packages, My Invoices, My Calendar | ❌ | **Current sidebar is wrong**. Has "Student Management" and "Profile & Settings"; needs replacement per spec |

> **Action**: Rewrite `student-sidebar-nav-items.ts` with correct items: Dashboard, My Packages, My Invoices, My Calendar.

### 4.3 View Invoices

**Route to create**: `src/app/(protected)/dashboard/student/invoices/`
**Feature to create**: `src/features/protected/pages/dashboard/student/pages/invoices/`

| Item | Status | Notes |
| :---- | :---- | :---- |
| List: date, package, amount, payment status | ❌ | |
| Download invoice PDF per booking | ❌ | |

### 4.4 View Purchased Packages

**Route to create**: `src/app/(protected)/dashboard/student/packages/`
**Feature to create**: `src/features/protected/pages/dashboard/student/pages/packages/`

| Item | Status | Notes |
| :---- | :---- | :---- |
| Package name, classes remaining/used, expiry date | ❌ | |
| Progress indicator | ❌ | |

### 4.5 Customer Calendar

**Route to create**: `src/app/(protected)/dashboard/student/calendar/`
**Feature to create**: `src/features/protected/pages/dashboard/student/pages/calendar/`

| Item | Status | Notes |
| :---- | :---- | :---- |
| Upcoming and past sessions in student's timezone | ❌ | |
| Reschedule (free up to 24h before) | ❌ | |
| Cancel | ❌ | |

---

## 5. Functional Requirements

### 5.1 Lead Capture & Email Automation

| Item | Status | Notes |
| :---- | :---- | :---- |
| Homepage form: first name + email | ✅ | |
| GDPR checkbox (required) | ✅ | Confirmed in `LeadCaptureSection` |
| On submit: send PDF download link via email | ❌ | UI submits; backend not wired |
| On submit: add to email nurture sequence | ❌ | Email platform not configured |
| On submit: show success message | ✅ | |
| Nurture: 4 emails over 14 days | ❌ | Not implemented |

### 5.2 Post-Booking Automated Emails

| Item | Status | Notes |
| :---- | :---- | :---- |
| Immediate: booking confirmation + Google Meet link + prep guide PDF | ❌ | |
| 24h before class: reminder + Google Meet link | ❌ | |
| 1h after class: follow-up + package recommendation | ❌ | |

### 5.3 Language Toggle (EN/ES)

| Item | Status | Notes |
| :---- | :---- | :---- |
| UI toggle in navbar | ✅ | `language-provider.tsx` with cookie persistence |
| `/es/` URL structure for SEO | ❌ | Only client-state toggle; no URL routing |
| Full Spanish content translation | ❌ | Content not translated |
| `hreflang` tags on all pages | ❌ | |

### 5.4 Analytics & Tracking

| Item | Status | Notes |
| :---- | :---- | :---- |
| Google Analytics 4 (GA4) on all pages | ❌ | |
| Key event tracking (CTA clicks, booking starts, completions, lead capture) | ❌ | |
| Google Search Console verification + sitemap.xml | ❌ | |

---

## 6. SEO Foundation

| Item | Status | Notes |
| :---- | :---- | :---- |
| Meta titles + descriptions per page | ❌ | |
| Canonical tags | ❌ | |
| Structured data (LocalBusiness, EducationalOrganization, Course, FAQPage) | ❌ | |
| Alt text on all images | 🔄 | Partially done. Some images have `alt=""` |
| sitemap.xml | ❌ | |
| robots.txt | ❌ | |

---

## 7. Items Implemented Outside Phase 1 Scope

The following features are already in the codebase but fall outside the Phase 1 specification. They should be tracked separately and not treated as Phase 1 deliverables. Some may be early Phase 2 work; others are enhancements added during frontend build-out.

| Feature | Location | Notes |
| :---- | :---- | :---- |
| **Activities page** (`/activities`) | `src/features/marketing/pages/activities/` | Full page with tabbed activity cards and weekly schedule table. Not in Phase 1 spec. Appears to be a future page or additional immersion content. |
| **Homepage: VideoPreviewSection** | `home/components/VideoPreviewSection` | Extra section before the Trust Bar. Not in spec's A-G homepage layout. |
| **Homepage: SchoolIntroVideoSection** | `components/SchoolIntroVideoSection` | Extra section in homepage flow. |
| **Homepage: PopularProgramsSection** | `components/PopularProgramsSection` | Extra section. |
| **Homepage: WelcomeSchoolSection** | `home/components/WelcomeSchoolSection` | Extra section. |
| **Homepage: MapLocationSection** | `components/MapLocationSection` | Extra section at bottom of homepage. Not in spec. |
| **Footer contact form** | `layout/footer/Footer` | Name + Email + Phone + Message form embedded in footer. Spec defines footer as quick links + contact details only. |
| **Language provider (client-state)** | `providers/language-provider.tsx` | UI toggle with cookie persistence implemented ahead of the full `/es/` URL routing that spec requires. Useful scaffolding, but incomplete as per spec. |
| **Admin sidebar: User Management** | `admin/sidebar/admin-sidebar-nav-items.ts` | Not in Phase 1 admin spec (spec: Bookings, Sessions, Teachers, Packages, Blog, Calendar). |
| **Admin sidebar: Student Management sub-items** (Students, Services, Performance, Revenue Report) | `admin/sidebar/admin-sidebar-nav-items.ts` | Not in Phase 1 spec. These need to be replaced with the correct Phase 1 sidebar structure. |
| **Student dashboard: Student Management page** | `student/pages/student-management/` | Not in Phase 1 customer spec. |
| **Student dashboard: Profile & Account Settings** | `student/pages/profile-and-settings/` | Not explicitly in Phase 1 customer spec (spec covers invoices, packages, calendar only). Could be valid but was not in original scope. |
