// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: false },
  runtimeConfig: {
    public: {
      apiUrl: "http://localhost/api", // 本番環境ではRailwayのNUXT_PUBLIC_API_URL変数で上書きされる
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
  modules: ["nuxt-auth-sanctum", "@pinia/nuxt", "@nuxtjs/tailwindcss"],

  // 認証関連の設定 https://sanctum.manchenkoff.me/usage/configuration
  sanctum: {
    baseUrl: "http://localhost", // 本番環境ではRailwayのNUXT_PUBLIC_SANCTUM_BASE_URL変数で上書きされる
    redirect: {
      onLogout: "/login", // ログアウト後のリダイレクト先
    },
    endpoints: {
      user: "/api/me",
      login: "/api/login",
      logout: "/api/logout",
    },
    globalMiddleware: {
      enabled: true,
    },
  },
  // 本番環境ではフロントの/apiディレクトリにAPIコールするので、APIサーバにプロキシする
  nitro: {
    routeRules: {
      "/api/**": {
        proxy: "https://api-production-597b.up.railway.app/api/**",
      },
      "/sanctum/csrf-cookie": {
        proxy: "https://api-production-597b.up.railway.app/sanctum/csrf-cookie",
      },
    },
  },
});
