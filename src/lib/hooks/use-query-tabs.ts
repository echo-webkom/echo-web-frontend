import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export const toQuery = (str: string): string =>
    str.replace(/ /g, '-').toLowerCase().replace(/æ/g, 'ae').replace(/ø/g, 'oe').replace(/å/g, 'aa');

const useQueryTabs = (
    queryName: string,
    tabNames: Array<string>,
    dontClear?: Array<string>,
    dontClearOn?: Array<number>,
): [number, (index: number) => void] => {
    const router = useRouter();
    const path = router?.asPath;

    const queries = () => {
        const mbQueries = path?.split('?')?.[1];
        if (mbQueries === undefined) return new URLSearchParams();
        else return new URLSearchParams('?'?.concat(mbQueries) || '');
    };

    const initialTab = (n: number) => (n === -1 ? 0 : n);
    const tabNamesQuery = tabNames.map(toQuery);

    const initialIndex = initialTab(tabNamesQuery.indexOf(queries().get(queryName) || ''));
    const [tabIndex, setTabIndex] = useState(initialIndex);

    useEffect(
        () => {
            router?.push(
                {
                    query: {
                        ...(dontClearOn?.includes(tabIndex) || dontClearOn?.length === 0
                            ? {
                                  ...Array.from(queries().entries())
                                      .flatMap(([key, val]) => {
                                          if (key === queryName || (!dontClear?.includes(key) ?? false)) return [];
                                          else return [{ [key]: val }];
                                      })
                                      .reduce((prev, curr) => Object.assign(prev, curr), {}),
                              }
                            : undefined),
                        [queryName]: [tabNamesQuery[tabIndex]],
                    },
                },
                undefined,
                { shallow: true },
            );
        },
        [tabIndex], // eslint-disable-line react-hooks/exhaustive-deps
    );

    return [tabIndex, setTabIndex];
};

export default useQueryTabs;
