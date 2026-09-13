"use client";

import AsyncStateWrapper from "@/components/shared/async-state-wrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type {
  AdminBooking,
  AdminSession,
} from "@/features/protected/pages/dashboard/admin/types/admin.types";
import {
  SCHOOL_TIMEZONE_LABEL,
  formatSchoolDate,
  formatSchoolDateTime,
} from "@/features/protected/pages/dashboard/admin/utils/format-school-datetime";
import {
  PAYMENT_STATUS_VARIANTS,
  SESSION_STATUS_LABELS,
  SESSION_STATUS_VARIANTS,
} from "@/features/protected/pages/dashboard/admin/utils/status-badge";
import DashboardPageLayout from "@/features/protected/pages/dashboard/shared/components/dashboard-page-layout";
import { cn } from "@/lib/utils";
import {
  CalendarDays,
  ChevronLeft,
  GraduationCap,
  Package,
  Video,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { useStudentDetails } from "./queries/use-students";

/**
 * Decimal string gula **cent-e** jog kora hoy.
 *
 * `Number("250.00") + Number("135.00")` float — kichu combination-e `.00000001`
 * chole ashe. Integer cent-e jog kore fire format korle ta hoy na.
 *
 * Currency ekta-i dhore neওয়া hoy: package-er price backend-e
 * "USD, two decimal places" (docs/bruno/administrator/create package.bru).
 */
function sumDecimalStrings(values: string[]) {
  const cents = values.reduce((total, value) => {
    const [whole = "0", frac = ""] = String(value ?? "0").split(".");
    return total + Number(whole) * 100 + Number(frac.padEnd(2, "0").slice(0, 2));
  }, 0);

  return `${Math.floor(cents / 100)}.${String(cents % 100).padStart(2, "0")}`;
}

function initials(name: string) {
  return (
    name
      ?.split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "?"
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <Card>
      <CardContent className="flex items-center gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          <Icon className="size-4" />
        </div>
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="truncate text-lg font-semibold tabular-nums">{value}</p>
          {hint && (
            <p className="truncate text-[11px] text-muted-foreground">{hint}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function Detail({ label, value }: { label: string; value?: string }) {
  return (
    <div className="min-w-0">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="truncate text-sm font-medium">{value || "—"}</p>
    </div>
  );
}

function PackageRow({ pkg }: { pkg: AdminBooking }) {
  return (
    <div className="space-y-2.5 p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm font-medium">{pkg.package_title}</p>
          <p className="text-xs text-muted-foreground">
            {pkg.invoice?.number ? `${pkg.invoice.number} · ` : ""}
            bought {formatSchoolDate(pkg.created_at)}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="text-sm font-semibold tabular-nums">
            {pkg.amount_paid} {pkg.invoice?.currency ?? ""}
          </span>
          <Badge
            variant={PAYMENT_STATUS_VARIANTS[pkg.payment_status] ?? "secondary"}
            className="capitalize"
          >
            {pkg.payment_status}
          </Badge>
        </div>
      </div>

      {/* `progress_percent` backend-i hisheb kore dey — ekhane kora hoy na */}
      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className={cn(
            "h-full rounded-full transition-all",
            pkg.is_expired ? "bg-muted-foreground/40" : "bg-primary",
          )}
          style={{ width: `${Math.min(100, Math.max(0, pkg.progress_percent))}%` }}
        />
      </div>

      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
        <span className="tabular-nums">
          {pkg.classes_used}/{pkg.classes_total} used
        </span>
        <span>·</span>
        <span className="tabular-nums">{pkg.classes_remaining} left</span>
        <span>·</span>
        {/* `is_expired` backend-er computed field — `new Date()` diye hisheb korle
            render-e time-dependent output hoye jeto */}
        <span className={cn(pkg.is_expired && "text-destructive")}>
          {pkg.is_expired ? "expired" : "expires"}{" "}
          {formatSchoolDate(pkg.expires_at)}
        </span>
      </div>
    </div>
  );
}

function SessionRow({ session }: { session: AdminSession }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-4">
      <div className="min-w-0">
        <p className="text-sm font-medium">{session.teacher_name}</p>
        <p className="truncate text-xs text-muted-foreground">
          {session.package_title} · {session.duration_minutes} min
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <span className="text-sm tabular-nums">
          {formatSchoolDateTime(session.start_datetime)}
        </span>
        {session.meet_link && (
          <a
            href={session.meet_link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition hover:text-foreground"
            title="Open Google Meet"
          >
            <Video className="size-4" />
          </a>
        )}
        <Badge
          variant={SESSION_STATUS_VARIANTS[session.status] ?? "secondary"}
          className="capitalize"
        >
          {SESSION_STATUS_LABELS[session.status] ?? session.status}
        </Badge>
      </div>
    </div>
  );
}

export default function StudentDetailPage({ id }: { id: string }) {
  const { data, isLoading, isError } = useStudentDetails(id);

  // Shape backend source theke confirm kora: { success, student, packages, sessions }
  const student = data?.student;
  const packages = data?.packages ?? [];
  const sessions = data?.sessions ?? [];

  const classesTaken = packages.reduce((n, pkg) => n + pkg.classes_used, 0);
  // Shudhu jegula ekhono chalano jay — expire howa package-er "baki" class ar kaje ashe na
  const classesLeft = packages
    .filter((pkg) => !pkg.is_expired)
    .reduce((n, pkg) => n + pkg.classes_remaining, 0);
  const lifetimeValue = sumDecimalStrings(packages.map((pkg) => pkg.amount_paid));
  const currency = packages.find((pkg) => pkg.invoice?.currency)?.invoice
    ?.currency;

  return (
    <DashboardPageLayout
      title={student?.name ?? "Student"}
      subtitle={student?.email}
      action={
        <Button variant="outline" size="sm" asChild className="gap-1">
          <Link href="/dashboard/admin/students">
            <ChevronLeft className="h-4 w-4" />
            All students
          </Link>
        </Button>
      }
    >
      <AsyncStateWrapper
        loading={isLoading}
        error={isError ? "Could not load this student." : null}
      >
        <div className="space-y-5">
          {student && (
            <Card>
              <CardContent className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="flex min-w-0 items-center gap-4">
                  <Avatar className="size-14">
                    <AvatarImage
                      src={student.profile_img_url}
                      alt={student.name}
                    />
                    <AvatarFallback className="text-base font-medium">
                      {initials(student.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="truncate text-lg font-semibold">
                      {student.name}
                    </p>
                    <p className="truncate text-sm text-muted-foreground">
                      {student.email}
                    </p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                      <Badge
                        variant={student.active ? "default" : "destructive"}
                      >
                        {student.active ? "Active" : "Deactivated"}
                      </Badge>
                      <Badge variant="outline" className="capitalize">
                        {student.current_spanish_level?.replace("_", " ")}
                      </Badge>
                    </div>
                  </div>
                </div>

                <Separator className="sm:hidden" />

                <div className="grid flex-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <Detail label="Country" value={student.country} />
                  <Detail label="Phone" value={student.phone_number} />
                  <Detail label="Timezone" value={student.timezone} />
                  <Detail
                    label="Joined"
                    value={formatSchoolDate(student.created_at)}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Stat
              icon={Package}
              label="Packages bought"
              value={String(packages.length)}
            />
            <Stat
              icon={GraduationCap}
              label="Classes taken"
              value={String(classesTaken)}
            />
            <Stat
              icon={CalendarDays}
              label="Classes left"
              value={String(classesLeft)}
              hint="active packages only"
            />
            <Stat
              icon={Wallet}
              label="Lifetime value"
              value={`${lifetimeValue}${currency ? ` ${currency}` : ""}`}
            />
          </div>

          <div className="grid gap-5 xl:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Packages</CardTitle>
                <CardDescription>
                  Everything this student has bought.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {packages.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No packages purchased.
                  </p>
                ) : (
                  <div className="divide-y overflow-hidden rounded-lg border">
                    {packages.map((pkg) => (
                      <PackageRow key={pkg.id} pkg={pkg} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Classes</CardTitle>
                <CardDescription>
                  Every class taken or booked. Times in {SCHOOL_TIMEZONE_LABEL}.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {sessions.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No classes yet.
                  </p>
                ) : (
                  <div className="divide-y overflow-hidden rounded-lg border">
                    {sessions.map((session) => (
                      <SessionRow key={session.id} session={session} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </AsyncStateWrapper>
    </DashboardPageLayout>
  );
}
