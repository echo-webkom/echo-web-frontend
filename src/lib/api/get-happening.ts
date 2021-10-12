import { Bedpres } from './bedpres';
import { Event } from './event';
import { RegistrationAPI, SpotRangeCount, HappeningType } from './registration';

export interface Props {
    happening: Bedpres | Event | null;
    spotRangeCounts: Array<SpotRangeCount> | null;
    date: number;
    backendUrl: string;
}

const getHappening = async (
    happening: Bedpres | Event | null,
    slug: string,
    happeningType: HappeningType,
): Promise<Props> => {
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8080';

    const adminKey = process.env.ADMIN_KEY;
    if (!adminKey) throw Error('No ADMIN_KEY defined.');

    const { spotRangeCounts } = await RegistrationAPI.getSpotRangeCounts(adminKey, slug, happeningType, backendUrl);

    const date = Date.now();

    return {
        happening,
        spotRangeCounts,
        date,
        backendUrl,
    };
};

export default getHappening;
