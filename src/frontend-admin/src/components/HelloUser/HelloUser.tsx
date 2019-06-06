import React from 'react'
import styles from './HelloUser.module.css'

interface IHelloUserProps {
    name: string
}

export const HelloUser: React.FC<IHelloUserProps> = props => {
    const { name } = props

    return (
        <div className={styles.helloMain}>
            <div className={styles.helloMessage}>Hello, {name}</div>

            {/*This will become an actual dropdown instead of an arrow when the dropdown is done*/}
            <div className={styles.dropdownArrow}/>
        </div>
    )
}
