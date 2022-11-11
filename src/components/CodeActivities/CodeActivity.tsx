import React from 'react';
import { Spacer, Card, Grid, Text } from '@nextui-org/react';
import Image from 'next/image';
import { CodeActivity } from '@/types';

type IProps = {
    assets: CodeActivity['assets'];
    details: string;
    name: string;
    startTimestamp: number;
    state: string;
};

const CodeActivity: React.FC<IProps> = ({ assets, details, name, startTimestamp, state }) => {
    const parseTime = (time: number) => {
        return time >= 10 ? time.toString() : `0${time}`;
    };

    const parseMs = (ms: number) => {
        const months = Math.trunc(ms / 2592000000);
        const weeks = Math.trunc(ms / (1000 * 60 * 60 * 24 * 7));
        const days = Math.trunc(ms / 86400000);
        const hours = Math.trunc(ms / 3600000) % 24;
        const minutes = Math.trunc(ms / 60000) % 60;
        const seconds = Math.trunc(ms / 1000) % 60;

        if (months > 0) {
            return `${months} months elapsed`;
        }

        if (weeks > 0) {
            return `${weeks} weeks elapsed`;
        }

        if (days > 0) {
            return `${days} days elapsed`;
        }

        if (hours > 0) {
            return `${parseTime(hours)}:${parseTime(minutes)}:${parseTime(seconds)} elapsed`;
        }

        return `${parseTime(minutes)}:${parseTime(seconds)} elapsed`;
    };

    const useCountdown = (targetDate: number) => {
        const countdownDate = new Date(targetDate).getTime();

        const [countdown, setCountdown] = React.useState(Date.now() - countdownDate);

        React.useEffect(() => {
            const interval = setInterval(() => {
                setCountdown(Date.now() - countdownDate);
            }, 1000);

            return () => clearInterval(interval);
        }, [countdownDate]);

        return parseMs(countdown);
    };

    const dateString = useCountdown(startTimestamp);

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
                        <Text css={{ color: '$accents8' }}>{details}</Text>
                    </Grid>
                </Grid.Container>
                <Image
                    alt={assets.text}
                    src={assets.image}
                    width={50}
                    height={50}
                    className="rounded-md"
                />
            </Card.Header>
            <Card.Body css={{ py: '$2' }}>
                <Text>{state}</Text>
            </Card.Body>
            <Card.Footer>
                <Text span color="primary">
                    {dateString}
                </Text>
            </Card.Footer>
        </Card>
    );
};

export default CodeActivity;
