"use client";

import { Badge } from "@/components/ui/badge";
import type {
  AdminSession,
  SessionStatusCount,
} from "@/features/protected/pages/dashboard/admin/types/admin.types";
import {
  SCHOOL_TIMEZONE_LABEL,
  formatSchoolDateTime,
} from "@/features/protected/pages/dashboard/admin/utils/format-school-datetime";
import Link from "next/link";

const STATUS_LABELS: Record<string, string> = {
  scheduled: "scheduled",
  completed: "completed",
  no_show: "no show",
  cancelled: "cancelled",
  rescheduled: "rescheduled",
};

export function UpcomingSessions({
  sessions,
  byStatus,
}: {
  sessions: AdminSession[];
  byStatus: SessionStatusCount[];
}) {
  return (
    <div className="rounded-xl border bg-card">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b p-4">
        <div>
          <h2 className="font-semibold">Next classes</h2>
          {/* Admin-er shob time school time e — bole deওয়া na hole bhul bojhabe */}
          <p className="text-xs text-muted-foreground">
            Times in {SCHOOL_TIMEZONE_LABEL}
          </p>
        </div>

        {byStatus.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {byStatus.map((row) => (
              <Badge key={row.status} variant="secondary" className="text-xs">
                {row.count} {STATUS_LABELS[row.status] ?? row.status}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {sessions.length === 0 ? (
        <p className="p-4 text-sm text-muted-foreground">
          No upcoming classes scheduled.
        </p>
      ) : (
        <ul className="divide-y">
          {sessions.map((session) => (
            <li
              key={session.id}
              className="flex flex-wrap items-center justify-between gap-3 p-4"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium">
                  {session.teacher_name}
                  <span className="text-muted-foreground"> · </span>
                  {session.student_name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {session.package_title}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm tabular-nums">
                  {formatSchoolDateTime(session.start_datetime)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {session.duration_minutes} min
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="border-t p-3 text-center">
        <Link
          href="/dashboard/admin/sessions"
          className="text-sm font-medium text-primary hover:underline"
        >
          Manage all sessions
        </Link>
      </div>
    </div>
  );
}
