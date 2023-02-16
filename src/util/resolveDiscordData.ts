export interface DiscordData {
    status: 'online' | 'idle' | 'dnd' | 'offline';
    user: {
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

export async function resolveDiscordData(data: any): Promise<DiscordData> {
    return {
        status: data.discord_status,
        user: {
            tag: data.discord_user.username + '#' + data.discord_user.discriminator,
            id: data.discord_user.id,
            avatar_url: `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${
                data.discord_user.avatar
            }.${data.discord_user.avatar.startsWith('a_') ? 'gif' : 'png'}`,
        },
    } as DiscordData;
}
