import { Button, Center, Divider, GridItem, SimpleGrid, useColorModeValue } from '@chakra-ui/react';
import { isFuture, isPast } from 'date-fns';
import React, { useState } from 'react';
import { Happening } from '../lib/api';
import EntryBox from './entry-box';

interface Props {
    entries: Array<Happening>;
    type: 'event' | 'bedpres';
}

const EntryOverview = ({ entries, type }: Props): JSX.Element => {
    const alt = type === 'event' ? 'arrangementer' : 'bedriftspresentasjoner';

    const [eventCount, setEventCount] = useState(6);

    const bg = useColorModeValue('button.light.primary', 'button.dark.primary');
    const hover = useColorModeValue('button.light.primaryHover', 'button.dark.primaryHover');
    const active = useColorModeValue('button.light.primaryActive', 'button.dark.primaryActive');
    const textColor = useColorModeValue('button.light.text', 'button.dark.text');

    const upcoming = entries
        .filter((entry: Happening) => {
            return isFuture(new Date(entry.date));
        })
        .splice(0, eventCount);

    const past = entries
        .filter((entry: Happening) => {
            return isPast(new Date(entry.date));
        })
        .reverse()
        .splice(0, eventCount);

    return (
        <>
            <SimpleGrid columns={[1, null, null, 2]} spacing="5">
                <GridItem rowStart={[2, null, null, 1]}>
                    <EntryBox title="Tidligere" entries={past} altText={`Ingen tidligere ${alt}.`} type={type} />
                </GridItem>
                <GridItem rowStart={1}>
                    <EntryBox title="Kommende" entries={upcoming} altText={`Ingen kommende ${alt}.`} type={type} />
                </GridItem>
            </SimpleGrid>

            <Divider my="5" />
            <Center>
                <Button
                    onClick={() => setEventCount(eventCount + 6)}
                    w="6rem"
                    mr="0.5rem"
                    bg={bg}
                    color={textColor}
                    _hover={{ bg: hover }}
                    _active={{ borderColor: active }}
                    fontSize="xl"
                    borderRadius="0.5rem"
                >
                    Se flere
                </Button>
            </Center>
        </>
    );
};

export default EntryOverview;
