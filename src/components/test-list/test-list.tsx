import React, { useState } from 'react';
import styles from './test-list.module.scss';
import ArrowUp from '../../assets/icons/arrow-up.svg';
import ArrowDown from '../../assets/icons/arrow-down.svg';
import { ITest } from '../../types/types';

interface TestListProps {
  items: ITest[];
  renderItem: (item: ITest) => React.ReactNode;
  handleSortBy: <K extends keyof ITest>(property: K, arr: ITest[]) => void;
  sortOrder: 'ASC' | 'DESC';
}

function TestList({
  items,
  renderItem,
  handleSortBy,
  sortOrder,
}: TestListProps) {
  const [arrowDir, setArrowDir] = useState('ASC');

  function handleOrderByType() {
    handleSortBy('type', items);
    const newOrder = arrowDir === 'ASC' ? 'DESC' : 'ASC';
    setArrowDir(newOrder);
  }

  return (
    <section className={styles.list}>
      <div className={styles.list__header}>
        <button onClick={() => handleSortBy('name', items)}>
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
        <button>
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
