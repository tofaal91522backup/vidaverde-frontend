"use client";

import { courseFilters, previewCourses } from "../data/marketing.data";
import type { CourseCategory } from "@/features/marketing/types";
import { CourseCard } from "./CourseCard";
import { useState } from "react";

export function CourseFilters() {
  const [active, setActive] = useState<CourseCategory>("all");
  const courses =
    active === "all"
      ? previewCourses
      : previewCourses.filter((course) => course.category === active);

  return (
    <>
      <div className="course-filters">
        {courseFilters.map((filter) => (
          <button
            key={filter.value}
            className={active === filter.value ? "on" : undefined}
            type="button"
            onClick={() => setActive(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>
      <div className="courses-grid">
        {courses.map((course) => (
          <CourseCard key={course.title} course={course} />
        ))}
      </div>
    </>
  );
}
