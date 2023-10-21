import React, { FC, useState } from 'react';
import styles from '../../../styles/components/Calendar/calendar.module.css';
import AddCalendarForm from './AddCalendarForm';
import AddEventForm from './AddEventForm';
import { calendarFormSwitchProps } from '../../../types/interfaces';

const CalendarFormSwitch:FC<calendarFormSwitchProps> = (props): JSX.Element => {

  const { 
    userCalendars,
    userId 
  } = props;

  const [activeForm, setActiveForm] = useState('event');


  const handleActiveFormChange = (formRequest: string): void => {
    setActiveForm(formRequest);
  };

  const renderFormView = () => {
    if (activeForm === 'event') {
      return (
        <AddEventForm 
          userCalendars={userCalendars}
          userId={userId}
        />
      );
    } else {
      return (
        <AddCalendarForm 
          userId={userId}
        />
      );
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