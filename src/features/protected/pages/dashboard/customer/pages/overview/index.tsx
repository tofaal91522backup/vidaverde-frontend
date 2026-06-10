import DashboardPageLayout from "@/features/protected/pages/dashboard/shared/components/dashboard-page-layout";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, FileText, Package } from "lucide-react";
import Link from "next/link";

const SECTIONS = [
  {
    title: "My Invoices",
    description: "View all your payment records and download invoices as PDF.",
    href: "/dashboard/customer/invoices",
    icon: FileText,
    stats: [
      { label: "Paid", value: "3", color: "default" },
      { label: "Pending", value: "1", color: "secondary" },
    ],
  },
  {
    title: "My Packages",
    description: "See your purchased packages, classes used, and expiry dates.",
    href: "/dashboard/customer/my-packages",
    icon: Package,
    stats: [
      { label: "Active", value: "2", color: "default" },
      { label: "Completed", value: "2", color: "secondary" },
    ],
  },
  {
    title: "My Calendar",
    description: "View upcoming and past sessions in your local timezone. Join lessons directly from here.",
    href: "/dashboard/customer/calendar",
    icon: CalendarDays,
    stats: [
      { label: "Upcoming this month", value: "5", color: "default" },
    ],
  },
] as const;

export default function CustomerDashboardIndex() {
  return (
    <DashboardPageLayout
      title="Student Portal"
      subtitle="Welcome back! Here's an overview of your lessons and account."
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
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/15 transition-colors">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-base">{section.title}</h3>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {section.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mt-auto">
                {section.stats.map((stat) => (
                  <Badge key={stat.label} variant={stat.color as any} className="text-xs">
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
