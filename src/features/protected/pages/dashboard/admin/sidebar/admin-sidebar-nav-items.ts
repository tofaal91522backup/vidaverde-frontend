import {
  BookOpen,
  CalendarCheck2,
  CalendarDays,
  Clock,
  GraduationCap,
  LayoutDashboard,
  Inbox,
  Mail,
  MessageSquareQuote,
  Sparkles,
  Package,
  ShieldCheck,
  Users,
} from "lucide-react";

export const AdminSidebarNavItems = [
  {
    title: "Dashboard",
    url: "/dashboard/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Teachers",
    url: "/dashboard/admin/teachers",
    icon: GraduationCap,
  },
  {
    title: "Students",
    url: "/dashboard/admin/students",
    icon: Users,
  },
  {
    title: "Bookings",
    url: "/dashboard/admin/bookings",
    icon: CalendarCheck2,
  },
  {
    title: "Sessions",
    url: "/dashboard/admin/sessions",
    icon: Clock,
  },
  {
    title: "Packages",
    url: "/dashboard/admin/packages",
    icon: Package,
  },
  {
    title: "Blogs",
    url: "/dashboard/admin/blogs",
    icon: BookOpen,
  },
  {
    title: "Calendar",
    url: "/dashboard/admin/calendar",
    icon: CalendarDays,
  },
  {
    title: "Testimonials",
    url: "/dashboard/admin/testimonials",
    icon: MessageSquareQuote,
  },
  {
    title: "Enquiries",
    url: "/dashboard/admin/enquiries",
    icon: Inbox,
  },
  {
    title: "Leads",
    url: "/dashboard/admin/leads",
    icon: Sparkles,
  },
  {
    title: "Email Outbox",
    url: "/dashboard/admin/emails",
    icon: Mail,
  },
];

/** The backend also enforces this; this only prevents manager UI access. */
export const MasterAdminSidebarNavItems = [
  {
    title: "Admin Accounts",
    url: "/dashboard/admin/admins",
    icon: ShieldCheck,
  },
];
