"use client";

import { AppDialog } from "@/components/shared/app-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { CustomerSession, useCustomerSessions } from "../queries/use-customer-sessions";

// ── helpers ──────────────────────────────────────────────────────────────────

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAY_NAMES = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function formatIso(d: Date) {
  return d.toISOString().slice(0, 10);
}
function getMonthRange(year: number, month: number) {
  return {
    startDate: formatIso(new Date(year, month, 1)),
    endDate: formatIso(new Date(year, month + 1, 0)),
  };
}
function getWeekRange(date: Date) {
  const d = new Date(date);
  d.setDate(d.getDate() - d.getDay());
  const start = new Date(d);
  d.setDate(d.getDate() + 6);
  return { startDate: formatIso(start), endDate: formatIso(d) };
}

function toLocalTime(dateStr: string, timeUtc: string, tz: string): string {
  try {
    const dt = new Date(`${dateStr}T${timeUtc}:00Z`);
    return dt.toLocaleTimeString("en-US", {
      timeZone: tz,
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return timeUtc;
  }
}

const STATUS_VARIANTS: Record<
  CustomerSession["status"],
  "default" | "secondary" | "destructive" | "outline"
> = {
  upcoming: "default",
  completed: "outline",
  "no-show": "destructive",
  rescheduled: "secondary",
};

const STATUS_COLORS: Record<CustomerSession["status"], string> = {
  upcoming: "bg-green-600",
  completed: "bg-muted-foreground/60",
  "no-show": "bg-red-500",
  rescheduled: "bg-amber-500",
};

// ── session dot + popup ───────────────────────────────────────────────────────

function SessionDot({
  session,
  tz,
}: {
  session: CustomerSession;
  tz: string;
}) {
  const [open, setOpen] = useState(false);
  const localTime = toLocalTime(session.date, session.timeUtc, tz);
  const color = STATUS_COLORS[session.status];

  return (
    <AppDialog
      open={open}
      onOpenChange={setOpen}
      size="sm"
      trigger={
        <button
          className={cn(
            "w-full truncate rounded px-1 py-0.5 text-left text-[10px] text-white leading-tight",
            color,
          )}
          title={`${session.teacher.name} at ${localTime}`}
        >
          {localTime} {session.teacher.name}
        </button>
      }
      title="Session Details"
    >
      <div className="space-y-4 py-2 text-sm">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-muted-foreground">Teacher</p>
            <p className="font-semibold">{session.teacher.name}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Status</p>
            <Badge variant={STATUS_VARIANTS[session.status]} className="capitalize mt-0.5 text-xs">
              {session.status.replace("-", " ")}
            </Badge>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Date</p>
            <p className="font-medium">
              {new Date(session.date).toLocaleDateString("en-US", {
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
            <p className="font-medium">{session.duration} min</p>
          </div>
          {session.package && (
            <div>
              <p className="text-xs text-muted-foreground">Package</p>
              <p className="font-medium">{session.package}</p>
            </div>
          )}
        </div>

        {session.meetingLink && session.status === "upcoming" && (
          <a
            href={session.meetingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700 hover:bg-green-100 transition-colors dark:border-green-900 dark:bg-green-950 dark:text-green-300"
          >
            <ExternalLink className="h-4 w-4 shrink-0" />
            Join on Google Meet
          </a>
        )}
      </div>
    </AppDialog>
  );
}

// ── month view ────────────────────────────────────────────────────────────────

function MonthView({
  year,
  month,
  sessions,
  tz,
}: {
  year: number;
  month: number;
  sessions: CustomerSession[];
  tz: string;
}) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const byDate = useMemo(() => {
    const map: Record<string, CustomerSession[]> = {};
    sessions.forEach((s) => {
      if (!map[s.date]) map[s.date] = [];
      map[s.date].push(s);
    });
    return map;
  }, [sessions]);

  return (
    <div className="rounded-lg border overflow-hidden">
      <div className="grid grid-cols-7 bg-muted text-xs font-medium">
        {DAY_NAMES.map((d) => (
          <div key={d} className="py-2 text-center text-muted-foreground">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 divide-x divide-y border-t">
        {cells.map((day, i) => {
          if (day === null) return <div key={`e${i}`} className="min-h-24 bg-muted/30" />;
          const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const daySessions = byDate[dateStr] ?? [];
          const isToday = dateStr === formatIso(new Date());
          return (
            <div key={day} className="min-h-24 p-1">
              <span className={cn("inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium", isToday && "bg-primary text-primary-foreground")}>
                {day}
              </span>
              <div className="mt-0.5 space-y-0.5 overflow-hidden max-h-16">
                {daySessions.slice(0, 3).map((s) => (
                  <SessionDot key={s.id} session={s} tz={tz} />
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
  tz,
}: {
  weekStart: Date;
  sessions: CustomerSession[];
  tz: string;
}) {
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return d;
  });
  const byDate = useMemo(() => {
    const map: Record<string, CustomerSession[]> = {};
    sessions.forEach((s) => { if (!map[s.date]) map[s.date] = []; map[s.date].push(s); });
    return map;
  }, [sessions]);

  return (
    <div className="rounded-lg border overflow-hidden">
      <div className="grid grid-cols-7 border-b bg-muted">
        {days.map((d) => {
          const isToday = formatIso(d) === formatIso(new Date());
          return (
            <div key={formatIso(d)} className={cn("py-2 text-center text-xs font-medium", isToday && "bg-primary/10")}>
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
          const dateStr = formatIso(d);
          return (
            <div key={dateStr} className="p-1 space-y-1">
              {(byDate[dateStr] ?? []).map((s) => (
                <SessionDot key={s.id} session={s} tz={tz} />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── main component ─────────────────────────────────────────────────────────────

export function CustomerCalendar() {
  const today = new Date();
  const [viewMode, setViewMode] = useState<"month" | "week">("month");
  const [currentDate, setCurrentDate] = useState(today);

  const tz = useMemo(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone,
    [],
  );

  const { year, month } = { year: currentDate.getFullYear(), month: currentDate.getMonth() };

  const dateRange = useMemo(
    () =>
      viewMode === "month"
        ? getMonthRange(year, month)
        : getWeekRange(currentDate),
    [viewMode, year, month, currentDate],
  );

  const { data: sessions = [], isLoading } = useCustomerSessions(dateRange);

  const weekStart = useMemo(() => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() - d.getDay());
    return d;
  }, [currentDate]);

  const goBack = () => {
    const d = new Date(currentDate);
    viewMode === "month" ? d.setMonth(d.getMonth() - 1) : d.setDate(d.getDate() - 7);
    setCurrentDate(d);
  };
  const goForward = () => {
    const d = new Date(currentDate);
    viewMode === "month" ? d.setMonth(d.getMonth() + 1) : d.setDate(d.getDate() + 7);
    setCurrentDate(d);
  };

  const title =
    viewMode === "month"
      ? `${MONTH_NAMES[month]} ${year}`
      : `Week of ${weekStart.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" onClick={goBack}><ChevronLeft className="h-4 w-4" /></Button>
          <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>Today</Button>
          <Button variant="outline" size="icon" onClick={goForward}><ChevronRight className="h-4 w-4" /></Button>
        </div>

        <span className="font-semibold text-base flex-1">{title}</span>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          <span>Times in <strong>{tz}</strong></span>
        </div>

        <div className="flex rounded-md border overflow-hidden">
          <Button variant={viewMode === "month" ? "default" : "ghost"} size="sm" className="rounded-none gap-1" onClick={() => setViewMode("month")}>
            <LayoutGrid className="h-3.5 w-3.5" /> Month
          </Button>
          <Button variant={viewMode === "week" ? "default" : "ghost"} size="sm" className="rounded-none gap-1 border-l" onClick={() => setViewMode("week")}>
            <Calendar className="h-3.5 w-3.5" /> Week
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
        {(["upcoming","completed","rescheduled","no-show"] as const).map((s) => (
          <span key={s} className="flex items-center gap-1.5 capitalize">
            <span className={cn("h-2.5 w-2.5 rounded-full", STATUS_COLORS[s])} />
            {s.replace("-", " ")}
          </span>
        ))}
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center text-muted-foreground text-sm">Loading sessions...</div>
      ) : viewMode === "month" ? (
        <MonthView year={year} month={month} sessions={sessions} tz={tz} />
      ) : (
        <WeekView weekStart={weekStart} sessions={sessions} tz={tz} />
      )}
    </div>
  );
}
