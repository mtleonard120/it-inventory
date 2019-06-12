import React, {ReactNode} from 'react'

// Styles
import styles from './ExampleReusable.module.css'

// Types
interface IExampleReusableProps {
    children: ReactNode
}

// Primary Component
export const ExampleReusable: React.SFC<IExampleReusableProps> = props => {
    const {children} = props

    return <div className={styles.imAContainer}>{children}</div>
}
