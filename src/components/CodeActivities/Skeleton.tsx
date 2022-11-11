import { Spacer } from '@nextui-org/react';
import { Grid, Card, Text } from '@nextui-org/react';

export default function Skeleton() {
    return (
        <Grid.Container gap={2} justify="center">
            <Grid xs={12} sm={6} md={4} lg={3}>
                <Card css={{ p: '$6', borderColor: '$primary' }}>
                    <div className="animate-pulse">
                        <Card.Header>
                            <Grid.Container>
                                <Grid xs={12}>
                                    <div className="bg-[#2b2f31] rounded w-[10rem] h-5"></div>
                                </Grid>
                                <Spacer y={0.7} />
                                <Grid xs={12}>
                                    <div className="bg-[#2b2f31] rounded w-[7.5rem] h-3"></div>
                                </Grid>{' '}
                            </Grid.Container>
                            <div className="bg-[#2b2f31] rounded w-[55px] h-[45px]"></div>
                        </Card.Header>
                        <Spacer y={0.35} />
                        <Card.Body css={{ py: '$2' }}>
                            <div className="bg-[#2b2f31] rounded w-[12.7rem] h-3"></div>
                        </Card.Body>
                        <Spacer y={0.35} />
                        <Card.Footer>
                            <Text span color="primary">
                            <div className="bg-[#2b2f31] rounded w-[5rem] h-3"></div>
                            </Text>
                        </Card.Footer>
                    </div>
                </Card>
            </Grid>
        </Grid.Container>
    );
}
