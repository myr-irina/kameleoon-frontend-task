import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../../context/app-context';
import { ITest } from '../../types/types';
import GoBack from '../../assets/icons/arrow-left.svg';
import styles from './detail-page.module.scss';

interface IDetailPage {
  heading: string;
}

function DetailPage({ heading }: IDetailPage) {
  const { testId } = useParams();
  const parsedTestId = testId ? parseInt(testId, 10) : undefined;

  const { filteredTests } = useContext(AppContext);

  let navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h1>{heading}</h1>
        {filteredTests
          .filter((item: ITest) => item.id === parsedTestId)
          .map((item: ITest) => {
            return (
              <div className={styles.text} key={item.id}>
                {item.name}
              </div>
            );
          })}
      </div>

      <button onClick={() => navigate(-1)}>
        <img src={GoBack} alt="arrow back" />
        <span>Back</span>
      </button>
    </div>
  );
}

export default DetailPage;
