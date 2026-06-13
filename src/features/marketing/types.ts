export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export type Stat = {
  value: string;
  suffix?: string;
  label: string;
  target?: number;
};

export type FeatureBlock = {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  span?: "span-4" | "span-6" | "span-8";
  tone?: "default" | "dark" | "accent";
};

export type CourseCategory =
  | "all"
  | "beginner"
  | "intermediate"
  | "advanced"
  | "business"
  | "medical";

export type Course = {
  title: string;
  level: string;
  category: CourseCategory;
  description: string;
  duration: string;
  hours: string;
  price: string;
};

export type CatalogCourse = {
  title: string;
  levels: string[];
  levelLabel: string;
  focus: string[];
  focusLabel: string;
  formats: string[];
  description: string;
  duration: string;
  hours?: string;
  formatLabel?: string;
  extraLabel?: string;
  extraValue?: string;
  price: string;
  priceNote?: string;
  featured?: boolean;
};

export type ActivityCategory =
  | "all"
  | "cultural"
  | "adventure"
  | "culinary"
  | "weekend"
  | "volunteer";

export type Activity = {
  title: string;
  categories: Exclude<ActivityCategory, "all">[];
  tag: string;
  duration: string;
  description: string;
  price: string;
  priceNote?: string;
  image: string;
  alt: string;
  wide?: boolean;
  included?: boolean;
};

export type ScheduleItem = {
  day: string;
  time: string;
  title: string;
  description: string;
  badge: string;
  optional?: boolean;
};

export type Testimonial = {
  quote: string;
  initials: string;
  name: string;
  meta: string;
};

export type HomestayPillar = {
  number: string;
  title: string;
  description: string;
};

export type IncludedItem = {
  icon: string;
  title: string;
  description: string;
};

export type PricingTier = {
  title: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  featured?: boolean;
  cta: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};
