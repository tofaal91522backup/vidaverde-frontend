"use client";

import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/shared/form-related/password-input";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { GoogleSignInButton } from "@/features/auth/components/google-sign-in-button";
import { SignInAction } from "../actions/sign-in.action";

export default function SignInForm() {
  const router = useRouter();

  const [state, action, isPending] = useActionState(SignInAction, {
    errors: {},
  });

  /*
    Navigation shuru howar por-o page-ta ekhane-i thake — dashboard-er RSC
    payload asha porjonto. Oi shomoy-ta "kichu hocche na" mone hoy, tai button-e
    alada ekta obostha dekhano hoy.

    Eta state na, **derive** kora — effect-er bhitor setState dile
    `set-state-in-effect` lint-e atkato ar ekta bajey cascading render hoto.
  */
  const redirecting = state?.success === true && !isPending;

  // Effect duibar cholle navigate-o duibar hoto; ref render trigger kore na
  const navigated = useRef(false);

  useEffect(() => {
    if (!state?.success || isPending || navigated.current) return;

    navigated.current = true;
    toast.success("Login successful!");

    /*
      ⚠️ Order-ta ulto chhilo: `replace()` er **por-e** `refresh()` dile
      refresh-ta cholti route-take refetch kore ar **pending navigation-ta
      bati kore dey** — tai login-er por signin page-e-i atke thakto.

      Age `refresh()`, tar por navigate. Refresh-ta lage karon layout gula
      server-e session pore; na dile navbar ar sidebar purono (logged-out)
      RSC cache theke asto.
    */
    router.refresh();
    router.replace(state.redirectTo ?? "/");
  }, [state, isPending, router]);

  const busy = isPending || redirecting;

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
            href="/auth/forget-password"
            className="text-xs font-medium text-vv-accent-deep hover:text-vv-ink"
          >
            Forgot password?
          </Link>
        </div>
        <PasswordInput
          name="password"
          required
          autoComplete="current-password"
          placeholder="Enter your password"
        />
        {state?.errors?.password && (
          <p className="text-xs text-destructive">{state.errors.password}</p>
        )}
      </div>

      <Button type="submit" disabled={busy} className="w-full">
        {busy && <Spinner className="mr-2" />}
        {redirecting ? "Taking you to your dashboard…" : "Sign In"}
      </Button>

      <GoogleSignInButton text="signin_with" />

      {state?.errors?.formError && (
        <p className="rounded-lg border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.errors.formError}
        </p>
      )}

      <p className="text-center text-sm text-muted-foreground">
        New to Vida Verde?{" "}
        <Link
          href="/auth/registration"
          className="font-medium text-vv-accent-deep hover:text-vv-ink"
        >
          Create an account
        </Link>
      </p>
    </form>
  );
}
