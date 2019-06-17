import React from 'react'

// Components
import {Card} from '../../../reusables'

// Styles
import styles from './CostCard.module.css'

// Primary Component
interface ICostCardProps {
    cardTitle: string
    data: {
        programsCost: number
        pluginsCost: number
    }
    icon: any
}

export const CostCard = (props: ICostCardProps) => {
    const {
        cardTitle,
        icon,
        data: {programsCost, pluginsCost},
    } = props

    return (
        <Card title={cardTitle}>
            <div>{icon}</div>
            <div className={styles.titleContainer}>
                <div className={styles.title}>${Math.round((programsCost + pluginsCost) * 100) / 100}</div>
                <div className={styles.subtitle}>Programs: ${Math.round(programsCost * 100) / 100}</div>
                <div className={styles.subtitle}>Plugins: ${Math.round(pluginsCost * 100) / 100}</div>
            </div>
        </Card>
    )
}
