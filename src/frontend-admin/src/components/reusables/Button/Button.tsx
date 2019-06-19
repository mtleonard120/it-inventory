import React from 'react'

// icons
import {FaArchive, FaEdit} from 'react-icons/fa'

// Utils
import {concatStyles as s} from '../../../utilities/mikesConcat'

// Styles
import styles from './Button.module.css'

// Types
type ButtonIcon = 'add' | 'archive' | 'edit'
interface IButtonProps {
    onClick?: any
    className?: string
    text?: string
    textClassName?: string
    icon?: ButtonIcon
    children?: any
}

// Helpers

// Primary Component
export const Button: React.SFC<IButtonProps> = props => {
    const {onClick = () => {}, className = '', text = '', textClassName = '', children, icon} = props

    return (
        <div onClick={onClick} className={s(styles.buttonMain, className)}>
            <div className={s(styles.buttonText, textClassName)}>{text}</div>
            {icon === 'add' && <div className={styles.addIcon} />}
            {icon === 'archive' && <FaArchive className={styles.icon} size={20} />}
            {icon === 'edit' && <FaEdit className={styles.icon} size={20} />}

            {children}
        </div>
    )
}
