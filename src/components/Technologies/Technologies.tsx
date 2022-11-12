import React from 'react';
import type { Technology as TechnologyData } from '@/types';
import { Grid } from '@nextui-org/react';
import dynamic from 'next/dynamic';

const Technology = dynamic(() => import('./Technology'));

type IProps = {
    technologies: TechnologyData[];
};

const Technologies: React.FC<IProps> = ({ technologies }) => {
    const renderTechnologies = technologies.map((technologie, i) => (
        <Grid xs={6} sm={4} md={3} lg={3} key={i}>
            <Technology {...technologie} />
        </Grid>
    ));

    return (
        <Grid.Container gap={2} justify="center">
            {renderTechnologies}
        </Grid.Container>
    );
};

export default Technologies;
