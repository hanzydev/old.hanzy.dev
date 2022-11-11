import React from 'react';
import type { CodeActivity } from '@/types';
import { Grid, Text } from '@nextui-org/react';
import dynamic from 'next/dynamic';

const CodeActivity = dynamic(() => import('./CodeActivity'));
const Skeleton = dynamic(() => import('./Skeleton'));

type IProps = {
    activities?: CodeActivity[];
};

const CodeActivities: React.FC<IProps> = ({ activities }) => {
    if (!activities) {
        return <Skeleton />;
    }

    const renderActivities = activities.length ? (
        activities.map((activity, i) => (
            <Grid xs={12} sm={6} md={4} lg={3} key={i}>
                <CodeActivity startTimestamp={activity.start_timestamp} {...activity} />
            </Grid>
        ))
    ) : (
        <Text css={{ color: '$accents7' }}>No activity yet.</Text>
    );

    return (
        <Grid.Container gap={2} justify="center">
            {renderActivities}
        </Grid.Container>
    );
};

export default CodeActivities;
