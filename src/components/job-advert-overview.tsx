import { Text, Stack, StackDivider } from '@chakra-ui/layout';
import { Select } from '@chakra-ui/select';
import React, { useState } from 'react';
import { JobAdvert } from '../lib/api';
import ErrorBox from './error-box';
import JobAdvertPreview from './job-advert-preview';

interface Props {
    jobAdverts: Array<JobAdvert> | null;
    error: string | null;
}

type JobType = 'all' | 'fulltime' | 'parttime' | 'internship' | 'summerjob';
type SortType = 'deadline' | 'companyName' | '_createdAt' | 'jobType';

const sortJobs = (list: Array<JobAdvert>, field: SortType) => {
    const sorted = list.sort((a: JobAdvert, b: JobAdvert) => (a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0));
    return field === '_createdAt' ? sorted.reverse() : sorted;
};

const JobAdvertOverview = ({ jobAdverts, error }: Props): JSX.Element => {
    const [type, setType] = useState<JobType>('all');
    const [location, setLocation] = useState<string>('all');
    const [company, setCompany] = useState<string>('all');
    const [sortBy, setSortBy] = useState<SortType>('deadline');

    // list comprehension when?
    const allLocations: Array<string> = [];

    // bruh hvordan fjerne "?"
    jobAdverts?.map((job: JobAdvert) => {
        job.locations.map((location: string) => {
            allLocations.push(location);
        });
    });

    return (
        <>
            {error && <ErrorBox error={error} />}
            {!error && jobAdverts && (
                <Stack direction={['column', null, null, 'row']} spacing={5} divider={<StackDivider />}>
                    <Stack spacing={2}>
                        <Text>Type</Text>
                        <Select onChange={(evt) => setType(evt.target.value as JobType)} value={type}>
                            <option value="all">Alle</option>
                            <option value="summerjob">Sommerjobb</option>
                            <option value="parttime">Deltid</option>
                            <option value="fulltime">Fulltid</option>
                            <option value="internship">Internship</option>
                        </Select>
                        <Text>Sted</Text>
                        <Select onChange={(evt) => setLocation(evt.target.value)} value={location}>
                            <option value="all">Alle</option>
                            {allLocations
                                .filter((value, index, self) => self.indexOf(value) === index)
                                .map((location: string, index: number) => (
                                    <option key={`${location.toLocaleLowerCase()}-${index}`} value={location}>
                                        {location}
                                    </option>
                                ))}
                        </Select>
                        <Text>Bedrift</Text>
                        <Select onChange={(evt) => setCompany(evt.target.value)} value={company}>
                            <option value="all">Alle</option>
                            {jobAdverts
                                .map((job: JobAdvert) => job.companyName)
                                .filter((value, index, self) => self.indexOf(value) === index) //get unique values
                                .map((company: string, index: number) => (
                                    <option
                                        key={`${company.toLocaleLowerCase()}-${index}`}
                                        value={company.toLowerCase()}
                                    >
                                        {company}
                                    </option>
                                ))}
                        </Select>
                        <Text>Sorter etter</Text>
                        <Select onChange={(evt) => setSortBy(evt.target.value as SortType)} value={sortBy}>
                            <option value="deadline">Søknadsfrist</option>
                            <option value="companyName">Bedrift</option>
                            <option value="_createdAt">Publisert</option>
                            <option value="jobType">Type</option>
                        </Select>
                    </Stack>
                    <Stack w="100%" gap="5">
                        {sortJobs(jobAdverts, sortBy).map((job: JobAdvert) =>
                            (type === job.jobType || type === 'all') &&
                            (job.locations.includes(location) || location === 'all') &&
                            (company === job.companyName.toLowerCase() || company === 'all') ? (
                                <JobAdvertPreview key={job.slug} jobAdvert={job} />
                            ) : null,
                        )}
                    </Stack>
                </Stack>
            )}
        </>
    );
};

export default JobAdvertOverview;
