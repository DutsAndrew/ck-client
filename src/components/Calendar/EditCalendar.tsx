import React, { FC } from "react";
import { EditCalendarProps, calendarObject, userCalendarPendingUserInstance } from "../../types/calendarTypes";
import styles from '../../styles/components/Calendar/calendar.module.css';
import UserList from "./UserList";
import toast from "react-hot-toast";

const EditCalendar:FC<EditCalendarProps> = (props): JSX.Element => {

  const { 
    userId,
    selectedCalendar,
    handleDeactivateCalendarEditor,
    updateCalendarInUser,
    handleCalendarEditorChange,
    removeCalendarFromUser,
  } = props;

  const handleCloseCalendarEditor = () => {
    return handleDeactivateCalendarEditor();
  };

  const handleLeaveCalendarRequest = async () => {
    toast.loading('Leaving calendar...', {id: 'leaveCalendar'});
    const calendar = selectedCalendar as calendarObject;
    if (calendar.created_by !== userId) {
      const authToken = localStorage.getItem('auth-token');
      if (typeof authToken === 'undefined') {
        toast.error('You must be signed in or not in incognito to make this request', {id: 'leaveCalendar'});
      } else {
        const apiUrl = `http://127.0.0.1:8000/calendar/${calendar._id}/leaveCalendar/${userId}`;
        const request = await fetch(apiUrl, {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
          method: 'DELETE',
        });
        const jsonResponse = await request.json();
        if (!request.ok || request.status !== 200 || !jsonResponse.calendar_id_to_remove) {
          toast.error('Failed to leave calendar', {id: 'leaveCalendar'});
        } else {
          toast.success('Calendar removed', {id: 'leaveCalendar'});
          removeCalendarFromUser(jsonResponse.calendar_id_to_remove);
          handleDeactivateCalendarEditor();
        };
      };
    } else {
      toast.error('You cannot leave a calendar that you created, you must delete it', {id: 'leaveCalendar'});
    };
  };

  const handleCalendarDeletionRequest = async () => {
    toast.loading('Attempting to delete calendar', {id: 'calendarDeletion'});
    const calendar = selectedCalendar as calendarObject;
    if (calendar.created_by === userId) {
      const authToken = localStorage.getItem('auth-token');
      if (typeof authToken === 'undefined') {
        toast.error('You must be signed in or not in incognito to make this request', {id: 'calendarDeletion'});
      } else {
        const apiUrl = `http://127.0.0.1:8000/calendar/${calendar._id}/deleteCalendar/${userId}`;
        const request = await fetch(apiUrl, {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
          method: 'DELETE',
        });
        const jsonResponse = await request.json();
        console.log(jsonResponse);
        if (!request.ok || request.status !== 200 || !jsonResponse.calendar_id) {
          toast.error('Failed to fully delete calendar', {id: 'calendarDeletion'});
        } else {
          toast.success('Calendar removed', {id: 'calendarDeletion'});
          removeCalendarFromUser(jsonResponse.calendar_id);
          handleDeactivateCalendarEditor();
        };
      };
    } else {
      toast.error('Only the calendar creator can delete the calendar', {id: 'calendarDeletion'});
    };
  };

  const getAllUserIdsOfCalendar = () => {
    if (Object.keys(selectedCalendar).length === 0) {
      return [];
    } else {
      const userIds: any[] = [
        ...(selectedCalendar as calendarObject).authorized_users.map((user) => user._id),
        ...(selectedCalendar as calendarObject).view_only_users.map((user) => user._id),
        ...(selectedCalendar as calendarObject).pending_users.map((user) => (user as unknown as userCalendarPendingUserInstance).user._id),
      ];
      return userIds;
    };
  };

  if (Object.keys(selectedCalendar).length !== 0) {

    const selectedCalendarRef = selectedCalendar as calendarObject;
    const authUserIds = (selectedCalendar as calendarObject).authorized_users.map((user) => user._id);
    const userListProps = {
      userId: userId,
      authUserIds: authUserIds,
      selectedCalendarId: selectedCalendarRef._id,
      allUserIdsOfCalendar: getAllUserIdsOfCalendar(),
      updateCalendarInUser,
      handleCalendarEditorChange,
    };

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
                  <button 
                    onClick={() => handleLeaveCalendarRequest()}
                    className={styles.leaveCalendarButton}
                  >
                    Leave Calendar
                  </button>
                  <button 
                    onClick={() => handleCalendarDeletionRequest()}
                    className={styles.deleteCalendarButton}
                  >
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
                          <strong>On:</strong> {event.combined_date_and_time.split(" ")[0]} &nbsp;
                          <strong>At:</strong> {event.combined_date_and_time.split(" ")[1]} UTC
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