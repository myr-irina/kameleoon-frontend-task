import React from 'react';
import styles from './test-list.module.scss';
import ArrowUp from '../../assets/icons/arrow-up.svg';

interface TestListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function TestList<T>(props: TestListProps<T>) {
  return (
    <section className={styles.list}>
      <div className={styles.list__header}>
        <p className={styles.list__item}>NAME</p>
        <span>
          <p>TYPE</p>
          <button>
            <img src={ArrowUp} alt="arrow up" />
          </button>
        </span>
        <p>STATUS</p>
        <p>SITE</p>
      </div>
      {props.items.length === 0 ? (
        <p>Your search did not match any results.</p>
      ) : (
        <ul> {props.items.map(props.renderItem)}</ul>
      )}
    </section>
  );
}

export default TestList;
