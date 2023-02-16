import type { GithubRepositoryData } from '../../types';

export default defineEventHandler(async () => {
    const data = (await fetch(`https://api.github.com/users/deliever42/repos`, {
        headers: {
            Authorization: `Bearer ${process.env.VITE_GITHUB_TOKEN}`,
        },
    }).then((res) => res.json())) as Record<string, any>[];

    return data
        .filter((repo) => !repo.fork)
        .map((repo) => {
            return {
                name: repo.name,
                url: repo.html_url,
                description: repo.description || 'No description provided.',
                stars: repo.stargazers_count,
                forks: repo.forks_count,
                language: repo.language ?? 'Unknown',
                license: repo.license
                    ? {
                          name: repo.license.spdx_id,
                          long_name: repo.license.name,
                      }
                    : 'Not Licensed',
            };
        }) as GithubRepositoryData[];
});
