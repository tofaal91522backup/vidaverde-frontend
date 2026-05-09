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
    <div className="cat-layout">
      <aside className="filter-panel">
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
        <div className="filter-group">
          <h4>Weekly hours</h4>
          <div className="range">
            <input type="range" min="10" max="40" defaultValue="40" step="5" />
            <div className="vals">
              <span>10 hrs</span>
              <span>40 hrs</span>
            </div>
          </div>
        </div>
      </aside>
      <div>
        <div className="results-head">
          <div className="count">
            Showing {courses.length} of {catalogCourses.length} courses
          </div>
          <label className="sort">
            <span className="text-muted">Sort by</span>
            <select defaultValue="popular">
              <option value="popular">Most popular</option>
              <option value="price">Price: low to high</option>
              <option value="duration">Duration</option>
              <option value="difficulty">Difficulty</option>
            </select>
          </label>
        </div>
        <div className="cat-grid">
          {courses.map((course) => (
            <article
              className={cn("cat-card", course.featured && "featured")}
              key={course.title}
            >
              {course.featured ? (
                <span className="featured-tag">Most popular</span>
              ) : null}
              <div className="topline">
                <span className="level-pill">{course.levelLabel}</span>
                <span className="cat-tag">{course.focusLabel}</span>
              </div>
              <h3>{course.title}</h3>
              <p className="blurb">{course.description}</p>
              <div className="meta-row">
                <div className="item">
                  <span className="lab">Duration</span>
                  <span className="val">{course.duration}</span>
                </div>
                <div className="item">
                  <span className="lab">{course.hours ? "Hours" : "Group size"}</span>
                  <span className="val">{course.hours ?? course.formatLabel}</span>
                </div>
                <div className="item">
                  <span className="lab">{course.extraLabel ?? "Format"}</span>
                  <span className="val">
                    {course.extraValue ?? course.formatLabel}
                  </span>
                </div>
              </div>
              <div className="price-row">
                <div className="price">
                  From <b>{course.price}</b>
                  {course.priceNote ? (
                    <>
                      <br />
                      <span className="mono text-[11px]">{course.priceNote}</span>
                    </>
                  ) : null}
                </div>
                <Link href="/#book" className="cta">
                  Enroll →
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div className="compare-strip">
          <h2 className="h2 text-[28px]">Vida Verde Prices for 2025</h2>
          <p className="text-muted mb-7 mt-0 max-w-[50ch]">
            A one-time $35 registration fee covers a personalized Spanish book,
            class materials, high speed Wi-Fi, neighborhood tour, coffee, water,
            tea, completion certificate, and staff support.
          </p>
          <Link href="/#book" className="vv-btn vv-btn-dark">
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
    <div className="filter-group">
      <h4>{title}</h4>
      {options.map(([value, label]) => (
        <label key={value}>
          <input
            type="checkbox"
            checked={values.includes(value)}
            onChange={() => onToggle(group, value)}
          />{" "}
          {label}
        </label>
      ))}
    </div>
  );
}
