import React from 'react'
import styles from './Title.module.css'
import {concatStyles} from '../../../utilities/mikesConcat'

interface ITitleProps {
    title: any //any so that dropdown can be used
    className?: string
}

export const Title: React.FC<ITitleProps> = props => {
    const {title, className} = props

    return (
        <div className={concatStyles(styles.titleContainer, className)}>
            <div className={styles.bottomCorner} />
            <div className={styles.title}>{title}</div>
            <div className={styles.topCorner} />
        </div>
    )
}
