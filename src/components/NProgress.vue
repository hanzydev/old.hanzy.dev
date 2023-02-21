<template>
    <div class="fixed bg-blue-600 h-[3px] z-[9999]" id="nprogress" v-if="animating"></div>
</template>

<script setup lang="ts">
const { animating } = defineProps<{ animating: boolean }>();
</script>
