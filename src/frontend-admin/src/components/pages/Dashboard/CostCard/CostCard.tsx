import React from 'react';
import styles from'./CostCard.module.css';
import Card from '../../Card';

// will need to install react-icons and import
// IoIosArrowRoundUp, IoIosArrowRoundDown, IoIosStats


interface ICostCardProps{
    icon:any
    data:number[]
}

export const CostCard = (props:ICostCardProps) => {
    const{icon,  data}=props;
    const totalCost = data[0] + data[1];

    return(
        <Card>
            {icon}
            <h1 className={styles.title} >Total: ${totalCost}</h1>
            <h1 className={styles.title} >Programs: ${data[0]}</h1>
            <h1 className={styles.title} >Plugins: ${data[1]}</h1>
        </Card>
    );
};