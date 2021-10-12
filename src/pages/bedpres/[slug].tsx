import { useTimeout } from '@chakra-ui/react';
import { differenceInMilliseconds, parseISO } from 'date-fns';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import ErrorBox from '../../components/error-box';
import HappeningUI from '../../components/happening';
import Layout from '../../components/layout';
import SEO from '../../components/seo';
import { Bedpres, BedpresAPI } from '../../lib/api/bedpres';
import { HappeningType, SpotRangeCount } from '../../lib/api/registration';
import getHappening from '../../lib/api/get-happening';

const BedpresPage = ({
    bedpres,
    backendUrl,
    spotRangeCounts,
    date,
    error,
}: {
    bedpres: Bedpres;
    backendUrl: string;
    spotRangeCounts: Array<SpotRangeCount>;
    date: number;
    error: string;
}): JSX.Element => {
    const router = useRouter();
    const regDate = parseISO(bedpres?.registrationTime);
    const time =
        !bedpres || differenceInMilliseconds(regDate, date) < 0 || differenceInMilliseconds(regDate, date) > 172800000
            ? null
            : differenceInMilliseconds(regDate, date);

    useTimeout(() => {
        router.replace(router.asPath, undefined, { scroll: false });
    }, time);

    return (
        <Layout>
            {error && !bedpres && <ErrorBox error={error} />}
            {bedpres && !error && (
                <>
                    <SEO title={bedpres.title} />
                    <HappeningUI
                        bedpres={bedpres}
                        event={null}
                        backendUrl={backendUrl}
                        spotRangeCounts={spotRangeCounts}
                        date={date}
                    />
                </>
            )}
        </Layout>
    );
};

interface Params extends ParsedUrlQuery {
    slug: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { slug } = context.params as Params;
    const { bedpres, error } = await BedpresAPI.getBedpresBySlug(slug);

    if (error === '404') {
        return {
            notFound: true,
        };
    }

    return { props: { ...(await getHappening(bedpres, slug, HappeningType.BEDPRES)), error: error } };
};

export default BedpresPage;
