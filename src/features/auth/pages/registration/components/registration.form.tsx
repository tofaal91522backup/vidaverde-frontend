"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { RegistrationAction } from "@/features/auth/pages/registration/actions/registration.action";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export default function RegistrationForm() {
  const router = useRouter();

  const [state, action, isPending] = useActionState(RegistrationAction, {
    success: false,
    errors: {},
  });

  useEffect(() => {
    if (state.success === true) {
      toast.success(state.success_text || "Registration successful");
      router.push("/verify-email");
    }
  }, [state, router]);

  return (
    <form action={action} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-vv-ink">Name</label>
        <Input name="username" type="text" required placeholder="Your name" />
        {state.errors.username && (
          <p className="text-xs text-destructive">{state.errors.username}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-vv-ink">Email</label>
        <Input
          name="email"
          type="email"
          required
          placeholder="Enter your email"
        />
        {state.errors.email && (
          <p className="text-xs text-destructive">{state.errors.email}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-vv-ink">Password</label>
        <Input
          name="password1"
          type="password"
          required
          placeholder="Create a password"
        />
        {state.errors.password1 && (
          <p className="text-xs text-destructive">{state.errors.password1}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-vv-ink">
          Confirm password
        </label>
        <Input
          name="password2"
          type="password"
          required
          placeholder="Confirm your password"
        />
        {state.errors.password2 && (
          <p className="text-xs text-destructive">{state.errors.password2}</p>
        )}
      </div>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending && <Spinner className="mr-2" />}
        Create Account
      </Button>

      {state.errors.formError && (
        <p className="rounded-lg border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.errors.formError}
        </p>
      )}

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/signin"
          className="font-medium text-vv-accent-deep hover:text-vv-ink"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
