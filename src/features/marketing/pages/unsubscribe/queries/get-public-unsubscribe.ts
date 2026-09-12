import type { PublicUnsubscribeResponse } from "@/features/marketing/types/public-api.types";
import { publicRequest } from "@/lib/http/request";
import axios from "axios";

export type UnsubscribeResult =
  | { ok: true; message: string }
  | { ok: false; message: string };

/**
 * GET /public/leads/unsubscribe/:token/ — one-click unsubscribe.
 *
 * Nurture email-er footer-e ei link thake; token ta `Lead.unsubscribe_token`.
 * Backend lead ke unsubscribed mark kore ar tar jonno queue-e thaka shob email
 * cancel kore. **Idempotent** — ekadhikbar khullei shomossha nai.
 *
 * Eta hook na: page ta server component, jate email theke click korle
 * JS chhara-o kaj kore ar loading flash na hoy.
 *
 * docs/bruno/public/unsubscribe.bru
 */
export async function getPublicUnsubscribe(
  token: string,
): Promise<UnsubscribeResult> {
  try {
    const data = await publicRequest.get<PublicUnsubscribeResponse>(
      `/public/leads/unsubscribe/${encodeURIComponent(token)}/`,
    );

    return { ok: true, message: data.message || "You have been unsubscribed." };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;

      // Ochena ba meyade-uttirno token — 404/400
      if (status === 404 || status === 400) {
        return {
          ok: false,
          message:
            error.response?.data?.message ??
            "This unsubscribe link is not valid any more.",
        };
      }
    }

    // Server/network problem — "token vul" bola hoto bhul, karon token thik-o hote pare
    return {
      ok: false,
      message:
        "We could not process this request right now. Please try the link again shortly.",
    };
  }
}
