"use client";

import { AppDialog } from "@/components/shared/app-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { AdminContactMessage } from "@/features/protected/pages/dashboard/admin/types/admin.types";
import { formatSchoolDateTime } from "@/features/protected/pages/dashboard/admin/utils/format-school-datetime";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Check, Mail, Undo2 } from "lucide-react";
import { useState } from "react";
import { useUpdateContactMessage } from "../queries/use-contact-messages";

function HandledButton({ message }: { message: AdminContactMessage }) {
  const { mutate, isPending } = useUpdateContactMessage();

  /*
    Duita obostha, duita rokom gurutto:
    - Open enquiry-te "Mark handled" ei row-er **mul kaj**, tai primary.
    - Handled obosthay "Reopen" ekta undo — dorkar hole peye jabe, kintu
      chokhe pore thakar kono karon nai, tai muted amber.
    Duitatei `outline` chilo, mane admin list dekhe bujhte parto na kon ta
    tar attention chay.
  */
  return (
    <Button
      variant={message.handled ? "outline" : "default"}
      size="sm"
      disabled={isPending}
      className={cn(
        "gap-1",
        message.handled &&
          "border-amber-300 text-amber-700 hover:bg-amber-50 hover:text-amber-800 dark:border-amber-800 dark:text-amber-500 dark:hover:bg-amber-950",
      )}
      onClick={() => mutate({ id: message.id, handled: !message.handled })}
    >
      {message.handled ? (
        <>
          <Undo2 className="h-3.5 w-3.5" />
          Reopen
        </>
      ) : (
        <>
          <Check className="h-3.5 w-3.5" />
          Mark handled
        </>
      )}
    </Button>
  );
}

/** Puro message + note ekta dialog-e — message lomba hote pare, table-e dhoke na */
function ViewMessageDialog({ message }: { message: AdminContactMessage }) {
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState(message.admin_notes ?? "");
  const mutation = useUpdateContactMessage();

  return (
    <AppDialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        // Bondho korle half-edit kora note rekhe deওয়া jabe na
        if (!next) setNotes(message.admin_notes ?? "");
      }}
      size="2xl"
      // Read destructive-o na, primary-o na — pashe-r "Mark handled" er cheye
      // kom gurutto, kintu `ghost` e button-i mone hoto na
      trigger={
        <Button variant="outline" size="sm" className="gap-1">
          <Mail className="h-3.5 w-3.5" />
          Read
        </Button>
      }
      title={message.subject_label || message.subject || "Enquiry"}
      description={`${message.name} · ${message.email}`}
      footer={
        <div className="flex w-full justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button
            disabled={mutation.isPending}
            onClick={() =>
              mutation.mutate(
                { id: message.id, admin_notes: notes },
                { onSuccess: () => setOpen(false) },
              )
            }
          >
            {mutation.isPending ? "Saving..." : "Save note"}
          </Button>
        </div>
      }
    >
      <div className="space-y-4 py-2 text-sm">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-muted-foreground">Received</p>
            <p className="font-medium">
              {formatSchoolDateTime(message.created_at)}
            </p>
          </div>
          {message.programme && (
            <div>
              <p className="text-xs text-muted-foreground">Programme</p>
              <p className="font-medium">{message.programme}</p>
            </div>
          )}
        </div>

        {/* Visitor ja likheche — read-only record */}
        <div>
          <p className="mb-1 text-xs text-muted-foreground">Message</p>
          {/*
            `wrap-anywhere` — visitor space chhara ekta lomba string (URL, ba
            keyboard-mash) pathale seta jate dialog-er width na bariye dey
          */}
          <p className="max-h-64 overflow-y-auto rounded-lg border bg-muted/30 p-3 whitespace-pre-wrap wrap-anywhere">
            {message.message}
          </p>
        </div>

        <div className="space-y-2">
          <Label>Internal note</Label>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. Replied with November availability and the homestay rates."
            rows={4}
            className="wrap-anywhere"
          />
        </div>
      </div>
    </AppDialog>
  );
}

export const contactMessagesColumns: ColumnDef<AdminContactMessage>[] = [
  {
    accessorKey: "name",
    header: "From",
    cell: ({ row }) => (
      <div>
        <p className="text-sm font-medium">{row.original.name}</p>
        <p className="text-xs text-muted-foreground">{row.original.email}</p>
      </div>
    ),
  },
  {
    accessorKey: "subject_label",
    header: "Subject",
    cell: ({ row }) => (
      <Badge variant="secondary" className="text-xs">
        {row.original.subject_label || row.original.subject || "—"}
      </Badge>
    ),
  },
  {
    accessorKey: "message",
    header: "Message",
    cell: ({ row }) => (
      <p className="max-w-100 truncate text-sm text-muted-foreground">
        {row.original.message}
      </p>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Received",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {formatSchoolDateTime(row.original.created_at)}
      </span>
    ),
  },
  {
    accessorKey: "handled",
    header: "Status",
    cell: ({ row }) => (
      <div className="flex flex-col items-start gap-1">
        <Badge variant={row.original.handled ? "secondary" : "default"}>
          {row.original.handled ? "Handled" : "Open"}
        </Badge>
        {row.original.admin_notes && (
          <span className="text-[10px] text-muted-foreground">has note</span>
        )}
      </div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-1">
        <ViewMessageDialog message={row.original} />
        <HandledButton message={row.original} />
      </div>
    ),
  },
];
