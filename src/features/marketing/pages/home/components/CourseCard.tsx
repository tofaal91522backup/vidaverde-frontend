import type { Course } from "@/features/marketing/types";
import { ArrowUpRight } from "lucide-react";

type CourseCardProps = {
  course: Course;
};

export function CourseCard({ course }: CourseCardProps) {
  return (
    <article className="flex flex-col gap-5 rounded-2xl border border-vv-line bg-vv-bg p-7 transition-[border-color,box-shadow,transform] duration-200 hover:border-vv-accent hover:-translate-y-0.5 hover:shadow-[0_20px_60px_-40px_rgba(15,20,16,0.4)] max-[640px]:p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-code text-vv-muted text-[11px] tracking-[0.12em] uppercase mb-2">
            {course.level}
          </div>
          <h3 className="text-[22px] font-semibold tracking-[-0.02em] leading-tight m-0">
            {course.title}
          </h3>
        </div>
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-vv-line bg-vv-bg-warm transition-[background,border-color] duration-150 hover:bg-vv-ink hover:border-vv-ink hover:text-vv-bg">
          <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
        </div>
      </div>
      <p className="text-vv-ink-2 text-[15px] leading-[1.6] flex-1 m-0">
        {course.description}
      </p>
      <div className="flex gap-6 border-t border-vv-line pt-5 max-[640px]:gap-4">
        {[
          { label: "Duration", value: course.duration },
          { label: "Hours", value: course.hours },
          { label: "From", value: course.price },
        ].map((spec) => (
          <div key={spec.label} className="flex flex-col gap-0.5">
            <span className="font-code text-vv-muted text-[10px] tracking-widest uppercase">
              {spec.label}
            </span>
            <span className="text-vv-ink font-semibold text-[14px]">
              {spec.value}
            </span>
          </div>
        ))}
      </div>
    </article>
  );
}
