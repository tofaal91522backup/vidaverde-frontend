import type {
  PublicAcknowledgementResponse,
  PublicContactSubjectsResponse,
} from "@/features/marketing/types/public-api.types";
import { useFetchData } from "@/hooks/use-fetch-data";
import { useMutationHandler } from "@/hooks/use-mutation-handler";
import { publicRequest } from "@/lib/http/request";
import type { ContactFormValues } from "../schemas/contact.schema";

export const PUBLIC_CONTACT_SUBJECTS_QUERY_KEY = "public-contact-subjects";

/** GET /public/contact/subjects/ — labels and enum values from the backend. */
export function useContactSubjects() {
  return useFetchData<PublicContactSubjectsResponse>({
    url: "/public/contact/subjects/",
    querykey: [PUBLIC_CONTACT_SUBJECTS_QUERY_KEY],
    client: "public",
  });
}

/** POST /public/contact/ — public enquiry acknowledgement. */
export function useSendContactMessage({
  onSuccess,
}: {
  onSuccess?: (data: PublicAcknowledgementResponse) => void;
} = {}) {
  return useMutationHandler<PublicAcknowledgementResponse, ContactFormValues>({
    mutationFn: ({ programme, ...data }) =>
      publicRequest.post("/public/contact/", {
        ...data,
        programme: programme || undefined,
      }),
    showSuccessToast: false,
    showErrorToast: false,
    errorMessage: "We could not send your message. Please try again.",
    debugLabel: "SendContactMessage",
    onSuccess,
  });
}
