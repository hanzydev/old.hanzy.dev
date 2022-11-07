import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import type { Repository, LanyardResponse } from '@/types';

export default function Home() {
    const [lanyard, setLanyard] = React.useState<LanyardResponse | null>(null);
    const [repositories, setRepositories] = React.useState<Repository[] | null>(null);

    React.useEffect(() => {
        fetch('/api/lanyard')
            .then((res) => res.json())
            .then((data) => setLanyard(data));

        fetch('/api/repositories')
            .then((res) => res.json())
            .then((data) => setRepositories(data.repositories));
    }, []);

    return <div></div>;
}
