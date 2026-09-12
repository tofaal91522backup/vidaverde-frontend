"use client";

import type {
  PublicTeacherSlot,
  PublicTeacherSlotDay,
} from "@/features/marketing/types/public-api.types";
import { cn } from "@/lib/utils";

function formatDayHeading(date: string) {
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;

  return parsed.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

/**
 * Bachai kora teacher-er khali somoy.
 *
 * ⚠️ **Eta nijei kono API dake na.** Age `usePublicTeacherSlots` dakto, kintu
 * `GET /public/packages/:id/teachers/` ekhon proti teacher-er puro `days` list
 * ek-i response-e diye dey — tai abar fetch kora mane ek-i data duibar ana.
 * Date picker ar window control parent-e (booking step 1), karon oigula shudhu
 * slot na, **teacher list-o** bodlay.
 */
export function SlotPicker({
  days,
  timeZone,
  durationMinutes,
  selectedSlot,
  onSelectSlot,
}: {
  days: PublicTeacherSlotDay[];
  timeZone?: string;
  durationMinutes?: number;
  selectedSlot: PublicTeacherSlot | null;
  onSelectSlot: (slot: PublicTeacherSlot) => void;
}) {
  // Backend khali din-o pathay jate week grid-e gap na pore; ekhane list
  // hisebe dekhachchi bole oigula bad.
  const daysWithSlots = days.filter((day) => day.slots.length > 0);

  if (daysWithSlots.length === 0) {
    return (
      <p className="text-[14px] text-vv-ink-2">
        This teacher has no free times left in the window above. Try a later
        start date, a longer window, or another teacher.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {daysWithSlots.map((day) => (
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

      {timeZone && (
        <p className="text-[12px] text-vv-ink-2">
          Times shown in {timeZone}
          {durationMinutes ? ` · ${durationMinutes}-minute lessons` : ""}
        </p>
      )}
    </div>
  );
}
