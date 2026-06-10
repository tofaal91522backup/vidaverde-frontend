import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RegistrationForm from "./registration.form";

export default function RegistrationIndex() {
  return (
    <Card className="w-full max-w-md border-vv-line bg-white/95 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl text-vv-ink">
          Create your account
        </CardTitle>
        <CardDescription>
          Register to manage bookings and access your Vida Verde dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RegistrationForm />
      </CardContent>
    </Card>
  );
}
