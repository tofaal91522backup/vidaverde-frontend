"use client";

import { activities, activityTabs } from "../data/marketing.data";
import type { ActivityCategory } from "@/features/marketing/types";
import { ActivityCard } from "./ActivityCard";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function ActivityTabs() {
  const [active, setActive] = useState<ActivityCategory>("all");
  const visible =
    active === "all"
      ? activities
      : activities.filter((activity) => activity.categories.includes(active));

  return (
    <>
      <div className="flex flex-wrap gap-2 mt-8 mb-8">
        {activityTabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            className={cn(
              "rounded-full border px-4 py-2 text-[13px] font-semibold tracking-[-0.005em] transition-[background,color,border-color] duration-150 cursor-pointer",
              active === tab.value
                ? "bg-vv-ink border-vv-ink text-vv-bg"
                : "border-vv-line-2 bg-transparent text-vv-ink-2 hover:border-vv-ink hover:text-vv-ink",
            )}
            onClick={() => setActive(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-5 max-[640px]:grid-cols-1">
        {visible.map((activity) => (
          <ActivityCard key={activity.title} activity={activity} />
        ))}
      </div>
    </>
  );
}
