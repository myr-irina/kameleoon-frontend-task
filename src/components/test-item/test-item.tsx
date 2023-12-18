import React from 'react';
import { ISite, ITest } from '../../types/types';
import styles from './test-item.module.scss';
import { cleanedUrl, capitalizeLetter } from '../../utils/helpers/helpers';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

interface TestItemProps {
  test: ITest;
  sites: ISite[];
}

function TestItem({ test, sites }: TestItemProps) {
  const selectedSite = sites.find((site) => site.id === test.siteId);

  return (
    <li
      className={classNames(styles['list-item'], {
        [styles['border-red']]: test.siteId === 1,
        [styles['border-blue']]: test.siteId === 2,
        [styles['border-purple']]: test.siteId === 3,
      })}
    >
      <div>{capitalizeLetter(test.name)}</div>
      <div>{capitalizeLetter(test.type)}</div>
      <div
        className={classNames({
          [styles['text-correct']]: test.status === 'ONLINE',
          [styles['text-warning']]: test.status === 'PAUSED',
          [styles['text-alert']]: test.status === 'STOPPED',
        })}
      >
        {capitalizeLetter(test.status)}
      </div>
      <div>{cleanedUrl(selectedSite?.url)}</div>
      {test.status === 'DRAFT' ? (
        <Link to={`/finalize/${test.id}`}>
          <button className={`${styles.button} ${styles['button-finalize']}`}>
            Finalize
          </button>
        </Link>
      ) : (
        <Link to={`/results/${test.id}`}>
          <button className={styles.button}>Results</button>
        </Link>
      )}
    </li>
  );
}

export default TestItem;
