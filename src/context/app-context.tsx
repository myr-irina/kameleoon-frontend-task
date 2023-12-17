import axios from 'axios';
import React, { ChangeEvent, createContext, useEffect, useState } from 'react';
import { ITest, ISite } from '../types/types';
import { BASE_URL } from '../utils/constants';
import { sortByAlphabet, cleanedUrl } from '../utils/helpers';

interface AppContextProps {
  query: string;
  filteredTests: ITest[];
  handleInputChange: (e: ChangeEvent<Element>) => void;
  handleSortByNameAndType: <T extends ITest, K extends keyof T>(
    property: K,
    arr: T[],
  ) => void;
  handleSortBySiteURL: (sites: ISite[], tests: ITest[]) => void;
  sites: ISite[];
}

export const AppContext = createContext<AppContextProps>({
  query: '',
  filteredTests: [],
  handleInputChange: () => {},
  handleSortByNameAndType: () => {},
  handleSortBySiteURL: () => {},
  sites: [],
});

interface AppProviderProps {
  children: React.ReactNode;
}

function AppProvider({ children }: AppProviderProps) {
  const [query, setQuery] = useState('');
  const [tests, setTests] = useState<ITest[]>([]);
  const [error, setError] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [filteredTests, setFilteredTests] = useState<ITest[]>([]);
  const [sites, setSites] = useState<ISite[]>([]);
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('ASC');

  function handleInputChange(e: ChangeEvent) {
    const target = e.target as HTMLInputElement;
    const inputValue = target.value.toLowerCase();
    setQuery(inputValue);

    if (!inputValue) {
      setFilteredTests(tests);
    } else {
      const filteredItems = tests.filter((test: ITest) =>
        test.name.toLowerCase().includes(inputValue),
      );
      setFilteredTests(filteredItems);
    }
  }

  useEffect(() => {
    fetchTests();
    fetchSites();
  }, []);

  async function fetchTests() {
    try {
      const response = await axios.get<ITest[]>(`${BASE_URL}/tests`);
      setIsLoaded(true);
      setTests(response.data);
      setFilteredTests(response.data);
    } catch (error) {
      setIsLoaded(true);
      if (error instanceof Error) {
        setError(error?.message);
      }
    }
  }

  async function fetchSites() {
    try {
      const response = await axios.get<ISite[]>(`${BASE_URL}/sites`);
      setSites(response.data);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error?.message);
      }
    }
  }

  function handleSortByNameAndType<T extends ITest, K extends keyof T>(
    property: K,
    arr: T[],
  ) {
    const newOrder = sortOrder === 'ASC' ? 'DESC' : 'ASC';
    setSortOrder(newOrder);

    const sortedData = sortByAlphabet(arr, property, newOrder);
    setFilteredTests(sortedData);
  }

  function handleSortBySiteURL(sites: ISite[], tests: ITest[]) {
    const siteIdToURL = sites.reduce((acc, site) => {
      acc[site.id] = cleanedUrl(site.url);
      return acc;
    }, {} as { [key: number]: string });

    const sortedTests = [...tests].sort((a, b) => {
      const siteAURL = siteIdToURL[a.siteId];
      const siteBURL = siteIdToURL[b.siteId];
      return siteAURL.localeCompare(siteBURL);
    });

    const newOrder = sortOrder === 'ASC' ? 'DESC' : 'ASC';
    setSortOrder(newOrder);

    const sortedData = newOrder === 'ASC' ? sortedTests.reverse() : sortedTests;
    setFilteredTests(sortedData);
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <AppContext.Provider
      value={{
        query,
        filteredTests,
        handleInputChange,
        handleSortByNameAndType,
        handleSortBySiteURL,
        sites,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
