import type { FaqItem, HomestayPillar, IncludedItem, PricingTier } from "@/features/marketing/types";

export const homestayMosaic = [
  {
    src: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200&q=80",
    alt: "A multi-generational family at home",
    className: "a",
  },
  {
    src: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&q=80",
    alt: "Cozy bedroom with natural light",
  },
  {
    src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80",
    alt: "Home kitchen at mealtime",
  },
  {
    src: "https://images.unsplash.com/photo-1523480717984-24cba35ed521?w=900&q=80",
    alt: "Quito neighborhood street",
  },
  {
    src: "https://images.unsplash.com/photo-1543362906-acfc16c67564?w=900&q=80",
    alt: "Family dinner table",
  },
];

export const homestayPillars: HomestayPillar[] = [
  {
    number: "01",
    title: "Immersion.",
    description:
      "Authentic immersion increases exposure to native Spanish and helps students learn everyday expressions and vocabulary in context.",
  },
  {
    number: "02",
    title: "Become an adopted child.",
    description:
      "Vida Verde has found caring families who treat students as their own children, share meals and free time, and often include them in weekend plans.",
  },
  {
    number: "03",
    title: "Adjust to life in Quito.",
    description:
      "Host families help students feel at home, show them the neighborhood, help them navigate the city, and share practical local insight.",
  },
  {
    number: "04",
    title: "Experience authentic culture.",
    description:
      "Living with a host family is a window into Ecuadorian life: food, family roles, holidays, traditions, and the details of daily home life.",
  },
];

export const includedItems: IncludedItem[] = [
  {
    icon: "★",
    title: "Private bedroom",
    description: "A private bedroom with towels and sheets included.",
  },
  {
    icon: "☼",
    title: "Morning and evening meals",
    description: "Daily meals with your host family are part of the homestay.",
  },
  {
    icon: "▦",
    title: "Laundry and cleaning",
    description: "In-home laundry service and weekly cleaning are included.",
  },
  {
    icon: "⌖",
    title: "Airport transportation",
    description: "Airport transportation can be arranged for $40 each trip.",
  },
  {
    icon: "✦",
    title: "High speed Wi-Fi",
    description: "High speed Wi-Fi access is included in the homestay.",
  },
  {
    icon: "♡",
    title: "Approved family",
    description: "Families are approved by Vida Verde staff.",
  },
  {
    icon: "⚐",
    title: "Safe La Floresta location",
    description:
      "Host homes are within about 10 minutes walking distance from Vida Verde.",
  },
  {
    icon: "↬",
    title: "Friendly staff support",
    description:
      "Vida Verde staff help with student needs throughout the program.",
  },
];

export const pricingTiers: PricingTier[] = [
  {
    title: "Homestay extra night",
    price: "$26",
    period: "/ night",
    description: "Add homestay nights to any Vida Verde program.",
    features: [
      "Private bedroom",
      "Morning and evening meals",
      "High speed Wi-Fi",
      "Laundry and weekly cleaning",
    ],
    cta: "Book this",
  },
  {
    title: "Classes + Homestay",
    price: "$432",
    period: "/ week",
    description: "One-on-one Spanish classes with 7 nights of homestay.",
    features: [
      "20 hours of one-on-one class",
      "7 nights of homestay",
      "Private bedroom",
      "Meals and Wi-Fi",
    ],
    featured: true,
    cta: "Book classes + homestay",
  },
  {
    title: "Quito Immersion",
    price: "$582",
    period: "/ week",
    description:
      "Spanish classes, cultural classes, and 7 nights of homestay.",
    features: [
      "20 hours Spanish class",
      "10 hours cultural classes",
      "7 nights homestay",
      "Entrances and transport for activities",
    ],
    cta: "Book immersion",
  },
];

export const faqs: FaqItem[] = [
  {
    question: "What is included in a homestay?",
    answer:
      "A private bedroom, morning and evening meals, high speed Wi-Fi, in-home laundry service, shared or private bathroom, weekly cleaning, towels and sheets, and a safe La Floresta location.",
  },
  {
    question: "Why choose a homestay?",
    answer:
      "Vida Verde believes authentic immersion is one of the most effective ways to learn a language. Staying with a family gives extra Spanish practice in everyday context.",
  },
  {
    question: "Where are host families located?",
    answer:
      "Homes are in the safe La Floresta neighborhood of Quito, within about 10 minutes walking distance from Vida Verde.",
  },
  {
    question: "Are families approved by the school?",
    answer: "Yes. Host families are approved by Vida Verde staff.",
  },
  {
    question: "Can airport transportation be arranged?",
    answer:
      "Yes. Airport transportation is listed at $40 each trip, with arrival times limited to support the best experience for students and host families.",
  },
];
