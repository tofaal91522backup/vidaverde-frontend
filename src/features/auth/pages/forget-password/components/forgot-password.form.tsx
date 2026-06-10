"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { ForgotPasswordAction } from "@/features/auth/pages/forget-password/actions/forget-password.action";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const ForgotPasswordForm = () => {
  const [state, action, isPending] = useActionState(ForgotPasswordAction, {
    success: false,
    errors: {},
  });

  useEffect(() => {
    if (state.success === true) {
      toast.success(state.success_text);
    }
  }, [state]);

  return (
    <Card className="w-full max-w-md border-vv-line bg-white/95 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl text-vv-ink">Reset password</CardTitle>
        <CardDescription>
          Enter your email address and we will send you a reset link.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-vv-ink">Email</label>
            <Input
              type="email"
              required
              name="email"
              placeholder="Email address"
            />
            {state.errors.email && (
              <p className="text-xs text-destructive">{state.errors.email}</p>
            )}
          </div>

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending && <Spinner className="mr-2" />}
            Send Reset Link
          </Button>

          {state.errors.formError && (
            <p className="rounded-lg border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {state.errors.formError}
            </p>
          )}

          <Link
            href="/signin"
            className="text-center text-sm font-medium text-vv-accent-deep hover:text-vv-ink"
          >
            Back to sign in
          </Link>
        </form>
      </CardContent>
    </Card>
  );
};

export default ForgotPasswordForm;
