import React, { FC, useState } from 'react';
import { calendarEditorState, calendarModalState, calendarObject, calendarProps, userCalendars, activeCalendarState } from '../../types/interfaces';
import styles from '../../styles/components/Calendar/calendar.module.css';
import CalendarNav from './CalendarNav';
import YearView from './YearView';
import MonthView from './MonthView';
import WeekView from './WeekView';
import DayView from './DayView';
import EditCalendar from './EditCalendar';

const Calendar:FC<calendarProps> = (props): JSX.Element => {

  const { 
    usersFirstName,
    usersPersonalCalendar,
    usersTeamCalendars,
    sendUserId,
  } = props;

  const [calendarData, setCalendarData] = useState({}),
        [currentView, setCurrentView] = useState('All'),
        [calendarEditor, setCalendarEditor] = useState<calendarEditorState>({
          active: false,
          calendar: {},
        }),
        [activeCalendars, setActiveCalendars]= useState<activeCalendarState>(
          [usersPersonalCalendar]
        );

  const getTodaysDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };

    const date = new Date();
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    return formattedDate;
  }

  const changeCurrentView = (viewRequest: string): void => {
    return setCurrentView(viewRequest);
  };
  
  const handleCalendarTimeChangeRequest = () => {
    return;
  };

  const handleAddEventRequest = () => {
    return;
  };

  const handleActiveCalendarChange = (calendarList: calendarObject[]): void => {
    setActiveCalendars(
      calendarList,
    );
  };

  const handleActivateCalendarEditor = (selectedCalendar: calendarObject): void => {
    const userId = sendUserId();
    if (selectedCalendar.authorized_users.includes(userId)) {
      setCalendarEditor({
        active: true,
        calendar: selectedCalendar,
      });
    } else {
      alert('You are not authorized to edit that calendar, if you believe you should have access please reach out to the owners of the calendar');
    };
  };

  const handleDeactivateCalendarEditor = () => {
    setCalendarEditor({
      active: false,
      calendar: {},
    });
  };

  const userCalendars: userCalendars = {
    personalCalendar: usersPersonalCalendar,
    teamCalendars: usersTeamCalendars,
  };

  const calendarNavProps = {
    userCalendars,
    currentView,
    activeCalendars,
    changeCurrentView,
    handleCalendarTimeChangeRequest,
    handleActiveCalendarChange,
    handleActivateCalendarEditor,
  };

  const calendarViewProps = {
    currentDay: getTodaysDate(),
    calendars: userCalendars,
    activeCalendars: activeCalendars,
  }

  if (calendarEditor.active === true) {
    return (
      <main className={styles.calendarContainer}>
        <EditCalendar 
          selectedCalendar={calendarEditor.calendar}
          handleDeactivateCalendarEditor={handleDeactivateCalendarEditor}
        />
      </main>
    );
  };

  if (
    typeof usersFirstName !== 'undefined' &&
    typeof usersPersonalCalendar !== 'undefined' &&
    typeof usersTeamCalendars !== 'undefined' &&
    calendarEditor.active === false
  ) {

    const renderCalendarView = () => {
      if (currentView === 'All') {
        return (
          <>
            <DayView {...calendarViewProps} />
            <WeekView {...calendarViewProps} />
            <MonthView {...calendarViewProps} />
            <YearView {...calendarViewProps} />
          </>
        );
      } else if (currentView === 'Day') {
        return (
          <DayView 
            {...calendarViewProps}
          />
        );
      } else if (currentView === 'Week') {
        return (
          <WeekView 
            {...calendarViewProps}
          />
        );
      } else if (currentView === 'Month') {
        return (
          <MonthView 
            {...calendarViewProps}
          />
        );
      } else if (currentView === 'Year') {
        return (
          <YearView 
            {...calendarViewProps} 
          />
        );
      } else {
        return (
          <h1>Something went terribly wrong, please try again or refresh your page.</h1>
        );
      };
    };

    return (
      <main className={styles.calendarContainer}>
        <CalendarNav {...calendarNavProps} />
        {renderCalendarView()}
      </main>
    );

  } else {
    return (
      <h1>You must be signed in to view your calendars</h1>
    );
  };
};

export default Calendar;