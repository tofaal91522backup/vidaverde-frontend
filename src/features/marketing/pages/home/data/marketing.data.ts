import type { Course, CourseCategory, FeatureBlock, Stat, Testimonial } from "@/features/marketing/types";

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
      "Vida Verde was an exceptional experience. The professors were very impressive — my Spanish improved so quickly I was having real conversations by week two.",
    initials: "VM",
    name: "Vince Murphy",
    meta: "California, USA 🇺🇸 · Got conversational in 2 weeks",
  },
  {
    quote:
      "I came to Quito not knowing a word of Spanish and left six weeks later able to navigate the city, shop at the market, and chat with my host family over dinner.",
    initials: "JC",
    name: "Jennifer Cumming",
    meta: "Canada 🇨🇦 · Zero to conversational in 6 weeks",
  },
  {
    quote:
      "After 7 years of collaboration I can honestly say the teachers here are the best I have ever worked with. My Spanish finally reached the level I needed for my job.",
    initials: "CH",
    name: "Christian Herber",
    meta: "Germany 🇩🇪 · Used Spanish in a professional setting",
  },
  {
    quote:
      "I chose Vida Verde to prepare for volunteer work in Ecuador. The one-on-one lessons were perfectly tailored to my goals and I felt confident from day one in the field.",
    initials: "FD",
    name: "Franziska Denker",
    meta: "Germany 🇩🇪 · Prepared for volunteer work in 3 weeks",
  },
  {
    quote:
      "The online classes are just as personal as being there in person. My teacher remembered exactly where I left off every session and pushed me at exactly the right pace.",
    initials: "MR",
    name: "Marco Ribeiro",
    meta: "Brazil 🇧🇷 · Advanced from A2 to B2 online",
  },
];
