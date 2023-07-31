// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
    devtools: { enabled: true },
    srcDir: 'src',
    tailwindcss: {
        cssPath: '~/styles/main.css',
        configPath: 'tailwind.config.js',
    },
});
