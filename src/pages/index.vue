<template>
    <Navbar />
    <div v-if="discord.dataReceived">
        <div class="flex h-screen w-screen pt-12 items-center justify-center space-x-24">
            <a
                :href="`https://discord.com/users/${discord.data!.user.id}`"
                target="_blank"
                class="relative"
            >
                <img :src="discord.data!.user.avatar_url" class="w-52 h-52 rounded-full" />
                <a class="top-[10rem] left-[10rem] absolute bg-[#131b2b] p-2 rounded-full z-20">
                    <div
                        class="w-6 h-6 rounded-full"
                        :style="{
                            backgroundColor: StatusColors[discord.data!.status],
                        }"
                    ></div>
                </a>
            </a>
            <div>
                <h1 class="font-robotomono font-bold">{{ discord.data!.user.tag }}</h1>
                <p>
                    Hi! My name is <b>Emirhan</b>, I am a <b>Full-Stack Developer</b> and
                    <b>UI designer</b>. I live in <b>Turkey</b>.
                </p>
                <div class="mt-2">
                    <div class="flex items-center" v-if="ytMusic.dataReceived">
                        <i class="bi bi-music-note"></i>
                        <p class="ml-2 text-gray-300" v-if="!ytMusic.data">I listen to nothing.</p>
                        <p class="ml-2 text-gray-300" v-else>
                            I listen to
                            <b
                                ><a
                                    :href="`https://youtube.com/watch?v=${ytMusic.data?.details.videoId}`"
                                    target="_blank"
                                >
                                    {{
                                        ytMusic.data?.song_name?.length > 60
                                            ? ytMusic.data?.song_name?.slice(0, 57) + ' ...'
                                            : ytMusic.data?.song_name
                                    }}
                                </a></b
                            >
                        </p>

                        <Spinner class="ml-4" size="xs" v-if="ytMusic.newDataReceived" />
                    </div>
                    <div v-else>
                        <Spinner size="sm" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="flex items-center justify-center h-screen" v-else>
        <Spinner size="xl" />
    </div>
</template>

<script setup lang="ts">
import { StatusColors, resolveDiscordData } from '../util/resolveDiscordData';
import { resolveYoutubeMusicData } from '../util/resolveYoutubeMusicData';
import { useDiscord, useYoutubeMusic } from '../store';

const discord = useDiscord();
const ytMusic = useYoutubeMusic();

const connect = () => {
    const socket = new WebSocket('wss://api.lanyard.rest/socket');

    socket.onopen = () => {
        console.log('[WebSocket] Connected');

        socket.send(
            JSON.stringify({
                op: 2,
                d: {
                    subscribe_to_id: '931957993925378050',
                },
            }),
        );
    };

    socket.onmessage = async (event) => {
        const { op, d } = JSON.parse(event.data);

        switch (op) {
            case 0:
                console.log('[WebSocket] Data received');

                discord.setData(await resolveDiscordData(d));
                const ytMusicActivity = d.activities.find(
                    (activity: any) => activity.name === 'YouTube Music' && activity.state,
                );

                if (!ytMusic.newDataReceived) {
                    if (ytMusicActivity && ytMusic.data?.song_name !== ytMusicActivity.state) {
                        ytMusic.setNewDataReceived(true);
                        ytMusic.setData(await resolveYoutubeMusicData(ytMusicActivity));
                        ytMusic.setNewDataReceived(false);
                    } else if (!ytMusicActivity && ytMusic.data) {
                        ytMusic.setNewDataReceived(true);
                        await new Promise((resolve) => setTimeout(resolve, 1000));
                        ytMusic.setData(null);
                        ytMusic.setNewDataReceived(false);
                    } else if (!ytMusicActivity && !ytMusic.data) {
                        ytMusic.setData(null);
                    }
                }

                break;
            case 1:
                setInterval(() => {
                    if (discord.dataReceived) {
                        console.log('[WebSocket] Heartbeat sent');

                        socket.send(
                            JSON.stringify({
                                op: 3,
                            }),
                        );
                    }
                }, d.heartbeat_interval);

                break;
        }
    };

    socket.onclose = (e) => {
        console.log(`[WebSocket] Closed: ${e.reason ?? 'Unknown'}`);

        setTimeout(() => {
            console.log('[WebSocket] Reconnecting...');

            socket.onopen = null;
            socket.onclose = null;
            socket.onmessage = null;

            connect();
        }, 5000);
    };
};

connect();
</script>
