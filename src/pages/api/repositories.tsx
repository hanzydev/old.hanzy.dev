import type { NextApiRequest, NextApiResponse } from 'next';

type License = {
    name: string;
    long_name: string;
};

type Repository = {
    name: string;
    url: `https://github.com/${string}/${string}`;
    description: string;
    homepage: string;
    stars: number;
    language: string;
    license: License | 'Not Licensed';
};

type RepositoriesResponse = {
    ok: boolean;
    repositories: Repository[];
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<RepositoriesResponse>,
) {
    const data = (await fetch(`https://api.github.com/users/${process.env.GITHUB_USERNAME}/repos`, {
        headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
    }).then((res) => res.json())) as Record<string, any>[];

    return res.status(200).json({
        ok: true,
        repositories: data
            .filter((repo) => !repo.fork)
            .map((repo) => {
                return {
                    name: repo.name,
                    url: repo.html_url,
                    description: repo.description,
                    homepage: repo.homepage,
                    stars: repo.stargazers_count,
                    language: repo.language,
                    license: repo.license
                        ? {
                              name: repo.license.spdx_id,
                              long_name: repo.license.name,
                          }
                        : 'Not Licensed',
                };
            }),
    });
}
