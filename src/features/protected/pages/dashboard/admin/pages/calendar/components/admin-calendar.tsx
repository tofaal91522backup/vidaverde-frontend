"use client";

import { AppDialog } from "@/components/shared/app-dialog";
import AsyncStateWrapper from "@/components/shared/async-state-wrapper";
import { ReusableSelect } from "@/components/shared/form-related/reusable-select";
import { TableCard } from "@/components/shared/table-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTeachers } from "@/features/protected/pages/dashboard/admin/pages/teachers/queries/use-teachers";
import type {
  AdminCalendarEvent,
  SessionStatus,
} from "@/features/protected/pages/dashboard/admin/types/admin.types";
import {
  SCHOOL_TIMEZONE_LABEL,
  formatSchoolDate,
  formatSchoolTime,
  schoolDateKey,
} from "@/features/protected/pages/dashboard/admin/utils/format-school-datetime";
import { toList } from "@/features/protected/pages/dashboard/admin/utils/to-list";
import { cn } from "@/lib/utils";
import { localDateInput } from "@/utils/iso-datetime";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  LayoutGrid,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useCalendarSessions } from "../queries/use-calendar-sessions";

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAY_NAMES = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

const STATUS_OPTIONS = [
  { value: "scheduled", label: "Scheduled" },
  { value: "completed", label: "Completed" },
  { value: "no_show", label: "No show" },
  { value: "cancelled", label: "Cancelled" },
  { value: "rescheduled", label: "Rescheduled" },
];

const STATUS_LABELS: Record<SessionStatus, string> = {
  scheduled: "scheduled",
  completed: "completed",
  no_show: "no show",
  cancelled: "cancelled",
  rescheduled: "rescheduled",
};

function monthRange(year: number, month: number) {
  return {
    from: localDateInput(new Date(year, month, 1)),
    to: localDateInput(new Date(year, month + 1, 0)),
  };
}

function weekRange(date: Date) {
  const start = new Date(date);
  start.setDate(start.getDate() - start.getDay());
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  return { from: localDateInput(start), to: localDateInput(end) };
}

function groupByDate(events: AdminCalendarEvent[]) {
  const map: Record<string, AdminCalendarEvent[]> = {};
  events.forEach((event) => {
    const key = schoolDateKey(event.start);
    if (!map[key]) map[key] = [];
    map[key].push(event);
  });
  return map;
}

// ── event chip + detail ──────────────────────────────────────────────────────

function EventChip({ event }: { event: AdminCalendarEvent }) {
  const [open, setOpen] = useState(false);
  const time = formatSchoolTime(event.start);

  return (
    <AppDialog
      open={open}
      onOpenChange={setOpen}
      size="sm"
      trigger={
        <button
          // Rong backend theke ashe (teacher onujayi fixed) — frontend cycle kore na
          style={{ backgroundColor: event.color }}
          className="w-full truncate rounded px-1 py-0.5 text-left text-[10px] leading-tight text-white"
          title={`${time} ${event.title}`}
        >
          {time} {event.title}
        </button>
      }
      title="Session details"
    >
      <div className="space-y-4 py-2 text-sm">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-muted-foreground">Teacher</p>
            <p className="font-semibold">{event.teacher_name}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Student</p>
            <p className="font-semibold">{event.student_name}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Date</p>
            <p className="font-medium">{formatSchoolDate(event.start)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Time</p>
            <p className="font-medium tabular-nums">
              {formatSchoolTime(event.start)} – {formatSchoolTime(event.end)}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Status</p>
            <Badge variant="secondary" className="mt-0.5 capitalize">
              {STATUS_LABELS[event.status] ?? event.status}
            </Badge>
          </div>
        </div>

        {event.meet_link && (
          <a
            href={event.meet_link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium hover:bg-muted"
          >
            <ExternalLink className="h-4 w-4 shrink-0" />
            Open Google Meet
          </a>
        )}

        <Link
          href="/dashboard/admin/sessions"
          className="block text-sm font-medium text-primary hover:underline"
        >
          Manage this session
        </Link>
      </div>
    </AppDialog>
  );
}

// ── views ────────────────────────────────────────────────────────────────────

function MonthView({
  year,
  month,
  events,
}: {
  year: number;
  month: number;
  events: AdminCalendarEvent[];
}) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const byDate = useMemo(() => groupByDate(events), [events]);
  const todayIso = localDateInput(new Date());

  return (
    // Card-er bhitore boshe — nijer border dile border-er bhitore border hoto
    <div className="overflow-hidden">
      <div className="grid grid-cols-7 bg-muted/40 text-xs font-medium">
        {DAY_NAMES.map((d) => (
          <div key={d} className="py-2 text-center text-muted-foreground">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 divide-x divide-y border-t">
        {cells.map((day, i) => {
          if (day === null)
            return <div key={`e${i}`} className="min-h-24 bg-muted/30" />;
          const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const dayEvents = byDate[dateStr] ?? [];
          return (
            <div key={day} className="min-h-24 p-1">
              <span
                className={cn(
                  "inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium",
                  dateStr === todayIso && "bg-primary text-primary-foreground",
                )}
              >
                {day}
              </span>
              <div className="mt-0.5 max-h-16 space-y-0.5 overflow-hidden">
                {dayEvents.slice(0, 3).map((event) => (
                  <EventChip key={event.id} event={event} />
                ))}
                {dayEvents.length > 3 && (
                  <p className="pl-1 text-[10px] text-muted-foreground">
                    +{dayEvents.length - 3} more
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function WeekView({
  weekStart,
  events,
}: {
  weekStart: Date;
  events: AdminCalendarEvent[];
}) {
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return d;
  });
  const byDate = useMemo(() => groupByDate(events), [events]);
  const todayIso = localDateInput(new Date());

  return (
    <div className="overflow-hidden">
      <div className="grid grid-cols-7 border-b bg-muted/40">
        {days.map((d) => {
          const isToday = localDateInput(d) === todayIso;
          return (
            <div
              key={localDateInput(d)}
              className={cn(
                "py-2 text-center text-xs font-medium",
                isToday && "bg-primary/10",
              )}
            >
              <div className="text-muted-foreground">{DAY_NAMES[d.getDay()]}</div>
              <div
                className={cn(
                  "mx-auto mt-0.5 flex h-6 w-6 items-center justify-center rounded-full font-semibold",
                  isToday && "bg-primary text-primary-foreground",
                )}
              >
                {d.getDate()}
              </div>
            </div>
          );
        })}
      </div>
      <div className="grid min-h-48 grid-cols-7 divide-x">
        {days.map((d) => (
          <div key={localDateInput(d)} className="space-y-1 p-1">
            {(byDate[localDateInput(d)] ?? []).map((event) => (
              <EventChip key={event.id} event={event} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── main ─────────────────────────────────────────────────────────────────────

export function AdminCalendar() {
  const [viewMode, setViewMode] = useState<"month" | "week">("month");
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [teacher, setTeacher] = useState("");
  const [status, setStatus] = useState<SessionStatus | "">("");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const weekStart = useMemo(() => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() - d.getDay());
    return d;
  }, [currentDate]);

  const range = useMemo(
    () =>
      viewMode === "month" ? monthRange(year, month) : weekRange(currentDate),
    [viewMode, year, month, currentDate],
  );

  const { data: teacherData } = useTeachers();
  const teacherOptions = toList(teacherData).map((t) => ({
    value: t.id,
    label: t.name,
  }));

  const { data, isLoading, isError } = useCalendarSessions({
    ...range,
    teacher,
    status,
  });

  // `?? []` proti render-e notun array banay — memo na korle niche-r useMemo
  // ar child-er grouping proti bar-i abar cholto
  const events = useMemo(() => data?.events ?? [], [data?.events]);

  /** Legend — ei range-e ja ja teacher ache, tader backend-deওয়া rong shoho */
  const legend = useMemo(() => {
    const map = new Map<string, { name: string; color: string }>();
    events.forEach((event) => {
      if (!map.has(event.teacher_id)) {
        map.set(event.teacher_id, {
          name: event.teacher_name,
          color: event.color,
        });
      }
    });
    return [...map.values()];
  }, [events]);

  const goBack = () => {
    const d = new Date(currentDate);
    if (viewMode === "month") d.setMonth(d.getMonth() - 1);
    else d.setDate(d.getDate() - 7);
    setCurrentDate(d);
  };

  const goForward = () => {
    const d = new Date(currentDate);
    if (viewMode === "month") d.setMonth(d.getMonth() + 1);
    else d.setDate(d.getDate() + 7);
    setCurrentDate(d);
  };

  const title =
    viewMode === "month"
      ? `${MONTH_NAMES[month]} ${year}`
      : `Week of ${formatSchoolDate(weekStart.toISOString())}`;

  const filtering = Boolean(teacher || status);

  return (
    <TableCard
      toolbar={
        // Duita row: upore navigation + view toggle, niche filter.
        // Ek row-e dile 6 ta control chepe jeto.
        <div className="w-full space-y-3">
          <div className="flex flex-wrap items-center gap-3">
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

          <div className="flex flex-wrap items-center gap-3">
            <ReusableSelect
              className="w-48 bg-background"
              value={teacher}
              options={teacherOptions}
              placeholder="All teachers"
              onChange={(e) => setTeacher(e.target.value)}
            />
            <ReusableSelect
              className="w-40 bg-background"
              value={status}
              options={STATUS_OPTIONS}
              placeholder="All statuses"
              onChange={(e) => setStatus(e.target.value as SessionStatus | "")}
            />
            {filtering && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setTeacher("");
                  setStatus("");
                }}
              >
                Clear
              </Button>
            )}
          </div>
        </div>
      }
      meta={
        <span className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" />
          Times in {SCHOOL_TIMEZONE_LABEL}
        </span>
      }
      footer={
        legend.length > 0 ? (
          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
            {legend.map((item) => (
              <span key={item.name} className="flex items-center gap-1.5">
                {/* Rong backend-er `event.color` theke — ekhane hisheb kora hoy na,
                    na hole filter korle teacher-er rong bodle jeto */}
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                {item.name}
              </span>
            ))}
          </div>
        ) : undefined
      }
    >
      <AsyncStateWrapper
        loading={isLoading}
        error={isError ? "Failed to load the calendar." : null}
      >
        {viewMode === "month" ? (
          <MonthView year={year} month={month} events={events} />
        ) : (
          <WeekView weekStart={weekStart} events={events} />
        )}
      </AsyncStateWrapper>
    </TableCard>
  );
}
