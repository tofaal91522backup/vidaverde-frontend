

**VIDA VERDE CENTRO DE ESPAÑOL**

*Website Redesign Specification*

**Prepared for Ongshak Development Team**

*To be used alongside: Website Redesign Strategy (v4) and Segment 1 SOW*

Prepared by: Jeremy / Vida Verde Advisory  ·  May 2026  ·  Confidential

| How to Use This Document This specification defines the content, copy direction, and functional requirements for every page of the redesigned Vida Verde website. It is the primary reference for Ongshak during Phase 1.2 (Figma design) and Phase 1.3 (development and integration). Layout and visual design decisions are intentionally left to Ongshak’s designers. This document specifies WHAT each page must contain and DO, not how it should look. Where suggested headline or CTA copy is provided, treat it as directional. The intent and tone must be preserved, but wording may be refined during Phase 1.1 discovery. Sections marked \[VIDA VERDE TO SUPPLY\] require content or assets from Rosa and Mateo before development can begin. These should be flagged and collected during Phase 1.1. |
| :---- |

# **1\.  Site Architecture**

## **1.1  Navigation Structure**

The primary navigation must be simplified from the current 14+ item structure to a maximum of 5 top-level items. Every item must lead to a conversion action within 2–3 clicks.

| Nav Item | URL | Purpose | Primary CTA |
| :---- | :---- | :---- | :---- |
| **Online Classes** | /online-classes | Primary product page. Entry point for the primary audience segment. | Book Your First Lesson |
| **Study in Quito** | /study-in-quito | Overview of all in-person and immersion programs. | Inquire / Book a Program |
| **Travel Spanish** | /travel-spanish | Dedicated page for Ecuador-bound travellers wanting conversational or travel Spanish. Future ad campaign landing page. | Plan My Travel Spanish |
| **Our School** | /our-school | School history, AECEE certification, team, and ethos. | Meet Our Teachers |
| **Contact** | /contact | Contact form, WhatsApp link, location map. | Send a Message / WhatsApp |

The language toggle (English / Español) appears in the top navigation bar as a persistent element, not buried in a footer. URL structure for the Spanish version should use a /es/ prefix (e.g. /es/clases-en-linea) to preserve SEO value for both languages.

## **1.2  Full Sitemap**

| Page | URL | Notes |
| :---- | :---- | :---- |
| **Homepage** | / | Primary conversion surface for all three segments |
| **Online Classes** | /online-classes | Product page. Flagship offering |
|   **└ Book a Lesson** | /online-classes/book | Booking flow: select teacher, date, pay |
|   **└ Teacher: \[Name\]** | /online-classes/teachers/\[name\] | Individual teacher profile (one per teacher) |
| **Study in Quito** | /study-in-quito | Immersion programs overview |
|   **└ Quito Immersion Program** | /study-in-quito/quito-immersion | Program detail page |
|   **└ Travelling Classroom** | /study-in-quito/travelling-classroom | Program detail page |
|   **└ Puerto López** | /study-in-quito/puerto-lopez | Program detail page |
|   **└ \[Jungle Programs. Confirm active status\]** | /study-in-quito/jungle | Program detail page. Only if confirmed active |
| **Travel Spanish** | /travel-spanish | Dedicated page for Ecuador travellers wanting conversational or travel Spanish. Future ad campaign landing page. |
| **Our School** | /our-school | School story, certification, team |
| **Blog** | /blog | Content hub. Structure only at launch; content TBD |
|   **└ \[Post slug\]** | /blog/\[slug\] | Individual blog post |
| **Contact** | /contact | Contact form and location |
| **Privacy Policy** | /privacy | Required for GDPR / email capture compliance |
| **Terms of Service** | /terms | Required for payment processing |

# **2\.  Global Elements**

These elements appear on every page of the site and must be consistent, accessible, and fully functional across all device sizes.

## **2.1  Header / Navigation Bar**

* Vida Verde logo (left-aligned). Links to homepage

* Primary nav items: Online Classes, Study in Quito (sub: Quito Immersion, Travelling Classroom, Puerto López, Homestay), Our School, Contact

* Language toggle: EN | ES (right side of nav, persistent)

* Primary CTA button in nav: “Book Your First Lesson”. This button must be visible at all times on desktop

* On mobile: hamburger menu with the same items. The CTA button collapses into the menu.

* Nav bar should be sticky (remains visible on scroll)

| Suggested Nav CTA Copy “Book Your First Lesson”  (links to /online-classes/book) |
| :---- |

## **2.2  Footer**

* School name, tagline, and AECEE certification badge

* Quick links: Online Classes, Study in Quito (sub: Quito Immersion, Travelling Classroom, Puerto López, Homestay), Our School, Blog, Contact, Privacy Policy, Terms

* Contact block: email address, WhatsApp number, physical address (La Floresta, Quito)

* Social media icons: Instagram and Facebook only (if active). No Twitter/X, no LinkedIn unless confirmed active

* Copyright line: © 2026 Vida Verde Centro de Español. All rights reserved.

* Language toggle repeated in footer

| Note for Ongshak Twitter/X and LinkedIn links from the current site should NOT be carried forward unless Vida Verde confirms those channels are actively maintained. Dead social links undermine credibility. |
| :---- |

## **2.3  Floating WhatsApp Button**

* Persistent floating button, visible on all pages and all scroll positions

* On click: opens WhatsApp with pre-filled message: “Hi, I'd like to find out more about Vida Verde's Spanish classes.”

* Should not obstruct key page content or CTAs on mobile

* WhatsApp number: \[VIDA VERDE TO SUPPLY\]

## **2.4  Trust Bar**

A compact horizontal bar displaying key credibility signals. Must appear on the homepage (below the hero CTA) and optionally on the Online Classes page.

* AECEE Certified

* Est. 1999

* 4,700+ Students

* All Levels Welcome

* Classes via Google Meet

# **3\.  Page Specifications**

## **3.1  Homepage  ( / )**

The homepage serves all three visitor segments but is optimised for the primary segment: online Spanish learners. Every section must advance a visitor toward one of the three primary CTAs. Sections are listed in recommended scroll order.

### **Section A. Hero**

| Homepage. Hero | *Section A* |
| :---- | ----: |

| Element | Specification |
| :---- | :---- |
| **Purpose** | Immediately communicate what Vida Verde is, establish trust, and drive the primary CTA |
| **Primary CTA** | “Start for $12. Book Your First Lesson” → links to /online-classes/book |
| **Secondary CTA** | “Explore All Programs” → links to /study-in-quito |
| **Trust bar** | Appears directly below the CTA buttons: AECEE Certified · Est. 1999 · 4,700+ Students · All Levels Welcome · Classes via Google Meet |
| **Background image** | \[VIDA VERDE TO SUPPLY\]. Real photo of teacher and student in session, or school exterior / garden. No stock imagery. |

| Suggested Hero Copy Headline: “Learn Spanish Online. One-on-One. With a Real Teacher.” Subheadline: “Expert Ecuadorian teachers, personalised lessons, flexible scheduling. From anywhere in the world.” Primary CTA button: “Start for $12. Book Your First Lesson” Secondary CTA link: “Explore all programs →” |
| :---- |

### **Section B. Why Vida Verde?**

| Homepage. Why Vida Verde? | *Section B* |
| :---- | ----: |

| Element | Specification |
| :---- | :---- |
| **Purpose** | Differentiate Vida Verde from app-based competitors (Duolingo, Babbel) and freelance marketplaces (iTalki, Preply) |
| **Format** | 3–4 differentiator cards or blocks, each with a short headline and 1–2 sentence description |
| **Section headline** | “More than an app. More than a freelancer.” |

Suggested differentiator headlines and copy:

| Headline | Supporting Copy |
| :---- | :---- |
| **🏫 A Real School, Not a Platform** | Vida Verde has been teaching Spanish since 1999\. AECEE-certified, structured, and accountable. Not a marketplace of strangers. |
| **👩‍🏫 Expert Native Teachers** | Every teacher is a university-trained Ecuadorian native speaker with years of classroom experience. Not a hobbyist. Not a part-timer. |
| **🎯 Personalised to You** | No fixed syllabus. Your teacher adapts every lesson to your level, goals, and pace. Whether you’re a complete beginner or polishing your fluency. |
| **💻 Learn Anywhere** | Classes via Google Meet. Real conversation, real feedback, real progress. From your living room, office, or café. |

### **Section C. Course Selector**

| Homepage. Course Selector | *Section C* |
| :---- | ----: |

| Element | Specification |
| :---- | :---- |
| **Purpose** | Give each visitor segment a clear, filtered path to their relevant product |
| **Section headline** | “Find Your Perfect Spanish Program” |
| **Format** | 3–4 cards, each representing one audience path. Each card: short label, one-line description, price indicator, CTA button. |

| Card | Description | CTA | Links to |
| :---- | :---- | :---- | :---- |
| **Online Classes** | One-on-one lessons with a native teacher via Google Meet. Flexible scheduling, all levels. | From $12. Book Your First Lesson | /online-classes |
| **Study in Quito** | Full immersion: daily classes, homestay with an Ecuadorian family, and cultural activities. | From $140/week. Explore Programs | /study-in-quito |
| **Travel Spanish** | Short-stay classes for Ecuador travellers. A few days or weeks, in-person or online. | Contact Us for a Custom Plan | /contact |
| **Free Spanish Guide** | Not sure where to start? Download our free guide and get a taste of Vida Verde. | Download Free. No Commitment | \#lead-capture |

### **Section D. Social Proof**

| Homepage. Social Proof | *Section D* |
| :---- | ----: |

| Element | Specification |
| :---- | :---- |
| **Purpose** | Build trust through student outcomes and third-party validation |
| **Section headline** | “Real Students. Real Results.” |
| **Testimonial format** | 3–5 testimonials. Each must include: student photo, first name, country flag, and a specific outcome (not a generic compliment). \[VIDA VERDE TO SUPPLY\] |
| **TripAdvisor badge** | Vida Verde’s TripAdvisor rating displayed as an embedded badge or static graphic with star rating and review count. \[VIDA VERDE TO SUPPLY. TripAdvisor profile URL\] |
| **Stats block** | 4 key numbers displayed prominently: 4,781 Students Taught · 356 Courses · 25+ Years · AECEE Certified |

| Note on Testimonials Generic testimonials (“Great school\!”, “I loved my teacher”) do not convert. Each testimonial must describe a specific outcome: “After 8 weeks with Lucía, I was able to hold a full conversation with my partner’s family in Guayaquil.” “My teacher helped me prepare for a job interview conducted entirely in Spanish. I got the job.” If existing testimonials are generic, Vida Verde should reach out to past students to request updated, outcome-specific versions before launch. |
| :---- |

### **Section E. Meet the Teachers**

| Homepage. Meet the Teachers | *Section E* |
| :---- | ----: |

| Element | Specification |
| :---- | :---- |
| **Purpose** | Create a human connection and reduce anxiety about booking with an unknown teacher |
| **Section headline** | “Your Teacher Is Waiting” |
| **Format** | One card per teacher. Each card: professional photo, name, 1–2 sentence teaching style description, “Book with \[Name\]” CTA button. |
| **Teachers** | Fernando, Ximena, Lucía, Laura. Show only those confirmed available for online classes. \[VIDA VERDE TO CONFIRM\] |
| **Photos** | \[VIDA VERDE TO SUPPLY\]. Professional or high-quality phone headshots. Consistent background or treatment across all teachers. |
| **CTA per card** | “Book with \[Teacher Name\]” → links to /online-classes/book?teacher=\[name\] |

### **Section F. About the School (Short)**

| Homepage. About Block | *Section F* |
| :---- | ----: |

| Element | Specification |
| :---- | :---- |
| **Purpose** | Brief credibility block. Not a full About page, just enough to establish legitimacy |
| **Section headline** | “Teaching Spanish Since 1999” |
| **Content** | 2–3 sentences about the school’s founding, AECEE certification, and La Floresta location. Links to the full About page. |
| **Image** | \[VIDA VERDE TO SUPPLY\]. Exterior of school building or garden patio |
| **CTA** | “Our Story →” links to /our-school |
| **AECEE badge** | Certification logo displayed with a one-line explanation: “AECEE-certified Spanish school” and a link to the AECEE website |

| Suggested About Block Copy “Since 1999, our teachers have been helping students learn Spanish. And through it, discover the culture, warmth, and remarkable natural world of Ecuador. Imagine ordering your meal in Spanish without hesitating. Following a conversation around the table without losing the thread. Travelling through Ecuador and actually connecting with the people you meet. Not just observing them. Over 4,700 students from every corner of the world have had that experience with us. Online and in person. As a certified member of the AECEE, Ecuador's standard of excellence in Spanish language education, you can trust that every lesson is taught by a qualified native speaker, designed around you, and held to the highest professional standard.” |
| :---- |

### **Section G. Lead Capture**

| Homepage. Lead Capture | *Section G* |
| :---- | ----: |

| Element | Specification |
| :---- | :---- |
| **Purpose** | Capture email addresses from visitors not yet ready to book. Entry point to the Tier 1 nurture funnel. |
| **Section headline** | “Not Sure Where to Start? Get Your Free Spanish Guide.” |
| **Offer** | A downloadable PDF: “Survival Spanish for Ecuador: 50 Essential Phrases for Travellers and Learners” (or equivalent). \[VIDA VERDE TO SUPPLY. Content; Ongshak to design PDF template\] |
| **Form fields** | First name \+ email address only. No phone number. No other fields. |
| **Form action** | On submit: (1) deliver PDF download link by email; (2) add to email nurture sequence (see Section 8: Functional Requirements); (3) show on-page success message. |
| **Anchor** | This section should have anchor ID \#lead-capture so the Course Selector card can link to it directly |

## **3.2  Online Classes Page  ( /online-classes )**

This is the most important product page on the site. It must function as a standalone landing page. A visitor arriving here from a Google ad or an iTalki profile link should have everything they need to understand the offering and book without visiting any other page.

### **Section A. Page Hero**

| Online Classes. Hero | *Section A* |
| :---- | ----: |

| Element | Specification |
| :---- | :---- |
| **Purpose** | Restate the core value proposition for visitors arriving directly on this page (not via homepage) |
| **Primary CTA** | “Start for $12. Book Your Assessment & First Lesson” → links to /online-classes/book |
| **Trust bar** | Same trust bar as homepage: AECEE Certified · Est. 1999 · 4,700+ Students · Classes via Google Meet |

| Suggested Page Hero Copy Headline: “One-on-One Spanish Classes. Real Teacher. Anywhere in the World.” Subheadline: “Personalised lessons with expert Ecuadorian native speakers. Via Google Meet, at a time that works for you.” |
| :---- |

### **Section B. How It Works**

| Online Classes. How It Works | *Section B* |
| :---- | ----: |

| Element | Specification |
| :---- | :---- |
| **Purpose** | Remove uncertainty by explaining the booking and learning process in simple steps |
| **Format** | 4-step horizontal or vertical flow: icon \+ step number \+ short label \+ 1-sentence description |

| Step | Label | Description |
| :---- | :---- | :---- |
| **1** | Book Your First Lesson | Choose a teacher, pick a time, and pay your discounted first lesson fee. All in under 5 minutes. |
| **2** | Meet Your Teacher | Join via Google Meet at your scheduled time. Your teacher will assess your level and learning goals. |
| **3** | Get a Personalised Plan | After the first session, your teacher recommends a package tailored to your goals and timeline. |
| **4** | Make Real Progress | Regular sessions, structured feedback, and access to learning resources between classes. |

### **Section C. Pricing & Packages**

| Online Classes. Pricing | *Section C* |
| :---- | ----: |

| Element | Specification |
| :---- | :---- |
| **Purpose** | Present all purchase options transparently so visitors can self-select without needing to contact the school |
| **Section headline** | “Simple, Transparent Pricing” |
| **Currency note** | Display in USD. Consider adding a currency converter or note (“All prices in USD”) |

| Package | Price | What’s Included | CTA | Notes |
| :---- | :---- | :---- | :---- | :---- |
| **Assessment & First Lesson** | $10–$15 (confirm exact price with Vida Verde) | 60-minute session. Includes level assessment, personalised learning plan, and your first full lesson. One per student. | Book Now → | PRIMARY. Most prominent card |
| **10-Class Package** | $X (confirm price) | 10 x 60-minute private lessons. Valid for 3 months. | Get Started → |  |
| **20-Class Package** | $250.00 (confirm / update) | 20 x 60-minute private lessons. Best value. Valid for 6 months. | Get Started → | Highlight as “Best Value” |
| **Single Class** | $X per hour (confirm price) | Pay-as-you-go. No commitment. | Book a Class → |  |

| Note All prices marked \[confirm\] must be verified with Rosa and Mateo before Phase 1.2 design. Current pricing from the live site may be outdated. |
| :---- |

### **Section D. Choose Your Teacher**

| Online Classes. Teachers | *Section D* |
| :---- | ----: |

| Element | Specification |
| :---- | :---- |
| **Purpose** | Allow visitors to select a teacher before booking, creating a personal connection and increasing commitment |
| **Section headline** | “Choose Your Teacher” |
| **Card content** | Each teacher card: professional photo, name, short teaching bio (2–3 sentences), availability indicator (e.g. “Accepting new students” or “Limited availability”), “Book with \[Name\]” CTA |
| **Availability** | Only show teachers confirmed available for online classes. \[VIDA VERDE TO CONFIRM per teacher\] |
| **Full bios** | Each card links to a full teacher profile page at /online-classes/teachers/\[name\] (see Section 3.3) |
| **Content needed** | \[VIDA VERDE TO SUPPLY\]. Teacher bios (2–3 sentences each), availability status, headshot photos |

### **Section E. FAQ**

| Online Classes. FAQ | *Section E* |
| :---- | ----: |

| Element | Specification |
| :---- | :---- |
| **Purpose** | Address the most common objections and questions to reduce pre-booking hesitation |
| **Format** | Accordion (expand/collapse) FAQ list. 6–8 questions. |

| Question | Suggested Answer |
| :---- | :---- |
| **What platform do you use?** | We teach via Google Meet. You’ll receive a link before each class. No downloads required. It works in any browser. |
| **What level do I need to be?** | None. We teach complete beginners through to advanced speakers. Your first lesson includes a level assessment so your teacher can tailor the course to you. |
| **How do I pay?** | Securely online via credit/debit card, Apple Pay, or Google Pay. Payment is processed at the time of booking. |
| **Can I choose my teacher?** | Yes. Browse our teachers, read their profiles, and book directly with the one that feels right for you. |
| **What if I need to reschedule?** | You can reschedule up to 24 hours before your class. Contact your teacher directly or use the booking system. \[Confirm cancellation policy with Vida Verde\] |
| **Is there a contract or commitment?** | No. The discounted first lesson is a one-time purchase. After that, you choose a package or pay per class. No lock-in. |
| **How long are the classes?** | Standard classes are 60 minutes. Some packages may offer 45-minute options. Confirm with your teacher. |
| **Do you offer group classes?** | Our online programme focuses on one-on-one instruction for maximum personalisation. Group classes are available for our Quito immersion programmes. |

### **Section F. Bottom CTA**

| Online Classes. Bottom CTA | *Section F* |
| :---- | ----: |

| Suggested Bottom CTA Copy Headline: “Ready to Start? Your First Lesson Is Just $12.” Subheadline: “Book your Spanish Assessment & First Lesson today. No commitment. Cancel or continue. It’s your call.” CTA button: “Book My First Lesson →” |
| :---- |

## **3.3  Teacher Profile Page  ( /online-classes/teachers/\[name\] )**

One page per teacher. These pages serve two purposes: building trust before booking, and functioning as SEO landing pages for searches like “learn Spanish online with Ecuadorian teacher.”

| Element | Specification |
| :---- | :---- |
| **Profile photo** | Large, professional photo. \[VIDA VERDE TO SUPPLY per teacher\] |
| **Name and credentials** | Full name, university/qualification, years of experience, languages spoken |
| **Teaching bio** | 3–5 sentences in first person: teaching philosophy, favourite student moments, what makes their approach unique. \[VIDA VERDE TO SUPPLY per teacher\] |
| **Specialisations** | e.g. Beginner-friendly, DELE preparation, Business Spanish, Conversational practice |
| **Availability** | Current availability status: “Accepting new students. Next available: \[date\]” or “Limited availability” |
| **Student reviews** | 2–3 testimonials specifically mentioning this teacher (pulled from the global testimonial pool) |
| **Primary CTA** | “Book Your First Lesson with \[Name\]” → /online-classes/book?teacher=\[name\] |
| **Secondary CTA** | “Back to all teachers →” |

| Content Needed per Teacher. \[VIDA VERDE TO SUPPLY\] Professional headshot photo (consistent lighting / background across all teachers) University qualification and year Years of teaching experience Teaching bio in first person (3–5 sentences) Specialisations (2–3 bullet points) Current availability status |
| :---- |

## **3.4  Booking Flow  ( /online-classes/book )**

The booking flow is a critical functional requirement. It must be fully self-service, completable on mobile, and require no manual intervention from Vida Verde staff for standard bookings.

| Step | Stage | Specification |
| :---- | :---- | :---- |
| **Step 1** | Select teacher | Dropdown or card selector. Pre-populated if arriving from a teacher-specific CTA (?teacher=\[name\]) |
| **Step 2** | Select package | Discounted First Lesson (default/highlighted), Single Class, 10-Class Pack, 20-Class Pack |
| **Step 3** | Select date & time | Calendar / time picker showing teacher’s real availability. Timezone auto-detected with manual override. |
| **Step 4** | Enter details | First name, last name, email address, current Spanish level (dropdown: None / Beginner / Intermediate / Advanced) |
| **Step 5** | Payment | Stripe or equivalent gateway. Credit/debit card, Apple Pay, Google Pay. Single screen, no redirects where possible. |
| **Step 6** | Confirmation | On-screen: booking summary, teacher name, date/time in user’s timezone, Google Meet link. Email: same info \+ prep materials PDF. |

| Post-Booking Automated Emails (see also Section 8.3) Immediate: booking confirmation with Google Meet link, teacher intro note, and “What to Expect” prep guide 24 hours before class: reminder with Google Meet link 1 hour after class: follow-up with personalised package recommendation and booking link |
| :---- |

## **3.5  Study in Quito  ( /study-in-quito )**

Overview page for all in-person and travel immersion programmes. Visitors arrive here from the homepage Course Selector or the main navigation. The page should orient them quickly and route them to the relevant programme detail page.

### **Section A. Page Hero**

| Study in Quito. Hero | *Section A* |
| :---- | ----: |

| Suggested Hero Copy Headline: “Immerse Yourself in Spanish. Live It in Ecuador.” Subheadline: “From a week of classes and culture in Quito to a journey deep into the Amazon. Vida Verde's immersion programmes weave expert teaching, guided activities, tourism and life with a local Ecuadorian family into a single, unforgettable experience” Primary CTA: “Explore Programmes ↓” (smooth scroll to programme cards) Secondary CTA: “Contact Us to Plan Your Stay” → /contact |
| :---- |

### **Section B. Programme Cards**

| Study in Quito. Programmes | *Section B* |
| :---- | ----: |

| Programme | Description | Price from | CTA | Links to |
| :---- | :---- | :---- | :---- | :---- |
| **Quito Immersion Program** | The flagship programme. Daily one-on-one classes in La Floresta, homestay with an Ecuadorian family, and cultural activities in Quito. | From $140/week | View Programme → | /study-in-quito/quito-immersion |
| **Travelling Classroom** | Learn Spanish while exploring Ecuador. Classes in the morning, travel and culture in the afternoon. | From $740/person | View Programme → | /study-in-quito/travelling-classroom |
| **Puerto López** | Spanish on the Pacific coast. Morning classes, afternoon beach and whale-watching. | From $X/week | View Programme → | /study-in-quito/puerto-lopez |
| **Jungle Programme**   | Immersion in the Ecuadorian Amazon at GAIA or Yarina Lodge. \[Confirm active status with Vida Verde\] | From $X/person | View Programme → | /study-in-quito/jungle |

### **Section C. Homestay Preview**

| Study in Quito. Homestay Preview | *Section C* |
| :---- | ----: |

| Element | Specification |
| :---- | :---- |
| **Purpose** | Brief introduction to the homestay offering with a link to the full Homestay page |
| **Content** | 2–3 sentences describing the homestay experience. 1–2 photos of a host family or family home setting. \[VIDA VERDE TO SUPPLY\] |
| **CTA** | “Learn About Homestay →” links to /homestay |

| Suggested Enquiry CTA Copy Body: "The best Spanish classroom isn't a classroom at all. It's a family dinner table in Quito. Our homestay programme places you with a vetted Ecuadorian family, so the immersion never stops when the lesson does." CTA: "Find out about Homestay →" |
| :---- |

### **Section D. Enquiry CTA**

| Study in Quito. Enquiry | *Section D* |
| :---- | ----: |

| Suggested Enquiry CTA Copy Headline: “Not Sure Which Programme Is Right for You?” Subheadline: “Tell us a bit about your goals and we’ll recommend the best fit. WhatsApp us or send a message. We respond within 24 hours.” CTA 1: “WhatsApp Us” (opens WhatsApp) CTA 2: “Send a Message” → /contact |
| :---- |

## **3.6  Programme Detail Pages**

One page per programme. Same structure for all. Use the Quito Immersion Programme as the primary template.

| Section | Content Requirement |
| :---- | :---- |
| **Hero** | Programme name, 1-line description, primary CTA. Background: real photo from programme location. \[VIDA VERDE TO SUPPLY\] |
| **What’s Included** | Bullet list: classes per day, class format, homestay (if included), activities, airport transfer (if included), meals (if included) |
| **Sample Schedule** | A typical week laid out day by day or as a simple table. e.g. Mon–Fri: 9am–1pm classes, afternoon activities. |
| **Pricing Table** | By duration (1 week, 2 weeks, 4 weeks) and format (individual, pair, group). \[VIDA VERDE TO SUPPLY. Confirm current pricing\] |
| **Programme-Specific Photos** | Gallery of 3–6 real photos from the programme. \[VIDA VERDE TO SUPPLY\] |
| **Testimonial** | 1–2 testimonials from students who completed this specific programme |
| **Enquiry CTA** | “Ready to Book? Contact Us to Reserve Your Place.”. Form or WhatsApp link (not a self-service checkout; immersion bookings require coordination) |

## **3.7  Homestay Page  ( /homestay )**

The Homestay page sits under Study in Quito in the navigation but has its own URL (/homestay) and full page so it can be found via search and linked to from immersion programme pages.

| Element | Specification |
| :---- | :---- |
| **Hero** | Warm, human image of a host family or family home. Headline: “Live Like a Local. Learn Faster.” |
| **What is a Homestay?** | 2–3 paragraph explanation of the experience: living with an Ecuadorian family, meals included, language practice around the clock, cultural immersion beyond the classroom. |
| **What’s Included** | Bullet list: private room, meals per day, laundry, WiFi, local transport guidance, 24/7 support from Vida Verde |
| **Host Family Profiles** | 2–3 host family vignettes: family photo, first names, neighbourhood, a short ‘about us’ blurb. \[VIDA VERDE TO SUPPLY. With family consent\] |
| **Pricing** | $26/night (confirm / update). Note any included / optional extras. |
| **Combination offers** | Highlight that homestay \+ classes can be booked together as part of any immersion programme. |
| **Safety note** | Brief reassurance paragraph: Vida Verde vets all host families, all homes are in safe Quito neighbourhoods, 24/7 support available. Important for parents of younger students. |
| **CTA** | “Add Homestay to Your Programme” → /contact  or  “Included in Quito Immersion →” /study-in-quito/quito-immersion |

## **3.8  Travel Spanish  ( /travel-spanish )**

A lightweight page for the third audience segment: Ecuador-bound travellers who want conversational or travel Spanish. This page should be discoverable via the main navigation or the homepage Course Selector card, but does not need to be as content-heavy as the Online Classes or Study in Quito pages.

| Element | Specification |
| :---- | :---- |
| **Hero headline** | “Travelling to Ecuador? Learn the Spanish You’ll Actually Use.” |
| **Offering description** | 2–3 paragraphs: short-stay classes (a few days to a few weeks), in-person in Quito or via Google Meet, homestay option, travel advisory and cultural orientation from Vida Verde’s team. |
| **Travel advisory mention** | Brief mention that Vida Verde can advise on Ecuador travel routes, safety, local recommendations, and logistics. \[Confirm scope of this service with Rosa/Mateo\] |
| **TripAdvisor reviews** | Prominent display of TripAdvisor rating and 2–3 review excerpts from travellers (not long-term students). \[VIDA VERDE TO SUPPLY. TripAdvisor profile link\] |
| **Pricing note** | No fixed pricing table. Bespoke arrangements. “Pricing depends on duration and format. Contact us for a custom quote.” |
| **Primary CTA** | “Plan My Travel Spanish. WhatsApp Us” (opens WhatsApp with pre-filled message) |
| **Secondary CTA** | “Send Us a Message →” /contact |

## **3.9  Our School  ( /our-school )**

The Our School page is a credibility conversion lever, especially for international students wiring money to a school they have never visited. It must feel personal, trustworthy, and substantive.

| Element | Specification |
| :---- | :---- |
| **Page headline** | “25 Years. 4,700 Students. Lasting Connections.” |
| **Rosa’s story** | First-person narrative from Rosa about founding the school in 1999, the ethos behind it, and what Vida Verde means to her. 3–5 paragraphs. \[VIDA VERDE TO SUPPLY\] |
| **Photo** | Photo of Rosa and/or the team at the school. \[VIDA VERDE TO SUPPLY\] |
| **AECEE Certification** | Dedicated sub-section: what AECEE is, what certification means for students (quality assurance, structured curriculum, accountability), AECEE logo, link to AECEE website. |
| **La Floresta context** | Short paragraph: La Floresta neighbourhood. Safe, vibrant, bohemian, close to Quito’s cultural heart. Reassures immersion students about the school’s location. |
| **Teacher bios** | Full bios for all teachers (not just those available online). Photo, name, qualifications, years of experience, teaching philosophy. \[VIDA VERDE TO SUPPLY\] |
| **School gallery** | 6–12 photos: classrooms, garden/patio, teachers in session, school exterior, La Floresta street scenes. \[VIDA VERDE TO SUPPLY\] |
| **CTA** | “Ready to Start? →” links to /online-classes |

## **3.10  Blog  ( /blog )**

The blog is a long-term SEO and content marketing asset. At launch, the structure should be in place but content population is a post-launch activity. Ongshak should build the blog infrastructure and migrate or replace any existing posts from the current site.

| Element | Specification |
| :---- | :---- |
| **Blog index** | Card-based grid: post thumbnail image, title, date, category tag, excerpt (1–2 sentences), “Read More” link. |
| **Post template** | Clean, readable single-column layout. Author name, date, category, estimated reading time. Social share buttons (WhatsApp, Facebook, email). Related posts at bottom. |
| **Categories** | Suggested: Spanish Learning Tips, Ecuador Travel, School News, Student Stories, Culture & Language |
| **Existing posts** | Review current vidaverde.com blog posts. Migrate those with useful content; replace or remove those with outdated or placeholder copy. \[VIDA VERDE TO ADVISE on which to keep\] |
| **SEO** | Each post: unique meta title, meta description, proper heading hierarchy (H1, H2, H3), alt text on images. |
| **Lead capture** | A compact lead capture widget (email \+ first name, same as homepage Section G) should appear in the blog sidebar or after each post body. |

## **3.11  Contact  ( /contact )**

| Element | Specification |
| :---- | :---- |
| **Page headline** | “Start the Conversation.” |
| **Contact form fields** | Name, email, subject (dropdown: Online Classes / Immersion Programme / Homestay / Travel Spanish / Other), message. Submit button: “Send Message”. |
| **Response time note** | “We respond to all enquiries within 48 hours, Monday to Friday.” |
| **WhatsApp CTA** | Large, prominent WhatsApp button with pre-filled message. For visitors who prefer instant messaging. |
| **Email address** | Displayed as plain text for visitors who prefer to copy/paste. \[VIDA VERDE TO SUPPLY. School contact email\] |
| **Phone / WhatsApp number** | \[VIDA VERDE TO SUPPLY\] |
| **Location** | Embedded Google Map showing La Floresta, Quito. School address displayed below map. |
| **School address** | \[VIDA VERDE TO SUPPLY. Full street address\] |

# **4\.  Functional Requirements**

## **4.1  Booking System**

| Requirement | Specification |
| :---- | :---- |
| **Scheduling** | Teachers must be able to set their own availability. Students see only available slots. Timezone auto-detection on student side is essential. Ecuador is GMT-5. |
| **Booking options** | Recommend Calendly (Teams or higher), Acuity Scheduling, or a custom booking module. \[Vida Verde to confirm preference. See Open Questions in Strategy doc\] |
| **Payment on booking** | Payment is captured at time of booking, not after. No “pay later” option for the discounted first lesson or packages. |
| **Cancellation / reschedule** | Policy to be defined by Vida Verde. Suggest: free reschedule up to 24hrs; cancellations within 24hrs forfeit the booking fee. Clearly displayed before payment. |
| **Teacher notifications** | Automatic email to teacher on new booking: student name, level, date/time, Google Meet link. |
| **Student confirmation** | Automatic email to student: booking summary, teacher name, Google Meet link, prep guide PDF attachment. |

## **4.2  Payment Gateway**

| Requirement | Specification |
| :---- | :---- |
| **Recommended gateway** | Stripe (subject to Ecuador-specific availability and banking considerations). Alternatives: PayPal, Wise Payments, or local gateway if preferred. \[To be confirmed with Ongshak and Vida Verde before Phase 1.3\] |
| **Accepted methods** | Credit card (Visa, Mastercard), debit card, Apple Pay, Google Pay |
| **Currency** | USD (primary). Consider displaying local currency equivalents where feasible. |
| **Security** | PCI-compliant processing. Stripe handles all card data. Card numbers never touch Vida Verde’s servers. |
| **Receipts** | Automated payment receipts emailed to student on successful payment. |
| **Refunds** | Refund capability must be accessible to Vida Verde admin without requiring developer intervention. |

## **4.3  Lead Capture & Email Automation**

| Requirement | Specification |
| :---- | :---- |
| **Email platform** | Recommend Mailchimp (free up to 500 contacts) or Brevo. \[Vida Verde to confirm if existing list/CRM exists\] |
| **Tier 1 flow (free resource)** | 1\. Visitor submits name \+ email on homepage form. 2\. Auto-send PDF download link email. 3\. Add to “Prospect” list. 4\. Trigger nurture sequence (below). |
| **Nurture sequence** | Email 1 (Day 0): Welcome \+ PDF link. Email 2 (Day 3): “How to choose the right Spanish teacher” (value content). Email 3 (Day 7): Testimonial \+ “Book your first lesson for $12” offer. Email 4 (Day 14): Final nudge with urgency (e.g. “Limited teacher availability”). |
| **Post-booking sequence** | Trigger on completed booking. Email 1: Confirmation (immediate). Email 2: Reminder 24hrs before class. Email 3: Post-class follow-up with package recommendation 1hr after class end time. |
| **Unsubscribe** | All automated emails must include a one-click unsubscribe link (legal requirement). |
| **GDPR / privacy** | Form must include checkbox: “I agree to receive emails from Vida Verde. View our Privacy Policy.” Privacy Policy page required (/privacy). |

## **4.4  Language Toggle (English / Spanish)**

| Requirement | Specification |
| :---- | :---- |
| **URL structure** | English: /page-name. Spanish: /es/nombre-pagina. Separate URLs for SEO benefit in both languages. |
| **Content** | Full Spanish translation of all pages. \[Note: Spanish content will need to be supplied by Vida Verde or translated. Agree responsibility with Ongshak in Phase 1.1\] |
| **hreflang tags** | Required on all pages to signal language/region to Google. format: \<link rel=”hreflang” hreflang=”en” href=”...”\> and \<link rel=”hreflang” hreflang=”es” href=”...”\> |
| **Toggle behaviour** | Language preference persists across the session. Store in a cookie or localStorage. |

## **4.5  Analytics & Tracking**

| Requirement | Specification |
| :---- | :---- |
| **Platform** | Google Analytics 4 (GA4). Install on all pages. |
| **Key events to track** | Page views, CTA button clicks, booking form starts, booking completions, payment completions, lead capture form submissions, PDF downloads, WhatsApp button clicks |
| **Conversion goals** | Set up GA4 conversion events for: (1) Completed booking / payment, (2) Lead capture form submission |
| **Google Search Console** | Verify site on GSC and submit sitemap.xml after launch. |

# **5\.  SEO Foundation**

The following meta titles and descriptions are starting-point suggestions. They should be refined by Ongshak based on keyword research conducted in Phase 1.1.

| Page | Meta Title (max 60 chars) | Meta Description (max 155 chars) |
| :---- | :---- | :---- |
| **Homepage** | Learn Spanish Online with a Real Teacher | Vida Verde | Expert Ecuadorian Spanish teachers. One-on-one online classes via Google Meet. AECEE-certified school since 1999\. Book your first lesson for $12. |
| **Online Classes** | Online Spanish Classes | One-on-One with Native Teachers | Vida Verde | Personalised online Spanish lessons with certified native Ecuadorian teachers. Flexible scheduling, all levels. Start for $12. Includes level assessment. |
| **Study in Quito** | Spanish Immersion in Quito, Ecuador | Vida Verde | Full Spanish immersion programmes in Quito: daily classes, Ecuadorian homestay, and cultural activities. AECEE-certified school since 1999\. |
| **Travel Spanish** | Ecuadorian Homestay for Spanish Students | Vida Verde Quito | Live with an Ecuadorian family while studying Spanish in Quito. Includes meals, private room, and 24/7 Vida Verde support. From $26/night. |
| **Our School** | Our School | Vida Verde Spanish School in Quito Since 1999 | Vida Verde is an AECEE-certified Spanish school in La Floresta, Quito. Founded in 1999 by Rosa, we’ve taught 4,700+ students from around the world. |
| **Contact** | Contact Vida Verde | Spanish School Quito | WhatsApp & Email | Get in touch with Vida Verde. We respond within 48 hours. WhatsApp, email, or contact form. La Floresta, Quito, Ecuador. |

## **5.1  Technical SEO Checklist**

* sitemap.xml auto-generated and submitted to Google Search Console

* robots.txt configured correctly (no accidental blocking of key pages)

* Canonical tags on all pages to prevent duplicate content

* Structured data (Schema.org): LocalBusiness, EducationalOrganization, Course, FAQPage (for FAQ section)

* Alt text on all images (descriptive, keyword-relevant where appropriate)

* Page speed: target Lighthouse score \>80 on mobile and desktop

* SSL certificate active on all pages (https://)

* 301 redirects from any old URLs that change during the rebuild

# **6\.  Content Supply Summary**

The following table summarises all content items that must be supplied by Vida Verde (Rosa and Mateo) before development can begin on each phase. Ongshak should use this as a checklist during Phase 1.1 discovery.

| Category | Item | Priority | Needed By |
| :---- | :---- | :---- | :---- |
| **Photography** | Teacher headshots (Fernando, Ximena, Lucía, Laura) | Required | Before Phase 1.2 |
| **Photography** | School exterior, classrooms, garden/patio | Required | Before Phase 1.2 |
| **Photography** | Host family photos (with consent) | Required for Homestay page | Before Phase 1.2 |
| **Photography** | Programme location photos (Quito, Puerto López, Jungle if active) | Required | Before Phase 1.2 |
| **Copy** | Rosa’s founding story (About page) | Required | Before Phase 1.2 |
| **Copy** | Teacher bios in first person (3–5 sentences each) | Required | Before Phase 1.2 |
| **Copy** | Outcome-focused testimonials (minimum 5\) | Required | Before Phase 1.2 |
| **Copy** | Host family profile vignettes (2–3 families) | Required | Before Phase 1.3 |
| **Copy** | PDF content: Survival Spanish guide (50 phrases) | Required for lead capture | Before Phase 1.3 |
| **Pricing** | Confirm / update all pricing across all programmes | Required | Before Phase 1.2 |
| **Programmes** | Confirm active status of Jungle Programme (GAIA, Yarina) | Required | Before Phase 1.2 |
| **Teachers** | Confirm which teachers are available for online classes | Required | Before Phase 1.2 |
| **Accounts** | TripAdvisor profile URL for badge integration | Required | Before Phase 1.3 |
| **Accounts** | WhatsApp number for floating button and CTAs | Required | Before Phase 1.2 |
| **Accounts** | School contact email address | Required | Before Phase 1.2 |
| **Accounts** | School street address (for Contact page and Schema) | Required | Before Phase 1.2 |
| **Accounts** | Payment gateway account (Stripe or alternative) | Required | Before Phase 1.3 |
| **Accounts** | Email marketing account (Mailchimp, Brevo, or existing) | Required | Before Phase 1.3 |

| A Note to Ongshak’s Design and Development Teams This specification has been developed in parallel with the Website Redesign Strategy document, which provides the strategic rationale behind every requirement listed here. If any requirement in this spec seems unclear or arbitrary, the Strategy doc will explain the “why” behind it. The most important single decision in this project is the first-page experience for an online Spanish learner: they must know within 5 seconds what Vida Verde is, why it’s better than an app or a freelance teacher, and what to do next. Everything else in this spec serves that moment. We welcome Ongshak’s input on technical feasibility, platform choices, and implementation approach throughout Phase 1.1. This spec is a starting point for that conversation. Not a closed brief. |
| :---- |

*Vida Verde Centro de Español  ·  Est. 1999  ·  La Floresta, Quito, Ecuador*