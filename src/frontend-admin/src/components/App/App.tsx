import React from 'react';

// Styles
import styles from './App.module.css';

import {DashboardTable} from '../reusables/DashboardTable/DashboardTable';

// Primary Component
export const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className={styles.appLink}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <DashboardTable data={[]}/>
    </div>
  );
}
