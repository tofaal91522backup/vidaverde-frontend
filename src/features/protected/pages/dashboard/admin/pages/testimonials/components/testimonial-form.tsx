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
  TestimonialSchema,
  type TestimonialFormValues,
} from "../schemas/testimonial.schema";

interface TestimonialFormProps {
  mutation: AnyMutationLike<TestimonialFormValues>;
  defaultValues?: Partial<TestimonialFormValues>;
  redirectTo?: string;
}

export function TestimonialForm({
  mutation,
  defaultValues,
  redirectTo = "/dashboard/admin/testimonials",
}: TestimonialFormProps) {
  const router = useRouter();

  const { form, submitErrors } = useZodTanstackForm<TestimonialFormValues>({
    schema: TestimonialSchema,
    mutation,
    defaultValues: {
      student_name: "",
      country: "",
      photo_url: "",
      outcome_en: "",
      outcome_es: "",
      rating: 5,
      programme: "",
      active: true,
      sort_order: 0,
      ...defaultValues,
    },
    fieldLabels: {
      student_name: "Student name",
      country: "Country",
      photo_url: "Photo",
      outcome_en: "Outcome (English)",
      outcome_es: "Outcome (Spanish)",
      rating: "Rating",
      programme: "Programme",
      active: "Status",
      sort_order: "Display order",
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
        <form.Field name="student_name">
          {(field) => (
            <FormFieldWrapper<string> field={field} label="Student name">
              {(p) => (
                <Input
                  {...p.inputProps}
                  placeholder="First name is enough, e.g. Emma"
                />
              )}
            </FormFieldWrapper>
          )}
        </form.Field>

        <form.Field name="country">
          {(field) => (
            <FormFieldWrapper<string> field={field} label="Country">
              {(p) => (
                <Input {...p.inputProps} placeholder="e.g. United Kingdom" />
              )}
            </FormFieldWrapper>
          )}
        </form.Field>
      </div>

      <form.Field name="outcome_en">
        {(field) => (
          <FormFieldWrapper<string> field={field} label="Outcome (English)">
            {(p) => (
              <Textarea
                id={p.inputProps.id}
                name={p.inputProps.name}
                value={p.inputProps.value}
                onBlur={p.inputProps.onBlur}
                onChange={(e) => p.onChangeValue(e.target.value)}
                aria-invalid={p.inputProps["aria-invalid"]}
                rows={4}
                placeholder="After 8 weeks with Lucia I held a full conversation with my partner's family in Guayaquil — no English at all."
              />
            )}
          </FormFieldWrapper>
        )}
      </form.Field>
      {/* Backend doc sposhto bole: specific outcome, generic proshongsha na */}
      <p className="-mt-4 text-xs text-muted-foreground">
        Describe a <strong>specific</strong> outcome, not a generic compliment.
        &quot;Great school!&quot; does not convert.
      </p>

      <form.Field name="outcome_es">
        {(field) => (
          <FormFieldWrapper<string> field={field} label="Outcome (Spanish)">
            {(p) => (
              <Textarea
                id={p.inputProps.id}
                name={p.inputProps.name}
                value={p.inputProps.value}
                onBlur={p.inputProps.onBlur}
                onChange={(e) => p.onChangeValue(e.target.value)}
                aria-invalid={p.inputProps["aria-invalid"]}
                rows={4}
                placeholder="Leave blank to fall back to English"
              />
            )}
          </FormFieldWrapper>
        )}
      </form.Field>

      <form.Field name="photo_url">
        {(field) => (
          <div className="flex flex-col gap-1.5">
            <Label>Photo</Label>
            <SingleFileUploader
              label="Upload photo"
              value={field.state.value}
              onChange={field.handleChange}
            />
          </div>
        )}
      </form.Field>

      <div className="grid gap-5 sm:grid-cols-4">
        <form.Field name="rating">
          {(field) => (
            <FormFieldWrapper<number> field={field} label="Rating">
              {(p) => (
                <Input
                  id={p.inputProps.id}
                  name={p.inputProps.name}
                  type="number"
                  min={1}
                  max={5}
                  value={p.inputProps.value}
                  onBlur={p.inputProps.onBlur}
                  onChange={(e) => p.onChangeValue(Number(e.target.value))}
                  aria-invalid={p.inputProps["aria-invalid"]}
                />
              )}
            </FormFieldWrapper>
          )}
        </form.Field>

        <form.Field name="programme">
          {(field) => (
            <FormFieldWrapper<string> field={field} label="Programme">
              {(p) => (
                <Input {...p.inputProps} placeholder="e.g. Online Classes" />
              )}
            </FormFieldWrapper>
          )}
        </form.Field>

        <form.Field name="sort_order">
          {(field) => (
            <FormFieldWrapper<number> field={field} label="Display order">
              {(p) => (
                <Input
                  id={p.inputProps.id}
                  name={p.inputProps.name}
                  type="number"
                  value={p.inputProps.value}
                  onBlur={p.inputProps.onBlur}
                  onChange={(e) => p.onChangeValue(Number(e.target.value))}
                  aria-invalid={p.inputProps["aria-invalid"]}
                />
              )}
            </FormFieldWrapper>
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
                  {field.state.value ? "Shown" : "Hidden"}
                </Label>
              </div>
            </div>
          )}
        </form.Field>
      </div>

      <div className="flex justify-end pt-2">
        <SubmitButton isLoading={mutation.isPending}>
          Save testimonial
        </SubmitButton>
      </div>
    </form>
  );
}
