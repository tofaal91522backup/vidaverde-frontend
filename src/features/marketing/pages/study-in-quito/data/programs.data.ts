export type Program = {
  slug: string;
  title: string;
  detailTitle: string;
  detailSubheadline: string;
  tagline: string;
  description: string;
  priceFrom: string;
  pricePeriod: string;
  heroImage: string;
  included: string[];
  scheduleDescription?: string;
  schedule: { day: string; activity: string; type: string }[];
  pricingNote?: string;
  pricingFooter?: string;
  pricing: { duration: string; price: string; note?: string }[];
  testimonial?: { quote: string; name: string; meta: string };
  active: boolean;
};

export const programs: Program[] = [
  {
    slug: "quito-immersion",
    title: "Quito Immersion Programme",
    detailTitle: "The Quito Immersion Programme",
    detailSubheadline:
      "Daily one-on-one classes, a family homestay, and life in one of South America's most vibrant cities. The complete Spanish immersion experience.",
    tagline:
      "Our flagship. Daily classes in La Floresta, full homestay with an Ecuadorian family, and guided cultural activities in one of South America's most beautiful cities.",
    description:
      "The most popular way to learn Spanish at Vida Verde. Daily one-on-one classes in La Floresta, ten hours of guided cultural activities per week, and a homestay with a vetted Ecuadorian family. Everything you need to go from beginner to confident speaker. Without ever leaving immersion.",
    priceFrom: "$140",
    pricePeriod: " / week",
    heroImage: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1400&q=80",
    included: [
      "2–6 hours of one-on-one Spanish classes per day (you choose)",
      "Homestay accommodation with a vetted Ecuadorian host family",
      "Breakfast and dinner with your host family",
      "Guided cultural activities and excursions",
      "Airport pickup and drop-off",
      "24/7 support from the Vida Verde team",
    ],
    scheduleDescription:
      "Mornings are for Spanish. Afternoons are for living it. Most students take 3–4 hours of classes per day, leaving the afternoon free for exploring Quito, joining cultural activities arranged by Vida Verde, or simply practising Spanish in the wild.",
    schedule: [
      { day: "Mon – Fri", activity: "Spanish classes (9am – 1pm)", type: "Class" },
      { day: "Mon – Fri", activity: "Cultural activity or guided walk (1:30pm)", type: "Activity" },
      { day: "Tuesday", activity: "Quito Colonial tour", type: "Included" },
      { day: "Wednesday", activity: "Cooking or crafts class", type: "Included" },
      { day: "Thursday", activity: "Museum visit", type: "Included" },
      { day: "Weekend", activity: "Optional excursions (Otavalo, Cotopaxi, Mindo)", type: "Optional" },
    ],
    pricingNote:
      "All prices in USD per person, per week. Prices shown are for one-on-one classes with full homestay.",
    pricingFooter:
      "DELE preparation, pair classes, and group formats available at different rates. Contact us for a personalised quote.",
    pricing: [
      { duration: "1 week", price: "$399", note: "Classes only" },
      { duration: "2 weeks", price: "$740", note: "Classes only" },
      { duration: "4 weeks", price: "$1,380", note: "Classes only" },
      { duration: "1 week + homestay", price: "$582", note: "Classes + 7 nights" },
      { duration: "2 weeks + homestay", price: "$1,078", note: "Classes + 14 nights" },
    ],
    testimonial: {
      quote:
        "I came to Quito not knowing a word of Spanish and left six weeks later able to navigate the city, shop at the market, and chat with my host family over dinner. The cultural activities made the language stick in a way no classroom ever had.",
      name: "Jennifer Cumming",
      meta: "Canada 🇨🇦 · Zero to conversational in 6 weeks",
    },
    active: true,
  },
  {
    slug: "travelling-classroom",
    title: "Travelling Classroom",
    detailTitle: "The Travelling Classroom",
    detailSubheadline:
      "Learn Spanish while you explore Ecuador. Morning classes with your teacher, afternoon adventures. From the Andes to the Amazon.",
    tagline:
      "Learn Spanish while you explore Ecuador. Morning classes with your teacher, afternoon adventures. From the Andes to the Amazon.",
    description:
      "The Travelling Classroom takes your Spanish lessons out of Quito and across Ecuador. Morning classes wherever you are, afternoons exploring. The Amazon, the Pacific coast, or a custom route. Ideal for travellers who want to learn Spanish and see Ecuador at the same time.",
    priceFrom: "$740",
    pricePeriod: " / person",
    heroImage: "https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?w=1400&q=80",
    included: [
      "One-on-one Spanish classes every morning",
      "Guided afternoon activities and excursions",
      "Transport between destinations",
      "Accommodation options at each stop",
      "Experienced Vida Verde guide and teacher",
      "Customisable route and duration",
    ],
    scheduleDescription:
      "Each day is a mix of learning and living. Mornings are structured. Your teacher adapts every lesson to where you are and what you're seeing. Afternoons are yours, with guided options available at every stop.",
    schedule: [
      { day: "Day 1–3", activity: "Quito. Orientation and city classes", type: "Class + City" },
      { day: "Day 4–6", activity: "Amazon lodge. Jungle immersion", type: "Adventure" },
      { day: "Day 7–9", activity: "Pacific coast. Beach and whale-watching", type: "Adventure" },
      { day: "Day 10–12", activity: "Return to Quito. Final classes", type: "Class" },
    ],
    pricingNote: "All prices in USD per person. Minimum 2 participants.",
    pricingFooter: "Solo travel rates available on request. Contact us for a custom itinerary.",
    pricing: [
      { duration: "7 days", price: "$740", note: "Per person, min. 2" },
      { duration: "10 days", price: "$1,050", note: "Per person, min. 2" },
      { duration: "14 days", price: "$1,480", note: "Per person, min. 2" },
    ],
    testimonial: {
      quote:
        "I chose the Travelling Classroom because I wanted to see Ecuador, not just Quito. I ended up with better Spanish than I expected and memories that will last a lifetime.",
      name: "Franziska Denker",
      meta: "Germany 🇩🇪 · Travelling Classroom, 10 days",
    },
    active: true,
  },
  {
    slug: "puerto-lopez",
    title: "Puerto López",
    detailTitle: "Puerto López Spanish Programme",
    detailSubheadline:
      "Spanish on the Pacific coast. Morning classes, afternoons on the beach or whale-watching. The most relaxed way to learn a language.",
    tagline:
      "Spanish on the Pacific coast. Morning classes, afternoons on the beach or whale-watching. The most relaxed way to learn a language.",
    description:
      "Puerto López is Ecuador's premier whale-watching destination and one of the country's most charming coastal towns. Spend your mornings in one-on-one Spanish classes and your afternoons on the water, on the beach, or exploring the local fish market.",
    priceFrom: "$[X]",
    pricePeriod: " / week",
    heroImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400&q=80",
    included: [
      "One-on-one Spanish classes every morning",
      "Flexible afternoons. Beach, town, whale-watching (seasonal)",
      "Accommodation options nearby",
      "Optional weekend excursion to Isla de la Plata",
      "Personalised curriculum adapted to your level",
    ],
    scheduleDescription:
      "Mornings belong to Spanish. Afternoons are yours. Pacific ocean, local markets, and the most relaxed pace of any Vida Verde programme.",
    schedule: [
      { day: "Mon – Fri", activity: "Spanish classes (9am – 1pm)", type: "Class" },
      { day: "Afternoons", activity: "Beach, town exploration, local culture", type: "Free" },
      { day: "Weekend", activity: "Whale-watching or Isla de la Plata (seasonal)", type: "Optional" },
    ],
    pricingNote: "All prices in USD per person, per week. To be confirmed. Contact us for current rates.",
    pricingFooter: "Accommodation can be arranged nearby. Contact us for a personalised quote.",
    pricing: [
      { duration: "1 week", price: "$[X]", note: "Classes only. Confirm with Vida Verde" },
      { duration: "2 weeks", price: "$[X]", note: "Classes only. Confirm with Vida Verde" },
    ],
    testimonial: {
      quote:
        "Puerto López was the perfect combination. Spanish in the mornings, Pacific in the afternoons. My teacher was brilliant and the town is absolutely beautiful.",
      name: "Marco Ribeiro",
      meta: "Brazil 🇧🇷 · Puerto López, 2 weeks",
    },
    active: true,
  },
  {
    slug: "jungle-programme",
    title: "Jungle Programme",
    detailTitle: "The Jungle Programme",
    detailSubheadline:
      "Deep immersion in the Ecuadorian Amazon. Classes surrounded by one of the world's most biodiverse ecosystems.",
    tagline:
      "Deep immersion in the Ecuadorian Amazon. Classes at GAIA or Yarina Lodge, surrounded by one of the world's most biodiverse ecosystems.",
    description:
      "The most immersive Vida Verde experience. Spanish classes at an Amazon lodge. GAIA or Yarina. Surrounded by rainforest, wildlife, and a world away from daily life. Ideal for travellers who want to combine serious language study with an extraordinary natural experience.",
    priceFrom: "$[X]",
    pricePeriod: " / person",
    heroImage: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1400&q=80",
    included: [
      "One-on-one Spanish classes at the lodge every morning",
      "Full-board accommodation at GAIA or Yarina Lodge",
      "Guided jungle excursions and wildlife walks",
      "Transport from Quito to the lodge",
      "24/7 support from the Vida Verde team",
    ],
    scheduleDescription:
      "Mornings are for Spanish. Afternoons take you deep into the Amazon. Guided walks, canoe trips, wildlife spotting, and evenings under the rainforest canopy.",
    schedule: [
      { day: "Day 1", activity: "Travel Quito → Amazon lodge", type: "Travel" },
      { day: "Day 2–6", activity: "Morning Spanish classes at the lodge", type: "Class" },
      { day: "Day 2–6", activity: "Afternoon jungle excursions", type: "Adventure" },
      { day: "Day 7", activity: "Return to Quito", type: "Travel" },
    ],
    pricingNote: "All prices in USD per person. To be confirmed. Contact us for current rates.",
    pricingFooter: "Lodge accommodation and meals are included. Contact us for availability and pricing.",
    pricing: [
      { duration: "1 week", price: "$[X]", note: "Classes + lodge. Confirm with Vida Verde" },
    ],
    active: true,
  },
];
