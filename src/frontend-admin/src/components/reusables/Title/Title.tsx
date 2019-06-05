import React from 'react'
import styles from './Title.module.css'

interface ITitleProps {
    title: any //any so that dropdown can be used
}

export const Title: React.FC<ITitleProps> = (props) => {
    const { title } = props

    return (
        <div className={styles.titleContainer}>
            <div className={styles.bottomCorner}/>
                <div className={styles.title}>{title}</div>
            <div className={styles.topCorner}/>
        </div>            
    )
}