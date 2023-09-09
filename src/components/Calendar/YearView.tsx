import React, { FC } from "react";
import styles from '../../styles/components/Calendar/calendar.module.css';

const YearView:FC = (): JSX.Element => {
  return (
    <section className={styles.yearViewContainer}>
      <h2 className={styles.yearViewHeaderText}>
        Year View
      </h2>
      <h2 className={styles.currentYearText}>
        2023
      </h2>
      <div className={styles.yearItemsContainer}>
        <p>Year View items</p>
      </div>
    </section>
  );
};

export default YearView;