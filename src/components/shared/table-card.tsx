import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TableCardProps {
  /** Search box, filter select — bam pashe, jayga pele choraye boshe */
  toolbar?: React.ReactNode;
  /** Toolbar-er dan pashe — jemon result count */
  meta?: React.ReactNode;
  /** Table-er niche — sadharonoto `<Pagination>` */
  footer?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

/**
 * Filter + table + pagination ke ekta card-e dhore.
 *
 * Age filter gula page-er gray background-er upor bhashto ar table-er shathe
 * gaye legে thakto. Ekhon toolbar-er nijer ekta muted patti ache, `FormSection`
 * -er header-er moto — tai dashboard-er dui dik ek rokom dekhay.
 *
 * Bhitorer `<DataTable>` ke `embedded` dite hobe, na hole card-er border-er
 * bhitore ar ekta border boshe jabe.
 */
export function TableCard({
  toolbar,
  meta,
  footer,
  className,
  children,
}: TableCardProps) {
  return (
    <Card className={cn("gap-0 overflow-hidden py-0", className)}>
      {(toolbar || meta) && (
        <div className="flex flex-wrap items-center justify-between gap-3 bg-muted/40 p-4">
          {toolbar && (
            <div className="flex flex-1 flex-wrap items-end gap-3">
              {toolbar}
            </div>
          )}
          {meta && (
            <div className="shrink-0 text-sm text-muted-foreground">{meta}</div>
          )}
        </div>
      )}

      <div className="border-t">{children}</div>

      {footer && <div className="border-t p-4">{footer}</div>}
    </Card>
  );
}
