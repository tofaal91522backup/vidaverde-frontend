"use client";

import AsyncStateWrapper from "@/components/shared/async-state-wrapper";
import { Badge } from "@/components/ui/badge";
import DashboardPageLayout from "@/features/protected/pages/dashboard/shared/components/dashboard-page-layout";
import {
  AlertTriangle,
  BookOpen,
  CalendarCheck2,
  CalendarDays,
  Clock,
  GraduationCap,
  Package,
} from "lucide-react";
import Link from "next/link";
import { SummaryTiles } from "./components/summary-tiles";
import { UpcomingSessions } from "./components/upcoming-sessions";
import { useAdminDashboard } from "./queries/use-admin-dashboard";

export default function AdminDashboardIndex() {
  const { data, isLoading, isError } = useAdminDashboard();

  const cards = data?.cards;

  // Badge shudhu shekhanei, jekhane summary API sotti number dey.
  // Packages-er kono number ei response-e nai, tai oitar badge nai.
  const sections = [
    {
      title: "Teachers",
      description:
        "Add, edit, deactivate teachers and manage their weekly availability.",
      href: "/dashboard/admin/teachers",
      icon: GraduationCap,
      stats: cards ? [`${cards.teachers} teachers`] : [],
    },
    {
      title: "Bookings",
      description:
        "View all incoming bookings. Filter by teacher, date range, or status. Export as CSV.",
      href: "/dashboard/admin/bookings",
      icon: CalendarCheck2,
      stats: cards ? [`${cards.bookings_30d} in 30 days`] : [],
    },
    {
      title: "Sessions",
      description:
        "Track upcoming and past sessions. Mark as completed, no-show, or rescheduled.",
      href: "/dashboard/admin/sessions",
      icon: Clock,
      stats: cards
        ? [`${cards.sessions_upcoming} upcoming`, `${cards.sessions_today} today`]
        : [],
    },
    {
      title: "Packages",
      description:
        "Create and manage lesson packages available for students to purchase.",
      href: "/dashboard/admin/packages",
      icon: Package,
      stats: [],
    },
    {
      title: "Blogs",
      description:
        "Write, edit, publish or draft blog posts for the Vida Verde website.",
      href: "/dashboard/admin/blogs",
      icon: BookOpen,
      stats: cards ? [`${cards.blogs_draft} draft`] : [],
    },
    {
      title: "Calendar",
      description:
        "See all sessions across all teachers in a monthly or weekly calendar view.",
      href: "/dashboard/admin/calendar",
      icon: CalendarDays,
      stats: cards ? [`${cards.sessions_upcoming} upcoming`] : [],
    },
  ];

  return (
    <DashboardPageLayout
      title="Admin Dashboard"
      subtitle="Manage all aspects of Vida Verde from here."
    >
      <AsyncStateWrapper
        loading={isLoading}
        error={isError ? "Failed to load the dashboard summary." : null}
      >
        <div className="flex flex-col gap-6">
          {/* Backend doc sposhto bole ei ta surface korte: cron 3 bar try
              korar por-o pathate pare ni */}
          {cards && cards.emails_failed > 0 && (
            <div className="flex items-start gap-3 rounded-xl border border-red-300 bg-red-50 p-4 text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <p className="font-semibold">
                  {cards.emails_failed} email
                  {cards.emails_failed === 1 ? "" : "s"} failed to send
                </p>
                <p className="text-sm">
                  The mailer retried three times and gave up. Check the email
                  outbox for the reason.
                </p>
              </div>
            </div>
          )}

          {cards && <SummaryTiles cards={cards} />}

          <UpcomingSessions
            sessions={data?.upcoming_sessions ?? []}
            byStatus={data?.sessions_by_status ?? []}
          />

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {sections.map((section) => {
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

                  {section.stats.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {section.stats.map((stat) => (
                        <Badge key={stat} variant="secondary" className="text-xs">
                          {stat}
                        </Badge>
                      ))}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </AsyncStateWrapper>
    </DashboardPageLayout>
  );
}
