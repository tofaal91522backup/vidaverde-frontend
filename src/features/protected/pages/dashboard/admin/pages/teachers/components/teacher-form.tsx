"use client";

import { FormFieldWrapper } from "@/components/shared/form-related/form-field-wrapper";
import SingleFileUploader from "@/components/shared/form-related/single-file-uploader";
import { SubmitButton } from "@/components/shared/form-related/submit-button";
import { SubmitErrorSummary } from "@/components/shared/form-related/submit-error-summary";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useZodTanstackForm } from "@/hooks/use-zod-tanstack-form";
import { useRouter } from "next/navigation";
import { TeacherFormValues, TeacherSchema } from "../schemas/teacher.schema";
import { WeeklyScheduleGrid } from "./weekly-schedule-grid";

const SPECIALISATION_OPTIONS = [
  "Business Spanish",
  "Medical Spanish",
  "Legal Spanish",
  "DELE Preparation",
  "Conversation Practice",
  "Grammar Focus",
  "Travel Spanish",
  "Cultural Immersion",
  "Children & Teens",
  "Beginner Courses",
];

interface TeacherFormProps {
  mutation: any;
  defaultValues?: Partial<TeacherFormValues>;
  redirectTo?: string;
}

export function TeacherForm({
  mutation,
  defaultValues,
  redirectTo = "/dashboard/admin/teachers",
}: TeacherFormProps) {
  const router = useRouter();

  const { form, submitErrors } = useZodTanstackForm<TeacherFormValues>({
    schema: TeacherSchema,
    mutation,
    defaultValues: {
      name: "",
      bio: "",
      photo: "",
      specialisations: [],
      isActive: true,
      schedule: {},
      ...defaultValues,
    },
    fieldLabels: {
      name: "Name",
      bio: "Bio",
      photo: "Photo",
      specialisations: "Specialisations",
      isActive: "Active Status",
      schedule: "Schedule",
    },
    onValidSubmit: () => {
      router.push(redirectTo);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-6"
    >
      <SubmitErrorSummary errors={submitErrors} />

      <div className="grid gap-5 sm:grid-cols-2">
        <form.Field name="name">
          {(field) => (
            <FormFieldWrapper<string> field={field} label="Full Name">
              {(p) => (
                <Input
                  {...p.inputProps}
                  placeholder="e.g. María González"
                />
              )}
            </FormFieldWrapper>
          )}
        </form.Field>

        <form.Field name="isActive">
          {(field) => (
            <div className="flex flex-col gap-2">
              <Label>Status</Label>
              <div className="flex items-center gap-2 h-9">
                <Switch
                  checked={field.state.value}
                  onCheckedChange={field.handleChange}
                  id="isActive"
                />
                <Label htmlFor="isActive" className="text-sm font-normal cursor-pointer">
                  {field.state.value ? "Active" : "Inactive"}
                </Label>
              </div>
            </div>
          )}
        </form.Field>
      </div>

      <form.Field name="bio">
        {(field) => (
          <FormFieldWrapper<string> field={field} label="Bio">
            {(p) => (
              <Textarea
                id={p.inputProps.id}
                name={p.inputProps.name}
                value={p.inputProps.value}
                onBlur={p.inputProps.onBlur}
                onChange={(e) => p.onChangeValue(e.target.value)}
                aria-invalid={p.inputProps["aria-invalid"]}
                placeholder="Brief description of the teacher's background and teaching style..."
                rows={4}
              />
            )}
          </FormFieldWrapper>
        )}
      </form.Field>

      <form.Field name="photo">
        {(field) => (
          <div className="flex flex-col gap-1.5">
            <Label>Profile Photo</Label>
            <SingleFileUploader
              label=""
              value={field.state.value}
              onChange={field.handleChange}
            />
          </div>
        )}
      </form.Field>

      <form.Field name="specialisations">
        {(field) => (
          <div className="flex flex-col gap-2">
            <Label>Specialisations</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {SPECIALISATION_OPTIONS.map((opt) => {
                const checked = (field.state.value ?? []).includes(opt);
                return (
                  <label
                    key={opt}
                    className="flex items-center gap-2 text-sm cursor-pointer"
                  >
                    <Checkbox
                      checked={checked}
                      onCheckedChange={(v) => {
                        const current = field.state.value ?? [];
                        field.handleChange(
                          v
                            ? [...current, opt]
                            : current.filter((s) => s !== opt),
                        );
                      }}
                    />
                    {opt}
                  </label>
                );
              })}
            </div>
          </div>
        )}
      </form.Field>

      <form.Field name="schedule">
        {(field) => (
          <div className="flex flex-col gap-2">
            <Label>Weekly Availability</Label>
            <WeeklyScheduleGrid
              value={field.state.value ?? {}}
              onChange={field.handleChange}
            />
          </div>
        )}
      </form.Field>

      <div className="flex justify-end gap-3 pt-2">
        <SubmitButton isLoading={mutation.isPending}>Save Teacher</SubmitButton>
      </div>
    </form>
  );
}
