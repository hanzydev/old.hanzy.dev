<template>
    <div v-if="github.dataReceived">
        <div class="pt-8 lg:pt-16"></div>
        <div
            class="flex h-full pt-[52px] md:pt-[68px] items-center justify-center px-6 md:px-48 mb-8"
        >
            <div class="grid xl:grid-cols-2 2xl:grid-cols-3 gap-4 items-center justify-center">
                <a
                    v-for="repository in github.data"
                    class="repository opacity-0 flex flex-col p-4 rounded-lg shadow-lg h-36 transition-all duration-300"
                    style="background-color: rgba(0, 0, 0, 0.2)"
                    :href="repository.url"
                    target="_blank"
                >
                    <p class="text-md font-bold m-0 font-robotomono">{{ repository.name }}</p>
                    <p class="text-sm font-robotomono text-gray-300 mt-3">
                        {{
                            repository.description.length > 85
                                ? repository.description.slice(0, 82) + '...'
                                : repository.description
                        }}
                    </p>
                    <div class="flex mt-auto m-0 gap-2">
                        <button
                            class="flex text-gray-300 py-1 px-2 gap-2 rounded-lg items-center font-robotomono text-sm"
                            style="background-color: rgba(0, 0, 0, 0.2)"
                        >
                            <svg height="1em" viewBox="0 0 16 16" version="1.1" width="1em">
                                <path
                                    fill-rule="evenodd"
                                    d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"
                                    fill="#fff"
                                ></path>
                            </svg>
                            {{ repository.stars }}
                        </button>
                        <button
                            class="flex text-gray-300 py-1 px-2 gap-2 rounded-lg items-center font-robotomono text-sm"
                            style="background-color: rgba(0, 0, 0, 0.2)"
                        >
                            <svg height="1em" viewBox="0 0 16 16" version="1.1" width="1em">
                                <path
                                    fill-rule="evenodd"
                                    d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                    fill="#fff"
                                ></path>
                            </svg>
                            {{ repository.forks }}
                        </button>
                        <button
                            class="flex text-gray-300 py-1 px-2 gap-2 rounded-lg items-center font-robotomono text-sm max-sm:hidden"
                            style="background-color: rgba(0, 0, 0, 0.2)"
                        >
                            <svg height="1em" viewBox="0 0 16 16" version="1.1" width="1em">
                                <path
                                    fill-rule="evenodd"
                                    d="M8.75.75a.75.75 0 00-1.5 0V2h-.984c-.305 0-.604.08-.869.23l-1.288.737A.25.25 0 013.984 3H1.75a.75.75 0 000 1.5h.428L.066 9.192a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.514 3.514 0 00.686.45A4.492 4.492 0 003 11c.88 0 1.556-.22 2.023-.454a3.515 3.515 0 00.686-.45l.045-.04.016-.015.006-.006.002-.002.001-.002L5.25 9.5l.53.53a.75.75 0 00.154-.838L3.822 4.5h.162c.305 0 .604-.08.869-.23l1.289-.737a.25.25 0 01.124-.033h.984V13h-2.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-2.5V3.5h.984a.25.25 0 01.124.033l1.29.736c.264.152.563.231.868.231h.162l-2.112 4.692a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.517 3.517 0 00.686.45A4.492 4.492 0 0013 11c.88 0 1.556-.22 2.023-.454a3.512 3.512 0 00.686-.45l.045-.04.01-.01.006-.005.006-.006.002-.002.001-.002-.529-.531.53.53a.75.75 0 00.154-.838L13.823 4.5h.427a.75.75 0 000-1.5h-2.234a.25.25 0 01-.124-.033l-1.29-.736A1.75 1.75 0 009.735 2H8.75V.75zM1.695 9.227c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L3 6.327l-1.305 2.9zm10 0c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L13 6.327l-1.305 2.9z"
                                    fill="#fff"
                                ></path>
                            </svg>
                            {{
                                typeof repository.license === 'string'
                                    ? repository.license
                                    : repository.license.name
                            }}
                        </button>
                        <button
                            class="flex text-gray-300 py-1 px-2 gap-2 rounded-lg items-center ml-auto font-robotomono text-sm"
                            style="background-color: rgba(0, 0, 0, 0.2)"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#000000"
                                width="1em"
                                height="1em"
                                viewBox="0 0 480 480"
                            >
                                <path
                                    d="M478.33,433.6l-90-218a22,22,0,0,0-40.67,0l-90,218a22,22,0,1,0,40.67,16.79L316.66,406H419.33l18.33,44.39A22,22,0,0,0,458,464a22,22,0,0,0,20.32-30.4ZM334.83,362,368,281.65,401.17,362Z"
                                    fill="#fff"
                                />
                                <path
                                    fill="#fff"
                                    d="M267.84,342.92a22,22,0,0,0-4.89-30.7c-.2-.15-15-11.13-36.49-34.73,39.65-53.68,62.11-114.75,71.27-143.49H330a22,22,0,0,0,0-44H214V70a22,22,0,0,0-44,0V90H54a22,22,0,0,0,0,44H251.25c-9.52,26.95-27.05,69.5-53.79,108.36-31.41-41.68-43.08-68.65-43.17-68.87a22,22,0,0,0-40.58,17c.58,1.38,14.55,34.23,52.86,83.93.92,1.19,1.83,2.35,2.74,3.51-39.24,44.35-77.74,71.86-93.85,80.74a22,22,0,1,0,21.07,38.63c2.16-1.18,48.6-26.89,101.63-85.59,22.52,24.08,38,35.44,38.93,36.1a22,22,0,0,0,30.75-4.9Z"
                                />
                            </svg>
                            {{ repository.language }}
                        </button>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div class="flex items-center justify-center h-screen" v-else>
        <Spinner size="xl" />
    </div>
    <Footer />
</template>

<script setup lang="ts">
import { useGithub } from '../store';
import gsap from 'gsap';
import { t, currentLocale } from '../i18n';

watch(currentLocale, () => {
    useHead({
        title: `Hànzy - ${t('navbar.projects')}`,
        meta: [
            {
                name: 'description',
                content: t('about.short_description'),
            },
            {
                property: 'og:description',
                content: t('about.short_description'),
            },
        ],
    });
});

const github = useGithub();

onMounted(async () => {
    const { data } = await useFetch('/api/repositories');
    const repositories = Array.from(data.value!);

    github.setData(repositories);
});

watchEffect(() => {
    if (github.dataReceived) {
        nextTick(() => {
            gsap.fromTo(
                '.repository',
                { y: 20 },
                { opacity: 1, y: 0, duration: 0.2, stagger: 0.05 },
            );

            const repositories = document.querySelectorAll('.repository');

            repositories.forEach((repository) => {
                repository.addEventListener('mouseenter', () => {
                    gsap.set(repository, { scale: 1.02, translateY: -5 });
                });

                repository.addEventListener('mouseleave', () => {
                    gsap.set(repository, { scale: 1, translateY: 0 });
                });
            });
        });
    }
});

useHead({
    title: `Hànzy - ${t('navbar.projects')}`,
    meta: [
        {
            name: 'description',
            content: t('about.short_description'),
        },
        {
            property: 'og:description',
            content: t('about.short_description'),
        },
    ],
});
</script>

<style>
.repository:hover {
    box-shadow: 0 2px 10px 8px #2564eb1e;
}
</style>
