<template>
    <div :class="['spinner rounded-[50%] border-blue-600', borderClass, sizeClass]"></div>
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
            return 'border-4';
        case 'xl':
            return 'border-[5.5px]';
    }
});
</script>

<style>
.spinner {
    animation: clip 0.8s infinite linear alternate, spin 1.6s infinite linear;
}

@keyframes clip {
    0% {
        clip-path: polygon(50% 50%, 0 0, 50% 0%, 50% 0%, 50% 0%, 50% 0%, 50% 0%);
    }

    12.5% {
        clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%);
    }

    25% {
        clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 100%, 100% 100%, 100% 100%);
    }

    50% {
        clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%);
    }

    62.5% {
        clip-path: polygon(50% 50%, 100% 0, 100% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%);
    }

    75% {
        clip-path: polygon(50% 50%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 50% 100%, 0% 100%);
    }

    100% {
        clip-path: polygon(50% 50%, 50% 100%, 50% 100%, 50% 100%, 50% 100%, 50% 100%, 0% 100%);
    }
}

@keyframes spin {
    0% {
        transform: scaleY(1) rotate(0deg);
    }

    49.99% {
        transform: scaleY(1) rotate(135deg);
    }

    50% {
        transform: scaleY(-1) rotate(0deg);
    }

    100% {
        transform: scaleY(-1) rotate(-135deg);
    }
}
</style>
