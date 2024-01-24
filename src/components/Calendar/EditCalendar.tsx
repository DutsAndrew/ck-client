import React, { FC, useState } from "react";
import styles from '../../styles/components/Calendar/calendar.module.css';
import UserList from "./UserList";
import toast from "react-hot-toast";
import EventViewer from "./EventViewer";
import { applyCalendarBackgroundColor, isUserAuthorized } from "../../scripts/calendarHelpers";
import { getFontColorForHex } from "../../scripts/calculateFontColorForHex";
import { 
  EditCalendarProps, 
  calendarEventWithCalendarName, 
  calendarNote, 
  calendarNoteWithCalendarInfo, 
  calendarObject, 
  eventObject, 
  userCalendarPendingUserInstance 
} from "../../types/calendarTypes";
import NoteViewer from "./NoteViewer";
import HexColorPickerCustom from "../HexColorPickerCustom";

const EditCalendar:FC<EditCalendarProps> = (props): JSX.Element => {

  const { 
    userId,
    selectedCalendar,
    usersPreferredCalendarColors,
    handleDeactivateCalendarEditor,
    updateCalendarInUser,
    handleCalendarEditorChange,
    removeCalendarFromUser,
    handleCalendarEventModificationRequest,
    handleCalendarNoteModificationRequest,
    addCalendarColorPreference,
  } = props;

  const [eventViewStatus, setEventViewStatus] = useState({
    set: false,
    eventId: '',
  });
  const [noteViewStatus, setNoteViewStatus] = useState({
    set: false,
    noteId: '',
  });
  const [eventAndNoteSwitch, setEventAndNoteSwitch] = useState('events');
  const [currentHexColor, setCurrentHexColor] = useState('#ffffff');

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

  const handleCalendarEditorEventClick = (eventId: string) => {
    setEventViewStatus({
      set: true,
      eventId: eventId,
    });
  };

  const handleCalendarEditorNoteClick = (noteId: string) => {
    setNoteViewStatus({
      set: true,
      noteId: noteId,
    });
  };

  const handleCalendarEditorEventViewCloseRequest = () => {
    setEventViewStatus({
      set: false,
      eventId: '',
    });
  };

  const handleCalendarEditorNoteViewCloseRequest = () => {
    setNoteViewStatus({
      set: false,
      noteId: '',
    });
  };

  const handleEditEventRequest = (event: calendarEventWithCalendarName) => {
    handleCalendarEditorEventViewCloseRequest();
    handleCalendarEventModificationRequest(event.calendar_id, event);
  };

  const handleEditNoteRequest = (note: calendarNoteWithCalendarInfo) => {
    handleCalendarEditorNoteViewCloseRequest();
    handleCalendarNoteModificationRequest(note.calendar_id, note);
  };

  const verifyUserAuthorizationOfCalendar = (calendarId: string) => {
    const calendarArray = [(selectedCalendar as calendarObject)];
    return isUserAuthorized(calendarArray, calendarId, userId);
  };

  const getCalendarEventForViewing = () => {
    if (!Object.keys(selectedCalendar)) {
      return undefined;
    };

    const event = (selectedCalendar as calendarObject).events.find(event => event._id === eventViewStatus.eventId);
    if (typeof event === 'undefined') return;

    const eventWithCustomizations = addEventCustomizations((selectedCalendar as calendarObject), event);

    return eventWithCustomizations
  };

  const addEventCustomizations = (calendar: calendarObject, event: eventObject) => {
    const backgroundColor = applyCalendarBackgroundColor(calendar.calendar_color, calendar._id, usersPreferredCalendarColors);
    const fontColor = getFontColorForHex(backgroundColor);

    const eventWithCalendarInfo: calendarEventWithCalendarName = {
      ...event,
      calendar_name: calendar.name,
      event_background_color: backgroundColor,
      event_font_color: fontColor,
    };

    return eventWithCalendarInfo;
  };

  const getCalendarNoteForViewing = () => {
    if (!Object.keys(selectedCalendar)) {
      return undefined;
    };

    const note = (selectedCalendar as calendarObject).calendar_notes.find(note => note._id === noteViewStatus.noteId);
    if (typeof note === 'undefined') return;

    const noteWithCustomizations = addNoteCustomizations((selectedCalendar as calendarObject), note);

    return noteWithCustomizations;
  };

  const addNoteCustomizations = (calendar: calendarObject, note: calendarNote) => {
    const backgroundColor = applyCalendarBackgroundColor(calendar.calendar_color, calendar._id, usersPreferredCalendarColors);
    const fontColor = getFontColorForHex(backgroundColor);

    const noteWithCustomizations: calendarNoteWithCalendarInfo = {
      ...note,
      calendar_name: calendar.name,
      is_user_authorized: typeof calendar.authorized_users.find((user) => user._id === userId) === 'undefined' ? false : true,
      note_background_color: backgroundColor,
      note_color: fontColor,
    };

    return noteWithCustomizations;
  };

  const getCalendarColorCustomizations = () => {
    const calendarBackgroundColor = (selectedCalendar as calendarObject).calendar_color;
    const userPreferredColor = usersPreferredCalendarColors.calendars.find(colorScheme => colorScheme.object_id === (selectedCalendar as calendarObject)._id);

    if (userPreferredColor && userPreferredColor.background_color.length > 0) {
      return {
        backgroundColor: userPreferredColor.background_color,
      };
    } else if (calendarBackgroundColor && calendarBackgroundColor.length > 0) {
      return {
        backgroundColor: calendarBackgroundColor,
      };
    } else {
      return {};
    };
  };

  const getFontColorToMatchPreferredColor = () => {
    const calendarBackgroundColor = (selectedCalendar as calendarObject).calendar_color;
    const userPreferredColor = usersPreferredCalendarColors.calendars.find(colorScheme => colorScheme.object_id === (selectedCalendar as calendarObject)._id);

    if (userPreferredColor && userPreferredColor.background_color.length > 0) {
      return {
        color: getFontColorForHex(userPreferredColor.background_color),
      };
    } else if (calendarBackgroundColor && calendarBackgroundColor.length > 0) {
      return {
        color: getFontColorForHex(calendarBackgroundColor),
      };
    } else {
      return {};
    };
  };

  const setUserPreferredCalendarColor = (newColor: string): void => {
    setCurrentHexColor(newColor);
  };

  const handleApplyPreferredCalendarColorClick = async () => {
    toast.loading('Updating preferred color for calendar...', {id: 'userCalendarColorUpdate'});
    const calendar = selectedCalendar as calendarObject;

    const authToken = localStorage.getItem('auth-token');
      if (typeof authToken === 'undefined') {
        toast.error('You must be signed in or not in incognito to make this request', {id: 'userCalendarColorUpdate'});
      } else {
        const apiUrl = `http://127.0.0.1:8000/calendar/${calendar._id}/setPreferredColor`;
        const request = await fetch(apiUrl, {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(buildPreferredColorPostBody()),
        });
        const jsonResponse = await request.json();
        console.log(jsonResponse)
        if (!request.ok || request.status !== 200) {
          toast.error('Failed to set preferred color', {id: 'userCalendarColorUpdate'});
        } else {
          toast.success('Preferred color set!', {id: 'userCalendarColorUpdate'});
          if (jsonResponse.preferredColor) {
            addCalendarColorPreference(jsonResponse.preferredColor);
          };
        };
      };
  };

  const buildPreferredColorPostBody = () => {
    return {
      preferredColor: currentHexColor,
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
          <div 
            style={getCalendarColorCustomizations()}
            className={styles.editCalendarDisplayContainers}>
            <div className={styles.calendarEditorMainContainer}>
              <div className={styles.calendarEditorUserListsContainer}>
                <h3 
                  style={getFontColorToMatchPreferredColor()}
                  className={styles.calendarEditorUserListsHeaderText}
                >
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
                <p 
                  style={getFontColorToMatchPreferredColor()}
                  className={styles.calendarEditorUserListsHelpText}
                >
                  <em>Click on a user to modify</em>
                </p>
                <HexColorPickerCustom 
                  headerText="Set preferred color for this calendar"
                  currentHexColor={currentHexColor}
                  changeHexColorSelection={setUserPreferredCalendarColor}
                />
                <button
                  onClick={() => handleApplyPreferredCalendarColorClick()}
                  className={styles.calendarEditorApplyPreferredColorStylesButton}
                >
                  Apply
                </button>
              </div>
              <div className={styles.calendarEditorEventsContainer}>
                <div className={styles.calendarEditorEventsAndNotesTextSwitchContainer}>
                  <h3 
                    onClick={() => setEventAndNoteSwitch('events')}
                    className={eventAndNoteSwitch === 'events' ? styles.calendarEditorEventListHeaderTextActive : styles.calendarEditorEventListHeaderText}
                  >
                    Events
                  </h3>
                  <p className={styles.calendarEditorSwitchContainerPipe}>|</p>
                  <h3 
                    onClick={() => setEventAndNoteSwitch('notes')}
                    className={eventAndNoteSwitch === 'notes' ? styles.calendarEditorNoteListHeaderTextActive : styles.calendarEditorNoteListHeaderText}
                  >
                    Notes
                  </h3>
                </div>
                {eventViewStatus.set === true && Object.keys(selectedCalendar).length > 0 && 
                  <EventViewer 
                    event={getCalendarEventForViewing()} 
                    handleCloseEventViewerRequest={handleCalendarEditorEventViewCloseRequest}
                    handleEditEventRequest={handleEditEventRequest}
                    verifyUserAuthorizationOfCalendar={verifyUserAuthorizationOfCalendar}
                    updateCalendarInUser={updateCalendarInUser}
                  />
                }
                {noteViewStatus.set === true && Object.keys(selectedCalendar).length > 0 && 
                  <NoteViewer 
                    note={getCalendarNoteForViewing()} 
                    handleCloseNoteViewerRequest={handleCalendarEditorNoteViewCloseRequest}
                    handleEditNoteRequest={handleEditNoteRequest}
                    verifyUserAuthorizationOfCalendar={verifyUserAuthorizationOfCalendar}
                    updateCalendarInUser={updateCalendarInUser}
                  />
                }
                {eventAndNoteSwitch === 'events' ? (
                  <ul className={styles.calendarEditorEventsList}>
                    {Array.isArray(selectedCalendarRef.events) && selectedCalendarRef.events.length > 0 ? (
                      selectedCalendarRef.events.map((event) => (
                        <li 
                          key={event._id}
                          onClick={() => handleCalendarEditorEventClick(event._id)}
                          className={styles.calendarEditorEventItemContainer}
                        >
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
                ) : (
                  <ul className={styles.calendarEditorNotesList}>
                    {Array.isArray(selectedCalendarRef.calendar_notes) && selectedCalendarRef.calendar_notes.length > 0 ? (
                      selectedCalendarRef.calendar_notes.map((note) => (
                        <li 
                          key={note._id}
                          onClick={() => handleCalendarEditorNoteClick(note._id)}
                          className={styles.calendarEditorNoteItemContainer}
                        >
                          <p className={styles.calendarEditorNoteText}>
                            <strong>Note: </strong>{note.note}
                          </p>
                          <p className={styles.calendarEditorNoteAuxillaryText}>
                            <strong>Created by:</strong> {note.created_by.first_name}, {note.created_by.last_name} &nbsp;
                          </p>
                        </li>
                      ))
                    ) : (
                      <p className={styles.emptyEventText}>No notes to display.</p>
                    )}
                  </ul>
                )}
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