"use client";

import { FormFieldWrapper } from "@/components/shared/form-related/form-field-wrapper";
import SingleFileUploader from "@/components/shared/form-related/single-file-uploader";
import { SubmitButton } from "@/components/shared/form-related/submit-button";
import { SubmitErrorSummary } from "@/components/shared/form-related/submit-error-summary";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  useZodTanstackForm,
  type AnyMutationLike,
} from "@/hooks/use-zod-tanstack-form";
import { useRouter } from "next/navigation";
import {
  TeacherSchema,
  type AvailabilityRuleValue,
  type TeacherFormValues,
} from "../schemas/teacher.schema";
import { AvailabilityEditor } from "./availability-editor";
import { TagsInput } from "./tags-input";

interface TeacherFormProps {
  mutation: AnyMutationLike<TeacherFormValues>;
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
      profile_img_url: "",
      tags: [],
      institute: "",
      description_en: "",
      description_es: "",
      availability: [],
      accepting_students: true,
      google_calendar_id: "",
      meet_link: "",
      active: true,
      ...defaultValues,
    },
    fieldLabels: {
      name: "Full name",
      profile_img_url: "Profile photo",
      tags: "Specialisations",
      institute: "Institute",
      description_en: "Bio (English)",
      description_es: "Bio (Spanish)",
      availability: "Weekly availability",
      accepting_students: "Accepting new students",
      google_calendar_id: "Google Calendar ID",
      meet_link: "Fallback Meet link",
      active: "Status",
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
            <FormFieldWrapper<string> field={field} label="Full name">
              {(p) => (
                <Input {...p.inputProps} placeholder="e.g. Fernando Cordero" />
              )}
            </FormFieldWrapper>
          )}
        </form.Field>

        <form.Field name="institute">
          {(field) => (
            <FormFieldWrapper<string> field={field} label="Institute">
              {(p) => (
                <Input
                  {...p.inputProps}
                  placeholder="e.g. Universidad Central del Ecuador"
                />
              )}
            </FormFieldWrapper>
          )}
        </form.Field>
      </div>

      <form.Field name="profile_img_url">
        {(field) => (
          <div className="flex flex-col gap-1.5">
            <Label>Profile photo</Label>
            <SingleFileUploader
              label="Upload photo"
              value={field.state.value}
              onChange={field.handleChange}
            />
          </div>
        )}
      </form.Field>

      <form.Field name="tags">
        {(field) => (
          <div className="flex flex-col gap-1.5">
            <Label>Specialisations</Label>
            <TagsInput
              value={field.state.value}
              onChange={field.handleChange}
            />
          </div>
        )}
      </form.Field>

      {/* Bilingual — public API ?lang= onujayi dey, na pele English e fallback */}
      <div className="grid gap-5 lg:grid-cols-2">
        <form.Field name="description_en">
          {(field) => (
            <FormFieldWrapper<string> field={field} label="Bio (English)">
              {(p) => (
                <Textarea
                  id={p.inputProps.id}
                  name={p.inputProps.name}
                  value={p.inputProps.value}
                  onBlur={p.inputProps.onBlur}
                  onChange={(e) => p.onChangeValue(e.target.value)}
                  aria-invalid={p.inputProps["aria-invalid"]}
                  rows={5}
                  placeholder="Teaching background and style..."
                />
              )}
            </FormFieldWrapper>
          )}
        </form.Field>

        <form.Field name="description_es">
          {(field) => (
            <FormFieldWrapper<string> field={field} label="Bio (Spanish)">
              {(p) => (
                <Textarea
                  id={p.inputProps.id}
                  name={p.inputProps.name}
                  value={p.inputProps.value}
                  onBlur={p.inputProps.onBlur}
                  onChange={(e) => p.onChangeValue(e.target.value)}
                  aria-invalid={p.inputProps["aria-invalid"]}
                  rows={5}
                  placeholder="Leave blank to fall back to English"
                />
              )}
            </FormFieldWrapper>
          )}
        </form.Field>
      </div>

      <form.Field name="availability">
        {(field) => (
          <div className="flex flex-col gap-1.5">
            <Label>Weekly availability</Label>
            <AvailabilityEditor
              value={field.state.value as AvailabilityRuleValue[]}
              onChange={field.handleChange}
            />
          </div>
        )}
      </form.Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <form.Field name="google_calendar_id">
          {(field) => (
            <FormFieldWrapper<string> field={field} label="Google Calendar ID">
              {(p) => (
                <Input
                  {...p.inputProps}
                  placeholder="Leave blank to skip Calendar sync"
                />
              )}
            </FormFieldWrapper>
          )}
        </form.Field>

        <form.Field name="meet_link">
          {(field) => (
            <FormFieldWrapper<string> field={field} label="Fallback Meet link">
              {(p) => (
                <Input
                  {...p.inputProps}
                  placeholder="https://meet.google.com/..."
                />
              )}
            </FormFieldWrapper>
          )}
        </form.Field>
      </div>
      <p className="-mt-4 text-xs text-muted-foreground">
        The fallback room is used when Google Calendar is unavailable, so a
        booking never fails because of Google.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <form.Field name="accepting_students">
          {(field) => (
            <div className="flex flex-col gap-2">
              <Label>Accepting new students</Label>
              <div className="flex h-9 items-center gap-2">
                <Switch
                  id="accepting_students"
                  checked={field.state.value}
                  onCheckedChange={field.handleChange}
                />
                <Label
                  htmlFor="accepting_students"
                  className="cursor-pointer text-sm font-normal"
                >
                  {field.state.value
                    ? "Accepting new students"
                    : "Limited availability"}
                </Label>
              </div>
            </div>
          )}
        </form.Field>

        <form.Field name="active">
          {(field) => (
            <div className="flex flex-col gap-2">
              <Label>Status</Label>
              <div className="flex h-9 items-center gap-2">
                <Switch
                  id="active"
                  checked={field.state.value}
                  onCheckedChange={field.handleChange}
                />
                <Label
                  htmlFor="active"
                  className="cursor-pointer text-sm font-normal"
                >
                  {field.state.value ? "Active" : "Inactive"}
                </Label>
              </div>
            </div>
          )}
        </form.Field>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <SubmitButton isLoading={mutation.isPending}>Save teacher</SubmitButton>
      </div>
    </form>
  );
}
