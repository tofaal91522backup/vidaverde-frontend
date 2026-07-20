import type { LegalContent } from "@/features/marketing/components/LegalPage";

export const privacyContent: LegalContent = {
  title: "Privacy Policy",
  breadcrumb: "Privacy Policy",
  updated: "20 July 2026",
  intro: [
    'Vida Verde Centro de Español ("Vida Verde", "we", "us", or "our") respects your privacy. This Policy explains how we handle personal data when you visit our website, contact us, download a resource, create an account, book a lesson, purchase a package, or enquire about an immersion programme, homestay, or related service.',
    "We process personal data in accordance with Ecuador's Organic Law on Personal Data Protection (LOPDP) and other applicable privacy laws.",
  ],
  sections: [
    {
      id: "responsible",
      heading: "Who is responsible for your data",
      blocks: [
        { type: "contact" },
        {
          type: "p",
          text: "Vida Verde is the controller responsible for the processing described in this Policy.",
        },
      ],
    },
    {
      id: "information-we-collect",
      heading: "Information we collect",
      blocks: [
        {
          type: "p",
          text: "Depending on how you use our Services, we may collect:",
        },
        {
          type: "list",
          items: [
            {
              term: "Contact information:",
              text: "name, email, telephone or WhatsApp number, country, language, and timezone.",
            },
            {
              term: "Account information:",
              text: "login credentials, account activity, bookings, packages, invoices, and payment status.",
            },
            {
              term: "Learning information:",
              text: "Spanish level, goals, teacher preference, availability, attendance, progress, homework, and feedback.",
            },
            {
              term: "Booking and payment information:",
              text: "selected service, date, time, price, currency, transaction reference, and receipt details. Complete card details are processed by our payment provider and are not stored on Vida Verde's servers.",
            },
            {
              term: "Programme and homestay information:",
              text: "travel dates, itinerary, accommodation preferences, emergency contact, dietary or accessibility needs, and health or safety information reasonably required to provide the service.",
            },
            {
              term: "Communications:",
              text: "information included in forms, emails, WhatsApp messages, surveys, reviews, or support requests.",
            },
            {
              term: "Technical information:",
              text: "IP address, browser, device, approximate location, pages visited, actions taken, cookies, language preference, security logs, and referral source.",
            },
          ],
        },
        {
          type: "p",
          text: "We may also receive necessary information from payment processors, booking providers, teachers, parents or guardians, host families, programme partners, or a person authorised to book for you.",
        },
      ],
    },
    {
      id: "how-we-use-information",
      heading: "How and why we use information",
      blocks: [
        { type: "p", text: "We use personal data to:" },
        {
          type: "list",
          items: [
            { text: "answer enquiries and recommend suitable teachers or programmes;" },
            { text: "create and manage accounts;" },
            {
              text: "process bookings, payments, invoices, credits, rescheduling, cancellations, and refunds;",
            },
            {
              text: "deliver classes and send confirmations, reminders, Google Meet links, learning materials, and follow-up messages;",
            },
            {
              text: "organise immersion programmes, homestays, transfers, and activities;",
            },
            { text: "provide customer support and resolve complaints;" },
            {
              text: "send newsletters, offers, or Spanish-learning content when you have consented;",
            },
            {
              text: "operate, secure, analyse, and improve our website and Services;",
            },
            { text: "prevent fraud, misuse, and unauthorised access; and" },
            {
              text: "comply with accounting, tax, consumer-protection, safeguarding, and legal obligations.",
            },
          ],
        },
        {
          type: "p",
          text: "Our legal bases include taking steps at your request before a contract, performing our contract with you, complying with law, protecting vital interests in an emergency, pursuing legitimate business and security interests, and your consent where required.",
        },
        {
          type: "p",
          text: "You may withdraw consent at any time. This will not affect processing already carried out lawfully.",
        },
      ],
    },
    {
      id: "when-information-is-required",
      heading: "When information is required",
      blocks: [
        {
          type: "p",
          text: "Information marked as required is needed to respond to you, accept payment, create a booking, or provide a Service. If you do not provide it, we may be unable to complete your request.",
        },
        {
          type: "p",
          text: "Marketing subscriptions, non-essential cookies, testimonials, photographs, and similar activities are optional and require separate permission where applicable.",
        },
      ],
    },
    {
      id: "sharing-information",
      heading: "Sharing information",
      blocks: [
        { type: "p", text: "We do not sell personal data." },
        {
          type: "p",
          text: "We share only what is reasonably necessary with:",
        },
        {
          type: "list",
          items: [
            { text: "Vida Verde staff and teachers;" },
            {
              text: "vetted host families, transport providers, and programme partners;",
            },
            {
              text: "payment, booking, calendar, Google Meet, email, hosting, analytics, mapping, security, and IT providers;",
            },
            {
              text: "a parent, guardian, employer, school, or travel organiser managing an authorised booking;",
            },
            {
              text: "accountants, insurers, legal advisers, and other professional advisers; and",
            },
            {
              text: "courts, regulators, law-enforcement bodies, or public authorities when legally required.",
            },
          ],
        },
        {
          type: "p",
          text: "These recipients must process information for the relevant service, protect it appropriately, and comply with applicable law.",
        },
      ],
    },
    {
      id: "international-transfers",
      heading: "International transfers",
      blocks: [
        {
          type: "p",
          text: "Vida Verde is based in Ecuador and serves students internationally. Some technology providers or service partners may process data in other countries.",
        },
        {
          type: "p",
          text: "Where international transfers are regulated, we use a lawful transfer mechanism and appropriate safeguards, such as contractual protections, recognised adequacy arrangements, or another mechanism permitted by law.",
        },
      ],
    },
    {
      id: "payments-and-platforms",
      heading: "Payments and third-party platforms",
      blocks: [
        {
          type: "p",
          text: "Payments are handled by a secure third-party payment provider identified at checkout. Vida Verde receives the payment status, amount, billing contact, and transaction reference, but not your complete card number or security code.",
        },
        {
          type: "p",
          text: "Online lessons are delivered through Google Meet. We may also communicate through WhatsApp or use third-party booking, mapping, email, and analytics tools. Each independent provider may process information under its own privacy policy.",
        },
        {
          type: "p",
          text: "Vida Verde does not routinely record lessons. A lesson will be recorded only after the purpose, access, and retention period have been explained and any required consent has been obtained. Students and teachers must not record or distribute lessons without permission from everyone affected.",
        },
      ],
    },
    {
      id: "cookies-and-analytics",
      heading: "Cookies and analytics",
      blocks: [
        { type: "p", text: "We may use:" },
        {
          type: "list",
          items: [
            {
              text: "necessary cookies for security, login, checkout, consent records, and core functions;",
            },
            {
              text: "preference technologies to remember language and display choices; and",
            },
            {
              text: "analytics technologies, including Google Analytics 4, to understand website performance, bookings, form submissions, and downloads.",
            },
          ],
        },
        {
          type: "p",
          text: "Where consent is required, non-essential analytics or marketing technologies remain disabled until you opt in. You can change your choices through our cookie controls or browser settings. Blocking necessary cookies may prevent parts of the website from working.",
        },
      ],
    },
    {
      id: "marketing",
      heading: "Marketing",
      blocks: [
        {
          type: "p",
          text: "We send promotional emails only with an appropriate legal basis, including consent where required. You can unsubscribe at any time using the link in an email or by contacting us.",
        },
        {
          type: "p",
          text: "We may still send essential messages about an account, booking, payment, class, programme, safety matter, or legal notice.",
        },
      ],
    },
    {
      id: "children",
      heading: "Children and younger students",
      blocks: [
        {
          type: "p",
          text: "A learner who cannot legally enter into a contract must use our Services with the involvement and authorisation of a parent or legal guardian. The parent or guardian must approve the booking, payment, account, and any required consent.",
        },
        {
          type: "p",
          text: "We collect only the information reasonably necessary to teach and communicate safely. We do not knowingly use children's data for behavioural advertising. Contact us if you believe a child submitted information without the required authorisation.",
        },
      ],
    },
    {
      id: "retention-and-security",
      heading: "Retention and security",
      blocks: [
        {
          type: "p",
          text: "We keep personal data only as long as necessary to provide the Services and meet accounting, tax, safeguarding, security, and legal requirements. Retention depends on the duration of your account, course, package, programme, marketing subscription, and any complaint or legal claim.",
        },
        {
          type: "p",
          text: "When information is no longer required, we delete, anonymise, or securely block it. We use reasonable security measures such as access controls, secure authentication, encryption in transit, backups, monitoring, and confidentiality obligations. No internet service is completely secure, so please use a strong password and notify us of suspected unauthorised access.",
        },
      ],
    },
    {
      id: "your-rights",
      heading: "Your rights",
      blocks: [
        { type: "p", text: "Subject to applicable law, you may:" },
        {
          type: "list",
          items: [
            { text: "request information about how we use your data;" },
            { text: "access your data and receive a copy;" },
            { text: "correct or update inaccurate information;" },
            { text: "request deletion;" },
            { text: "request suspension or restriction of processing;" },
            { text: "object to processing, including direct marketing;" },
            { text: "request portability of eligible data;" },
            { text: "withdraw consent; and" },
            { text: "complain to the competent data-protection authority." },
          ],
        },
        {
          type: "p",
          text: "We do not use personal data to make solely automated decisions with legal or similarly significant effects.",
        },
        {
          type: "p",
          text: "To exercise a right, email info@vidaverde.com. We may request reasonable proof of identity and will respond within the period required by law.",
        },
        {
          type: "p",
          text: "In Ecuador, you may also contact the Superintendencia de Protección de Datos Personales.",
        },
      ],
    },
    {
      id: "changes-and-contact",
      heading: "Changes and contact",
      blocks: [
        {
          type: "p",
          text: "We may update this Policy when our Services, providers, or legal obligations change. We will publish the updated version and revise the date above. We will provide additional notice or request new consent where required.",
        },
        {
          type: "p",
          text: "For privacy questions, complaints, or requests:",
        },
        { type: "contact" },
      ],
    },
  ],
};
