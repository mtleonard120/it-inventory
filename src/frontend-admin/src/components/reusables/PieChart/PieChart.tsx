import React, {useState} from 'react';
import {PieChart, Pie, Legend, Cell} from 'recharts';
import { CustomLabel } from './CustomLabel/CustomLabel';
import styles from './PieChart.module.css';


// Types
export interface IRechartPieDatum {
    name: string, value: number, id:string //the id is to rout to the dept detail page
}

interface IRechartPieProps {
    softwareData: IRechartPieDatum[]
    hardwareData: IRechartPieDatum[]
    initialColors: string[]
}

export const RechartPieChart: React.FunctionComponent<IRechartPieProps> = (props) => {   
    const {softwareData, hardwareData, initialColors} = props;

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
        console.log(softwareData[index].id)
    };
  
    const legendContent =() => {
        return(
            <div>
                {softwareData.map((datum, index) =>(
                    <li className={styles.legendList}>
                        <div className={styles.circle} style={{backgroundColor:colors[index]}}> </div>
                        {datum.name}
                    </li>
                ))}

            </div>
        )
    }
 

    return(
        <div>
            <h3 className={styles.header}>Hardware Breakdown</h3>
            <h3 className={styles.header}>Software Breakdown</h3>
            <PieChart width={750} height={300}>
                <Pie
                    data = {softwareData}
                    cx={200}
                    cy={150}
                    dataKey = "value"
                    fill="#8884d8"
                    labelLine={false}
                    label={<CustomLabel data={softwareData}/>}
                    isAnimationActive={false}
                    onMouseOver={onMouseOver}
                    onMouseOut={onMouseOut}
                    onClick={onClick}
                >
                    {
                        softwareData.map((entry, index) => <Cell key={`cell-${index}`} fill={colors[index]} />)
                    } 
                </Pie>

                <Pie
                    data = {hardwareData}
                    cx={550}
                    cy={150}
                    dataKey = "value"
                    fill="#8884d8"
                    labelLine={false}
                    label={<CustomLabel data={hardwareData}/>}
                    isAnimationActive={false}
                    onMouseOver={onMouseOver}
                    onMouseOut={onMouseOut}
                    onClick={onClick}
                >
                    {
                        hardwareData.map((entry, index) => <Cell key={`cell-${index}`} fill={colors[index]} />)
                    } 
                </Pie>

                <Legend 
                    iconType='circle' 
                    iconSize={18} 
                    content={legendContent}
                />
                
            </PieChart>
        </div>
    );
};