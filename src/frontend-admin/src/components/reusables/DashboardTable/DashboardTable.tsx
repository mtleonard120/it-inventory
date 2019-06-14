import React from 'react'

import s from 'classnames'

import styles from './DashboardTable.module.css'

//types
export interface IDashboardTableDatum {
    name: string
    numberOf: number
    costPerMonth: number
    projected: string //might be a bool, and if true throw in the *
    //otherwise the string is either '' or '*'
    //'*' means that it is projected
}

interface IDashboardTableProps {
    data: IDashboardTableDatum[]
    onRowClick?: (datum: IDashboardTableDatum) => void
}

export const DashboardTable = (props: IDashboardTableProps) => {
    const {data, onRowClick} = props
    const isClickable = Boolean(onRowClick)

    return (
        <table className={s(styles.table, {[styles.clickable]: isClickable})}>
            {/* leaving this commented out in case we actually do want headings
            <tr> 
                <th className={styles.nameHeading}>License</th>
                <th className={styles.numberOfHeading}># in use</th>
                <th className={styles.costHeading}>Cost</th>
            </tr> */}
            <tbody>
                {data.map(datum => (
                    <tr
                        key={datum.name}
                        className={s(styles.tr, {[styles.row]: isClickable})}
                        onClick={
                            onRowClick
                                ? e => {
                                      onRowClick(datum)
                                  }
                                : undefined
                        }
                    >
                        <td className={styles.name}>{datum.name}</td>
                        <td className={styles.numberOf}>{datum.numberOf} users</td>
                        <td className={styles.cost}>
                            ${Number(datum.costPerMonth.toFixed(2))}/month | $
                            {Number((datum.costPerMonth * 12).toFixed(2))}/year
                            {datum.projected}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
