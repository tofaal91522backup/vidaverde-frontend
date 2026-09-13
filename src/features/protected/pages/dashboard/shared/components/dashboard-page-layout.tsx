import { cn } from "@/lib/utils";

interface DashboardPageLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  /**
   * Tailwind max-width class — dile header ar content duitai oi width-e
   * middle e boshe (jemon lomba form). Na dile age-r moto full width.
   */
  maxWidth?: string;
}

const DashboardPageLayout = ({
  title,
  subtitle,
  children,
  action,
  maxWidth,
}: DashboardPageLayoutProps) => {
  return (
    <div className="p-4">
      <div className={cn("mx-auto w-full", maxWidth)}>
        <div className="flex items-center justify-between space-x-4 mb-6 ">
          <div>
            <h2 className="text-2xl font-bold">{title}</h2>
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
          {action && <div>{action}</div>}
        </div>

        {children}
      </div>
    </div>
  );
};

export default DashboardPageLayout;
