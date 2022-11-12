import React from 'react';
import { Card, Text } from '@nextui-org/react';
import type { Technology as TechnologyData } from '@/types';
import Image from 'next/image';

const Technology: React.FC<TechnologyData> = ({ name, icon }) => {
    const renderIcon =
        typeof icon === 'string' ? <Image src={icon} alt={name} width={32} height={32} /> : icon;

    return (
        <Card css={{ p: '$6', borderColor: '$primary' }}>
            <div className="flex items-center justify-between">
                {renderIcon}
                <Text
                    span
                    css={{
                        fontSize: '$lg',
                        fontWeight: '$semibold',
                    }}
                >
                    {name}
                </Text>
            </div>
        </Card>
    );
};

export default Technology;
