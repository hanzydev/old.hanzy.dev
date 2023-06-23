<template>
    <div
        class="fixed top-0 left-0 bottom-0 right-0 z-[-1] bg-no-repeat scale-[2] rotate-[135deg]"
        id="background-gradient"
    ></div>
    <MimarSelim :active="active" />
    <NuxtLayout name="cursor">
        <Navbar />
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
import { useDiscord } from '@/store';

const discord = useDiscord();

const times = ref(0);
const active = ref(false);

watch(
    () => discord.dataReceived,
    (state) => {
        if (state) {
            nextTick(() => {
                const trigger = document.getElementById('mimarselim-trigger')!;

                trigger.addEventListener('click', () => {
                    times.value++;

                    if (times.value >= 10) {
                        active.value = true;

                        setTimeout(() => {
                            times.value = 0;
                            active.value = false;
                        }, 5000);
                    } else {
                        active.value = false;
                    }
                });
            });
        }
    },
);

useHead({
    titleTemplate: '%s | Hànzy',
    bodyAttrs: {
        class: 'bg-[#101010] w-full h-full text-white font-[Montserrat] font-medium overflow-x-hidden',
    },
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');

#background-gradient {
    background-size: 100%;
    background-position: 50%;
    @apply bg-[radial-gradient(at_50%_50%,#2564eb3d_0%,#2564eb00_65%)];
}

.font-robotomono {
    font-family: 'Roboto Mono', monospace;
}

.link {
    @apply relative;
}

.link::before {
    @apply absolute w-full h-0.5 rounded-[4px] bg-white bottom-0 left-0 transform duration-300 ease-in-out scale-x-0 origin-left content-[''] top-[calc(100%+1px)];
}

.link:hover::before {
    @apply scale-x-100 origin-left;
}

::-webkit-scrollbar {
    @apply w-0;
}

@media not all and (min-width: 1280px) {
    ::-webkit-scrollbar {
        @apply w-[0.4rem];
    }

    ::-webkit-scrollbar-track {
        @apply bg-[unset];
    }

    ::-webkit-scrollbar-thumb {
        @apply bg-[#191919];
    }
}
</style>
