import React, { FC } from "react";
import { notesForCalendarProps } from "../../types/interfaces";
import styles from '../../styles/components/Calendar/calendar.module.css';

const NotesForCalendar:FC<notesForCalendarProps> = (props): JSX.Element => {

  const { calendarNotes } = props;

  // console.log(calendarNotes);

  return (
    <div className={styles.notesForCalendarContainer}>
      
    </div>
  )
};

export default NotesForCalendar;