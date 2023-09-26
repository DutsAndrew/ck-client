import React, { FC } from "react";
import { EditCalendarProps } from "../../types/interfaces";
import styles from '../../styles/components/Calendar/calendar.module.css';

const EditCalendar:FC<EditCalendarProps> = (props): JSX.Element => {

  const { selectedCalendar, handleDeactivateCalendarEditor } = props;

  const handleCloseCalendarEditor = () => {
    return handleDeactivateCalendarEditor();
  };

  console.log(selectedCalendar);

  // Edit Calendar should have the following:
    // 3 tables of user lists for: authorized, view-only, pending-invites/requests
      // each table should have the users in it with their first and last name
      // each user listed should have an edit or delete button, but greyed out unless the user
      // is in the authorized list

    // addition button next to user list tables to add users to any list

    // delete calendar button
      // users cannot delete their own personal calendar

    // all events in the calendar
      // each event should have an edit and delete button, but greyed out if user isn't authed


  return (
    <section className={styles.editCalendarContainer}>
      <button onClick={() => handleCloseCalendarEditor()}>Close Editor</button>
      <p>Edit</p>
    </section>
  );
};

export default EditCalendar;