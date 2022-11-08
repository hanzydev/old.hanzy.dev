import React from 'react';
import Image from 'next/image';
import type { LanyardData } from '@/types';
import { Text } from '@nextui-org/react';
import Skeleton from './Skeleton';
import Description from './Description';
import resolveLanyardData from '@/utils/resolveLanyardData';

export default function Profile({ userId }: any) {
    const [data, setData] = React.useState<LanyardData>();

    const DiscordUserId = '931957993925378050';

    React.useEffect(() => {
        const endpoint = `wss://api.lanyard.rest/socket`;

        let socket = new WebSocket(endpoint);
        let received = false;

        socket.onopen = () => {
            console.log('[WebSocket] Connected');

            socket.send(
                JSON.stringify({
                    op: 2,
                    d: {
                        subscribe_to_id: DiscordUserId,
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

    if (!data) {
        return <Skeleton />;
    }

    return (
        <div className="shadow rounded-md p-4 m-0 backdrop-blur-lg">
            <div className="flex flex-col sm:flex-row items-center text-center sm:text-left space-x-0 sm:space-x-4">
                <Image
                    src={data.discord_user.avatar_url as string}
                    alt="avatar"
                    className="rounded-lg"
                    width={152}
                    height={152}
                />
                <div>
                    <Text h2 className="font-jetbrains">
                        {data.discord_user.tag}
                    </Text>
                    <Description />
                </div>
            </div>
        </div>
    );
}
