import React, { FC } from "react";
import { EditCalendarProps, calendarObject } from "../../types/interfaces";
import styles from '../../styles/components/Calendar/calendar.module.css';
import UserList from "./UserList";

const EditCalendar:FC<EditCalendarProps> = (props): JSX.Element => {

  const { 
    userId,
    selectedCalendar,
    handleDeactivateCalendarEditor,
    updateCalendarInUser,
    handleCalendarEditorChange,
  } = props;

  const handleCloseCalendarEditor = () => {
    return handleDeactivateCalendarEditor();
  };

  if (Object.keys(selectedCalendar).length !== 0) {

    const selectedCalendarRef = selectedCalendar as calendarObject;
    const authUserIds = (selectedCalendar as calendarObject).authorized_users.map((user) => user._id);
    const userListProps = {
      userId: userId,
      authUserIds: authUserIds,
      selectedCalendarId: selectedCalendarRef._id,
      updateCalendarInUser,
      handleCalendarEditorChange,
    }

    return (
      <section className={styles.editCalendarContainer}>
        <div className={styles.calendarEditorContainer}>
          <div className={styles.calendarEditorHeaderContainer}>
            <button 
              className={styles.calendarEditorCloseEditorButton}
              onClick={() => handleCloseCalendarEditor()}
            >
              Close Editor
            </button>
            <p
              className={styles.calendarEditorCurrentlyEditingText}
            >
              Modifying: &nbsp;<strong><em>{selectedCalendarRef.name}</em></strong> 
            </p>
            <h2 className={styles.calendarEditorHeaderText}>
              Calendar Editor
            </h2>
          </div>
          <div className={styles.editCalendarDisplayContainers}>
            <div className={styles.calendarEditorMainContainer}>
              <div className={styles.calendarEditorUserListsContainer}>
                <h3 className={styles.calendarEditorUserListsHeaderText}>
                  Users
                </h3>
                <div className={styles.calendarEditorUserList}>
                  <UserList
                    users={selectedCalendarRef.authorized_users}
                    type='Authorized'
                    {...userListProps}
                  />
                  <UserList 
                    users={selectedCalendarRef.view_only_users}
                    type='View-Only'
                    {...userListProps}
                  />
                  <UserList 
                    users={selectedCalendarRef.pending_users}
                    type='Pending'
                    {...userListProps}
                  />
                </div>
                <p className={styles.calendarEditorUserListsHelpText}>
                  <em>Click on a user to modify</em>
                </p>
                <div className={styles.calendarEditorAuxillaryItemsContainer}>
                  <button className={styles.deleteCalendarButton}>
                    Delete Calendar
                  </button>
                </div>
              </div>
              <div className={styles.calendarEditorEventsContainer}>
                <h3 className={styles.calendarEditorEventListHeaderText}>
                  Events
                </h3>
                <ul className={styles.calendarEditorEventsList}>
                  {Array.isArray(selectedCalendarRef.events) && selectedCalendarRef.events.length > 0 ? (
                    selectedCalendarRef.events.map((event) => (
                      <li key={event._id} className={styles.calendarEditorEventItemContainer}>
                        <p className={styles.calendarEditorEventName}>
                          {event.event_name}
                        </p>
                        <p className={styles.calendarEditorEvenDateAndTime}>
                          {event.event_date_and_time}
                        </p>
                      </li>
                    ))
                  ) : (
                    <p className={styles.emptyEventText}>No events to display.</p>
                  )}
                </ul>
              </div>
            </div>
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