import type {
  AdminBookingsResponse,
  PaymentStatus,
} from "@/features/protected/pages/dashboard/admin/types/admin.types";
import { useFetchData } from "@/hooks/use-fetch-data";
import { useMutationHandler } from "@/hooks/use-mutation-handler";
import { makeEndpoint } from "@/lib/http/make-endpoint";
import { request } from "@/lib/http/request";
import { dateStamp, saveBlob } from "@/utils/save-blob";

export const BOOKINGS_QUERY_KEY = "admin-bookings";

export type BookingListParams = {
  page?: number;
  payment_status?: PaymentStatus | "";
  /** Teacher UUID — jei purchase-e oi teacher-er at least ekta class ache */
  teacher?: string;
  /** YYYY-MM-DD, **purchase date**-er upore (class date na) */
  from?: string;
  to?: string;
  /** Student-er email-er ongsho */
  search?: string;
};

/**
 * GET /administrator/bookings/ — protita purchase, paginated.
 *
 * ⚠️ Ekhane "booking" mane **ekta purchase**, ekta class booking na. Teacher,
 * date ba time ei row-e nai — ke ki kinlo, koto dilo, koto class baki, sheta ache.
 *
 * docs/bruno/administrator/bookings.bru
 */
export function useBookings(params: BookingListParams = {}) {
  const query = {
    p: params.page,
    payment_status: params.payment_status || undefined,
    teacher: params.teacher || undefined,
    from: params.from || undefined,
    to: params.to || undefined,
    search: params.search || undefined,
  };

  return useFetchData<AdminBookingsResponse>({
    url: makeEndpoint("/administrator/bookings/", query),
    querykey: [BOOKINGS_QUERY_KEY, query],
  });
}

/**
 * GET /administrator/bookings/export/ — ek-i row gula CSV hisebe.
 *
 * ⚠️ Export **shudhu `payment_status`, `from`, `to`** mane — `teacher` ar
 * `search` filter **ignore kore**. Tai UI te bole deওয়া hoyeche, na hole admin
 * bhabto je ja dekhche tai download hocche.
 *
 * Backend `.iterator()` diye stream kore, tai boro export-eo memory-te shob
 * dhoke na.
 *
 * docs/bruno/administrator/bookings export.bru
 */
export function useExportBookings() {
  return useMutationHandler<
    Blob,
    Pick<BookingListParams, "payment_status" | "from" | "to">
  >({
    // Download mutationFn-er bhitorei — onSuccess variables pay na
    mutationFn: async (params) => {
      const blob = await request.getBlob(
        makeEndpoint("/administrator/bookings/export/", {
          payment_status: params.payment_status || undefined,
          from: params.from || undefined,
          to: params.to || undefined,
        }),
      );
      saveBlob(blob, `vidaverde-bookings-${dateStamp()}.csv`);
      return blob;
    },
    showSuccessToast: false,
    errorMessage: "Could not export the bookings.",
    debugLabel: "ExportBookings",
  });
}
