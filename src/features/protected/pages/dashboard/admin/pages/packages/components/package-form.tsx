"use client";

import { FormFieldWrapper } from "@/components/shared/form-related/form-field-wrapper";
import { FormSection } from "@/components/shared/form-related/form-section";
import SingleFileUploader from "@/components/shared/form-related/single-file-uploader";
import { SubmitButton } from "@/components/shared/form-related/submit-button";
import { SubmitErrorSummary } from "@/components/shared/form-related/submit-error-summary";
import { ToggleRow } from "@/components/shared/form-related/toggle-row";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  useZodTanstackForm,
  type AnyMutationLike,
} from "@/hooks/use-zod-tanstack-form";
import {
  Eye,
  GraduationCap,
  ImageIcon,
  Info,
  PackageOpen,
  Wallet,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  PackageSchema,
  type PackageFormValues,
} from "../schemas/package.schema";
import { TeacherPicker } from "./teacher-picker";

interface PackageFormProps {
  mutation: AnyMutationLike<PackageFormValues>;
  defaultValues?: Partial<PackageFormValues>;
  redirectTo?: string;
  /** Submit button-er lekha — create ar edit e ek na */
  submitLabel?: string;
}

export function PackageForm({
  mutation,
  defaultValues,
  redirectTo = "/dashboard/admin/packages",
  submitLabel = "Save package",
}: PackageFormProps) {
  const router = useRouter();

  const { form, submitErrors } = useZodTanstackForm<PackageFormValues>({
    schema: PackageSchema,
    mutation,
    defaultValues: {
      title_en: "",
      title_es: "",
      description_en: "",
      description_es: "",
      image_url: "",
      total_classes: 1,
      validity_days: 90,
      price: "",
      is_first_lesson: false,
      sort_order: 0,
      active: true,
      // Khali = shob teacher allowed, tai notun package default-e unrestricted
      teachers: [],
      ...defaultValues,
    },
    fieldLabels: {
      title_en: "Title (English)",
      title_es: "Title (Spanish)",
      description_en: "Description (English)",
      description_es: "Description (Spanish)",
      image_url: "Image",
      total_classes: "Number of classes",
      validity_days: "Validity (days)",
      price: "Price",
      is_first_lesson: "First lesson package",
      sort_order: "Display order",
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

      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-5">
          {/* Bilingual — Spanish khali thakle public API English e fallback kore */}
          <FormSection
            icon={PackageOpen}
            title="Details"
            description="Shown on the public pricing card. Spanish falls back to English when blank."
          >
            <div className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <form.Field name="title_en">
                  {(field) => (
                    <FormFieldWrapper<string>
                      field={field}
                      label="Title (English)"
                      required
                    >
                      {(p) => (
                        <Input
                          {...p.inputProps}
                          placeholder="e.g. 20-Class Package"
                        />
                      )}
                    </FormFieldWrapper>
                  )}
                </form.Field>

                <form.Field name="title_es">
                  {(field) => (
                    <FormFieldWrapper<string>
                      field={field}
                      label="Title (Spanish)"
                      optional
                    >
                      {(p) => (
                        <Input
                          {...p.inputProps}
                          placeholder="Leave blank to fall back to English"
                        />
                      )}
                    </FormFieldWrapper>
                  )}
                </form.Field>
              </div>

              <div className="grid gap-5 lg:grid-cols-2">
                <form.Field name="description_en">
                  {(field) => (
                    <FormFieldWrapper<string>
                      field={field}
                      label="Description (English)"
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
                          rows={5}
                          placeholder="Shown on the pricing card"
                        />
                      )}
                    </FormFieldWrapper>
                  )}
                </form.Field>

                <form.Field name="description_es">
                  {(field) => (
                    <FormFieldWrapper<string>
                      field={field}
                      label="Description (Spanish)"
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
                          rows={5}
                          placeholder="Leave blank to fall back to English"
                        />
                      )}
                    </FormFieldWrapper>
                  )}
                </form.Field>
              </div>
            </div>
          </FormSection>

          <FormSection
            icon={Wallet}
            title="Price & classes"
            description="What the student pays, how many classes they get, and how long they have to use them."
          >
            <div className="grid gap-5 sm:grid-cols-3">
              <form.Field name="price">
                {(field) => (
                  <FormFieldWrapper<string>
                    field={field}
                    label="Price (USD)"
                    required
                  >
                    {(p) => (
                      // Text input, number na — backend decimal string chay ("250.00")
                      <Input
                        {...p.inputProps}
                        inputMode="decimal"
                        placeholder="250.00"
                      />
                    )}
                  </FormFieldWrapper>
                )}
              </form.Field>

              <form.Field name="total_classes">
                {(field) => (
                  <FormFieldWrapper<number>
                    field={field}
                    label="Number of classes"
                    required
                  >
                    {(p) => (
                      <Input
                        id={p.inputProps.id}
                        name={p.inputProps.name}
                        type="number"
                        min={1}
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

              <form.Field name="validity_days">
                {(field) => (
                  <FormFieldWrapper<number>
                    field={field}
                    label="Validity (days)"
                    required
                  >
                    {(p) => (
                      <Input
                        id={p.inputProps.id}
                        name={p.inputProps.name}
                        type="number"
                        min={1}
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
          </FormSection>

          {/*
            PATCH-e backend ei list ta **replace** kore, merge kore na — tai form
            shobshomoy puro list pathay, ja `form.Field` niজei kore.
          */}
          <FormSection
            icon={GraduationCap}
            title="Bookable with"
            description="Leave every teacher unticked to allow all of them — that is the default."
          >
            <form.Field name="teachers">
              {(field) => (
                <TeacherPicker
                  value={field.state.value ?? []}
                  onChange={field.handleChange}
                />
              )}
            </form.Field>
          </FormSection>
        </div>

        <div className="space-y-5">
          <FormSection
            icon={ImageIcon}
            title="Image"
            description="Optional. Appears on the pricing card."
          >
            <form.Field name="image_url">
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
            title="Visibility & listing"
            description="Where and how this package shows up for students."
          >
            <div className="space-y-4">
              <form.Field name="active">
                {(field) => (
                  <ToggleRow
                    id="active"
                    checked={field.state.value}
                    onChange={field.handleChange}
                    title="Active"
                    description="Inactive packages are hidden from the public site and cannot be bought."
                    onLabel="Visible to students"
                    offLabel="Hidden"
                  />
                )}
              </form.Field>

              <form.Field name="is_first_lesson">
                {(field) => (
                  <ToggleRow
                    id="is_first_lesson"
                    checked={field.state.value}
                    onChange={field.handleChange}
                    title="First lesson package"
                    description="The highlighted card, buyable only once per email address."
                    onLabel="Yes"
                    offLabel="No"
                  />
                )}
              </form.Field>

              {/* Backend doc: ei flag shudhu ekta package-e thaka uchit */}
              <form.Subscribe
                selector={(state) => state.values.is_first_lesson}
              >
                {(isFirstLesson) =>
                  isFirstLesson ? (
                    <p className="flex items-start gap-2 rounded-lg border border-amber-300 bg-amber-50 p-3 text-xs text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200">
                      <Info className="mt-0.5 size-3.5 shrink-0" />
                      Only one package should carry this flag. Turn it off on
                      the old one first.
                    </p>
                  ) : null
                }
              </form.Subscribe>

              <form.Field name="sort_order">
                {(field) => (
                  <FormFieldWrapper<number>
                    field={field}
                    label="Display order"
                    optional
                  >
                    {(p) => (
                      <>
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
                        <p className="text-xs text-muted-foreground">
                          Lower numbers appear first on the pricing page.
                        </p>
                      </>
                    )}
                  </FormFieldWrapper>
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
