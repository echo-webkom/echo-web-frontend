import { BoxProps, Flex, Heading, Spacer, Text, useBreakpointValue } from '@chakra-ui/react';
import React from 'react';
import { Happening, Post, JobAdvert, RegistrationCount } from '../lib/api';
import ButtonLink from './button-link';
import EntryList from './entry-list';
import Section from './section';

interface Props extends BoxProps {
    title?: string;
    titles?: Array<string>;
    entries: Array<Happening | Post | JobAdvert>;
    entryLimit?: number;
    altText?: string;
    linkTo?: string;
    type: 'event' | 'bedpres' | 'post' | 'job-advert';
    registrationCounts?: Array<RegistrationCount>;
    enableJobAdverts?: boolean;
}

const EntryBox = ({
    title,
    titles,
    entries,
    entryLimit,
    altText,
    linkTo,
    type,
    registrationCounts,
    enableJobAdverts = false,
    ...props
}: Props): JSX.Element => {
    const choices = titles ?? [title];
    const heading = useBreakpointValue(choices); // cannot call hooks conditionally

    return (
        <Section w="100%" h="100%" data-cy={`entry-box-${type}`} {...props}>
            <Flex h="100%" direction="column" alignItems="center">
                {heading && <Heading mb="8">{heading}</Heading>}
                {altText && entries.length === 0 && <Text>{altText}</Text>}
                {entries.length > 0 && (
                    <EntryList
                        entries={entries}
                        entryLimit={entryLimit}
                        type={type}
                        registrationCounts={registrationCounts}
                        enableJobAdverts={enableJobAdverts}
                    />
                )}
                <Spacer />
                {linkTo && (
                    <ButtonLink
                        linkTo={linkTo}
                        transition=".1s ease-out"
                        marginTop="7"
                        _hover={{ transform: 'scale(1.05)' }}
                    >
                        Se mer
                    </ButtonLink>
                )}
            </Flex>
        </Section>
    );
};

export default EntryBox;
