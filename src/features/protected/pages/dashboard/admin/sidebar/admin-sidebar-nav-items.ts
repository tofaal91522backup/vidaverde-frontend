import {
  BookOpen,
  CalendarCheck2,
  CalendarDays,
  Clock,
  GraduationCap,
  LayoutDashboard,
  Package,
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
];
