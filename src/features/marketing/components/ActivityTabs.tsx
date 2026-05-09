"use client";

import { activities, activityTabs } from "../data/marketing.data";
import type { ActivityCategory } from "../types";
import { ActivityCard } from "./ActivityCard";
import { useState } from "react";

export function ActivityTabs() {
  const [active, setActive] = useState<ActivityCategory>("all");
  const visible =
    active === "all"
      ? activities
      : activities.filter((activity) => activity.categories.includes(active));

  return (
    <>
      <div className="tabs">
        {activityTabs.map((tab) => (
          <button
            className={active === tab.value ? "tab on" : "tab"}
            key={tab.value}
            type="button"
            onClick={() => setActive(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="act-grid">
        {visible.map((activity) => (
          <ActivityCard key={activity.title} activity={activity} />
        ))}
      </div>
    </>
  );
}
