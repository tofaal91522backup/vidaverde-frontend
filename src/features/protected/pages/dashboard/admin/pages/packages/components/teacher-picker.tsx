"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useTeachers } from "@/features/protected/pages/dashboard/admin/pages/teachers/queries/use-teachers";
import { SCHOOL_TIMEZONE_LABEL } from "@/features/protected/pages/dashboard/admin/utils/format-school-datetime";
import { toList } from "@/features/protected/pages/dashboard/admin/utils/to-list";
import { availabilitySummary } from "@/features/protected/pages/dashboard/admin/utils/teacher-display";
import { cn } from "@/lib/utils";
import { initials } from "@/utils/initials";

/**
 * Kon teacher-der shathe package ta book kora jabe.
 *
 * ⚠️ **Kichu select na kora = shob teacher allowed.** Eta ulta bujhle feature-ta
 * ulta hoye jay, tai UI-te sposhto kore lekha ache — admin jate "kono teacher
 * select kora nai" dekhe "keu porate parbe na" na bhabe.
 *
 * Multi-select component project-e nai, ar teacher-o hate gona koyekjon — tai
 * dropdown na, checkbox list. Proti row-e chhobi, institute, tag ar weekly hours
 * dekhano hoy: restrict korar age admin-er **kake** restrict korchhe seta bojha
 * dorkar, shudhu naam dekhe hoy na.
 *
 * `active: true` — deactivated teacher-ke notun kore assign korar mane nai.
 * (Backend-er niyom: restricted package-er shob teacher deactivate hoye gele
 * booking shob active teacher-e fallback kore, khali picker dekhay na.)
 */
export function TeacherPicker({
  value,
  onChange,
}: {
  value: string[];
  onChange: (teacherIds: string[]) => void;
}) {
  const { data, isLoading, isError } = useTeachers({ active: true });
  const teachers = toList(data);

  const toggle = (id: string) => {
    onChange(
      value.includes(id)
        ? value.filter((teacherId) => teacherId !== id)
        : [...value, id],
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <Label>Bookable with</Label>

      <div className="rounded-lg border p-3">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            {value.length === 0 ? (
              <>
                <span className="font-medium text-foreground">
                  Every teacher can be booked
                </span>{" "}
                with this package. Tick teachers below only if you want to limit
                it.
              </>
            ) : (
              <>
                Limited to{" "}
                <span className="font-medium text-foreground">
                  {value.length} {value.length === 1 ? "teacher" : "teachers"}
                </span>
                . Untick them all to allow everyone again.
              </>
            )}
          </p>

          {value.length > 0 && (
            <button
              type="button"
              onClick={() => onChange([])}
              className="shrink-0 text-xs font-medium text-muted-foreground underline underline-offset-2 hover:text-foreground"
            >
              Clear
            </button>
          )}
        </div>

        {isLoading && (
          <p className="text-sm text-muted-foreground">Loading teachers…</p>
        )}
        {isError && (
          <p className="text-sm text-destructive">Could not load teachers.</p>
        )}

        {!isLoading && !isError && teachers.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No active teachers yet.
          </p>
        )}

        {teachers.length > 0 && (
          <>
            <div className="grid gap-2 lg:grid-cols-2">
              {teachers.map((teacher) => {
                const checked = value.includes(teacher.id);

                return (
                  <label
                    key={teacher.id}
                    className={cn(
                      "flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition",
                      checked
                        ? "border-primary bg-primary/5"
                        : "hover:border-foreground/30",
                    )}
                  >
                    <Checkbox
                      checked={checked}
                      onCheckedChange={() => toggle(teacher.id)}
                      className="mt-0.5"
                    />

                    <Avatar className="size-9 shrink-0">
                      <AvatarImage
                        src={teacher.profile_img_url}
                        alt={teacher.name}
                      />
                      <AvatarFallback className="text-xs">
                        {initials(teacher.name)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="truncate text-sm font-medium">
                          {teacher.name}
                        </span>
                        {!teacher.accepting_students && (
                          // Assign kora jay, kintu admin-er jana dorkar
                          <Badge variant="outline" className="text-[10px]">
                            Limited availability
                          </Badge>
                        )}
                      </div>

                      {teacher.institute && (
                        <p className="truncate text-xs text-muted-foreground">
                          {teacher.institute}
                        </p>
                      )}

                      <p className="truncate text-xs text-muted-foreground">
                        {availabilitySummary(teacher.availability)}
                      </p>

                      {teacher.tags?.length > 0 && (
                        <div className="mt-1.5 flex flex-wrap gap-1">
                          {teacher.tags.slice(0, 3).map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-[10px] capitalize"
                            >
                              {tag}
                            </Badge>
                          ))}
                          {teacher.tags.length > 3 && (
                            <span className="text-[10px] text-muted-foreground">
                              +{teacher.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </label>
                );
              })}
            </div>

            <p className="mt-3 text-[11px] text-muted-foreground">
              Weekly hours are in {SCHOOL_TIMEZONE_LABEL}.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
