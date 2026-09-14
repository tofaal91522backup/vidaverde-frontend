"use client";

import { cn } from "@/lib/utils";
import { Check, Circle, Info } from "lucide-react";

/*
  Backend-er asol niyom gula — live API-te probe kore ber kora, onuman na:

    "abc123"      -> (password1) Ensure this field has at least 8 characters.
    "9184726355"  -> This password is entirely numeric.
    "password123" -> This password is too common.

  Uppercase ba symbol-er kono shorto **nai**, tai sheta dekhano hoy na — je
  niyom nai seta dekhale manush oikarone kothin password banay ar tar por-o
  bujhte pare na keno atkacche.
*/
export const PASSWORD_MIN_LENGTH = 8;

export const isLongEnough = (v: string) => v.length >= PASSWORD_MIN_LENGTH;
export const isNotAllDigits = (v: string) => !/^\d+$/.test(v);

export function PasswordRequirements({ value }: { value: string }) {
  const rules = [
    { label: `At least ${PASSWORD_MIN_LENGTH} characters`, ok: isLongEnough(value) },
    { label: "Not only numbers", ok: isNotAllDigits(value) },
  ];

  return (
    <ul className="mt-2 space-y-1 text-xs">
      {rules.map((rule) => (
        <li
          key={rule.label}
          className={cn(
            "flex items-center gap-1.5",
            rule.ok ? "text-vv-accent-deep" : "text-muted-foreground",
          )}
        >
          {rule.ok ? (
            <Check className="size-3.5 shrink-0" aria-hidden="true" />
          ) : (
            <Circle className="size-3.5 shrink-0" aria-hidden="true" />
          )}
          {rule.label}
        </li>
      ))}

      {/* Ei ta ekhane jachai kora jay na — Django-r common-password list-ta
          server-e, tai shudhu bole dewaa hoy */}
      <li className="flex items-center gap-1.5 text-muted-foreground">
        <Info className="size-3.5 shrink-0" aria-hidden="true" />
        Not a common password (e.g. &ldquo;password123&rdquo;)
      </li>
    </ul>
  );
}
