import React, { FC, useEffect, useState } from "react";
import styles from '../../styles/components/Calendar/calendar.module.css';
import { userCalendars, weekViewProps } from "../../types/interfaces";

const WeekView: FC<weekViewProps> = (props): JSX.Element => {

  const { 
    currentDay,
    calendars,
    activeCalendars,
  } = props;

  const week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const [weekSnapshot, setWeekSnapShot] = useState('');

  useEffect(() => {
    generateSnapShot();
  }, [currentDay, calendars]);

  const generateSnapShot = () => {
    const currentDate = new Date(currentDay);
    const currentDayOfWeek = currentDate.getDay();
    const daysToAdd = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;
    const mondayDate = new Date(currentDate);
    mondayDate.setDate(currentDate.getDate() - daysToAdd); // Start of the week (Monday)

    const endDate = new Date(mondayDate);
    endDate.setDate(mondayDate.getDate() + 6); // End of the week (Sunday)

    const startFormatted = mondayDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const endFormatted = endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    setWeekSnapShot(`${startFormatted} - ${currentDayOfWeek === 0 ? '' : 'Oct '}${endFormatted}`);
  };

  return (
    <section className={styles.weekViewContainer}>
      <p className={styles.currentDateText}>
        <strong>{weekSnapshot}</strong>
      </p>
      <h2 className={styles.weekViewHeaderText}>Week View</h2>
      <div className={styles.weekDayContainer}>
        {week.map((day) => (
          <div className={styles.weekDayItem} key={day}>
            <p className={styles.weekDayItemText}>
              <strong><em>{day}</em></strong>
            </p>
            <div className={styles.weekDayItemBlock}>
              {/* Render API events here */}
              This is some boilerplate text to see how it looks
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WeekView;