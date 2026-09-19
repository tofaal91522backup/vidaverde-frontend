"use client";

import { HandTranslated } from "@/components/shared/by-language";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PasswordInput } from "@/components/shared/form-related/password-input";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { ResetPasswordAction } from "@/features/auth/pages/reset-password/actions/reset-password.action";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const ResetPasswordForm = ({ uid, token }: { uid: string; token: string }) => {
  const router = useRouter();

  const [state, action, isPending] = useActionState(ResetPasswordAction, {
    success: false,
    errors: {},
  });

  useEffect(() => {
    if (state.success === true) {
      toast.success("Password reset successfully");
      router.push("/auth/signin");
    }
  }, [state, router]);

  return (
    <Card className="w-full max-w-md vv-auth-card">
      <CardHeader>
        <CardTitle className="text-2xl text-vv-ink">
          Create a new password
        </CardTitle>
        <CardDescription>
          Choose a secure password for your Vida Verde account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-vv-ink">
              New password
            </label>
            <PasswordInput
              required
              name="new_password1"
              autoComplete="new-password"
              placeholder="Enter your new password"
            />
            {state.errors.new_password1 && (
              <p className="text-xs text-destructive">
                {state.errors.new_password1}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-vv-ink">
              <HandTranslated
                en="Confirm password"
                es="Confirmar contraseña"
              />
            </label>
            <PasswordInput
              required
              name="new_password2"
              autoComplete="new-password"
              placeholder="Confirm your new password"
            />
            {state.errors.new_password2 && (
              <p className="text-xs text-destructive">
                {state.errors.new_password2}
              </p>
            )}
          </div>

          <Input type="text" required name="uid" hidden defaultValue={uid} />
          <Input type="text" required name="token" hidden defaultValue={token} />

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending && <Spinner className="mr-2" />}
            Reset Password
          </Button>

          {state.errors.formError && (
            <p className="rounded-lg border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {state.errors.formError}
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default ResetPasswordForm;
