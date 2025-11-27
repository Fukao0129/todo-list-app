// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: false },
  runtimeConfig: {
    public: {
      apiUrl: "http://localhost/api",
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "ja",
      },
    },
  },
  css: [
    "@/assets/style/index.css",
    "@fortawesome/fontawesome-svg-core/styles.css",
  ],
  imports: { dirs: ["@/constants/**"] },
  modules: ["nuxt-auth-sanctum", "@pinia/nuxt"],

  // 認証関連の設定 https://sanctum.manchenkoff.me/usage/configuration
  sanctum: {
    baseUrl: "http://localhost",
    redirect: {
      onLogout: "/login", // ログアウト後のリダイレクト先
    },
    endpoints: {
      user: "/api/me",
    },
    globalMiddleware: {
      enabled: true,
    },
  },
});
