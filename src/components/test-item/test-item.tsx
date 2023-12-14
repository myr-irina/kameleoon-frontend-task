import React from 'react';
import { ITest } from '../../types/types';
import styles from './test-item.module.scss';

interface TestItemProps {
  test: ITest;
}

function TestItem({ test }: TestItemProps) {
  return (
    <li className={styles['list-item']}>
      <div> {test.name} </div>
      <div> {test.type}</div>
    </li>
  );
}

export default TestItem;
