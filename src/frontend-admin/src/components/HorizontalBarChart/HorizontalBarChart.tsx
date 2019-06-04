import React from 'react'

import styles from './HorizontalBarChart.module.css'

//Prop Type
interface IProps {
    title: string,
    amount: number,
    outOf: number,
}

export const HorizontalBarChart: React.FC<IProps> = (props) => {
    const {title, amount, outOf} = props
    return (
        amount > outOf ? null : (
            <div className={styles.barContainer}>
                <div className={styles.barMain}>
                    <div className={styles.barFiller} style={{width: `${amount / outOf * 100}%`}}>
                        <div className={styles.barTitle}>{title}</div>
                    </div>
                </div>
                <div className={styles.fraction}>{amount + "/" + outOf}</div>
            </div>
        )
    )
}

