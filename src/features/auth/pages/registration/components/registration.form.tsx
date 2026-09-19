"use client";

import { HandTranslated } from "@/components/shared/by-language";
import { Button } from "@/components/ui/button";
import { GoogleSignInButton } from "@/features/auth/components/google-sign-in-button";
import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Spinner } from "@/components/ui/spinner";
import { Combobox } from "@/components/shared/form-related/combobox";
import { PasswordInput } from "@/components/shared/form-related/password-input";
import { PasswordRequirements } from "@/components/shared/form-related/password-requirements";
import { PhoneInput } from "@/components/shared/form-related/phone-input";
import { COUNTRY_OPTIONS } from "@/constants/countries";
import { SPANISH_LEVEL_OPTIONS } from "@/constants/spanish-levels";
import { RegistrationAction } from "@/features/auth/pages/registration/actions/registration.action";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

function Field({
  label,
  error,
  optional,
  children,
}: {
  /** Node — kichu label hate lekha Spanish (`HandTranslated`) */
  label: React.ReactNode;
  error?: string[];
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-vv-ink">
        {label}
        {optional && (
          <span className="ml-1 font-normal text-muted-foreground">
            (optional)
          </span>
        )}
      </label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

export default function RegistrationForm() {
  const router = useRouter();
  const timezoneRef = useRef<HTMLInputElement>(null);

  // Combobox controlled — value ta hidden input diye FormData-te jay
  const [country, setCountry] = useState("");

  /* Checklist-ta live dekhate hoy, tai ei ekta field controlled. Baki gula
     uncontrolled-i thake — form-ta FormData diye submit hoy (Pattern B). */
  const [password, setPassword] = useState("");

  const [state, action, isPending] = useActionState(RegistrationAction, {
    success: false,
    errors: {},
  });

  // Browser-er zone shudhu client-e jana jay. Server render-e eta khali thake,
  // ar khali value action-e strip hoye jay — tokhon backend school-er zone dhore
  // ney. Tai ekhane state na rekhe shoja DOM value boshanoi jothesto (state
  // rakhle shudhu ek ta extra render hoto, ar `set-state-in-effect` lint-o lagto).
  useEffect(() => {
    if (!timezoneRef.current) return;
    timezoneRef.current.value =
      Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
  }, []);

  useEffect(() => {
    if (state.success !== true) return;

    toast.success(state.success_text || "Registration successful");

    // Backend-e email verification on thakle token ashe na — tokhon verify page-e.
    // Off thakle action already session baniye diyeche, shoja portal-e.
    if (state.verificationRequired) {
      router.push(
        `/auth/verify-email${state.email ? `?email=${encodeURIComponent(state.email)}` : ""}`,
      );
      return;
    }

    /*
      Ekhane session-ta already toiri (verification off thakle action-i
      baniyeche). `refresh()` chhara layout gula purono logged-out RSC cache
      theke render hoto — navbar-e "Sign in" jhulto ar sidebar-e naam asto na.
    */
    router.refresh();
    router.push(state.redirectTo || "/dashboard/student");
  }, [state, router]);

  return (
    <form action={action} className="flex flex-col gap-4">
      <input ref={timezoneRef} type="hidden" name="timezone" />

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Google "Nombre de pila" likhto */}
        <Field
          label={<HandTranslated en="First name" es="Nombre" />}
          error={state.errors.first_name}
        >
          <Input name="first_name" type="text" required placeholder="Nueva" />
        </Field>

        <Field label="Last name" error={state.errors.last_name} optional>
          <Input name="last_name" type="text" placeholder="Estudiante" />
        </Field>
      </div>

      <Field label="Email" error={state.errors.email}>
        <Input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Enter your email"
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Password" error={state.errors.password1}>
          <PasswordInput
            name="password1"
            required
            minLength={8}
            autoComplete="new-password"
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>

        <Field
          label={
            <HandTranslated en="Confirm password" es="Confirmar contraseña" />
          }
          error={state.errors.password2}
        >
          <PasswordInput
            name="password2"
            required
            autoComplete="new-password"
            placeholder="Confirm your password"
          />
        </Field>
      </div>

      {/* Backend ki ki chay — probe kore ber kora asol niyom. Na dile keu
          8-er kom ba shudhu-number password diye submit korto ar server-er
          error-e giye thamto. */}
      <PasswordRequirements value={password} />

      <Field
        label="Your Spanish level"
        error={state.errors.current_spanish_level}
      >
        <NativeSelect name="current_spanish_level" defaultValue="none">
          {SPANISH_LEVEL_OPTIONS.map((option) => (
            <NativeSelectOption key={option.value} value={option.value}>
              {option.label}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </Field>

      {/* Age Country ar Phone alada duita row chhilo, tai card-ta ekta lomba
          patti hoye jeto. Duita-i chhoto field, pashapashi-i thik. */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Country" error={state.errors.country} optional>
          {/* `name` dile bhitore hidden input boshe, tai FormData-te chole jay */}
          <Combobox
            name="country"
            value={country}
            onChange={setCountry}
            options={COUNTRY_OPTIONS}
            // Google "Seleccione su país" (usted); baki form "tú"
            placeholder={
              <HandTranslated
                en="Select your country"
                es="Selecciona tu país"
              />
            }
            searchPlaceholder="Search country..."
          />
        </Field>

        <Field label="Phone" error={state.errors.phone_number} optional>
          {/* `name` dile bhitore ekta hidden input-e jora number ta bose */}
          <PhoneInput name="phone_number" />
        </Field>
      </div>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending && <Spinner className="mr-2" />}
        Create Account
      </Button>

      <GoogleSignInButton text="signup_with" />

      {state.errors.timezone && (
        <p className="text-xs text-destructive">{state.errors.timezone}</p>
      )}

      {state.errors.formError && (
        <p className="rounded-lg border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.errors.formError}
        </p>
      )}

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/auth/signin"
          className="font-medium text-vv-accent-deep hover:text-vv-ink"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
