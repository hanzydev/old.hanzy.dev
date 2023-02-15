<template>
    <div class="flex h-screen w-screen pt-12 items-center justify-center space-x-24">
        <a
            :href="`https://discord.com/users/${data.discord.user.id}`"
            target="_blank"
            class="relative"
        >
            <img :src="data.discord.user.avatar_url" class="w-52 h-52 rounded-full" />
            <a class="top-[10rem] left-[10rem] absolute bg-[#131b2b] p-2 rounded-full z-20">
                <div
                    :class="`w-6 h-6 rounded-full bg-[${StatusColors[data.discord.status]}]`"
                ></div>
            </a>
        </a>
        <div>
            <h1 class="font-robotomono font-bold">{{ data.discord.user.tag }}</h1>
            <p>
                Hi! My name is <b>Emirhan</b>, I am a <b>Full-Stack Developer</b> and
                <b>UI designer</b>. I live in <b>Turkey</b>.
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { LanyardData, StatusColors } from '../util/resolveLanyardData';

const { data } = defineProps({
    data: {
        type: Object as PropType<LanyardData>,
        required: true,
    },
});
</script>

<style></style>
