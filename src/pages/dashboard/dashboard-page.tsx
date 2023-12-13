import React, { ChangeEvent, useState, useEffect } from 'react';
import styles from './dashboard-page.module.scss';
import SearchBar from '../../components/search-bar/search-bar';
import TestList from '../../components/test-list/test-list';
import { ITest } from '../../types/types';
import TestItem from '../../components/test-item/test-item';
import axios from 'axios';

function DashboardPage() {
  const [searchInput, setSearchInput] = useState('');
  const [tests, setTests] = useState<ITest[]>([]);

  console.log({ tests });

  function handleInputChange(e: ChangeEvent) {
    const target = e.target as HTMLInputElement;
    setSearchInput(target.value);
  }

  useEffect(() => {
    fetchTests();
  }, []);

  async function fetchTests() {
    try {
      const response = await axios.get<ITest[]>('http://localhost:3100/tests');
      setTests(response.data);
    } catch (e) {
      alert(e);
    }
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.header}>Dashboard</h1>
      <SearchBar
        searchInput={searchInput}
        handleInputChange={handleInputChange}
      />
      <TestList
        items={tests}
        renderItem={(test: ITest) => <TestItem test={test} key={test.id} />}
      />
    </main>
  );
}

export default DashboardPage;
