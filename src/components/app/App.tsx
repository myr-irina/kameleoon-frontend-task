import React from 'react';
import DashboardPage from '../../pages/dashboard/dashboard-page';
import styles from './app.module.scss';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ResultsPage from '../../pages/results/results-page';
import FinalizePage from '../../pages/finalize/finalize-page';
import AppProvider from '../../context/app-context';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <DashboardPage />,
    },
    {
      path: '/results/:testId',
      element: <ResultsPage />,
    },
    {
      path: '/finalize/:testId',
      element: <FinalizePage />,
    },
  ]);

  return (
    <div className={styles.app}>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </div>
  );
}

export default App;
