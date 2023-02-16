export interface DiscordData {
    status: 'online' | 'idle' | 'dnd' | 'offline';
    user: {
        username: string;
        discriminator: string;
        tag: `${string}#${string}`;
        id: string;
        avatar_url: `https://cdn.discordapp.com/avatars/${string}/${string}.${'png' | 'gif'}`;
    };
}

export enum StatusColors {
    online = '#40ac7a',
    idle = '#ed9e19',
    dnd = '#e44343',
    offline = '#747f8d',
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
