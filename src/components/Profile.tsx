import React from 'react';
import Image from 'next/image';
import type { LanyardData } from '@/types';
import { Text } from '@nextui-org/react';

export default function Profile() {
    const [data, setData] = React.useState<LanyardData>();

    React.useEffect(() => {
        fetch('/api/lanyard')
            .then((res) => res.json())
            .then((data) => setData(data));
    });

    if (!data)
        return (
            <div className="shadow rounded-md p-4 mx-auto backdrop-blur-lg">
                <div className="flex space-x-4 animate-pulse">
                    <div className="rounded-lg bg-[#2b2f31] h-[14vh] w-[14vh]"></div>
                    <div className="flex-1 space-y-6 py-1">
                        <div>
                            <div className="bg-[#2b2f31] rounded w-24 h-6 sm:w-64"></div>
                            <br />
                            <div className="bg-[#2b2f31] rounded w-36 h-3 sm:w-96"></div>
                        </div>
                    </div>
                </div>
            </div>
        );

    return (
        <div className="shadow rounded-md p-4 mx-auto backdrop-blur-lg">
            <div className="flex flex-col sm:flex-row items-center text-center sm:text-left space-x-4">
                <Image
                    src={data.discord_user.avatar_url as string}
                    alt="avatar"
                    className="rounded-lg"
                    width={128}
                    height={128}
                />
                <div className="flex-1 space-y-6 py-1">
                    <div>
                        <Text h2 className="font-jetbrains">
                            {data.discord_user.tag}
                        </Text>
                        <Text h4>
                            Hello, my name is Emirhan, I live in Istanbul/Turkey, I have been
                            involved in software for 2 years, I am a full stack developer.
                        </Text>
                    </div>
                </div>
            </div>
        </div>
    );
}
