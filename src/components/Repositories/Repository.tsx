import React from 'react';
import { Spacer, Card, Grid, Text, Link, Button, Tooltip } from '@nextui-org/react';
import { Repository as RepositoryData } from '@/types';
import { FaGithub } from 'react-icons/fa';
import { AiFillStar, AiOutlineFork } from 'react-icons/ai';
import { TbLicense, TbLanguage } from 'react-icons/tb';

const Repository: React.FC<RepositoryData> = ({
    name,
    url,
    description,
    stars,
    forks,
    license,
    language,
}) => {
    const renderLicense =
        typeof license === 'string' ? (
            license
        ) : (
            <Tooltip content={license.long_name} color="primary">
                {license.name}
            </Tooltip>
        );

    return (
        <Card css={{ p: '$5', borderColor: '$primary' }}>
            <Card.Header>
                <Grid.Container>
                    <Grid xs={12}>
                        <Text h4 css={{ lineHeight: '$xs' }}>
                            {name}
                        </Text>
                    </Grid>
                    <Grid xs={12}>
                        <Text css={{ color: '$accents8', lineHeight: '$xs' }}>{description}</Text>
                    </Grid>
                </Grid.Container>
                <Link href={url} target="_blank">
                    <FaGithub size={24} />
                </Link>
            </Card.Header>
            <Card.Body css={{ py: '$3' }} />
            <Card.Footer>
                <div className="flex items-center">
                    <Button auto size="xs" css={{ px: '$4' }}>
                        <AiFillStar size={16} />
                        <Spacer x={0.2} />
                        <Text css={{ lineHeight: '$xs' }}>{stars}</Text>
                    </Button>

                    <Spacer x={0.5} />

                    <Button auto size="xs" css={{ px: '$4' }}>
                        <AiOutlineFork size={16} />
                        <Spacer x={0.2} />
                        <Text css={{ lineHeight: '$xs' }}>{forks}</Text>
                    </Button>

                    <Spacer x={0.5} />

                    <Button auto size="xs" css={{ px: '$4' }}>
                        <TbLicense size={16} />
                        <Spacer x={0.2} />
                        <Text css={{ lineHeight: '$xs' }}>{renderLicense}</Text>
                    </Button>
                </div>
                <Spacer x={0.5} />

                <Button auto size="xs" css={{ bg: '$accents3', ml: 'auto' }}>
                    <TbLanguage size={16} />
                    <Spacer x={0.2} />
                    {language}
                </Button>
            </Card.Footer>
        </Card>
    );
};

export default Repository;
