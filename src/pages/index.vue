<template>
    <div className="fixed h-screen w-screen z-[9999] top-0 left-0 hidden" id="jumpscare-container">
        <video
            :src="jumpscareVideo"
            loop
            className="h-full w-full object-cover"
            id="jumpscare"
        ></video>
    </div>
    <div id="main">
        <div v-if="discord.dataReceived">
            <div
                class="flex h-screen pt-[52px] md:pt-[68px] max-xl:text-center max-xl:flex-col items-center justify-center xl:space-x-24 px-6"
            >
                <a
                    :href="`https://discord.com/users/${discord.data!.user.id}`"
                    target="_blank"
                    class="relative opacity-0"
                    id="profile"
                >
                    <nuxt-img
                        :src="discord.data!.user.avatar_url"
                        :alt="`${discord.data!.user.username}'s avatar`"
                        class="w-52 h-52 rounded-full"
                        draggable="false"
                        format="webp"
                        quality="100"
                        @load="showStatus = true"
                    />
                    <a
                        class="top-[10rem] left-[10rem] absolute p-2 rounded-full z-20"
                        v-if="showStatus"
                        :style="{
                            backgroundColor: hasMobile2 ? '#131d32' : '#131b2b',
                        }"
                    >
                        <div
                            class="w-6 h-6 rounded-full"
                            :style="{
                                backgroundColor: StatusColors[discord.data!.status]
                            }"
                        ></div>
                    </a>
                </a>
                <div>
                    <h1 class="font-robotomono font-bold opacity-0" id="name">
                        {{ discord.data!.user.username
                        }}<b class="text-gray-400">#{{ discord.data!.user.discriminator }}</b>
                    </h1>
                    <p class="text-gray-300 opacity-0" id="about">
                        Hi! My name is
                        <b class="text-white select-none" @click="showJumpscare">Emirhan</b>, I am a
                        <b class="text-white">Full-Stack Developer</b> and
                        <b class="text-white">UI designer</b>. I live in
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
                            <i class="bi bi-music-note text-lg"></i>
                            <p class="ml-2 text-gray-300" v-if="!ytMusic.data">
                                Currently not listening to anything.
                            </p>
                            <p class="ml-2 text-gray-300" v-else>
                                Listening to
                                <b
                                    ><a
                                        :href="`https://music.youtube.com/watch?v=${ytMusic.data?.details.videoId}`"
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
                        <div class="max-xl:flex max-xl:justify-center" v-else>
                            <Spinner size="sm" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex items-center justify-center h-screen" v-else>
            <Spinner size="xl" />
        </div>
    </div>
    <div class="flex flex-col items-center justify-center h-screen max-xl:hidden" id="footer">
        <div
            class="w-2/4 rounded-xl px-7 py-6 flex backdrop-blur-sm font-robotomono transition-all duration-300"
            style="background-color: rgba(0, 0, 0, 0.05); box-shadow: 0 0 12px 12px #2564eb1e"
        >
            <div class="flex flex-col">
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
            <i class="bi bi-quote text-7xl opacity-5 ml-auto my-auto"></i>
        </div>
        <Footer class="pt-12" />
    </div>
    <Footer class="hidden max-xl:block" />
</template>

<script setup lang="ts">
import { resolveDiscordData } from '../util/resolveDiscordData';
import { resolveYoutubeMusicData } from '../util/resolveYoutubeMusicData';
import { useDiscord, useYoutubeMusic } from '../store';
import { StatusColors } from '../types';
import AtaturkQuotes from '../data/ataturk_quotes.json';
import Config from '../data/config.json';
import SwearWords from '../data/swear_words.json';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const randomQuote = AtaturkQuotes[Math.floor(Math.random() * AtaturkQuotes.length)];
const hasMobile = window.innerWidth < 768;
const hasMobile2 = window.innerWidth < 1280;

let showStatus = $ref(false);

const showJumpscare = (event?: MouseEvent) => {
    if (event) {
        event.preventDefault();
    }

    const container = document.getElementById('jumpscare-container');
    const video = document.getElementById('jumpscare') as HTMLVideoElement;

    if (container) {
        container.classList.remove('hidden');
    }

    if (video) {
        video.play();
        video.requestFullscreen();
    }
};

const jumpscareVideo =
    'https://cdn.discordapp.com/attachments/1051778216852996096/1076249777064390686/video.mp4';

const avelVideo =
    'https://cdn.discordapp.com/attachments/1051778216852996096/1076249777446064188/alah.mp4';

onMounted(() => {
    const video = document.getElementById('jumpscare') as HTMLVideoElement;
    video.addEventListener('click', showJumpscare);

    let currentTyping = '';

    document.addEventListener('keydown', function (event) {
        currentTyping += event.key;
    });

    setInterval(() => {
        if (currentTyping.length) {
            const avelWords = ['avel', 'deliavel', 'deli avel'];

            if (avelWords.some((word) => currentTyping.toLowerCase().includes(word))) {
                video.src = avelVideo;
                showJumpscare();
                currentTyping = '';
            } else if (SwearWords.some((word) => currentTyping.toLowerCase() === word)) {
                video.src = jumpscareVideo;
                showJumpscare();
                currentTyping = '';
            }
        }
    }, 100);

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

let animated = false;

watchEffect(() => {
    if (discord.dataReceived && !animated) {
        nextTick(() => {
            gsap.fromTo(
                '#profile',
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
    title: 'Deliever42 - Home',
});
</script>

<style>
#jumpscare::-webkit-media-controls-enclosure {
    display: none !important;
}
</style>
