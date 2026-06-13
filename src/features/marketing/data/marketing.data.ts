import type { NavItem } from "@/features/marketing/types";

export const navItems: NavItem[] = [
  {
    label: "Online Classes",
    href: "/online-classes",
    children: [
      { label: "Overview", href: "/online-classes" },
      { label: "Book a Lesson", href: "/online-classes/book" },
      { label: "Teachers", href: "/online-classes#teachers" },
    ],
  },
  {
    label: "Study in Quito",
    href: "/study-in-quito",
    children: [
      { label: "Overview", href: "/study-in-quito" },
      {
        label: "Quito Immersion Program",
        href: "/study-in-quito/quito-immersion",
      },
      {
        label: "Travelling Classroom",
        href: "/study-in-quito/travelling-classroom",
      },
      { label: "Puerto López", href: "/study-in-quito/puerto-lopez" },
      { label: "Jungle Programs", href: "/study-in-quito/jungle-programme" },
    ],
  },
  { label: "Travel Spanish", href: "/travel-spanish" },
  { label: "Our School", href: "/our-school" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];
