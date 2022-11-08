import React from 'react';
import Image from 'next/image';
import type { LanyardData } from '@/types';
import { Text } from '@nextui-org/react';
import Skeleton from './Skeleton';
import Description from './Description';

export default function Profile() {
    const [data, setData] = React.useState<LanyardData>();

    React.useEffect(() => {
        fetch('/api/lanyard')
            .then((res) => res.json())
            .then((data) => setData(data));
    }, []);

    if (!data) {
        return <Skeleton />;
    }

    return (
        <div className="shadow rounded-md p-4 m-0 backdrop-blur-lg">
            <div className="flex flex-col sm:flex-row items-center text-center sm:text-left space-x-0 sm:space-x-4">
                <Image
                    src={data.discord_user.avatar_url as string}
                    alt="avatar"
                    className="rounded-lg"
                    width={152}
                    height={152}
                />
                <div>
                    <Text h2 className="font-jetbrains">
                        {data.discord_user.tag}
                    </Text>
                    <Description />
                </div>
            </div>
        </div>
    );
}
