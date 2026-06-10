import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { MailCheck } from "lucide-react";
import Link from "next/link";

const VerifyEmailIndex = () => {
  return (
    <Card className="w-full max-w-md border-vv-line bg-white/95 text-center shadow-lg">
      <CardHeader className="items-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <MailCheck />
        </div>
        <CardTitle className="text-2xl text-vv-ink">Check your email</CardTitle>
        <CardDescription>
          We sent a verification link to your email address. Open your inbox and
          click the link to verify your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Button className="w-full" asChild>
          <Link href="/signin">Go to Sign In</Link>
        </Button>
        <p className="text-xs text-muted-foreground">
          Did not receive the email? Check your spam folder or try again.
        </p>
      </CardContent>
    </Card>
  );
};

export default VerifyEmailIndex;
