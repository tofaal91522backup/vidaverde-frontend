import {
  CalendarDays,
  CalendarPlus,
  FileText,
  LayoutDashboard,
  Package,
  UserRound,
} from "lucide-react";

export const StudentSidebarNavItems = [
  {
    title: "Dashboard",
    url: "/dashboard/student",
    icon: LayoutDashboard,
  },
  {
    title: "Book a Class",
    url: "/dashboard/student/book-class",
    icon: CalendarPlus,
  },
  {
    title: "My Invoices",
    url: "/dashboard/student/invoices",
    icon: FileText,
  },
  {
    title: "My Packages",
    url: "/dashboard/student/my-packages",
    icon: Package,
  },
  {
    title: "My Calendar",
    url: "/dashboard/student/calendar",
    icon: CalendarDays,
  },
  {
    title: "My Profile",
    url: "/dashboard/student/profile",
    icon: UserRound,
  },
];
