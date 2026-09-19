"use client";

import { FormFieldWrapper } from "@/components/shared/form-related/form-field-wrapper";
import { FormSection } from "@/components/shared/form-related/form-section";
import { PasswordInput } from "@/components/shared/form-related/password-input";
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
import { KeyRound, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  AdminAccountSchema,
  type AdminAccountFormValues,
} from "../schemas/admin-account.schema";

const ROLE_OPTIONS = [
  { value: "manager", label: "Manager: runs the school" },
  { value: "master", label: "Master: also manages admin accounts" },
];

type AdminAccountFormProps = {
  mutation: AnyMutationLike<AdminAccountFormValues>;
  defaultValues?: Partial<AdminAccountFormValues>;
  mode: "create" | "edit";
  /** Nijer account — role ar active lock; nije-ke namale/bondho korle bahire pore jabe */
  isSelf?: boolean;
};

export function AdminAccountForm({
  mutation,
  defaultValues,
  mode,
  isSelf = false,
}: AdminAccountFormProps) {
  const router = useRouter();
  const isCreate = mode === "create";
  const wasInactive = !isCreate && defaultValues?.active === false;

  const { form, submitErrors } = useZodTanstackForm<AdminAccountFormValues>({
    schema: AdminAccountSchema({ requirePassword: isCreate, wasInactive }),
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
      email: "Login email",
      name: "Display name",
      password: "Password",
      role: "Access role",
    },
    onValidSubmit: () => router.push("/dashboard/admin/admins"),
  });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-5"
    >
      <SubmitErrorSummary errors={submitErrors} />

      <FormSection
        title="Account"
        description="The email is also the username, and cannot be changed later."
        icon={UserRound}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {isCreate ? (
            <form.Field name="email">
              {(field) => (
                <FormFieldWrapper<string> field={field} label="Login email">
                  {(p) => (
                    <Input {...p.inputProps} type="email" autoComplete="off" />
                  )}
                </FormFieldWrapper>
              )}
            </form.Field>
          ) : (
            <div className="space-y-1.5">
              <Label htmlFor="admin-email">Login email</Label>
              <Input
                id="admin-email"
                value={defaultValues?.email ?? ""}
                readOnly
                disabled
              />
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
      </FormSection>

      <FormSection
        title="Access"
        description={
          isSelf
            ? "This is your own account. Another master has to change your role or deactivate you."
            : "Managers can use everything except this page. Deactivated admins cannot sign in."
        }
        icon={KeyRound}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <form.Field name="role">
            {(field) => (
              <FormFieldWrapper<"master" | "manager">
                field={field}
                label="Access role"
              >
                {(p) => (
                  <ReusableSelect
                    {...p.inputProps}
                    disabled={isSelf}
                    options={ROLE_OPTIONS}
                    onChange={(event) =>
                      p.onChangeValue(
                        event.target.value as "master" | "manager",
                      )
                    }
                  />
                )}
              </FormFieldWrapper>
            )}
          </form.Field>

          <form.Field name="password">
            {(field) => (
              <FormFieldWrapper<string>
                field={field}
                label={isCreate ? "Password" : "New password"}
              >
                {(p) => (
                  <PasswordInput
                    {...p.inputProps}
                    autoComplete="new-password"
                    placeholder={
                      isCreate
                        ? "At least 6 characters"
                        : "Leave blank to keep the current one"
                    }
                  />
                )}
              </FormFieldWrapper>
            )}
          </form.Field>
        </div>

        {!isCreate && (
          <form.Field name="active">
            {(field) => (
              <div className="mt-5 flex items-start gap-3 rounded-lg border p-4">
                <Switch
                  id="admin-active"
                  checked={field.state.value}
                  disabled={isSelf}
                  onCheckedChange={field.handleChange}
                />
                <div>
                  <Label htmlFor="admin-active">Account active</Label>
                  <p className="text-xs text-muted-foreground">
                    {wasInactive
                      ? "Turning this on also needs a new password above. The old one no longer works after deactivation."
                      : "Turn off to stop this admin signing in. Their blog posts keep their name."}
                  </p>
                </div>
              </div>
            )}
          </form.Field>
        )}
      </FormSection>

      <div className="flex justify-end">
        <SubmitButton isLoading={mutation.isPending}>
          {isCreate ? "Create admin" : "Save changes"}
        </SubmitButton>
      </div>
    </form>
  );
}
