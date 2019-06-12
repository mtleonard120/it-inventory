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
            <h1 className={styles.title}>Total: ${programsCost + pluginsCost}</h1>
            <h1 className={styles.title}>Programs: ${programsCost}</h1>
            <h1 className={styles.title}>Plugins: ${pluginsCost}</h1>
        </Card>
    )
}
