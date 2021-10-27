import { Divider, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Wrap } from '@chakra-ui/react';
import React from 'react';
import { StudentGroup } from '../lib/api';
import ErrorBox from './error-box';
import StudentGroupView from './student-group-view';
import { useQueryTabs, toQuery } from '../lib/hooks';

const StudentGroupSection = ({
    studentGroups,
    error,
    groupType,
}: {
    studentGroups: Array<StudentGroup>;
    error: string;
    groupType: string;
}): JSX.Element => {
    const [tabIndex, setTabIndex] = useQueryTabs(
        groupType,
        studentGroups.map((sg) => sg.name),
        [groupType],
        [],
    );

    return (
        <>
            {error && <ErrorBox error={error} />}
            {studentGroups.length === 0 && !error && <Text>Finner ingen {groupType} :(</Text>}
            {studentGroups.length !== 0 && !error && (
                <Tabs
                    defaultIndex={tabIndex}
                    onChange={(index) => setTabIndex(index)}
                    variant="soft-rounded"
                    p="0"
                    data-testid="student-group-section"
                >
                    <TabList>
                        <Wrap justify="center">
                            {studentGroups.map((group: StudentGroup) => (
                                <Tab
                                    key={toQuery(group.name)}
                                    data-testid={`${group.name}-tab`}
                                    fontWeight="bold"
                                    fontSize="xl"
                                >
                                    {group.name}
                                </Tab>
                            ))}
                        </Wrap>
                    </TabList>
                    <Divider my=".5em" />
                    <TabPanels>
                        {studentGroups.map((group: StudentGroup) => (
                            <TabPanel p="0" key={group.name} data-testid={`${group.name}-tabPanel`}>
                                <StudentGroupView group={group} />
                            </TabPanel>
                        ))}
                    </TabPanels>
                </Tabs>
            )}
        </>
    );
};

export default StudentGroupSection;
