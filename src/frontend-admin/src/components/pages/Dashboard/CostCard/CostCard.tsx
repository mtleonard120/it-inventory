import React from 'react';
import styles from'./CostCard.module.css';
import Card from '../../Card';

// will need to install react-icons and import
// IoIosArrowRoundUp, IoIosArrowRoundDown, IoIosStats


interface ICostCardProps{
    icon:any
    data:{programsCost:number, pluginsCost:number}
}

export const CostCard = (props:ICostCardProps) => {
    const{icon,  data:{programsCost, pluginsCost}}=props;
    const totalCost = programsCost + pluginsCost;

    return(
        <Card>
            {icon}
            <h1 className={styles.title} >Total: ${totalCost}</h1>
            <h1 className={styles.title} >Programs: ${programsCost}</h1>
            <h1 className={styles.title} >Plugins: ${pluginsCost}</h1>
        </Card>
    );
};