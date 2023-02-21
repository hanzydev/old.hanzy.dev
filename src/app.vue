<template>
    <div
        class="fixed top-0 left-0 bottom-0 right-0 z-[-1] bg-no-repeat scale-[2] rotate-[135deg]"
        id="background-gradient"
    ></div>
    <NuxtLayout name="cursor">
        <NProgress :animating="isAnimating" />
        <Navbar />
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
import { useBodyAttrs } from '@unhead/vue';
import { useNProgress, isAnimating } from './util/NProgress';

useNProgress();

useBodyAttrs({
    class: 'bg-[#101010] w-full h-full text-white font-[Montserrat] font-medium overflow-x-hidden',
});
</script>

<style>
#background-gradient {
    background: radial-gradient(at 50% 50%, #2564eb2f 0%, #2564eb00 75%);
    background-size: 55% 90%;
    background-position: 50% 50%;
}

.font-robotomono {
    font-family: 'Roboto Mono', monospace;
}

.link {
    position: relative;
}

.link::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    border-radius: 4px;
    background-color: #fff;
    bottom: 0;
    left: 0;
    top: calc(100% + 1px);
    transform-origin: left;
    transform: scaleX(0);
    transition: transform 0.3s ease-in-out;
}

.link-blue::before {
    background-color: rgb(37 99 235);
}

.link:hover::before {
    transform-origin: left;
    transform: scaleX(1);
}

::-webkit-scrollbar {
    width: 0;
}

@media not all and (min-width: 1280px) {
    ::-webkit-scrollbar {
        width: 0.4rem;
    }
    ::-webkit-scrollbar-track {
        background-color: unset;
    }
    ::-webkit-scrollbar-thumb {
        background-color: #191919;
    }
}
</style>
