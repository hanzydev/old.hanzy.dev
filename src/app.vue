<template>
    <div className="fixed h-screen w-screen z-[9999] top-0 left-0 hidden" id="jumpscare-container">
        <video
            :src="jumpscareVideo"
            loop
            className="h-full w-full object-cover"
            id="jumpscare"
        ></video>
    </div>
    <div
        class="fixed top-0 left-0 bottom-0 right-0 z-[-1] bg-no-repeat scale-[2] rotate-[135deg]"
        id="background-gradient"
    ></div>
    <NuxtLayout name="cursor">
        <NProgress :animating="isAnimating" />
        <Navbar />
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
import { useBodyAttrs } from '@unhead/vue';
import { useNProgress, isAnimating } from './util/NProgress';
import SwearWords from './data/swear_words.json';

useNProgress();

useBodyAttrs({
    class: 'bg-[#101010] w-full h-full text-white font-[Montserrat] font-medium overflow-x-hidden',
});

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
            } else if (currentTyping.toLowerCase() === 'sisiciuras') {
                document.body.classList.add('uras');
                currentTyping = '';
            }
        }
    }, 100);
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');

#background-gradient {
    background: radial-gradient(at 50% 50%, #2564eb3d 0%, #2564eb00 65%);
    background-size: 100%;
    background-position: 50%;
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

.link-blue:hover {
    color: rgb(37 99 235);
}

.link:hover::before {
    transform-origin: left;
    transform: scaleX(1);
}

::-webkit-scrollbar {
    width: 0;
}

@media not all and (min-width: 1280px) {
    ::-webkit-scrollbar {
        width: 0.4rem;
    }
    ::-webkit-scrollbar-track {
        background-color: unset;
    }
    ::-webkit-scrollbar-thumb {
        background-color: #191919;
    }
}

.uras {
    cursor: url(https://i.imgur.com/7Nng1lB.png), auto !important;
}
</style>
