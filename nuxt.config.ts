// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import { definePreset } from "@primeuix/themes";
import Aura from "@primeuix/themes/aura";

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: "#fef7ed",
      100: "#fdedd3",
      200: "#fad7a5",
      300: "#f6bc6d",
      400: "#f19833",
      500: "#D8711E", // Your main color
      600: "#c85914",
      700: "#a64613",
      800: "#883817",
      900: "#6f2f16",
      950: "#3c1508",
    },
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
      institutionServicesResource: process.env.INSTITUTION_SERVICE_RESOURCE ,
      categoriesResource: process.env.CATEGORY_RESOURCE ,
      servicesResource: process.env.SERVICE_RESOURCE ,
      verifyFormFieldsResource:  process.env.VERIFY_FORM_FIELDS_RESOURCE ,
      submitFormFieldsResource: process.env.SUBMIT_FORM_FIELDS_RESOURCE ,
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
