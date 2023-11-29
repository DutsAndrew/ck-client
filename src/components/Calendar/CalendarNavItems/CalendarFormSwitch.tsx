import React, { FC, useEffect, useState } from 'react';
import styles from '../../../styles/components/Calendar/calendar.module.css';
import AddCalendarForm from './AddCalendarForm';
import AddEventForm from './AddEventForm';
import AddNoteForm from './AddNoteForm';
import { calendarFormSwitchProps } from '../../../types/interfaces';

const CalendarFormSwitch:FC<calendarFormSwitchProps> = (props): JSX.Element => {

  const { 
    userCalendars,
    userId,
    calendarFormStatus,
    calendarNoteEditRequest,
    appendNewCalendarToUser,
    addNewCalendarNoteToCalendar,
    updateCalendarNote,
    handleCloseModalRequest,
  } = props;

  useEffect(() => {
    handleUserShortCutRender(); // user activated the form by interacting with calendar app and not clicking the "plus" sign
  }, [calendarFormStatus]);

  useEffect(() => {
    handleCalendarNoteEditRequest();
  }, [calendarNoteEditRequest]);

  const [activeForm, setActiveForm] = useState('event');

  const handleActiveFormChange = (formRequest: string): void => {
    setActiveForm(formRequest);
  };

  const handleUserShortCutRender = () => {
    if (calendarFormStatus.event === true) setActiveForm('event');
    if (calendarFormStatus.note === true) setActiveForm('note');
    if (calendarFormStatus.calendar === true) setActiveForm('calendar');
  };

  const handleCalendarNoteEditRequest = () => {
    if (calendarNoteEditRequest.status === true) setActiveForm('note');
  };

  const renderFormView = () => {
    if (activeForm === 'event') {
      return (
        <AddEventForm 
          userCalendars={userCalendars}
          userId={userId}
          handleCloseModalRequest={handleCloseModalRequest}
        />
      );
    } else if (activeForm === 'calendar') {
      return (
        <AddCalendarForm 
          userId={userId}
          appendNewCalendarToUser={appendNewCalendarToUser}
          handleCloseModalRequest={handleCloseModalRequest}
        />
      );
    } else if (activeForm === 'note') {
      return (
        <AddNoteForm
          userId={userId}
          userCalendars={userCalendars}
          addNewCalendarNoteToCalendar={addNewCalendarNoteToCalendar}
          updateCalendarNote={updateCalendarNote}
          calendarNoteEditRequest={calendarNoteEditRequest}
        />
      );
    } else {
      return <></>
    };
  };

  return (
    <div className={styles.calendarFormMenuContainer}>
      <div className={styles.calendarFormMenuSwitchContainer}>
        <button
          className={`${styles.calendarFormSwitch} ${activeForm === 'event' ? styles.active : ''}`}
          onClick={() => handleActiveFormChange('event')}
        >
          Add Event
        </button>
        <button
          className={`${styles.calendarFormSwitch} ${activeForm === 'note' ? styles.active : ''}`}
          onClick={() => handleActiveFormChange('note')}
        >
          {calendarNoteEditRequest.status === true ? 'Edit Note' : 'Add Note'}
        </button>
        <button
          className={`${styles.calendarFormSwitch} ${activeForm === 'calendar' ? styles.active : ''}`}
          onClick={() => handleActiveFormChange('calendar')}
        >
          Create Calendar
        </button>
      </div>
      {renderFormView()}
    </div>
  );
};

export default CalendarFormSwitch;