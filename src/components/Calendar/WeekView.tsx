import React, { FC, useEffect, useState } from "react";
import styles from '../../styles/components/Calendar/calendar.module.css';
import NotesForCalendar from "./NotesForCalendar";
import EventViewer from "./EventViewer";
import { 
  calendarEventWithCalendarName,
  calendarNoteWithCalendarInfo,
  calendarNotesWithInfo,
  calendarViewStateForCalendarNotes,
  calendarWeekViewStateForCalendarEvents,
  weekViewProps
} from "../../types/calendarTypes";
import { 
  compareEventTimes, 
  getCalendarEventTimeForLocal, 
  getDayOfWeekLocalTime, 
  getEventColorScheme, 
  isUserAuthorized 
} from "../../scripts/calendarHelpers";


const WeekView: FC<weekViewProps> = (props): JSX.Element => {

  const { 
    userId,
    activeCalendars,
    handleNotesForCalendarRequestToAddNewNote,
    handleCalendarNoteModificationRequest,
    removeCalendarNoteFromCalendar,
    handleCalendarEventModificationRequest,
    updateCalendarInUser,
    handleOpenAddEventFormClick,
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
      (currentDayEvents as any)[key].sort(compareEventTimes);
    });

    return currentDayEvents;
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
          <div 
            id="week-view-item-block"
            className={styles.weekDayItem} 
            key={`week-view-${day}`}
            onClick={(e) => handleOpenAddEventFormClick(e)}
          >
            <p className={styles.weekDayItemText}>
              <strong><em>{day}</em></strong>
            </p>
            <div className={styles.weekDayItemBlock}>
              {(weekViewEvents as any)[`${day.toLowerCase()}`].map((event: calendarEventWithCalendarName) => {
                return <div 
                key={`week-view-event-${event._id}`}
                style={getEventColorScheme(event)}
                onMouseEnter={() => handleMouseEnterEventContainer(event._id)}
                onMouseLeave={() => handleMouseLeaveEventContainer()}
                onClick={() => handleEventClickToOpenEventMenu(event._id)}
                className={styles.weekViewEventContainer}
              >
                {weekEventActivelyHovered.includes(event._id) ? (
                 <span className={styles.eventDetailSpanText}>
                  {event.event_time.length > 0 ? getCalendarEventTimeForLocal(event) : 'No time set'}
                 </span>
                ) : (
                  <span className={styles.eventDetailSpanText}>
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