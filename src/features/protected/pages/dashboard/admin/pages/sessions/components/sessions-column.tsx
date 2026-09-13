"use client";

import { AppDialog } from "@/components/shared/app-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type {
  AdminSession,
  SessionStatus,
} from "@/features/protected/pages/dashboard/admin/types/admin.types";
import {
  formatSchoolDate,
  formatSchoolTime,
} from "@/features/protected/pages/dashboard/admin/utils/format-school-datetime";
import { ColumnDef } from "@tanstack/react-table";
import {
  Ban,
  CalendarClock,
  CheckCircle2,
  ChevronDown,
  MessageSquare,
  UserX,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useUpdateSession } from "../queries/use-sessions";

const STATUS_VARIANTS: Record<
  SessionStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
  scheduled: "default",
  completed: "outline",
  no_show: "destructive",
  cancelled: "destructive",
  rescheduled: "secondary",
};

const STATUS_LABELS: Record<SessionStatus, string> = {
  scheduled: "scheduled",
  completed: "completed",
  no_show: "no show",
  cancelled: "cancelled",
  rescheduled: "rescheduled",
};

/** `scheduled` class-e admin je outcome boshate pare */
const OUTCOME_ACTIONS: {
  status: SessionStatus;
  label: string;
  icon: LucideIcon;
}[] = [
  { status: "completed", label: "Mark completed", icon: CheckCircle2 },
  { status: "no_show", label: "Mark no-show", icon: UserX },
  { status: "cancelled", label: "Mark cancelled", icon: Ban },
  { status: "rescheduled", label: "Mark rescheduled", icon: CalendarClock },
];

/**
 * Ekta row-er shob kaaj ek button-e — outcome boshano ar admin note.
 *
 * Age duita alada control chilo: ekta "Action" dropdown (shudhu `scheduled`
 * class-e dekhato) ar tar pashe ekta "Notes" button. Tai non-scheduled row-e
 * duitor uchota mile na, ar Actions column-ta bhora bhora lagto.
 *
 * `modal={false}` deওয়া — menu bondho ar dialog khola ek shathe hole Radix
 * body-te `pointer-events: none` rekhe dite pare, tate pura page atke jay.
 */
function SessionRowActions({ session }: { session: AdminSession }) {
  const { mutate, isPending } = useUpdateSession();

  const [notesOpen, setNotesOpen] = useState(false);
  const [notes, setNotes] = useState(session.admin_notes ?? "");

  const notesMutation = useUpdateSession();
  const hasNotes = Boolean(session.admin_notes);

  // Outcome shudhu ekhono scheduled thaka class-e boshano jay
  const canSetOutcome = session.status === "scheduled";

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            disabled={isPending}
            className="gap-1"
          >
            Actions
            {hasNotes && (
              <span
                className="size-1.5 rounded-full bg-primary"
                title="Has admin notes"
              />
            )}
            <ChevronDown className="h-3.5 w-3.5" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-52">
          {canSetOutcome && (
            <>
              {OUTCOME_ACTIONS.map((action) => (
                <DropdownMenuItem
                  key={action.status}
                  className="gap-2"
                  onClick={() =>
                    mutate({ id: session.id, status: action.status })
                  }
                >
                  <action.icon className="size-4 text-muted-foreground" />
                  {action.label}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
            </>
          )}

          <DropdownMenuItem
            className="gap-2"
            onSelect={() => {
              // Bondho kore abar khulle server-er value-i dekhabe, half-edit na
              setNotes(session.admin_notes ?? "");
              setNotesOpen(true);
            }}
          >
            <MessageSquare className="size-4 text-muted-foreground" />
            {hasNotes ? "Edit notes" : "Add notes"}
            {hasNotes && (
              <span className="ml-auto size-1.5 rounded-full bg-primary" />
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AppDialog
        open={notesOpen}
        onOpenChange={setNotesOpen}
        trigger={null}
        title="Admin notes"
        description={`${session.student_name} · ${formatSchoolDate(session.start_datetime)}`}
        size="md"
        footer={
          <div className="flex w-full justify-end gap-2">
            <Button variant="outline" onClick={() => setNotesOpen(false)}>
              Cancel
            </Button>
            <Button
              disabled={notesMutation.isPending}
              onClick={() =>
                notesMutation.mutate(
                  { id: session.id, admin_notes: notes },
                  { onSuccess: () => setNotesOpen(false) },
                )
              }
            >
              {notesMutation.isPending ? "Saving..." : "Save notes"}
            </Button>
          </div>
        }
      >
        <div className="space-y-2 py-2">
          <Label>Internal note</Label>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Never shown to the student."
            rows={5}
          />
        </div>
      </AppDialog>
    </>
  );
}

export const sessionsColumns: ColumnDef<AdminSession>[] = [
  {
    accessorKey: "student_name",
    header: "Student",
    cell: ({ row }) => (
      <div>
        <p className="text-sm font-medium">{row.original.student_name}</p>
        <p className="text-xs text-muted-foreground">
          {row.original.student_email}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "teacher_name",
    header: "Teacher",
    // Session row-e teacher-er UUID ache, tai shoja tar edit page-e jaওয়া jay
    cell: ({ row }) => (
      <Link
        href={`/dashboard/admin/teachers/${row.original.teacher}/edit`}
        className="text-sm font-medium underline-offset-4 hover:underline"
      >
        {row.original.teacher_name}
      </Link>
    ),
  },
  {
    accessorKey: "package_title",
    header: "Package",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.package_title}
      </span>
    ),
  },
  {
    accessorKey: "start_datetime",
    header: "When",
    // School time — table-er upore label-e bola ache
    cell: ({ row }) => (
      <div>
        <p className="text-sm tabular-nums">
          {formatSchoolDate(row.original.start_datetime)}
        </p>
        <p className="text-xs text-muted-foreground tabular-nums">
          {formatSchoolTime(row.original.start_datetime)} ·{" "}
          {row.original.duration_minutes} min
        </p>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant={STATUS_VARIANTS[row.original.status]}
        className="capitalize"
      >
        {STATUS_LABELS[row.original.status]}
      </Badge>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex items-center justify-end">
        <SessionRowActions session={row.original} />
      </div>
    ),
  },
];
