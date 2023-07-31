<template>
    <div id="main">
        <Container v-if="discord.dataReceived" class="flex flex-col h-screen">
            <div
                class="flex h-full max-xl:text-center max-xl:flex-col items-center justify-center xl:space-x-[7.5rem] px-6"
            >
                <Avatar />
                <div>
                    <h1 class="font-robotomono text-3xl mt-4 font-bold opacity-0" id="name">
                        {{ discord.data!.user.username }}
                    </h1>

                    <About class="mt-4" />
                    <CurrentlyPlaying class="mt-4" />
                </div>
            </div>
            <Footer class="xl:hidden" />
        </Container>
        <div class="flex items-center justify-center h-screen" v-else>
            <Spinner :size="64" />
        </div>
    </div>
    <Container class="flex flex-col h-screen max-xl:hidden">
        <div
            class="flex flex-col items-center justify-center h-full max-xl:hidden xl:px-[7.5rem] px-6"
            id="footer"
        >
            <AtaturkQuote class="px-7 py-6" />
        </div>
        <Footer />
    </Container>
</template>

<script setup lang="ts">
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useDiscord } from '@/store';

const discord = useDiscord();
const isMobile = ref(false);
const animated = ref(false);

watchEffect(() => {
    if (discord.dataReceived && !animated.value) {
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
                    x: isMobile.value ? 15 : 50,
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

            animated.value = true;
        });
    }
});

const handleResize = () => {
    isMobile.value = window.innerWidth < 1280;
};

onMounted(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    handleResize();

    if (!isMobile.value) {
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

    window.addEventListener('resize', handleResize);
});

onMounted(() => {
    window.addEventListener('resize', handleResize);
});

useHead({
    title: 'Home',
    meta: [
        {
            name: 'og:title',
            content: 'Home | Hànzy',
        },
    ],
});
</script>
