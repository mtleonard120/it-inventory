import React from 'react';

// Styles
import styles from './App.module.css';

import {DashboardTable} from '../reusables/DashboardTable/DashboardTable';

// Primary Component
export const App: React.FC = () => {
  return (
    <div className={styles.app}>
      
      <DashboardTable data={[
                    { name: 'Developers', numberOf: 20, cost:20, yearOrMonth:'year', url:'0'},
                    { name: 'Designers', numberOf: 40, cost:20, yearOrMonth:'year', url:'1'},
                    { name: 'PM\'s', numberOf: 40, cost:20, yearOrMonth:'month', url:'2'},
                    { name: 'Sales Reps', numberOf: 5, cost:20, yearOrMonth:'month', url:'3' },
                    { name: 'Other', numberOf: 25, cost:20, yearOrMonth:'year', url:'4' },
                    { name: 'Sales Reps', numberOf: 5, cost:20, yearOrMonth:'month', url:'5' },
                    { name: 'Other', numberOf: 25, cost:20, yearOrMonth:'year', url:'6' }
                    ]} />
    </div>
  );
}
