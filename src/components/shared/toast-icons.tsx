import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";

/**
 * Sonner toast-er icon.
 *
 * Age ekhane emoji ("✅" / "❌") boshano hoto. Emoji OS onujayi alada dekhay,
 * theme-er rong mane na ar font-er cheye boro/chhoto hoye jay — tai lucide
 * icon.
 *
 * Egula module-level React **element**, component na — `toast(msg, { icon })`
 * element-i chay. Ek bar toiri hoy, shob toast-e ek-i element reuse hoy, ar
 * `.ts` hook file theke-o import kora jay (JSX lekha lage na).
 */
export const toastIcons = {
  success: <CheckCircle2 className="size-4.5 text-emerald-600" />,
  error: <XCircle className="size-4.5 text-red-600" />,
  warning: <AlertTriangle className="size-4.5 text-amber-600" />,
};
