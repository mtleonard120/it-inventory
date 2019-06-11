import React from 'react';

// Styles
import styles from './App.module.css';

import {DashboardTable} from '../reusables/DashboardTable/DashboardTable';

// Primary Component
export const App: React.FC = () => {
  return (
    <div>
      
      <DashboardTable data={[
                    { name: 'Developers', numberOf: 20, costPerMonth:20, projected:'*'},
                    { name: 'Designers', numberOf: 40, costPerMonth:20, projected:'*'},
                    { name: 'PM\'s', numberOf: 40, costPerMonth:20,projected:''},
                    { name: 'Sales Reps', numberOf: 5, costPerMonth:20, projected:''},
                    { name: 'Other', numberOf: 25, costPerMonth:20,projected:'*'},
                    { name: 'Sales Reps', numberOf: 5, costPerMonth:20, projected:'*'},
                    { name: 'Other', numberOf: 25, costPerMonth:20, projected:''}
                    ]} />
    </div>
  );
}
