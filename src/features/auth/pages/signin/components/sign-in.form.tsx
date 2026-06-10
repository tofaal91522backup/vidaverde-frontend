"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { SignInAction } from "../actions/sign-in.action";

export default function SignInForm() {
  const router = useRouter();

  const [state, action, isPending] = useActionState(SignInAction, {
    errors: {},
  });

  useEffect(() => {
    if (state?.success && !isPending) {
      router.refresh();
      toast.success("Login successful!");
    }
  }, [state, isPending, router]);

  return (
    <form action={action} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-vv-ink">Email</label>
        <Input
          name="email"
          type="email"
          required
          placeholder="Enter your email"
        />
        {state?.errors?.email && (
          <p className="text-xs text-destructive">{state.errors.email}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-3">
          <label className="text-sm font-medium text-vv-ink">Password</label>
          <Link
            href="/forget-password"
            className="text-xs font-medium text-vv-accent-deep hover:text-vv-ink"
          >
            Forgot password?
          </Link>
        </div>
        <Input
          name="password"
          type="password"
          required
          placeholder="Enter your password"
        />
        {state?.errors?.password && (
          <p className="text-xs text-destructive">{state.errors.password}</p>
        )}
      </div>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending && <Spinner className="mr-2" />}
        Sign In
      </Button>

      {state?.errors?.formError && (
        <p className="rounded-lg border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.errors.formError}
        </p>
      )}

      <p className="text-center text-sm text-muted-foreground">
        New to Vida Verde?{" "}
        <Link
          href="/registration"
          className="font-medium text-vv-accent-deep hover:text-vv-ink"
        >
          Create an account
        </Link>
      </p>
    </form>
  );
}
