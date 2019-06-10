import React from 'react';

// Styles
import styles from './App.module.css';
import { RechartPieChart } from '../reusables/PieChart/PieChart';

// Primary Component
export const App: React.FC = () => {
  return (
    <div>
        <RechartPieChart 
          pieChartsData={[
            {
              headingName:"Software",
              data:[
                {name:'one', value:20, id:''},
                {name:'two', value:50, id:''},
                {name:'three', value:35, id:''},
                {name:'four', value:4, id:''}
              ]
            },
            {
              headingName:"Hardware",
              data:[
                {name:'one', value:20, id:''},
                {name:'two', value:50, id:''},
                {name:'three', value:35, id:''},
                {name:'four', value:4, id:''}
              ]
            }
          ]}
          initialColors={['#009EFF', '#FF9340', '#3D4599', '#1425CC', '#CC4A14']}
        />
    </div>
  );
}
