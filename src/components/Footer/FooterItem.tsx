import React from 'react';
import { Button } from '@nextui-org/react';
import Link from 'next/link';

type IProps = { href: string; icon: JSX.Element };

const FooterItem: React.FC<IProps> = ({ href, icon }) => {
    return (
        <Link href={href} target="_blank">
            <Button auto size="sm" css={{ p: '$5', bg: '$accents0' }}>
                {icon}
            </Button>
        </Link>
    );
};

export default FooterItem;
