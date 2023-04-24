<template>
    <div
        class="w-full border-t-slate-700 border-t-[1px] flex items-center px-72 max-sm:flex-col max-sm:gap-y-3 max-sm:px-4 max-[850px]:px-16 max-[1222px]:px-36 sm:py-1 py-3 relative bottom-0"
    >
        <p
            class="text-slate-400 text-sm flex items-center gap-0.5"
            v-html="t('footer.long_text', { year: new Date().getFullYear().toString() })"
        ></p>
       <div class="sm:ml-auto select-none cursor-pointer" v-html="t('footer.notbyai.icon')"></div>
    </div>
</template>

<script setup lang="ts">
import { t } from '../i18n';

const handleClick = () => {
    window.open('https://notbyai.fyi', '_blank');
};
</script>
