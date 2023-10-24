import React, { FC, useEffect, useState } from 'react';
import { calendarEditorState, calendarObject, calendarProps, userCalendars, activeCalendarState, calendarApiResponse, allUserCalendarsPopulatedApiResponse } from '../../types/interfaces';
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
    usersPendingCalendars,
    userId,
    appendNewCalendarToUser,
    saveCalendarDatesAndHolidaysData,
    saveAllUserCalendarsToUser,
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
    if (Object.keys(calendarDatesData).length > 0
      && (usersTeamCalendars.length > 0 && Object.values(usersTeamCalendars).length > 0)
      && (usersPendingCalendars.length > 0 && Object.values(usersPendingCalendars).length > 0)
    ) {
      return;
    } else {
      (async function() {
        await fetchCalendarAppData(); // get calendar date/holiday data from db
        await fetchAllUserCalendarData(); // get ALL user calendar data
      })();
    }
  }, []);

  const fetchCalendarAppData = async () => {
    const authToken = localStorage.getItem('auth-token');
    if (typeof authToken === 'undefined') {
      return alert('You must be signed in and not in incognito to remain authorized');
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
      if (!request.ok) {
        return alert('We were unable to load calendar data, please try again later');
      } else {
        const jsonResponse: calendarApiResponse = await request.json();
        if (jsonResponse.data) {
          return saveCalendarDatesAndHolidaysData(jsonResponse.data);
        } else {
          return alert('We were not able to retrieve the necessary calendar data');
        };
      };
    };
  };

  const fetchAllUserCalendarData = async () => {
    const authToken = localStorage.getItem('auth-token');
    if (typeof authToken === 'undefined') {
      return alert('You must be signed in and not in incognito to remain authorized');
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
      if (!request.ok) {
        return alert('We were unable to load calendar data, please try again later');
      } else {
        if (response.updated_user) {
          const populatedCalendars = response.updated_user.calendars;
          const populatedPendingCalendars = response.updated_user.pending_calendars;
          return saveAllUserCalendarsToUser(populatedCalendars, populatedPendingCalendars);
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
    if (selectedCalendar.authorized_users.includes((userId as any))) {
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