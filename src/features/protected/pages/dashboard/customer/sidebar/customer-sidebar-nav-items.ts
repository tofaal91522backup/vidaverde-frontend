import {
  CalendarDays,
  FileText,
  LayoutDashboard,
  Package,
} from "lucide-react";

export const CustomerSidebarNavItems = [
  {
    title: "Dashboard",
    url: "/dashboard/customer",
    icon: LayoutDashboard,
  },
  {
    title: "My Invoices",
    url: "/dashboard/customer/invoices",
    icon: FileText,
  },
  {
    title: "My Packages",
    url: "/dashboard/customer/my-packages",
    icon: Package,
  },
  {
    title: "My Calendar",
    url: "/dashboard/customer/calendar",
    icon: CalendarDays,
  },
];
