export interface DiscordData {
    status: 'online' | 'idle' | 'dnd' | 'offline';
    user: {
        username: string;
        display_name: string;
        tag: `${string}#${string}`;
        id: string;
        avatar_url: string;
    };
}

export enum StatusColors {
    online = '#3ba55c',
    idle = '#faa61a',
    dnd = '#e44343',
    offline = '#747f8c',
}

export interface YoutubeMusicData {
    song_name: string;
    song_url: string;
    song_image: string;
    paused: boolean;
    details: any;
}

export interface GithubRepositoryData {
    name: string;
    url: string;
    description: string;
    stars: number;
    forks: number;
    language: string;
    license:
        | {
              name: string;
              long_name: string;
          }
        | 'Not Licensed';
}
