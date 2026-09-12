"use client";

import AsyncStateWrapper from "@/components/shared/async-state-wrapper";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { usePackageTeachers } from "@/features/protected/pages/dashboard/student/queries/use-package-teachers";
import type { PublicPackageTeacher } from "@/features/marketing/types/public-api.types";
import { cn } from "@/lib/utils";

/** Aj-ker date, local part theke (toISOString UTC dey bole ta use kora hoy na) */
function todayIso() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

/**
 * Teacher bachai — **shudhu jara ei package-e allowed**.
 *
 * Age `usePublicTeachers()` diye **shob** active teacher dekhato. Package ekhon
 * nirdishto teacher-e shimito kora jay ar backend seta `POST /student/sessions/`
 * eo enforce kore, tai shob dekhale student emon teacher balte parto jar shathe
 * booking-ta **400 khabe** — ar karon bujhto na.
 *
 * "Show availability from" ei step-e uthe eseche (age slot step-e chilo), karon
 * date ekhon shudhu somoy filter kore na — **kon teacher dekhabe seta-o bodlay**
 * (jar oi window-e slot nai, backend take bad dey).
 */
export function StepTeacher({
  packageId,
  timezone,
  fromDate,
  onFromDateChange,
  selectedId,
  onSelect,
}: {
  /** **Catalogue** package UUID (`StudentPackage.package`). */
  packageId: string | null;
  timezone: string;
  fromDate: string;
  onFromDateChange: (date: string) => void;
  selectedId: string | null;
  onSelect: (teacher: PublicPackageTeacher) => void;
}) {
  const { data, isLoading, isError } = usePackageTeachers({
    packageId,
    date: fromDate,
    tz: timezone || undefined,
    days: 7,
  });

  const teachers = data?.teachers ?? [];

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="book-from-date"
          className="text-xs font-medium uppercase tracking-wide text-muted-foreground"
        >
          Show availability from
        </label>
        <Input
          id="book-from-date"
          type="date"
          className="max-w-xs"
          value={fromDate}
          min={todayIso()}
          onChange={(e) => onFromDateChange(e.target.value)}
        />
      </div>

      {data?.package?.restricted && (
        <p className="rounded-lg border bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
          This package can be booked with the teachers below only.
        </p>
      )}

      <AsyncStateWrapper
        loading={isLoading}
        error={isError ? "Could not load teachers." : null}
      >
        {teachers.length === 0 ? (
          // Khali list mane "teacher nai" NA — jar ei window-e slot nai backend
          // take bad diye dey. Tai date barie dekhte bola hoy.
          <p className="text-sm text-muted-foreground">
            No one has a free slot in the 7 days from this date. Try a later date.
          </p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {teachers.map((teacher) => (
              <button
                key={teacher.id}
                type="button"
                onClick={() => onSelect(teacher)}
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
                  {/* Backend-i prothom khali slot ber kore dey */}
                  <p className="text-xs text-muted-foreground">
                    {teacher.next_available
                      ? `Next: ${teacher.next_available.date} at ${teacher.next_available.label} · ${teacher.slot_count} slots`
                      : teacher.availability_label}
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
    </div>
  );
}
