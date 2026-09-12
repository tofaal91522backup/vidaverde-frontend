"use client";

import type { AdminDashboardCards } from "@/features/protected/pages/dashboard/admin/types/admin.types";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  CalendarClock,
  CalendarDays,
  DollarSign,
  GraduationCap,
  Mail,
  MessageSquare,
  PenLine,
  Sparkles,
  Users,
} from "lucide-react";

/**
 * Ei number gula chart na — plain stat tile. Kom shonkhar ekok value-r jonno
 * chart banano shudhu noise barato.
 */
function Tile({
  label,
  value,
  icon: Icon,
  hint,
}: {
  label: string;
  value: string | number;
  icon: typeof Users;
  hint?: string;
}) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-4 w-4 shrink-0" />
        <span className="text-xs font-medium">{label}</span>
      </div>
      <p className="mt-2 text-2xl font-semibold tabular-nums">{value}</p>
      {hint && <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

/**
 * Mono jogar dorkar emon jinis. Status ta shudhu rong diye bola hoy na —
 * icon + lekha shoho ashe, jate rong na dekhleo bojha jay.
 */
function AttentionTile({
  label,
  value,
  icon: Icon,
  tone,
  href,
}: {
  label: string;
  value: number;
  icon: typeof Users;
  tone: "neutral" | "warning" | "critical";
  href?: string;
}) {
  const active = value > 0;

  const toneClass =
    !active || tone === "neutral"
      ? "border-border bg-card text-muted-foreground"
      : tone === "warning"
        ? "border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200"
        : "border-red-300 bg-red-50 text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-200";

  const content = (
    <div className={cn("rounded-xl border p-4", toneClass)}>
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 shrink-0" />
        <span className="text-xs font-medium">{label}</span>
      </div>
      <p className="mt-2 text-2xl font-semibold tabular-nums">{value}</p>
    </div>
  );

  return href && active ? (
    <a href={href} className="block transition hover:opacity-80">
      {content}
    </a>
  ) : (
    content
  );
}

export function SummaryTiles({ cards }: { cards: AdminDashboardCards }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Tile label="Students" value={cards.students} icon={Users} />
        <Tile label="Teachers" value={cards.teachers} icon={GraduationCap} />
        <Tile
          label="Revenue (30 days)"
          value={`$${cards.revenue_30d}`}
          icon={DollarSign}
          hint={`${cards.bookings_30d} bookings`}
        />
        <Tile
          label="Leads"
          value={cards.leads_total}
          icon={Sparkles}
          hint={`${cards.leads_30d} in the last 30 days`}
        />
        <Tile
          label="Classes today"
          value={cards.sessions_today}
          icon={CalendarDays}
        />
        <Tile
          label="Upcoming classes"
          value={cards.sessions_upcoming}
          icon={CalendarClock}
        />
      </div>

      <div>
        <h2 className="mb-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Needs attention
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <AttentionTile
            label="Unhandled enquiries"
            value={cards.contact_unhandled}
            icon={MessageSquare}
            tone="warning"
          />
          <AttentionTile
            label="Draft blog posts"
            value={cards.blogs_draft}
            icon={PenLine}
            tone="neutral"
            href="/dashboard/admin/blogs"
          />
          <AttentionTile
            label="Emails queued"
            value={cards.emails_pending}
            icon={Mail}
            tone="neutral"
          />
          <AttentionTile
            label="Emails failed"
            value={cards.emails_failed}
            icon={AlertTriangle}
            tone="critical"
          />
        </div>
      </div>
    </div>
  );
}
