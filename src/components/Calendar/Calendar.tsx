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
  calendarEventsGrouped
} from '../../types/interfaces';

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
  } = props;

    const [currentView, setCurrentView] = useState('All'),
    [calendarEditor, setCalendarEditor] = useState<calendarEditorState>({
      active: false,
      calendar: {},
    }),
    [activeCalendars, setActiveCalendars]= useState<activeCalendarState>(
      [usersPersonalCalendar]
    ),
    [calendarFormStatus, setCalendarFormStatus] = useState({
      // state in case user shortcuts the calendar form by interacting with the calendar app instead of clicking the "plus" sign
      event: false,
      note: false,
      calendar: false,
    }),
    [calendarNoteEditRequest, setCalendarNoteEditRequest] = useState({
      calendarId: '',
      note: {},
      status: false,
    }),
    [calendarNotesGrouped, setCalendarNotesGrouped] = useState<calendarNotesGroupedState>({}),
    [calendarEventsGrouped, setCalendarEventsGrouped] = useState<calendarEventsGroupedState>({});

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
  }, [usersPersonalCalendar, usersTeamCalendars, usersPendingCalendars]);

  useEffect(() => {
    groupCalendarNotes();
    groupEvents();
  }, [activeCalendars]);

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
      note: true,
      calendar: false,
    });
  };

  const handleCalendarFormDataCleanup = () => {
    setCalendarFormStatus({
      event: false,
      note: false,
      calendar: false,
    });
    
    if (calendarNoteEditRequest.status === true) {
      handleCancelCalendarNoteModificationRequest();
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

  const doesUserHaveCalendarAccess = (calendarId: string) => {
    let doesUserHaveAccess = false;

    activeCalendars.forEach((calendar) => {
      if (calendar._id === calendarId) {
        calendar.authorized_users.forEach((user) => {
          if (user._id === userId) {
            doesUserHaveAccess = true;
          };
        });
      };
    });

    return doesUserHaveAccess;
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

    const dayEvents: Object[] = [];
    const weekEvents: Object[] = [];
    const monthEvents: Object[] = [];
    const yearEvents: Object[] = [];

    Array.isArray(activeCalendars) && activeCalendars.forEach((calendar) => {
      if (calendar && calendar.events) {
        Array.isArray(calendar.events) && calendar.events.forEach((event) => {
          const eventDate = new Date(event.event_date);
          const eventGroup = identifyEventCategory(eventDate);
          switch(eventGroup) {
            case 'day':
              dayEvents.push(event);
              break;
            case 'week':
              weekEvents.push(event);
              break;
            case 'month':
              monthEvents.push(event);
              break;
            case 'year':
              yearEvents.push(event);
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

    return setCalendarEventsGrouped(events);
  };

  const identifyEventCategory = (eventDate: Date) => {
    const today = new Date();
    
    // see if event is for today
    if (
      eventDate.getFullYear() === today.getFullYear()
      && eventDate.getMonth() === today.getMonth()
      && eventDate.getDate() === today.getDate()
    ) {
      return 'day';
    };

    // see if event is for this week
    const thisWeeksSnapshot = getWeekSnapshot(today);
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
      today.getFullYear() === eventDate.getFullYear()
      && today.getMonth() === eventDate.getMonth()
    ) {
      return 'month';
    };

    // see if event is for this year
    if (
      today.getFullYear() === eventDate.getFullYear()
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
    changeCurrentView,
    handleCalendarTimeChangeRequest,
    handleActiveCalendarChange,
    handleActivateCalendarEditor,
    appendNewCalendarToUser,
    addNewCalendarNoteToCalendar,
    handleCalendarFormDataCleanup,
    updateCalendarNote,
    updateCalendarInUser,
  };

  const calendarViewProps = {
    userId: userId,
    activeCalendars: activeCalendars,
    handleNotesForCalendarRequestToAddNewNote,
    handleCalendarNoteModificationRequest,
    removeCalendarNoteFromCalendar,
  };

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
              calendarDatesData={calendarDatesData}
              {...calendarViewProps}
              monthNotes={Object.keys(calendarNotesGrouped).length > 0 ? (calendarNotesGrouped as calendarNotesGrouped).monthNotes : []}
              monthEvents={Object.keys(calendarEventsGrouped).length > 0 ? (calendarEventsGrouped as calendarEventsGrouped).monthEvents : []}
            />
            <YearView 
              calendarDatesData={calendarDatesData}
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
            calendarDatesData={calendarDatesData}
            {...calendarViewProps}
            monthNotes={Object.keys(calendarNotesGrouped).length > 0 ? (calendarNotesGrouped as calendarNotesGrouped).monthNotes : []}
            monthEvents={Object.keys(calendarEventsGrouped).length > 0 ? (calendarEventsGrouped as calendarEventsGrouped).monthEvents : []}
          />
        );
      } else if (currentView === 'Year') {
        return (
          <YearView 
            calendarDatesData={calendarDatesData}
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