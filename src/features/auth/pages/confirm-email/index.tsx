"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { VerifyEmailAction } from "@/features/auth/pages/confirm-email/actions/verify-email.action";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Status = "loading" | "success" | "error";

const REDIRECT_AFTER_SECONDS = 3;

export default function ConfirmEmailPage({ token }: { token: string }) {
  const router = useRouter();

  // Token thaka na-thaka prothom render-ei jana — tai eta effect-e set kora hoy
  // na, initial state theke-i ashe (na hole ek ta extra render howa lagto ar
  // ek polok "Confirming your email…" dekhato)
  const [status, setStatus] = useState<Status>(token ? "loading" : "error");
  const [message, setMessage] = useState<string>(
    token ? "Confirming your email..." : "No confirmation token provided",
  );
  const [redirectTo, setRedirectTo] = useState<string>("/dashboard/student");
  const [countdown, setCountdown] = useState<number>(REDIRECT_AFTER_SECONDS);

  useEffect(() => {
    if (!token) return;

    let cancelled = false;

    (async () => {
      // Server action — client theke dakle session cookie set kora jeto na.
      const result = await VerifyEmailAction(decodeURIComponent(token));
      if (cancelled) return;

      setStatus(result.success ? "success" : "error");
      setMessage(result.message);
      if (result.redirectTo) setRedirectTo(result.redirectTo);
    })();

    return () => {
      cancelled = true;
    };
  }, [token]);

  useEffect(() => {
    if (status !== "success") return;

    if (countdown === 0) {
      // Action already session baniye diyeche, tai eta protected route-e jabe.
      // `refresh()` na dile layout-er purono (logged-out) session cache thakto.
      router.refresh();
      router.push(redirectTo);
      return;
    }

    const timer = setTimeout(() => setCountdown((n) => n - 1), 1000);
    return () => clearTimeout(timer);
  }, [status, countdown, redirectTo, router]);

  const isLoading = status === "loading";
  const isSuccess = status === "success";
  const isError = status === "error";

  return (
    <Card className="w-full max-w-md border-vv-line bg-white/95 text-center shadow-lg">
      <CardHeader className="items-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          {isLoading && <Loader2 className="animate-spin" />}
          {isSuccess && <CheckCircle2 />}
          {isError && <XCircle className="text-destructive" />}
        </div>
        <CardTitle className="text-2xl text-vv-ink">
          {isLoading && "Confirming your email"}
          {isSuccess && "Email confirmed"}
          {isError && "Confirmation failed"}
        </CardTitle>
        <CardDescription>{message}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {isLoading && (
          <p className="text-sm text-muted-foreground">
            Please wait while we verify your email address.
          </p>
        )}

        {isSuccess && (
          <>
            {/* Verify success mane backend token-o diyeche — user ekhon logged
                in. Tai "abar sign in koro" na bole shoja portal-e pathacchi. */}
            <p className="rounded-lg border border-vv-line bg-vv-bg-warm px-3 py-2 text-sm text-vv-muted">
              You&apos;re signed in. Taking you to your dashboard in{" "}
              <span className="font-semibold text-vv-accent-deep">
                {countdown}
              </span>{" "}
              seconds.
            </p>
            <Button
              onClick={() => {
                router.refresh();
                router.push(redirectTo);
              }}
              className="w-full"
            >
              Go to my dashboard
            </Button>
          </>
        )}

        {isError && (
          <>
            <div className="rounded-lg border border-vv-line bg-vv-bg-warm p-4 text-left text-sm text-vv-muted">
              <p className="mb-2 font-medium text-vv-ink">Possible reasons:</p>
              <ul className="list-inside list-disc">
                <li>The confirmation link has expired</li>
                <li>The link has already been used</li>
                <li>The link is invalid or corrupted</li>
              </ul>
            </div>
            {/* Key single-use — tai fail korle notun link chawa-i ekmatro pothe.
                Resend form-ta Step 4-e oi page-e boshbe. */}
            <Button asChild className="w-full">
              <Link href="/auth/verify-email">Send me a new link</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/auth/signin">Back to sign in</Link>
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
