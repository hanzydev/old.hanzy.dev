<template>
    <NuxtLoadingIndicator :throttle="0" :duration="3000" color="#2563EB" />
    <div
        class="fixed top-0 left-0 bottom-0 right-0 z-[-1] bg-no-repeat scale-[2] rotate-[135deg]"
        id="background-gradient"
    ></div>
    <MimarSelim :active="isMimarSelimActive" />
    <NuxtLayout name="cursor">
        <Navbar />
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
import { useDiscord, useYoutubeMusic } from '@/store';
import { resolveDiscordData } from '@/util/resolveDiscordData';
import { resolveYoutubeMusicData } from '@/util/resolveYoutubeMusicData';

const discord = useDiscord();
const ytMusic = useYoutubeMusic();

const times = ref(0);
const isMimarSelimActive = ref(false);
const mimarSelimDeactiveTimeout = ref<NodeJS.Timeout>();

onMounted(() => {
    const connectToWS = () => {
        const socket = new WebSocket('wss://api.lanyard.rest/socket');

        socket.onopen = () => {
            console.log('[WebSocket] Connected');

            socket.send(
                JSON.stringify({
                    op: 2,
                    d: {
                        subscribe_to_id: import.meta.env.VITE_DISCORD_USER_ID,
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
                        (activity: any) =>
                            activity.name === 'YouTube Music' &&
                            activity.state &&
                            activity.buttons.includes('Listen Along'),
                    );

                    if (!ytMusic.newDataReceived) {
                        if (
                            ytMusicActivity &&
                            ytMusic.data?.song_name.replace(/ +/g, '') !==
                                (ytMusicActivity.state.includes(ytMusicActivity.details)
                                    ? ytMusicActivity.state
                                    : `${ytMusicActivity.state} - ${ytMusicActivity.details}`
                                ).replace(/ +/g, '')
                        ) {
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
                console.log('[WebSocket] Reconnecting');

                socket.onopen = null;
                socket.onclose = null;
                socket.onmessage = null;

                connectToWS();
            }, 5000);
        };
    };

    connectToWS();
});

watch(
    () => discord.dataReceived,
    (state) => {
        if (state) {
            nextTick(() => {
                const trigger = document.getElementById('mimarselim-trigger')!;

                trigger.addEventListener('click', () => {
                    times.value++;

                    console.log(`[Mimar Selim] Clicked ${times.value} times`);

                    if (times.value >= 10) {
                        isMimarSelimActive.value = true;

                        console.log('[Mimar Selim] Activated');

                        if (mimarSelimDeactiveTimeout.value) {
                            clearTimeout(mimarSelimDeactiveTimeout.value);
                        }

                        mimarSelimDeactiveTimeout.value = setTimeout(() => {
                            times.value = 0;
                            isMimarSelimActive.value = false;

                            console.log('[Mimar Selim] Deactivated');
                        }, 5000);
                    } else {
                        isMimarSelimActive.value = false;
                    }
                });
            });
        }
    },
);

useHead({
    title: 'Home',
    titleTemplate: (title) => (title ? (title === 'Hànzy' ? title : `${title} | Hànzy`) : 'Hànzy'),
    meta: [
        {
            name: 'og:title',
            content: 'Hànzy',
        },
        {
            name: 'description',
            content:
                'Hi! My name is Emirhan, I am a Full-Stack Developer and UI Designer. I live in Turkey.',
        },
        {
            property: 'og:description',
            content:
                'Hi! My name is Emirhan, I am a Full-Stack Developer and UI Designer. I live in Turkey.',
        },
        {
            name: 'keywords',
            content: 'hànzy, hanzy, emirhan',
        },
        {
            name: 'author',
            content: 'Hànzy',
        },
        {
            name: 'theme-color',
            content: '#2563EB',
        },
        {
            property: 'og:image',
            content: '/hanzy.png',
        },
        {
            property: 'og:url',
            content: 'https://hanzy.dev',
        },
    ],
    link: [
        {
            rel: 'icon',
            href: '/favicon.ico',
        },
    ],
    htmlAttrs: {
        lang: 'en',
    },
    bodyAttrs: {
        class: 'bg-[#101010] w-full h-full text-white font-montserrat font-medium overflow-x-hidden',
    },
});
</script>

<style>
#background-gradient {
    background-size: 100%;
    background-position: 50%;
    @apply bg-[radial-gradient(at_50%_50%,#2564eb3d_0%,#2564eb00_65%)];
}
</style>
