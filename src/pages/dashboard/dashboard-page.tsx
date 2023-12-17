import React, { useContext } from 'react';
import styles from './dashboard-page.module.scss';
import SearchBar from '../../components/search-bar/search-bar';
import TestList from '../../components/test-list/test-list';
import { ITest } from '../../types/types';
import TestItem from '../../components/test-item/test-item';
import { AppContext } from '../../context/app-context';

function DashboardPage() {
  const {
    query,
    filteredTests,
    handleInputChange,
    handleSortByNameAndType,
    handleSortBySiteURL,
    sites,
  } = useContext(AppContext);

  return (
    <>
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
    </>
  );
}

export default DashboardPage;
