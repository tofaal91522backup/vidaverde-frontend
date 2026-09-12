"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SCHOOL_TIMEZONE_LABEL } from "@/features/protected/pages/dashboard/admin/utils/format-school-datetime";
import { Plus, X } from "lucide-react";
import {
  WEEK_DAYS,
  type AvailabilityRuleValue,
} from "../schemas/teacher.schema";

/**
 * Weekly availability editor.
 *
 * ⚠️ Purono mock-e eta chhilo ekta slot grid (`{ monday: ["09:00","10:00"] }`)
 * — ek ek ghonta tick kora. Backend-e shape puro alada: **time range**-er list
 * (`[{ day: "mon", start: "08:00", end: "16:00" }]`). Bookable slot backend
 * nijei ei range theke hisheb kore (booked class ar time-off bad diye), tai
 * ekhane ghonta tick korar kichu nai.
 */
export function AvailabilityEditor({
  value,
  onChange,
}: {
  value: AvailabilityRuleValue[];
  onChange: (rules: AvailabilityRuleValue[]) => void;
}) {
  const rules = value ?? [];

  const addRule = (day: AvailabilityRuleValue["day"]) => {
    onChange([...rules, { day, start: "08:00", end: "16:00" }]);
  };

  const updateRule = (
    index: number,
    patch: Partial<AvailabilityRuleValue>,
  ) => {
    onChange(rules.map((rule, i) => (i === index ? { ...rule, ...patch } : rule)));
  };

  const removeRule = (index: number) => {
    onChange(rules.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3 rounded-xl border p-4">
      <p className="text-xs text-muted-foreground">
        Weekly hours in {SCHOOL_TIMEZONE_LABEL}. Bookable slots are worked out
        from these, minus booked classes and time off.
      </p>

      <div className="space-y-3">
        {WEEK_DAYS.map((day) => {
          const dayRules = rules
            .map((rule, index) => ({ rule, index }))
            .filter(({ rule }) => rule.day === day.value);

          return (
            <div
              key={day.value}
              className="flex flex-wrap items-start gap-3 border-b pb-3 last:border-b-0 last:pb-0"
            >
              <span className="w-24 shrink-0 pt-2 text-sm font-medium">
                {day.label}
              </span>

              <div className="flex min-w-0 flex-1 flex-col gap-2">
                {dayRules.length === 0 ? (
                  <span className="py-2 text-sm text-muted-foreground">
                    Not available
                  </span>
                ) : (
                  dayRules.map(({ rule, index }) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        type="time"
                        className="w-32"
                        value={rule.start}
                        onChange={(e) =>
                          updateRule(index, { start: e.target.value })
                        }
                      />
                      <span className="text-muted-foreground">to</span>
                      <Input
                        type="time"
                        className="w-32"
                        value={rule.end}
                        onChange={(e) =>
                          updateRule(index, { end: e.target.value })
                        }
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label={`Remove ${day.label} hours`}
                        onClick={() => removeRule(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-1"
                onClick={() => addRule(day.value)}
              >
                <Plus className="h-3.5 w-3.5" />
                Add hours
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
