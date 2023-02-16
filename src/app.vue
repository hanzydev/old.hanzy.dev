<template>
    <div
        class="fixed top-0 left-0 bottom-0 right-0 z-[-1] bg-no-repeat scale-[2] rotate-[135deg]"
        id="background-gradient"
    ></div>
    <div class="pointer-events-none">
        <div id="cursor" class="fixed opacity-0 z-[9999]">
            <svg height="24" width="24">
                <circle cx="12" cy="12" r="12" stroke-width="0" fill="#2564eb1e"></circle>
            </svg>
        </div>
    </div>
    <Navbar />
    <NuxtPage />
</template>

<script setup lang="ts">
import { useBodyAttrs } from '@unhead/vue';
import gsap from 'gsap';
import { useDiscord } from './store';

useBodyAttrs({
    class: 'bg-[#101010] w-full h-full text-white font-[Montserrat] font-medium overflow-x-hidden',
});

onMounted(() => {
    const cursor = document.getElementById('cursor') as HTMLDivElement;
    let seeing = false;

    document.body.addEventListener('mousemove', (e) => {
        {
            gsap.to(cursor, {
                x: e.clientX - 10,
                y: e.clientY - 10,
                duration: seeing ? 0.2 : 0,
            });
        }
    });

    document.body.addEventListener('mouseleave', () => {
        gsap.to(cursor, {
            opacity: 0,
            duration: 0.2,
            onComplete: () => {
                seeing = false;
            },
        });
    });

    document.body.addEventListener('mouseenter', () => {
        gsap.to(cursor, {
            opacity: 1,
            duration: 0.2,
            onComplete: () => {
                seeing = true;
            },
        });
    });

    const discord = useDiscord();

    watchEffect(() => {
        if (discord.dataReceived) {
            const aTags = document.querySelectorAll('a');

            for (const a of aTags) {
                a.addEventListener('mouseenter', () => {
                    gsap.to(cursor, {
                        scale: 2,
                        duration: 0.2,
                    });
                });

                a.addEventListener('mouseleave', () => {
                    gsap.to(cursor, {
                        scale: 1,
                        duration: 0.2,
                    });
                });
            }
        }
    });
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
    height: 0;
}
</style>
