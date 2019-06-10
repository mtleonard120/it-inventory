import React from 'react';

import s from 'classnames'

import styles from './DashboardTable.module.css';

//types
export interface IDashboardTableDatum{
    name:string
    numberOf:number
    cost:number
    yearOrMonth:string //a string that is either year or month -> the breakdown is either per month or per year
    url: string
}

interface IDashboardTableProps{
    data:IDashboardTableDatum[]
    onRowClick?: (datum:IDashboardTableDatum) => void
}

export const DashboardTable = (props: IDashboardTableProps) => {
    const {data, onRowClick} = props;
    const isClickable = Boolean(onRowClick);

    return(
        <table className={s(styles.table,{[styles.clickable]: isClickable})}>
            <tr>
                <th className={styles.nameHeading}>License</th>
                <th className={styles.numberOfHeading}># in use</th>
                <th className={styles.costHeading}>Cost</th>
            </tr>
            {data.map((datum) => (
                <tr className={s(styles.tr, {[styles.row]: isClickable})} onClick={onRowClick ? (e) => {onRowClick(datum)} : undefined}>
                    <td className={styles.name}>{datum.name}</td>
                    <td>{datum.numberOf}</td>
                    <td className={styles.cost}>${datum.cost}</td>
                    <td className={styles.yearOrMonth}>/{datum.yearOrMonth}</td>
                </tr>
            ))}
        </table>
    );
};
