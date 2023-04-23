<template>
    <div
        class="w-full border-t-slate-700 border-t-[1px] flex items-center px-72 h-14 relative bottom-0"
    >
        <p
            class="text-slate-400 text-sm flex items-center gap-0.5"
            v-html="t('footer.long_text', { year: new Date().getFullYear().toString() })"
        ></p>
        <nuxt-img
            src="https://notbyai.fyi/img/written-by-human-not-by-ai-black.svg"
            :alt="t('footer.notbyai') as string"
            draggable="false"
            format="webp"
            quality="100"
            preload
            loading="eager"
            class="ml-auto select-none cursor-pointer"
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
