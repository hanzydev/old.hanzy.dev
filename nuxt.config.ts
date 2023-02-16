// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
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
                    content: 'Hi! My name is Emirhan, I am a Full-Stack Developer and UI Designer. I live in Turkey.',
                },
                {
                    name: 'keywords',
                    content: 'deliever42, deliever, emirhan',
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
                    rel: 'stylesheet',
                    href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css',
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
