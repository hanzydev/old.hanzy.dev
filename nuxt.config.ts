export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss',
        '@pinia/nuxt',
    ],
    srcDir: 'src',
    ssr: false,
    css: ['normalize.css/normalize.css'],
    experimental: {
        reactivityTransform: true,
    },
    app: {
        head: {
            title: 'Hànzy',
            meta: [
                {
                    name: 'description',
                    content:
                        'Hi! My name is Emirhan, I am a Full-Stack Developer and UI Designer. I live in Turkey.',
                },
                {
                    name: 'keywords',
                    content: 'hànzy, hanzy, emirhan',
                },
                {
                    name: 'author',
                    content: 'Hànzy',
                },
                {
                    name: 'theme-color',
                    content: '#2563EB',
                },
                {
                    property: 'og:title',
                    content: 'Hànzy',
                },
                {
                    property: 'og:description',
                    content:
                        'Hi! My name is Emirhan, I am a Full-Stack Developer and UI Designer. I live in Turkey.',
                },
                {
                    property: 'og:image',
                    content: '/hanzy.png',
                },
                {
                    property: 'og:url',
                    content: 'https://hanzy.dev',
                },
            ],
            link: [
                {
                    rel: 'icon',
                    href: '/favicon.ico',
                },
            ],
            htmlAttrs: {
                lang: 'en',
            },
        },
    },
});
