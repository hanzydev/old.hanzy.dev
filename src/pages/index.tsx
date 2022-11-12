import React from 'react';
import dynamic from 'next/dynamic';
import resolveLanyardData from '@/utils/resolveLanyardData';
import type { LanyardData, Repository, Technology } from '@/types';
import { Text, Spacer } from '@nextui-org/react';
import { Parallax } from 'react-scroll-parallax';
import { FaGithub } from 'react-icons/fa';
import { DISCORD_USER_ID } from '@/constants';

const Profile = dynamic(() => import('@/components/Profile/Profile'));
const CodeActivities = dynamic(() => import('@/components/CodeActivities/CodeActivities'));
const Repositories = dynamic(() => import('@/components/Repositories/Repositories'));
const Technologies = dynamic(() => import('@/components/Technologies/Technologies'));
const Footer = dynamic(() => import('@/components/Footer/Footer'));

export default function Home() {
    const [data, setData] = React.useState<LanyardData>();
    const [repositories, setRepositories] = React.useState<Repository[] | undefined>();

    React.useEffect(() => {
        fetch('/api/repositories')
            .then((res) => res.json())
            .then((data) => {
                setRepositories(data);
            });

        const endpoint = `wss://api.lanyard.rest/socket`;

        let socket = new WebSocket(endpoint);
        let received = false;

        socket.onopen = () => {
            console.log('[WebSocket] Connected');

            socket.send(
                JSON.stringify({
                    op: 2,
                    d: {
                        subscribe_to_id: DISCORD_USER_ID,
                    },
                }),
            );
        };

        socket.onclose = () => {
            console.log('[WebSocket] Closed');

            setTimeout(() => {
                console.log('[WebSocket] Reconnecting...');

                socket.onopen = null;
                socket.onclose = null;
                socket.onmessage = null;

                socket = new WebSocket(endpoint);
            }, 5000);
        };

        socket.onmessage = (event) => {
            const { op, d } = JSON.parse(event.data);

            switch (op) {
                case 0:
                    console.log('[WebSocket] Received data');
                    received = true;

                    setData(resolveLanyardData(d));
                    break;
                case 1:
                    setInterval(() => {
                        if (received) {
                            console.log('[WebSocket] Heartbeat sent');

                            socket.send(
                                JSON.stringify({
                                    op: 3,
                                }),
                            );
                        }
                    }, d.heartbeat_interval);
            }
        };
    }, []);

    return (
        <div>
            <div className="flex flex-col items-center justify-center h-[100vh] w-full container">
                <Profile avatarURL={data?.discord_user?.avatar_url} tag={data?.discord_user?.tag} />
            </div>
            <Parallax speed={25}>
                <div className="flex flex-col items-center justify-center h-[auto] w-full container">
                    <Text h1>Technologies I Use</Text>
                    <Technologies technologies={TECHNOLOGIES} />
                </div>
                <Spacer y={3} />
                <div className="flex flex-col items-center justify-center h-[auto] w-full container">
                    <Text h1>Repositories</Text>
                    <Repositories repositories={repositories} />
                </div>
                <Spacer y={3} />
                <div className="flex flex-col items-center justify-center h-[auto] w-full container">
                    <Text h1>Code Activities</Text>
                    <CodeActivities activities={data?.code_activities} />
                </div>
            </Parallax>
            <Spacer y={3} />
            <Footer />
        </div>
    );
}

const TECHNOLOGIES: Technology[] = [
    {
        name: 'JavaScript',
        url: 'https://developer.mozilla.org/en/docs/Web/JavaScript',
        icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg',
    },
    {
        name: 'TypeScript',
        url: 'https://www.typescriptlang.org/',
        icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg',
    },
    {
        name: 'HTML',
        url: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
        icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg',
    },
    {
        name: 'CSS',
        url: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
        icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg',
    },
    {
        name: 'Sass',
        url: 'https://sass-lang.com/',
        icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/sass/sass-original.svg',
    },
    {
        name: 'Python',
        url: 'https://www.python.org/',
        icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg',
    },
    {
        name: 'C#',
        url: 'https://docs.microsoft.com/en-us/dotnet/csharp/',
        icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/csharp/csharp-original.svg',
    },
    {
        name: 'React',
        url: 'https://reactjs.org/',
        icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg',
    },
    {
        name: 'Next.js',
        url: 'https://nextjs.org/',
        icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg',
    },
    {
        name: 'Vue.js',
        url: 'https://vuejs.org/',
        icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original.svg',
    },
    {
        name: 'Nuxt.js',
        url: 'https://nuxtjs.org/',
        icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nuxtjs/nuxtjs-original.svg',
    },
    {
        name: 'Svelte',
        url: 'https://svelte.dev/',
        icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/svelte/svelte-original.svg',
    },
    {
        name: 'SvelteKit',
        url: 'https://kit.svelte.dev/',
        icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/svelte/svelte-original.svg',
    },
    {
        name: 'Node.js',
        url: 'https://nodejs.org/',
        icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg',
    },
    {
        name: 'Deno',
        url: 'https://deno.land/',
        icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/denojs/denojs-original.svg',
    },
    {
        name: 'MongoDB',
        url: 'https://www.mongodb.com/',
        icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg',
    },
    {
        name: 'SurrealDB',
        url: 'https://surrealdb.com/',
        icon: 'https://raw.githubusercontent.com/surrealdb/surrealdb/main/img/icon.png',
    },
    {
        name: 'SQLite',
        url: 'https://www.sqlite.org/',
        icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/sqlite/sqlite-original.svg',
    },
    {
        name: 'GitHub',
        url: 'https://github.com/',
        icon: <FaGithub size={32} />,
    },
    {
        name: 'Git',
        url: 'https://git-scm.com/',
        icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg',
    },
    {
        name: 'Tailwind CSS',
        url: 'https://tailwindcss.com/',
        icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-plain.svg',
    },
    {
        name: 'JQuery',
        url: 'https://jquery.com/',
        icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/jquery/jquery-original.svg',
    },
    {
        name: 'Vercel',
        url: 'https://vercel.com/',
        icon: 'https://www.svgrepo.com/show/327408/logo-vercel.svg',
    },
    {
        name: 'Netlify',
        url: 'https://www.netlify.com/',
        icon: 'https://www.svgrepo.com/show/331495/netlify.svg',
    },
    {
        name: 'Heroku',
        url: 'https://www.heroku.com/',
        icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/heroku/heroku-plain.svg',
    },
    {
        name: 'VS Code',
        url: 'https://code.visualstudio.com/',
        icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original.svg',
    },
    {
        name: 'Visual Studio',
        url: 'https://visualstudio.microsoft.com/',
        icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/visualstudio/visualstudio-plain.svg',
    },
    {
        name: 'Windows',
        url: 'https://www.microsoft.com/en-us/windows',
        icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/windows8/windows8-original.svg',
    },
];
