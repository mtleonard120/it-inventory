import React from 'react'

import styles from './HorizontalBarChart.module.css'

//Prop Type
export interface IHorizontalBarChartProps {
    title: string
    amount: number
    outOf: number
    onClick: any
}

export const HorizontalBarChart: React.FC<IHorizontalBarChartProps> = props => {
    const {title, amount, outOf, onClick} = props
    return amount > outOf ? null : (
        <div className={styles.barContainer}>
            <div className={styles.barMain} onClick={onClick}>
                {amount <= 0 ? (
                    <div className={styles.barTitle}>{title}</div>
                ) : (
                    <div className={styles.barFiller} style={{width: `${(amount / outOf) * 100}%`}}>
                        <div className={styles.barTitle}>{title}</div>
                    </div>
                )}
            </div>
            <div className={styles.fraction}>{amount + '/' + outOf}</div>
        </div>
    )
}
