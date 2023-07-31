<template>
    <a
        target="_blank"
        class="relative opacity-0 flex items-center justify-center w-[250px]"
        id="avatar"
        :href="`https://discord.com/users/${discord.data!.user.id}`"
    >
        <img
            draggable="false"
            class="w-full h-full rounded-full"
            id="avatar-img"
            :src="discord.data!.user.avatar_url"
            :alt="`${discord.data!.user.username}'s avatar`"
            @load="showStatus = true"
        />
        <div class="top-[11.5rem] left-[12.5rem] absolute p-2 rounded-full z-20" v-if="showStatus">
            <div
                class="w-7 h-7 rounded-full"
                :style="{
                    backgroundColor: StatusColors[discord.data!.status],
                }"
            ></div>
        </div>
    </a>
</template>

<script setup lang="ts">
import { StatusColors } from '@/types';
import { useDiscord } from '@/store';

const discord = useDiscord();
const showStatus = ref(false);
</script>

<style scoped>
#avatar-img {
    mask-image: radial-gradient(
        circle 25px at calc(100% - 27.5px) calc(100% - 43px),
        transparent 25px,
        #000 26px
    );
}
</style>
