import type { NextApiRequest, NextApiResponse } from 'next';
import { type CodeActivity, type LanyardResponse, type Status, StatusText } from '@/types';

function resolveVSCActivityImage(raw: string) {
    const match = raw.match(
        /https\/raw\.githubusercontent\.com\/LeonardSSH\/vscord\/main\/assets\/icons\/([\w]*)(.*)/,
    );

    if (match) {
        return `https://raw.githubusercontent.com/LeonardSSH/vscord/main/assets/icons/${match[1]}${match[2]}`;
    }

    return null;
}

function resolveVSActivityImage(raw: string) {
    const match = raw.match(/File [\w]*(.*)/);

    if (match) {
        return `https://raw.githubusercontent.com/LeonardSSH/vscord/main/assets/icons/${match[1].slice(
            1,
        )}.png`;
    }

    return null;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<LanyardResponse>) {
    const data = await fetch(
        `https://api.lanyard.rest/v1/users/${process.env.DISCORD_USER_ID}`,
    ).then((res) => res.json());

    if (!data.success) {
        return res
            .status(400)
            .json({ ok: false, code: data.error.code, error: data.error.message });
    }

    const discordUser = data.data.discord_user;

    const codeActivities = (data.data.activities as Record<string, any>[])
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
                details: activity.name === 'Code' ? activity.details : `In ${activity.state}`,
                startTimestamp: activity.timestamps.start,
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

    return res.status(200).json({
        ok: true,
        code: 'success',
        custom_keys: data.data.kv,
        discord_user: {
            username: discordUser.username,
            discriminator: discordUser.discriminator,
            tag: `${discordUser.username}#${discordUser.discriminator}`,
            id: discordUser.id,
            avatar_url: discordUser.avatar
                ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.${
                      discordUser.avatar.startsWith('a_') ? 'gif' : 'png'
                  }`
                : null,
            status_text: StatusText[discordUser.status as Status],
            status: discordUser.status as Status,
        },
        code_activities: codeActivities as CodeActivity[],
    });
}
