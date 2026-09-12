/**
 * Backend theke asha blob (PDF, CSV) browser diye save koray.
 *
 * Student invoice PDF ar admin CSV export — duito jaygay lage, tai ek jaygay.
 */
export function saveBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

/** `vidaverde-bookings-20260912.csv` er moto naam banate */
export function dateStamp(date = new Date()): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}${month}${day}`;
}
