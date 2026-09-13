"use client";

import { FormFieldWrapper } from "@/components/shared/form-related/form-field-wrapper";
import { FormSection } from "@/components/shared/form-related/form-section";
import SingleFileUploader from "@/components/shared/form-related/single-file-uploader";
import { SubmitButton } from "@/components/shared/form-related/submit-button";
import { SubmitErrorSummary } from "@/components/shared/form-related/submit-error-summary";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  useZodTanstackForm,
  type AnyMutationLike,
} from "@/hooks/use-zod-tanstack-form";
import {
  CalendarClock,
  Eye,
  ImageIcon,
  MessagesSquare,
  UserRound,
  Video,
} from "lucide-react";
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
  /** Submit button-er lekha — create ar edit e ek na */
  submitLabel?: string;
}

/** Kon field chara-o save kora jay — label-er pashe boshe */
function OptionalTag() {
  return (
    <span className="text-xs font-normal text-muted-foreground">Optional</span>
  );
}

/**
 * Switch-er jonno ekta bordered row — shudhu label ar toggle-er cheye
 * porishkar, karon pashei bola thake off korle ki hobe.
 */
function ToggleRow({
  id,
  checked,
  onChange,
  title,
  description,
  onLabel,
  offLabel,
}: {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  title: string;
  description: string;
  onLabel: string;
  offLabel: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border p-4">
      <div className="space-y-1.5">
        <Label htmlFor={id} className="cursor-pointer text-sm font-medium">
          {title}
        </Label>
        <p className="text-xs text-muted-foreground">{description}</p>
        <Badge
          variant={checked ? "secondary" : "outline"}
          className="font-normal"
        >
          {checked ? onLabel : offLabel}
        </Badge>
      </div>

      <Switch id={id} checked={checked} onCheckedChange={onChange} />
    </div>
  );
}

export function TeacherForm({
  mutation,
  defaultValues,
  redirectTo = "/dashboard/admin/teachers",
  submitLabel = "Save teacher",
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
      className="space-y-5"
    >
      <SubmitErrorSummary errors={submitErrors} />

      {/* Boro screen-e dan pashta faka pore chilo — photo, visibility ar
          action ekhon oi rail-e; chhoto screen-e nichey stack hoye jay */}
      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-5">
          <FormSection
            icon={UserRound}
            title="Profile"
            description="Shown on the public teacher card and the booking flow. Only the full name is required."
          >
            <div className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <form.Field name="name">
                  {(field) => (
                    <FormFieldWrapper<string>
                      field={field}
                      label="Full name"
                      required
                    >
                      {(p) => (
                        <Input
                          {...p.inputProps}
                          placeholder="e.g. Fernando Cordero"
                        />
                      )}
                    </FormFieldWrapper>
                  )}
                </form.Field>

                <form.Field name="institute">
                  {(field) => (
                    <FormFieldWrapper<string>
                      field={field}
                      label="Institute"
                      optional
                    >
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

              <form.Field name="tags">
                {(field) => (
                  <div className="flex flex-col gap-1.5">
                    <Label className="gap-1.5">
                      Specialisations
                      <OptionalTag />
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Press Enter or comma to add one. These show as chips on
                      the public profile.
                    </p>
                    <TagsInput
                      value={field.state.value}
                      onChange={field.handleChange}
                    />
                  </div>
                )}
              </form.Field>
            </div>
          </FormSection>

          {/* Bilingual — public API ?lang= onujayi dey, na pele English e fallback */}
          <FormSection
            icon={MessagesSquare}
            title="Bio"
            description="Both optional — the public site falls back to English when Spanish is blank."
          >
            <div className="grid gap-5 lg:grid-cols-2">
              <form.Field name="description_en">
                {(field) => (
                  <FormFieldWrapper<string>
                    field={field}
                    label="Bio (English)"
                    optional
                  >
                    {(p) => (
                      <Textarea
                        id={p.inputProps.id}
                        name={p.inputProps.name}
                        value={p.inputProps.value}
                        onBlur={p.inputProps.onBlur}
                        onChange={(e) => p.onChangeValue(e.target.value)}
                        aria-invalid={p.inputProps["aria-invalid"]}
                        rows={6}
                        placeholder="Teaching background and style..."
                      />
                    )}
                  </FormFieldWrapper>
                )}
              </form.Field>

              <form.Field name="description_es">
                {(field) => (
                  <FormFieldWrapper<string>
                    field={field}
                    label="Bio (Spanish)"
                    optional
                  >
                    {(p) => (
                      <Textarea
                        id={p.inputProps.id}
                        name={p.inputProps.name}
                        value={p.inputProps.value}
                        onBlur={p.inputProps.onBlur}
                        onChange={(e) => p.onChangeValue(e.target.value)}
                        aria-invalid={p.inputProps["aria-invalid"]}
                        rows={6}
                        placeholder="Leave blank to fall back to English"
                      />
                    )}
                  </FormFieldWrapper>
                )}
              </form.Field>
            </div>
          </FormSection>

          <FormSection
            icon={CalendarClock}
            title="Weekly availability"
            description="Optional, but a teacher with no hours can never be booked."
          >
            <form.Field name="availability">
              {(field) => (
                <AvailabilityEditor
                  value={field.state.value as AvailabilityRuleValue[]}
                  onChange={field.handleChange}
                />
              )}
            </form.Field>
          </FormSection>

          <FormSection
            icon={Video}
            title="Calendar & meetings"
            description="Optional. The fallback room is used when Google Calendar is unavailable, so a booking never fails because of Google."
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <form.Field name="google_calendar_id">
                {(field) => (
                  <FormFieldWrapper<string>
                    field={field}
                    label="Google Calendar ID"
                    optional
                  >
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
                  <FormFieldWrapper<string>
                    field={field}
                    label="Fallback Meet link"
                    optional
                  >
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
          </FormSection>
        </div>

        <div className="space-y-5">
          <FormSection
            icon={ImageIcon}
            title="Profile photo"
            description="Optional. Square images look best on the public card."
          >
            <form.Field name="profile_img_url">
              {(field) => (
                <SingleFileUploader
                  label=""
                  value={field.state.value}
                  onChange={field.handleChange}
                />
              )}
            </form.Field>
          </FormSection>

          <FormSection
            icon={Eye}
            title="Visibility"
            description="Controls where this teacher appears for students."
          >
            <div className="space-y-4">
              <form.Field name="accepting_students">
                {(field) => (
                  <ToggleRow
                    id="accepting_students"
                    checked={field.state.value}
                    onChange={field.handleChange}
                    title="Accepting new students"
                    description="Turn off to keep existing classes but stop new students from picking this teacher."
                    onLabel="Accepting new students"
                    offLabel="Not accepting new students"
                  />
                )}
              </form.Field>

              <form.Field name="active">
                {(field) => (
                  <ToggleRow
                    id="active"
                    checked={field.state.value}
                    onChange={field.handleChange}
                    title="Active"
                    description="Inactive teachers are hidden from the public site and the booking flow entirely."
                    onLabel="Active"
                    offLabel="Inactive"
                  />
                )}
              </form.Field>
            </div>
          </FormSection>

          <FormSection
            title="Ready to save?"
            description="Fields marked * are required. Everything else can be filled in later."
            contentClassName="space-y-2 p-5"
          >
            <SubmitButton className="w-full" isLoading={mutation.isPending}>
              {submitLabel}
            </SubmitButton>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => router.push(redirectTo)}
            >
              Cancel
            </Button>
          </FormSection>
        </div>
      </div>
    </form>
  );
}
