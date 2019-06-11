import React from 'react';

// Styles
import styles from './App.module.css';

//Components
import { CostCard } from '../pages/Dashboard/CostCard/CostCard';

// Primary Component
export const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <CostCard data={{programsCost:200, pluginsCost:100}} />
    </div>
  );
}
