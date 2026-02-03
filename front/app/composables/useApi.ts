import type { UseFetchOptions } from "#app";
import type { FetchOptions } from "ofetch";
import { defu } from "defu";

export const useApi = () => {
  const runtimeConfig = useRuntimeConfig();
  const xsrfToken = useCookie("XSRF-TOKEN");

  /** 共通ヘッダー作成 (毎回最新のCSRFトークンを取得する) */
  const createCommonOptions = () => ({
    baseURL: runtimeConfig.public.apiUrl,
    credentials: "include" as const,
    headers: {
      "X-XSRF-TOKEN": xsrfToken.value
        ? decodeURIComponent(xsrfToken.value)
        : "",
    },
  });

  // ofetchのmethodはstring型、$fetchの引数のmethodはenum型なので仕方なく
  type NormalizedFetchOptions = Omit<FetchOptions, "method"> & {
    method?: "GET" | "POST" | "PUT" | "DELETE";
  };

  /** useFetchのラッパー */
  const useCustomFetch = <T>(uri: string, option?: UseFetchOptions<T>) => {
    const commonOptions = createCommonOptions();
    const params = defu(option, commonOptions);
    return useFetch(uri, params);
  };

  /** $fetchのラッパー */
  const callApi = (uri: string, option: NormalizedFetchOptions = {}) => {
    const commonOptions = createCommonOptions();
    const params = defu(option, commonOptions);
    return $fetch(uri, params);
  };

  return { useCustomFetch, callApi };
};
