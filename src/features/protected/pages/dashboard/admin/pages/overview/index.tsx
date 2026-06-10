import DashboardPageLayout from "@/features/protected/pages/dashboard/shared/components/dashboard-page-layout";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  CalendarCheck2,
  CalendarDays,
  Clock,
  GraduationCap,
  Package,
} from "lucide-react";
import Link from "next/link";

const SECTIONS = [
  {
    title: "Teachers",
    description: "Add, edit, deactivate teachers and manage their weekly availability.",
    href: "/dashboard/admin/teachers",
    icon: GraduationCap,
    stats: [
      { label: "Active", value: "2", color: "default" },
      { label: "Inactive", value: "1", color: "secondary" },
    ],
  },
  {
    title: "Bookings",
    description: "View all incoming bookings. Filter by teacher, date range, or status. Export as CSV.",
    href: "/dashboard/admin/bookings",
    icon: CalendarCheck2,
    stats: [
      { label: "Confirmed", value: "3", color: "default" },
      { label: "Pending", value: "3", color: "secondary" },
      { label: "Cancelled", value: "1", color: "destructive" },
    ],
  },
  {
    title: "Sessions",
    description: "Track upcoming and past sessions. Mark as completed, no-show, or rescheduled.",
    href: "/dashboard/admin/sessions",
    icon: Clock,
    stats: [
      { label: "Upcoming", value: "5", color: "default" },
      { label: "Completed", value: "3", color: "secondary" },
      { label: "No-show", value: "1", color: "destructive" },
    ],
  },
  {
    title: "Packages",
    description: "Create and manage lesson packages available for students to purchase.",
    href: "/dashboard/admin/packages",
    icon: Package,
    stats: [
      { label: "Active", value: "4", color: "default" },
      { label: "Inactive", value: "1", color: "secondary" },
    ],
  },
  {
    title: "Blogs",
    description: "Write, edit, publish or draft blog posts for the Vida Verde website.",
    href: "/dashboard/admin/blogs",
    icon: BookOpen,
    stats: [
      { label: "Published", value: "3", color: "default" },
      { label: "Draft", value: "2", color: "secondary" },
    ],
  },
  {
    title: "Calendar",
    description: "See all sessions across all teachers in a monthly or weekly calendar view.",
    href: "/dashboard/admin/calendar",
    icon: CalendarDays,
    stats: [{ label: "Sessions this month", value: "18", color: "default" }],
  },
] as const;

export default function AdminDashboardIndex() {
  return (
    <DashboardPageLayout
      title="Admin Dashboard"
      subtitle="Manage all aspects of Vida Verde from here."
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {SECTIONS.map((section) => {
          const Icon = section.icon;
          return (
            <Link
              key={section.href}
              href={section.href}
              className="group flex flex-col gap-4 rounded-xl border bg-card p-5 transition-shadow hover:shadow-md hover:border-primary/40"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/15 transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-base">{section.title}</h3>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {section.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mt-auto">
                {section.stats.map((stat) => (
                  <Badge
                    key={stat.label}
                    variant={stat.color as any}
                    className="text-xs"
                  >
                    {stat.value} {stat.label}
                  </Badge>
                ))}
              </div>
            </Link>
          );
        })}
      </div>
    </DashboardPageLayout>
  );
}
