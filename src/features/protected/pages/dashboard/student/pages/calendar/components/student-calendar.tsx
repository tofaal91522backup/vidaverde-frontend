"use client";

import { AppDialog } from "@/components/shared/app-dialog";
import AsyncStateWrapper from "@/components/shared/async-state-wrapper";
import { TableCard } from "@/components/shared/table-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type {
  SessionStatus,
  StudentSession,
} from "@/features/protected/pages/dashboard/student/types/student.types";
import {
  formatLocalTime,
  localDateKey,
} from "@/features/protected/pages/dashboard/student/utils/format-local-datetime";
import { cn } from "@/lib/utils";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  LayoutGrid,
  MapPin,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useStudentSessions } from "../queries/use-student-sessions";
import { ReschedulePanel, SessionActions } from "./session-actions";

// ── helpers ──────────────────────────────────────────────────────────────────

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAY_NAMES = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

/**
 * Backend date-range filter dey na, tai puro list ene client-side e bhag kora hoy.
 * Ek student-er session shonkha kom, tai ek page-ei dhore jay.
 */
const CALENDAR_PAGE_SIZE = 200;

/**
 * Local date YYYY-MM-DD. `toISOString()` UTC dey — tate timezone offset-e
 * "today" ek din age/pore dekhate pare, tai local part theke banano hoy.
 */
function localIso(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

const STATUS_VARIANTS: Record<
  SessionStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
  scheduled: "default",
  completed: "outline",
  no_show: "destructive",
  cancelled: "destructive",
  rescheduled: "secondary",
};

const STATUS_COLORS: Record<SessionStatus, string> = {
  scheduled: "bg-green-600",
  completed: "bg-muted-foreground/60",
  no_show: "bg-red-500",
  cancelled: "bg-red-400",
  rescheduled: "bg-amber-500",
};

const STATUS_LABELS: Record<SessionStatus, string> = {
  scheduled: "scheduled",
  completed: "completed",
  no_show: "no show",
  cancelled: "cancelled",
  rescheduled: "rescheduled",
};

/** Ek date-er shob session — key `start_local` er date part */
function groupByLocalDate(sessions: StudentSession[]) {
  const map: Record<string, StudentSession[]> = {};
  sessions.forEach((session) => {
    const key = localDateKey(session.start_local);
    if (!map[key]) map[key] = [];
    map[key].push(session);
  });
  return map;
}

// ── session dot + popup ───────────────────────────────────────────────────────

function SessionDot({
  session,
  timezone,
}: {
  session: StudentSession;
  timezone: string;
}) {
  const [open, setOpen] = useState(false);
  // Nested dialog eriye ek-i dialog-er bhitore panel swap kora hoy
  const [mode, setMode] = useState<"details" | "reschedule">("details");
  const localTime = formatLocalTime(session.start_local);
  const color = STATUS_COLORS[session.status];

  const close = () => {
    setOpen(false);
    setMode("details");
  };

  return (
    <AppDialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setMode("details");
      }}
      size="sm"
      trigger={
        <button
          className={cn(
            "w-full truncate rounded px-1 py-0.5 text-left text-[10px] text-white leading-tight",
            color,
          )}
          title={`${session.teacher_name} at ${localTime}`}
        >
          {localTime} {session.teacher_name}
        </button>
      }
      title={mode === "reschedule" ? "Move this class" : "Session Details"}
    >
      {mode === "reschedule" ? (
        <ReschedulePanel
          session={session}
          timezone={timezone}
          onBack={() => setMode("details")}
          onDone={close}
        />
      ) : (
      <div className="space-y-4 py-2 text-sm">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-muted-foreground">Teacher</p>
            <p className="font-semibold">{session.teacher_name}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Status</p>
            <Badge
              variant={STATUS_VARIANTS[session.status]}
              className="capitalize mt-0.5 text-xs"
            >
              {STATUS_LABELS[session.status]}
            </Badge>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Date</p>
            <p className="font-medium">
              {new Date(
                session.start_local.slice(0, 19),
              ).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Time (your timezone)</p>
            <p className="font-semibold">{localTime}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Duration</p>
            <p className="font-medium">{session.duration_minutes} min</p>
          </div>
          {session.package_title && (
            <div>
              <p className="text-xs text-muted-foreground">Package</p>
              <p className="font-medium">{session.package_title}</p>
            </div>
          )}
        </div>

        {session.meet_link && session.status === "scheduled" && (
          <a
            href={session.meet_link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700 hover:bg-green-100 transition-colors dark:border-green-900 dark:bg-green-950 dark:text-green-300"
          >
            <ExternalLink className="h-4 w-4 shrink-0" />
            Join on Google Meet
          </a>
        )}

        <SessionActions
          session={session}
          onReschedule={() => setMode("reschedule")}
          onDone={close}
        />
      </div>
      )}
    </AppDialog>
  );
}

// ── month view ────────────────────────────────────────────────────────────────

function MonthView({
  year,
  month,
  sessions,
  timezone,
}: {
  year: number;
  month: number;
  sessions: StudentSession[];
  timezone: string;
}) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  // Shesh week-tao bhorte hobe. Shudhu shurur khali ghor bhorle shesh row-e
  // koyekta cell-i thake na — `divide` er line gula ordhek giye theme jay ar
  // row-ta bhanga dekhay. (Admin calendar-eও ek-i bug chilo.)
  while (cells.length % 7 !== 0) cells.push(null);

  const byDate = useMemo(() => groupByLocalDate(sessions), [sessions]);
  const todayIso = localIso(new Date());

  return (
    // Card-er bhitore boshe — nijer border dile border-er bhitore border hoto
    <div className="overflow-hidden">
      <div className="grid grid-cols-7 bg-muted/40 text-xs font-medium">
        {DAY_NAMES.map((d) => (
          <div key={d} className="py-2 text-center text-muted-foreground">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 divide-x divide-y border-t">
        {cells.map((day, i) => {
          if (day === null) return <div key={`e${i}`} className="min-h-24 bg-muted/30" />;
          const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const daySessions = byDate[dateStr] ?? [];
          const isToday = dateStr === todayIso;
          return (
            <div key={day} className="min-h-24 p-1">
              <span className={cn("inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium", isToday && "bg-primary text-primary-foreground")}>
                {day}
              </span>
              <div className="mt-0.5 space-y-0.5 overflow-hidden max-h-16">
                {daySessions.slice(0, 3).map((s) => (
                  <SessionDot key={s.id} session={s} timezone={timezone} />
                ))}
                {daySessions.length > 3 && (
                  <p className="text-[10px] text-muted-foreground pl-1">+{daySessions.length - 3} more</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── week view ─────────────────────────────────────────────────────────────────

function WeekView({
  weekStart,
  sessions,
  timezone,
}: {
  weekStart: Date;
  sessions: StudentSession[];
  timezone: string;
}) {
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return d;
  });
  const byDate = useMemo(() => groupByLocalDate(sessions), [sessions]);
  const todayIso = localIso(new Date());

  return (
    <div className="overflow-hidden">
      <div className="grid grid-cols-7 border-b bg-muted/40">
        {days.map((d) => {
          const isToday = localIso(d) === todayIso;
          return (
            <div key={localIso(d)} className={cn("py-2 text-center text-xs font-medium", isToday && "bg-primary/10")}>
              <div className="text-muted-foreground">{DAY_NAMES[d.getDay()]}</div>
              <div className={cn("mx-auto mt-0.5 flex h-6 w-6 items-center justify-center rounded-full font-semibold", isToday && "bg-primary text-primary-foreground")}>
                {d.getDate()}
              </div>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-7 divide-x min-h-48">
        {days.map((d) => {
          const dateStr = localIso(d);
          return (
            <div key={dateStr} className="p-1 space-y-1">
              {(byDate[dateStr] ?? []).map((s) => (
                <SessionDot key={s.id} session={s} timezone={timezone} />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── main component ─────────────────────────────────────────────────────────────

export function StudentCalendar() {
  const [viewMode, setViewMode] = useState<"month" | "week">("month");
  const [currentDate, setCurrentDate] = useState(() => new Date());

  const { data, isLoading, isError } = useStudentSessions({
    filter: "all",
    pageSize: CALENDAR_PAGE_SIZE,
  });

  const sessions = data?.results ?? [];
  // Timezone-er shotto utsho backend — student-er profile-er zone, browser-er na
  const tz = data?.timezone ?? "";
  const truncated = (data?.count ?? 0) > sessions.length;

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const weekStart = useMemo(() => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() - d.getDay());
    return d;
  }, [currentDate]);

  const goBack = () => {
    const d = new Date(currentDate);
    if (viewMode === "month") {
      d.setMonth(d.getMonth() - 1);
    } else {
      d.setDate(d.getDate() - 7);
    }
    setCurrentDate(d);
  };

  const goForward = () => {
    const d = new Date(currentDate);
    if (viewMode === "month") {
      d.setMonth(d.getMonth() + 1);
    } else {
      d.setDate(d.getDate() + 7);
    }
    setCurrentDate(d);
  };

  const title =
    viewMode === "month"
      ? `${MONTH_NAMES[month]} ${year}`
      : `Week of ${weekStart.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;

  return (
    <TableCard
      toolbar={
        <div className="flex w-full flex-wrap items-center gap-3">
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              onClick={goBack}
              aria-label="Previous"
              className="bg-background"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-background"
              onClick={() => setCurrentDate(new Date())}
            >
              Today
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={goForward}
              aria-label="Next"
              className="bg-background"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <span className="flex-1 text-base font-semibold">{title}</span>

          <div className="flex overflow-hidden rounded-md border bg-background">
            <Button
              variant={viewMode === "month" ? "default" : "ghost"}
              size="sm"
              className="gap-1 rounded-none"
              onClick={() => setViewMode("month")}
            >
              <LayoutGrid className="h-3.5 w-3.5" /> Month
            </Button>
            <Button
              variant={viewMode === "week" ? "default" : "ghost"}
              size="sm"
              className="gap-1 rounded-none border-l"
              onClick={() => setViewMode("week")}
            >
              <Calendar className="h-3.5 w-3.5" /> Week
            </Button>
          </div>
        </div>
      }
      footer={
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
              {(Object.keys(STATUS_COLORS) as SessionStatus[]).map((status) => (
                <span
                  key={status}
                  className="flex items-center gap-1.5 capitalize"
                >
                  <span
                    className={cn(
                      "h-2.5 w-2.5 rounded-full",
                      STATUS_COLORS[status],
                    )}
                  />
                  {STATUS_LABELS[status]}
                </span>
              ))}
            </div>

            {tz && (
              <span className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                Times in <strong>{tz}</strong>
              </span>
            )}
          </div>

          {/* Count na — **warning**. Backend ei endpoint-e date-range filter dey
              na, tai 200-e cap kora. Shudhu tokhon-i othe jokhon asholei data
              kata porche; shoriye dile student bhabto puro list dekhche. */}
          {truncated && (
            <p className="text-xs text-amber-600">
              Showing the most recent {sessions.length} of {data?.count}{" "}
              sessions.
            </p>
          )}
        </div>
      }
    >
      <AsyncStateWrapper
        loading={isLoading}
        error={isError ? "Failed to load your sessions." : null}
      >
        {viewMode === "month" ? (
          <MonthView
            year={year}
            month={month}
            sessions={sessions}
            timezone={tz}
          />
        ) : (
          <WeekView weekStart={weekStart} sessions={sessions} timezone={tz} />
        )}
      </AsyncStateWrapper>
    </TableCard>
  );
}
