import gsap from 'gsap';

export let isAnimating = $ref(false);
let progress = 0;
let timer: number;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const generateProgress = () => {
    let amount = 0;

    if (progress >= 0 && progress < 0.2) {
        amount = 0.1;
    } else if (progress >= 0.2 && progress < 0.5) {
        amount = 0.07;
    } else if (progress >= 0.5 && progress < 0.8) {
        amount = 0.05;
    } else if (progress >= 0.8 && progress < 0.99) {
        amount = 0.03;
    }

    return clamp(progress + amount, 0, 0.994);
};

const updateProgress = () => {
    progress = generateProgress();
    gsap.to('#nprogress', {
        duration: 0.3,
        opacity: 1,
        width: `${progress * 100}%`,
        ease: 'power2.inOut',
    });
};

const start = () => {
    isAnimating = true;

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
        width: '100%',
        ease: 'power2.inOut',
        onComplete: () => {
            gsap.to('#nprogress', {
                opacity: 0,
                duration: 0.2,
                ease: 'power2.out',
                onComplete: () => {
                    gsap.set('#nprogress', { width: 0 });

                    progress = 0;
                    isAnimating = false;
                },
            });
        },
    });
};

export const useNProgress = () => {
    const router = useRouter();

    router.beforeEach(async (_, __, next) => {
        if (isAnimating) {
            end();
            await new Promise((resolve) => setTimeout(resolve, 300));
        }

        start();
        next();
    });

    router.afterEach(() => {
        end();
    });
};
