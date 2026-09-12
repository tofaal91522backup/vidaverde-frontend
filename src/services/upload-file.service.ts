import { request } from "@/lib/http/request";

type UploadResponse = {
  success: boolean;
  url: string;
  filename: string;
  size: number;
};

/**
 * POST /administrator/upload/ — ekta file upload kore public URL fire dey.
 *
 * File ei server-e store hoy na — Ongshak-er transfer service-e chole jay ar
 * shudhu URL ta rakha hoy. Ei karonei model-e shob field `*_url`.
 *
 * Path-e "administrator" thakleo ei route ta shob jaygay (student profile,
 * admin blog/teacher form) use kora hoy.
 *
 * Backend-er niyom:
 * - Sorbochho 20 MB, boro hole 400
 * - 2 MB-er beshi jpg/jpeg/png hole jawar pothe compress hoy
 *
 * Fire asha URL `profile_img_url`, `image_url`, `photo_url` ba blog-er
 * `image_urls`-e boshanor jonno.
 *
 * docs/bruno/administrator/upload.bru
 */
export const uploadSingleFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await request.postFormData<UploadResponse>(
    "/administrator/upload/",
    formData,
  );

  const url = res?.url;
  if (!url) throw new Error("Upload succeeded but URL was not returned");

  return url;
};
