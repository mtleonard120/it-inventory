import React from 'react';

import s from 'classnames'

import styles from './DashboardTable.module.css';

//types
export interface IDashboardTableDatum{
    name:string
    numberOf:number
    cost:number
    url: string
}

interface IDashboardTableProps{
    data:IDashboardTableDatum[];
    onRowClick?: (datum:IDashboardTableDatum) => void
}

export const DashboardTable = (props: IDashboardTableProps) => {
    const {data, onRowClick} = props;
    const isClickable = Boolean(onRowClick);

    return(
        <table className={s(styles.table,{[styles.clickable]: isClickable})}>

            {data.map((datum) => (
                <tr className={s(styles.tr, {[styles.row]: isClickable})} onClick={onRowClick ? (e) => {onRowClick(datum)} : undefined}>
                    <td className={styles.td}>{datum.name}</td>
                    <td className={styles.td}>{datum.numberOf}</td>
                    <td className={styles.td}>${datum.cost}</td>
                </tr>
            ))}
        </table>
    );
};
