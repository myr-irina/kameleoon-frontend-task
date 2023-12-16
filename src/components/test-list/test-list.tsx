import React, { useState } from 'react';
import styles from './test-list.module.scss';
import ArrowUp from '../../assets/icons/arrow-up.svg';
import ArrowDown from '../../assets/icons/arrow-down.svg';
import { ISite, ITest } from '../../types/types';

interface TestListProps {
  items: ITest[];
  sites: ISite[];
  renderItem: (item: ITest) => React.ReactNode;
  handleSortByNameAndType: <K extends keyof ITest>(
    property: K,
    arr: ITest[],
  ) => void;
  handleSortBySiteURL: (sites: ISite[], tests: ITest[]) => void;
}

function TestList({
  items,
  renderItem,
  handleSortByNameAndType,
  handleSortBySiteURL,
  sites,
}: TestListProps) {
  const [arrowDir, setArrowDir] = useState('ASC');

  function handleOrderByType() {
    handleSortByNameAndType('type', items);
    const newOrder = arrowDir === 'ASC' ? 'DESC' : 'ASC';
    setArrowDir(newOrder);
  }

  return (
    <section className={styles.list}>
      <div className={styles.list__header}>
        <button onClick={() => handleSortByNameAndType('name', items)}>
          <span className={styles.list__item}>NAME</span>
        </button>
        <button onClick={handleOrderByType}>
          <span>TYPE</span>
          {arrowDir === 'ASC' ? (
            <img src={ArrowUp} alt="arrow up" />
          ) : (
            <img src={ArrowDown} alt="arrow down" />
          )}
        </button>
        <button>
          <span>STATUS</span>
        </button>
        <button onClick={() => handleSortBySiteURL(sites, items)}>
          <span>SITE</span>
        </button>
      </div>
      {items.length === 0 ? (
        <p>Your search did not match any results.</p>
      ) : (
        <ul> {items.map(renderItem)}</ul>
      )}
    </section>
  );
}

export default TestList;
