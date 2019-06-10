import React from 'react';

// Styles
import styles from './App.module.css';

//Components
import { CostCard } from '../pages/Dashboard/CostCard/CostCard';

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
      <CostCard data={[100, 200]} />
    </div>
  );
}
