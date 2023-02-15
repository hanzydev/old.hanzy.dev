export interface LanyardData {
    discord: {
        status: 'online' | 'idle' | 'dnd' | 'offline';
        user: {
            tag: `${string}#${string}`;
            id: string;
            avatar_url: `https://cdn.discordapp.com/avatars/${string}/${string}.${'png' | 'gif'}`;
        };
    };
    yt_music: {
        song_name: string;
        song_url: string;
        song_image: string;
        paused: boolean;
    } | null;
}

export enum StatusColors {
    online = '#40ac7a',
    idle = '#ed9e19',
    dnd = '#e44343',
    offline = '#747f8d',
}

async function getSongIdBySongName(songName: string): Promise<string | null> {
    const data = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${songName}&type=video&key=AIzaSyCSzBHHutuVZizOH3zsh53-NyEej3-AbKw`,
    )
        .then((res) => res.json())
        .catch(() => null);
    return !data || data.error ? null : data.items[0].id.videoId;
}

export async function resolveLanyardData(data: any): Promise<LanyardData> {
    const rawYTMusic = data.activities.find((a: any) => a.name === 'YouTube Music');
    let ytMusic = rawYTMusic
        ? {
              song_name: rawYTMusic.state,
              song_url: '',
              song_image: rawYTMusic.assets.large_image.match(/mp:external\/(.*)\/https\/(.*)/)[2],
              paused: rawYTMusic.assets.small_text === 'Paused',
          }
        : null;

    if (ytMusic) {
        const songId = await getSongIdBySongName(ytMusic.song_name);

        if (songId) {
            ytMusic.song_url = `https://music.youtube.com/watch?v=${songId}`;
        } else {
            ytMusic = null;
        }
    }

    return {
        discord: {
            status: data.discord_status,
            user: {
                tag: data.discord_user.username + '#' + data.discord_user.discriminator,
                id: data.discord_user.id,
                avatar_url: `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${
                    data.discord_user.avatar
                }.${data.discord_user.avatar.startsWith('a_') ? 'gif' : 'png'}`,
            },
        },
        yt_music: ytMusic,
    } as LanyardData;
}
