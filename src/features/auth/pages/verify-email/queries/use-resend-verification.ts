import type { ResendVerificationResponse } from "@/features/auth/types/auth.types";
import { useMutationHandler } from "@/hooks/use-mutation-handler";
import { publicRequest } from "@/lib/http/request";

/**
 * `POST /student/registration/resend-email/` — notun confirmation link pathay.
 *
 * **Keno server action na** (baki auth page-er moto): eta kono session banay na,
 * tai httpOnly cookie set korar dorkar nai. Shadharon public mutation — tai
 * project-er normal `useMutationHandler` pattern-i thik, ar isPending/toast
 * binamulye pawa jay.
 *
 * ⚠️ **Backend iccha kore shob khetre ek-i 200 ar ek-i message dey** — email
 * registered thakuk, na thakuk, ba already verified houk. Na hole ei endpoint
 * diye keu ber kore felte parto kon email gula registered. Tai UI-te kokhono
 * "ei email ta nai" jatiyo kichu dekhano **jabe na** — backend-er message-i
 * hubohu dekhate hobe.
 *
 * `EMAIL_VERIFICATION_REQUIRED=False` hole eta no-op.
 *
 * docs/bruno/student/registration/resend-verification.bru
 */
export function useResendVerification() {
  return useMutationHandler<ResendVerificationResponse, { email: string }>({
    mutationFn: (payload) =>
      publicRequest.post<ResendVerificationResponse>(
        "/student/registration/resend-email/",
        payload,
      ),
    showSuccessToast: false,
    errorMessage: "Could not send the link. Please try again.",
    debugLabel: "ResendVerification",
  });
}
