# Vida Verde Website - Meeting Brief

## 1. Project Summary

Vida Verde website ta Spanish language school/business-er jonno built. Ekhane public website, booking flow, authentication, admin dashboard, and student/customer dashboard ache.

Main purpose:

- Visitor-ra course/program information dekhbe
- Interested student booking/contact korte parbe
- Admin booking, teachers, sessions, packages, blog manage korte parbe
- Student/customer nijer invoices, packages, calendar/session details dekhte parbe

Tech stack:

- Next.js App Router
- TypeScript
- Tailwind CSS + shadcn/ui
- React Query for API data fetching
- Axios wrapper based API calls
- Zod based form validation
- JWT session with encrypted cookies

## 2. Public Website Sections

Public visitor er jonno website-e main information pages ache:

- Home page
- Courses
- Online classes
- Study in Quito
- Travel Spanish
- Activities
- Homestay
- Blog
- Contact
- Book page
- Terms and Privacy pages

Public side-er goal holo Vida Verde-r course, program, Ecuador/Quito immersion experience, online Spanish class, homestay, activities, and pricing/booking related information present kora.

## 3. Visitor / Student User Flow

Basic visitor flow:

1. Visitor home page-e ashe
2. Courses/programs explore kore
3. Online class, Quito program, travel Spanish, homestay, activities etc. details dekhe
4. Contact page or Book page theke inquiry/booking start kore
5. Booking er pore student/customer account flow-e jete pare

Student/customer dashboard flow:

1. Student login kore dashboard-e jay
2. Dashboard overview-e quick cards dekhe
3. My Invoices theke payment/invoice records dekhe
4. My Packages theke purchased class packages, used classes, expiry details dekhe
5. My Calendar theke upcoming/past sessions dekhe
6. Upcoming class hole session details popup theke Google Meet link diye class join korte pare

## 4. Admin User Flow

Admin dashboard e school operations manage korar tools ache.

Admin sidebar modules:

- Dashboard
- Teachers
- Bookings
- Sessions
- Packages
- Blogs
- Calendar

Admin dashboard overview:

- Teachers: teacher add/edit/deactivate and weekly availability manage
- Bookings: incoming bookings dekhte pare, teacher/date/status filter korte pare, CSV export idea ache
- Sessions: upcoming and past sessions track, completed/no-show/rescheduled status manage
- Packages: student der jonno lesson packages create/manage
- Blogs: website blog post write/edit/publish/draft
- Calendar: shob teacher and shob student er sessions month/week view-e dekha

## 5. Calendar Functionality

Admin Calendar:

- Admin shob sessions ek calendar view-e dekhte pare
- Month view and Week view ache
- Previous, Next, Today navigation ache
- Teacher filter ache
- Teacher-wise color coding ache
- Session click korle popup-e student, teacher, date, time, duration, status, package dekha jay

Student/Customer Calendar:

- Student nijer class schedule dekhte pare
- Month view and Week view ache
- Time local timezone-e show kore
- Status colors ache: upcoming, completed, rescheduled, no-show
- Session click korle teacher, date, time, duration, package details dekha jay
- Upcoming class hole Google Meet join link show kore

Note: Calendar data currently demo/mock data diye configured. Real API endpoint code structure already ache, but mock mode enabled thakle current visible sessions demo data theke ashbe.

## 6. Authentication And Roles

Website-e protected dashboard route ache.

Role-wise dashboard:

- Admin dashboard: school management
- Customer/student dashboard: personal learning/payment/session information

Session handling:

- JWT based session encrypted cookie-te stored
- Protected layout server-side session check kore
- Authenticated API request-e bearer token attach hoy
- 401 response ele session destroy korar logic ache

## 7. Backend/API Pattern

Frontend API call direct Axios diye kora hoy na. Project-e wrapper pattern use kora hoy:

- `apiClient`: client-side authenticated request
- `apiServer`: server-side authenticated request
- `publicApiClient`: unauthenticated public request
- `request.get/post/put/patch/delete/postFormData`: common request wrapper

Data fetching:

- `useFetchData` hook use kora hoy
- React Query query key pattern follow kora hoy

Mutation:

- `useMutationHandler` use kora hoy
- Success/error toast, cache invalidate, and error handling centralized

## 8. Current Development Status

Project development phase-e ache.

Already implemented/structured:

- Public marketing pages
- Auth pages
- Admin dashboard modules
- Customer/student dashboard modules
- Calendar UI for admin and student
- Package, invoice, booking, teacher, session, blog related feature folders
- Shared design system and data fetching patterns

Important meeting point:

Backend integration er jonno onek place-e query/mutation pattern ready ache. Kichu section, especially calendar, demo/mock data diye previewable state-e ache.

## 9. How To Explain In Meeting

Short version:

Vida Verde website ta ekta complete Spanish school platform. Public visitor-ra course, Quito immersion, homestay, activities, online classes, blog and contact/booking information dekhte pare. Login korar por admin school operations manage kore: teachers, bookings, sessions, packages, blogs, and full calendar. Student/customer nijer invoices, purchased packages, and class calendar dekhte pare, plus upcoming session-e Google Meet link theke join korte pare.

Technical version:

Project ta Next.js, TypeScript, Tailwind, shadcn/ui, React Query, Zod validation and Axios request wrapper diye structured. Codebase feature-based architecture follow kore. `app/` route files thin wrapper, business logic `features/` folder-e. API calls centralized, authenticated requests token attach kore, and protected dashboards role-based navigation follow kore.

## 10. Things To Mention As Next Steps

- Calendar demo data real backend API-r sathe fully connect kora
- Booking to session conversion flow confirm kora
- Admin actions like session status update, teacher availability update, package purchase flow test kora
- Student dashboard-e real invoice/package/session data connect kora
- Final responsive QA and production build check kora
