import type {
  PublicCheckoutPayload,
  PublicCheckoutResponse,
} from "@/features/marketing/types/public-api.types";
import { useMutationHandler } from "@/hooks/use-mutation-handler";
import { publicRequest } from "@/lib/http/request";

/**
 * Phase 1-e backend ekta dummy gateway chalay — `"declined"` chhara shob value
 * pass kore. **Kono card number/CVC ei frontend collect kore na**; asol Stripe
 * Elements bhobishshot-er scope.
 *
 * docs/bruno/public/checkout.bru
 */
export const DUMMY_PAYMENT_METHOD = "pm_card_visa";

/**
 * POST /public/bookings/checkout/ — puro public booking flow ek call-e.
 *
 * Ek transaction-e slot validate kore, User + Student khuje/banay, purchase
 * banay, gateway charge kore, prothom class book kore ar invoice issue kore.
 * Kichu fail korle kichu-i thake na.
 *
 * `start_datetime` e slots API-r `start_utc` **hubohu** jete hobe — backend
 * abar validate kore, tai nijer banano time pathale reject hobe.
 */
export function useCheckout({
  onSuccess,
}: {
  onSuccess?: (data: PublicCheckoutResponse) => void;
} = {}) {
  return useMutationHandler<PublicCheckoutResponse, PublicCheckoutPayload>({
    mutationFn: (payload) =>
      publicRequest.post("/public/bookings/checkout/", payload),
    // Error ta form-er nijer jaygay dekhano hoy, toast-e na — visitor jate
    // "confirmed" screen-er bodole sposhto karon dekhe
    showSuccessToast: false,
    showErrorToast: false,
    errorMessage: "We could not complete your booking. Please try again.",
    debugLabel: "PublicCheckout",
    onSuccess,
  });
}
