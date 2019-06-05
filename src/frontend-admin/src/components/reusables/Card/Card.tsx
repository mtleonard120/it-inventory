import React from 'react'
import styles from './Card.module.css'
import {Title} from '../Title/Title' 

interface ICardProps {
    title: any
    children: any //any so that dropdown can be used
}

export const Card: React.FC<ICardProps> = (props) => {
    const { title, children } = props

    return (
        <div className={styles.cardMain}>
            <Title title={title}/>            
            <div className={styles.cardChildren}>{children}</div>
        </div>
    )
}