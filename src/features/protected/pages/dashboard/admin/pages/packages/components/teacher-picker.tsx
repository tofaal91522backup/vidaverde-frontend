"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { useTeachers } from "@/features/protected/pages/dashboard/admin/pages/teachers/queries/use-teachers";
import { toList } from "@/features/protected/pages/dashboard/admin/utils/to-list";

/**
 * Kon teacher-der shathe package ta book kora jabe.
 *
 * ⚠️ **Kichu select na kora = shob teacher allowed.** Eta ulta bujhle feature-ta
 * ulta hoye jay, tai UI-te sposhto kore lekha ache — admin jate "kono teacher
 * select kora nai" dekhe "keu porate parbe na" na bhabe.
 *
 * Multi-select component project-e nai, ar teacher-o hate gona koyekjon — tai
 * dropdown na, shoja checkbox list.
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

  // Label ar border FormSection-i dey, tai ekhane shudhu bhitorer ongsho
  return (
    <div className="space-y-3">
      <p className="rounded-lg border bg-muted/40 p-3 text-xs text-muted-foreground">
        {value.length === 0 ? (
          <>
            <span className="font-medium text-foreground">
              Every teacher can be booked
            </span>{" "}
            with this package. Tick teachers below only if you want to limit it.
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

      {isLoading && (
        <p className="text-sm text-muted-foreground">Loading teachers…</p>
      )}
      {isError && (
        <p className="text-sm text-destructive">Could not load teachers.</p>
      )}

      {!isLoading && !isError && teachers.length === 0 && (
        <p className="text-sm text-muted-foreground">No active teachers yet.</p>
      )}

      {teachers.length > 0 && (
        <div className="grid gap-1 sm:grid-cols-2">
          {teachers.map((teacher) => (
            <label
              key={teacher.id}
              className="flex cursor-pointer items-center gap-2 rounded-md p-2 text-sm transition-colors hover:bg-muted/50"
            >
              <Checkbox
                checked={value.includes(teacher.id)}
                onCheckedChange={() => toggle(teacher.id)}
              />
              <span className="truncate">{teacher.name}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
