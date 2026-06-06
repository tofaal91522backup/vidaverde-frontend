# **Vida Verde \- Development Plan Phase 1.0**

1. # **Phase 1.0 Scope**

| Area | Scope |
| :---- | :---- |
| Public | Booking, lead capture, blogs, packages |
| Admin | Auth, manage teachers/bookings/sessions/blogs/packages, calendar |
| Customer | Auth, invoices, packages, calendar |

2. **Core Functionalities**

   1. ##  **​Public**

### **Lead Capture & PDF Email**

* Form: **first name** and **email** only

  * On submit: send PDF download link via email, add to **nurture sequence**, show success message

    * GDPR checkbox required

    * Nurture: 4 emails over 14 days

### **Book First Lesson**

* *Step 1:* Select teacher

  * *Step 2:* Select package (Assessment & First Lesson default)

    * *Step 3:* Date/time picker: real availability, timezone auto-detect (GMT-5), manual override

    * *Step 4:* Details: first name, last name, email, Spanish level

    * *Step 5:* Dummy payment gateway (Stripe-ready)

    * *Step 6:* Confirmation screen \+ Google Meet link

    * *Emails*: invoice PDF \+ confirmation (immediate), reminder (24h before), follow-up (1h after class)

    * Reschedule free up to 24h before; cancellation within 24h forfeits fee

### **View Blogs**

* Index: card grid (thumbnail, title, date, category, excerpt, Read More)

  * Post: single-column, author, date, reading time, social share (WhatsApp/Facebook/Email), related posts

### **View & Purchase Packages**

* Display all packages with: ***price, inclusions, validity, CTA***

  * Prices in USD

  2. ##  **​Admin**

### **Authentication**

* Email & password login

  * Password reset via email

### **Manage Teachers**

* List, add, edit, deactivate teachers

  * Fields: ***name, bio, photo, specialisations, availability status***

    * Weekly availability schedule per teacher

### **Manage Bookings**

* List with filters (teacher, date range, status)

  * Export CSV

### **Manage Blogs**

* List (title, date, status, category)

  * Create/edit/delete: rich text editor, image upload, publish button

### **Manage Sessions**

* View upcoming and past sessions

  * Mark as Completed, No-Show, or Rescheduled; add admin notes

### **Manage Packages**

* View, create, edit package types (name, price, classes, validity, active toggle)

### **Admin Calendar**

* Monthly/weekly view of all sessions across all teachers

  * Filter by teacher; click session for details popup

    * Color-coded by teacher

  3. ##  **​Customer**

### **Authentication**

* Account auto-created on first completed booking, email will be sent will auto-generated password, and password change link

  * User account registration

    * Email and password login

    * Password reset via email

### **View Invoices**

* List: date, package, amount, payment status

  * Download invoice PDF per booking

### **View Purchased Packages**

* Package name, classes remaining/used, expiry date, progress indicator

### **Customer Calendar**

* Upcoming and past sessions in student's timezone

3. # **Frontend UI Changes**

   1. ##  **​Navigation**

| Item | CTA |
| :---- | :---- |
| Online Classes | Book Your First Lesson |
| Study in Quito | Inquire / Book a Program |
| Travel Spanish | Plan My Travel Spanish |
| Our School | Meet Our Teachers |
| Contact | Send a Message / WhatsApp |

      * Sticky navbar; 'Book Your First Lesson' button always visible desktop

      * **EN|ES toggle right** side of navbar (sticky)

      * Mobile: hamburger, CTA collapses into menu

      * Remove Twitter/X and LinkedIn unless confirmed active

   2.  **​Homepage Sections**

| Section | Changes |
| :---- | :---- |
| A \- Hero | Real photo background; Primary CTA 'Start for $12 \- Book Your First Lesson'; Secondary CTA 'Explore All Programs'; trust bar below CTAs |
| B \- Why Vida Verde? | 4 cards: Real School, Expert Native Teachers, Personalised, Learn Anywhere |
| C \- Course Selector | 4 cards: Online Classes, Study in Quito, Travel Spanish, Free Guide (→ \#lead-capture) |
| D \- Social Proof | 3-5 outcome-specific testimonials (photo, name, flag); TripAdvisor badge; stats block |
| E \- Meet the Teachers | Teacher cards with photo, name, teaching style, 'Book with \[Name\]' CTA |
| F \- About Block | 2-3 sentences, AECEE badge, 'Our Story →' link |
| G \- Lead Capture | Lead form (see 2.1) |

   3.  **​New Pages**

| Page | Elements |
| :---- | :---- |
| Online Classes | Hero, How It Works (4 steps), Pricing cards, Teacher selector, FAQ accordion, Bottom CTA |

| Page | Elements |
| :---- | :---- |
| Teacher Profile | Photo, bio, specialisations, availability, testimonials, Book CTA |
| Our School | Rosa's story, AECEE block, La Floresta context, Teacher bios, Gallery |
| Blog Index | Card grid, category filter, lead capture widget |
| Blog Post | Single-column, share buttons, related posts, lead capture widget |
| Contact | Form, WhatsApp CTA, email, Google Map, address |
| Privacy Policy | Required for GDPR / email capture |
| Terms of Service | Required for payment processing |

5. **Booking Flow UI**

   * 6-step progress indicator

     * Teacher selector: card or dropdown with photo, name, availability badge

     * Package cards: Assessment & First Lesson highlighted as primary

     * Calendar/time picker: real slots, timezone label \+ override

     * Payment: dummy gateway in Phase 1, Stripe-ready layout

     * Confirmation screen: summary, teacher, date/time (user timezone), Google Meet link

     * Fully mobile-optimised

   6. ## **Admin Panel UI**

      * Login page, dashboard summary cards

      * Sidebar: Dashboard, Bookings, Sessions, Teachers, Packages, Blog, Calendar

      * Data tables with sort/filter

      * Blog: rich text editor, image upload, SEO fields, publish toggle

      * Calendar: full-calendar month/week, color-coded by teacher

   7. ## **Customer Portal UI**

      * Login \+ 'Set up your account' flow

      * Dashboard: upcoming session, package progress bar, recent invoices

      * My Packages, My Invoices (download PDF), My Calendar (reschedule/cancel)

4. # **User Flow Diagrams**

1. **Lead capture**

2. **Booking userflow:**

3. **Admin Manage booking userflow:**

