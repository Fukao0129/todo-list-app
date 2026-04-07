import type { UseFetchOptions } from "#app";
import type { FetchOptions } from "ofetch";
import { defu } from "defu";

export const useApi = () => {
  const runtimeConfig = useRuntimeConfig();
  const xsrfToken = useCookie("XSRF-TOKEN");
  const reqHeaders = useRequestHeaders(); // SSR用ヘッダー

  /** 共通ヘッダー作成 (毎回最新のCSRFトークンを取得する) */
  const createCommonOptions = () => ({
    baseURL:
      import.meta.server && runtimeConfig.serverApiUrl // SSR時はDocker内部ネットワークのURLを使用する
        ? runtimeConfig.serverApiUrl
        : runtimeConfig.public.apiUrl,
    credentials: "include" as const,
    headers: {
      ...(import.meta.server ? reqHeaders : {}),
      "X-XSRF-TOKEN": xsrfToken.value
        ? decodeURIComponent(xsrfToken.value)
        : "",
      Accept: "application/json",
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
