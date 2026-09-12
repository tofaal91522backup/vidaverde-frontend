"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { DashboardNextSession } from "@/features/protected/pages/dashboard/student/types/student.types";
import {
  formatLocalDateTime,
  formatLocalTime,
} from "@/features/protected/pages/dashboard/student/utils/format-local-datetime";
import { CalendarPlus, Clock, User, Video } from "lucide-react";
import Link from "next/link";

export function NextClassCard({
  session,
  timezone,
}: {
  session: DashboardNextSession | null;
  timezone: string;
}) {
  if (!session) {
    return (
      <div className="flex flex-col items-start gap-3 rounded-xl border border-dashed bg-card p-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          <CalendarPlus className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-semibold">No class scheduled</h3>
          <p className="text-sm text-muted-foreground">
            You don&apos;t have an upcoming lesson yet. Book one from your
            packages.
          </p>
        </div>
        <Button asChild size="sm" variant="outline">
          <Link href="/dashboard/student/my-packages">View my packages</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 rounded-xl border bg-card p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Next class
          </span>
          <Badge variant="default" className="text-xs capitalize">
            {session.status}
          </Badge>
        </div>
        {timezone && (
          <span className="text-xs text-muted-foreground">
            Times shown in {timezone}
          </span>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold">{session.package_title}</h3>
        <p className="text-sm text-muted-foreground">
          {formatLocalDateTime(session.start_local)}
        </p>
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <User className="h-4 w-4" />
          {session.teacher_name}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-4 w-4" />
          {formatLocalTime(session.start_local)}
          {session.end_datetime && ` · ${session.duration_minutes} min`}
        </span>
      </div>

      {session.meet_link && (
        <Button asChild className="w-fit gap-2">
          <a href={session.meet_link} target="_blank" rel="noopener noreferrer">
            <Video className="h-4 w-4" />
            Join on Google Meet
          </a>
        </Button>
      )}
    </div>
  );
}
