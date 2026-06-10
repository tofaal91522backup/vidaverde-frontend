"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import unAuthorizedApiClient from "@/lib/http/public-api-client";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function ConfirmEmailPage({ token }: { token: string }) {
  const router = useRouter();

  const [status, setStatus] = useState<Status>("loading");
  const [message, setMessage] = useState<string>("Confirming your email...");
  const [countdown, setCountdown] = useState<number>(5);

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("No confirmation token provided");
      return;
    }

    const decodedToken = decodeURIComponent(token);

    (async () => {
      try {
        const res = await unAuthorizedApiClient.post(
          "/rest-auth/registration/account-confirm-email/",
          { key: decodedToken },
        );

        setStatus("success");
        setMessage(
          res?.data?.detail ||
            "Your email has been successfully confirmed. You can now sign in.",
        );
      } catch (err: any) {
        setStatus("error");
        const errorMsg =
          err?.response?.data?.detail ||
          err?.response?.data?.message ||
          err?.response?.data?.non_field_errors?.[0] ||
          "Email confirmation failed. The link may be invalid or expired.";
        setMessage(errorMsg);
      }
    })();
  }, [token]);

  useEffect(() => {
    if (status === "success" && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }

    if (status === "success" && countdown === 0) {
      router.push("/signin");
    }
  }, [status, countdown, router]);

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
            <p className="rounded-lg border border-vv-line bg-vv-bg-warm px-3 py-2 text-sm text-vv-muted">
              Redirecting to sign in in{" "}
              <span className="font-semibold text-vv-accent-deep">
                {countdown}
              </span>{" "}
              seconds.
            </p>
            <Button onClick={() => router.push("/signin")} className="w-full">
              Go to Sign In Now
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
            <Button onClick={() => router.push("/")} className="w-full">
              Go to Home
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
