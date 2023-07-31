<template>
    <nav class="border-b-slate-700 border-b-[1px] backdrop-blur-sm z-50 fixed w-full">
        <Container class="flex items-center p-3.5 md:justify-around">
            <p class="font-robotomono text-xl font-semibold select-none max-md:text-base">Hànzy</p>
            <div class="flex space-x-6 max-md:x-4 items-center max-md:ml-auto">
                <NuxtLink
                    v-for="link in links"
                    :to="link.to"
                    class="font-robotomono text-lg max-md:text-sm max-xs:text-xs link"
                >
                    {{ link.name }}
                </NuxtLink>
            </div>
            <div class="flex space-x-2 items-center ml-5 md:ml-0">
                <a
                    v-for="social in socials"
                    class="social p-2 rounded-full bg-[#2564ebad] max-md:hidden"
                    target="_blank"
                    :href="social.href"
                    :style="`--color: ${social.color}`"
                    :aria-label="social.name"
                >
                    <Icon :icon="social.icon" height="1.5em" />
                </a>
            </div>
        </Container>
    </nav>
</template>

<style scoped>
.social {
    @apply hover:bg-[var(--color)] transition-colors duration-300;
}
</style>

<script setup lang="ts">
import { Icon } from '@iconify/vue';

const links = [
    {
        name: 'Home',
        to: '/',
    },
    {
        name: 'Skills',
        to: '/skills',
    },
    {
        name: 'Projects',
        to: '/projects',
    },
];

const socials = [
    {
        name: 'Github',
        href: 'https://github.com/hanzydev',
        icon: 'mdi:github',
        color: '#333333',
    },
    {
        name: 'Instagram',
        href: 'https://instagram.com/hanzydev',
        icon: 'mdi:instagram',
        color: '#b521da',
    },
    {
        name: 'Discord',
        href: 'https://discord.com/users/931957993925378050',
        icon: 'ic:baseline-discord',
        color: '#5865f2',
    },
    {
        name: 'E-Mail',
        href: 'mailto:contact@hanzy.dev',
        icon: 'tabler:mail-filled',
        color: '#ba3a2c',
    },
];
</script>
