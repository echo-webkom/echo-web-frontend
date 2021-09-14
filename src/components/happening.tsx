import { Center, Divider, Grid, GridItem, Heading, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
import { differenceInHours, format, isAfter, isBefore, parseISO } from 'date-fns';
import Image from 'next/image';
import NextLink from 'next/link';
import React from 'react';
import { Bedpres } from '../lib/api/bedpres';
import { Event } from '../lib/api/event';
import { HappeningType, RegistrationCount } from '../lib/api/registration';
import Article from './article';
import Countdown from './countdown';
import HappeningMetaInfo from './happening-meta-info';
import RegistrationForm from './registration-form';
import Section from './section';

const HappeningUI = ({
    bedpres,
    event,
    backendUrl,
    regCount,
    date,
}: {
    bedpres: Bedpres | null;
    event: Event | null;
    backendUrl: string;
    regCount: RegistrationCount;
    date: number;
}): JSX.Element => {
    const happening = bedpres || event;
    const type = bedpres ? HappeningType.BEDPRES : HappeningType.EVENT;
    const spotsTotal = happening?.spots;
    const spotsTaken = regCount?.regCount;
    const spotsWaitlist = regCount?.waitListCount;

    const regDate = happening?.registrationTime ? parseISO(happening.registrationTime) : new Date(date);
    const eventDate = happening?.date ? parseISO(happening.date) : new Date(date);

    return (
        <>
            <Grid templateColumns={['repeat(1, 1fr)', null, null, 'repeat(4, 1fr)']} gap="4">
                <GridItem colSpan={1} as={Section}>
                    {happening && (
                        <>
                            {bedpres && (
                                <LinkBox mb="1em">
                                    <NextLink href={bedpres.companyLink} passHref>
                                        <LinkOverlay href={bedpres.companyLink} isExternal>
                                            <Center>
                                                <Image
                                                    src={bedpres.logoUrl}
                                                    alt="Bedriftslogo"
                                                    width={300}
                                                    height={300}
                                                />
                                            </Center>
                                        </LinkOverlay>
                                    </NextLink>
                                </LinkBox>
                            )}
                            <HappeningMetaInfo
                                date={parseISO(happening.date)}
                                location={happening.location}
                                companyLink={bedpres ? bedpres.companyLink : undefined}
                                spotsTotal={spotsTotal || undefined}
                                spotsTaken={spotsTaken || undefined}
                                spotsWaitlist={spotsWaitlist || undefined}
                                minDegreeYear={happening.minDegreeYear || undefined}
                                maxDegreeYear={happening.maxDegreeYear || undefined}
                            />
                            {happening.registrationTime && (
                                <>
                                    <Divider my="1em" />
                                    {isBefore(date, regDate) &&
                                        (differenceInHours(regDate, date) > 23 ? (
                                            <Center>
                                                <Text fontSize="2xl">
                                                    Åpner {format(regDate, 'dd. MMM yyyy, HH:mm')}
                                                </Text>
                                            </Center>
                                        ) : (
                                            <Countdown date={regDate} />
                                        ))}
                                    {isBefore(date, eventDate) && isAfter(date, regDate) && (
                                        <RegistrationForm happening={happening} type={type} backendUrl={backendUrl} />
                                    )}
                                    {isAfter(date, eventDate) && (
                                        <Center my="3" data-testid="bedpres-has-been">
                                            <Text>Påmeldingen er stengt.</Text>
                                        </Center>
                                    )}
                                </>
                            )}
                            <Divider my="1em" />
                            <Center>
                                <Heading size="lg">@{happening.author}</Heading>
                            </Center>
                        </>
                    )}
                </GridItem>
                <GridItem
                    colStart={[1, null, null, 2]}
                    rowStart={[2, null, null, 1]}
                    colSpan={[1, null, null, 3]}
                    rowSpan={2}
                    minW="0"
                >
                    <Section>
                        <Article heading={happening?.title || ''} body={happening?.body || ''} />
                    </Section>
                </GridItem>
            </Grid>
        </>
    );
};

export default HappeningUI;
