import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import SignInForm from "./sign-in.form";

export default function SignInIndex() {
  return (
    <Card className="w-full max-w-md vv-auth-card">
      <CardHeader>
        <CardTitle className="text-2xl text-vv-ink">Welcome back</CardTitle>
        <CardDescription>
          Sign in to continue to your Vida Verde dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignInForm />
      </CardContent>
    </Card>
  );
}
