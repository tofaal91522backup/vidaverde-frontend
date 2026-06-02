export type Program = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  priceFrom: string;
  pricePeriod: string;
  heroImage: string;
  included: string[];
  schedule: { day: string; activity: string; type: string }[];
  pricing: { duration: string; price: string; note?: string }[];
  testimonial?: { quote: string; name: string; meta: string };
  active: boolean;
};

export const programs: Program[] = [
  {
    slug: "quito-immersion",
    title: "Quito Immersion Program",
    tagline: "The flagship programme. Daily classes, Ecuadorian homestay, and cultural Quito.",
    description:
      "The most popular way to learn Spanish at Vida Verde. Twenty hours of one-on-one classes per week, ten hours of guided cultural activities, and an optional homestay with an Ecuadorian family. Everything you need to go from beginner to confident speaker — without ever leaving immersion.",
    priceFrom: "$140",
    pricePeriod: "/week",
    heroImage: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1400&q=80",
    included: [
      "20 hours of one-on-one Spanish classes per week",
      "10 hours of guided cultural classes and field trips",
      "Entrances and local transport for all activities",
      "Personalised learning plan from day one",
      "Optional homestay with an Ecuadorian family (from $26/night)",
      "AECEE-certified curriculum",
      "Completion certificate",
      "School materials and Wi-Fi",
    ],
    schedule: [
      { day: "Mon – Fri", activity: "Spanish classes (9am – 1pm)", type: "Class" },
      { day: "Mon – Fri", activity: "Cultural activity or guided walk (1:30pm)", type: "Activity" },
      { day: "Tuesday", activity: "Quito Colonial tour", type: "Included" },
      { day: "Wednesday", activity: "Cooking or crafts class", type: "Included" },
      { day: "Thursday", activity: "Museum visit", type: "Included" },
      { day: "Weekend", activity: "Optional excursions (Otavalo, Cotopaxi, Mindo)", type: "Optional" },
    ],
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
    tagline: "Learn Spanish while exploring Ecuador. Classes in the morning, adventure in the afternoon.",
    description:
      "The Travelling Classroom takes your Spanish lessons out of Quito and across Ecuador. Morning classes wherever you are, afternoons exploring — the Amazon, the Pacific coast, the Galápagos, or a custom route. Ideal for travellers who want to learn Spanish and see Ecuador at the same time.",
    priceFrom: "$740",
    pricePeriod: "/person",
    heroImage: "https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?w=1400&q=80",
    included: [
      "One-on-one Spanish classes every morning",
      "Guided afternoon activities and excursions",
      "Transport between destinations",
      "Accommodation options at each stop",
      "Experienced Vida Verde guide and teacher",
      "Customisable route and duration",
    ],
    schedule: [
      { day: "Day 1–3", activity: "Quito — orientation and city classes", type: "Class + City" },
      { day: "Day 4–6", activity: "Amazon lodge — jungle immersion", type: "Adventure" },
      { day: "Day 7–9", activity: "Pacific coast — beach and whale-watching", type: "Adventure" },
      { day: "Day 10–12", activity: "Return to Quito — final classes", type: "Class" },
    ],
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
    tagline: "Spanish on the Pacific coast. Morning classes, afternoon beach and whale-watching.",
    description:
      "Puerto López is Ecuador's premier whale-watching destination and one of the country's most charming coastal towns. Spend your mornings in one-on-one Spanish classes and your afternoons on the water, on the beach, or exploring the local fish market. Perfect for travellers who want an unhurried pace and real Spanish practice.",
    priceFrom: "$140",
    pricePeriod: "/week",
    heroImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400&q=80",
    included: [
      "One-on-one Spanish classes every morning",
      "Flexible afternoon — beach, town, whale-watching (seasonal)",
      "Accommodation options nearby",
      "Optional weekend excursion to Isla de la Plata",
      "Personalised curriculum adapted to your level",
    ],
    schedule: [
      { day: "Mon – Fri", activity: "Spanish classes (9am – 1pm)", type: "Class" },
      { day: "Afternoons", activity: "Beach, town exploration, local culture", type: "Free" },
      { day: "Weekend", activity: "Whale-watching or Isla de la Plata (seasonal)", type: "Optional" },
    ],
    pricing: [
      { duration: "1 week", price: "$280", note: "Classes only" },
      { duration: "2 weeks", price: "$520", note: "Classes only" },
      { duration: "1 week + accommodation", price: "$490", note: "Guesthouse included" },
    ],
    testimonial: {
      quote:
        "Puerto López was the perfect combination — Spanish in the mornings, Pacific in the afternoons. My teacher was brilliant and the town is absolutely beautiful.",
      name: "Marco Ribeiro",
      meta: "Brazil 🇧🇷 · Puerto López, 2 weeks",
    },
    active: true,
  },
];
