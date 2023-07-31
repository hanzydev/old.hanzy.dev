import { defineStore } from 'pinia';
import type { DiscordData, YoutubeMusicData, GithubRepositoryData } from '@/types';

export const useDiscord = defineStore({
    id: 'discord',
    state: () => ({
        data: null as DiscordData | null,
        dataReceived: false,
    }),
    actions: {
        setData(data: DiscordData) {
            this.data = data;
            this.dataReceived = true;
        },
    },
});

export const useYoutubeMusic = defineStore({
    id: 'youtubeMusic',
    state: () => ({
        data: null as YoutubeMusicData | null,
        dataReceived: false,
        newDataReceived: false,
    }),
    actions: {
        setData(data: YoutubeMusicData | null) {
            this.data = data;
            this.dataReceived = true;
        },
        setNewDataReceived(value: boolean) {
            this.newDataReceived = value;
        },
    },
});

export const useGithub = defineStore({
    id: 'github',
    state: () => ({
        data: [] as GithubRepositoryData[],
        dataReceived: false,
    }),
    actions: {
        setData(data: GithubRepositoryData[]) {
            this.data = data;
            this.dataReceived = true;
        },
    },
});
