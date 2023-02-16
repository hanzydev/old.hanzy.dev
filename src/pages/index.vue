<template>
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
                    <img
                        :src="discord.data!.user.avatar_url"
                        class="w-52 h-52 rounded-full"
                        draggable="false"
                    />
                    <a class="top-[10rem] left-[10rem] absolute bg-[#131b2b] p-2 rounded-full z-20">
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
                        Hi! My name is <b class="text-white">Emirhan</b>, I am a
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
            class="h-36 w-2/4 rounded-xl p-7 flex backdrop-blur-sm font-robotomono shadow-xl shadow-gray-700 transition-all duration-300"
            style="background-color: rgba(0, 0, 0, 0.2)"
        >
            <div class="flex flex-col">
                <p class="font-semibold text-md">
                    Do not forget it; The greatest war is the war against ignorance and reaction.
                </p>
                <a
                    class="mt-auto font-bold text-lg font-robotomono"
                    href="https://en.wikipedia.org/wiki/Mustafa_Kemal_Atat%C3%BCrk"
                    target="_blank"
                    ><span class="link">> Mustafa Kemal Atatürk</span></a
                >
            </div>
            <i class="bi bi-info-circle text-7xl opacity-5 ml-auto my-auto"></i>
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
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const hasMobile = window.innerWidth < 768;

onMounted(() => {
    if (!hasMobile) {
        const goToSection = (height: number) => {
            gsap.to(window, {
                scrollTo: { y: height, autoKill: false },
                duration: 1,
                overwrite: true,
                ease: 'circ.inOut',
            });
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

watchEffect(() => {
    if (discord.dataReceived) {
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
        });
    }
});

useHead({
    title: 'Deliever42 - Home',
});
</script>
