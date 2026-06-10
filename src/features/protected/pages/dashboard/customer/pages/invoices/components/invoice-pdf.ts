import { Invoice } from "../queries/use-invoices";

export function downloadInvoicePdf(invoice: Invoice) {
  const statusColor = invoice.paymentStatus === "paid" ? "#16a34a" : invoice.paymentStatus === "pending" ? "#d97706" : "#dc2626";
  const statusLabel = invoice.paymentStatus.charAt(0).toUpperCase() + invoice.paymentStatus.slice(1);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Invoice ${invoice.invoiceNumber}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: #111; background: #fff; padding: 48px; max-width: 640px; margin: 0 auto; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; }
    .brand { font-size: 22px; font-weight: 700; color: #1f3d1a; }
    .brand span { color: #a3d635; }
    .invoice-title { font-size: 28px; font-weight: 700; color: #111; text-align: right; }
    .invoice-num { font-size: 13px; color: #666; text-align: right; margin-top: 4px; }
    .divider { border: none; border-top: 1px solid #e5e7eb; margin: 24px 0; }
    .row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; }
    .row .label { color: #6b7280; }
    .row .value { font-weight: 500; }
    .total-row { display: flex; justify-content: space-between; padding: 16px 0; font-size: 18px; font-weight: 700; margin-top: 8px; }
    .status-badge { display: inline-block; padding: 2px 10px; border-radius: 9999px; font-size: 12px; font-weight: 600; color: #fff; background: ${statusColor}; }
    .footer { margin-top: 48px; font-size: 12px; color: #9ca3af; text-align: center; }
    @media print { body { padding: 32px; } }
  </style>
</head>
<body>
  <div class="header">
    <div class="brand">Vida<span>Verde</span></div>
    <div>
      <div class="invoice-title">Invoice</div>
      <div class="invoice-num">${invoice.invoiceNumber}</div>
    </div>
  </div>

  <hr class="divider" />

  <div class="row"><span class="label">Date</span><span class="value">${new Date(invoice.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span></div>
  <div class="row"><span class="label">Package</span><span class="value">${invoice.package}</span></div>
  <div class="row"><span class="label">Teacher</span><span class="value">${invoice.teacher}</span></div>
  <div class="row"><span class="label">Sessions included</span><span class="value">${invoice.sessions} class${invoice.sessions !== 1 ? "es" : ""}</span></div>
  <div class="row"><span class="label">Payment status</span><span class="value"><span class="status-badge">${statusLabel}</span></span></div>

  <hr class="divider" />

  <div class="total-row"><span>Total</span><span>$${invoice.amount.toFixed(2)}</span></div>

  <div class="footer">
    Vida Verde Language School · vidaverdeespañol.com · Thank you for learning with us!
  </div>
</body>
</html>`;

  const win = window.open("", "_blank");
  if (win) {
    win.document.write(html);
    win.document.close();
    win.setTimeout(() => win.print(), 300);
  }
}
