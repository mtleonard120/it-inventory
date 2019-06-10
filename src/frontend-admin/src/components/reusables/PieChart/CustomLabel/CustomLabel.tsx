import React from 'react';
import { IRechartPieDatum } from "../PieChart";


interface ICustomLabelProps {
    cx?:number;
    cy?:number;
    midAngle?:number;
    innerRadius?:number;
    outerRadius?:number;
    index?:number;
    data:IRechartPieDatum[];
    }
    export const CustomLabel: React.FunctionComponent<ICustomLabelProps> = props => {
        const {cx=300, cy=300, midAngle=5, innerRadius=5, outerRadius=5, index=5, data} = props
        const radian = Math.PI / 180;
        var fontSize=0;
        
        var totalValue = 0;
        // var sizeOfSlice = 0;
        // //calculate % size of slice
        // //if isSoftware is true, that means we are making the customLabel for the software breakdown pie chart
        // //if isSoftware is false, we are making customLabel for hardware breakdown pie chart
        // //after the loop, calculate the size of the slice of the pie
        // if (isSoftware){
        //     for (let i in data){
        //         totalValue = totalValue + data[i].softwareCost
        //     }
        //     sizeOfSlice = data[index].softwareCost / totalValue;
        // }else{
        //     for (let i in data){
        //         totalValue = totalValue + data[i].hardwareCost
        //     }
        //     sizeOfSlice = data[index].hardwareCost / totalValue;
        //}
                                                        
         //compares to the percent of the pie and pops the text
         //out of the pie if it too small

         for (let i in data){ //get the total value
            totalValue = totalValue + data[i].value;
        }
        const sizeOfSlice = data[index].value / totalValue;

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