export type Status = 'online' | 'idle' | 'dnd' | 'offline';

export enum StatusText {
    online = 'Online',
    idle = 'Idle',
    dnd = 'Do Not Disturb',
    offline = 'Offline',
}

export interface CodeActivity {
    name: 'Visual Studio' | 'Visual Studio Code';
    state: string;
    details: string;
    startTimestamp: number;
    assets: {
        image: string;
        text: string;
    };
}

export interface LanyardDiscordUserData {
    username: string;
    discriminator: string;
    tag: string;
    id: string;
    avatar_url: string | null;
    status_text: StatusText;
    status: Status;
}

export interface LanyardData {
    code: string;
    custom_keys: Record<string, any>;
    discord_user: LanyardDiscordUserData;
    code_activities: CodeActivity[];
    ok: true;
}

export interface LanyardErrorData {
    error: string;
    code: string;
    ok: false;
}

export type LanyardResponse = LanyardData | LanyardErrorData;

export interface License {
    name: string;
    long_name: string;
};

export interface Repository {
    name: string;
    url: `https://github.com/${string}/${string}`;
    description: string;
    homepage: string;
    stars: number;
    forks: number;
    language: string;
    license: License | 'Not Licensed';
};

export interface RepositoriesResponse {
    ok: boolean;
    repositories: Repository[];
};
