import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ResendVerificationForm from "@/features/auth/pages/verify-email/components/resend-verification-form";
import { MailCheck } from "lucide-react";
import Link from "next/link";

/**
 * Registration-er por ei page-e asha jay, ba confirm-email fail korle
 * "Send me a new link" theke.
 *
 * `email` query param registration action theke ashe — thakle resend form-e
 * prefill hoy, na thakle user nijei likhbe (expired link theke ashle emon hoy).
 */
const VerifyEmailIndex = ({ email }: { email?: string }) => {
  return (
    <Card className="w-full max-w-md vv-auth-card text-center">
      <CardHeader className="items-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <MailCheck />
        </div>
        <CardTitle className="text-2xl text-vv-ink">Check your email</CardTitle>
        <CardDescription>
          {email ? (
            <>
              We sent a verification link to{" "}
              <span className="font-medium text-vv-ink">{email}</span>. Open your
              inbox and click the link to activate your account.
            </>
          ) : (
            <>
              We sent a verification link to your email address. Open your inbox
              and click the link to activate your account.
            </>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p className="text-xs text-muted-foreground">
          Check your spam folder if it isn&apos;t there within a minute.
        </p>

        <ResendVerificationForm defaultEmail={email} />

        <Button className="w-full" variant="ghost" asChild>
          <Link href="/auth/signin">Back to sign in</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default VerifyEmailIndex;
