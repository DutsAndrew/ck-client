import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/components/Calendar/calendar.module.css';
import CalendarNav from './CalendarNav';
import YearView from './YearView';
import MonthView from './MonthView';
import WeekView from './WeekView';
import DayView from './DayView';
import EditCalendar from './EditCalendar';
import toast from 'react-hot-toast'
import { getFontColorForHex } from '../../scripts/calculateFontColorForHex';
import { 
  calendarEditorState,
  calendarObject,
  calendarProps,
  userCalendars,
  activeCalendarState,
  calendarApiResponse,
  allUserCalendarsPopulatedApiResponse, 
  calendarNoteWithCalendarInfo,
  calendarNotesGroupedState,
  calendarNotesGrouped,
  calendarNotesWithInfo,
  calendarEventsGroupedState,
  calendarEventsGrouped,
  eventObject,
  calendarEventWithCalendarName,
  calendarFormStatusState,
} from '../../types/calendarTypes';
import { applyCalendarBackgroundColor } from '../../scripts/calendarHelpers';

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
    addNewCalendarNoteToCalendar,
    updateCalendarNote,
    removeCalendarNoteFromCalendar,
    calendarDatesData,
    usersPreferredCalendarColors,
  } = props;

  const [currentView, setCurrentView] = useState('All'),
  [calendarEditor, setCalendarEditor] = useState<calendarEditorState>({
    active: false,
    calendar: {},
  }),
  [activeCalendars, setActiveCalendars]= useState<activeCalendarState>(
    [usersPersonalCalendar]
  ),
  [calendarFormStatus, setCalendarFormStatus] = useState<calendarFormStatusState>({
    // state in case user shortcuts the calendar form by interacting with the calendar app instead of clicking the "plus" sign
    event: false,
    eventDate: null,
    note: false,
    calendar: false,
  }),
  [calendarNoteEditRequest, setCalendarNoteEditRequest] = useState({
    calendarId: '',
    note: {},
    status: false,
  }),
  [calendarEventEditRequest, setCalendarEventEditRequest] = useState({
    calendarId: '',
    event: {},
    status: false,
  }),
  [calendarNotesGrouped, setCalendarNotesGrouped] = useState<calendarNotesGroupedState>({}),
  [calendarEventsGrouped, setCalendarEventsGrouped] = useState<calendarEventsGroupedState>({}),
  [currentViewingYear, setCurrentViewingYear] = useState(new Date().getFullYear().toString());

  const navigate = useNavigate();

  useEffect(() => {
    if (typeof userId === 'undefined') { // prevent user from fetching calendar data and crashing app without being logged in
      navigate('/login');
      return;
    };

    if (
      Object.keys(calendarDatesData).length > 0
    ) {
      return;
    } else {
      mountAppData();
    };
  }, []);

  useEffect(() => {
    updateActivateCalendarsWithUpdates();
    updateCalendarEditor();
  }, [usersPersonalCalendar, usersTeamCalendars, usersPendingCalendars]);

  useEffect(() => {
    groupCalendarNotes();
    groupEvents();
  }, [activeCalendars, currentViewingYear]);

  const mountAppData = () => {
    fetchCalendarAppData(); // get calendar date/holiday data from db
    fetchAllUserCalendarData(); // get ALL user calendar data
  };

  const updateActivateCalendarsWithUpdates = () => {
    if (activeCalendars.length === 0 || !Array.isArray(activeCalendars)) {
      return;
    };

    const updatedActiveCalendars = activeCalendars.map((outdatedCalendar: calendarObject) => {
      if (typeof outdatedCalendar === 'undefined') return;

      if (outdatedCalendar.calendar_type) {
        if (outdatedCalendar.calendar_type === 'personal') {
          return usersPersonalCalendar;
        };
        if (outdatedCalendar.calendar_type === 'team') {
          const updatedCalendar = usersTeamCalendars.find((updatedCalendar) => updatedCalendar._id === outdatedCalendar._id);
          if (updatedCalendar) {
            return updatedCalendar;
          };
        };
        // to prevent bug where string of personal calendar id is stored and never updated with fetched calendar
      } else if (typeof outdatedCalendar === 'string' && activeCalendars.length === 1) {
        outdatedCalendar = usersPersonalCalendar;
      };
      return outdatedCalendar;
    });

    if (typeof updatedActiveCalendars !== 'undefined') setActiveCalendars((updatedActiveCalendars as calendarObject[]));
  };

  const updateCalendarEditor = () => {
    if (Object.keys(calendarEditor.calendar).length > 0 && calendarEditor.active === true) {
      const currentCalendars = [userCalendars.personalCalendar, ...userCalendars.teamCalendars];
      const calendarEditorId = (calendarEditor.calendar as calendarObject)._id;
      currentCalendars.forEach((calendar) => {
        if (calendar._id === calendarEditorId) {
          setCalendarEditor({
            active: true,
            calendar: calendar,
          });
          return;
        };
      });
    };
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

  const handleNotesForCalendarRequestToAddNewNote = () => {
    setCalendarFormStatus({
      event: false,
      eventDate: null,
      note: true,
      calendar: false,
    });
  };

  const handleCalendarFormDataCleanup = () => {
    setCalendarFormStatus({
      event: false,
      eventDate: null,
      note: false,
      calendar: false,
    });
    
    if (calendarNoteEditRequest.status === true) {
      handleCancelCalendarNoteModificationRequest();
    };

    if (calendarEventEditRequest.status === true) {
      handleCancelCalendarEventModificationRequest();
    };
  };

  const handleCalendarNoteModificationRequest = (calendarId: string, calendarNote: calendarNoteWithCalendarInfo) => {
    const authAccess = doesUserHaveCalendarAccess(calendarId);

    if (authAccess === false) {
      return toast.error('You do not have access to modify this calendar', {id: 'noteModificationError'});
    } else {
      return setCalendarNoteEditRequest({
        calendarId: calendarId,
        note: calendarNote,
        status: true,
      });
    };
  };

  const handleCancelCalendarNoteModificationRequest = () => {
    setCalendarNoteEditRequest({
      calendarId: '',
      note: {},
      status: false,
    });
  };

  const handleCalendarEventModificationRequest = (calendarId: string, calendarEvent: eventObject) => {
    const authAccess = doesUserHaveCalendarAccess(calendarId);

    if (authAccess === false) {
      return toast.error('You do not have access to modify this calendar', {id: 'eventModificationError'});
    } else {
      handleDeactivateCalendarEditor();
      return setCalendarEventEditRequest({
        calendarId: calendarId,
        event: calendarEvent,
        status: true,
      });
    };
  };

  const handleCancelCalendarEventModificationRequest = () => {
    setCalendarEventEditRequest({
      calendarId: '',
      event: {},
      status: false,
    });
  };

  const doesUserHaveCalendarAccess = (calendarId: string) => {
    const currentCalendars = [userCalendars.personalCalendar, ...userCalendars.teamCalendars];
    
    let authStatus = false;

    currentCalendars.forEach((calendar) => {
      if (calendar._id === calendarId) {
        if (calendar.created_by === userId) {
          authStatus = true;
          return authStatus;
        };
        calendar.authorized_users.forEach((user) => {
          if (user._id === userId) {
            authStatus = true;
            return authStatus;
          };
        });
      };
    });

    return authStatus;
  };

  const groupCalendarNotes = () => {
    if (!Array.isArray(activeCalendars) || activeCalendars.length === 0) return; 

    const dayNotes: calendarNotesWithInfo = [];
    const weekNotes: calendarNotesWithInfo = [];
    const monthNotes: calendarNotesWithInfo = [];
    const yearNotes: calendarNotesWithInfo = [];

    Array.isArray(activeCalendars) && activeCalendars.forEach((calendar) => {
      if (calendar && calendar.calendar_notes) {
        Array.isArray(calendar.calendar_notes) && calendar.calendar_notes.forEach((note) => {
          const calendarNoteWithCalendarInfo: calendarNoteWithCalendarInfo = {
            ...note, 
            calendar_name: calendar.name,
            calendar_id: calendar._id,
            is_user_authorized: typeof calendar.authorized_users.find((user) => user._id === userId) === 'undefined' ? false : true,
          };
          switch(note.type) {
            case 'day':
              dayNotes.push(calendarNoteWithCalendarInfo);
              break;
            case 'week':
              weekNotes.push(calendarNoteWithCalendarInfo);
              break;
            case 'month':
              monthNotes.push(calendarNoteWithCalendarInfo);
              break;
            case 'year':
              yearNotes.push(calendarNoteWithCalendarInfo);
              break;
          };
        });
      };
    });

    const notes = {
      dayNotes: dayNotes,
      weekNotes: weekNotes,
      monthNotes: monthNotes,
      yearNotes: yearNotes,
    };

    return setCalendarNotesGrouped(notes);
  };

  const groupEvents = () => {
    if (!Array.isArray(activeCalendars) || activeCalendars.length === 0) return; 

    const dayEvents: calendarEventWithCalendarName[] = [];
    const weekEvents: calendarEventWithCalendarName[] = [];
    const monthEvents: calendarEventWithCalendarName[] = [];
    const yearEvents: calendarEventWithCalendarName[] = [];

    Array.isArray(activeCalendars) && activeCalendars.forEach((calendar) => {
      if (calendar && calendar.events) {
        Array.isArray(calendar.events) && calendar.events.forEach((event) => {

          const eventWithCustomizations = addEventCustomizations(calendar, event);
          const eventDate = new Date(event.event_date);
          const eventGroup = identifyEventCategory(eventDate);

          switch(eventGroup) {
            case 'day':
              dayEvents.push(eventWithCustomizations);
              break;
            case 'week':
              weekEvents.push(eventWithCustomizations);
              break;
            case 'month':
              monthEvents.push(eventWithCustomizations);
              break;
            case 'year':
              yearEvents.push(eventWithCustomizations);
              break;
            case 'none':
              break;
            default:
              break;
          };
        });
      };
    });

    const events = {
      dayEvents: dayEvents,
      weekEvents: weekEvents,
      monthEvents: monthEvents,
      yearEvents: yearEvents,
    };

    console.log(events)

    return setCalendarEventsGrouped(events);
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

  const identifyEventCategory = (eventDate: Date) => {
    const today = new Date();
    const todayWithSelectedYear = new Date(Number(currentViewingYear), today.getMonth(), today.getDate(), 0, 0, 0, 0);
    
    // see if event is for today
    if (
      eventDate.getFullYear() === todayWithSelectedYear.getFullYear()
      && eventDate.getMonth() === todayWithSelectedYear.getMonth()
      && eventDate.getDate() === todayWithSelectedYear.getDate()
    ) {
      return 'day';
    };

    // see if event is for this week
    const thisWeeksSnapshot = getWeekSnapshot(todayWithSelectedYear);
    const eventWeeksSnapshot = getWeekSnapshot(eventDate);

    if (
      // beginning of week comparison
      thisWeeksSnapshot.monday.getFullYear() === eventWeeksSnapshot.monday.getFullYear()
      && thisWeeksSnapshot.monday.getMonth() === eventWeeksSnapshot.monday.getMonth()
      && thisWeeksSnapshot.monday.getDate() === eventWeeksSnapshot.monday.getDate()

      // end of week comparison
      && thisWeeksSnapshot.sunday.getFullYear() === eventWeeksSnapshot.sunday.getFullYear()
      && thisWeeksSnapshot.sunday.getMonth() === eventWeeksSnapshot.sunday.getMonth()
      && thisWeeksSnapshot.sunday.getDate() === eventWeeksSnapshot.sunday.getDate()
    ) {
      return 'week';
    };

    // see if event is for this month
    if (
      todayWithSelectedYear.getFullYear() === eventDate.getFullYear()
      && todayWithSelectedYear.getMonth() === eventDate.getMonth()
    ) {
      return 'month';
    };

    // see if event is for this year
    if (
      todayWithSelectedYear.getFullYear() === eventDate.getFullYear()
    ) {
      return 'year';
    };

    return 'none';
  };

  const getWeekSnapshot = (day: Date) => {
    const dayOfWeek = day.getDay();
    const daysToAdd = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const mondayDate = new Date(day);
    mondayDate.setDate(day.getDate() - daysToAdd);
    const sundayDate = new Date(mondayDate);
    sundayDate.setDate(sundayDate.getDate() + 6);

    return {
      'monday': mondayDate,
      'sunday': sundayDate,
    };
  };

  const handleOpenAddEventFormClick = (viewType: string, dateInfo: string, dateInfoExtra?: number) => {
    if (viewType.length === 0) return;
    if (dateInfo.length === 0) return;

    // DATEINFO VARIABLE WILL COME IN THE FOLLOWING FORMATS:
      // DAY-VIEW - "10", HOUR NUMBER
      // WEEK-VIEW - "Friday", DAY OF WEEK STRING
      // MONTH-VIEW - "8-Friday", CURRENTLY ON THE CURRENT MONTH CAN BE VIEWED
      // YEAR-VIEW - "13" 0, DAY WILL COME IN STRING, DATEINFOEXTRA WILL HAVE THE MONTH INDEX
      
    const dateOfClick = getDateFromCalendarClick(viewType, dateInfo, dateInfoExtra);

    if (
      (viewType === 'day-view-item-block-am' && dateOfClick instanceof Date)
      || (viewType === 'day-view-item-block-pm' && dateOfClick instanceof Date)
      || (viewType === 'week-view-item-block' && dateOfClick instanceof Date)
      || (viewType === 'month-view-item-block' && dateOfClick instanceof Date)
      || (viewType === 'year-view-item-block' && dateOfClick instanceof Date)
    ) {
      setCalendarFormStatus({
        event: true,
        eventDate: dateOfClick,
        note: false,
        calendar: false,
      });
    };
  };

  const getDateFromCalendarClick = (elementId: string, dateInfo: string, dateInfoExtra?: number) => {
    switch(elementId) {

      case 'day-view-item-block-am':
        const newAmDate = new Date();
        newAmDate.setHours(Number(dateInfo), 0, 0, 0);
        return newAmDate;

      case 'day-view-item-block-pm':
        const newPmDate = new Date();
        const hours = Number(dateInfo) === 12 ? 12 : Number(dateInfo) + 12;
        newPmDate.setHours(hours, 0, 0, 0);
        return newPmDate;

      case 'week-view-item-block':
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const targetIndex = dayNames.indexOf(dateInfo);
        const today = new Date();
        const todaysIndex = today.getDay();
        const difference = dateInfo === 'Sunday' ? (7 - todaysIndex) : (targetIndex - todaysIndex); // if selected day is Sunday the date should be the next following sunday not the one for this week
        today.setDate(today.getDate() + difference);
        today.setHours(0, 0, 0, 0);
        return today;

      case 'month-view-item-block':
        const currentDate = new Date();
        const monthDay = Number(dateInfo.split("-")[0]); // take day number before the "-" and convert from string to number
        const monthDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), monthDay);
        currentDate.setHours(0, 0, 0, 0);
        return monthDate;

      case 'year-view-item-block':
        const currentYear = new Date().getUTCFullYear();
        const selectedDate = Number(dateInfo);
        const selectedMonth = dateInfoExtra ? dateInfoExtra : 0;
        const yearDate = new Date(currentYear, selectedMonth, selectedDate, 0, 0, 0, 0);
        return yearDate;

      default:
        return false;
    };
  };

  const storeSelectedViewingYear = (selectedYear: string) => {
    setCurrentViewingYear(selectedYear);
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
    calendarFormStatus,
    calendarNoteEditRequest,
    calendarEventEditRequest,
    changeCurrentView,
    handleCalendarTimeChangeRequest,
    handleActiveCalendarChange,
    handleActivateCalendarEditor,
    appendNewCalendarToUser,
    addNewCalendarNoteToCalendar,
    handleCalendarFormDataCleanup,
    updateCalendarNote,
    updateCalendarInUser,
    handleCalendarEventModificationRequest,
    storeSelectedViewingYear,
  };

  const calendarViewProps = {
    userId: userId,
    calendarDatesData,
    activeCalendars: activeCalendars,
    currentViewingYear,
    handleNotesForCalendarRequestToAddNewNote,
    handleCalendarNoteModificationRequest,
    removeCalendarNoteFromCalendar,
    handleCalendarEventModificationRequest,
    updateCalendarInUser,
    handleOpenAddEventFormClick,
  };

  if (calendarEditor.active === true) {
    return (
      <main className={styles.calendarContainer}>
        <EditCalendar 
          userId={userId} // to validate calendar changes if user is authorized
          selectedCalendar={calendarEditor.calendar}
          usersPreferredCalendarColors={usersPreferredCalendarColors}
          handleDeactivateCalendarEditor={handleDeactivateCalendarEditor}
          updateCalendarInUser={updateCalendarInUser}
          handleCalendarEditorChange={handleCalendarEditorChange}
          removeCalendarFromUser={removeCalendarFromUser}
          handleCalendarEventModificationRequest={handleCalendarEventModificationRequest}
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
              {...calendarViewProps}
              dayNotes={Object.keys(calendarNotesGrouped).length > 0 ? (calendarNotesGrouped as calendarNotesGrouped).dayNotes : []}
              dayEvents={Object.keys(calendarEventsGrouped).length > 0 ? (calendarEventsGrouped as calendarEventsGrouped).dayEvents : []}
            />
            <WeekView 
              {...calendarViewProps}
              weekNotes={Object.keys(calendarNotesGrouped).length > 0 ? (calendarNotesGrouped as calendarNotesGrouped).weekNotes : []}
              weekEvents={Object.keys(calendarEventsGrouped).length > 0 ? (calendarEventsGrouped as calendarEventsGrouped).weekEvents : []}
            />
            <MonthView 
              
              {...calendarViewProps}
              monthNotes={Object.keys(calendarNotesGrouped).length > 0 ? (calendarNotesGrouped as calendarNotesGrouped).monthNotes : []}
              monthEvents={Object.keys(calendarEventsGrouped).length > 0 ? (calendarEventsGrouped as calendarEventsGrouped).monthEvents : []}
            />
            <YearView 
              {...calendarViewProps}
              yearNotes={Object.keys(calendarNotesGrouped).length > 0 ? (calendarNotesGrouped as calendarNotesGrouped).yearNotes : []}
              yearEvents={Object.keys(calendarEventsGrouped).length > 0 ? (calendarEventsGrouped as calendarEventsGrouped).yearEvents : []}
            />
          </>
        );
      } else if (currentView === 'Day') {
        return (
          <DayView 
            {...calendarViewProps}
            dayNotes={Object.keys(calendarNotesGrouped).length > 0 ? (calendarNotesGrouped as calendarNotesGrouped).dayNotes : []}
            dayEvents={Object.keys(calendarEventsGrouped).length > 0 ? (calendarEventsGrouped as calendarEventsGrouped).dayEvents : []}
          />
        );
      } else if (currentView === 'Week') {
        return (
          <WeekView 
            {...calendarViewProps}
            weekNotes={Object.keys(calendarNotesGrouped).length > 0 ? (calendarNotesGrouped as calendarNotesGrouped).weekNotes : []}
            weekEvents={Object.keys(calendarEventsGrouped).length > 0 ? (calendarEventsGrouped as calendarEventsGrouped).weekEvents : []}
          />
        );
      } else if (currentView === 'Month') {
        return (
          <MonthView 
            {...calendarViewProps}
            monthNotes={Object.keys(calendarNotesGrouped).length > 0 ? (calendarNotesGrouped as calendarNotesGrouped).monthNotes : []}
            monthEvents={Object.keys(calendarEventsGrouped).length > 0 ? (calendarEventsGrouped as calendarEventsGrouped).monthEvents : []}
          />
        );
      } else if (currentView === 'Year') {
        return (
          <YearView 
            {...calendarViewProps} 
            yearNotes={Object.keys(calendarNotesGrouped).length > 0 ? (calendarNotesGrouped as calendarNotesGrouped).yearNotes : []}
            yearEvents={Object.keys(calendarEventsGrouped).length > 0 ? (calendarEventsGrouped as calendarEventsGrouped).yearEvents : []}
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