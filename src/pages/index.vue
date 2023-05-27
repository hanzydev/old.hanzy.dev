<template>
    <div id="main">
        <div v-if="discord.dataReceived" class="flex flex-col h-screen">
            <div
                class="flex h-full max-xl:text-center max-xl:flex-col items-center justify-center xl:space-x-24 px-6"
            >
                <a
                    :href="`https://discord.com/users/${discord.data!.user.id}`"
                    target="_blank"
                    class="relative opacity-0 flex items-center justify-center w-[250px]"
                    id="avatar"
                >
                    <img
                        :src="discord.data!.user.avatar_url"
                        :alt="`${discord.data!.user.username}'s avatar`"
                        draggable="false"
                        class="w-full h-full rounded-full"
                        id="avatar-img"
                        @load="showStatus = true"
                    />
                    <div
                        class="top-[11.5rem] left-[12.5rem] absolute p-2 rounded-full z-20"
                        v-if="showStatus"
                    >
                        <div
                            class="w-7 h-7 rounded-full"
                            :style="{
                                backgroundColor: StatusColors[discord.data!.status]
                            }"
                        ></div>
                    </div>
                </a>
                <div>
                    <h1 class="font-robotomono font-bold opacity-0" id="name">
                        {{ discord.data!.user.username
                        }}<b class="text-gray-400">#{{ discord.data!.user.discriminator }}</b>
                    </h1>
                    <p class="text-gray-300 opacity-0 leading-5" id="about">
                        Hi! My name is
                        <b class="text-white select-none cursor-pointer" id="mimarselim-trigger"
                            >Emirhan</b
                        >, I am a <b class="text-white">Full-Stack Developer</b> and
                        <b class="text-white">UI Designer</b>.<br />I live in
                        <b class="text-white"
                            ><a href="https://en.wikipedia.org/wiki/Turkey" target="_blank"
                                >Turkey</a
                            ></b
                        >.
                    </p>
                    <div class="mt-4 opacity-0" id="listening">
                        <div
                            class="flex items-center max-xl:justify-center"
                            v-if="ytMusic.dataReceived"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1.25em"
                                height="1.25em"
                                viewBox="0 0 24 24"
                                fill="#fff"
                                class="mr-2"
                            >
                                <path
                                    d="M13 17C13 18.6569 11.6569 20 10 20C8.34315 20 7 18.6569 7 17C7 15.3431 8.34315 14 10 14C11.6569 14 13 15.3431 13 17ZM13 17V6M13 6V4H17V6H13Z"
                                    stroke="#fff"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                            <p class="text-gray-300" v-if="!ytMusic.data">
                                Currently not listening to anything.
                            </p>
                            <p class="text-gray-300" v-else>
                                Currently Listening to
                                <b
                                    ><a
                                        :href="`https://music.youtube.com/watch?v=${ytMusic.data?.details.videoId}`"
                                        target="_blank"
                                        >{{
                                            ytMusic.data?.song_name?.length > 60
                                                ? ytMusic.data?.song_name?.slice(0, 57) + ' ...'
                                                : ytMusic.data?.song_name
                                        }}</a
                                    ></b
                                >
                            </p>

                            <Spinner class="ml-4" size="xs" v-if="ytMusic.newDataReceived" />
                        </div>
                        <div class="max-xl:flex max-xl:justify-center" v-else>
                            <Spinner size="sm" />
                        </div>
                    </div>
                </div>
            </div>
            <Footer class="xl:hidden" />
        </div>
        <div class="flex items-center justify-center h-screen" v-else>
            <Spinner size="xl" />
        </div>
    </div>
    <div class="flex flex-col h-screen max-xl:hidden">
        <div class="flex flex-col items-center justify-center h-full max-xl:hidden" id="footer">
            <div
                class="w-2/4 rounded-xl px-7 py-6 flex font-robotomono transition-all duration-300"
                style="background-color: rgba(0, 0, 0, 0.05); box-shadow: 0 0 12px 12px #2564eb1e"
            >
                <div class="flex flex-col max-w-[98.5%]">
                    <p class="font-semibold text-md break-words">
                        {{ randomQuote }}
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
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#000000"
                        width="3.5em"
                        height="3.5em"
                        viewBox="0 0 512 512"
                    >
                        <path
                            d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"
                            style="fill: rgba(255, 255, 255, 0.04)"
                        />
                    </svg>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script setup lang="ts">
import { resolveDiscordData } from '../util/resolveDiscordData';
import { resolveYoutubeMusicData } from '../util/resolveYoutubeMusicData';
import { useDiscord, useYoutubeMusic } from '../store';
import { StatusColors } from '../types';
import Config from '../data/config.json';
import AtaturkQuotes from '../data/ataturk-quotes.json';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const hasMobile = window.innerWidth < 1280;

let randomQuoteIndex = $ref(Math.floor(Math.random() * AtaturkQuotes.length));
let randomQuote = $ref(AtaturkQuotes[randomQuoteIndex]);

let showStatus = $ref(false);

onMounted(() => {
    if (!hasMobile) {
        const goToSection = (height: number) => {
            const route = useRoute();

            if (route.path === '/') {
                gsap.to(window, {
                    scrollTo: { y: height, autoKill: false },
                    duration: 1,
                    overwrite: true,
                    ease: 'circ.inOut',
                });
            }
        };

        ScrollTrigger.create({
            trigger: '#main',
            start: 'top bottom',
            end: '+=200%',
            onToggle: (self) => self.isActive && goToSection(0),
        });

        ScrollTrigger.create({
            trigger: '#footer',
            start: 'top bottom',
            end: '+=200%',
            onToggle: (self) => self.isActive && goToSection(innerHeight),
        });
    }
});

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
                    subscribe_to_id: Config.DISCORD_USER_ID,
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
            console.log('[WebSocket] Reconnecting...');

            socket.onopen = null;
            socket.onclose = null;
            socket.onmessage = null;

            connect();
        }, 5000);
    };
};

connect();

let animated = false;

watchEffect(() => {
    if (discord.dataReceived && !animated) {
        nextTick(() => {
            gsap.fromTo(
                '#avatar',
                {
                    opacity: 0,
                    y: 50,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                },
            );

            gsap.fromTo(
                '#name',
                {
                    opacity: 0,
                    x: hasMobile ? 15 : 50,
                },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.5,
                },
            );

            gsap.fromTo(
                '#about',
                {
                    opacity: 0,
                    y: -50,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    delay: 0.25,
                },
            );

            gsap.fromTo(
                '#listening',
                {
                    opacity: 0,
                    y: -50,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    delay: 0.5,
                },
            );

            animated = true;
        });
    }
});

useHead({
    title: `Hànzy - Home`,
});
</script>

<style scoped>
#jumpscare::-webkit-media-controls-enclosure {
    display: none !important;
}

#avatar-img {
    mask-image: radial-gradient(
        circle 25px at calc(100% - 27.5px) calc(100% - 43px),
        transparent 25px,
        #000 26px
    );
}
</style>
