import type { PaymentStatus } from "@/features/protected/pages/dashboard/admin/types/admin.types";
import type { SessionStatus } from "@/types/domain.type";

export type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

/**
 * Status → badge variant.
 *
 * Age ei map gula bookings-column ar sessions-column-e alada alada `const`
 * hisebe chilo. Student detail page-eo ek-i status dekhate hoy, tai tritiyo copy
 * na baniye ekhane shorano holo — na hole ek jaygay rong bodlale onno jaygay
 * purono theke jeto.
 */
export const PAYMENT_STATUS_VARIANTS: Record<PaymentStatus, BadgeVariant> = {
  paid: "default",
  pending: "secondary",
  failed: "destructive",
  refunded: "outline",
};

export const SESSION_STATUS_VARIANTS: Record<SessionStatus, BadgeVariant> = {
  scheduled: "default",
  completed: "outline",
  no_show: "destructive",
  cancelled: "destructive",
  rescheduled: "secondary",
};

export const SESSION_STATUS_LABELS: Record<SessionStatus, string> = {
  scheduled: "scheduled",
  completed: "completed",
  no_show: "no show",
  cancelled: "cancelled",
  rescheduled: "rescheduled",
};
