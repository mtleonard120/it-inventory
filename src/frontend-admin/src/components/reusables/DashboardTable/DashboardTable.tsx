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
                            ${Math.round(datum.costPerMonth * 100) / 100}/month | $
                            {Math.round(datum.costPerMonth * 12 * 100) / 100}/year
                            {datum.projected}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
