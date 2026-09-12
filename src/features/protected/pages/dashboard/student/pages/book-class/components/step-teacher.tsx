"use client";

import AsyncStateWrapper from "@/components/shared/async-state-wrapper";
import { Badge } from "@/components/ui/badge";
import { usePublicTeachers } from "@/features/protected/pages/dashboard/student/queries/use-public-teachers";
import { cn } from "@/lib/utils";

export function StepTeacher({
  selectedId,
  onSelect,
}: {
  selectedId: string | null;
  onSelect: (teacherId: string) => void;
}) {
  const { data, isLoading, isError } = usePublicTeachers();

  // Ei endpoint bare array dey, envelope na
  const teachers = data ?? [];

  return (
    <AsyncStateWrapper
      loading={isLoading}
      error={isError ? "Could not load teachers." : null}
    >
      {teachers.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No teachers are available right now.
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {teachers.map((teacher) => (
            <button
              key={teacher.id}
              type="button"
              onClick={() => onSelect(teacher.id)}
              className={cn(
                "flex items-start gap-3 rounded-xl border p-4 text-left transition",
                selectedId === teacher.id
                  ? "border-primary bg-primary/5"
                  : "hover:border-foreground/40",
              )}
            >
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted">
                {teacher.profile_img_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={teacher.profile_img_url}
                    alt={teacher.name}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-sm">{teacher.name}</p>
                <p className="text-xs text-muted-foreground">
                  {teacher.availability_label}
                </p>
                {teacher.tags?.length > 0 && (
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {teacher.tags.slice(0, 3).map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-[10px] capitalize"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </AsyncStateWrapper>
  );
}
