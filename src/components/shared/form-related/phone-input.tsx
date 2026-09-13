"use client";

import { Combobox } from "@/components/shared/form-related/combobox";
import { Input } from "@/components/ui/input";
import {
  DEFAULT_DIAL_COUNTRY,
  DIAL_CODE_OPTIONS,
  dialCodeOf,
  joinPhone,
  splitPhone,
} from "@/constants/countries";
import { cn } from "@/lib/utils";
import { useState } from "react";

/**
 * Dial-code select + number input, ek shathe **ekta string** banay.
 *
 * Backend `phone_number` ke ekta free-text string hisebe rakhe ("+34 600 123
 * 456"), tai duita control-er mil-e oi ek-i shape toiri hoy — API te kono
 * bodol lage na.
 *
 * Duita bhabe cholte pare:
 * - **Controlled** — `value` + `onChange` (TanStack form field).
 * - **FormData** — `name` dile ekta hidden input-e jora value ta bose, tai
 *   `<form action={…}>` (auth page gula Pattern B) theke-o kaj kore.
 */
export function PhoneInput({
  value = "",
  onChange,
  name,
  id,
  placeholder = "1712 345678",
  disabled,
  className,
  "aria-invalid": ariaInvalid,
  onBlur,
}: {
  value?: string;
  onChange?: (value: string) => void;
  /** Dile hidden input render hoy — FormData-r jonno */
  name?: string;
  id?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  "aria-invalid"?: boolean;
  onBlur?: () => void;
}) {
  /*
    Number-ta `value` theke **derive** kora hoy, copy kore state-e rakha hoy na —
    tai prop ar UI kokhono alada hote pare na.

    Kintu dial country-ta state, ar seta ichchha kore: `joinPhone` number khali
    hole khali string dey (khali "+880" pathanor mane nai), tai number muche
    fellei derive kora country default-e fire jeto — user Germany beche
    number muchle select Ecuador hoye jeto.

    Mount-er shomoy ekbar `value` theke newa hoy. Edit form gula data asar
    **por-e** mount hoy (`{data && <Form defaultValues={…} />}`), tai oita jotheshto.
  */
  const local = splitPhone(value).number;
  const [countryCode, setCountryCode] = useState(
    () => splitPhone(value).countryCode || DEFAULT_DIAL_COUNTRY,
  );

  const emit = (nextCountry: string, nextLocal: string) => {
    onChange?.(joinPhone(nextCountry, nextLocal));
  };

  /*
    Trigger-e shudhu dial code ("+880") dekhano hoy, puro naam na — ei ghor ta
    chhoto, "Bangladesh (+880)" truncate hoye "Banglad…" hoye jeto ar **asol
    kaj-er ongsho-ta-i** heriye jeto. Puro naam list-er bhitore ache, jekhane
    khoja hoy.
  */
  const triggerLabel = dialCodeOf(countryCode) || "Code";

  return (
    // Duita control gaye lagano — majher border ekta (`-ml-px`), ar pashapashi
    // corner gula shoja. Dekhte ekta field, kintu bhitore duita control.
    <div className={cn("flex", className)}>
      <Combobox
        className="w-36 shrink-0"
        triggerClassName="rounded-r-none"
        value={countryCode}
        options={DIAL_CODE_OPTIONS}
        triggerLabel={triggerLabel}
        placeholder="Code"
        searchPlaceholder="Search country..."
        disabled={disabled}
        onChange={(next) => {
          setCountryCode(next);
          emit(next, local);
        }}
      />

      <Input
        id={id}
        type="tel"
        inputMode="tel"
        className="-ml-px flex-1 rounded-l-none"
        placeholder={placeholder}
        value={local}
        disabled={disabled}
        aria-invalid={ariaInvalid}
        onBlur={onBlur}
        onChange={(e) => emit(countryCode, e.target.value)}
      />

      {/* FormData-r jonno — server action `phone_number` ekta puro string hisebe pay */}
      {name && (
        <input type="hidden" name={name} value={joinPhone(countryCode, local)} />
      )}
    </div>
  );
}
