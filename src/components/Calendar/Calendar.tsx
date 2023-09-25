import React, { FC, useState } from 'react';
import { calendarEditorState, calendarObject, calendarProps, userCalendars } from '../../types/interfaces';
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
        });

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

  // on default have the following views render: 1) Day, 2) Week, 3) Month
  // users can switch to only viewing one of them or two of their choice
  // if user chooses to render only on version the styling should be different to make use
  // of screen real estate

  // users should be able to select up to 10 calendars to view at once
  // all events should be accessible to render
  // conflicting or duplicate events should still render
  // user should be able to easily adjust and save their calendar color preferences to their user profile
  // existing color preferences should render at load

  // setup calendar nav to deactivate forward and backward arrows unless client is only viewing day, week, or month. If they're viewing
  // two or more they shouldn't be able to rotate the calendar in any capacity

  const userCalendars: userCalendars = {
    personalCalendar: usersPersonalCalendar,
    teamCalendars: usersTeamCalendars,
  };

  const commonProps = {
    userCalendars,
    currentView,
    changeCurrentView,
    handleCalendarTimeChangeRequest,
    handleActivateCalendarEditor,
  };

  if (calendarEditor.active === true) {
    return (
      <main className={styles.calendarContainer}>
        <CalendarNav {...commonProps} />
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
            <DayView 
              currentDay={getTodaysDate()}
              calendars={userCalendars}
            />
            <WeekView
              currentDay={getTodaysDate()}
              calendars={userCalendars}
            />
            <MonthView
              currentDay={getTodaysDate()}
              calendars={userCalendars}
            />
            <YearView 
              calendars={userCalendars}
            />
          </>
        );
      } else if (currentView === 'Day') {
        return <DayView
          currentDay={getTodaysDate()}
          calendars={userCalendars}
        />;
      } else if (currentView === 'Week') {
        return <WeekView
          currentDay={getTodaysDate()}
          calendars={userCalendars}
        />;
      } else if (currentView === 'Month') {
        return (
          <MonthView
            currentDay={getTodaysDate()}
            calendars={userCalendars}
          />
        );
      } else if (currentView === 'Year') {
        return (
          <YearView 
            calendars={userCalendars}
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
        <CalendarNav {...commonProps} />
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