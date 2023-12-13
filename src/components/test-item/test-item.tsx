import React from 'react';
import { ITest } from '../../types/types';

interface TestItemProps {
  test: ITest;
}

function TestItem({ test }: TestItemProps) {
  return (
    <div>
      {test.id} {test.name}
    </div>
  );
}

export default TestItem;
