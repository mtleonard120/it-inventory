import React from 'react'
import { string } from 'prop-types';
import styles from './Group.module.css'

//Types
type JustifyType = 'start' | 'end' | 'between' | 'around' | 'even'
type DirectionType = 'row' | 'column'

interface IProps {
    children: JSX.Element[],
    direction?: DirectionType,
    justify?: JustifyType,
    className?: string,
}

//Component for arranging groups of similar items with flexbox
const Group: React.FC<IProps> = (props) => {
    const { children, direction, justify, className } = props
    //need to fix so that div can have multiple classnames
    return <div className={className}>{children}</div>
}