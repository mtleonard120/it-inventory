import React from 'react';
import {Login} from '../reusables/Login/Login';

// Styles
import styles from './App.module.css';

// Primary Component
export const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <Login />
  </div>
  );
}
