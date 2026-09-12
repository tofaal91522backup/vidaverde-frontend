import { publicRequest, request } from "@/lib/http/request";
import {
  QueryKey,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

type FetchArgs<T> = {
  url: string;
  querykey: QueryKey;
  options?: Omit<UseQueryOptions<T>, "queryKey" | "queryFn">;
  /** Public routes bypass the authenticated Axios client. */
  client?: "authenticated" | "public";
};

export function useFetchData<T>({
  url,
  querykey,
  options,
  client = "authenticated",
}: FetchArgs<T>): UseQueryResult<T> {
  return useQuery<T>({
    queryKey: querykey,
    queryFn: async () =>
      (client === "public" ? publicRequest : request).get<T>(url),
    ...options,
  });
}
