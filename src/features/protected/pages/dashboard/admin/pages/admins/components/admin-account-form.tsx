"use client";

import { FormFieldWrapper } from "@/components/shared/form-related/form-field-wrapper";
import { ReusableSelect } from "@/components/shared/form-related/reusable-select";
import { SubmitButton } from "@/components/shared/form-related/submit-button";
import { SubmitErrorSummary } from "@/components/shared/form-related/submit-error-summary";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  useZodTanstackForm,
  type AnyMutationLike,
} from "@/hooks/use-zod-tanstack-form";
import { useRouter } from "next/navigation";
import {
  AdminAccountSchema,
  type AdminAccountFormValues,
} from "../schemas/admin-account.schema";

const ROLE_OPTIONS = [
  { value: "manager", label: "Manager" },
  { value: "master", label: "Master" },
];

type AdminAccountFormProps = {
  mutation: AnyMutationLike<AdminAccountFormValues>;
  defaultValues?: Partial<AdminAccountFormValues>;
  mode: "create" | "edit";
};

export function AdminAccountForm({
  mutation,
  defaultValues,
  mode,
}: AdminAccountFormProps) {
  const router = useRouter();
  const isCreate = mode === "create";
  const { form, submitErrors } = useZodTanstackForm<AdminAccountFormValues>({
    schema: AdminAccountSchema(isCreate),
    mutation,
    defaultValues: {
      email: "",
      name: "",
      password: "",
      role: "manager",
      active: true,
      ...defaultValues,
    },
    fieldLabels: {
      email: "Email",
      name: "Name",
      password: "Password",
      role: "Role",
    },
    onValidSubmit: () => router.push("/dashboard/admin/admins"),
  });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-6"
    >
      <SubmitErrorSummary errors={submitErrors} />

      <div className="grid gap-5 sm:grid-cols-2">
        {isCreate ? (
          <form.Field name="email">
            {(field) => (
              <FormFieldWrapper<string> field={field} label="Login email">
                {(p) => <Input {...p.inputProps} type="email" />}
              </FormFieldWrapper>
            )}
          </form.Field>
        ) : (
          <div className="space-y-1.5">
            <Label>Login email</Label>
            <Input value={defaultValues?.email ?? ""} readOnly disabled />
            <p className="text-xs text-muted-foreground">
              The login email cannot be changed.
            </p>
          </div>
        )}

        <form.Field name="name">
          {(field) => (
            <FormFieldWrapper<string> field={field} label="Display name">
              {(p) => <Input {...p.inputProps} />}
            </FormFieldWrapper>
          )}
        </form.Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <form.Field name="role">
          {(field) => (
            <FormFieldWrapper<"master" | "manager"> field={field} label="Access role">
              {(p) => (
                <ReusableSelect
                  {...p.inputProps}
                  options={ROLE_OPTIONS}
                  onChange={(event) => p.onChangeValue(event.target.value as "master" | "manager")}
                />
              )}
            </FormFieldWrapper>
          )}
        </form.Field>

        <form.Field name="password">
          {(field) => (
            <FormFieldWrapper<string>
              field={field}
              label={isCreate ? "Password" : "Reset password"}
            >
              {(p) => (
                <Input
                  {...p.inputProps}
                  type="password"
                  autoComplete="new-password"
                  placeholder={isCreate ? "At least 6 characters" : "Leave blank to keep current password"}
                />
              )}
            </FormFieldWrapper>
          )}
        </form.Field>
      </div>

      {!isCreate && (
        <form.Field name="active">
          {(field) => (
            <div className="flex items-center gap-3 rounded-lg border p-4">
              <Switch
                id="admin-active"
                checked={field.state.value}
                onCheckedChange={field.handleChange}
              />
              <div>
                <Label htmlFor="admin-active">Account active</Label>
                <p className="text-xs text-muted-foreground">
                  Inactive admins cannot sign in.
                </p>
              </div>
            </div>
          )}
        </form.Field>
      )}

      <div className="flex justify-end">
        <SubmitButton isLoading={mutation.isPending}>
          {isCreate ? "Create admin" : "Save changes"}
        </SubmitButton>
      </div>
    </form>
  );
}
