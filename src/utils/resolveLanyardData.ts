import type { LanyardData, CodeActivity, Status } from '@/types';

function resolveVSCActivityImage(raw: string) {
    const match = raw.match(
        /https\/raw\.githubusercontent\.com\/LeonardSSH\/vscord\/main\/assets\/icons\/([\w]*)(.*)/,
    );

    if (match) {
        return `https://raw.githubusercontent.com/LeonardSSH/vscord/main/assets/icons/${match[1]}${match[2]}`;
    }

    return 'https://raw.githubusercontent.com/LeonardSSH/vscord/main/assets/icons/idle.png';
}

function resolveVSActivityImage(raw: string) {
    const extname = raw.split('.').pop();

    if (extname) {
        return `https://raw.githubusercontent.com/LeonardSSH/vscord/main/assets/icons/${extname}.png`;
    }

    return 'https://raw.githubusercontent.com/LeonardSSH/vscord/main/assets/icons/idle.png';
}

export default function resolveLanyardData(data: any): LanyardData {
    const discordUser = data.discord_user;

    const codeActivities = (data.activities as Record<string, any>[])
        .filter(
            (activity) =>
                activity.type === 0 &&
                activity.state &&
                ['Code', 'Visual Studio'].includes(activity.name),
        )
        .map((activity) => {
            return {
                name: activity.name === 'Code' ? 'Visual Studio Code' : activity.name,
                state:
                    activity.name === 'Code'
                        ? activity.state
                        : `Working on ${activity.details.replace(/File /g, '')}`,
                details:
                    activity.name === 'Code'
                        ? activity.details.split(' - ').shift()
                        : `In ${activity.state}`,
                start_timestamp: activity.timestamps.start,
                assets: {
                    image:
                        activity.name === 'Code'
                            ? resolveVSCActivityImage(activity.assets.large_image)
                            : resolveVSActivityImage(activity.details),
                    text:
                        activity.name === 'Code'
                            ? activity.assets.large_text ?? activity.assets.small_text
                            : activity.assets.large_text
                            ? `Editing a ${activity.assets.large_text} file`
                            : activity.assets.small_text,
                },
            };
        });

    const discordStatus = data.discord_status as Status;

    return {
        custom_keys: data.kv,
        discord_user: {
            username: discordUser.username,
            discriminator: discordUser.discriminator,
            tag: `${discordUser.username}#${discordUser.discriminator}`,
            id: discordUser.id,
            status: discordStatus,
            avatar_url: discordUser.avatar
                ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.${
                      discordUser.avatar.startsWith('a_') ? 'gif' : 'png'
                  }`
                : `https://cdn.discordapp.com/embed/avatars/${discordUser.discriminator % 5}.png`,
        },
        code_activities: codeActivities as CodeActivity[],
    };
}
