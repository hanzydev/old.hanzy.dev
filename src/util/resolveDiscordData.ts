import type { DiscordData } from '../types';

export async function resolveDiscordData(data: any): Promise<DiscordData> {
    return {
        status: data.discord_status,
        user: {
            username: data.discord_user.username,
            discriminator: data.discord_user.discriminator,
            tag: data.discord_user.username + '#' + data.discord_user.discriminator,
            id: data.discord_user.id,
            avatar_url: `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${
                data.discord_user.avatar
            }.${data.discord_user.avatar.startsWith('a_') ? 'gif' : 'png'}?size=1024`,
        },
    } as DiscordData;
}
