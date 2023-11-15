import React, { FC, useEffect, useState } from 'react';
import { calendarEditorState, calendarObject, calendarProps, userCalendars, activeCalendarState, calendarApiResponse, allUserCalendarsPopulatedApiResponse } from '../../types/interfaces';
import styles from '../../styles/components/Calendar/calendar.module.css';
import CalendarNav from './CalendarNav';
import YearView from './YearView';
import MonthView from './MonthView';
import WeekView from './WeekView';
import DayView from './DayView';
import EditCalendar from './EditCalendar';
import toast from 'react-hot-toast'

const Calendar:FC<calendarProps> = (props): JSX.Element => {

  const { 
    usersFirstName,
    usersPersonalCalendar,
    usersTeamCalendars,
    usersPendingCalendars,
    userId,
    appendNewCalendarToUser,
    saveCalendarDatesAndHolidaysData,
    saveAllUserCalendarsToUser,
    updateCalendarInUser,
    removeCalendarFromUser,
    calendarDatesData,
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

  useEffect(() => {
    if (
      Object.keys(calendarDatesData).length > 0 // if calendar data was fetched then user calendars were fetched as well
    ) {
      return;
    } else {
      mountAppData();
    };
  }, []);

  const mountAppData = () => {
    fetchCalendarAppData(); // get calendar date/holiday data from db
    fetchAllUserCalendarData(); // get ALL user calendar data
  };

  const fetchCalendarAppData = async () => {
    toast.loading('App data', {id: 'calendarData'});
    const authToken = localStorage.getItem('auth-token');
    if (typeof authToken === 'undefined') {
      return toast.error('You must be signed in or not in incognito to perform this action', {id: 'calendarData'});
    } else {
      const apiUrl = 'http://127.0.0.1:8000/calendar/';
      const request = await fetch(apiUrl, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        method: 'GET',
      });
      const jsonResponse: calendarApiResponse = await request.json();
      if (!request.ok || request.status !== 200) {
        return toast.error('App data', {id: 'calendarData'});
      } else {
        if (jsonResponse.data) {
          saveCalendarDatesAndHolidaysData(jsonResponse.data);
          return toast.success('App data', {id: 'calendarData'});
        };
      };
    };
  };

  const fetchAllUserCalendarData = async () => {
    toast.loading('Your calendar data', {id: 'userCalendarData'});
    const authToken = localStorage.getItem('auth-token');
    if (typeof authToken === 'undefined') {
      return toast.error('You must be signed in or not in incognito to perform this action', {id: 'userCalendarData'});
    } else {
      const apiUrl = 'http://127.0.0.1:8000/calendar/getUserCalendarData';
      const request = await fetch(apiUrl, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        method: 'GET',
      });
      const response: allUserCalendarsPopulatedApiResponse = await request.json();
      if (!request.ok && request.status !== 200) {
        return toast.error('Your calendar data', {id: 'userCalendarData'});
      } else {
        if (response.updated_user) {
          const populatedCalendars = response.updated_user.calendars;
          const populatedPendingCalendars = response.updated_user.pending_calendars;
          const populatedPersonalCalendar = response.updated_user.personal_calendar;
          saveAllUserCalendarsToUser(populatedCalendars, populatedPendingCalendars, populatedPersonalCalendar);
          return toast.success('Your calendar data', {id: 'userCalendarData'});
        };
      };
    };
  };

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
    return setCalendarEditor({
      active: true,
      calendar: selectedCalendar,
    });
  };

  const handleCalendarEditorChange = (updatedCalendar: calendarObject): void => {
    return setCalendarEditor({
      active: true,
      calendar: updatedCalendar,
    });
  };

  const handleDeactivateCalendarEditor = () => {
    setCalendarEditor({
      active: false,
      calendar: {},
    });
  };

  const userCalendars: userCalendars = {
    personalCalendar: usersPersonalCalendar,
    pendingCalendars: usersPendingCalendars,
    teamCalendars: usersTeamCalendars,
  };

  const calendarNavProps = {
    userCalendars,
    currentView,
    activeCalendars,
    calendarDatesData,
    userId,
    changeCurrentView,
    handleCalendarTimeChangeRequest,
    handleActiveCalendarChange,
    handleActivateCalendarEditor,
    appendNewCalendarToUser,
  };

  const calendarViewProps = {
    currentDay: getTodaysDate(),
    activeCalendars: activeCalendars,
  }

  if (calendarEditor.active === true) {
    return (
      <main className={styles.calendarContainer}>
        <EditCalendar 
          userId={userId} // to validate calendar changes if user is authorized
          selectedCalendar={calendarEditor.calendar}
          handleDeactivateCalendarEditor={handleDeactivateCalendarEditor}
          updateCalendarInUser={updateCalendarInUser}
          handleCalendarEditorChange={handleCalendarEditorChange}
          removeCalendarFromUser={removeCalendarFromUser}
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
            <MonthView 
              calendarDatesData={calendarDatesData}
              {...calendarViewProps}
            />
            <YearView 
              calendarDatesData={calendarDatesData}
              {...calendarViewProps}
            />
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
            calendarDatesData={calendarDatesData}
            {...calendarViewProps}
          />
        );
      } else if (currentView === 'Year') {
        return (
          <YearView 
            calendarDatesData={calendarDatesData}
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