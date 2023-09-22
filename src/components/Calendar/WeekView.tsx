import React, { FC } from "react";
import styles from '../../styles/components/Calendar/calendar.module.css';
import { weekViewProps } from "../../types/interfaces";

const WeekView: FC<weekViewProps> = (props): JSX.Element => {

  const { currentDay, calendars } = props;

  const week = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
  ];

  const calendarMonthsAbbr = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const getWeekSnapShot = () => {
    // identify current day
    // identify day of the week and back fill until Monday
      // if the backfill could make a negative number just slap the previous month's abbr.
    // forward fill the remaining days until Friday
      // if the fill 
    const dayOfWeek = currentDay.split(',')[0];
    const dayOfWeekIndex = week.indexOf(dayOfWeek);


    const month = currentDay.split(',')[1].split(' ')[0];
    const day = currentDay.split(',')[1].split(',')[0];
    return `Week of ${month}${dayOfWeek}${day}`
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
        {week.map((day) => {
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