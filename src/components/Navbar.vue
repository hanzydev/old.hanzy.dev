<template>
    <nav
        class="flex items-center p-3.5 border-b-[1px] border-b-[#ffffff05] md:justify-evenly fixed w-screen backdrop-blur-sm z-50"
    >
        <p class="font-robotomono text-xl font-semibold select-none max-md:text-base">deliever42</p>
        <div class="flex space-x-6 max-md:space-x-4 items-center max-md:ml-auto">
            <RouterLink to="/" class="font-robotomono text-lg max-md:text-sm max-xs:text-xs link">{{
                t('navbar.home')
            }}</RouterLink>
            <RouterLink
                to="/skills"
                class="font-robotomono text-lg max-md:text-sm max-xs:text-xs link"
                >{{ t('navbar.skills') }}</RouterLink
            >
            <RouterLink
                to="/projects"
                class="font-robotomono text-lg max-md:text-sm max-xs:text-xs link"
                >{{ t('navbar.projects') }}</RouterLink
            >
        </div>
        <div class="flex space-x-2 items-center max-md:hidden">
            <a
                href="https://github.com/deliever42"
                target="_blank"
                class="p-2 rounded-full bg-[#2564ebad] hover:bg-[#333333] transition-colors duration-300"
                aria-label="Github"
            >
                <svg height="1.5em" viewBox="0 0 16 16" version="1.1" width="1.5em">
                    <path
                        fill-rule="evenodd"
                        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                        fill="#fff"
                    ></path>
                </svg>
            </a>
            <a
                href="https://instagram.com/deliever42"
                target="_blank"
                class="p-2 rounded-full bg-[#2564ebad] hover:bg-[#b521da] transition-colors duration-300"
                aria-label="Instagram"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.5em"
                    height="1.5em"
                    viewBox="0 0 32 32"
                    version="1.1"
                >
                    <path
                        d="M25.805 7.996c0 0 0 0.001 0 0.001 0 0.994-0.806 1.799-1.799 1.799s-1.799-0.806-1.799-1.799c0-0.994 0.806-1.799 1.799-1.799v0c0.993 0.001 1.798 0.805 1.799 1.798v0zM16 20.999c-2.761 0-4.999-2.238-4.999-4.999s2.238-4.999 4.999-4.999c2.761 0 4.999 2.238 4.999 4.999v0c0 0 0 0.001 0 0.001 0 2.76-2.237 4.997-4.997 4.997-0 0-0.001 0-0.001 0h0zM16 8.3c0 0 0 0-0 0-4.253 0-7.7 3.448-7.7 7.7s3.448 7.7 7.7 7.7c4.253 0 7.7-3.448 7.7-7.7v0c0-0 0-0 0-0.001 0-4.252-3.447-7.7-7.7-7.7-0 0-0 0-0.001 0h0zM16 3.704c4.003 0 4.48 0.020 6.061 0.089 1.003 0.012 1.957 0.202 2.84 0.538l-0.057-0.019c1.314 0.512 2.334 1.532 2.835 2.812l0.012 0.034c0.316 0.826 0.504 1.781 0.516 2.778l0 0.005c0.071 1.582 0.087 2.057 0.087 6.061s-0.019 4.48-0.092 6.061c-0.019 1.004-0.21 1.958-0.545 2.841l0.019-0.058c-0.258 0.676-0.64 1.252-1.123 1.726l-0.001 0.001c-0.473 0.484-1.049 0.866-1.692 1.109l-0.032 0.011c-0.829 0.316-1.787 0.504-2.788 0.516l-0.005 0c-1.592 0.071-2.061 0.087-6.072 0.087-4.013 0-4.481-0.019-6.072-0.092-1.008-0.019-1.966-0.21-2.853-0.545l0.059 0.019c-0.676-0.254-1.252-0.637-1.722-1.122l-0.001-0.001c-0.489-0.47-0.873-1.047-1.114-1.693l-0.010-0.031c-0.315-0.828-0.506-1.785-0.525-2.785l-0-0.008c-0.056-1.575-0.076-2.061-0.076-6.053 0-3.994 0.020-4.481 0.076-6.075 0.019-1.007 0.209-1.964 0.544-2.85l-0.019 0.059c0.247-0.679 0.632-1.257 1.123-1.724l0.002-0.002c0.468-0.492 1.045-0.875 1.692-1.112l0.031-0.010c0.823-0.318 1.774-0.509 2.768-0.526l0.007-0c1.593-0.056 2.062-0.075 6.072-0.075zM16 1.004c-4.074 0-4.582 0.019-6.182 0.090-1.315 0.028-2.562 0.282-3.716 0.723l0.076-0.025c-1.040 0.397-1.926 0.986-2.656 1.728l-0.001 0.001c-0.745 0.73-1.333 1.617-1.713 2.607l-0.017 0.050c-0.416 1.078-0.67 2.326-0.697 3.628l-0 0.012c-0.075 1.6-0.090 2.108-0.090 6.182s0.019 4.582 0.090 6.182c0.028 1.315 0.282 2.562 0.723 3.716l-0.025-0.076c0.796 2.021 2.365 3.59 4.334 4.368l0.052 0.018c1.078 0.415 2.326 0.669 3.628 0.697l0.012 0c1.6 0.075 2.108 0.090 6.182 0.090s4.582-0.019 6.182-0.090c1.315-0.029 2.562-0.282 3.716-0.723l-0.076 0.026c2.021-0.796 3.59-2.365 4.368-4.334l0.018-0.052c0.416-1.078 0.669-2.326 0.697-3.628l0-0.012c0.075-1.6 0.090-2.108 0.090-6.182s-0.019-4.582-0.090-6.182c-0.029-1.315-0.282-2.562-0.723-3.716l0.026 0.076c-0.398-1.040-0.986-1.926-1.729-2.656l-0.001-0.001c-0.73-0.745-1.617-1.333-2.607-1.713l-0.050-0.017c-1.078-0.416-2.326-0.67-3.628-0.697l-0.012-0c-1.6-0.075-2.108-0.090-6.182-0.090z"
                        fill="#fff"
                    />
                </svg>
            </a>
            <a
                href="https://discord.com/users/931957993925378050"
                target="_blank"
                class="p-2 rounded-full bg-[#2564ebad] hover:bg-[#5865f2] transition-colors duration-300"
                aria-label="Discord"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.5em"
                    height="1.5em"
                    viewBox="0 0 32 32"
                    version="1.1"
                >
                    <path
                        d="M20.992 20.163c-1.511-0.099-2.699-1.349-2.699-2.877 0-0.051 0.001-0.102 0.004-0.153l-0 0.007c-0.003-0.048-0.005-0.104-0.005-0.161 0-1.525 1.19-2.771 2.692-2.862l0.008-0c1.509 0.082 2.701 1.325 2.701 2.847 0 0.062-0.002 0.123-0.006 0.184l0-0.008c0.003 0.050 0.005 0.109 0.005 0.168 0 1.523-1.191 2.768-2.693 2.854l-0.008 0zM11.026 20.163c-1.511-0.099-2.699-1.349-2.699-2.877 0-0.051 0.001-0.102 0.004-0.153l-0 0.007c-0.003-0.048-0.005-0.104-0.005-0.161 0-1.525 1.19-2.771 2.692-2.862l0.008-0c1.509 0.082 2.701 1.325 2.701 2.847 0 0.062-0.002 0.123-0.006 0.184l0-0.008c0.003 0.048 0.005 0.104 0.005 0.161 0 1.525-1.19 2.771-2.692 2.862l-0.008 0zM26.393 6.465c-1.763-0.832-3.811-1.49-5.955-1.871l-0.149-0.022c-0.005-0.001-0.011-0.002-0.017-0.002-0.035 0-0.065 0.019-0.081 0.047l-0 0c-0.234 0.411-0.488 0.924-0.717 1.45l-0.043 0.111c-1.030-0.165-2.218-0.259-3.428-0.259s-2.398 0.094-3.557 0.275l0.129-0.017c-0.27-0.63-0.528-1.142-0.813-1.638l0.041 0.077c-0.017-0.029-0.048-0.047-0.083-0.047-0.005 0-0.011 0-0.016 0.001l0.001-0c-2.293 0.403-4.342 1.060-6.256 1.957l0.151-0.064c-0.017 0.007-0.031 0.019-0.040 0.034l-0 0c-2.854 4.041-4.562 9.069-4.562 14.496 0 0.907 0.048 1.802 0.141 2.684l-0.009-0.11c0.003 0.029 0.018 0.053 0.039 0.070l0 0c2.14 1.601 4.628 2.891 7.313 3.738l0.176 0.048c0.008 0.003 0.018 0.004 0.028 0.004 0.032 0 0.060-0.015 0.077-0.038l0-0c0.535-0.72 1.044-1.536 1.485-2.392l0.047-0.1c0.006-0.012 0.010-0.027 0.010-0.043 0-0.041-0.026-0.075-0.062-0.089l-0.001-0c-0.912-0.352-1.683-0.727-2.417-1.157l0.077 0.042c-0.029-0.017-0.048-0.048-0.048-0.083 0-0.031 0.015-0.059 0.038-0.076l0-0c0.157-0.118 0.315-0.24 0.465-0.364 0.016-0.013 0.037-0.021 0.059-0.021 0.014 0 0.027 0.003 0.038 0.008l-0.001-0c2.208 1.061 4.8 1.681 7.536 1.681s5.329-0.62 7.643-1.727l-0.107 0.046c0.012-0.006 0.025-0.009 0.040-0.009 0.022 0 0.043 0.008 0.059 0.021l-0-0c0.15 0.124 0.307 0.248 0.466 0.365 0.023 0.018 0.038 0.046 0.038 0.077 0 0.035-0.019 0.065-0.046 0.082l-0 0c-0.661 0.395-1.432 0.769-2.235 1.078l-0.105 0.036c-0.036 0.014-0.062 0.049-0.062 0.089 0 0.016 0.004 0.031 0.011 0.044l-0-0.001c0.501 0.96 1.009 1.775 1.571 2.548l-0.040-0.057c0.017 0.024 0.046 0.040 0.077 0.040 0.010 0 0.020-0.002 0.029-0.004l-0.001 0c2.865-0.892 5.358-2.182 7.566-3.832l-0.065 0.047c0.022-0.016 0.036-0.041 0.039-0.069l0-0c0.087-0.784 0.136-1.694 0.136-2.615 0-5.415-1.712-10.43-4.623-14.534l0.052 0.078c-0.008-0.016-0.022-0.029-0.038-0.036l-0-0z"
                        fill="#fff"
                    />
                </svg>
            </a>
            <a
                href="mailto:contact@deliever42.me"
                class="p-2 rounded-full bg-[#2564ebad] hover:bg-[#ba3a2c] transition-colors duration-300"
                aria-label="Mail"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.5em"
                    height="1.5em"
                    viewBox="0 0 32 32"
                    version="1.1"
                >
                    <path
                        d="M16.015 18.861l-4.072-3.343-8.862 10.463h25.876l-8.863-10.567-4.079 3.447zM29.926 6.019h-27.815l13.908 11.698 13.907-11.698zM20.705 14.887l9.291 11.084v-18.952l-9.291 7.868zM2.004 7.019v18.952l9.291-11.084-9.291-7.868z"
                        fill="#fff"
                    />
                </svg>
            </a>
        </div>
        <div class="relative max-lg:hidden">
            <button
                class="p-2 rounded-full bg-[#2564ebad] hover:bg-blue-600 transition-colors duration-300"
                @click="togglePopover"
                aria-label="Language Switcher"
                id="popover-toggler"
            >
                <nuxt-img
                    :src="currentLocaleIcon"
                    draggable="false"
                    format="webp"
                    height="24"
                    width="24"
                    quality="100"
                    preload
                    loading="eager"
                />
            </button>
            <div
                class="absolute z-50"
                id="popover"
                :style="{
                    display: popoverActive ? 'block' : 'none',
                }"
            >
                <div
                    v-for="locale in Object.keys(localeMap)"
                    class="hover:bg-blue-600 transition-colors duration-300 p-2 flex w-full h-full bg-[#2564ebad] cursor-pointer popover-item"
                    :id="locale"
                    @click="
                () => {
                    setLocale(locale as ILocale);
                    closePopover()
                }
            "
                    :style="{
                        display: locale === currentLocale ? 'none' : 'block',
                    }"
                >
                    <nuxt-img
                        :key="locale"
                        :src="localeMap[locale as ILocale].icon"
                        draggable="false"
                        format="webp"
                        height="24"
                        width="24"
                        quality="100"
                        preload
                        loading="eager"
                    />
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { t, currentLocale, localeMap, ILocale, setLocale } from '../i18n';
import gsap from 'gsap';

let currentLocaleIcon = localeMap[currentLocale.value].icon;
let popoverActive = $ref(false);
let lastChild = $ref('');

const closePopover = () => {
    gsap.to('#popover-toggler', {
        borderBottomLeftRadius: '9999px',
        borderBottomRightRadius: '9999px',
        duration: 0.3,
    });

    gsap.to('#popover', {
        opacity: 0,
        y: -10,
        duration: 0.3,
        onComplete: () => {
            popoverActive = false;
        },
    });
};

const openPopover = () => {
    gsap.to('#popover-toggler', {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        duration: 0.3,
    });

    popoverActive = true;

    nextTick(() => {
        gsap.fromTo(
            '#popover',
            {
                y: -10,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.3,
            },
        );
    });
};

const togglePopover = () => (popoverActive ? closePopover() : openPopover());

const findLastChild = () => {
    const popoverItems = Array.from(document.querySelectorAll('.popover-item'));
    return popoverItems
        .reverse() //@ts-ignore
        .find((item) => item.style.display !== 'none');
};

const roundLastChild = () => {
    const lastItem = findLastChild();

    if (lastItem) {
        lastItem.classList.add('rounded-b-full');
        lastChild = lastItem.id;
    }
};

const undoRoundLastChild = () => {
    const lastItem = document.getElementById(lastChild);

    if (lastItem) {
        lastItem.classList.remove('rounded-b-full');
        lastChild = '';
    }
};

onMounted(() => {
    document.addEventListener('click', (e: any) => {
        if (
            popoverActive &&
            !e.target.closest('#popover') &&
            !e.target.closest('#popover-toggler')
        ) {
            closePopover();
        }
    });

    roundLastChild();
});

watch(currentLocale, () => {
    currentLocaleIcon = localeMap[currentLocale.value].icon;

    nextTick(() => {
        undoRoundLastChild();
        roundLastChild();
    });
});
</script>
