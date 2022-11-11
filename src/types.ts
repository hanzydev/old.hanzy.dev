export type Status = 'online' | 'idle' | 'dnd' | 'offline';

export interface CodeActivity {
    name: 'Visual Studio' | 'Visual Studio Code';
    state: string;
    details: string;
    start_timestamp: number;
    assets: {
        image: string;
        text: string;
    };
}

export interface LanyardDiscordUserData {
    username: string;
    discriminator: string;
    tag: `${string}#${string}`;
    id: string;
    avatar_url: string | null;
    status: Status;
}

export interface LanyardData {
    custom_keys: Record<string, any>;
    discord_user: LanyardDiscordUserData;
    code_activities: CodeActivity[];
}

export interface License {
    name: string;
    long_name: string;
}

export interface Repository {
    name: string;
    url: `https://github.com/${string}/${string}`;
    description: string;
    homepage: string;
    stars: number;
    forks: number;
    language: string;
    license: License | 'Not Licensed';
}