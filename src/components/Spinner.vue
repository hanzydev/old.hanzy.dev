<template>
    <div
        :class="[
            'border-t-transparent border-solid animate-spin rounded-full border-blue-600',
            borderClass,
            sizeClass,
        ]"
    ></div>
</template>

<script setup lang="ts">
const { size } = defineProps<{ size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' }>();

const sizeClass = computed(() => {
    switch (size) {
        case 'xs':
            return 'h-4 w-4';
        case 'sm':
            return 'h-6 w-6';
        case 'md':
            return 'h-8 w-8';
        case 'lg':
            return 'h-10 w-10';
        case 'xl':
            return 'h-14 w-14';
    }
});

const borderClass = computed(() => {
    switch (size) {
        case 'xs':
        case 'sm':
        case 'md':
            return 'border-2';
        case 'lg':
        case 'xl':
            return 'border-4';
    }
});
</script>
