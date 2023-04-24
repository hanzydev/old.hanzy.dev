<template>
    <div
        class="w-full border-t-slate-700 border-t-[1px] flex items-center px-72 max-sm:flex-col max-sm:gap-y-3 max-sm:px-4 max-[850px]:px-16 max-[1222px]:px-36 sm:py-1 py-3 relative bottom-0"
    >
        <p
            class="text-slate-400 text-sm flex items-center gap-0.5"
            v-html="t('footer.long_text', { year: new Date().getFullYear().toString() })"
        ></p>
        <nuxt-img
            :src="t('footer.notbyai.icon') as string"
            :alt="t('footer.notbyai.alt') as string"
            draggable="false"
            format="webp"
            quality="100"
            preload
            loading="eager"
            class="sm:ml-auto select-none cursor-pointer"
            @click="handleClick"
        />
    </div>
</template>

<script setup lang="ts">
import { t } from '../i18n';

const handleClick = () => {
    window.open('https://notbyai.fyi', '_blank');
};
</script>
