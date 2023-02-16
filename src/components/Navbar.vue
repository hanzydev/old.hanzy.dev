<template>
    <nav
        class="flex items-center p-3.5 border-b-[1px] border-b-[#ffffff05] justify-evenly fixed w-screen backdrop-blur-md"
    >
        <p class="font-robotomono text-xl font-semibold select-none">deliever42</p>
        <div class="flex space-x-6 items-center">
            <RouterLink to="/" class="font-robotomono text-lg nav-link">Home</RouterLink>
            <RouterLink to="/skills" class="font-robotomono text-lg nav-link">Skills</RouterLink>
            <RouterLink to="/projects" class="font-robotomono text-lg nav-link"
                >Projects</RouterLink
            >
        </div>
        <div class="flex space-x-2 items-center">
            <a
                href="https://github.com/deliever42"
                target="_blank"
                class="pl-2.5 pr-[0.6rem] py-1.5 rounded-full bg-[#2564ebad] hover:bg-[#333333] transition-colors duration-300"
            >
                <i class="bi bi-github text-xl"></i>
            </a>
            <a
                href="mailto:contact@deliever42.me"
                target="_blank"
                class="pl-2.5 pr-[0.6rem] py-1.5 rounded-full bg-[#2564ebad] hover:bg-[#33a350] transition-colors duration-300"
            >
                <i class="bi bi-envelope-fill text-xl"></i>
            </a>
            <a
                href="https://discord.com/users/931957993925378050"
                target="_blank"
                class="pl-2.5 pr-[0.6rem] py-1.5 rounded-full bg-[#2564ebad] hover:bg-[#5865f2] transition-colors duration-300"
            >
                <i class="bi bi-discord text-xl"></i>
            </a>
        </div>
    </nav>
</template>
