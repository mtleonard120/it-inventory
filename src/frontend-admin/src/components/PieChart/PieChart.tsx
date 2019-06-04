import React, {useState} from 'react';
import {PieChart, Pie, Legend, Cell} from 'recharts';

// Types
interface IRechartPieProps {
    data: Array<{name: string, value: number, link:string}>
}

const RechartPieChart: React.FunctionComponent<IRechartPieProps> = (props) => {   

    const [colors, setColors] = useState(
        ['#009EFF', '#FF9340', '#3D4599', '#1425CC', '#CC4A14']);

    //an array of the initial colors, mapped to the indeces of each
    //department in the deptPieData above
    const initialColors =  ['#009EFF', '#FF9340', '#3D4599', '#1425CC', '#CC4A14']

    const onMouseOver = (data:any, index:number) => {
        const updatedColors = initialColors; // Create clone of initial colors array
        updatedColors[index] = '#555555'; // Change particular index in our cloned array
        setColors(updatedColors); // Set new color array
    }

    const onMouseOut =(d:any, index:number) => {
        setColors(initialColors);
    }

    //map the links in the data that is passed through as a prop 
    //in the component
    const onClick = (data:[],index:number) => {
        //will go to the links to other pages
        console.log(props.data[index].link)
    };

    // interface ICustomLabelProps {
    //     cx:number;
    //     cy:number;
    //     midAngle:number;
    //     innerRadius:number;
    //     outerRadius:number;
    //     percent:number;
    //     index:number;
    // }
    const customLabel = ({cx,  cy, midAngle, innerRadius, outerRadius, percent, index }:any) => {
        const radian = Math.PI / 180;
        var fontSize=0;
        //calculate % size of slice
        var totalValue = 0;
        for (let i in props.data){ //get the total value
            totalValue = totalValue + props.data[i].value;
        }
        const sizeOfSlice = props.data[index].value / totalValue;
        
         //compares to the percent of the pie and pops the text
         //out of the pie if it too small
        if(sizeOfSlice < .15){
            var radius = innerRadius + (outerRadius - innerRadius)*1.15;
            var textColor = '#333333'
        }else{
            var radius = innerRadius + (outerRadius - innerRadius) * 0.5;
            var textColor = 'white'
        }

        const x  = cx + radius * Math.cos(-midAngle * radian);
        const y = cy  + radius * Math.sin(-midAngle * radian);

        return (
        <text x={x} y={y} fontSize='18' fill={textColor} font-weight='bold' textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
            $5000
        </text>
        );
    };

    return(
        <PieChart width={700} height={400}>
            <Pie
                data = {props.data}
                cx={350}
                cy={150}
                dataKey = "value"
                fill="#8884d8"
                labelLine={false}
                label={customLabel}
                isAnimationActive={false}
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
                onClick={onClick}
            >
                {
                    props.data.map((entry:any, index:number) => <Cell key={`cell-${index}`} fill={colors[index]} />)
                } 
            </Pie>

            <Legend iconType='circle' iconSize={18} />
            
        </PieChart>
    );
};
export default RechartPieChart;