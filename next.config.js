/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: [
            'cdn.discordapp.com',
            'raw.githubusercontent.com',
            'www.svgrepo.com',
        ],
    },
};

module.exports = nextConfig;
