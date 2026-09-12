"use client";

import AsyncStateWrapper from "@/components/shared/async-state-wrapper";
import { ReusableSelect } from "@/components/shared/form-related/reusable-select";
import { SubmitButton } from "@/components/shared/form-related/submit-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMyPackages } from "@/features/protected/pages/dashboard/student/pages/my-packages/queries/use-my-packages";
import { usePackageTeachers } from "@/features/protected/pages/dashboard/student/queries/use-package-teachers";
import type { StudentSession } from "@/features/protected/pages/dashboard/student/types/student.types";
import {
  formatLocalDate,
  formatLocalDateTime,
  localDateKey,
} from "@/features/protected/pages/dashboard/student/utils/format-local-datetime";
import { cn } from "@/lib/utils";
import { CalendarClock, X } from "lucide-react";
import { useState } from "react";
import {
  useCancelSession,
  useRescheduleSession,
} from "../queries/use-session-actions";

// ── actions row (session details dialog-er niche) ────────────────────────────

export function SessionActions({
  session,
  onReschedule,
  onDone,
}: {
  session: StudentSession;
  onReschedule: () => void;
  onDone: () => void;
}) {
  const [confirming, setConfirming] = useState(false);
  const cancelSession = useCancelSession({ onSuccess: onDone });

  // Backend: shudhu `scheduled` class-e ei action gula chole
  if (session.status !== "scheduled") return null;

  return (
    <div className="space-y-3 border-t pt-4">
      {!confirming ? (
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            disabled={!session.can_reschedule}
            // can_reschedule false mane 24 ghontar cutoff-er bhitore dhuke geche
            title={
              session.can_reschedule
                ? undefined
                : "Classes can only be moved more than 24 hours in advance."
            }
            onClick={onReschedule}
          >
            <CalendarClock className="h-3.5 w-3.5" />
            Reschedule
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 text-destructive hover:text-destructive"
            onClick={() => setConfirming(true)}
          >
            <X className="h-3.5 w-3.5" />
            Cancel class
          </Button>
        </div>
      ) : (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 space-y-3">
          <p className="text-sm">
            Cancel this class?{" "}
            {session.can_reschedule ? (
              <span className="text-muted-foreground">
                It will be returned to your package.
              </span>
            ) : (
              <span className="font-medium text-destructive">
                It is inside the 24-hour window, so this class will be lost.
              </span>
            )}
          </p>
          <div className="flex gap-2">
            <SubmitButton
              type="button"
              variant="destructive"
              isLoading={cancelSession.isPending}
              loadingText="Cancelling..."
              onClick={() => cancelSession.mutate(session.id)}
            >
              Yes, cancel
            </SubmitButton>
            <Button
              variant="ghost"
              size="sm"
              disabled={cancelSession.isPending}
              onClick={() => setConfirming(false)}
            >
              Keep it
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── reschedule panel ─────────────────────────────────────────────────────────

export function ReschedulePanel({
  session,
  timezone,
  onBack,
  onDone,
}: {
  session: StudentSession;
  timezone: string;
  onBack: () => void;
  onDone: () => void;
}) {
  const [fromDate, setFromDate] = useState(() =>
    localDateKey(session.start_local),
  );
  // Default ekhonkar teacher. Bodlale payload-e `teacher` jabe, na bodlale jabe na.
  const [teacherId, setTeacherId] = useState(session.teacher);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  /**
   * `StudentSession` e catalogue package-er id **nai** — shudhu
   * `student_package` (student-er kena copy) ar `package_title`. Bru-r example
   * response dekhe confirm kora. Tai catalogue id ta `/student/packages/` theke
   * mile ber korte hoy, jemon `book-class/index.tsx` kore.
   *
   * Na pele (list ekhono loading, ba package ta list-e nai) hook disabled thake
   * ar teacher dropdown khali ashe — tokhon student teacher na bodle shudhu
   * somoy bodlate parbe, ja ekhon-o thik kaj kore.
   */
  const { data: myPackages } = useMyPackages();
  const cataloguePackageId =
    myPackages?.results?.find((pkg) => pkg.id === session.student_package)
      ?.package ?? null;

  const {
    data: packageTeacherData,
    isLoading,
    isError,
  } = usePackageTeachers({
    packageId: cataloguePackageId,
    date: fromDate,
    tz: timezone || undefined,
    days: 7,
  });

  const reschedule = useRescheduleSession({ onSuccess: onDone });

  const teachers = packageTeacherData?.teachers ?? [];
  // Slot ar alada kore ana hoy na — proti teacher-er `days` ei response-ei ache.
  const activeTeacher = teachers.find((teacher) => teacher.id === teacherId);
  const days = (activeTeacher?.days ?? []).filter(
    (day) => day.slots.length > 0,
  );

  return (
    <div className="space-y-4 py-2 text-sm">
      <div className="rounded-lg border bg-muted/40 p-3">
        <p className="text-xs text-muted-foreground">Currently booked</p>
        <p className="font-medium">{formatLocalDateTime(session.start_local)}</p>
        <p className="text-xs text-muted-foreground mt-0.5">
          with {session.teacher_name}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="reschedule-from"
            className="text-xs font-medium uppercase tracking-wide text-muted-foreground"
          >
            Show availability from
          </label>
          <Input
            id="reschedule-from"
            type="date"
            value={fromDate}
            onChange={(e) => {
              setFromDate(e.target.value);
              setSelectedSlot(null);
            }}
          />
        </div>

        {/*
          Shudhu ei package-e allowed teacher. Age `usePublicTeachers()` diye
          **shob** teacher dekhato — restricted package-e onno keu bachle
          reschedule-ta backend-e 400 kheto ar karon dekhato na.

          Jar ei window-e slot nai, backend take bad diye dey — tai ekhankar
          teacher-o list theke uthe jete pare. Tokhon-o `teacherId` take
          dhore rakhe, ar teacher na bodlale payload-e `teacher` jay-i na.
        */}
        <ReusableSelect
          id="reschedule-teacher"
          label="Teacher"
          placeholder={session.teacher_name}
          value={teacherId}
          options={teachers.map((teacher) => ({
            value: teacher.id,
            label: teacher.name,
          }))}
          onChange={(e) => {
            setTeacherId(e.target.value || session.teacher);
            setSelectedSlot(null);
          }}
        />
      </div>

      <AsyncStateWrapper
        loading={isLoading}
        error={isError ? "Could not load available times." : null}
      >
        {days.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No free slots in the 7 days from this date. Try a later date.
          </p>
        ) : (
          <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
            {days.map((day) => (
              <div key={day.date}>
                <p className="text-xs font-medium text-muted-foreground mb-1.5">
                  {formatLocalDate(day.date)}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {day.slots.map((slot) => (
                    <button
                      key={slot.start_utc}
                      type="button"
                      onClick={() => setSelectedSlot(slot.start_utc)}
                      className={cn(
                        "rounded-md border px-3 py-1.5 text-xs transition",
                        selectedSlot === slot.start_utc
                          ? "border-primary bg-primary/10 font-medium"
                          : "hover:border-foreground/40",
                      )}
                    >
                      {slot.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </AsyncStateWrapper>

      {packageTeacherData?.timezone && (
        <p className="text-xs text-muted-foreground">
          Times shown in {packageTeacherData.timezone}
        </p>
      )}

      <div className="flex justify-between gap-2 border-t pt-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          disabled={reschedule.isPending}
        >
          Back
        </Button>
        <SubmitButton
          type="button"
          isLoading={reschedule.isPending}
          loadingText="Moving..."
          disabled={!selectedSlot}
          onClick={() =>
            selectedSlot &&
            reschedule.mutate({
              sessionId: session.id,
              // `start_utc` hubohu — convert kora jabe na
              payload: {
                start_datetime: selectedSlot,
                // Bodlay ni hole field ta pathai na — backend tokhon purono teacher rakhe
                ...(teacherId !== session.teacher && { teacher: teacherId }),
              },
            })
          }
        >
          Confirm new time
        </SubmitButton>
      </div>
    </div>
  );
}
