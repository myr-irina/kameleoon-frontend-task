import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ITest } from '../../types/types';
import { AppContext } from '../../context/app-context';

function FinalizePage() {
  const { testId } = useParams();
  const parsedTestId = testId ? parseInt(testId, 10) : undefined;

  const { filteredTests } = useContext(AppContext);

  return (
    <>
      {filteredTests
        .filter((item: ITest) => item.id === parsedTestId)
        .map((item: ITest) => {
          return <div>{item.name}</div>;
        })}
    </>
  );
}

export default FinalizePage;
