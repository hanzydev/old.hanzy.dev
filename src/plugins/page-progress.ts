import NProgress from 'nprogress';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hooks.hook('page:start', () => {
        NProgress.start();
    });
    nuxtApp.hooks.hook('page:finish', () => {
        setTimeout(() => {
            NProgress.done();
        }, 1000);
    });
});
