"use client";

import AsyncStateWrapper from "@/components/shared/async-state-wrapper";
import DeleteMutation from "@/components/shared/delete-mutation";
import { FormFieldWrapper } from "@/components/shared/form-related/form-field-wrapper";
import { FormSection } from "@/components/shared/form-related/form-section";
import { SubmitButton } from "@/components/shared/form-related/submit-button";
import { SubmitErrorSummary } from "@/components/shared/form-related/submit-error-summary";
import { Input } from "@/components/ui/input";
import {
  SCHOOL_TIMEZONE_LABEL,
  formatSchoolDateTime,
  toSchoolIso,
} from "@/features/protected/pages/dashboard/admin/utils/format-school-datetime";
import { toList } from "@/features/protected/pages/dashboard/admin/utils/to-list";
import { useZodTanstackForm } from "@/hooks/use-zod-tanstack-form";
import { ArrowRight, CalendarOff, Info, Plus } from "lucide-react";
import {
  TIME_OFF_QUERY_KEY,
  useCreateTimeOff,
  useTeacherTimeOff,
} from "../queries/use-teacher-time-off";
import { TEACHER_DETAILS_QUERY_KEY } from "../queries/use-teachers";
import {
  TimeOffSchema,
  type TimeOffFormValues,
} from "../schemas/time-off.schema";

function AddTimeOffForm({ teacherId }: { teacherId: string }) {
  const mutation = useCreateTimeOff(teacherId);

  const { form, submitErrors } = useZodTanstackForm<TimeOffFormValues>({
    schema: TimeOffSchema,
    // Form-e datetime-local value thake; backend-e jawar age school offset boshe
    mutation: {
      ...mutation,
      mutateAsync: (values: TimeOffFormValues) =>
        mutation.mutateAsync({
          start_datetime: toSchoolIso(values.start_datetime),
          end_datetime: toSchoolIso(values.end_datetime),
          reason: values.reason,
        }),
    },
    defaultValues: { start_datetime: "", end_datetime: "", reason: "" },
    fieldLabels: {
      start_datetime: "Starts",
      end_datetime: "Ends",
      reason: "Reason",
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-4 rounded-lg border bg-muted/30 p-4"
    >
      <p className="flex items-center gap-2 text-sm font-medium">
        <Plus className="size-4" />
        Add a new window
      </p>

      <SubmitErrorSummary errors={submitErrors} />

      <div className="grid gap-4 sm:grid-cols-2">
        <form.Field name="start_datetime">
          {(field) => (
            <FormFieldWrapper<string> field={field} label="Starts">
              {(p) => <Input {...p.inputProps} type="datetime-local" />}
            </FormFieldWrapper>
          )}
        </form.Field>

        <form.Field name="end_datetime">
          {(field) => (
            <FormFieldWrapper<string> field={field} label="Ends">
              {(p) => <Input {...p.inputProps} type="datetime-local" />}
            </FormFieldWrapper>
          )}
        </form.Field>
      </div>

      <form.Field name="reason">
        {(field) => (
          <FormFieldWrapper<string> field={field} label="Reason">
            {(p) => (
              <Input {...p.inputProps} placeholder="e.g. Christmas holidays" />
            )}
          </FormFieldWrapper>
        )}
      </form.Field>

      <div className="flex justify-end">
        <SubmitButton isLoading={mutation.isPending}>Add time off</SubmitButton>
      </div>
    </form>
  );
}

export function TimeOffSection({ teacherId }: { teacherId: string }) {
  const { data, isLoading, isError } = useTeacherTimeOff(teacherId);
  const entries = toList(data);

  return (
    <FormSection
      icon={CalendarOff}
      title="Time off"
      description={`Holidays and blackout windows. These override the weekly hours above — any overlapping slot disappears from booking. Times are in ${SCHOOL_TIMEZONE_LABEL}.`}
      contentClassName="space-y-4 p-5"
    >
      {/* Backend doc sposhto bole: ei window already-booked class cancel kore na */}
      <div className="flex items-start gap-2 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200">
        <Info className="mt-0.5 h-4 w-4 shrink-0" />
        <p>
          Classes already booked inside this window are <strong>not</strong>{" "}
          cancelled. Move or cancel those from the sessions list.
        </p>
      </div>

      <AsyncStateWrapper
        loading={isLoading}
        error={isError ? "Could not load time off." : null}
      >
        {entries.length === 0 ? (
          <div className="rounded-lg border border-dashed p-6 text-center">
            <CalendarOff className="mx-auto size-5 text-muted-foreground" />
            <p className="mt-2 text-sm font-medium">No time off recorded</p>
            <p className="text-xs text-muted-foreground">
              The weekly hours above apply every week.
            </p>
          </div>
        ) : (
          <ul className="divide-y rounded-lg border">
            {entries.map((entry) => (
              <li
                key={entry.id}
                className="flex flex-wrap items-center justify-between gap-3 p-3"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium">
                    {formatSchoolDateTime(entry.start_datetime)}
                    <ArrowRight
                      className="mx-1.5 inline size-3.5 align-middle text-muted-foreground"
                      aria-hidden="true"
                    />
                    {formatSchoolDateTime(entry.end_datetime)}
                  </p>
                  {entry.reason && (
                    <p className="text-xs text-muted-foreground">
                      {entry.reason}
                    </p>
                  )}
                </div>

                {/* Single entry-r route teacher-er niche na — /administrator/time-off/<id>/ */}
                <DeleteMutation
                  endpoint={`/administrator/time-off/${entry.id}/`}
                  invalidateKeys={[
                    [TIME_OFF_QUERY_KEY, teacherId],
                    [TEACHER_DETAILS_QUERY_KEY, teacherId],
                  ]}
                  confirmMessage="Remove this time off?"
                  confirmDescription="The teacher's normal weekly hours will apply again for this window."
                  successMessage="Time off removed."
                  errorMessage="Could not remove the time off."
                  size="sm"
                />
              </li>
            ))}
          </ul>
        )}
      </AsyncStateWrapper>

      <AddTimeOffForm teacherId={teacherId} />
    </FormSection>
  );
}
