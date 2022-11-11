import React from 'react';
import Image from 'next/image';
import { Text } from '@nextui-org/react';
import dynamic from 'next/dynamic';

const Description = dynamic(() => import('./Description'));
const Skeleton = dynamic(() => import('./Skeleton'));

type IProps = {
    avatarURL?: string | null;
    tag?: `${string}#${string}`;
};

const Profile: React.FC<IProps> = ({ avatarURL, tag }) => {
    if (!avatarURL || !tag) {
        return <Skeleton />;
    }

    return (
        <div className="shadow rounded-md p-4 m-0 backdrop-blur-lg">
            <div className="flex flex-col sm:flex-row items-center text-center sm:text-left space-x-0 sm:space-x-4">
                <Image
                    src={avatarURL}
                    alt="avatar"
                    className="rounded-lg"
                    width={152}
                    height={152}
                />
                <div>
                    <Text h2 className="font-jetbrains">
                        {tag}
                    </Text>
                    <Description />
                </div>
            </div>
        </div>
    );
};

export default Profile;
