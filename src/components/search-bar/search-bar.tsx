import React, { useState, useEffect, ChangeEvent } from 'react';
import styles from './search-bar.module.scss';
import SearchIcon from '../../assets/icons/search-glass.svg';
import { ITest } from '../../types/types';

interface SearchBarProps {
  query: string;
  filteredTests: ITest[];
  handleInputChange: (e: ChangeEvent) => void;
}

function SearchBar({
  query,
  handleInputChange,
  filteredTests,
}: SearchBarProps) {
  const length = filteredTests.length;

  return (
    <section className={styles.search}>
      <div className={styles.search__container}>

          <div className={styles['search__input-block']}>
            <img
              className={styles.search__icon}
              src={SearchIcon}
              alt="search glass"
            />
            <input
              className={styles.search__input}
              type="text"
              placeholder="What test are you looking for?"
              value={query}
              onChange={handleInputChange}
              autoComplete="off"
            />
            <p className={styles.search__text}>{`${length} tests`}</p>
          </div>

      </div>
    </section>
  );
}

export default SearchBar;
