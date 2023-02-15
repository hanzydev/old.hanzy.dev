<template>
    <Navbar />
    <Home :data="data" v-if="dataReceived" />
    <Spinner v-else />
</template>

<script setup lang="ts">
import { ReactiveVariable } from 'vue/macros';
import { LanyardData, resolveLanyardData } from '../util/resolveLanyardData';

let data: ReactiveVariable<LanyardData> | undefined = $ref();
let dataReceived = $ref(false);

const connect = () => {
    const socket = new WebSocket('wss://api.lanyard.rest/socket');

    socket.onopen = () => {
        console.log('[WebSocket] Connected');

        socket.send(
            JSON.stringify({
                op: 2,
                d: {
                    subscribe_to_id: '931957993925378050',
                },
            }),
        );
    };

    socket.onmessage = async (event) => {
        const { op, d } = JSON.parse(event.data);

        switch (op) {
            case 0:
                data = await resolveLanyardData(d);
                dataReceived = true;
                break;
            case 1:
                setInterval(() => {
                    if (dataReceived) {
                        console.log('[WebSocket] Heartbeat sent');

                        socket.send(
                            JSON.stringify({
                                op: 3,
                            }),
                        );
                    }
                }, d.heartbeat_interval);

                break;
        }
    };

    socket.onclose = (e) => {
        console.log(`[WebSocket] Closed: ${e.reason ?? 'Unknown'}`);

        setTimeout(() => {
            console.log('[WebSocket] Reconnecting...');

            socket.onopen = null;
            socket.onclose = null;
            socket.onmessage = null;

            connect();
        }, 5000);
    };
};

connect();
</script>
