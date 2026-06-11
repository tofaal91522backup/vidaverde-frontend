import type { FaqItem } from "@/features/marketing/types";

export type PricingPackage = {
  title: string;
  price: string;
  priceNote?: string;
  description: string;
  features: string[];
  cta: string;
  featured?: boolean;
  badge?: string;
};

export type HowItWorksStep = {
  step: number;
  label: string;
  description: string;
};

export type OnlineTeacher = {
  name: string;
  firstName: string;
  image: string;
  bio: string;
  credentials: string;
  experience: string;
  specialisations: string[];
  availability: string;
  accepting: boolean;
};

export const howItWorksSteps: HowItWorksStep[] = [
  {
    step: 1,
    label: "Book Your First Lesson",
    description:
      "Choose a teacher, pick a time that suits you, and pay your discounted first lesson fee. Done in under 5 minutes.",
  },
  {
    step: 2,
    label: "Meet Your Teacher",
    description:
      "Join via Google Meet at your scheduled time. Your teacher will assess your current level and learn about your goals.",
  },
  {
    step: 3,
    label: "Get Your Personalised Plan",
    description:
      "After the session, your teacher recommends the package that fits your goals and timeline. With no obligation to continue.",
  },
  {
    step: 4,
    label: "Make Real Progress",
    description:
      "Regular lessons, structured feedback, and access to learning resources between classes. Real progress, not just app streaks.",
  },
];

export const pricingPackages: PricingPackage[] = [
  {
    title: "Assessment & First Lesson",
    price: "$12",
    priceNote: "One per student",
    description:
      "Your first step. A 60-minute session that includes a full level assessment, a personalised learning plan, and your first complete lesson.",
    features: [
      "60-minute one-on-one session",
      "Full level assessment",
      "Personalised learning plan",
      "Choose your teacher",
      "Via Google Meet",
    ],
    cta: "Book Now. Start for $12",
    featured: true,
    badge: "Best way to start",
  },
  {
    title: "10-Class Package",
    price: "$[X]",
    priceNote: "Valid for 3 months",
    description:
      "10 x 60-minute private lessons with your chosen teacher. Valid for 3 months. Ideal for building a consistent habit.",
    features: [
      "10 x 60-minute lessons",
      "Valid for 3 months",
      "Same teacher every session",
      "Flexible scheduling",
      "Via Google Meet",
    ],
    cta: "Get Started",
  },
  {
    title: "20-Class Package",
    price: "$254.64",
    priceNote: "Valid for 6 months",
    description:
      "20 x 60-minute private lessons. Our best-value package for serious learners. Valid for 6 months.",
    features: [
      "20 x 60-minute lessons",
      "Valid for 6 months",
      "Same teacher every session",
      "Flexible scheduling",
      "Via Google Meet",
    ],
    cta: "Get Started",
    badge: "Best value",
  },
  {
    title: "Single Class",
    price: "$[X]",
    priceNote: "Per class",
    description: "One class, no commitment. Book when you need it.",
    features: [
      "1 x 60-minute lesson",
      "No commitment",
      "Choose your teacher",
      "Flexible scheduling",
      "Via Google Meet",
    ],
    cta: "Book a Class",
  },
];

export const onlineTeachers: OnlineTeacher[] = [
  {
    name: "Ximena Argüello",
    firstName: "Ximena",
    image: "/images/teachers/2.jpg",
    bio: "Students say class hours with Ximena pass by in a flash. She has been teaching Spanish since 2011 and is fluent in English, which makes her especially effective with beginners.",
    credentials: "Universidad Central del Ecuador. Linguistics",
    experience: "13+ years teaching",
    specialisations: ["Beginner-friendly", "Conversational Spanish", "DELE Preparation"],
    availability: "Mon – Fri mornings & afternoons",
    accepting: true,
  },
  {
    name: "Lucía Rivadeneira",
    firstName: "Lucía",
    image: "/images/teachers/3.jpg",
    bio: "Lucía is a language nerd who loves to teach the nuts and bolts of Spanish. She excels at helping students understand grammar intuitively and speaks at a clear, easy-to-follow pace.",
    credentials: "PUCE Quito. Modern Languages",
    experience: "10+ years teaching",
    specialisations: ["Grammar Focus", "Intermediate to Advanced", "Business Spanish"],
    availability: "Mon – Fri afternoons",
    accepting: true,
  },
  {
    name: "Fernando Báez Guzmán",
    firstName: "Fernando",
    image: "/images/teachers/4.jpg",
    bio: "Fernando is our Academic Director and master teacher. He brings structure, warmth, and deep expertise to every lesson. Students consistently rate him as the most effective teacher they've had.",
    credentials: "Universidad de Cuenca. Spanish Literature",
    experience: "20+ years teaching",
    specialisations: ["All Levels", "Academic Spanish", "Advanced Conversation"],
    availability: "Limited: Tue & Thu",
    accepting: true,
  },
  {
    name: "Rosa Laura García Caiza",
    firstName: "Laura",
    image: "/images/teachers/5.jpg",
    bio: "Laura has taught Spanish since 1991. She has a passion for sharing Ecuadorian culture with her students and considers herself not just a teacher but an ambassador of her culture and her language.",
    credentials: "Universidad Central del Ecuador. Education",
    experience: "33+ years teaching",
    specialisations: ["Culture & Language", "Beginners", "Travel Spanish"],
    availability: "Mon, Wed & Fri",
    accepting: true,
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
