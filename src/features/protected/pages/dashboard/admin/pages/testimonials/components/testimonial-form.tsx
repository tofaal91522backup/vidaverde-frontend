"use client";

import { FormFieldWrapper } from "@/components/shared/form-related/form-field-wrapper";
import { FormSection } from "@/components/shared/form-related/form-section";
import { ReusableSelect } from "@/components/shared/form-related/reusable-select";
import { COUNTRY_OPTIONS } from "@/constants/countries";
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
import { Image as ImageIcon, Quote, Settings2, UserRound } from "lucide-react";
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
      className="space-y-5"
    >
      <SubmitErrorSummary errors={submitErrors} />

      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-5">
          <FormSection
            title="Student"
            description="Who gave it. A first name is enough."
            icon={UserRound}
          >
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
                      <ReusableSelect
                        id={p.inputProps.id}
                        name={p.inputProps.name}
                        value={p.inputProps.value}
                        onBlur={p.inputProps.onBlur}
                        onChange={(e) => p.onChangeValue(e.target.value)}
                        aria-invalid={p.inputProps["aria-invalid"]}
                        options={COUNTRY_OPTIONS}
                        placeholder="Select a country"
                      />
                    )}
                  </FormFieldWrapper>
                )}
              </form.Field>
            </div>
          </FormSection>

          <FormSection
            title="Outcome"
            /* Backend doc sposhto bole: specific outcome, generic proshongsha na.
               Description-e rakha holo — age eta textarea-r niche chhoto text
               chhilo, form lomba hole chokhe-i porto na. */
            description="Describe a specific outcome, not a generic compliment. “Great school!” does not convert."
            icon={Quote}
          >
            <div className="space-y-5">
              <form.Field name="outcome_en">
                {(field) => (
                  <FormFieldWrapper<string> field={field} label="English">
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

              <form.Field name="outcome_es">
                {(field) => (
                  <FormFieldWrapper<string> field={field} label="Spanish">
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
            </div>
          </FormSection>

          <FormSection
            title="Photo"
            description="Optional. Shown beside the quote on the homepage."
            icon={ImageIcon}
          >
            <form.Field name="photo_url">
              {(field) => (
                <SingleFileUploader
                  label="Upload photo"
                  value={field.state.value}
                  onChange={field.handleChange}
                />
              )}
            </form.Field>
          </FormSection>
        </div>

        <div className="space-y-5 xl:sticky xl:top-4">
          <FormSection
            title="Display"
            description="Hidden testimonials stay off the public site."
            icon={Settings2}
          >
            <div className="space-y-5">
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

              <div className="grid gap-5 sm:grid-cols-2">
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
                          onChange={(e) =>
                            p.onChangeValue(Number(e.target.value))
                          }
                          aria-invalid={p.inputProps["aria-invalid"]}
                        />
                      )}
                    </FormFieldWrapper>
                  )}
                </form.Field>

                <form.Field name="sort_order">
                  {(field) => (
                    <FormFieldWrapper<number>
                      field={field}
                      label="Display order"
                    >
                      {(p) => (
                        <Input
                          id={p.inputProps.id}
                          name={p.inputProps.name}
                          type="number"
                          value={p.inputProps.value}
                          onBlur={p.inputProps.onBlur}
                          onChange={(e) =>
                            p.onChangeValue(Number(e.target.value))
                          }
                          aria-invalid={p.inputProps["aria-invalid"]}
                        />
                      )}
                    </FormFieldWrapper>
                  )}
                </form.Field>
              </div>

              <form.Field name="programme">
                {(field) => (
                  <FormFieldWrapper<string> field={field} label="Programme">
                    {(p) => (
                      <Input
                        {...p.inputProps}
                        placeholder="e.g. Online Classes"
                      />
                    )}
                  </FormFieldWrapper>
                )}
              </form.Field>

              <SubmitButton
                isLoading={mutation.isPending}
                className="w-full"
              >
                Save testimonial
              </SubmitButton>
            </div>
          </FormSection>
        </div>
      </div>
    </form>
  );
}
