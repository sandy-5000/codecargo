// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    '~/assets/css/main.css',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  plugins: [
    '~/plugins/fontawesome'
  ],
  modules: [
    'nuxt-icons',
    '@sidebase/nuxt-session',
  ],
  runtimeConfig: {
    MONGODB: process.env.MONGODB,
    SALT: process.env.SALT,
  }
})
