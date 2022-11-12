import React from 'react';
import dynamic from 'next/dynamic';
import resolveLanyardData from '@/utils/resolveLanyardData';
import type { LanyardData, Repository } from '@/types';
import { Text, Spacer } from '@nextui-org/react';
import { Parallax } from 'react-scroll-parallax';

const Profile = dynamic(() => import('@/components/Profile/Profile'));
const CodeActivities = dynamic(() => import('@/components/CodeActivities/CodeActivities'));
const Repositories = dynamic(() => import('@/components/Repositories/Repositories'));

const DISCORD_USER_ID = '931957993925378050';

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
                    <Text h1>Code Activities</Text>
                    <CodeActivities activities={data?.code_activities} />
                </div>
                <Spacer y={3} />
                <div className="flex flex-col items-center justify-center h-[auto] w-full container">
                    <Text h1>Repositories</Text>
                    <Repositories repositories={repositories} />
                </div>
                <Spacer y={3} />
                {/* <div className="flex flex-col items-center justify-center h-[auto] w-full container">
                    <Text h1>Technologies I Use</Text>
                    <Repositories repositories={repositories} />
                </div> */}
            </Parallax>
        </div>
    );
}
