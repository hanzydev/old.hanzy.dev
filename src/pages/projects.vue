<template>
    <div
        class="flex h-screen items-center justify-center px-48 pt-96 mb-80"
        v-if="github.dataReceived"
    >
        <div class="grid grid-cols-3 gap-4 items-center justify-center">
            <a
                v-for="repository in github.data"
                class="repository opacity-0 flex flex-col backdrop-blur-md p-4 rounded-lg shadow-lg h-36 hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-700 transition-all duration-300"
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
                        <i class="bi bi-star-fill text-xs"></i>
                        {{ repository.stars }}
                    </button>
                    <button
                        class="flex text-gray-300 py-1 px-2 gap-2 rounded-lg items-center font-robotomono text-sm"
                        style="background-color: rgba(0, 0, 0, 0.2)"
                    >
                        <i class="fa-solid fa-code-fork text-xs"></i>
                        {{ repository.forks }}
                    </button>
                    <button
                        class="flex text-gray-300 py-1 px-2 gap-2 rounded-lg items-center font-robotomono text-sm"
                        style="background-color: rgba(0, 0, 0, 0.2)"
                    >
                        <i class="fa-solid fa-code-fork text-xs"></i>
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
                        <i class="fa-solid fa-language text-xs"></i>
                        {{ repository.language }}
                    </button>
                </div>
            </a>
        </div>
    </div>
    <div class="flex items-center justify-center h-screen" v-else>
        <Spinner size="xl" />
    </div>
</template>

<script setup lang="ts">
import { useGithub } from '../store';
import gsap from 'gsap';

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
        });
    }
});

useHead({
    title: 'Deliever42 - Projects',
});
</script>
