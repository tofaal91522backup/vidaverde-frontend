"use client";

import { FormFieldWrapper } from "@/components/shared/form-related/form-field-wrapper";
import { SubmitButton } from "@/components/shared/form-related/submit-button";
import { SubmitErrorSummary } from "@/components/shared/form-related/submit-error-summary";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useZodTanstackForm } from "@/hooks/use-zod-tanstack-form";
import { useRouter } from "next/navigation";
import { PackageFormValues, PackageSchema } from "../schemas/package.schema";

interface PackageFormProps {
  mutation: any;
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
      name: "",
      price: 0,
      classesCount: 1,
      validityDays: 30,
      isActive: true,
      ...defaultValues,
    },
    fieldLabels: {
      name: "Package Name",
      price: "Price",
      classesCount: "Number of Classes",
      validityDays: "Validity (Days)",
      isActive: "Status",
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

      <form.Field name="name">
        {(field) => (
          <FormFieldWrapper<string> field={field} label="Package Name">
            {(p) => (
              <Input
                {...p.inputProps}
                placeholder="e.g. Starter Pack. 5 Classes"
              />
            )}
          </FormFieldWrapper>
        )}
      </form.Field>

      <div className="grid gap-5 sm:grid-cols-3">
        <form.Field name="price">
          {(field) => (
            <FormFieldWrapper<number> field={field} label="Price (USD)">
              {(p) => (
                <Input
                  id={p.inputProps.id}
                  name={p.inputProps.name}
                  type="number"
                  min={0}
                  step={0.01}
                  value={p.inputProps.value}
                  onBlur={p.inputProps.onBlur}
                  onChange={(e) => p.onChangeValue(Number(e.target.value))}
                  aria-invalid={p.inputProps["aria-invalid"]}
                  placeholder="0.00"
                />
              )}
            </FormFieldWrapper>
          )}
        </form.Field>

        <form.Field name="classesCount">
          {(field) => (
            <FormFieldWrapper<number> field={field} label="Number of Classes">
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
                  placeholder="5"
                />
              )}
            </FormFieldWrapper>
          )}
        </form.Field>

        <form.Field name="validityDays">
          {(field) => (
            <FormFieldWrapper<number> field={field} label="Validity (Days)">
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
                  placeholder="30"
                />
              )}
            </FormFieldWrapper>
          )}
        </form.Field>
      </div>

      <form.Field name="isActive">
        {(field) => (
          <div className="flex flex-col gap-2">
            <Label>Status</Label>
            <div className="flex items-center gap-2 h-9">
              <Switch
                checked={field.state.value}
                onCheckedChange={field.handleChange}
                id="pkg-isActive"
              />
              <Label htmlFor="pkg-isActive" className="text-sm font-normal cursor-pointer">
                {field.state.value ? "Active (visible to students)" : "Inactive (hidden)"}
              </Label>
            </div>
          </div>
        )}
      </form.Field>

      <div className="flex justify-end pt-2">
        <SubmitButton isLoading={mutation.isPending}>Save Package</SubmitButton>
      </div>
    </form>
  );
}
