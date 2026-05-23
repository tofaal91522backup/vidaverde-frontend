import type { Course } from "@/features/marketing/types";
import { ArrowUpRight } from "lucide-react";

type CourseCardProps = {
  course: Course;
};

export function CourseCard({ course }: CourseCardProps) {
  return (
    <article className="course-card">
      <div className="head">
        <div>
          <div className="level">{course.level}</div>
          <h3 className="mt-2">{course.title}</h3>
        </div>
        <div className="arrow">
          <ArrowUpRight aria-hidden="true" />
        </div>
      </div>
      <p>{course.description}</p>
      <div className="specs">
        <div className="s">
          <span className="lab">Duration</span>
          <span className="val">{course.duration}</span>
        </div>
        <div className="s">
          <span className="lab">Hours</span>
          <span className="val">{course.hours}</span>
        </div>
        <div className="s">
          <span className="lab">From</span>
          <span className="val">{course.price}</span>
        </div>
      </div>
    </article>
  );
}
