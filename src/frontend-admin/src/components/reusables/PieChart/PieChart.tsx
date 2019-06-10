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
  

    //##########################################
    //TODO:
    //  add the little cirlces that correlate to 
    //  each slice
    //#######################################
    const legendContent =() => {
        return(
            <div  className={styles.legendList}>
                {softwareData.map((datum) =>(
                    <div>
                        {/* <div className={styles.legendList} /> */}
                        <li className={styles.legendList}>{datum.name}</li>
                    </div>
                ))}
            </div>
        )
    }
 

    return(
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
    );
};