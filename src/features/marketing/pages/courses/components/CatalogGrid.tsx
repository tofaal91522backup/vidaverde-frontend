"use client";

import { catalogCourses } from "../data/marketing.data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useMemo, useState } from "react";

const levels = [
  ["A1", "A1 · Beginner"],
  ["A2", "A2 · Elementary"],
  ["B1", "B1 · Intermediate"],
  ["B2", "B2 · Upper-int."],
  ["C1", "C1 · Advanced"],
] as const;

const focus = [
  ["general", "Classes in Quito"],
  ["business", "Travelling classroom"],
] as const;

const formats = [
  ["private", "One-on-one"],
  ["group", "Small group"],
  ["online", "Online"],
] as const;

type Filters = {
  level: string[];
  focus: string[];
  format: string[];
};

export function CatalogGrid() {
  const [filters, setFilters] = useState<Filters>({
    level: [],
    focus: [],
    format: [],
  });

  const toggle = (group: keyof Filters, value: string) => {
    setFilters((current) => ({
      ...current,
      [group]: current[group].includes(value)
        ? current[group].filter((item) => item !== value)
        : [...current[group], value],
    }));
  };

  const courses = useMemo(
    () =>
      catalogCourses.filter((course) => {
        const levelOk =
          filters.level.length === 0 ||
          filters.level.some((level) => course.levels.includes(level));
        const focusOk =
          filters.focus.length === 0 ||
          filters.focus.some((item) => course.focus.includes(item));
        const formatOk =
          filters.format.length === 0 ||
          filters.format.some((item) => course.formats.includes(item));
        return levelOk && focusOk && formatOk;
      }),
    [filters],
  );

  return (
    <div className="flex gap-8 items-start max-[900px]:flex-col">
      {/* Filter sidebar */}
      <aside className="w-52 shrink-0 flex flex-col gap-6 max-[900px]:w-full max-[900px]:flex-row max-[900px]:flex-wrap max-[900px]:gap-4">
        <FilterGroup
          title="Level"
          group="level"
          options={levels}
          values={filters.level}
          onToggle={toggle}
        />
        <FilterGroup
          title="Focus"
          group="focus"
          options={focus}
          values={filters.focus}
          onToggle={toggle}
        />
        <FilterGroup
          title="Format"
          group="format"
          options={formats}
          values={filters.format}
          onToggle={toggle}
        />
        <div className="flex flex-col gap-2">
          <h4 className="text-[11px] font-semibold uppercase tracking-widest text-vv-ink m-0">
            Weekly hours
          </h4>
          <div className="flex flex-col gap-1">
            <input
              type="range"
              min="10"
              max="40"
              defaultValue="40"
              step="5"
              className="accent-vv-accent w-full"
            />
            <div className="flex justify-between text-[11px] font-code text-vv-muted">
              <span>10 hrs</span>
              <span>40 hrs</span>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        {/* Results header */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-[13px] text-vv-ink-2">
            Showing <span className="font-semibold text-vv-ink">{courses.length}</span> of{" "}
            {catalogCourses.length} courses
          </div>
          <label className="flex items-center gap-2 text-[13px]">
            <span className="text-vv-ink-2">Sort by</span>
            <select
              defaultValue="popular"
              className="rounded-lg border border-vv-line bg-vv-bg px-3 py-1.5 text-[13px] text-vv-ink outline-none focus:border-vv-accent"
            >
              <option value="popular">Most popular</option>
              <option value="price">Price: low to high</option>
              <option value="duration">Duration</option>
              <option value="difficulty">Difficulty</option>
            </select>
          </label>
        </div>

        {/* Course grid */}
        <div className="grid gap-5 sm:grid-cols-2">
          {courses.map((course) => (
            <article
              key={course.title}
              className={cn(
                "relative flex flex-col gap-4 rounded-2xl border p-6 transition-[border-color,box-shadow] duration-200 hover:border-vv-accent",
                course.featured
                  ? "border-vv-accent bg-vv-bg shadow-[0_0_0_3px_rgba(163,214,53,0.12)]"
                  : "border-vv-line bg-vv-bg",
              )}
            >
              {course.featured ? (
                <span className="absolute -top-3 left-4 rounded-full bg-vv-accent px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-vv-accent-deep">
                  Most popular
                </span>
              ) : null}
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-vv-ink px-2.5 py-0.5 text-[11px] font-semibold text-vv-bg">
                  {course.levelLabel}
                </span>
                <span className="font-code text-[11px] text-vv-muted uppercase tracking-widest">
                  {course.focusLabel}
                </span>
              </div>
              <h3 className="text-[20px] font-semibold tracking-[-0.02em] leading-tight text-vv-ink m-0">
                {course.title}
              </h3>
              <p className="text-[14px] leading-[1.6] text-vv-ink-2 flex-1 m-0">
                {course.description}
              </p>
              <div className="grid grid-cols-3 gap-3 border-t border-vv-line pt-4">
                {[
                  { label: "Duration", value: course.duration },
                  { label: course.hours ? "Hours" : "Group size", value: course.hours ?? course.formatLabel },
                  { label: course.extraLabel ?? "Format", value: course.extraValue ?? course.formatLabel },
                ].map((meta) => (
                  <div key={meta.label} className="flex flex-col gap-0.5">
                    <span className="font-code text-[10px] tracking-widest text-vv-muted uppercase">
                      {meta.label}
                    </span>
                    <span className="text-[13px] font-semibold text-vv-ink">{meta.value}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between border-t border-vv-line pt-4">
                <div className="text-[15px] text-vv-ink">
                  From <b className="font-bold">{course.price}</b>
                  {course.priceNote ? (
                    <div className="font-code text-[11px] text-vv-muted mt-0.5">{course.priceNote}</div>
                  ) : null}
                </div>
                <Link
                  href="/#book"
                  className="inline-flex items-center justify-center gap-2.5 border border-vv-accent rounded-full cursor-pointer text-[13px] font-semibold tracking-[-0.005em] py-2.25 px-3.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-accent text-vv-accent-deep hover:bg-vv-accent-hi hover:-translate-y-px"
                >
                  Enroll →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Compare strip */}
        <div className="mt-12 rounded-2xl border border-vv-line bg-vv-bg-warm p-8">
          <h2 className="text-[28px] font-semibold tracking-[-0.02em] leading-tight m-0 mb-3">
            Vida Verde Prices for 2025
          </h2>
          <p className="text-vv-ink-2 text-[15px] leading-[1.7] mb-7 mt-0 max-w-[50ch] m-0">
            A one-time $35 registration fee covers a personalized Spanish book,
            class materials, high speed Wi-Fi, neighborhood tour, coffee, water,
            tea, completion certificate, and staff support.
          </p>
          <Link
            href="/#book"
            className="inline-flex items-center justify-center gap-2.5 border border-vv-ink rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-ink text-vv-bg hover:bg-vv-accent-deep hover:border-vv-accent-deep hover:-translate-y-px"
          >
            Contact us →
          </Link>
        </div>
      </div>
    </div>
  );
}

function FilterGroup({
  title,
  group,
  options,
  values,
  onToggle,
}: {
  title: string;
  group: keyof Filters;
  options: readonly (readonly [string, string])[];
  values: string[];
  onToggle: (group: keyof Filters, value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-[11px] font-semibold uppercase tracking-widest text-vv-ink m-0">
        {title}
      </h4>
      {options.map(([value, label]) => (
        <label key={value} className="flex items-center gap-2 text-[13px] text-vv-ink-2 cursor-pointer">
          <input
            type="checkbox"
            checked={values.includes(value)}
            onChange={() => onToggle(group, value)}
            className="accent-vv-accent h-3.5 w-3.5 cursor-pointer"
          />{" "}
          {label}
        </label>
      ))}
    </div>
  );
}
