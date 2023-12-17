import React, { FC, useEffect, useState } from "react";
import styles from '../../styles/components/Calendar/calendar.module.css';
import { 
  calendarNoteWithCalendarInfo,
  calendarNotesWithInfo,
  calendarViewStateForCalendarNotes,
  calendarWeekViewStateForCalendarEvents,
  eventObject,
  weekViewProps
} from "../../types/interfaces";
import NotesForCalendar from "./NotesForCalendar";
import uniqid from "uniqid";
import { getCalendarEventTimeForLocal, getDayOfWeekLocalTime, getLocalDateAndTimeForEvent, isUserAuthorized } from "../../scripts/calendarHelpers";
import EventViewer from "./EventViewer";

const WeekView: FC<weekViewProps> = (props): JSX.Element => {

  const { 
    userId,
    activeCalendars,
    handleNotesForCalendarRequestToAddNewNote,
    handleCalendarNoteModificationRequest,
    removeCalendarNoteFromCalendar,
    handleCalendarEventModificationRequest,
    updateCalendarInUser,
    weekNotes,
    weekEvents,
  } = props;

  const week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const generateSnapShot = () => {
    const currentDate = new Date();
    const currentDayOfWeek = currentDate.getDay();
    const daysToAdd = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;
    const mondayDate = new Date(currentDate);
    mondayDate.setDate(currentDate.getDate() - daysToAdd); // Start of the week (Monday)

    const endDate = new Date(mondayDate);
    endDate.setDate(mondayDate.getDate() + 6); // End of the week (Sunday)

    const startFormatted = mondayDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const endFormatted = endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    return `${startFormatted} - ${endFormatted}`;
  };

  const [weekSnapshot, setWeekSnapShot] = useState(generateSnapShot());
  const [weekViewNotes, setWeekViewNotes] = useState<calendarViewStateForCalendarNotes>([]);
  const [weekViewEvents, setWeekViewEvents] = useState<calendarWeekViewStateForCalendarEvents>({
    'monday': [],
    'tuesday': [],
    'wednesday': [],
    'thursday': [],
    'friday': [],
    'saturday': [],
    'sunday': [],
  });
  const [weekEventActivelyHovered, setWeekEventActivelyHovered] = useState('');
  const [eventViewStatus, setEventViewStatus] = useState({
    set: false,
    eventId: '',
  });

  useEffect(() => {
    setWeekViewNotes(getWeekViewNotes())
    setWeekViewEvents(getWeekViewEvents());
  }, [activeCalendars, weekNotes, weekEvents]);

  const getWeekViewNotes = () => {
    const thisWeeksNotes: calendarNotesWithInfo = [];

    const currentYear = new Date().getFullYear();
    const beginningOfWeekSnap = weekSnapshot.split(' - ')[0];
    const endOfWeekSnap = weekSnapshot.split(' - ')[1];

    const beginningOfWeekDate = new Date(`${beginningOfWeekSnap}, ${currentYear}`);
    const endOfWeekDate = new Date(`${endOfWeekSnap}, ${currentYear}`);

    Array.isArray(weekNotes) && weekNotes.forEach((calendarNote: calendarNoteWithCalendarInfo) => {
      const startDate = new Date(calendarNote.start_date);
      const endDate = new Date(calendarNote.end_date);
      if (
        beginningOfWeekDate.getFullYear() === startDate.getFullYear()
        && beginningOfWeekDate.getMonth() === startDate.getMonth()
        && beginningOfWeekDate.getDate() === startDate.getDate()
        //
        && endOfWeekDate.getFullYear() === endDate.getFullYear()
        && endOfWeekDate.getMonth() === endDate.getMonth()
        && endOfWeekDate.getDate() === endDate.getDate()
      ) {
        thisWeeksNotes.push(calendarNote);
      };
    });

    return thisWeeksNotes;
  };

  const getWeekViewEvents = () => {
    const currentWeeksEvents: calendarWeekViewStateForCalendarEvents = {
      'monday': [],
      'tuesday': [],
      'wednesday': [],
      'thursday': [],
      'friday': [],
      'saturday': [],
      'sunday': [],
    };

    weekEvents.forEach((event) => {
      const localDayOfWeek = getDayOfWeekLocalTime(event);
      switch(localDayOfWeek) {
        case 0:
          currentWeeksEvents.sunday.push(event);
          break;
        case 1:
          currentWeeksEvents.monday.push(event);
          break;
        case 2:
          currentWeeksEvents.tuesday.push(event);
          break;
        case 3:
          currentWeeksEvents.wednesday.push(event);
          break;
        case 4:
          currentWeeksEvents.thursday.push(event);
          break;
        case 5:
          currentWeeksEvents.friday.push(event);
          break;
        case 6:
          currentWeeksEvents.saturday.push(event);
          break;
      };
    });

    const sortedCurrentWeekEvents = sortWeekEvents(currentWeeksEvents);
    return sortedCurrentWeekEvents;
  };

  const sortWeekEvents = (currentDayEvents: calendarWeekViewStateForCalendarEvents) => {
    Object.keys(currentDayEvents).forEach(key => {
      (currentDayEvents as any)[key].sort(compareTimes);
    });

    return currentDayEvents;
  };

  const compareTimes = (eventA: eventObject, eventB: eventObject) => {
    const dateA = eventA.combined_date_and_time;
    const dateB = eventB.combined_date_and_time;
  
    const timeA = dateA ? new Date(dateA).getTime() : 0;
    const timeB = dateB ? new Date(dateB).getTime() : 0;

    if (timeA === 0 && timeB === 0) {
      return 0; // If both dates have no time, consider them equal
    } else if (timeA === 0) {
      return 1; // Put events with no time in dateA at the end
    } else if (timeB === 0) {
      return -1; // Put events with no time in dateB at the end
    } else {
      return timeA - timeB; // Compare by timestamps for events with specific times
    };
  };

  const handleMouseEnterEventContainer = (eventId: string) => {
    setWeekEventActivelyHovered(eventId);
  };

  const handleMouseLeaveEventContainer = () => {
    setWeekEventActivelyHovered('');
  };

  const handleEventClickToOpenEventMenu = (eventId: string) => {
    setEventViewStatus({
      set: true,
      eventId: eventId,
    });
  };

  const handleCloseEventViewerRequest = () => {
    setEventViewStatus({
      set: false,
      eventId: '',
    });
  };

  const handleEditEventRequest = (event: eventObject) => {
    handleCloseEventViewerRequest();
    handleCalendarEventModificationRequest(event.calendar_id, event);
  };

  const verifyUserAuthorizationOfCalendar = (calendarId: string) => {
    return isUserAuthorized(activeCalendars, calendarId, userId);
  };

  return (
    <section className={styles.weekViewContainer}>
      <p className={styles.currentDateText}>
        <strong>{weekSnapshot}</strong>
      </p>
      {eventViewStatus.set === true &&
        <EventViewer 
          event={weekEvents.find(event => event._id === eventViewStatus.eventId)} 
          handleCloseEventViewerRequest={handleCloseEventViewerRequest}
          handleEditEventRequest={handleEditEventRequest}
          verifyUserAuthorizationOfCalendar={verifyUserAuthorizationOfCalendar}
          updateCalendarInUser={updateCalendarInUser}
        />
      }
      <h2 className={styles.weekViewHeaderText}>Week View</h2>
      <div className={styles.weekDayContainer}>
        {week.map((day) => (
          <div className={styles.weekDayItem} key={uniqid()}>
            <p className={styles.weekDayItemText}>
              <strong><em>{day}</em></strong>
            </p>
            <div className={styles.weekDayItemBlock}>
              {(weekViewEvents as any)[`${day.toLowerCase()}`].map((event: eventObject) => {
                return <div 
                key={uniqid()}
                onMouseEnter={() => handleMouseEnterEventContainer(event._id)}
                onMouseLeave={() => handleMouseLeaveEventContainer()}
                onClick={() => handleEventClickToOpenEventMenu(event._id)}
                className={styles.weekViewEventContainer}
              >
                {weekEventActivelyHovered.includes(event._id) ? (
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
        ))}
      </div>
      <div className={styles.weekViewNotesContainer}>
        {Array.isArray(activeCalendars) && activeCalendars.length !== 0 && (
          <NotesForCalendar 
            userId={userId}
            calendarNotes={weekViewNotes}
            handleNotesForCalendarRequestToAddNewNote={handleNotesForCalendarRequestToAddNewNote}
            handleCalendarNoteModificationRequest={handleCalendarNoteModificationRequest}
            removeCalendarNoteFromCalendar={removeCalendarNoteFromCalendar}
          />
        )}
      </div>
    </section>
  );
};

export default WeekView;