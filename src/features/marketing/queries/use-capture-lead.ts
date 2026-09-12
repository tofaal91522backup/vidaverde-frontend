import type {
  PublicAcknowledgementResponse,
  PublicLeadPayload,
} from "@/features/marketing/types/public-api.types";
import { useMutationHandler } from "@/hooks/use-mutation-handler";
import { publicRequest } from "@/lib/http/request";
import type { LeadFormValues } from "../schemas/lead.schema";

type LeadSource = NonNullable<PublicLeadPayload["source"]>;

type UseCaptureLeadOptions = {
  source: LeadSource;
  onSuccess?: (data: PublicAcknowledgementResponse) => void;
};

/** POST /public/leads/ — guide/newsletter opt-in, API idempotent. */
export function useCaptureLead({ source, onSuccess }: UseCaptureLeadOptions) {
  return useMutationHandler<PublicAcknowledgementResponse, LeadFormValues>({
    mutationFn: ({ first_name, email }) =>
      publicRequest.post("/public/leads/", {
        first_name,
        email,
        gdpr_consent: true,
        source,
      }),
    showSuccessToast: false,
    showErrorToast: false,
    errorMessage: "We could not save your subscription. Please try again.",
    debugLabel: "CaptureLead",
    onSuccess,
  });
}
