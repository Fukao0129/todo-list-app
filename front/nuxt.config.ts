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
});
