import React, { FC } from "react";
import { EditCalendarProps } from "../../types/interfaces";
import styles from '../../styles/components/Calendar/calendar.module.css';

const EditCalendar:FC<EditCalendarProps> = (props): JSX.Element => {

  const { selectedCalendar, handleDeactivateCalendarEditor } = props;

  const handleCloseCalendarEditor = () => {
    return handleDeactivateCalendarEditor();
  };

  return (
    <section className={styles.editCalendarContainer}>
      <button onClick={() => handleCloseCalendarEditor()}>close</button>
      <p>Edit</p>
    </section>
  );
};

export default EditCalendar;