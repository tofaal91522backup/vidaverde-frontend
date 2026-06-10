"use client";

import { cn } from "@/lib/utils";

const DAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const TIME_SLOTS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

interface WeeklyScheduleGridProps {
  value: Record<string, string[]>;
  onChange: (schedule: Record<string, string[]>) => void;
}

export function WeeklyScheduleGrid({ value, onChange }: WeeklyScheduleGridProps) {
  const toggle = (day: string, time: string) => {
    const current = value[day] ?? [];
    const isActive = current.includes(time);
    const next = isActive
      ? current.filter((t) => t !== time)
      : [...current, time].sort();
    onChange({ ...value, [day]: next });
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm border-separate border-spacing-0.5">
        <thead>
          <tr>
            <th className="text-left py-1 pr-4 text-xs font-medium text-muted-foreground w-12">
              Day
            </th>
            {TIME_SLOTS.map((t) => (
              <th
                key={t}
                className="text-center py-1 px-0.5 text-xs font-medium text-muted-foreground min-w-[40px]"
              >
                {t}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {DAYS.map((day, i) => (
            <tr key={day}>
              <td className="py-0.5 pr-4 text-xs font-medium">{DAY_LABELS[i]}</td>
              {TIME_SLOTS.map((time) => {
                const isActive = (value[day] ?? []).includes(time);
                return (
                  <td key={time} className="py-0.5 text-center">
                    <button
                      type="button"
                      onClick={() => toggle(day, time)}
                      className={cn(
                        "w-9 h-8 rounded text-xs font-medium transition-colors",
                        isActive
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : "bg-muted text-muted-foreground hover:bg-muted/70",
                      )}
                      title={`${DAY_LABELS[i]} ${time}${isActive ? " (available)" : ""}`}
                    >
                      {isActive ? "✓" : ""}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs text-muted-foreground mt-2">
        Click cells to toggle availability. Green = available.
      </p>
    </div>
  );
}
