import React from 'react'
import styles from './Group.module.css'
import cx from 'classnames' //allows use of more than 1 classname

//Types
type JustifyType = 'start' | 'end' | 'between' | 'around' | 'even'
type DirectionType = 'row' | 'column'

interface IProps {
    children: JSX.Element[], 
    direction?: DirectionType,
    justify?: JustifyType,
    className?: string,
}

// Component for arranging groups of similar items with flexbox
// have to pass at least 2 children to use
export const Group: React.FC<IProps> = (props) => {
    const { children, direction = 'row', justify = 'start', className } = props
    return (
        <div className={cx(styles[justify], styles[direction], styles.group, className)} >
            {children}
        </div>
    )
}