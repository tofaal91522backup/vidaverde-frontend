"use client";

import { usePublicTeacherSlots } from "@/features/marketing/pages/book/queries/use-public-teacher-slots";
import type { PublicTeacherSlot } from "@/features/marketing/types/public-api.types";
import { cn } from "@/lib/utils";

/** Aj-ker date local part theke — `toISOString()` UTC dey, tate ek din agiye jete pare. */
function todayInput() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

function formatDayHeading(date: string) {
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;

  return parsed.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export function SlotPicker({
  teacherId,
  timeZone,
  date,
  onDateChange,
  selectedSlot,
  onSelectSlot,
}: {
  teacherId: string | null;
  timeZone: string;
  date: string;
  onDateChange: (date: string) => void;
  selectedSlot: PublicTeacherSlot | null;
  onSelectSlot: (slot: PublicTeacherSlot) => void;
}) {
  const { data, isLoading, isError } = usePublicTeacherSlots({
    teacherId,
    date,
    tz: timeZone,
  });

  const days = (data?.days ?? []).filter((day) => day.slots.length > 0);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="book-date"
          className="text-[12px] font-medium uppercase tracking-wide text-vv-ink-2"
        >
          Show availability from
        </label>
        <input
          id="book-date"
          type="date"
          value={date}
          min={todayInput()}
          onChange={(e) => onDateChange(e.target.value)}
          className="rounded-lg border border-vv-line bg-vv-bg-warm px-4 py-3 text-[15px] text-vv-ink outline-none focus:border-vv-accent"
        />
      </div>

      {isLoading ? (
        <p className="text-[14px] text-vv-ink-2" role="status">
          Loading available times…
        </p>
      ) : isError ? (
        <p className="text-[14px] text-red-600" role="alert">
          We could not load this teacher&apos;s availability. Please try again
          shortly.
        </p>
      ) : days.length === 0 ? (
        <p className="text-[14px] text-vv-ink-2">
          No free times in the 7 days from this date. Try a later date or another
          teacher.
        </p>
      ) : (
        <div className="flex flex-col gap-5">
          {days.map((day) => (
            <div key={day.date} className="flex flex-col gap-2">
              <h3 className="text-[13px] font-semibold text-vv-ink">
                {formatDayHeading(day.date)}
              </h3>
              <div className="flex flex-wrap gap-2">
                {day.slots.map((slot) => (
                  <button
                    key={slot.start_utc}
                    type="button"
                    aria-pressed={selectedSlot?.start_utc === slot.start_utc}
                    // `start_utc` hubohu rakha hoy — checkout-e eta-i jabe
                    onClick={() => onSelectSlot(slot)}
                    className={cn(
                      "rounded-lg border px-4 py-2 text-[14px] transition",
                      selectedSlot?.start_utc === slot.start_utc
                        ? "border-vv-accent bg-vv-accent/10 font-medium text-vv-ink"
                        : "border-vv-line text-vv-ink-2 hover:border-vv-ink",
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

      {data?.timezone && (
        <p className="text-[12px] text-vv-ink-2">
          Times shown in {data.timezone} · {data.duration_minutes}-minute lessons
        </p>
      )}
    </div>
  );
}
