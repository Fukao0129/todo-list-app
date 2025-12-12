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
    baseUrl: "http://localhost", // "https://api-production-597b.up.railway.app", // "http://localhost",
    redirect: {
      onLogout: "/login", // ログアウト後のリダイレクト先
    },
    endpoints: {
      // csrf: "/api/sanctum/csrf-cookie",
      user: "/api/me",
    },
    globalMiddleware: {
      enabled: true,
    },
  },
  routeRules: {
    "/api/**": {
      proxy: "https://api-production-597b.up.railway.app/**",
    },
    "/sanctum/csrf-cookie": {
      proxy: "https://api-production-597b.up.railway.app/sanctum/csrf-cookie",
    },
    "/login": {
      proxy: "https://api-production-597b.up.railway.app/login",
    },
    "/logout": {
      proxy: "https://api-production-597b.up.railway.app/logout",
    },
  },
});
