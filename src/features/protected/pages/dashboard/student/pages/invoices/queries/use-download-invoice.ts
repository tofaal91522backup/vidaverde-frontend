import type { StudentInvoice } from "@/features/protected/pages/dashboard/student/types/student.types";
import { useMutationHandler } from "@/hooks/use-mutation-handler";
import { request } from "@/lib/http/request";
// Admin CSV export-eo ei ek-i helper lage, tai shared jaygay
import { saveBlob } from "@/utils/save-blob";

/**
 * GET /student/invoices/:id/pdf/ — asol PDF (binary), backend weasyprint diye
 * on-demand render kore. JSON na, tai `request.getBlob`.
 *
 * Onno student-er invoice id dile backend 404 dey.
 *
 * docs/bruno/student/invoice pdf.bru
 */
export function useDownloadInvoice() {
  return useMutationHandler<Blob, StudentInvoice>({
    // Download ta mutationFn-er bhitorei kora hoy, karon useMutationHandler-er
    // onSuccess shudhu data pay — invoice number ta pay na, ar filename-e oita lage.
    mutationFn: async (invoice) => {
      const blob = await request.getBlob(`/student/invoices/${invoice.id}/pdf/`);
      saveBlob(blob, `${invoice.number}.pdf`);
      return blob;
    },
    showSuccessToast: false,
    errorMessage: "Could not download this invoice.",
    debugLabel: "DownloadInvoicePdf",
  });
}
