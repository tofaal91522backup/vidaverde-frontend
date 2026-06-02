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
      "Choose a teacher, pick a time, and pay your discounted first lesson fee — all in under 5 minutes.",
  },
  {
    step: 2,
    label: "Meet Your Teacher",
    description:
      "Join via Google Meet at your scheduled time. Your teacher will assess your level and learning goals.",
  },
  {
    step: 3,
    label: "Get a Personalised Plan",
    description:
      "After the first session, your teacher recommends a package tailored to your goals and timeline.",
  },
  {
    step: 4,
    label: "Make Real Progress",
    description:
      "Regular sessions, structured feedback, and access to learning resources between classes.",
  },
];

export const pricingPackages: PricingPackage[] = [
  {
    title: "Assessment & First Lesson",
    price: "$12",
    priceNote: "One per student",
    description:
      "60-minute session. Includes level assessment, personalised learning plan, and your first full lesson.",
    features: [
      "60-minute one-on-one session",
      "Level assessment included",
      "Personalised learning plan",
      "Choose your teacher",
      "Via Google Meet",
    ],
    cta: "Book Now",
    featured: true,
    badge: "Best to Start",
  },
  {
    title: "10-Class Package",
    price: "$130",
    priceNote: "Valid for 3 months",
    description: "10 × 60-minute private lessons. Save more per class.",
    features: [
      "10 × 60-minute lessons",
      "Valid for 3 months",
      "Same teacher every session",
      "Flexible scheduling",
      "Via Google Meet",
    ],
    cta: "Get Started",
  },
  {
    title: "20-Class Package",
    price: "$250",
    priceNote: "Valid for 6 months",
    description: "20 × 60-minute private lessons. Best value — save the most per class.",
    features: [
      "20 × 60-minute lessons",
      "Valid for 6 months",
      "Same teacher every session",
      "Flexible scheduling",
      "Via Google Meet",
    ],
    cta: "Get Started",
    badge: "Best Value",
  },
  {
    title: "Single Class",
    price: "$15",
    priceNote: "Per class",
    description: "Pay-as-you-go. No commitment, no packages required.",
    features: [
      "1 × 60-minute lesson",
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
    credentials: "Universidad Central del Ecuador — Linguistics",
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
    credentials: "PUCE Quito — Modern Languages",
    experience: "10+ years teaching",
    specialisations: ["Grammar Focus", "Intermediate to Advanced", "Business Spanish"],
    availability: "Mon – Fri afternoons",
    accepting: true,
  },
  {
    name: "Fernando Báez Guzmán",
    firstName: "Fernando",
    image: "/images/teachers/4.jpg",
    bio: "Fernando is our Academic Director and master teacher. He brings structure, warmth, and deep expertise to every lesson — students consistently rate him as the most effective teacher they've had.",
    credentials: "Universidad de Cuenca — Spanish Literature",
    experience: "20+ years teaching",
    specialisations: ["All Levels", "Academic Spanish", "Advanced Conversation"],
    availability: "Limited — Tue & Thu",
    accepting: true,
  },
  {
    name: "Rosa Laura García Caiza",
    firstName: "Laura",
    image: "/images/teachers/5.jpg",
    bio: "Laura has taught Spanish since 1991. She has a passion for sharing Ecuadorian culture with her students and considers herself not just a teacher but an ambassador of her culture and her language.",
    credentials: "Universidad Central del Ecuador — Education",
    experience: "33+ years teaching",
    specialisations: ["Culture & Language", "Beginners", "Travel Spanish"],
    availability: "Mon, Wed & Fri",
    accepting: true,
  },
];

export const onlineClassesFaqs: FaqItem[] = [
  {
    question: "What platform do you use?",
    answer:
      "We teach via Google Meet for all online lessons. You'll receive a link before each class. No downloads required — it works in any browser.",
  },
  {
    question: "What level do I need to be?",
    answer:
      "None. We teach complete beginners through to advanced speakers. Your first lesson includes a level assessment so your teacher can tailor the course to you.",
  },
  {
    question: "How do I pay?",
    answer:
      "Securely online via credit/debit card, Apple Pay, or Google Pay. Payment is processed at the time of booking.",
  },
  {
    question: "Can I choose my teacher?",
    answer:
      "Yes. Browse our teachers above, read their profiles, and book directly with the one that feels right for you.",
  },
  {
    question: "What if I need to reschedule?",
    answer:
      "You can reschedule up to 24 hours before your class. Contact your teacher directly or use the booking system.",
  },
  {
    question: "Is there a contract or commitment?",
    answer:
      "No. The discounted first lesson is a one-time purchase. After that, you choose a package or pay per class — no lock-in.",
  },
  {
    question: "How long are the classes?",
    answer:
      "Standard classes are 60 minutes. This includes warm-up, the main lesson, and a wrap-up with feedback and homework suggestions.",
  },
  {
    question: "Do you offer group classes?",
    answer:
      "Our online programme focuses on one-on-one instruction for maximum personalisation. Group classes are available for our Quito immersion programmes.",
  },
];
