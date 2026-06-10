import { useFetchData } from "@/hooks/use-fetch-data";
import { makeEndpoint } from "@/lib/http/make-endpoint";

export const INVOICES_QUERY_KEY = "customer-invoices";

export type Invoice = {
  id: string;
  invoiceNumber: string;
  date: string;
  package: string;
  amount: number;
  paymentStatus: "paid" | "pending" | "failed";
  teacher: string;
  sessions: number;
};

type InvoicesResponse = { results: Invoice[]; count: number };
type InvoiceParams = { page?: number; search?: string; status?: string };

// ─── DEMO DATA ────────────────────────────────────────────────────────────────
const MOCK_INVOICES: Invoice[] = [
  { id: "inv1", invoiceNumber: "VV-2026-001", date: "2026-05-10", package: "Assessment + First Lesson", amount: 12,  paymentStatus: "paid",    teacher: "Carlos Rodríguez", sessions: 1 },
  { id: "inv2", invoiceNumber: "VV-2026-002", date: "2026-05-18", package: "Starter Pack — 5 Classes",  amount: 55,  paymentStatus: "paid",    teacher: "María González",   sessions: 5 },
  { id: "inv3", invoiceNumber: "VV-2026-003", date: "2026-06-02", package: "Regular Pack — 10 Classes", amount: 100, paymentStatus: "paid",    teacher: "María González",   sessions: 10 },
  { id: "inv4", invoiceNumber: "VV-2026-004", date: "2026-06-10", package: "Intensive — 20 Classes",    amount: 180, paymentStatus: "pending", teacher: "María González",   sessions: 20 },
];
// ─────────────────────────────────────────────────────────────────────────────

export function useInvoices(params: InvoiceParams) {
  // ✅ REAL API — uncomment this and remove the demo block below:
  // return useFetchData<InvoicesResponse>({
  //   url: makeEndpoint("/api/customer/invoices/", params),
  //   querykey: [INVOICES_QUERY_KEY, params],
  // });

  let filtered = MOCK_INVOICES;
  if (params.status) filtered = filtered.filter((i) => i.paymentStatus === params.status);
  if (params.search) {
    const q = params.search.toLowerCase();
    filtered = filtered.filter(
      (i) =>
        i.package.toLowerCase().includes(q) ||
        i.invoiceNumber.toLowerCase().includes(q),
    );
  }

  const page = params.page ?? 1;
  const paginated = filtered.slice((page - 1) * 10, page * 10);

  return useFetchData<InvoicesResponse>({
    url: makeEndpoint("/api/customer/invoices/", params),
    querykey: [INVOICES_QUERY_KEY, params],
    options: { enabled: false, initialData: { results: paginated, count: filtered.length } },
  });
}
