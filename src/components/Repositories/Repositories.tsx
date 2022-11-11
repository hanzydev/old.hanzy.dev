import React from 'react';
import { Grid, Text, Pagination } from '@nextui-org/react';
import { Repository } from '@/types';
import dynamic from 'next/dynamic';

const Repository = dynamic(() => import('./Repository'));
const Skeleton = dynamic(() => import('./Skeleton'));

type IProps = {
    repositories?: Repository[];
};

const Repositories: React.FC<IProps> = ({ repositories }) => {
    const [currentPage, setCurrentPage] = React.useState(0);

    if (repositories === undefined) {
        return <Skeleton />;
    }

    if (!repositories.length) {
        return (
            <Grid.Container gap={2} justify="center">
                <Text css={{ color: '$accents7' }}>No repositories yet.</Text>
            </Grid.Container>
        );
    }

    const createPages = () => {
        const pages: Repository[][] = [];

        let repoPerPage = 4;
        let k = repoPerPage;

        for (let i = 0; i < repositories.length; i += repoPerPage) {
            const cur = repositories.slice(i, k);
            k += repoPerPage;

            pages.push(cur);
        }

        return pages;
    };

    const pages = createPages();

    if (!pages.length) {
        return <Skeleton />;
    }

    const onPageChange = (page: number) => {
        setCurrentPage(page - 1);
    };

    const renderRepositories = pages[currentPage].map((repository, i) => (
        <Grid xs={12} sm={6} md={4} lg={3} key={i}>
            <Repository {...repository} />
        </Grid>
    ));

    return (
        <div>
            <Grid.Container gap={2} justify="center">
                {renderRepositories}
                <Pagination
                    loop
                    initialPage={currentPage + 1}
                    total={pages.length}
                    onChange={onPageChange}
                />
            </Grid.Container>
        </div>
    );
};

export default Repositories;
