// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import { definePreset } from "@primeuix/themes";
import Aura from "@primeuix/themes/aura";

const MyPreset = definePreset(Aura, {
  semantic: {
primary: {
  50: '#f0f9f9',
  100: '#dbf0f0',
  200: '#bae1e2',
  300: '#8cccce',
  400: '#57aeb2',
  500: '#04383F',  // Your main color
  600: '#036169',
  700: '#045055',
  800: '#064247',
  900: '#08373c',
  950: '#021d20'
}
  },
});

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  ssr: false, 
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL || "http://localhost:3000/api/v2",
      institutionsResource: process.env.INSTITUTIONS_RESOURCE ,
      imageUrl: process.env.API_IMAGE_URL ,
      institutionServicesResource: process.env.INSTITUTION_SERVICE_RESOURCE ,
      categoriesResource: process.env.CATEGORY_RESOURCE ,
      servicesResource: process.env.SERVICE_RESOURCE ,
      reportResource: process.env.REPORT_RESOURCE,
      verifyFormFieldsResource:  process.env.VERIFY_FORM_FIELDS_RESOURCE ,
      submitFormFieldsResource: process.env.SUBMIT_FORM_FIELDS_RESOURCE ,
      verifyPaymentAccountNumberResource: process.env.VERIFY_PAYMENT_ACCOUNT_NUMBER , 
      loginResource: process.env.LOGIN_RESOURCE,
      loginWithTokenResource: process.env.LOGIN_WITH_TOKEN_RESOURCE,
      appTitle: process.env.APP_TITLE
    },
  },
  modules: [
    "@nuxt/image",
    "@nuxt/icon",
    "@nuxtjs/color-mode",
    "@pinia/nuxt",
    "@primevue/nuxt-module",
  ],

  primevue: {
    options: {
      ripple: true,
      inputVariant: "filled",
      theme: {
        preset: MyPreset,
        options: {
          darkModeSelector: ".dark-mode",
          cssLayer: false,
        },
      },
    },
  },

  colorMode: {
    classSuffix: "-mode",
  },

  // Configure component auto-discovery for Nuxt 4 app directory
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],

  // Add path aliases for Nuxt 4 app directory structure
  alias: {
    "@": "~/app",
    "@/components": "~/app/components",
    "@/lib": "~/app/lib",
    "@/utils": "~/app/lib",
  },

  css: ["~/assets/css/tailwind.css"],

  vite: {
    plugins: [tailwindcss()],
  },
});
