import React, { useState, useEffect } from "react";

// Styles
import styles from "./DashboardPage.module.css";

// Types
interface IDashboardPageProps {}

// Primary Component
export const DashboardPage: React.FC<IDashboardPageProps> = props => {
  // State

  useEffect(() => {
    // Data Fetching
  }, []);

  return (
    <div className={styles.dashMain}>
      <div className={styles.dashColumn}>
        <div>Replace with Horzinatal progress bars</div>
        <div className={styles.dashRow}>
          <div>Replace with Yearly Cost</div>
          <div>Replace with Monthly Cost</div>
        </div>
        <div>Replace with Department Tables</div>
      </div>

      <div className={styles.dashColumn}>
        <div>Replace with Dashboard Pies</div>
        <div>Replace with Software table</div>
      </div>
    </div>
  );
};
