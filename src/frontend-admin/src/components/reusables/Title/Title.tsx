import React from 'react'
import styles from './Title.module.css'
import {concatStyles} from '../../../utilities/mikesConcat'

interface ITitleProps {
    title: any //any so that dropdown can be used
    className?: string
    onClick?: any
}

export const Title: React.FC<ITitleProps> = props => {
    const {title, className, onClick = () => {}} = props

    return (
        <div className={styles.titleContainer}>
            <div className={styles.bottomCorner} />
            <div className={concatStyles(styles.title, className)} onClick={onClick}>
                {title}
            </div>
            <div className={styles.topCorner} />
        </div>
    )
}
