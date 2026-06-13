import type {
  FaqItem,
  HomestayPillar,
  IncludedItem,
  PricingTier,
} from "@/features/marketing/types";

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
    src: "/images/programmes/1.jpg",
    alt: "Quito neighborhood view with students",
  },
  {
    src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=900&q=80",
    alt: "Family dinner table",
  },
];

export const homestayPillars: HomestayPillar[] = [
  {
    number: "01",
    title: "Live in a real home",
    description:
      "Live with a real Ecuadorian family during your studies, not in a hotel, not in a hostel, but in a home.",
  },
  {
    number: "02",
    title: "Practise around the clock",
    description:
      "Share meals, conversations, and daily life with your host family, so Spanish practice continues beyond the classroom.",
  },
  {
    number: "03",
    title: "Settle into Quito",
    description:
      "Your host family can help with everyday local context, including nearby routes and the rhythm of the neighbourhood.",
  },
  {
    number: "04",
    title: "Learn culture from the inside",
    description:
      "Many students say their most valuable Spanish practice happens at the breakfast table, not only in class.",
  },
];

export const includedItems: IncludedItem[] = [
  {
    icon: "01",
    title: "Private bedroom",
    description: "Your own room in a local family home.",
  },
  {
    icon: "02",
    title: "Breakfast and dinner",
    description: "Breakfast and dinner with your host family.",
  },
  {
    icon: "03",
    title: "WiFi access",
    description: "Stay connected while you study and travel.",
  },
  {
    icon: "04",
    title: "Laundry facilities",
    description: "Laundry support is available in the home.",
  },
  {
    icon: "05",
    title: "Local transport guidance",
    description: "Help understanding nearby routes and everyday travel.",
  },
  {
    icon: "06",
    title: "24/7 team support",
    description:
      "The Vida Verde team is available if anything needs to be resolved.",
  },
];

export const pricingTiers: PricingTier[] = [
  {
    title: "Homestay",
    price: "$26",
    period: "/ night",
    description:
      "Book homestay as a standalone stay or add it to any Vida Verde immersion programme.",
    features: [
      "Private bedroom",
      "Breakfast and dinner",
      "WiFi access",
      "Laundry facilities",
    ],
    cta: "Add Homestay to Your Programme",
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
      "Meals and WiFi",
    ],
    featured: true,
    cta: "Add Homestay to Your Programme",
  },
  {
    title: "Quito Immersion",
    price: "$582",
    period: "/ week",
    description:
      "Spanish classes, cultural activities, and 7 nights of homestay.",
    features: [
      "20 hours Spanish class",
      "10 hours cultural classes",
      "7 nights homestay",
      "Entrances and transport for activities",
    ],
    cta: "Included in Quito Immersion",
  },
];

export const faqs: FaqItem[] = [
  {
    question: "What is included in a homestay?",
    answer:
      "A private bedroom, breakfast and dinner, WiFi access, laundry facilities, local transport guidance, and support from the Vida Verde team.",
  },
  {
    question: "Why choose a homestay?",
    answer:
      "The best Spanish classroom is not always a classroom. Living with a family gives you daily language practice in real context, from meals to everyday conversations.",
  },
  {
    question: "Where are host families located?",
    answer:
      "Host families live in safe, well-connected Quito neighbourhoods selected by Vida Verde.",
  },
  {
    question: "Are families approved by the school?",
    answer:
      "Yes. Every Vida Verde host family is personally vetted by our team.",
  },
  {
    question: "Can I combine homestay with classes?",
    answer:
      "Yes. Homestay can be booked as a standalone option or as part of any Vida Verde immersion programme.",
  },
];
