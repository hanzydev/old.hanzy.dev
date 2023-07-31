<template>
    <div class="pt-8 lg:pt-16"></div>
    <div class="flex h-full pt-[52px] md:pt-[68px] items-center justify-center px-6 md:px-48 mb-8">
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
                        <IconsGithubStar />
                        {{ repository.stars }}
                    </button>
                    <button
                        class="flex text-gray-300 py-1 px-2 gap-2 rounded-lg items-center font-robotomono text-sm"
                        style="background-color: rgba(0, 0, 0, 0.2)"
                    >
                        <IconsGithubFork />
                        {{ repository.forks }}
                    </button>
                    <button
                        class="flex text-gray-300 py-1 px-2 gap-2 rounded-lg items-center font-robotomono text-sm max-sm:hidden"
                        style="background-color: rgba(0, 0, 0, 0.2)"
                    >
                        <IconsGithubLicense />
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
                        <IconsGithubLanguage />
                        {{ repository.language }}
                    </button>
                </div>
            </a>
        </div>
    </div>
    <Footer />
</template>

<script setup lang="ts">
import gsap from 'gsap';
import { useGithub } from '@/store';

const github = useGithub();

if (!github.dataReceived) {
    const { data } = await useFetch('/api/repositories');
    github.setData(Array.from(data.value!));
}

const onRepositoryHover = (event: Event) => {
    const target = event.target as HTMLElement;
    const repository = target.closest('.repository') as HTMLElement;

    gsap.set(repository, { translateY: -5 });
};

const onRepositoryLeave = (event: Event) => {
    const target = event.target as HTMLElement;
    const repository = target.closest('.repository') as HTMLElement;

    gsap.set(repository, { translateY: 0 });
};

onMounted(async () => {
    nextTick(() => {
        gsap.fromTo('.repository', { y: 20 }, { opacity: 1, y: 0, duration: 0.2, stagger: 0.05 });

        const repositories = document.querySelectorAll('.repository');

        repositories.forEach((repository) => {
            repository.addEventListener('mouseenter', onRepositoryHover);
            repository.addEventListener('mouseleave', onRepositoryLeave);
        });
    });
});

onUnmounted(() => {
    const repositories = document.querySelectorAll('.repository');

    repositories.forEach((repository) => {
        repository.removeEventListener('mouseenter', onRepositoryHover);
        repository.removeEventListener('mouseleave', onRepositoryLeave);
    });
});

useHead({
    title: 'Projects',
    meta: [
        {
            name: 'og:title',
            content: 'Projects | Hànzy',
        },
    ],
});
</script>

<style scoped>
.repository:hover {
    box-shadow: 0 2px 10px 8px #2564eb1e;
}
</style>
