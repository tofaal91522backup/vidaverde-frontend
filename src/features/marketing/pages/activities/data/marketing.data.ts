import type { Activity, ActivityCategory, ScheduleItem } from "@/features/marketing/types";

export const activityTabs: { label: string; value: ActivityCategory }[] = [
  { label: "All activities", value: "all" },
  { label: "Cultural", value: "cultural" },
  { label: "Adventure", value: "adventure" },
  { label: "Culinary", value: "culinary" },
  { label: "Weekend trips", value: "weekend" },
  { label: "Volunteer", value: "volunteer" },
];

export const activities: Activity[] = [
  {
    title: "Museums of Quito",
    categories: ["cultural"],
    tag: "Cultural classes",
    duration: "3-4 hrs",
    description:
      "Explore Museo Banco Central del Ecuador, Fundacion Guayasamin, Casa de la Cultura Ecuatoriana, Museo Casa de Sucre, and Museo Mindalae with a Vida Verde teacher.",
    price: "Entrances",
    priceNote: "included",
    image: "https://images.unsplash.com/photo-1560964645-5296b5099677?w=1400&q=80",
    alt: "Old Town Quito at golden hour",
    wide: true,
    included: true,
  },
  {
    title: "Historic churches",
    categories: ["cultural"],
    tag: "Churches",
    duration: "3-4 hrs",
    description:
      "Visit Iglesia Basilica, Convento de San Diego, and San Francisco Monastery, one of the oldest churches in the Americas.",
    price: "Transport",
    priceNote: "included",
    image: "https://images.unsplash.com/photo-1568607689150-636d6b290cdb?w=1000&q=80",
    alt: "Historic church in Quito",
    included: true,
  },
  {
    title: "Quito parks",
    categories: ["adventure"],
    tag: "Parks",
    duration: "3-4 hrs",
    description:
      "Practice Spanish outside the classroom in Parque Carolina, Parque Metropolitano, and Parque El Ejido.",
    price: "Guide",
    priceNote: "included",
    image: "https://images.unsplash.com/photo-1502786129293-79981df4e689?w=1000&q=80",
    alt: "Andean landscape near Quito",
  },
  {
    title: "Local markets",
    categories: ["culinary", "cultural"],
    tag: "Markets",
    duration: "3-4 hrs",
    description:
      "Learn real-life vocabulary at Mercado Artesanal, Santa Clara, and Mercado Central, Quito's biggest market.",
    price: "Weekly",
    priceNote: "available",
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1000&q=80",
    alt: "Local market produce",
  },
  {
    title: "Weekend excursions",
    categories: ["weekend"],
    tag: "Outside Quito",
    duration: "Weekend",
    description:
      "Escape the city to popular destinations outside Quito with help from Vida Verde staff.",
    price: "Custom",
    priceNote: "quote",
    image: "https://images.unsplash.com/photo-1601379329542-31c59a8a204c?w=1000&q=80",
    alt: "Colorful market excursion",
  },
  {
    title: "Jungle programs",
    categories: ["adventure", "weekend"],
    tag: "Travelling classroom",
    duration: "Program",
    description:
      "Study and play near Tena at GAIA Lodge or learn Spanish on the shores of the Rio Napo at Yarina Lodge.",
    price: "From $740",
    priceNote: "/program",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1000&q=80",
    alt: "Lush jungle landscape",
  },
  {
    title: "Puerto Lopez coast program",
    categories: ["weekend", "adventure"],
    tag: "Coast",
    duration: "Program",
    description:
      "Study Spanish and take excursions while staying at Hostal Monte Libano in the beach town of Puerto Lopez.",
    price: "From $870",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&q=80",
    alt: "Pacific coast beach",
  },
  {
    title: "Volunteer programs",
    categories: ["volunteer"],
    tag: "Volunteer",
    duration: "Custom",
    description:
      "Vida Verde helps students combine Spanish learning with volunteer and internship opportunities in Ecuador.",
    price: "Contact",
    priceNote: "for details",
    image: "https://images.unsplash.com/photo-1492496913980-501348b61469?w=1000&q=80",
    alt: "Volunteer field work",
  },
  {
    title: "Spanish + Salsa",
    categories: ["cultural"],
    tag: "Evening activity",
    duration: "5 hrs/week",
    description:
      "Schedule salsa lessons in the evening with a professional dance studio while continuing Spanish classes during the week.",
    price: "From $320",
    image: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=1000&q=80",
    alt: "Couple dancing salsa",
  },
];

export const weeklySchedule: ScheduleItem[] = [
  {
    day: "Mon",
    time: "8:30 to 12:30",
    title: "Morning Spanish classes",
    description: "classes are 55 minutes with a social coffee break",
    badge: "Course",
  },
  {
    day: "Tue",
    time: "13:30",
    title: "Quito cultural Spanish class",
    description: "guided activity with a Vida Verde teacher",
    badge: "Culture",
  },
  {
    day: "Wed",
    time: "Afternoon",
    title: "Museums, churches, parks, or markets",
    description: "three excursions per week, approximately 3-4 hours each day",
    badge: "Included",
  },
  {
    day: "Thu",
    time: "Flexible",
    title: "Spanish + Salsa",
    description: "evening lessons with a professional dance studio",
    badge: "Optional",
    optional: true,
  },
  {
    day: "Fri",
    time: "Break",
    title: "Traditional Ecuadorian songs",
    description: "the whole school gathers during the Friday break",
    badge: "School",
  },
  {
    day: "Sat",
    time: "All day",
    title: "Weekend excursion",
    description: "popular destinations outside Quito",
    badge: "Optional",
    optional: true,
  },
  {
    day: "Sun",
    time: "-",
    title: "Homestay family time",
    description: "families often include students in weekend plans",
    badge: "Homestay",
  },
];
