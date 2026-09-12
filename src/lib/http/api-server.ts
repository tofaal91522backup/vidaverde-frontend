"use server";
import { env } from "@/lib/env";

import axios from "axios";
import { destroySession, getSession, updateTokens } from "../../features/auth/utils/session";

const apiServer = axios.create({
  baseURL: env.BACKEND_URL,
  // withCredentials: true,
});

apiServer.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return config;
});

/**
 * 401 -> ek bar refresh kore retry, na parle logout.
 *
 * ⚠️ Ekhane **ekta-i** response interceptor thakte hobe. Ager version-e ek ta
 * "401 hole shoja destroySession()" interceptor ei tar age register kora chilo
 * (ekhon mucha) — axios order-e chole, tai oi ta age-i session muche dito ar
 * niche-r refresh code-e kokhono pouchato na.
 *
 * `api-client.ts` er moto **single-flight guard ekhane rakha hoy nai** ar
 * rakha-o jabe na: server-e module-level state shob request-er moddhe share
 * hoy, mane ek user-er refresh promise onno user-er kache chole jeto.
 */
apiServer.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 hole ar retry flag na thakle
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // infinite loop band korte

      try {
        const session = await getSession();
        if (!session?.refreshToken) {
          await destroySession();
          return Promise.reject(error);
        }

        // backend e refresh token pathao
        const { data } = await axios.post(
          `${env.BACKEND_URL}/get-access-token/`,
          { refresh: session.refreshToken },
        );

        // session update koro new tokens diye
        await updateTokens({
          accessToken: data.access,
          refreshToken: data.refresh ?? session.refreshToken,
        });

        // original request e new token set kore retry
        originalRequest.headers.Authorization = `Bearer ${data.access}`;
        return apiServer(originalRequest);
      } catch (refreshError) {
        // refresh o fail korle logout
        await destroySession();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
export default apiServer;
