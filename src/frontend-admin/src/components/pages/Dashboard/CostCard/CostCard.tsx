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
                <div className={styles.title}>${programsCost + pluginsCost}</div>
                <div className={styles.subtitle}>Programs: ${programsCost}</div>
                <div className={styles.subtitle}>Plugins: ${pluginsCost}</div>
            </div>
        </Card>
    )
}
