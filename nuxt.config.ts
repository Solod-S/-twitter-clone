// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],

  runtimeConfig: {
    // JWT
    jwtAccessSecret: process.env.JWT_ACCESSTOKEN_SECRET,
    jwtRefreshSecret: process.env.JWT_REFRESHTOKEN_SECRET,
    // CLOUDINARY
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
  },
});
