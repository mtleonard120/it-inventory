import React, {useState} from 'react';
import {PieChart, Pie, Legend, Cell} from 'recharts';
import { CustomLabel } from './CustomLabel/CustomLabel';


// Types
export interface IRechartPieDatum {
    name: string, value: number, link:string
}
interface IRechartPieProps {
    data: IRechartPieDatum[]
    initialColors: string[]
}

export const RechartPieChart: React.FunctionComponent<IRechartPieProps> = (props) => {   

    const [colors, setColors] = useState(props.initialColors);
    //colors off of invision: ['#009EFF', '#FF9340', '#3D4599', '#1425CC', '#CC4A14']

    const onMouseOver = (data:IRechartPieDatum[], index:number) => {
        const updatedColors = [...props.initialColors]; // Create clone of initial colors array
        updatedColors[index] = '#555555'; // Change particular index in our cloned array
        setColors(updatedColors); // Set new color array
    }

    const onMouseOut =(data:IRechartPieDatum[], index:number) => {
        setColors(props.initialColors);
    }

    //map the links in the data that is passed through as a prop 
    //in the component
    const onClick = (data:IRechartPieDatum[],index:number) => {
        //will go to the links to other pages
        console.log(props.data[index].link)
    };

 

    return(
        <PieChart width={700} height={400}>
            <Pie
                data = {props.data}
                cx={350}
                cy={150}
                dataKey = "value"
                fill="#8884d8"
                label={<CustomLabel data={props.data} />}
                isAnimationActive={false}
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
                onClick={onClick}
            >
                {
                    props.data.map((entry, index) => <Cell key={`cell-${index}`} fill={colors[index]} />)
                } 
            </Pie>

            <Legend iconType='circle' iconSize={18} />
            
        </PieChart>
    );
};