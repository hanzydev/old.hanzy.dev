<template>
    <div class="lg:pt-8"></div>
    <div class="flex h-full pt-[52px] md:pt-[68px] px-6 md:px-48 items-center justify-center mb-8">
        <div class="space-y-3 w-screen xl:w-3/4 2xl:w-2/4 pt-6">
            <div v-for="skill in Skills" class="flex flex-col space-y-1">
                <div class="flex">
                    <p class="text-gray-300">{{ skill.name }}</p>
                    <p class="text-gray-300 ml-auto opacity-0">{{ skill.level }}%</p>
                </div>

                <div class="relative w-full h-2 bg-gray-800 rounded-full">
                    <div
                        class="absolute top-0 left-0 h-2 rounded-full"
                        :data-skill-level="skill.level"
                        :style="{
                            width: `0%`,
                            backgroundColor:
                                skill.level < 60
                                    ? `hsl(${skill.level}, 100%, 45%)`
                                    : `hsl(${skill.level * 2.1}, 100%, 45%)`,
                        }"
                    ></div>
                </div>
            </div>
        </div>
    </div>
    <Footer />
</template>

<script setup lang="ts">
import gsap from 'gsap';
import { t } from '../i18n';
import Skills from '../data/skills.json';

onMounted(async () => {
    const skillLevels = document.querySelectorAll('[data-skill-level]') as NodeListOf<HTMLElement>;

    for (const skillLevel of skillLevels) {
        const level = skillLevel.dataset.skillLevel;

        gsap.to(skillLevel, {
            width: `${level}%`,
            duration: 0.5,
            ease: 'power4.out',
        });

        const p = skillLevel.parentElement!.parentElement!.children[0]
            .children[1] as HTMLParagraphElement;

        gsap.fromTo(
            p,
            {
                opacity: 0,
                x: 50,
            },
            {
                opacity: 1,
                duration: 0.15,
                x: 0,
                ease: 'circ.out',
            },
        );

        await new Promise((resolve) => setTimeout(resolve, 40));
    }
});

useHead({
    title: `Deliever42 - ${t('navbar.skills')}`,
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
