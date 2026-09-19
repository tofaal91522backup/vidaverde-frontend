import type { FaqItem } from "@/features/marketing/types";

export type HowItWorksStep = {
  step: number;
  label: string;
  /** Hate lekha — Google eka shironam pele kokhono "Lograr…" (infinitive) dey, baki gula "Reserva/Conoce" (tú) */
  labelEs: string;
  description: string;
};

export const howItWorksSteps: HowItWorksStep[] = [
  {
    step: 1,
    label: "Book Your First Lesson",
    labelEs: "Reserva tu primera clase",
    description:
      "Choose a teacher, pick a time that suits you, and pay your discounted first lesson fee. Done in under 5 minutes.",
  },
  {
    step: 2,
    label: "Meet Your Teacher",
    labelEs: "Conoce a tu profesor",
    description:
      "Join via Google Meet at your scheduled time. Your teacher will assess your current level and learn about your goals.",
  },
  {
    step: 3,
    label: "Get Your Personalised Plan",
    labelEs: "Recibe tu plan personalizado",
    description:
      "After the session, your teacher recommends the package that fits your goals and timeline. With no obligation to continue.",
  },
  {
    step: 4,
    label: "Make Real Progress",
    labelEs: "Progresa de verdad",
    description:
      "Regular lessons, structured feedback, and access to learning resources between classes. Real progress, not just app streaks.",
  },
];

export const onlineClassesFaqs: FaqItem[] = [
  {
    question: "What platform do you use for classes?",
    answer:
      "We teach via Google Meet. You'll receive your class link by email before each session. No downloads or accounts needed. It works in any browser on any device.",
  },
  {
    question: "What level do I need to be?",
    answer:
      "None at all. We teach complete beginners through to advanced speakers. Your first lesson includes a level assessment so your teacher can tailor every class to exactly where you are.",
  },
  {
    question: "How do I pay?",
    answer:
      "Securely online by credit or debit card, Apple Pay, or Google Pay. Payment is processed at the time of booking. No invoices, no waiting.",
  },
  {
    question: "Can I choose my own teacher?",
    answer:
      "Yes. Browse our teachers' profiles, read about their teaching styles, and book directly with the one that suits you best. You can also ask us for a recommendation.",
  },
  {
    question: "What if I need to reschedule?",
    answer:
      "No problem. You can reschedule up to 24 hours before your class at no charge. Just contact your teacher directly or use the booking system.",
  },
  {
    question: "Is there a contract or ongoing commitment?",
    answer:
      "None. Your discounted first lesson is a one-time purchase. After that, choose the package that works for you. Or pay per class. No lock-in, no pressure.",
  },
  {
    question: "How long are the classes?",
    answer:
      "Standard classes are 60 minutes. Some students prefer 45-minute sessions for intensive focus. Speak to your teacher about what works best for you.",
  },
  {
    question: "Do you offer group classes online?",
    answer:
      "Our online programme is focused on one-on-one instruction. Because we believe personalised teaching gets results faster. Group classes are available as part of our Quito immersion programmes.",
  },
];
