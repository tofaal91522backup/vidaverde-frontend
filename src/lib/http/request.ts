import apiClient from "./api-client";

import publicApiClient from "./public-api-client";

export const request = {
  get: async <T = unknown>(url: string): Promise<T> => {
    const res = await apiClient.get<T>(url);
    return res.data;
  },

  post: async <TRes = unknown, TBody = unknown>(
    url: string,
    data: TBody,
  ): Promise<TRes> => {
    const res = await apiClient.post<TRes>(url, data);
    return res.data;
  },

  put: async <TRes = unknown, TBody = unknown>(
    url: string,
    data: TBody,
  ): Promise<TRes> => {
    const res = await apiClient.put<TRes>(url, data);
    return res.data;
  },

  patch: async <TRes = unknown, TBody = unknown>(
    url: string,
    data: TBody,
  ): Promise<TRes> => {
    const res = await apiClient.patch<TRes>(url, data);
    return res.data;
  },

  delete: async <T = unknown>(url: string): Promise<T> => {
    const res = await apiClient.delete<T>(url);
    return res.data;
  },
  // advanced methods
  postFormData: async <TRes = unknown>(
    url: string,
    formData: FormData,
  ): Promise<TRes> => {
    const res = await apiClient.post<TRes>(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  /**
   * Binary download (PDF, file etc.) — JSON na, blob ashe.
   * Jemon: GET /student/invoices/:id/pdf/
   */
  getBlob: async (url: string): Promise<Blob> => {
    const res = await apiClient.get<Blob>(url, { responseType: "blob" });
    return res.data;
  },
};

/** Unauthenticated marketing/public requests — no session/token interceptors. */
export const publicRequest = {
  get: async <T = unknown>(url: string): Promise<T> => {
    const res = await publicApiClient.get<T>(url);
    return res.data;
  },

  post: async <TRes = unknown, TBody = unknown>(
    url: string,
    data: TBody,
  ): Promise<TRes> => {
    const res = await publicApiClient.post<TRes>(url, data);
    return res.data;
  },

  put: async <TRes = unknown, TBody = unknown>(
    url: string,
    data: TBody,
  ): Promise<TRes> => {
    const res = await publicApiClient.put<TRes>(url, data);
    return res.data;
  },

  patch: async <TRes = unknown, TBody = unknown>(
    url: string,
    data: TBody,
  ): Promise<TRes> => {
    const res = await publicApiClient.patch<TRes>(url, data);
    return res.data;
  },

  delete: async <T = unknown>(url: string): Promise<T> => {
    const res = await publicApiClient.delete<T>(url);
    return res.data;
  },

  postFormData: async <TRes = unknown>(
    url: string,
    formData: FormData,
  ): Promise<TRes> => {
    const res = await publicApiClient.post<TRes>(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  getBlob: async (url: string): Promise<Blob> => {
    const res = await publicApiClient.get<Blob>(url, {
      responseType: "blob",
    });
    return res.data;
  },
};
