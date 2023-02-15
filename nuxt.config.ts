// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss'],
    srcDir: 'src',
    ssr: false,
    css: ['normalize.css/normalize.css'],
    experimental: {
        reactivityTransform: true,
    },
    app: {
        head: {
            title: 'Deliever42',
            meta: [
                {
                    name: 'description',
                    content: 'Hello! My name is Emirhan and I living in Turkey.',
                },
                {
                    name: 'keywords',
                    content: 'deliever42, emirhan77, deliever, emirhan, addox',
                },
                {
                    name: 'author',
                    content: 'Deliever42',
                },
            ],
            link: [
                {
                    rel: 'icon',
                    href: '/favicon.ico',
                },
                {
                    rel: 'stylesheet',
                    href: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css',
                },
                {
                    rel: 'preconnect',
                    href: 'https://fonts.googleapis.com',
                },
                {
                    rel: 'preconnect',
                    href: 'https://fonts.gstatic.com',
                },
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap',
                },
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;600;700&display=swap',
                },
            ],
        },
    },
});
