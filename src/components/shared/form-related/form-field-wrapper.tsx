"use client";

import * as React from "react";
import type { AnyFieldApi } from "@tanstack/react-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

type ChildProps<T> = {
  isInvalid: boolean;
  // ✅ ready props for <Input />
  inputProps: {
    id: string;
    name: string;
    value: T;
    onBlur: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    "aria-invalid": boolean;
  };

  onChangeValue: (value: T) => void;
};

export function FormFieldWrapper<T>({
  field,
  label,
  children,
  required,
  optional,
}: {
  field: AnyFieldApi;
  label: string;
  children: (p: ChildProps<T>) => React.ReactNode;
  /** Label-er pashe lal `*` */
  required?: boolean;
  /** Label-er pashe muted "Optional" — kon field chara-o save hoy bujhate */
  optional?: boolean;
}) {
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  const inputProps = {
    id: field.name,
    name: field.name,
    value: field.state.value as T,
    onBlur: field.handleBlur,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      field.handleChange(e.target.value as any),
    "aria-invalid": isInvalid,
  };

  return (
    <Field data-invalid={isInvalid} className="flex flex-col gap-1">
      <FieldLabel htmlFor={field.name}>
        <span>
          {label}
          {required && (
            <span aria-hidden className="ml-0.5 text-destructive">
              *
            </span>
          )}
        </span>
        {optional && (
          <span className="text-xs font-normal text-muted-foreground">
            Optional
          </span>
        )}
      </FieldLabel>

      {children({
        isInvalid,
        inputProps,
        onChangeValue: field.handleChange as any,
      })}

      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}
