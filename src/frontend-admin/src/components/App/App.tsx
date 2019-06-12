import React from 'react';
import { Route, NavLink, BrowserRouter as Router, Switch} from 'react-router-dom'; 
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
