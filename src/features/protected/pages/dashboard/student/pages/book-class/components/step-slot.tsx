"use client";

import AsyncStateWrapper from "@/components/shared/async-state-wrapper";
import { Input } from "@/components/ui/input";
import { useTeacherSlots } from "@/features/protected/pages/dashboard/student/queries/use-teacher-slots";
import { formatLocalDate } from "@/features/protected/pages/dashboard/student/utils/format-local-datetime";
import { cn } from "@/lib/utils";
import { useState } from "react";

/** Aj-ker date, local part theke (toISOString UTC dey bole ta use kora hoy na) */
function todayIso() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

export function StepSlot({
  teacherId,
  timezone,
  selectedSlot,
  onSelect,
}: {
  teacherId: string;
  timezone: string;
  selectedSlot: string | null;
  onSelect: (startUtc: string) => void;
}) {
  const [fromDate, setFromDate] = useState(todayIso);

  const { data, isLoading, isError } = useTeacherSlots({
    teacherId,
    date: fromDate,
    tz: timezone || undefined,
    days: 7,
  });

  const days = (data?.days ?? []).filter((day) => day.slots.length > 0);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="book-from-date"
          className="text-xs font-medium uppercase tracking-wide text-muted-foreground"
        >
          Show availability from
        </label>
        <Input
          id="book-from-date"
          type="date"
          className="max-w-xs"
          value={fromDate}
          min={todayIso()}
          onChange={(e) => setFromDate(e.target.value)}
        />
      </div>

      <AsyncStateWrapper
        loading={isLoading}
        error={isError ? "Could not load available times." : null}
      >
        {days.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No free slots in the 7 days from this date. Try a later date.
          </p>
        ) : (
          <div className="space-y-4">
            {days.map((day) => (
              <div key={day.date}>
                <p className="mb-1.5 text-xs font-medium text-muted-foreground">
                  {formatLocalDate(day.date)}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {day.slots.map((slot) => (
                    <button
                      key={slot.start_utc}
                      type="button"
                      // `start_utc` hubohu rakha hoy — backend eta re-validate kore
                      onClick={() => onSelect(slot.start_utc)}
                      className={cn(
                        "rounded-md border px-3 py-1.5 text-xs transition",
                        selectedSlot === slot.start_utc
                          ? "border-primary bg-primary/10 font-medium"
                          : "hover:border-foreground/40",
                      )}
                    >
                      {slot.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </AsyncStateWrapper>

      {data?.timezone && (
        <p className="text-xs text-muted-foreground">
          Times shown in {data.timezone} · {data.duration_minutes} min lessons
        </p>
      )}
    </div>
  );
}
