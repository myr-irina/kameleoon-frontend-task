import React, { ChangeEvent, useState, useEffect } from 'react';
import styles from './dashboard-page.module.scss';
import SearchBar from '../../components/search-bar/search-bar';
import TestList from '../../components/test-list/test-list';
import { ISite, ITest } from '../../types/types';
import TestItem from '../../components/test-item/test-item';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';
import { cleanedUrl, sortByAlphabet } from '../../utils/helpers';

function DashboardPage() {
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
    <main className={styles.main}>
      <h1 className={styles.header}>Dashboard</h1>
      <SearchBar
        query={query}
        handleInputChange={handleInputChange}
        filteredTests={filteredTests}
      />
      <TestList
        handleSortByNameAndType={handleSortByNameAndType}
        handleSortBySiteURL={handleSortBySiteURL}
        items={filteredTests}
        sites={sites}
        renderItem={(test: ITest) => (
          <TestItem sites={sites} test={test} key={test.id} />
        )}
      />
    </main>
  );
}

export default DashboardPage;
