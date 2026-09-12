"use client";

import AsyncStateWrapper from "@/components/shared/async-state-wrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DashboardPageLayout from "@/features/protected/pages/dashboard/shared/components/dashboard-page-layout";
import {
  SCHOOL_TIMEZONE_LABEL,
  formatSchoolDate,
  formatSchoolDateTime,
} from "@/features/protected/pages/dashboard/admin/utils/format-school-datetime";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useStudentDetails } from "./queries/use-students";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium">{value || "—"}</p>
    </div>
  );
}

export default function StudentDetailPage({ id }: { id: string }) {
  const { data, isLoading, isError } = useStudentDetails(id);

  // ⚠️ Response shape bru te dekhano nai — `student` ba `profile`, jeta ashe
  const student = data?.student ?? data?.profile;
  const packages = data?.packages ?? [];
  const sessions = data?.sessions ?? [];

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
        <div className="space-y-6">
          {student && (
            <section className="rounded-xl border p-5">
              <h2 className="mb-4 font-semibold">Profile</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Row label="Country" value={student.country} />
                <Row label="Phone" value={student.phone_number} />
                <Row label="Timezone" value={student.timezone} />
                <Row
                  label="Spanish level"
                  value={student.current_spanish_level}
                />
                <Row label="Joined" value={formatSchoolDate(student.created_at)} />
                <Row
                  label="Account"
                  value={student.active ? "Active" : "Deactivated"}
                />
              </div>
            </section>
          )}

          <section className="rounded-xl border p-5">
            <h2 className="mb-1 font-semibold">Packages</h2>
            <p className="mb-4 text-sm text-muted-foreground">
              Everything this student has bought.
            </p>

            {packages.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No packages purchased.
              </p>
            ) : (
              <ul className="divide-y rounded-lg border">
                {packages.map((pkg) => (
                  <li
                    key={pkg.id}
                    className="flex flex-wrap items-center justify-between gap-3 p-3"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{pkg.package_title}</p>
                      <p className="text-xs text-muted-foreground tabular-nums">
                        {pkg.classes_used}/{pkg.classes_total} used ·{" "}
                        {pkg.classes_remaining} left · expires{" "}
                        {formatSchoolDate(pkg.expires_at)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold tabular-nums">
                        {pkg.amount_paid} {pkg.invoice?.currency ?? ""}
                      </span>
                      <Badge variant="secondary" className="capitalize">
                        {pkg.payment_status}
                      </Badge>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="rounded-xl border p-5">
            <h2 className="mb-1 font-semibold">Classes</h2>
            <p className="mb-4 text-sm text-muted-foreground">
              Every class taken or booked. Times in {SCHOOL_TIMEZONE_LABEL}.
            </p>

            {sessions.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No classes yet.
              </p>
            ) : (
              <ul className="divide-y rounded-lg border">
                {sessions.map((session) => (
                  <li
                    key={session.id}
                    className="flex flex-wrap items-center justify-between gap-3 p-3"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium">
                        {session.teacher_name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {session.package_title}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm tabular-nums">
                        {formatSchoolDateTime(session.start_datetime)}
                      </span>
                      <Badge variant="secondary" className="capitalize">
                        {session.status.replace("_", " ")}
                      </Badge>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </AsyncStateWrapper>
    </DashboardPageLayout>
  );
}
