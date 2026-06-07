"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const dows = ["M", "T", "W", "T", "F", "S", "S"];
const today = new Date(2026, 4, 6);

export function BookingCalendar() {
  const [view, setView] = useState(new Date(2026, 5, 1));
  const [selected, setSelected] = useState<Date | null>(null);

  const days = useMemo(() => {
    const first = new Date(view.getFullYear(), view.getMonth(), 1);
    const startDow = (first.getDay() + 6) % 7;
    const daysInMonth = new Date(
      view.getFullYear(),
      view.getMonth() + 1,
      0,
    ).getDate();
    return [
      ...Array.from({ length: startDow }, () => null),
      ...Array.from(
        { length: daysInMonth },
        (_, index) => new Date(view.getFullYear(), view.getMonth(), index + 1),
      ),
    ];
  }, [view]);

  return (
    <div className="rounded-2xl border border-vv-line bg-vv-bg p-6 max-w-sm w-full max-[640px]:p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="text-[16px] font-semibold tracking-[-0.01em]">
          {months[view.getMonth()]} {view.getFullYear()}
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Previous month"
            className="grid h-8 w-8 place-items-center rounded-lg border border-vv-line bg-vv-bg-warm transition hover:bg-vv-ink hover:border-vv-ink hover:text-vv-bg cursor-pointer"
            onClick={() =>
              setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))
            }
          >
            <ChevronLeft aria-hidden="true" className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next month"
            className="grid h-8 w-8 place-items-center rounded-lg border border-vv-line bg-vv-bg-warm transition hover:bg-vv-ink hover:border-vv-ink hover:text-vv-bg cursor-pointer"
            onClick={() =>
              setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))
            }
          >
            <ChevronRight aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {dows.map((dow, index) => (
          <div
            key={`${dow}-${index}`}
            className="grid h-8 w-full place-items-center font-code text-[11px] font-semibold tracking-[0.06em] text-vv-muted uppercase"
          >
            {dow}
          </div>
        ))}
        {days.map((date, index) => {
          if (!date)
            return <div key={index} className="h-8 w-full" />;

          const isPast = date < today;
          const isMonday = date.getDay() === 1;
          const isSelected = selected?.toDateString() === date.toDateString();

          return (
            <button
              key={date.toISOString()}
              type="button"
              disabled={isPast}
              className={cn(
                "grid h-8 w-full place-items-center rounded-lg text-[13px] font-medium transition duration-150 cursor-pointer",
                isPast && "text-vv-muted/40 cursor-not-allowed",
                !isPast && !isSelected && "text-vv-ink hover:bg-vv-bg-warm",
                isMonday && !isPast && !isSelected && "font-bold text-vv-accent-deep ring-1 ring-vv-accent",
                isSelected && "bg-vv-ink text-vv-bg ring-0",
              )}
              onClick={() => setSelected(date)}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between border-t border-vv-line pt-4">
        <div className="flex items-center gap-1.5 text-[12px] text-vv-muted">
          <span className="inline-block h-2 w-2 rounded-sm ring-1 ring-vv-accent" />
          Course start dates
        </div>
        <div className="font-code text-[12px] text-vv-muted">
          {selected
            ? selected.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "Pick a date"}
        </div>
      </div>
    </div>
  );
}
