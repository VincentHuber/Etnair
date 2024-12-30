// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["nuxt-svgo", "@pinia/nuxt"],

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
}
});