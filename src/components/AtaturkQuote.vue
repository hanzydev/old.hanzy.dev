<template>
    <div
        class="w-full rounded-xl flex font-robotomono transition-all duration-300 bg-[rgba(0,0,0,0.05)]"
        style="box-shadow: 0 0 12px 12px #2564eb1e"
    >
        <div class="flex flex-col">
            <p class="font-semibold text-md break-words">
                {{ AtaturkQuotes[Math.floor(Math.random() * AtaturkQuotes.length)] }}
            </p>
            <br />
            <br />
            <a
                class="font-bold text-lg font-robotomono mt-auto link max-w-fit"
                href="https://en.wikipedia.org/wiki/Mustafa_Kemal_Atat%C3%BCrk"
                target="_blank"
            >
                > Mustafa Kemal Atatürk</a
            >
        </div>
        <div class="ml-auto my-auto">
            <Icon
                icon="fa-solid:quote-left"
                class="w-[3.5em] h-[3.5em]"
                color="rgba(255, 255, 255, 0.04)"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import AtaturkQuotes from '@/data/ataturk-quotes.json';
</script>
