const randomString = (length: number) => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';

    for (let i = length; i > 0; --i) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }

    return result;
};

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxt/image-edge', '@nuxtjs/robots'],
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
                    content:
                        'Hi! My name is Emirhan, I am a Full-Stack Developer and UI Designer. I live in Turkey.',
                },
                {
                    name: 'keywords',
                    content: 'deliever42, deliever, emirhan',
                },
                {
                    name: 'author',
                    content: 'Deliever42',
                },
                {
                    name: 'theme-color',
                    content: '#2563EB',
                },
                {
                    property: 'og:title',
                    content: 'Deliever42',
                },
                {
                    property: 'og:description',
                    content:
                        'Hi! My name is Emirhan, I am a Full-Stack Developer and UI Designer. I live in Turkey.',
                },
                {
                    property: 'og:image',
                    content: '/deliever.png',
                },
                {
                    property: 'og:url',
                    content: 'https://deliever42.me',
                },
            ],
            link: [
                {
                    rel: 'icon',
                    href: '/favicon.ico',
                },
                {
                    rel: 'stylesheet',
                    href: '/fonts.css',
                },
            ],
            htmlAttrs: {
                lang: 'en',
            },
        },
    },
    vite: {
        build: {
            rollupOptions: {
                output: {
                    chunkFileNames: () => `_nuxt/chunks/${randomString(32)}.js`,
                    entryFileNames: () => `_nuxt/chunks/${randomString(32)}.js`,
                    assetFileNames: () => `_nuxt/assets/${randomString(32)}[extname]`,
                    manualChunks: (id) => {
                        if (id.includes('node_modules')) {
                            return `_nuxt/chunks/${randomString(32)}.js`;
                        } else {
                            return id;
                        }
                    },
                },
            },
        },
    },
});
