"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SCHOOL_TIMEZONE_LABEL } from "@/features/protected/pages/dashboard/admin/utils/format-school-datetime";
import { CalendarRange, Clock, Eraser, Plus, X } from "lucide-react";
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

const WEEKDAY_PRESET = ["mon", "tue", "wed", "thu", "fri"] as const;

const toMinutes = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return (hours || 0) * 60 + (minutes || 0);
};

/** 450 → "7h 30m" */
const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (!hours) return `${rest}m`;
  return rest ? `${hours}h ${rest}m` : `${hours}h`;
};

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

  const updateRule = (index: number, patch: Partial<AvailabilityRuleValue>) => {
    onChange(
      rules.map((rule, i) => (i === index ? { ...rule, ...patch } : rule)),
    );
  };

  const removeRule = (index: number) => {
    onChange(rules.filter((_, i) => i !== index));
  };

  /** Beshirbhag teacher-er ek-i weekday routine — ek click-e bhore dey */
  const applyWeekdayPreset = () => {
    onChange(
      WEEKDAY_PRESET.map((day) => ({ day, start: "09:00", end: "17:00" })),
    );
  };

  const totalMinutes = rules.reduce((sum, rule) => {
    const span = toMinutes(rule.end) - toMinutes(rule.start);
    return span > 0 ? sum + span : sum;
  }, 0);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-muted/40 p-3">
        <p className="flex items-start gap-2 text-xs text-muted-foreground">
          <Clock className="mt-0.5 size-3.5 shrink-0" />
          <span>
            Hours are in {SCHOOL_TIMEZONE_LABEL}. Bookable slots come from
            these, minus booked classes and time off.
          </span>
        </p>

        <div className="flex shrink-0 items-center gap-2">
          {rules.length === 0 ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={applyWeekdayPreset}
            >
              <CalendarRange className="size-3.5" />
              Mon–Fri, 9–5
            </Button>
          ) : (
            <>
              <Badge variant="secondary">
                {formatDuration(totalMinutes)} / week
              </Badge>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="gap-1.5 text-muted-foreground"
                onClick={() => onChange([])}
              >
                <Eraser className="size-3.5" />
                Clear
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="space-y-2">
        {WEEK_DAYS.map((day) => {
          const dayRules = rules
            .map((rule, index) => ({ rule, index }))
            .filter(({ rule }) => rule.day === day.value);

          const dayMinutes = dayRules.reduce((sum, { rule }) => {
            const span = toMinutes(rule.end) - toMinutes(rule.start);
            return span > 0 ? sum + span : sum;
          }, 0);

          const isOpen = dayRules.length > 0;

          return (
            <div
              key={day.value}
              className={`rounded-lg border p-3 transition-colors ${
                isOpen ? "bg-background" : "bg-muted/30"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`text-sm font-medium ${
                      isOpen ? "" : "text-muted-foreground"
                    }`}
                  >
                    {day.label}
                  </span>
                  {isOpen ? (
                    <Badge variant="secondary" className="font-normal">
                      {formatDuration(dayMinutes)}
                    </Badge>
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      Not available
                    </span>
                  )}
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="gap-1.5"
                  onClick={() => addRule(day.value)}
                >
                  <Plus className="size-3.5" />
                  Add hours
                </Button>
              </div>

              {isOpen && (
                <div className="mt-3 space-y-2 border-t pt-3">
                  {dayRules.map(({ rule, index }) => {
                    // Schema-o eta dhore, kintu submit-er age-i bola bhalo
                    const isBackwards =
                      toMinutes(rule.start) >= toMinutes(rule.end);

                    return (
                      <div key={index}>
                        <div className="flex flex-wrap items-center gap-2">
                          <Input
                            type="time"
                            className="w-32"
                            aria-label={`${day.label} start time`}
                            aria-invalid={isBackwards}
                            value={rule.start}
                            onChange={(e) =>
                              updateRule(index, { start: e.target.value })
                            }
                          />
                          <span className="text-sm text-muted-foreground">
                            to
                          </span>
                          <Input
                            type="time"
                            className="w-32"
                            aria-label={`${day.label} end time`}
                            aria-invalid={isBackwards}
                            value={rule.end}
                            onChange={(e) =>
                              updateRule(index, { end: e.target.value })
                            }
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-destructive"
                            aria-label={`Remove ${day.label} hours`}
                            onClick={() => removeRule(index)}
                          >
                            <X className="size-4" />
                          </Button>
                        </div>

                        {isBackwards && (
                          <p className="mt-1 text-xs text-destructive">
                            Start time must be before the end time.
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
