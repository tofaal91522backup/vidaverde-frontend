"use client";

import AsyncStateWrapper from "@/components/shared/async-state-wrapper";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import DashboardPageLayout from "@/features/protected/pages/dashboard/shared/components/dashboard-page-layout";
import { CalendarDays, FileText, Package } from "lucide-react";
import Link from "next/link";
import { NextClassCard } from "./components/next-class-card";
import { useStudentDashboard } from "./queries/use-student-dashboard";

type SectionStat = { label: string; value: string | number; variant: "default" | "secondary" };

export default function StudentDashboardIndex() {
  const { data, isLoading, isError } = useStudentDashboard();

  const packages = data?.packages ?? [];
  const recentInvoices = data?.recent_invoices ?? [];

  const activePackages = packages.filter((pkg) => pkg.can_book);
  const classesRemaining = packages.reduce(
    (total, pkg) => total + pkg.classes_remaining,
    0,
  );

  const sections: {
    title: string;
    description: string;
    href: string;
    icon: typeof FileText;
    stats: SectionStat[];
  }[] = [
    {
      title: "My Invoices",
      description: "View all your payment records and download invoices as PDF.",
      href: "/dashboard/student/invoices",
      icon: FileText,
      stats: [
        { label: "recent", value: recentInvoices.length, variant: "default" },
      ],
    },
    {
      title: "My Packages",
      description: "See your purchased packages, classes used, and expiry dates.",
      href: "/dashboard/student/my-packages",
      icon: Package,
      stats: [
        { label: "active", value: activePackages.length, variant: "default" },
        {
          label: "classes left",
          value: classesRemaining,
          variant: "secondary",
        },
      ],
    },
    {
      title: "My Calendar",
      description:
        "View upcoming and past sessions in your local timezone. Join lessons directly from here.",
      href: "/dashboard/student/calendar",
      icon: CalendarDays,
      stats: [
        {
          label: data?.next_session ? "class scheduled" : "classes scheduled",
          value: data?.next_session ? 1 : 0,
          variant: "default",
        },
      ],
    },
  ];

  return (
    <DashboardPageLayout
      title="Student Portal"
      subtitle="Welcome back! Here's an overview of your lessons and account."
    >
      <AsyncStateWrapper
        loading={isLoading}
        error={isError ? "Failed to load your dashboard." : null}
      >
        <div className="flex flex-col gap-6">
          <NextClassCard
            session={data?.next_session ?? null}
            timezone={data?.timezone ?? ""}
          />

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                // `Card` asChild support kore na, tai Link bahire
                <Link key={section.href} href={section.href} className="group">
                  <Card className="h-full transition-shadow group-hover:border-primary/40 group-hover:shadow-md">
                    <CardContent className="flex flex-col gap-4">
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
                      <Badge
                        key={stat.label}
                        variant={stat.variant}
                        className="text-xs"
                      >
                        {stat.value} {stat.label}
                      </Badge>
                    ))}
                  </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </AsyncStateWrapper>
    </DashboardPageLayout>
  );
}
