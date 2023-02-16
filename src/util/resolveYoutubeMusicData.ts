import type { YoutubeMusicData } from '../types';

async function getSongDetails(songName: string): Promise<string | null> {
    const data = await fetch(`https://ytapi.deliever42.repl.co/search?q=${songName}`).then((res) =>
        res.json(),
    );
    return !data.success ? null : data.results[0] ?? null;
}

export async function resolveYoutubeMusicData(activityData: any): Promise<YoutubeMusicData> {
    let ytMusic = activityData
        ? {
              song_name: activityData.state,
              song_image: activityData.assets.large_image.match(
                  /mp:external\/(.*)\/https\/(.*)/,
              )[2],
              paused: activityData.assets.small_text === 'Paused',
              details: {},
          }
        : null;

    if (ytMusic) {
        const details = await getSongDetails(ytMusic.song_name);

        if (details) {
            ytMusic.details = details;
        } else {
            ytMusic = null;
        }
    }

    return ytMusic as YoutubeMusicData;
}
