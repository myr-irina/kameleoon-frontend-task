import React from 'react';
import DashboardPage from '../../pages/dashboard/dashboard-page';
import styles from './app.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <DashboardPage />
    </div>
  );
}

export default App;
