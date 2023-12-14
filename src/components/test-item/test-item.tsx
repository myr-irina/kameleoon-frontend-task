import React, { useEffect, useState } from 'react';
import { ISite, ITest } from '../../types/types';
import styles from './test-item.module.scss';
import { cleanedUrl, capitalizeLetter } from '../../utils/cleanUrl';

interface TestItemProps {
  test: ITest;
  sites: ISite[];
}

function TestItem({ test, sites }: TestItemProps) {
  const selectedSite = sites.find((site) => site.id === test.siteId);

  return (
    <li
      className={styles['list-item']}
      style={{
        borderLeft: '4px solid',
        borderLeftColor:
          test.siteId === 1
            ? '#E14165;'
            : test.siteId === 2
            ? '#C2C2FF'
            : test.siteId === 3
            ? '#8686FF'
            : '',
      }}
    >
      <div>{capitalizeLetter(test.name)}</div>
      <div>{capitalizeLetter(test.type)}</div>
      <div>{capitalizeLetter(test.status)}</div>
      <div>{cleanedUrl(selectedSite?.url)}</div>
      <button className={styles.button}>Results</button>
    </li>
  );
}

export default TestItem;
