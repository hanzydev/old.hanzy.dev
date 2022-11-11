import React from 'react';
import { Spacer, Card, Grid, Text } from '@nextui-org/react';
import Image from 'next/image';

type IProps = {
    name: string;
    url: string;
};

const Repository: React.FC<IProps> = ({ name }) => {
    return (
        <Card css={{ p: '$5', borderColor: '$primary' }}>
            <Card.Header>
                <Grid.Container>
                    <Grid xs={12}>
                        <Text h4 css={{ lineHeight: '$xs' }}>
                            {name}
                        </Text>
                    </Grid>
                    <Grid xs={12}>{/* <Text css={{ color: '$accents8' }}>{details}</Text> */}</Grid>
                </Grid.Container>
                {/* <Image
                    alt={assets.text}
                    src={assets.image}
                    width={50}
                    height={50}
                    className="rounded-md"
                /> */}
            </Card.Header>
            <Card.Body css={{ py: '$2' }}>{/* <Text>{state}</Text> */}</Card.Body>
            <Card.Footer>
                {/* <Text span color="primary">
                    {dateString}
                </Text> */}
            </Card.Footer>
        </Card>
    );
};

export default Repository;
