import { Spacer } from '@nextui-org/react';
import { Grid, Card, Text, Button } from '@nextui-org/react';
import { FaGithub } from 'react-icons/fa';
import { AiFillStar, AiOutlineFork } from 'react-icons/ai';
import { TbLicense, TbLanguage } from 'react-icons/tb';

export default function Skeleton() {
    return (
        <Grid.Container gap={2} justify="center">
            <Grid xs={12} sm={8} md={4} lg={4}>
                <Card css={{ p: '$5', borderColor: '$primary' }}>
                    <div className="animate-pulse">
                        <Card.Header>
                            <Grid.Container>
                                <Grid xs={12}>
                                    <div className="bg-[#2b2f31] rounded w-[7rem] h-4"></div>
                                </Grid>
                                <Spacer y={0.7} />
                                <Grid xs={12}>
                                    <div className="bg-[#2b2f31] rounded w-[16rem] h-3"></div>
                                </Grid>
                            </Grid.Container>
                            <FaGithub size={24} />
                        </Card.Header>
                        <Spacer y={0.35} />
                        <Card.Body css={{ py: '$3' }} />
                        <Spacer y={0.35} />
                        <Card.Footer>
                            <div className="flex items-center">
                                <Button auto size="xs" css={{ px: '$4' }}>
                                    <AiFillStar size={16} />
                                    <Spacer x={0.2} />
                                    <Text css={{ lineHeight: '$xs' }}>0</Text>
                                </Button>

                                <Spacer x={0.5} />

                                <Button auto size="xs" css={{ px: '$4' }}>
                                    <AiOutlineFork size={16} />
                                    <Spacer x={0.2} />
                                    <Text css={{ lineHeight: '$xs' }}>0</Text>
                                </Button>

                                <Spacer x={0.5} />

                                <Button auto size="xs" css={{ px: '$4' }}>
                                    <TbLicense size={16} />
                                    <Spacer x={0.2} />
                                    <Text css={{ lineHeight: '$xs' }}>Unknown</Text>
                                </Button>
                            </div>
                            <Spacer x={0.5} />

                            <Button auto size="xs" css={{ bg: '$accents3', ml: 'auto' }}>
                                <TbLanguage size={16} />
                                <Spacer x={0.2} />
                                Unknown
                            </Button>
                        </Card.Footer>
                    </div>
                </Card>
            </Grid>
        </Grid.Container>
    );
}
