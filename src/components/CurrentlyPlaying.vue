<template>
    <div class="opacity-0" id="listening">
        <div class="flex items-center max-xl:justify-center" v-if="ytMusic.dataReceived">
            <Icon icon="ic:baseline-music-note" class="mr-2 w-[1.25em] h-[1.25em]" />
            <p class="text-gray-300" v-if="!ytMusic.data">Currently not listening to anything.</p>

            <p class="text-gray-300" v-else>
                Currently Listening to
                <b
                    ><a
                        :href="`https://music.youtube.com/watch?v=${ytMusic.data?.details.videoId}`"
                        target="_blank"
                        >{{
                            ytMusic.data?.song_name?.length > 40
                                ? ytMusic.data?.song_name?.slice(0, 37) + ' ...'
                                : ytMusic.data?.song_name
                        }}</a
                    ></b
                >
            </p>

            <Spinner class="ml-4" :size="20" v-if="ytMusic.newDataReceived" />
        </div>
        <div class="max-xl:flex max-xl:justify-center" v-else>
            <Spinner :size="20" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useYoutubeMusic } from '@/store';

const ytMusic = useYoutubeMusic();
</script>
