import type {
  Activity,
  ActivityCategory,
  CatalogCourse,
  Course,
  CourseCategory,
  FaqItem,
  FeatureBlock,
  HomestayPillar,
  IncludedItem,
  NavItem,
  PricingTier,
  ScheduleItem,
  Stat,
  Testimonial,
} from "../types";

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "Homestay", href: "/homestay" },
  { label: "Activities", href: "/activities" },
  { label: "Blog", href: "/blog" },
  { label: "Rates", href: "/courses#rates" },
  { label: "Contact Us", href: "/#book" },
];

export const trustBadges = [
  "Certified AECEE member",
  "La Floresta, Quito",
  "Spanish school since 1999",
  "Ecuadorian culture and ecology",
];

export const heroStats: Stat[] = [
  { value: "356", label: "Courses", target: 356 },
  { value: "4,781", label: "Students", target: 4781 },
  { value: "41", label: "Lections", target: 41 },
  { value: "120", label: "Events", target: 120 },
];

export const featureBlocks: FeatureBlock[] = [
  {
    number: "01",
    eyebrow: "School",
    title: "A small, close-knit Spanish school in Quito.",
    description:
      "Vida Verde has helped students learn Spanish in Quito since 1999, with a promise of excellent Spanish teaching and dedication to Ecuador's green movement.",
    span: "span-6",
  },
  {
    number: "02",
    eyebrow: "Quito",
    title: "Spanish classes, cultural outings, and weekend excursions.",
    description:
      "Along with quality Spanish classes, the school leads students in cultural outings and helps organize weekend excursions around Quito and Ecuador.",
    span: "span-6",
    tone: "dark",
  },
  {
    number: "03",
    eyebrow: "Family",
    title: "Live with a local Ecuadorian host family.",
    description:
      "Homestays increase exposure to native Spanish and give students a window into everyday Ecuadorian life.",
    span: "span-4",
    tone: "accent",
  },
  {
    number: "04",
    eyebrow: "Culture",
    title: "Learn the city through a local teacher's eyes.",
    description:
      "Vida Verde teachers guide cultural classes through museums, churches, parks, markets, and historic Quito.",
    span: "span-4",
  },
  {
    number: "05",
    eyebrow: "Flexibility",
    title: "Study in Quito, online, in the jungle, or on the coast.",
    description:
      "Programs include Quito classes, online Spanish, jungle lodges, coast programs, and travelling classrooms across Ecuador.",
    span: "span-4",
  },
];

export const courseFilters: { label: string; value: CourseCategory }[] = [
  { label: "All", value: "all" },
  { label: "Quito", value: "beginner" },
  { label: "Immersion", value: "intermediate" },
  { label: "Travelling", value: "advanced" },
  { label: "Special", value: "business" },
  { label: "Online", value: "medical" },
];

export const previewCourses: Course[] = [
  {
    title: "One-on-One Classes",
    level: "Classes in Quito",
    category: "beginner",
    description:
      "Vida Verde's most popular class choice: personalized Spanish adaptable to every student and designed for fast progress.",
    duration: "Flexible",
    hours: "20 hrs/week",
    price: "$250",
  },
  {
    title: "Quito Immersion Program",
    level: "Classes + Field Trips + Homestay",
    category: "intermediate",
    description:
      "Spanish classes, cultural field trips, and homestay for students who want to experience all of Quito.",
    duration: "1 week",
    hours: "20 + 10 hrs",
    price: "$582",
  },
  {
    title: "Online Spanish Classes",
    level: "Skype lessons",
    category: "medical",
    description:
      "Connect with Vida Verde teachers online for flexible schedules, customized materials, and a free trial class.",
    duration: "Package",
    hours: "20 hrs",
    price: "$254.64",
  },
];

export const catalogCourses: CatalogCourse[] = [
  {
    title: "One-on-One Classes",
    levels: ["A1", "A2", "B1", "B2", "C1"],
    levelLabel: "All levels",
    focus: ["general"],
    focusLabel: "Classes in Quito",
    formats: ["private"],
    description:
      "A personalized approach adaptable to any student. Beginners communicate faster, while intermediate and advanced students identify and correct gaps in their Spanish.",
    duration: "Flexible",
    hours: "20 hrs/week",
    formatLabel: "1-on-1",
    price: "$250",
    priceNote: "20 hours",
    featured: true,
  },
  {
    title: "Classes in a Pair",
    levels: ["A1", "A2", "B1", "B2", "C1"],
    levelLabel: "Two students",
    focus: ["general"],
    focusLabel: "Classes in Quito",
    formats: ["private"],
    description:
      "A shared Spanish class option for two students, priced per person and available when students can work well together at the same Spanish level.",
    duration: "Flexible",
    hours: "20 hrs/week",
    formatLabel: "Pair",
    price: "$199",
    priceNote: "20 hours",
  },
  {
    title: "Group Classes",
    levels: ["A1", "A2", "B1", "B2", "C1"],
    levelLabel: "3+ students",
    focus: ["general"],
    focusLabel: "Small groups",
    formats: ["group"],
    description:
      "A lively way to learn Spanish with people from different cultures. Vida Verde caps class size at 6 students so each person gets attention.",
    duration: "Flexible",
    hours: "20 hrs/week",
    extraLabel: "Size",
    extraValue: "3-6 people",
    price: "$140",
    priceNote: "20 hours",
  },
  {
    title: "Quito Immersion Program",
    levels: ["A1", "A2", "B1", "B2", "C1"],
    levelLabel: "All levels",
    focus: ["general"],
    focusLabel: "Classes + culture",
    formats: ["private", "group"],
    description:
      "Twenty hours of Spanish plus ten hours of cultural classes, with entrances and transport included and an option to add homestay.",
    duration: "1 week",
    hours: "30 hrs",
    formatLabel: "Class + trips",
    price: "$399",
    priceNote: "classes only",
  },
  {
    title: "Travelling Classroom",
    levels: ["A1", "A2", "B1", "B2", "C1"],
    levelLabel: "Adventure",
    focus: ["business"],
    focusLabel: "Ecuador programs",
    formats: ["private", "group"],
    description:
      "Explore Ecuador through Spanish study in Quito, the jungle, the coast, Galapagos, or a multi-stop travelling classroom.",
    duration: "Program",
    extraLabel: "Places",
    extraValue: "Jungle / coast",
    formatLabel: "Guided",
    price: "$740",
    priceNote: "from",
  },
  {
    title: "Online Spanish Classes",
    levels: ["A1", "A2", "B1", "B2", "C1"],
    levelLabel: "All levels",
    focus: ["general"],
    focusLabel: "Online classes",
    formats: ["online"],
    description:
      "Customized Skype lessons with flexible schedules, digital materials, clear Ecuadorian Spanish, and a free 20-minute trial class.",
    duration: "Package",
    extraLabel: "Platform",
    extraValue: "Skype",
    formatLabel: "20 hrs",
    price: "$254.64",
    priceNote: "package",
  },
];

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
    time: "8:30 - 12:30",
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

export const testimonials: Testimonial[] = [
  {
    quote:
      "Vida Verde was an exceptional experience for me. The school was welcoming and friendly. The professors were very impressive, and my Spanish quickly improved.",
    initials: "VM",
    name: "Vince Murphy",
    meta: "California",
  },
  {
    quote:
      "My name is Jennifer Cumming. I am a Canadian that travelled to Quito this year to study Spanish.",
    initials: "JC",
    name: "Jennifer Cumming",
    meta: "Canada",
  },
  {
    quote:
      "I want to thank all of you for your valuable collaboration for 7 years! It is an honor for me to work with the best teachers.",
    initials: "CH",
    name: "Christian",
    meta: "Student testimonial",
  },
  {
    quote:
      "I chose Vida Verde to enhance my Spanish in a short time and apply it properly during my volunteer work.",
    initials: "FD",
    name: "Franziska Denker",
    meta: "Volunteer work in Ecuador",
  },
];

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
