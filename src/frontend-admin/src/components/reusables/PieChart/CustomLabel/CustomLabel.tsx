import React from 'react';
import { IRechartPieDatum } from "../PieChart";


interface ICustomLabelProps {
    cx?:number;
    cy?:number;
    midAngle?:number;
    innerRadius?:number;
    outerRadius?:number;
    percent?:number;
    index?:number;
    data:IRechartPieDatum[];
    }
    export const CustomLabel: React.FunctionComponent<ICustomLabelProps> = props => {
        const {cx, cy, midAngle, innerRadius, outerRadius, percent, index, data} = props
        const radian = Math.PI / 180;
        var fontSize=0;
        //calculate % size of slice
        var totalValue = 0;
        for (let i in data){ //get the total value
            totalValue = totalValue + data[i].value;
        }
        const sizeOfSlice = data[index].value / totalValue;
        
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