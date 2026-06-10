"use client";

import { AppDialog } from "@/components/shared/app-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  LayoutGrid,
} from "lucide-react";
import { useState, useMemo } from "react";
import {
  CalendarSession,
  useCalendarSessions,
} from "../queries/use-calendar-sessions";

const TEACHER_COLORS = [
  "bg-blue-500",
  "bg-purple-500",
  "bg-green-600",
  "bg-orange-500",
  "bg-pink-500",
  "bg-cyan-500",
  "bg-yellow-600",
  "bg-red-500",
];

const STATUS_VARIANTS: Record<
  CalendarSession["status"],
  "default" | "secondary" | "destructive" | "outline"
> = {
  upcoming: "default",
  completed: "outline",
  "no-show": "destructive",
  rescheduled: "secondary",
};

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAY_NAMES = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function formatIso(date: Date) {
  return date.toISOString().slice(0, 10);
}

function getMonthRange(year: number, month: number) {
  const start = new Date(year, month, 1);
  const end = new Date(year, month + 1, 0);
  return {
    startDate: formatIso(start),
    endDate: formatIso(end),
  };
}

function getWeekRange(date: Date) {
  const d = new Date(date);
  const day = d.getDay();
  d.setDate(d.getDate() - day);
  const start = new Date(d);
  d.setDate(d.getDate() + 6);
  const end = new Date(d);
  return { startDate: formatIso(start), endDate: formatIso(end) };
}

interface SessionDotProps {
  session: CalendarSession;
  color: string;
}

function SessionDot({ session, color }: SessionDotProps) {
  const [open, setOpen] = useState(false);
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
          title={`${session.student.name} with ${session.teacher.name} at ${session.time}`}
        >
          {session.time} {session.student.name}
        </button>
      }
      title="Session Details"
    >
      <div className="space-y-3 py-2 text-sm">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-xs text-muted-foreground">Student</p>
            <p className="font-medium">{session.student.name}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Teacher</p>
            <p className="font-medium">{session.teacher.name}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Date</p>
            <p className="font-medium">{session.date}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Time</p>
            <p className="font-medium">{session.time}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Duration</p>
            <p className="font-medium">{session.duration} min</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Status</p>
            <Badge variant={STATUS_VARIANTS[session.status]} className="capitalize mt-0.5 text-xs">
              {session.status.replace("-", " ")}
            </Badge>
          </div>
        </div>
        {session.package && (
          <div>
            <p className="text-xs text-muted-foreground">Package</p>
            <p className="font-medium">{session.package}</p>
          </div>
        )}
      </div>
    </AppDialog>
  );
}

interface MonthViewProps {
  year: number;
  month: number;
  sessions: CalendarSession[];
  teacherColorMap: Record<string, string>;
}

function MonthView({ year, month, sessions, teacherColorMap }: MonthViewProps) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const sessionsByDate = useMemo(() => {
    const map: Record<string, CalendarSession[]> = {};
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
          <div key={d} className="py-2 text-center text-muted-foreground">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 divide-x divide-y border-t">
        {cells.map((day, i) => {
          if (day === null) {
            return <div key={`empty-${i}`} className="min-h-24 bg-muted/30" />;
          }
          const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const daySessions = sessionsByDate[dateStr] ?? [];
          const isToday = dateStr === formatIso(new Date());

          return (
            <div key={day} className="min-h-24 p-1 relative">
              <span
                className={cn(
                  "inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium",
                  isToday && "bg-primary text-primary-foreground",
                )}
              >
                {day}
              </span>
              <div className="mt-0.5 space-y-0.5 overflow-hidden max-h-16">
                {daySessions.slice(0, 3).map((s) => (
                  <SessionDot
                    key={s.id}
                    session={s}
                    color={teacherColorMap[s.teacher.id] ?? TEACHER_COLORS[0]}
                  />
                ))}
                {daySessions.length > 3 && (
                  <p className="text-[10px] text-muted-foreground pl-1">
                    +{daySessions.length - 3} more
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

interface WeekViewProps {
  weekStart: Date;
  sessions: CalendarSession[];
  teacherColorMap: Record<string, string>;
}

function WeekView({ weekStart, sessions, teacherColorMap }: WeekViewProps) {
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return d;
  });

  const sessionsByDate = useMemo(() => {
    const map: Record<string, CalendarSession[]> = {};
    sessions.forEach((s) => {
      if (!map[s.date]) map[s.date] = [];
      map[s.date].push(s);
    });
    return map;
  }, [sessions]);

  return (
    <div className="rounded-lg border overflow-hidden">
      <div className="grid grid-cols-7 border-b bg-muted">
        {days.map((d) => {
          const isToday = formatIso(d) === formatIso(new Date());
          return (
            <div
              key={formatIso(d)}
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
      <div className="grid grid-cols-7 divide-x min-h-48">
        {days.map((d) => {
          const dateStr = formatIso(d);
          const daySessions = sessionsByDate[dateStr] ?? [];
          return (
            <div key={dateStr} className="p-1 space-y-1">
              {daySessions.map((s) => (
                <SessionDot
                  key={s.id}
                  session={s}
                  color={teacherColorMap[s.teacher.id] ?? TEACHER_COLORS[0]}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function AdminCalendar() {
  const today = new Date();
  const [viewMode, setViewMode] = useState<"month" | "week">("month");
  const [currentDate, setCurrentDate] = useState(today);
  const [teacherFilter, setTeacherFilter] = useState("");

  const { year, month } = {
    year: currentDate.getFullYear(),
    month: currentDate.getMonth(),
  };

  const dateRange = useMemo(
    () =>
      viewMode === "month"
        ? getMonthRange(year, month)
        : getWeekRange(currentDate),
    [viewMode, year, month, currentDate],
  );

  const { data: sessions = [], isLoading } = useCalendarSessions({
    ...dateRange,
    teacher: teacherFilter || undefined,
  });

  const teacherColorMap = useMemo(() => {
    const map: Record<string, string> = {};
    let idx = 0;
    sessions.forEach((s) => {
      if (!map[s.teacher.id]) {
        map[s.teacher.id] = TEACHER_COLORS[idx % TEACHER_COLORS.length];
        idx++;
      }
    });
    return map;
  }, [sessions]);

  const uniqueTeachers = useMemo(() => {
    const seen = new Set<string>();
    return sessions
      .filter((s) => {
        if (seen.has(s.teacher.id)) return false;
        seen.add(s.teacher.id);
        return true;
      })
      .map((s) => s.teacher);
  }, [sessions]);

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

  const goToday = () => setCurrentDate(new Date());

  const weekStart = useMemo(() => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() - d.getDay());
    return d;
  }, [currentDate]);

  const title =
    viewMode === "month"
      ? `${MONTH_NAMES[month]} ${year}`
      : `Week of ${weekStart.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" onClick={goBack}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={goToday}>Today</Button>
          <Button variant="outline" size="icon" onClick={goForward}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <span className="font-semibold text-base flex-1">{title}</span>

        {uniqueTeachers.length > 0 && (
          <Select
            value={teacherFilter || "all"}
            onValueChange={(v) => setTeacherFilter(v === "all" ? "" : v)}
          >
            <SelectTrigger className="w-44">
              <SelectValue placeholder="All Teachers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Teachers</SelectItem>
              {uniqueTeachers.map((t) => (
                <SelectItem key={t.id} value={t.id}>
                  <span className="flex items-center gap-2">
                    <span
                      className={cn(
                        "inline-block h-2.5 w-2.5 rounded-full",
                        teacherColorMap[t.id],
                      )}
                    />
                    {t.name}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <div className="flex rounded-md border overflow-hidden">
          <Button
            variant={viewMode === "month" ? "default" : "ghost"}
            size="sm"
            className="rounded-none gap-1"
            onClick={() => setViewMode("month")}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            Month
          </Button>
          <Button
            variant={viewMode === "week" ? "default" : "ghost"}
            size="sm"
            className="rounded-none gap-1 border-l"
            onClick={() => setViewMode("week")}
          >
            <Calendar className="h-3.5 w-3.5" />
            Week
          </Button>
        </div>
      </div>

      {/* Legend */}
      {uniqueTeachers.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {uniqueTeachers.map((t) => (
            <span key={t.id} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className={cn("h-2.5 w-2.5 rounded-full", teacherColorMap[t.id])} />
              {t.name}
            </span>
          ))}
        </div>
      )}

      {/* Calendar */}
      {isLoading ? (
        <div className="flex h-64 items-center justify-center text-muted-foreground text-sm">
          Loading sessions...
        </div>
      ) : viewMode === "month" ? (
        <MonthView
          year={year}
          month={month}
          sessions={sessions}
          teacherColorMap={teacherColorMap}
        />
      ) : (
        <WeekView
          weekStart={weekStart}
          sessions={sessions}
          teacherColorMap={teacherColorMap}
        />
      )}
    </div>
  );
}
