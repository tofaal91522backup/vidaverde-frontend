import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { MyPackage } from "../queries/use-my-packages";

function ProgressBar({ value, max }: { value: number; max: number }) {
  const pct = max === 0 ? 0 : Math.min(100, Math.round((value / max) * 100));
  const color =
    pct >= 100 ? "bg-muted-foreground/40" : pct >= 60 ? "bg-amber-500" : "bg-green-500";

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{value} of {max} used</span>
        <span>{pct}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-500", color)}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function PackageCard({ pkg }: { pkg: MyPackage }) {
  const remaining = pkg.classesTotal - pkg.classesUsed;
  const isExpired = new Date(pkg.expiryDate) < new Date();
  const daysLeft = Math.max(
    0,
    Math.ceil(
      (new Date(pkg.expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
    ),
  );

  return (
    <div
      className={cn(
        "rounded-xl border bg-card p-5 flex flex-col gap-4",
        !pkg.isActive && "opacity-60",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-base leading-snug">{pkg.name}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Teacher: {pkg.teacher}
          </p>
        </div>
        <Badge variant={pkg.isActive && !isExpired ? "default" : "secondary"} className="shrink-0">
          {isExpired ? "Expired" : pkg.isActive ? "Active" : "Completed"}
        </Badge>
      </div>

      <ProgressBar value={pkg.classesUsed} max={pkg.classesTotal} />

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-xs text-muted-foreground">Classes remaining</p>
          <p className="font-semibold text-base mt-0.5">{remaining}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Expiry date</p>
          <p className="font-medium mt-0.5">
            {new Date(pkg.expiryDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Purchased</p>
          <p className="text-sm mt-0.5 text-muted-foreground">
            {new Date(pkg.purchaseDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Days left</p>
          <p
            className={cn(
              "font-medium mt-0.5",
              daysLeft <= 7 && daysLeft > 0 && "text-amber-600",
              daysLeft === 0 && "text-muted-foreground",
            )}
          >
            {daysLeft > 0 ? `${daysLeft} days` : "—"}
          </p>
        </div>
      </div>
    </div>
  );
}
