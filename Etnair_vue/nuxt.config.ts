// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-01-04",
  devtools: { enabled: true },
  modules: [
    "nuxt-svgo",
    "@pinia/nuxt",
    "@nuxtjs/cloudinary",
    "pinia-plugin-persistedstate/nuxt",
  ],

  svgo: {
    defaultImport: "component",
  },

  build: {
    transpile: ["@vuepic/vue-datepicker"],
  },
  vite: {
    css: {
      preprocessorOptions: {
        less: {
          additionalData: `@import (once) '@/assets/less/_import.less';`,
        },
      },
    },
  },

  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
  },
});