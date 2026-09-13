import type {
  PublicBlogDetail,
  PublicBlogDetailResponse,
} from "@/features/marketing/types/public-api.types";
import { makeEndpoint } from "@/lib/http/make-endpoint";
import { publicRequest } from "@/lib/http/request";
import axios from "axios";

/**
 * GET /public/blogs/:slug/ — **server-side** fetch.
 *
 * Ei ta hook na: blog detail ekta server component, jate SEO metadata ar body
 * server-ei toiri hoy (ar unsanitized HTML browser porjonto na jay).
 *
 * Draft post ekhane 404 dey — public API-i authority.
 *
 * @returns post, ba `null` jodi backend 404 dey.
 * @throws onnano network/server error — page tokhon error boundary-te jabe,
 *   karon "server down" ke "post nai" bole dekhano bhul hoto.
 *
 * ⚠️ Response ta **envelope-e mora**: `{ success, post: {...} }` — list
 * endpoint-er moto bare na. Age puro response-ta-i post hisebe fire deওয়া
 * hocchilo, tai page-e title/body/reading_time shob `undefined` ashto ar
 * article ta khali dekhato.
 *
 * docs/bruno/public/blog detail.bru
 */
export async function getPublicBlogDetail(
  slug: string,
  lang: string,
): Promise<PublicBlogDetail | null> {
  try {
    const response = await publicRequest.get<PublicBlogDetailResponse>(
      makeEndpoint(`/public/blogs/${encodeURIComponent(slug)}/`, { lang }),
    );

    return response?.post ?? null;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
}
