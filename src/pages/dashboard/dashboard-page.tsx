import React, { ChangeEvent, useState, useEffect } from 'react';
import styles from './dashboard-page.module.scss';
import SearchBar from '../../components/search-bar/search-bar';
import TestList from '../../components/test-list/test-list';
import { ITest } from '../../types/types';
import TestItem from '../../components/test-item/test-item';
import axios from 'axios';
import { TESTS_NOT_FOUND_MESSAGE } from '../../utils/constants';
import { BASE_URL } from '../../utils/constants';

function DashboardPage() {
  const [query, setQuery] = useState('');
  const [tests, setTests] = useState<ITest[]>([]);
  const [error, setError] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [filteredTests, setFilteredTests] = useState<ITest[]>([]);

  console.log({ filteredTests, query });

  function handleInputChange(e: ChangeEvent) {
    const target = e.target as HTMLInputElement;
    setQuery(target.value);

    if (target.value === '') {
      setFilteredTests(tests);
    } else {
      const filteredItems = tests.filter((test: ITest) =>
        test.name.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredTests(filteredItems);
    }
  }

  useEffect(() => {
    fetchTests();
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

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.header}>Dashboard</h1>
      <SearchBar query={query} handleInputChange={handleInputChange} filteredTests={filteredTests}/>
      <TestList
        items={filteredTests}
        renderItem={(test: ITest) => <TestItem test={test} key={test.id} />}
      />
    </main>
  );
}

export default DashboardPage;
