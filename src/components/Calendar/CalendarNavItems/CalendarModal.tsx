import React, { FC } from "react";
import { calendarModalProps } from "../../../types/interfaces";
import styles from '../../../styles/components/Calendar/calendar.module.css';

const CalendarModal:FC<calendarModalProps> = (props): JSX.Element => {

  const { userCalendars, handleChangeActiveCalendars } = props;

  return (
    <nav className={styles.calendarModalContainer}>
      <ul className={styles.calendarModalListContainer}>
        <li className={styles.personalCalendarText}>
          Personal Calendar
        </li>
        {userCalendars.allUserCalendars.map((calendar) => {
          return <div className={styles.calendarModalCalendarsContainer}>
            <p className={styles.calendarModalCalendarsItemText}>
              {calendar.name}
            </p>
          </div>
        })}
      </ul>
    </nav>
  );
};

export default CalendarModal;