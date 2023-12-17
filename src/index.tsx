import * as React from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from 'react-router-dom';
import './scss/styles.css';
import App from './components/app/App';

createRoot(document.getElementById('root') as HTMLElement).render(<App />);
