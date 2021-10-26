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
    // Can't use `router.query` since that only works with SSR.
    const path = router?.asPath;

    // Use `URLSearchParams` to parse URL string.
    const queries = () => {
        const mbQueries = path?.split('?')?.[1];
        return mbQueries === undefined ? new URLSearchParams() : new URLSearchParams('?'?.concat(mbQueries) || '');
    };

    const initialTab = (n: number) => (n === -1 ? 0 : n);
    const tabNamesQuery = tabNames.map(toQuery);

    const initialIndex = initialTab(tabNamesQuery.indexOf(queries().get(queryName) || ''));
    const [tabIndex, setTabIndex] = useState(initialIndex);

    useEffect(() => {
        router?.push(
            {
                query: {
                    // If current `tabIndex` is in `dontClearOn`, then also include
                    // other query parameters in the URL than `queryName`.
                    ...(dontClearOn?.includes(tabIndex ?? false) || (dontClearOn?.length === 0 ?? false)
                        ? {
                              // Get all current query parameters and return
                              // them in the same JSON object (`query`).
                              ...Array.from(queries().entries())
                                  .flatMap(([key, val]) =>
                                      // If `queryName` is set to a value which is not a tab, exclude it.
                                      (key === queryName && !tabNamesQuery.includes(val)) ||
                                      // If the query parameters name (`key`) is not in `dontClear`, exclude it.
                                      (!dontClear?.includes(key) ?? false)
                                          ? []
                                          : [{ [key]: val }],
                                  )
                                  .reduce((prev, curr) => Object.assign(prev, curr), {}),
                          }
                        : undefined),
                    // Add current tab as a query parameter.
                    [queryName]: [tabNamesQuery[tabIndex]],
                },
            },
            undefined,
            { shallow: true },
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tabIndex]);

    return [tabIndex, setTabIndex];
};

export default useQueryTabs;
