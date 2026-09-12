import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";

import { env } from "@/lib/env";
import {
  destroySession,
  getSession,
  updateTokens,
} from "../../features/auth/utils/session";

const apiClient = axios.create({
  // Browser bundle-e shudhu NEXT_PUBLIC_* env available thake.
  baseURL: env.NEXT_PUBLIC_BACKEND_URL,
});

type RetriableConfig = InternalAxiosRequestConfig & { _retry?: boolean };

apiClient.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return config;
});

/**
 * Ek shomoye ekta-i refresh call.
 *
 * Page load-e prai 4-5 ta query ek shathe jay. Access token expire thakle
 * **shob gula-i 401 khabe**, ar guard na thakle protyek-ta alada refresh call
 * korto — ek-i kaj 5 bar, ar 5 bar cookie lekha.
 *
 * Browser-e module state per-tab, tai ekhane eta nirapod. **Server-e eta kora
 * jabe na** — oikhane module state shob request-er moddhe share hoy, mane ek
 * user-er refresh promise onno user-er kache chole jete parto.
 */
let refreshPromise: Promise<string> | null = null;

async function refreshAccessToken(): Promise<string> {
  const session = await getSession();
  if (!session?.refreshToken) {
    throw new Error("No refresh token in session");
  }

  // `axios` (ei instance na) — na hole ei call-o interceptor-e dhukto ar
  // nijei nijeke abar refresh korar cheshta korto.
  //
  // Path `/get-access-token/`, `/rest-auth/token/refresh/` na. Duita-i ek kaj
  // kore, kintu bru doc sposhto bole: "Pick one and stay with it;
  // /get-access-token/ is the one the rest of this collection uses."
  const { data } = await axios.post<{ access: string; refresh?: string }>(
    `${env.NEXT_PUBLIC_BACKEND_URL}/get-access-token/`,
    { refresh: session.refreshToken },
  );

  // Response-e shudhu `access` ashe — refresh token rotate hoy na, tai purono ta
  // rekhe deya hoy.
  await updateTokens({
    accessToken: data.access,
    refreshToken: data.refresh ?? session.refreshToken,
  });

  return data.access;
}

/**
 * 401 -> ek bar refresh kore original request retry.
 *
 * ⚠️ Age ekhane **duita** response interceptor chilo: prothom ta 401 dekhlei
 * `destroySession()` dito, ar tar pore-r ta refresh korar cheshta korto. Axios
 * interceptor register-er order-e chole, tai prothom ta age-i session muche
 * dito ar refresh-er code-e **kokhono pouchato na** — access token expire
 * howa mane-i user logout. `api-server.ts` e oi interceptor ta comment kora
 * chilo, mane server-side-e keu ek bar dhorechilo, client-side-e thik hoy ni.
 */
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetriableConfig | undefined;

    if (error.response?.status !== 401 || !originalRequest) {
      return Promise.reject(error);
    }

    // Retry-o 401 khele ar cheshta na kore logout — na hole infinite loop.
    if (originalRequest._retry) {
      await destroySession();
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      refreshPromise = refreshPromise ?? refreshAccessToken();
      const accessToken = await refreshPromise;

      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return apiClient(originalRequest);
    } catch (refreshError) {
      // Refresh token nijei expire/invalid — ekhane logout-i ekmatro poth.
      await destroySession();
      return Promise.reject(refreshError);
    } finally {
      refreshPromise = null;
    }
  },
);

export default apiClient;
