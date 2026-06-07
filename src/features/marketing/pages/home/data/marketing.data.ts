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
      "Vida Verde has been teaching Spanish since 1999. AECEE-certified, structured, and accountable — not a marketplace of strangers.",
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
      "No fixed syllabus. Your teacher adapts every lesson to your level, goals, and pace — whether you're a complete beginner or polishing your fluency.",
    span: "span-4",
    tone: "accent",
  },
  {
    number: "04",
    eyebrow: "Flexibility",
    title: "Learn Anywhere",
    description:
      "Classes via Google Meet. Real conversation, real feedback, real progress — from your living room, office, or café.",
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
