import React from "react";
import styles from '../../styles/components/Calendar/calendar.module.css';

const WeekView = () => {
  const generateWeek = () => {
    const week = [
      "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
    ];
    return week;
  };

  return (
    <section className={styles.weekViewContainer}>
      <div className={styles.weekDayContainer}>
        {generateWeek().map((day) => {
          return <div className={styles.weekDayItem}>
            <p className={styles.weekDayItemText}>
              {day}
            </p>
            <div className={styles.weekDayItemBlock}>
              {/* Render API events here */} This is some boiler plate text to see how it looks
            </div>
          </div>
        })}
      </div>
    </section>
  );
};

export default WeekView;