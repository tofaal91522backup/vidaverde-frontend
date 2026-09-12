"use client";

import { FormFieldWrapper } from "@/components/shared/form-related/form-field-wrapper";
import SingleFileUploader from "@/components/shared/form-related/single-file-uploader";
import { SubmitButton } from "@/components/shared/form-related/submit-button";
import { SubmitErrorSummary } from "@/components/shared/form-related/submit-error-summary";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { TeacherPicker } from "./teacher-picker";
import {
  useZodTanstackForm,
  type AnyMutationLike,
} from "@/hooks/use-zod-tanstack-form";
import { useRouter } from "next/navigation";
import {
  PackageSchema,
  type PackageFormValues,
} from "../schemas/package.schema";

interface PackageFormProps {
  mutation: AnyMutationLike<PackageFormValues>;
  defaultValues?: Partial<PackageFormValues>;
  redirectTo?: string;
}

export function PackageForm({
  mutation,
  defaultValues,
  redirectTo = "/dashboard/admin/packages",
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
      className="space-y-6"
    >
      <SubmitErrorSummary errors={submitErrors} />

      {/* Bilingual — Spanish khali thakle public API English e fallback kore */}
      <div className="grid gap-5 sm:grid-cols-2">
        <form.Field name="title_en">
          {(field) => (
            <FormFieldWrapper<string> field={field} label="Title (English)">
              {(p) => (
                <Input {...p.inputProps} placeholder="e.g. 20-Class Package" />
              )}
            </FormFieldWrapper>
          )}
        </form.Field>

        <form.Field name="title_es">
          {(field) => (
            <FormFieldWrapper<string> field={field} label="Title (Spanish)">
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
            <FormFieldWrapper<string> field={field} label="Description (English)">
              {(p) => (
                <Textarea
                  id={p.inputProps.id}
                  name={p.inputProps.name}
                  value={p.inputProps.value}
                  onBlur={p.inputProps.onBlur}
                  onChange={(e) => p.onChangeValue(e.target.value)}
                  aria-invalid={p.inputProps["aria-invalid"]}
                  rows={4}
                  placeholder="Shown on the pricing card"
                />
              )}
            </FormFieldWrapper>
          )}
        </form.Field>

        <form.Field name="description_es">
          {(field) => (
            <FormFieldWrapper<string> field={field} label="Description (Spanish)">
              {(p) => (
                <Textarea
                  id={p.inputProps.id}
                  name={p.inputProps.name}
                  value={p.inputProps.value}
                  onBlur={p.inputProps.onBlur}
                  onChange={(e) => p.onChangeValue(e.target.value)}
                  aria-invalid={p.inputProps["aria-invalid"]}
                  rows={4}
                />
              )}
            </FormFieldWrapper>
          )}
        </form.Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <form.Field name="price">
          {(field) => (
            <FormFieldWrapper<string> field={field} label="Price (USD)">
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
            <FormFieldWrapper<number> field={field} label="Number of classes">
              {(p) => (
                <Input
                  id={p.inputProps.id}
                  name={p.inputProps.name}
                  type="number"
                  min={1}
                  value={p.inputProps.value}
                  onBlur={p.inputProps.onBlur}
                  onChange={(e) => p.onChangeValue(Number(e.target.value))}
                  aria-invalid={p.inputProps["aria-invalid"]}
                />
              )}
            </FormFieldWrapper>
          )}
        </form.Field>

        <form.Field name="validity_days">
          {(field) => (
            <FormFieldWrapper<number> field={field} label="Validity (days)">
              {(p) => (
                <Input
                  id={p.inputProps.id}
                  name={p.inputProps.name}
                  type="number"
                  min={1}
                  value={p.inputProps.value}
                  onBlur={p.inputProps.onBlur}
                  onChange={(e) => p.onChangeValue(Number(e.target.value))}
                  aria-invalid={p.inputProps["aria-invalid"]}
                />
              )}
            </FormFieldWrapper>
          )}
        </form.Field>
      </div>

      <form.Field name="image_url">
        {(field) => (
          <div className="flex flex-col gap-1.5">
            <Label>Image</Label>
            <SingleFileUploader
              label="Upload image"
              value={field.state.value}
              onChange={field.handleChange}
            />
          </div>
        )}
      </form.Field>

      <div className="grid gap-5 sm:grid-cols-3">
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

        <form.Field name="is_first_lesson">
          {(field) => (
            <div className="flex flex-col gap-2">
              <Label>First lesson package</Label>
              <div className="flex h-9 items-center gap-2">
                <Switch
                  id="is_first_lesson"
                  checked={field.state.value}
                  onCheckedChange={field.handleChange}
                />
                <Label
                  htmlFor="is_first_lesson"
                  className="cursor-pointer text-sm font-normal"
                >
                  {field.state.value ? "Yes" : "No"}
                </Label>
              </div>
            </div>
          )}
        </form.Field>

        {/*
          PATCH-e backend ei list ta **replace** kore, merge kore na — tai form
          shobshomoy puro list pathay, ja `form.Field` niজei kore.
        */}
        <form.Field name="teachers">
          {(field) => (
            <div className="sm:col-span-2">
              <TeacherPicker
                value={field.state.value ?? []}
                onChange={field.handleChange}
              />
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
                  {field.state.value
                    ? "Active (visible to students)"
                    : "Inactive (hidden)"}
                </Label>
              </div>
            </div>
          )}
        </form.Field>
      </div>

      {/* Backend doc: ei flag shudhu ekta package-e thaka uchit */}
      <form.Subscribe selector={(state) => state.values.is_first_lesson}>
        {(isFirstLesson) =>
          isFirstLesson ? (
            <p className="-mt-3 text-xs text-amber-600">
              This becomes the highlighted card and can only be bought once per
              email. Only one package should carry this flag.
            </p>
          ) : null
        }
      </form.Subscribe>

      <div className="flex justify-end pt-2">
        <SubmitButton isLoading={mutation.isPending}>Save package</SubmitButton>
      </div>
    </form>
  );
}
