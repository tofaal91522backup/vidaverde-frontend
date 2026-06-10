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
import { ColumnDef } from "@tanstack/react-table";
import { ChevronDown, MessageSquare } from "lucide-react";
import { useState } from "react";
import {
  Session,
  SessionStatus,
  useUpdateSession,
} from "../queries/use-sessions";

const STATUS_VARIANTS: Record<
  SessionStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
  upcoming: "default",
  completed: "outline",
  "no-show": "destructive",
  rescheduled: "secondary",
};

function SessionActions({ session }: { session: Session }) {
  const { mutate, isPending } = useUpdateSession();

  const handleStatus = (status: SessionStatus) => {
    mutate({ id: session.id, status });
  };

  if (session.status !== "upcoming") return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" disabled={isPending} className="gap-1">
          Action
          <ChevronDown className="h-3.5 w-3.5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleStatus("completed")}>
          ✅ Mark Completed
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatus("no-show")}>
          ❌ Mark No-Show
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatus("rescheduled")}>
          🔄 Mark Rescheduled
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AdminNotesButton({ session }: { session: Session }) {
  const { mutate, isPending } = useUpdateSession();
  const [notes, setNotes] = useState(session.adminNotes ?? "");
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    mutate(
      { id: session.id, adminNotes: notes },
      { onSuccess: () => setOpen(false) } as any,
    );
  };

  return (
    <AppDialog
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button variant="ghost" size="sm" className="gap-1">
          <MessageSquare className="h-3.5 w-3.5" />
          Notes
        </Button>
      }
      title="Admin Notes"
      description={`Notes for ${session.student.name}'s session on ${session.date}`}
      size="md"
      footer={
        <div className="flex justify-end gap-2 w-full">
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} disabled={isPending}>
            {isPending ? "Saving..." : "Save Notes"}
          </Button>
        </div>
      }
    >
      <div className="py-2 space-y-2">
        <Label>Admin Notes</Label>
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add internal notes about this session..."
          rows={5}
        />
      </div>
    </AppDialog>
  );
}

export const sessionsColumns: ColumnDef<Session>[] = [
  {
    id: "student",
    header: "Student",
    cell: ({ row }) => (
      <div>
        <div className="font-medium text-sm">{row.original.student.name}</div>
        <div className="text-xs text-muted-foreground">{row.original.student.email}</div>
      </div>
    ),
  },
  {
    id: "teacher",
    header: "Teacher",
    cell: ({ row }) => (
      <span className="text-sm">{row.original.teacher.name}</span>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <span className="text-sm">{row.original.date}</span>,
  },
  {
    accessorKey: "time",
    header: "Time",
    cell: ({ row }) => <span className="text-sm">{row.original.time}</span>,
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => (
      <span className="text-sm">{row.original.duration} min</span>
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
        {row.original.status.replace("-", " ")}
      </Badge>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <SessionActions session={row.original} />
        <AdminNotesButton session={row.original} />
      </div>
    ),
  },
];
