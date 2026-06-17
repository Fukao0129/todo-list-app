import type { UseFetchOptions } from "#app";
import type { FetchOptions } from "ofetch";
import { defu } from "defu";

export const useApi = () => {
  const runtimeConfig = useRuntimeConfig();
  const xsrfToken = useCookie("XSRF-TOKEN");
  const reqHeaders = useRequestHeaders(["cookie"]); // SSR用Cookieヘッダー
  const requestUrl = useRequestURL(); // SSR実行中のフロントオリジン取得用

  /** 共通ヘッダー作成 (毎回最新のCSRFトークンを取得する) */
  const createCommonOptions = () => ({
    baseURL:
      import.meta.server && runtimeConfig.serverApiUrl // SSR時はDocker内部ネットワークのURLを使用する
        ? runtimeConfig.serverApiUrl
        : runtimeConfig.public.apiUrl,
    credentials: "include" as const,
    headers: {
      // SSRはAPIへ直接アクセスするため、Cookieに加えてSanctumのステートフル判定用に
      // Refererを自分のオリジンで明示する（再読み込み時はブラウザのRefererが無いため）
      ...(import.meta.server
        ? { ...reqHeaders, referer: requestUrl.origin }
        : {}),
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
    // CSRとSSRでキーが一致するように、baseURLを含めないで生成する
    const key = JSON.stringify([
      uri,
      toValue(option?.query),
      option?.method ?? null,
    ]);
    return useFetch(uri, { ...params, key });
  };

  /** $fetchのラッパー */
  const callApi = (uri: string, option: NormalizedFetchOptions = {}) => {
    const commonOptions = createCommonOptions();
    const params = defu(option, commonOptions);
    return $fetch(uri, params);
  };

  return { useCustomFetch, callApi };
};
