import React, { FC, useState, useEffect } from "react";
import { 
  CalendarDatesData,
  calendarEventWithCalendarName,
  calendarNoteWithCalendarInfo,
  calendarNotesWithInfo,
  calendarViewStateForCalendarNotes,
  monthViewProps 
} from "../../types/calendarTypes";
import styles from '../../styles/components/Calendar/calendar.module.css';
import NotesForCalendar from "./NotesForCalendar";
import uniqid from "uniqid";
import { compareEventTimes, getCalendarEventTimeForLocal, getEventDate, isUserAuthorized } from "../../scripts/calendarHelpers";
import EventViewer from "./EventViewer";

const MonthView:FC<monthViewProps> = (props): JSX.Element => {

  const { 
    userId,
    activeCalendars,
    calendarDatesData,
    handleNotesForCalendarRequestToAddNewNote,
    handleCalendarNoteModificationRequest,
    removeCalendarNoteFromCalendar,
    handleCalendarEventModificationRequest,
    updateCalendarInUser,
    monthNotes,
    monthEvents,
  } = props;

  const [monthViewNotes, setMonthViewNotes] = useState<calendarViewStateForCalendarNotes>([]);
  const [monthViewEvents, setMonthViewEvents] = useState<Map<string, any[]>>();
  const [monthEventActivelyHovered, setMonthEventActivelyHovered] = useState('');
  const [eventViewStatus, setEventViewStatus] = useState({
    set: false,
    eventId: '',
  });

  useEffect(() => {
    setMonthViewNotes(getMonthViewNotes());
    setMonthViewEvents(getMonthViewEvents());
  }, [activeCalendars, monthNotes, monthEvents]);

  const getMonthViewNotes = () => {
    const thisMonthsNotes: calendarNotesWithInfo = [];

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    Array.isArray(monthNotes) && monthNotes.forEach((calendarNote: calendarNoteWithCalendarInfo) => {
      const startDate = new Date(calendarNote.start_date);
      if (
       startDate.getFullYear() === currentYear
       && startDate.getMonth() === currentMonth
      ) {
        thisMonthsNotes.push(calendarNote);
      };
    });

    return thisMonthsNotes;
  };

  const week = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
  ];

  const calendarMonths = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const getTodaysYear = () => {
    return new Date().getFullYear();;
  };

  const getTodaysMonth = () => {
    return new Date().getMonth();
  };

  const getMonthPreview = () => {
    const todaysYear = getTodaysYear();
    const currentYearAndDates = (calendarDatesData as CalendarDatesData).calendar_dates[todaysYear];

    const month = getTodaysMonth();
    const currentMonth = calendarMonths[month];

    return currentYearAndDates[currentMonth];
  };

  const generateMonthCalendar = () => {
    if (Object.keys(calendarDatesData).length === 0) return [];

    const preview: any = getMonthPreview();
    const monthStartsOn = preview.month_starts_on;
    const numberOfDays = preview.days;

    const calendar = [];

    const weekStartIndex = week.indexOf(monthStartsOn);
    const numberOfPrecedingDays = week.slice(0, weekStartIndex).length;
    
    // add any week days that are not in current month but are on the first week
    for (let i = 0; i < numberOfPrecedingDays; i++) {
      calendar.push(`${week[i]}`);
    };

    // add all of month's weekdays
    let weekLoopIndex = weekStartIndex;
    for (let i = 1; i < numberOfDays + 1; i++) {
      calendar.push(`${i}-${week[weekLoopIndex]}`)
      if (weekLoopIndex === week.length - 1) {
        weekLoopIndex = 0;
      } else {
        weekLoopIndex++;
      };
    };

    // add any remaining days of the week that are left at end of month
    for (let i = weekLoopIndex; i < week.length; i++) {
      calendar.push(`${week[i]}`);
    };

    return calendar;
  };

  const getMonthViewEvents = () => {
    const calendarDays = generateMonthCalendar();
    const mapForDaysInMonth = buildMapForDaysInMonth(calendarDays);
    const mapWithEvents = addEventsToMapForMonth(mapForDaysInMonth);
    const sortedMapWithEvents = sortMonthEvents(mapWithEvents);
    return sortedMapWithEvents;
  };

  const buildMapForDaysInMonth = (calendarDays: String[]) => {
    const mapForDaysInMonth = new Map<string, any[]>();

    calendarDays.forEach((day) => {
      const isDayInMonth = day.includes("-");
      if (isDayInMonth) {
        const dayNumber = day.split("-")[0];
        mapForDaysInMonth.set(dayNumber, []);
      };
    });

    return mapForDaysInMonth;
  };

  const addEventsToMapForMonth = (mapForDaysInMonth: Map<string, any[]>) => {
    monthEvents.forEach((event) => {
      const eventDate = getEventDate(event).toString();
      const mapArray = mapForDaysInMonth.get(eventDate);
      if (mapArray) {
        mapArray.push(event);
      };
    });

    return mapForDaysInMonth;
  };

  const sortMonthEvents = (monthMapOfEvents: Map<string, any[]>) => {
    monthMapOfEvents.forEach((eventsArray: calendarEventWithCalendarName[]) => {
      eventsArray.sort(compareEventTimes);
    });
  
    return monthMapOfEvents;
  };

  const handleMouseEnterEventContainer = (eventId: string) => {
    setMonthEventActivelyHovered(eventId);
  };

  const handleMouseLeaveEventContainer = () => {
    setMonthEventActivelyHovered('');
  };

  const handleEventClickToOpenEventMenu = (eventId: string) => {
    setEventViewStatus({
      set: true,
      eventId: eventId,
    });
  };

  const handleCloseEventViewerRequest = () => {
    handleMouseLeaveEventContainer();
    setEventViewStatus({
      set: false,
      eventId: '',
    });
  };

  const handleEditEventRequest = (event: calendarEventWithCalendarName) => {
    handleCloseEventViewerRequest();
    handleCalendarEventModificationRequest(event.calendar_id, event);
  };

  const verifyUserAuthorizationOfCalendar = (calendarId: string) => {
    return isUserAuthorized(activeCalendars, calendarId, userId);
  };

  return (
    <section className={styles.monthViewContainer}>
      {eventViewStatus.set === true &&
        <EventViewer 
          event={monthEvents.find(event => event._id === eventViewStatus.eventId)} 
          handleCloseEventViewerRequest={handleCloseEventViewerRequest}
          handleEditEventRequest={handleEditEventRequest}
          verifyUserAuthorizationOfCalendar={verifyUserAuthorizationOfCalendar}
          updateCalendarInUser={updateCalendarInUser}
        />
      }
      <h2 className={styles.monthViewHeaderText}>
        Month View
      </h2>
      <h2 className={styles.currentMonthText}>
        {calendarMonths[new Date().getMonth()]}
      </h2>
      <div className={styles.monthItemsContainer}>
        {Object.keys((calendarDatesData as CalendarDatesData)).length > 0 ? generateMonthCalendar().map((item) => {
          const isAccurateMonthDate = item.includes('-');
          const containerClass = isAccurateMonthDate
          ? styles.monthItemValidDateContainer
          : styles.monthItemInvalidDateContainer;

          return <div 
            key={isAccurateMonthDate ? item : `${uniqid()}-item`}
            className={`${styles.monthItemContainer} ${containerClass}`}
          >
            <p className={styles.monthItemWeekDayText}>
              {item.includes('-') ? item.split('-')[1] : item}
            </p>
            <p className={styles.monthItemDateNumberText}>
              {item.includes('-') ? item.split('-')[0] : ''}
            </p>
            <div className={styles.monthViewEventsContainer}>
              {monthViewEvents?.get(item.includes('-') ? item.split('-')[0] : '')?.map((event: calendarEventWithCalendarName) => {
                return <div 
                key={event._id}
                onMouseEnter={() => handleMouseEnterEventContainer(event._id)}
                onMouseLeave={handleMouseLeaveEventContainer}
                onClick={() => handleEventClickToOpenEventMenu(event._id)}
                className={styles.monthViewEventContainer}
              >
                {monthEventActivelyHovered.includes(event._id) ? (
                 <span>
                  {event.event_time.length > 0 ? getCalendarEventTimeForLocal(event) : 'No time set'}
                 </span>
                ) : (
                  <span>
                    {event.event_name.length > 10 ? `${event.event_name.slice(0, 10)}...` : event.event_name}
                  </span>
                )}
              </div>
              })}
            </div>
          </div>
        }) : 
          <p>Loading Data...</p>
        }
      </div>
      <div className={styles.monthViewNotesContainer}>
        {Array.isArray(activeCalendars) && activeCalendars.length !== 0 && (
          <NotesForCalendar 
            userId={userId}
            calendarNotes={monthViewNotes}
            handleNotesForCalendarRequestToAddNewNote={handleNotesForCalendarRequestToAddNewNote}
            handleCalendarNoteModificationRequest={handleCalendarNoteModificationRequest}
            removeCalendarNoteFromCalendar={removeCalendarNoteFromCalendar}
          />
        )}
      </div>
    </section>
  );
};

export default MonthView;