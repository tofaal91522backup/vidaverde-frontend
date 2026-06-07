"use client";

import { courseFilters, previewCourses } from "../data/marketing.data";
import type { CourseCategory } from "@/features/marketing/types";
import { CourseCard } from "./CourseCard";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function CourseFilters() {
  const [active, setActive] = useState<CourseCategory>("all");
  const courses =
    active === "all"
      ? previewCourses
      : previewCourses.filter((course) => course.category === active);

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-8">
        {courseFilters.map((filter) => (
          <button
            key={filter.value}
            className={cn(
              "rounded-full border px-4 py-2 text-[13px] font-semibold tracking-[-0.005em] transition-[background,color,border-color] duration-150 cursor-pointer",
              active === filter.value
                ? "bg-vv-ink border-vv-ink text-vv-bg"
                : "border-vv-line-2 bg-transparent text-vv-ink-2 hover:border-vv-ink hover:text-vv-ink",
            )}
            type="button"
            onClick={() => setActive(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.title} course={course} />
        ))}
      </div>
    </>
  );
}
