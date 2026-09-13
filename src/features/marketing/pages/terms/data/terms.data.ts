import type { LegalContent } from "@/features/marketing/components/LegalPage";

export const termsContent: LegalContent = {
  title: "Our Terms",
  breadcrumb: "Terms",
  updated: "20 July 2026",
  intro: [
    'These Terms govern your use of the Vida Verde Centro de Español website, customer portal, Spanish lessons, class packages, immersion programmes, homestays, activities, and related services ("Services").',
    "By creating an account, booking, or paying for a Service, you agree to these Terms. If you book for another person, you confirm that you are authorised to accept these Terms for that person.",
    "Nothing in these Terms limits rights that cannot lawfully be limited under applicable consumer law.",
  ],
  sections: [
    {
      id: "about-us",
      heading: "About us",
      blocks: [{ type: "contact" }],
    },
    {
      id: "eligibility",
      heading: "Eligibility and accurate information",
      blocks: [
        {
          type: "p",
          text: "You must be legally able to enter into a contract to book independently. A younger learner must use the Services with the authorisation of a parent or legal guardian, who is responsible for accepting these Terms, approving payment, and providing any required consent.",
        },
        {
          type: "p",
          text: "You must provide accurate and current booking, contact, learning, travel, health, accessibility, and emergency information where relevant to the Service.",
        },
      ],
    },
    {
      id: "services",
      heading: "Services",
      blocks: [
        { type: "p", text: "Vida Verde may provide:" },
        {
          type: "list",
          items: [
            { text: "one-on-one online Spanish lessons through Google Meet;" },
            { text: "a Spanish Assessment & First Lesson;" },
            { text: "single lessons and class packages;" },
            { text: "in-person classes and immersion programmes;" },
            { text: "homestays with vetted Ecuadorian families;" },
            {
              text: "cultural activities, transfers, and travel-Spanish arrangements; and",
            },
            {
              text: "learning resources, guides, and customer-portal features.",
            },
          ],
        },
        {
          type: "p",
          text: "The description, price, duration, inclusions, validity, location, and requirements displayed at checkout or confirmed in writing form part of your agreement with us.",
        },
      ],
    },
    {
      id: "accounts",
      heading: "Accounts",
      blocks: [
        {
          type: "p",
          text: "You are responsible for keeping your login details confidential, using a secure password, and keeping account information current. You must tell us promptly if you suspect unauthorised access.",
        },
        {
          type: "p",
          text: "Accounts, lesson credits, learner records, and invoices may not be shared, transferred, or resold without our written approval.",
        },
        {
          type: "p",
          text: "We may suspend an account when reasonably necessary to address fraud, non-payment, security risks, serious misconduct, or a material breach of these Terms.",
        },
      ],
    },
    {
      id: "bookings",
      heading: "Bookings",
      blocks: [
        {
          type: "p",
          text: "An online booking is confirmed only after payment is authorised and Vida Verde sends a confirmation. Please check the learner, teacher, date, time, timezone, Service, price, and Google Meet details promptly.",
        },
        {
          type: "p",
          text: "Availability may change before checkout is completed. Starting a booking does not reserve a teacher or time.",
        },
        {
          type: "p",
          text: "An enquiry for an immersion programme, homestay, or custom arrangement is not a reservation. It becomes binding only when Vida Verde confirms the dates, inclusions, price, payment schedule, and relevant conditions in writing and receives any required payment.",
        },
        {
          type: "p",
          text: "Specific written programme conditions take priority over these general Terms where they differ.",
        },
      ],
    },
    {
      id: "prices-and-payment",
      heading: "Prices and payment",
      blocks: [
        {
          type: "p",
          text: "Prices are in United States dollars (USD) unless stated otherwise. The final amount will be displayed before payment.",
        },
        {
          type: "p",
          text: "Payments are handled by a secure third-party provider identified at checkout. You authorise that provider to charge the selected method. Complete card details are not stored on Vida Verde's servers.",
        },
        {
          type: "p",
          text: "Your bank or payment provider may charge separate conversion or transaction fees. You remain responsible for charges and taxes legally assigned to you.",
        },
        {
          type: "p",
          text: "If payment is rejected, reversed, disputed without valid grounds, or unauthorised, we may pause the related booking, package, or account while the issue is resolved.",
        },
      ],
    },
    {
      id: "online-lessons",
      heading: "Online lessons",
      blocks: [
        {
          type: "p",
          text: "You are responsible for having a compatible device, supported browser, reliable internet connection, working audio, and a suitable learning environment. Check the confirmed timezone and test your equipment before joining.",
        },
        {
          type: "p",
          text: "A student's late arrival or technical problem does not extend the scheduled end time. If Vida Verde or the teacher cannot deliver the lesson because of our technical problem, we will provide a replacement, restore the credit, or issue a refund.",
        },
        {
          type: "p",
          text: "You must not record, screenshot, stream, publish, or distribute a lesson without advance permission from Vida Verde and everyone affected.",
        },
      ],
    },
    {
      id: "rescheduling-and-refunds",
      heading: "Rescheduling, cancellations, and refunds",
      blocks: [
        { type: "p", text: "For standard online lessons:" },
        {
          type: "list",
          items: [
            {
              text: "You may reschedule without charge at least 24 hours before the confirmed start time.",
            },
            {
              text: "If you cancel at least 24 hours before the start time, the lesson value will be returned as account credit. The credit remains subject to the original package expiry; credit for a first or single lesson must be used within 90 days.",
            },
            {
              text: "A cancellation or rescheduling request made less than 24 hours before the start time forfeits the lesson fee or package credit.",
            },
            {
              text: "Failure to attend without timely notice is treated as a late cancellation.",
            },
            {
              text: "Requests must be submitted through the customer portal or by contacting Vida Verde.",
            },
          ],
        },
        {
          type: "p",
          text: "The booking system's submission time and the timezone in the confirmation determine whether the deadline was met.",
        },
        {
          type: "p",
          text: "If Vida Verde or a teacher cancels, we will offer a replacement or restore the credit. If no reasonable replacement is available, you may request a refund for the undelivered lesson.",
        },
        {
          type: "p",
          text: "An unused class package may be cancelled for a refund within 14 days of purchase. Once any class in a package has been used, the package is non-refundable and remaining lessons must be used before its stated expiry. Payment-processing fees may be deducted only where permitted by law.",
        },
        {
          type: "p",
          text: "Immersion programmes, homestays, transfers, and activities may involve non-recoverable third-party costs. Their deposit, cancellation, and refund rules will be provided in writing before payment. Mandatory refund and withdrawal rights under applicable law always remain available.",
        },
      ],
    },
    {
      id: "packages",
      heading: "Packages",
      blocks: [
        {
          type: "p",
          text: "The number and length of lessons, price, and validity period are displayed before purchase. Unless stated otherwise:",
        },
        {
          type: "list",
          items: [
            {
              text: "packages belong to the named learner and are not transferable;",
            },
            {
              text: "a completed lesson, late cancellation, or no-show uses one credit;",
            },
            { text: "lessons must be booked and used before expiry; and" },
            {
              text: "introductory or assessment offers are limited to one per new student.",
            },
          ],
        },
        {
          type: "p",
          text: "Vida Verde may grant an extension for documented exceptional circumstances. We will not shorten a paid package's stated validity after purchase.",
        },
      ],
    },
    {
      id: "in-person-programmes",
      heading: "In-person programmes and homestays",
      blocks: [
        {
          type: "p",
          text: "Participants are responsible for valid passports, visas, permissions, insurance, vaccinations, and other travel requirements. They must follow reasonable safety, household, and programme instructions and disclose information necessary for safe accommodation and participation.",
        },
        {
          type: "p",
          text: "A homestay is a cultural experience in a private family home, not a hotel service. Household routines, meals, facilities, pets, noise, and neighbourhood life may vary. Vida Verde will honour material requirements agreed in writing and use reasonable care when selecting host families and partners.",
        },
        {
          type: "p",
          text: "Contact us promptly about a serious concern so we can investigate and respond. A participant may be responsible for damage they deliberately or negligently cause.",
        },
        {
          type: "p",
          text: "Teachers, families, schedules, activities, or routes may change because of availability, safety, weather, local conditions, or circumstances outside our control. We will offer a reasonably equivalent alternative where possible and explain material changes.",
        },
      ],
    },
    {
      id: "conduct",
      heading: "Conduct",
      blocks: [
        { type: "p", text: "You must not:" },
        {
          type: "list",
          items: [
            {
              text: "harass, threaten, discriminate against, or abuse another person;",
            },
            { text: "use the Services unlawfully or fraudulently;" },
            {
              text: "impersonate someone or submit materially false information;",
            },
            {
              text: "interfere with the website, portal, booking system, class, or another user's access;",
            },
            { text: "share private meeting links or account credentials;" },
            {
              text: "attempt unauthorised access or introduce malicious code; or",
            },
            {
              text: "infringe intellectual-property, privacy, or confidentiality rights.",
            },
          ],
        },
        {
          type: "p",
          text: "We may remove or suspend a person for serious or repeated misconduct. A person removed for their own serious breach may lose the affected booking or credit, subject to applicable law.",
        },
      ],
    },
    {
      id: "teachers-and-results",
      heading: "Teachers and results",
      blocks: [
        {
          type: "p",
          text: "We aim to provide qualified teachers and personalised instruction, but progress depends on attendance, practice, starting level, goals, and effort. We do not guarantee fluency, an examination score, employment, a visa result, or progress within a fixed period.",
        },
        {
          type: "p",
          text: "Teacher preferences are subject to availability. If a selected teacher becomes unavailable, we may offer a suitable replacement or another time. If you do not accept a material substitution, we will restore the credit or refund the undelivered lesson.",
        },
      ],
    },
    {
      id: "intellectual-property",
      heading: "Intellectual property",
      blocks: [
        {
          type: "p",
          text: "Vida Verde or its licensors own the website, branding, lesson plans, worksheets, guides, photographs, videos, graphics, and software.",
        },
        {
          type: "p",
          text: "You receive a limited, personal, non-transferable right to use learning materials for your own study. You may not sell, redistribute, publish, reproduce in bulk, or commercially exploit them without written permission.",
        },
        {
          type: "p",
          text: "You retain ownership of original content you submit. You allow Vida Verde to use it only as needed to provide the Service, operate your account, respond to you, and comply with law. We will not publish an identifiable testimonial, photograph, recording, or student story for marketing without the required permission.",
        },
      ],
    },
    {
      id: "third-party-services",
      heading: "Third-party services",
      blocks: [
        {
          type: "p",
          text: "The Services may use independent providers for payments, bookings, Google Meet, WhatsApp, maps, email, analytics, or other functions. Those providers have their own terms and privacy practices.",
        },
        {
          type: "p",
          text: "Vida Verde selects its providers with reasonable care but does not control their general availability, external content, or independent account rules.",
        },
      ],
    },
    {
      id: "privacy",
      heading: "Privacy",
      blocks: [
        {
          type: "p",
          text: "Our Privacy Policy explains how we process personal data. Marketing and optional data-processing consent are requested separately and are not conditions of purchasing a standard lesson.",
        },
        { type: "link", label: "Read our Privacy Policy", href: "/privacy" },
      ],
    },
    {
      id: "service-availability",
      heading: "Service availability and responsibility",
      blocks: [
        {
          type: "p",
          text: "We cannot guarantee uninterrupted access to the website, portal, or third-party tools. Maintenance, security work, natural disasters, widespread outages, government restrictions, transport disruption, or other events outside reasonable control may affect a Service.",
        },
        {
          type: "p",
          text: "If such an event prevents a paid Service, we will try to reschedule it, provide a reasonable alternative, or issue an appropriate credit or refund.",
        },
        {
          type: "p",
          text: "Vida Verde is responsible for providing paid Services with reasonable care and according to their confirmed description. Nothing excludes liability for fraud, deliberate misconduct, gross negligence, death or injury caused by negligence, violation of data-protection duties, or any liability that cannot legally be excluded.",
        },
        {
          type: "p",
          text: "Neither party is responsible for losses that were not reasonably foreseeable or that were caused by the other party's breach or failure to take reasonable precautions.",
        },
      ],
    },
    {
      id: "complaints",
      heading: "Complaints and applicable law",
      blocks: [
        {
          type: "p",
          text: "Send complaints to info@vidaverde.com with your name, booking reference, issue, and requested outcome. We will investigate and respond within a reasonable time.",
        },
        {
          type: "p",
          text: "These Terms are governed by the laws of Ecuador without removing mandatory consumer protections that apply in your country of residence. We will first try to resolve disputes directly. If that is unsuccessful, either party may use a competent court, consumer authority, data-protection authority, or mediation service. Where venue can lawfully be agreed, the courts of Quito, Ecuador have jurisdiction.",
        },
      ],
    },
    {
      id: "changes-and-contact",
      heading: "Changes and contact",
      blocks: [
        {
          type: "p",
          text: "We may update these Terms for future bookings when our Services or legal duties change. The version accepted at purchase continues to govern that purchase unless a change is legally required, beneficial, administrative, or expressly accepted by you.",
        },
        {
          type: "p",
          text: "If part of these Terms is unenforceable, the remaining provisions continue to apply.",
        },
        { type: "p", text: "For questions or support:" },
        { type: "contact" },
      ],
    },
  ],
};
