"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

/**
 * Month grid-er ekta ghor. Admin ar student duita calendar-e ek-i.
 *
 * Age ei list-ta `max-h-16 overflow-hidden` chhilo ar tinta item render korto —
 * kintu tinta chip + "+N more" line mile 64px cheye lomba, tai **tin number
 * ta adha kata jeto** ar "+N more" kokhono dekha-i jeto na. Din-e tinter beshi
 * class thakle bakigula porjonto pouchhanor kono rasta chhilo na.
 *
 * Ekhon collapsed obosthay tinta dekhay (min-h-24 er bhitore mane), ar "+N more"
 * ekta button — tap korle oi ghor-ta boro hoye baki gula dekhay. Scroll na,
 * karon 64px-er ghor-e lukono scrollbar keu khuje pay na.
 */
export function MonthDayCell<T>({
  day,
  isToday,
  items,
  renderItem,
  collapsedCount = 3,
}: {
  day: number;
  isToday: boolean;
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  collapsedCount?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const hidden = items.length - collapsedCount;
  const visible = expanded ? items : items.slice(0, collapsedCount);

  return (
    <div className="min-h-24 p-1">
      <span
        className={cn(
          "inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium",
          isToday && "bg-primary text-primary-foreground",
        )}
      >
        {day}
      </span>

      <div className="mt-0.5 space-y-0.5">
        {visible.map((item) => renderItem(item))}

        {hidden > 0 && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="w-full rounded px-1 py-0.5 text-left text-[10px] font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            {expanded ? "Show less" : `+${hidden} more`}
          </button>
        )}
      </div>
    </div>
  );
}
