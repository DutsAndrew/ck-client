import React, { FC } from "react";
import { EditCalendarProps, calendarObject, userReferenceInstance } from "../../types/interfaces";
import styles from '../../styles/components/Calendar/calendar.module.css';
import UserList from "./UserList";

const EditCalendar:FC<EditCalendarProps> = (props): JSX.Element => {

  const { selectedCalendar, handleDeactivateCalendarEditor } = props;

  const handleCloseCalendarEditor = () => {
    return handleDeactivateCalendarEditor();
  };

  if (Object.keys(selectedCalendar).length !== 0) {
    const selectedCalendarRef = selectedCalendar as calendarObject;
    return (
      <section className={styles.editCalendarContainer}>
        <div className={styles.calendarEditorContainer}>
          <div className={styles.calendarEditorMainContainer}>
            <div className={styles.calendarEditorHeaderContainer}>
              <button onClick={() => handleCloseCalendarEditor()}>Close Editor</button>
              <h2 className={styles.calendarEditorHeaderText}>
                Calendar Editor
              </h2>
            </div>
            <div className={styles.calendarEditorUserListsContainer}>
              <h3 className={styles.calendarEditorUserListHeaderText}>
                Users
              </h3>
              <div className={styles.calendarEditorUserList}>
                <button className={styles.calendarEditorAddUserButton}>
                  Add User
                </button>
                <UserList
                  calendar={selectedCalendarRef.authorized_users}
                  type='Authorized'
                />
                <UserList 
                  calendar={selectedCalendarRef.view_only_users}
                  type='View-Only'
                />
                <UserList 
                  calendar={selectedCalendarRef.pending_authorized_users}
                  type='Pending'
                />
              </div>
            </div>
            <div className={styles.calendarEditorEventsContainer}>
              <ul className={styles.calendarEditorEventsList}>
                {selectedCalendarRef.events && 
                selectedCalendarRef.events.map((event) => {
                  return <li 
                    key={event._id}
                    className={styles.calendarEditorEventItemContainer}
                  >
                    
                  </li>
                })}
              </ul>
            </div>
          </div>
          <div className={styles.calendarEditorAuxillaryItemsContainer}>
            <button className={styles.deleteCalendarButton}>
              Delete Calendar
            </button>
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <>
        <button onClick={() => handleCloseCalendarEditor()}>Close Editor</button>
        <p>
          There was an error processing your request, the calendar you selected does not exist
        </p>
      </>
    );
  };
};

export default EditCalendar;