"use client";

import type { PublicTeacherSlotDay } from "@/features/marketing/types/public-api.types";
import { formatLocalDate } from "@/features/protected/pages/dashboard/student/utils/format-local-datetime";
import { cn } from "@/lib/utils";

/**
 * Bachai kora teacher-er khali somoy.
 *
 * ⚠️ **Eta nijei kono API dake na.** Age `useTeacherSlots` dakto, kintu
 * `GET /public/packages/:id/teachers/` (teacher step) proti teacher-er puro
 * `days` list ek-i response-e diye dey — abar fetch kora mane ek-i data duibar.
 * Date picker teacher step-e chole geche, karon oita teacher list-o bodlay.
 */
export function StepSlot({
  days,
  timezone,
  durationMinutes,
  selectedSlot,
  onSelect,
}: {
  days: PublicTeacherSlotDay[];
  timezone?: string;
  durationMinutes?: number;
  selectedSlot: string | null;
  onSelect: (startUtc: string) => void;
}) {
  // Backend khali din-o pathay jate week grid-e gap na pore; list-e oigula bad.
  const daysWithSlots = days.filter((day) => day.slots.length > 0);

  if (daysWithSlots.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        This teacher has no free slots left in the window you chose. Go back and
        try a later date, or pick another teacher.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {daysWithSlots.map((day) => (
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

      {timezone && (
        <p className="text-xs text-muted-foreground">
          Times shown in {timezone}
          {durationMinutes ? ` · ${durationMinutes} min lessons` : ""}
        </p>
      )}
    </div>
  );
}
