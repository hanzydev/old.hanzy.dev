<template>
    <div>
        <div class="pointer-events-none">
            <div id="cursor" class="fixed opacity-0 z-[9999]">
                <svg height="24" width="24">
                    <circle cx="12" cy="12" r="12" stroke-width="0" fill="#2564eb1e"></circle>
                </svg>
            </div>
        </div>
        <slot />
    </div>
</template>

<script setup lang="ts">
import gsap from 'gsap';

onMounted(() => {
    const cursor = document.getElementById('cursor') as HTMLDivElement;
    let seeing = false;

    let links = $ref<string[]>([]);

    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.type === 'childList') {
                for (const a of document.querySelectorAll('a')) {
                    if (links.includes(a.id)) continue;

                    if (!a.id) {
                        a.id = links.length.toString();
                    }

                    links.push(a.id);

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
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });

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
});
</script>
