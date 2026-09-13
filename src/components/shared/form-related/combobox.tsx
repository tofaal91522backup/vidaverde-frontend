"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useMemo, useRef, useState } from "react";

export type ComboboxOption = { value: string; label: string };

/**
 * Khuje bachai kora select.
 *
 * ⚠️ **Keno `cmdk`/shadcn Command ana holo na:** ei project-e oi dependency nai,
 * ar ekta control-er jonno notun package ana bhari. Popover + Input + filter
 * kora list-e ja dorkar ta hoye jay.
 *
 * Keno dorkar: country list-e **242 ta** entry. Native `<select>` e oto lomba
 * list-e nijer desh khuje ber kora jontrona — bishesh kore mobile-e.
 *
 * `name` dile ekta hidden input boshe, tai `<form action={…}>` (Pattern B)
 * theke-o FormData-te chole jay.
 */
export function Combobox({
  value,
  onChange,
  options,
  placeholder = "Select",
  searchPlaceholder = "Search...",
  emptyText = "No match",
  name,
  id,
  disabled,
  className,
  triggerClassName,
  /**
   * Trigger-e ki lekha thakbe. Na dile option-er puro label.
   * Chhoto trigger-e (jemon phone-er dial code) puro label truncate hoye jay,
   * tai oikhane chhoto kore kichu dekhano jay.
   */
  triggerLabel,
  "aria-invalid": ariaInvalid,
  onBlur,
}: {
  value?: string;
  onChange?: (value: string) => void;
  options: ReadonlyArray<ComboboxOption>;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  /** Dile hidden input render hoy — FormData-r jonno */
  name?: string;
  id?: string;
  disabled?: boolean;
  className?: string;
  /** Trigger-er nijer class — marketing form-er vv-* style-er jonno */
  triggerClassName?: string;
  triggerLabel?: string;
  "aria-invalid"?: boolean;
  onBlur?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  const selected = options.find((option) => option.value === value);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((option) => option.label.toLowerCase().includes(q));
  }, [options, query]);

  const select = (next: string) => {
    onChange?.(next);
    setOpen(false);
    setQuery("");
  };

  return (
    <div className={cn("w-full", className)}>
      <Popover
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          if (!next) {
            setQuery("");
            onBlur?.();
          }
        }}
      >
        <PopoverTrigger asChild>
          <Button
            id={id}
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-invalid={ariaInvalid}
            disabled={disabled}
            className={cn(
              "w-full justify-between font-normal",
              !selected && "text-muted-foreground",
              triggerClassName,
            )}
          >
            <span className="truncate">
              {triggerLabel ?? selected?.label ?? placeholder}
            </span>
            <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          className="w-(--radix-popover-trigger-width) min-w-56 p-0"
        >
          <div className="border-b p-2">
            <Input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="h-9"
              onKeyDown={(e) => {
                // Enter-e prothom match — puro list-e na neme bachai kora jay
                if (e.key === "Enter" && filtered[0]) {
                  e.preventDefault();
                  select(filtered[0].value);
                }
              }}
            />
          </div>

          <div ref={listRef} className="max-h-64 overflow-y-auto p-1">
            {filtered.length === 0 ? (
              <p className="px-2 py-4 text-center text-sm text-muted-foreground">
                {emptyText}
              </p>
            ) : (
              filtered.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => select(option.value)}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm transition hover:bg-accent hover:text-accent-foreground",
                    option.value === value && "bg-accent/60",
                  )}
                >
                  <Check
                    className={cn(
                      "size-4 shrink-0",
                      option.value === value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  <span className="truncate">{option.label}</span>
                </button>
              ))
            )}
          </div>
        </PopoverContent>
      </Popover>

      {name && <input type="hidden" name={name} value={value ?? ""} />}
    </div>
  );
}
