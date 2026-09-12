"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useResendVerification } from "@/features/auth/pages/verify-email/queries/use-resend-verification";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

/** Backend-e rate limit nai, tai double-click/spam ekhane-i thamano hoy. */
const COOLDOWN_SECONDS = 30;

export default function ResendVerificationForm({
  defaultEmail = "",
}: {
  defaultEmail?: string;
}) {
  const [email, setEmail] = useState(defaultEmail);
  const [cooldown, setCooldown] = useState(0);
  const [sentMessage, setSentMessage] = useState<string | null>(null);

  const resend = useResendVerification();

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((n) => n - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email || cooldown > 0 || resend.isPending) return;

    resend.mutate(
      { email },
      {
        onSuccess: (data) => {
          // Backend-er message hubohu. Eta iccha kore ambiguous ("If that
          // address needs confirming...") — email ta asholei registered kina
          // seta faash na korar jonno. Nijer theke kichu bola jabe na.
          setSentMessage(
            data?.message ||
              "If that address needs confirming, a new link is on its way.",
          );
          setCooldown(COOLDOWN_SECONDS);
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-left">
      <label
        htmlFor="resend-email"
        className="text-sm font-medium text-vv-ink"
      >
        Didn&apos;t get the email?
      </label>

      <Input
        id="resend-email"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="Enter your email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />

      <Button
        type="submit"
        variant="outline"
        className="w-full"
        disabled={!email || cooldown > 0 || resend.isPending}
      >
        {resend.isPending && <Spinner className="mr-2" />}
        {cooldown > 0 ? `Send again in ${cooldown}s` : "Send a new link"}
      </Button>

      {sentMessage && (
        <p className="flex items-start gap-2 rounded-lg border border-vv-line bg-vv-bg-warm px-3 py-2 text-sm text-vv-muted">
          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-vv-accent-deep" />
          {sentMessage}
        </p>
      )}
    </form>
  );
}
