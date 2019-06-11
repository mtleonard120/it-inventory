import React from 'react'

// Components
import {Card} from '../../../reusables'

// Styles
import styles from './CostCard.module.css'

// will need to install react-icons and import
// IoIosArrowRoundUp, IoIosArrowRoundDown, IoIosStats

// Primary Component
interface ICostCardProps {
    cardTitle: string
    data: {
        programsCost: number
        pluginsCost: number
    }
    icon?: any
}

export const CostCard = (props: ICostCardProps) => {
    const {
        cardTitle,
        icon,
        data: {programsCost, pluginsCost},
    } = props
    const totalCost = programsCost + pluginsCost

    return (
        <Card title={cardTitle}>
            {icon}
            <h1 className={styles.title}>Total: ${totalCost}</h1>
            <h1 className={styles.title}>Programs: ${programsCost}</h1>
            <h1 className={styles.title}>Plugins: ${pluginsCost}</h1>
        </Card>
    )
}
