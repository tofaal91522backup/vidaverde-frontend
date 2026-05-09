"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
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
    <div className="cal-card">
      <div className="cal-head">
        <div className="month">
          {months[view.getMonth()]} {view.getFullYear()}
        </div>
        <div className="nav-btns">
          <button
            type="button"
            aria-label="Previous"
            onClick={() =>
              setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))
            }
          >
            <ChevronLeft aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() =>
              setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))
            }
          >
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="cal-grid">
        {dows.map((dow, index) => (
          <div className="dow" key={`${dow}-${index}`}>
            {dow}
          </div>
        ))}
        {days.map((date, index) => {
          if (!date) return <div className="day empty" key={index} />;
          const isPast = date < today;
          const isMonday = date.getDay() === 1;
          const isSelected =
            selected?.toDateString() === date.toDateString();
          return (
            <button
              key={date.toISOString()}
              type="button"
              disabled={isPast}
              className={[
                "day",
                isPast ? "past" : "avail",
                isMonday ? "has-class" : "",
                isSelected ? "selected" : "",
              ].join(" ")}
              onClick={() => setSelected(date)}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
      <div className="cal-foot">
        <div className="legend">Course start dates</div>
        <div className="mono text-xs text-[var(--vv-muted)]">
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
