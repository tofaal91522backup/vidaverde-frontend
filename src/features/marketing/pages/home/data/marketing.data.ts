import type { Course, CourseCategory, FeatureBlock, Stat, Testimonial } from "@/features/marketing/types";

export const trustBadges = [
  "AECEE Certified",
  "Est. 1999",
  "4,700+ Students",
  "All Levels Welcome",
  "Classes via Google Meet",
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
    title: "A Real School, Not a Platform",
    description:
      "Vida Verde has been teaching Spanish since 1999. AECEE-certified, structured, and accountable. Not a marketplace of strangers.",
    span: "span-6",
  },
  {
    number: "02",
    eyebrow: "Teachers",
    title: "Expert Native Teachers",
    description:
      "Every teacher is a university-trained Ecuadorian native speaker with years of classroom experience. Not a hobbyist. Not a part-timer.",
    span: "span-6",
    tone: "dark",
  },
  {
    number: "03",
    eyebrow: "Learning",
    title: "Personalised to You",
    description:
      "No fixed syllabus. Your teacher adapts every lesson to your level, goals, and pace. Whether you're a complete beginner or polishing your fluency.",
    span: "span-4",
    tone: "accent",
  },
  {
    number: "04",
    eyebrow: "Flexibility",
    title: "Learn Anywhere",
    description:
      "Classes via Google Meet. Real conversation, real feedback, real progress. From your living room, office, or café.",
    span: "span-8",
  },
];

export const socialStats = [
  { value: "4,700+", label: "Students Taught" },
  { value: "356", label: "Courses Delivered" },
  { value: "25+", label: "Years of Teaching" },
  { value: "AECEE", label: "Certified" },
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
    level: "Google Meet lessons",
    category: "medical",
    description:
      "Connect with Vida Verde teachers online for flexible schedules, customized materials, and a free trial class.",
    duration: "Package",
    hours: "20 hrs",
    price: "$254.64",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "I really loved the warm and welcoming atmosphere at Vida Verde. Irma is a great teacher who encouraged me every day to step up my skills. Our lessons were never boring. Thanks for the amazing experience, organised tours, and those funny Friday music sessions!",
    initials: "AS",
    name: "Anita S",
    meta: "Germany 🇩🇪 · Solo · Quito Immersion · Jun 2023",
  },
  {
    quote:
      "The teachers at Vida Verde were wonderful, fun, knowledgeable and helpful! My 12-year-old son and I took daily lessons for a month. They were flexible with our schedule and we loved the location.",
    initials: "TC",
    name: "Tracy C",
    meta: "USA 🇺🇸 · Family · 1-month stay · Jun 2022",
  },
  {
    quote:
      "Vida Verde is one of the absolute best language schools I have attended. The instructors are kind, smart, dedicated and well trained. Each day my son and I walked away with new learning. I am definitely returning.",
    initials: "RA",
    name: "Rachael A",
    meta: "Denver, Colorado 🇺🇸 · Family · Jun 2022",
  },
  {
    quote:
      "The professors for all the classes were amazing! Fernando taught Spanish better than I have ever been taught. Rosa makes sure everyone feels welcome and is super fun.",
    initials: "EA",
    name: "Errol A",
    meta: "USA 🇺🇸 · Group · Quito Immersion · May 2022",
  },
  {
    quote:
      "Fantastic school with warm and welcoming staff. Vida Verde was my last stop after three months travelling Latin America and it was definitely one of the best. My only regret is I only stayed for one week.",
    initials: "BW",
    name: "Breanne W",
    meta: "Whistler, Canada 🇨🇦 · Solo · Feb 2020",
  },
  {
    quote:
      "All of my teachers were great, always well-prepared, quickly adapting to my needs and putting a lot of passion into their work. Back home, I now take online classes at Vida Verde via Skype.",
    initials: "S",
    name: "Silke",
    meta: "Germany 🇩🇪 · Solo · 3 weeks in Quito + Amazon · Feb 2019",
  },
];
