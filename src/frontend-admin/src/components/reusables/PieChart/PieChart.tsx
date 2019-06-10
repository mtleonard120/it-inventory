import React, {useState} from 'react';
import {PieChart, Pie, Legend, Cell} from 'recharts';
import { CustomLabel } from './CustomLabel/CustomLabel';
import styles from './PieChart.module.css';


// Types
export interface IRechartPieDatum {
    name: string
    value: number
    id:string //the id is to rout to the dept detail page
}

export interface IDataProps{
    headingName: string
    data: IRechartPieDatum[]
}

interface IRechartPieProps {
    pieChartsData: IDataProps[]
    initialColors: string[]
}

export const RechartPieChart: React.FunctionComponent<IRechartPieProps> = (props) => {   
    const {pieChartsData, initialColors} = props;

    const [colors, setColors] = useState(initialColors);
    //colors off of invision: ['#009EFF', '#FF9340', '#3D4599', '#1425CC', '#CC4A14']

    const onMouseOver = (data:IRechartPieDatum[], index:number) => {
        const updatedColors = [...initialColors]; // Create clone of initial colors array
        updatedColors[index] = '#555555'; // Change particular index in our cloned array
        setColors(updatedColors); // Set new color array
    }

    const onMouseOut =(data:IRechartPieDatum[], index:number) => {
        setColors(initialColors);
    }

    //map the links in the data that is passed through as a prop in the component
    const onClick = (data:IRechartPieDatum[],index:number) => {
        //will go to the links to other pages
    };

    return(
        <div>
            {/* Headers */}
            <div className={styles.inline} style={{}}>
                {pieChartsData.map((datum) => (
                    <h3 className={styles.header}>{datum.headingName}</h3>    
                ))}
            </div>
            
            {/* Pie Charts */}
            <div  className={styles.inline}>
            <PieChart width={400*pieChartsData.length} height={300}>
                {pieChartsData.map((datum, i) => (
                        <Pie
                            data = {pieChartsData[0].data}
                            cx={200+400*i}
                            cy={150}
                            dataKey = "value"
                            fill="#8884d8"
                            labelLine={false}
                            label={<CustomLabel data={datum.data}/>}
                            isAnimationActive={false}
                            onMouseOver={onMouseOver}
                            onMouseOut={onMouseOut}
                            onClick={onClick}
                        >
                            {
                                datum.data.map((entry, index) => <Cell key={`cell-${index}`} fill={colors[index]} />)
                            } 
                        </Pie> 
                ))}
            </PieChart>
            </div>

            {/* Legend */}
            <div className={styles.inline}>
                {pieChartsData[0].data.map((datum, index) =>(
                    <div className={styles.legendList}>
                        <div className={styles.circle} style={{backgroundColor:colors[index]}}> </div>
                        {datum.name}
                    </div>
                ))}
            </div>
        </div>
    );
};