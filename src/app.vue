<template>
    <div
        class="fixed top-0 left-0 bottom-0 right-0 z-[-1] bg-no-repeat scale-[2] rotate-[135deg]"
        id="background-gradient"
    ></div>
    <NuxtLayout name="cursor">
        <NProgress :animating="animating" />
        <Navbar />
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
import gsap from 'gsap';
import { useBodyAttrs } from '@unhead/vue';

const router = useRouter();

let animating = $ref(false);
let progress = 0;
let timer: number;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const generateProgress = () => {
    let amount = 0;

    if (progress >= 0 && progress < 0.2) {
        amount = 0.1;
    } else if (progress >= 0.2 && progress < 0.5) {
        amount = 0.04;
    } else if (progress >= 0.5 && progress < 0.8) {
        amount = 0.02;
    } else if (progress >= 0.8 && progress < 0.99) {
        amount = 0.005;
    }

    return clamp(progress + amount, 0, 0.994);
};

const updateProgress = () => {
    progress = generateProgress();
    gsap.to('#nprogress', { duration: 0.2, opacity: 1, width: `${progress * 100}%` });
};

const start = () => {
    animating = true;

    nextTick(() => {
        updateProgress();
        timer = window.setInterval(() => {
            updateProgress();
        }, 800);
    });
};

const end = () => {
    clearInterval(timer);

    gsap.to('#nprogress', {
        duration: 0.3,
        opacity: 0,
        width: '100%',
        onComplete: () => {
            gsap.set('#nprogress', { width: 0 });
            progress = 0;
            animating = false;
        },
    });
};

router.beforeEach(async (_, __, next) => {
    if (animating) {
        end();
        await new Promise((resolve) => setTimeout(resolve, 300));
    }

    start();
    next();
});

router.afterEach(() => {
    end();
});

useBodyAttrs({
    class: 'bg-[#101010] w-full h-full text-white font-[Montserrat] font-medium overflow-x-hidden',
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
</style>
