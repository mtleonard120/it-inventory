import React, { useState, useEffect } from "react";

import s from "classnames";

import styles from "./DashboardTable.module.css";

import { AxiosService } from "../../../services/AxiosService/AxiosService";

//types
export interface IDashboardTableDatum {
  name: string;
  numberOf: number;
  costPerMonth: number;
  projected: string; //might be a bool, and if true throw in the *
  //otherwise the string is either '' or '*'
  //'*' means that it is projected
}

interface IDashboardTableProps {
  data: IDashboardTableDatum[];
  onRowClick?: (datum: IDashboardTableDatum) => void;
}

export const DashboardTable = (props: IDashboardTableProps) => {
  const { data, onRowClick } = props;
  const isClickable = Boolean(onRowClick);

  return (
    <table className={s(styles.table, { [styles.clickable]: isClickable })}>
      {/* leaving this commented out in case we actually do want headings
            <tr> 
                <th className={styles.nameHeading}>License</th>
                <th className={styles.numberOfHeading}># in use</th>
                <th className={styles.costHeading}>Cost</th>
            </tr> */}
      {data.map(datum => (
        <tr
          className={s(styles.tr, { [styles.row]: isClickable })}
          onClick={
            onRowClick
              ? e => {
                  onRowClick(datum);
                }
              : undefined
          }
        >
          <td className={styles.name}>{datum.name}</td>
          <td className={styles.numberOf}>{datum.numberOf} users</td>
          <td className={styles.cost}>
            ${datum.costPerMonth}/month | ${datum.costPerMonth * 12}/year
            {datum.projected}
          </td>
        </tr>
      ))}
    </table>
  );
};
