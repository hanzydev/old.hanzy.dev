import type { NextApiRequest, NextApiResponse } from 'next';
import type { Repository } from '@/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Repository[]>) {
    const data = (await fetch(`https://api.github.com/users/${process.env.GITHUB_USERNAME}/repos`, {
        headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
    }).then((res) => res.json())) as Record<string, any>[];

    return res.status(200).json(
        data
            .filter((repo) => !repo.fork)
            .map((repo) => {
                return {
                    name: repo.name,
                    url: repo.html_url,
                    description: repo.description || 'No description provided.',
                    stars: repo.stargazers_count,
                    forks: repo.forks_count,
                    language: repo.language,
                    license: repo.license
                        ? {
                              name: repo.license.spdx_id,
                              long_name: repo.license.name,
                          }
                        : 'Not Licensed',
                };
            }),
    );
}
