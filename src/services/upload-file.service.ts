import { request } from "@/lib/http/request";

/**
 * ⚠️ Ei shape **asol API theke verify kora** (2026-09-12), bru doc theke na.
 *
 * Live response:
 * `{ success: true, filename, stored_path, compression_started }` — HTTP 201
 *
 * Bru doc-e (`docs/bruno/administrator/upload.bru`) lekha ache `url` ar `size`,
 * kintu **asole oi duita ashe na**. Doc ta purono. `url` rakha hoyeche shudhu
 * fallback hisebe — kono din backend nijer doc-er shathe milie dile-o kaj korbe.
 */
type UploadResponse = {
  success: boolean;
  filename: string;
  /** Asol URL ekhane ashe */
  stored_path?: string;
  /** Doc-e ei naam lekha; live API-te ekhono nai */
  url?: string;
  /** Boro jpg/png hole backend background-e compress kore */
  compression_started?: boolean;
};

/**
 * POST /administrator/upload/ — ekta file upload kore public URL fire dey.
 *
 * **Client-side** — file browser theke shoja backend-e jay, Next.js server diye na.
 *
 * File ei server-e store hoy na; Ongshak-er transfer service-e chole jay ar
 * shudhu URL ta rakha hoy. Ei karonei model-e shob field `*_url`.
 *
 * ✅ **Path-e "administrator" thakleo route ta shob role-er jonno** — admin ar
 * student **duita token diye-i test kora hoyeche**, duitatei 201.
 *
 * Backend-er niyom: sorbochho 20 MB (boro hole 400); 2 MB-er beshi jpg/png
 * jawar pothe compress hoy.
 *
 * Fire asha URL `profile_img_url`, `image_url`, `photo_url` ba blog-er
 * `image_urls`-e boshanor jonno.
 */
export const uploadSingleFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await request.postFormData<UploadResponse>(
    "/administrator/upload/",
    formData,
  );

  const url = res?.stored_path || res?.url;
  if (!url) throw new Error("Upload succeeded but no file URL was returned");

  return url;
};
