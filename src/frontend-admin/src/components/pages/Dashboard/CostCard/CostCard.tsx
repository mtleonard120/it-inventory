import React from 'react';
import './CostCard.css';
import Card from '../../Card';
// will need to install react-icons and import
// IoIosArrowRoundUp, IoIosArrowRoundDown, IoIosStats

interface ICostCardProps{
    icon:any
    cost:number
}

export const CostCard = (props:ICostCardProps) => {
    const{icon, cost,}=props;
    return(
        <Card>
            {icon}
            <h1 className='title' >${cost}</h1>
        </Card>
    );
};