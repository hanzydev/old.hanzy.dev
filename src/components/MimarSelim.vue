<script setup lang="ts">
import gsap from 'gsap';

const { active } = defineProps<{
    active: boolean;
}>();

const audio = new Audio(
    'https://cdn.discordapp.com/attachments/1089486214832324679/1094319984299225249/static_notification.mp3',
);

watch(
    () => active,
    (state) => {
        if (state) {
            nextTick(() => {
                audio.play();

                gsap.fromTo(
                    '#mimarselim',
                    {
                        opacity: 0,
                        y: 312,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: 'power4.out',
                        display: 'block',
                    },
                );
            });
        } else {
            audio.pause();

            gsap.fromTo(
                '#mimarselim',
                {
                    opacity: 1,
                    y: 0,
                },
                {
                    opacity: 0,
                    y: 312,
                    duration: 1,
                    ease: 'power4.in',
                    display: 'none',
                },
            );
        }
    },
);

const handleClick = () => {
    window!.open('https://www.youtube.com/watch?v=VYaD6pv4WYQ', '_blank');
};
</script>

<template>
    <nuxt-img
        src="https://cdn.discordapp.com/attachments/1089486214832324679/1094319876987961431/mimarselim.png"
        alt="mimarselim"
        id="mimarselim"
        class="cursor-pointer absolute bottom-0 right-0 w-[312px] z-[9999] hidden"
        format="webp"
        quality="100"
        preload
        loading="eager"
        @click="handleClick"
    />
</template>
