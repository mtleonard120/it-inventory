import React, { useState, useEffect } from "react";

// Components
import { Card } from "../reusables/Card/Card";
import {
  DashboardTable,
  IDashboardTableDatum
} from "../reusables/DashboardTable/DashboardTable";
import { AxiosService } from "../../services/AxiosService/AxiosService";

// Styles
import styles from "./SoftwareCard.module.css";

// Primary Component
export const SoftwareCard: React.SFC<{ className?: string }> = props => {
  const { className } = props;
  let initData: IDashboardTableDatum[] = [];
  const [tableData, setTableData] = useState(initData);

  const axios = new AxiosService("accessToken", "refreshToken");
  useEffect(() => {
    //TODO: find out endpoint name
    axios.get("/Software", setTableData);
  }, [setTableData]);

  const onRowClick = (datum: IDashboardTableDatum) => {
    //TODO: route to `/programs/${datum.name}`
  };

  return (
    <div className={className}>
      <Card title={"software"} titleClassName={styles.clickableTitle}>
        <DashboardTable data={tableData} onRowClick={onRowClick} />
      </Card>
    </div>
  );
};
