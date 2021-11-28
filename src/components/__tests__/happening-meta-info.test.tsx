import React from 'react';
import HappeningMetaInfo, { Props } from '../happening-meta-info';
import { render } from './testing-utils';

const date = new Date();

const happeningMetaInfoProps: Array<Props> = [
    {
        date: date,
        location: 'Lesesal1',
        title: 'no-ls-oe',
        contactEmail: 'test@test.com',
        companyLink: null,
        spotRangeCounts: [
            {
                spots: 10,
                minDegreeYear: 1,
                maxDegreeYear: 5,
                regCount: 0,
                waitListCount: 0,
            },
        ],
        spotRangesFromCms: null,
    },
    {
        date: date,
        location: 'Lesesal1',
        title: 'io-ls-oe',
        contactEmail: 'test@test.com',
        companyLink: null,
        spotRangeCounts: [
            {
                spots: 28,
                minDegreeYear: 1,
                maxDegreeYear: 5,
                regCount: 10,
                waitListCount: 0,
            },
        ],
        spotRangesFromCms: null,
    },
    {
        date: date,
        location: 'Lesesal1',
        title: 'no-us-oe',
        contactEmail: 'test@test.com',
        companyLink: null,
        spotRangeCounts: null,
        spotRangesFromCms: [
            {
                spots: 0,
                minDegreeYear: 1,
                maxDegreeYear: 5,
            },
        ],
    },
    {
        date: date,
        location: 'Lesesal1',
        title: 'io-us-oe',
        contactEmail: 'test@test.com',
        companyLink: null,
        spotRangeCounts: [
            {
                spots: 0,
                minDegreeYear: 1,
                maxDegreeYear: 5,
                regCount: 10123,
                waitListCount: 0,
            },
        ],
        spotRangesFromCms: null,
    },
    {
        date: date,
        location: 'Lesesal1',
        title: 'no-ls-ne',
        contactEmail: 'test@test.com',
        companyLink: null,
        spotRangeCounts: [
            {
                spots: 8,
                minDegreeYear: 1,
                maxDegreeYear: 2,
                regCount: 0,
                waitListCount: 15,
            },
            {
                spots: 37,
                minDegreeYear: 3,
                maxDegreeYear: 5,
                regCount: 0,
                waitListCount: 0,
            },
        ],
        spotRangesFromCms: null,
    },
    {
        date: date,
        location: 'Lesesal1',
        title: 'io-ls-ne',
        contactEmail: 'test@test.com',
        companyLink: null,
        spotRangeCounts: [
            {
                spots: 8,
                minDegreeYear: 1,
                maxDegreeYear: 3,
                regCount: 10,
                waitListCount: 0,
            },
            {
                spots: 89,
                minDegreeYear: 4,
                maxDegreeYear: 5,
                regCount: 89,
                waitListCount: 3,
            },
        ],
        spotRangesFromCms: null,
    },
    {
        date: date,
        location: 'Lesesal1',
        title: 'no-us-ne',
        contactEmail: 'test@test.com',
        companyLink: null,
        spotRangeCounts: [
            {
                spots: 0,
                minDegreeYear: 2,
                maxDegreeYear: 4,
                regCount: 0,
                waitListCount: 0,
            },
        ],
        spotRangesFromCms: null,
    },
    {
        date: date,
        location: 'Lesesal1',
        title: 'io-us-ne',
        contactEmail: 'test@test.com',
        companyLink: null,
        spotRangeCounts: [
            {
                spots: 0,
                minDegreeYear: 4,
                maxDegreeYear: 5,
                regCount: 123917,
                waitListCount: 0,
            },
        ],
        spotRangesFromCms: null,
    },
];

describe('HappeningMetaInfo', () => {
    test('renders without crashing', () => {
        const { getByTestId } = render(<HappeningMetaInfo {...happeningMetaInfoProps[0]} />);

        expect(getByTestId(/happening-meta-info/i)).toBeInTheDocument();
    });

    test('renders correctly 1', () => {
        const props = happeningMetaInfoProps[0];
        const { getByText } = render(<HappeningMetaInfo {...props} />);

        expect(getByText(new RegExp(`${props.spotRangeCounts?.[0].spots} plasser`))).toBeInTheDocument();
    });

    test('renders correctly 2', () => {
        const props = happeningMetaInfoProps[1];
        const { getByText } = render(<HappeningMetaInfo {...props} />);

        expect(
            getByText(new RegExp(`${props.spotRangeCounts?.[0].regCount}/${props.spotRangeCounts?.[0].spots} påmeldt`)),
        ).toBeInTheDocument();
    });

    test('renders correctly 3', () => {
        const props = happeningMetaInfoProps[2];
        const { getByText } = render(<HappeningMetaInfo {...props} />);

        expect(getByText(new RegExp('∞ plasser'))).toBeInTheDocument();
    });

    test('renders correctly 4', () => {
        const props = happeningMetaInfoProps[3];
        const { getByText } = render(<HappeningMetaInfo {...props} />);

        expect(getByText(new RegExp(`${props.spotRangeCounts?.[0].regCount}/∞ påmeldt`))).toBeInTheDocument();
    });

    test('renders correctly 5', () => {
        const props = happeningMetaInfoProps[4];
        const { getByText } = render(<HappeningMetaInfo {...props} />);

        props.spotRangeCounts?.map((sr) => {
            return expect(
                getByText(new RegExp(`${sr.spots} plasser for ${sr.minDegreeYear}. - ${sr.maxDegreeYear}. trinn`)),
            ).toBeInTheDocument();
        });
    });

    test('renders correctly 6', () => {
        const props = happeningMetaInfoProps[5];
        const { getByText } = render(<HappeningMetaInfo {...props} />);

        props.spotRangeCounts?.map((sr) => {
            return expect(
                getByText(
                    new RegExp(
                        `${sr.regCount}/${sr.spots} påmeldt for ${sr.minDegreeYear}. - ${sr.maxDegreeYear}. trinn`,
                    ),
                ),
            ).toBeInTheDocument();
        });
    });

    test('renders correctly 7', () => {
        const props = happeningMetaInfoProps[6];
        const { getByText } = render(<HappeningMetaInfo {...props} />);

        expect(getByText(new RegExp('∞ plasser'))).toBeInTheDocument();
    });

    test('renders correctly 8', () => {
        const props = happeningMetaInfoProps[7];
        const { getByText } = render(<HappeningMetaInfo {...props} />);

        props.spotRangeCounts?.map((sr) => {
            return expect(getByText(new RegExp(`${sr.regCount}/∞ påmeldt`))).toBeInTheDocument();
        });
    });
});