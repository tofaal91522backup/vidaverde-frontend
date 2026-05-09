import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

function Accordion({
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  type?: "single" | "multiple";
  collapsible?: boolean;
}) {
  const { type: _type, collapsible: _collapsible, ...rest } = props;
  return (
    <div className={cn("w-full", className)} {...rest}>
      {children}
    </div>
  );
}

function AccordionItem({
  className,
  value: _value,
  ...props
}: React.ComponentProps<"details"> & { value?: string }) {
  return <details className={cn(className)} {...props} />;
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<"summary">) {
  return (
    <summary className={cn(className)} {...props}>
      {children}
    </summary>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & { children: ReactNode }) {
  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
