import React, { useState, useEffect } from "react";

// Components
import { Card } from "../reusables/Card/Card";
import { Group } from "../reusables/Group/Group";
import { HorizontalBarChart } from "../reusables/HorizontalBarChart/HorizontalBarChart";
import { AxiosService } from "../../services/AxiosService/AxiosService";

// Styles
import styles from "./LicensesCard.module.css";

// Primary Component
export const LicensesCard: React.SFC<{ className?: string }> = props => {
  const { className } = props;

  const axios = new AxiosService("accessToken", "refreshToken");
  const list: {
    programName: string;
    CountProgInUse: number;
    CountProgOverall: number;
  }[] = [];
  const [licenses, setLicenses] = useState(list);

  useEffect(() => {
    //TODO: find out endpoint name
    axios.get("/Licenses", setLicenses);
  }, [setLicenses]);

  return (
    <div className={className}>
      <Card title={"licenses"} titleClassName={styles.clickableTitle}>
        <Group>
          {licenses.map(i => (
            <HorizontalBarChart
              title={i.programName}
              amount={i.CountProgInUse}
              outOf={i.CountProgOverall}
              onClick={() => {}}
            />
          ))}
        </Group>
      </Card>
    </div>
  );
};
