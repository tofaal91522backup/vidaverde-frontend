import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface FormSectionProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  /** Header-er dan pashe — jemon count badge ba ekta quick action */
  action?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  children: React.ReactNode;
}

/**
 * Boro form gulo ke card-e bhag kore deওয়ার jonno.
 *
 * Card-er nijer `py-6`/`gap-6` ekhane off kora hoyeche jate header-er niche
 * ekta rule (border-t) boshiye compact block banano jay. `CardHeader`-er
 * `[.border-b]:pb-6` rule-ta ke edano hocche border-ta content-er upore diye —
 * dekhte ek-i, kintu padding niye lorai korte hoy na.
 */
export function FormSection({
  title,
  description,
  icon: Icon,
  action,
  className,
  contentClassName,
  children,
}: FormSectionProps) {
  return (
    <Card className={cn("gap-0 overflow-hidden py-0", className)}>
      <CardHeader className="gap-2 bg-muted/40 px-5 py-4">
        <div className="flex items-start gap-3">
          {Icon && (
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
              <Icon className="size-4" />
            </span>
          )}
          <div className="space-y-0.5">
            <CardTitle className="text-base">{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
        </div>
        {action && <CardAction>{action}</CardAction>}
      </CardHeader>

      <CardContent className={cn("border-t p-5", contentClassName)}>
        {children}
      </CardContent>
    </Card>
  );
}
