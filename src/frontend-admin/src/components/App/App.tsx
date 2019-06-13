import React from 'react';

// Styles
import { RechartPieChart } from '../reusables/PieChart/PieChart';

// Primary Component
export const App: React.FC = () => {
  return (
    <div>
        <RechartPieChart 
          pieChartData={[
            {
              headingName:"Software",
              data:[
                {name:'Developers', value:100, id:''},
                {name:'Designers', value:250, id:''},
                {name:'PMs', value:300, id:''},
                {name:'Sales Reps', value:160, id:''}
              ]
            },
            {
              headingName:"Hardware",
              data:[
                {name:'Developers', value:1500, id:''},
                {name:'Designers', value:2600, id:''},
                {name:'PMs', value:1800, id:''},
                {name:'Sales Reps', value:5000, id:''}
              ]
            }
          ]}
          initialColors={['#009EFF', '#FF9340', '#3D4599', '#1425CC', '#CC4A14']}
        />
    </div>
  );
}
