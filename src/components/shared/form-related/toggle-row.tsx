"use client";

import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface ToggleRowProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  title: string;
  /** Off korle ki hobe — admin jate onuman na kore */
  description: string;
  onLabel: string;
  offLabel: string;
}

/**
 * Form-er switch field.
 *
 * Shudhu label + toggle rakhle bojha jeto na off korle ki hobe, ar ekhon-kar
 * obostha-ta-o chokhe portо na. Tai bordered row: title, description, ar
 * cholti obostha-r ekta badge.
 */
export function ToggleRow({
  id,
  checked,
  onChange,
  title,
  description,
  onLabel,
  offLabel,
}: ToggleRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border p-4">
      <div className="space-y-1.5">
        <Label htmlFor={id} className="cursor-pointer text-sm font-medium">
          {title}
        </Label>
        <p className="text-xs text-muted-foreground">{description}</p>
        <Badge
          variant={checked ? "secondary" : "outline"}
          className="font-normal"
        >
          {checked ? onLabel : offLabel}
        </Badge>
      </div>

      <Switch id={id} checked={checked} onCheckedChange={onChange} />
    </div>
  );
}
