import React, { FC } from "react";
import styles from '../../styles/components/Calendar/calendar.module.css';
import { weekViewProps } from "../../types/interfaces";

const WeekView: FC<weekViewProps> = (props): JSX.Element => {

  const { currentDay } = props;

  const generateWeek = () => {
    const week = [
      "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
    ];
    return week;
  };

  const getWeekSnapShot = () => {
    const dayOfWeek = currentDay.split(',')[0];
    const month = currentDay.split(',')[1].split(' ')[0];
    const day = currentDay.split(',')[1].split(',')[0];
    return `${month}${dayOfWeek}${day}`
  };

  return (
    <section className={styles.weekViewContainer}>
      <p className={styles.currentDateText}>
        <strong>{getWeekSnapShot()}</strong>
      </p>
      <h2 className={styles.weekViewHeaderText}>
        Week View
      </h2>
      <div className={styles.weekDayContainer}>
        {generateWeek().map((day) => {
          return <div
            className={styles.weekDayItem}
            key={day}
          >
            <p className={styles.weekDayItemText}>
              <strong><em>{day}</em></strong>
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