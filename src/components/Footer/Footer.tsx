import React from 'react';
import { Spacer, Text } from '@nextui-org/react';
import dynamic from 'next/dynamic';
import { FaGithub, FaDiscord, FaInstagram } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';
import { MAIL, DISCORD_USER_ID, INSTAGRAM_USERNAME, GITHUB_USERNAME } from '../../constants';

const FooterItem = dynamic(() => import('./FooterItem'));

const Footer: React.FC = () => {
    const year = new Date().getFullYear();

    return (
        <div className="flex flex-col container">
            <hr className="border-[#16181a] h-[0.2vh] w-full" />

            <Spacer y={1} />

            <div className="flex justify-between">
                <div className="flex gap-2 mr-auto">
                    <FooterItem
                        href={`https://github.com/${GITHUB_USERNAME}`}
                        icon={<FaGithub size={20} />}
                    />
                    <FooterItem
                        href={`https://discord.com/users/${DISCORD_USER_ID}`}
                        icon={<FaDiscord size={20} />}
                    />
                    <FooterItem
                        href={`https://instagram.com/${INSTAGRAM_USERNAME}`}
                        icon={<FaInstagram size={20} />}
                    />
                    <FooterItem href={`mailto:${MAIL}`} icon={<AiOutlineMail size={20} />} />
                </div>
                <Text h5 className="ml-auto">
                    © {year}{' '}
                    <Text span color="primary">
                        Deliever
                    </Text>
                </Text>
            </div>

            <Spacer y={2} />
        </div>
    );
};

export default Footer;