import React, { FC, useEffect, useState } from "react";
import styles from '../../styles/components/Calendar/calendar.module.css';
import NotesForCalendar from "./NotesForCalendar";
import EventViewer from "./EventViewer";
import { 
  CalendarDatesData,
  calendarEventWithCalendarName,
  calendarNoteWithCalendarInfo,
  calendarNotesWithInfo,
  calendarViewStateForCalendarEvents,
  calendarViewStateForCalendarNotes,
  dayViewProps,
  timeSlotObject,
} from "../../types/calendarTypes";
import { 
  getDateForCurrentYear,
  getCalendarEventTimeForLocal, 
  isUserAuthorized, 
  compareEventTimes, 
  getEventColorScheme 
} from "../../scripts/calendarHelpers";

const DayView:FC<dayViewProps> = (props): JSX.Element => {

  const { 
    userId,
    calendarDatesData,
    activeCalendars,
    currentViewingYear,
    handleNotesForCalendarRequestToAddNewNote,
    handleCalendarNoteModificationRequest,
    removeCalendarNoteFromCalendar,
    handleCalendarEventModificationRequest,
    updateCalendarInUser,
    handleOpenAddEventFormClick,
    dayNotes,
    dayEvents,
  } = props;

  const [dayViewNotes, setDayViewNotes] = useState<calendarViewStateForCalendarNotes>([]);
  const [dayViewEvents, setDayViewEvents] = useState<calendarViewStateForCalendarEvents>({
    '5 AM': [],
    '6 AM': [],
    '7 AM': [],
    '8 AM': [],
    '9 AM': [],
    '10 AM': [],
    '11 AM': [],
    '12 PM': [],
    '1 PM': [],
    '2 PM': [],
    '3 PM': [],
    '4 PM': [],
    '5 PM': [],
    '6 PM': [],
    '7 PM': [],
    'none': [],
  });
  const [eventActivelyHovered, setEventActivelyHovered] = useState<String>('');
  const [eventViewStatus, setEventViewStatus] = useState({
    set: false,
    eventId: '',
  });

  useEffect(() => {
    setDayViewNotes(getDayViewNotes());
    setDayViewEvents(getDayViewEventsAndTimeSlots());
  }, [activeCalendars, dayNotes, dayEvents]);

  const getDayViewNotes = () => {
    const todaysNotes: calendarNotesWithInfo = [];
    const today = new Date(getDateForCurrentYear(currentViewingYear));

    Array.isArray(dayNotes) && dayNotes.forEach((calendarNote: calendarNoteWithCalendarInfo) => {
      const startDate = new Date(calendarNote.start_date);
      if (
        today.getFullYear() === startDate.getFullYear()
        && today.getMonth() === startDate.getMonth()
        && today.getDate() === startDate.getDate()
      ) {
        todaysNotes.push(calendarNote);
      };
    });

    return todaysNotes;
  };

  const getDayViewEventsAndTimeSlots = () => {
    const eventsForEachTimeSlot: timeSlotObject  = {
      '5 AM': [],
      '6 AM': [],
      '7 AM': [],
      '8 AM': [],
      '9 AM': [],
      '10 AM': [],
      '11 AM': [],
      '12 PM': [],
      '1 PM': [],
      '2 PM': [],
      '3 PM': [],
      '4 PM': [],
      '5 PM': [],
      '6 PM': [],
      '7 PM': [],
      'none': [],
    };

    dayEvents.forEach((event) => {
      const doesEventHaveTimeSet = event.event_time.length > 0 ? true : false;
      if (doesEventHaveTimeSet) {
        const eventTimeSlot = buildEventTimeSlot(event);
        switch(eventTimeSlot) {
          case '5 AM':
            eventsForEachTimeSlot["5 AM"].push(event);
            break;
          case '6 AM':
            eventsForEachTimeSlot["6 AM"].push(event);
            break;
          case '7 AM':
            eventsForEachTimeSlot["7 AM"].push(event);
            break;
          case '8 AM':
            eventsForEachTimeSlot["8 AM"].push(event);
            break;
          case '9 AM':
            eventsForEachTimeSlot["9 AM"].push(event);
            break;
          case '10 AM':
            eventsForEachTimeSlot["10 AM"].push(event);
            break;
          case '11 AM':
            eventsForEachTimeSlot["11 AM"].push(event);
            break;
          case '12 PM':
            eventsForEachTimeSlot["12 PM"].push(event);
            break;
          case '1 PM':
            eventsForEachTimeSlot["1 PM"].push(event);
            break;
          case '2 PM':
            eventsForEachTimeSlot["2 PM"].push(event);
            break;
          case '3 PM':
            eventsForEachTimeSlot["3 PM"].push(event);
            break;
          case '4 PM':
            eventsForEachTimeSlot["4 PM"].push(event);
            break;
          case '5 PM':
            eventsForEachTimeSlot["5 PM"].push(event);
            break;
          case '6 PM':
            eventsForEachTimeSlot["6 PM"].push(event);
            break;
          case '7 PM':
            eventsForEachTimeSlot["7 PM"].push(event);
            break;
          default:
            eventsForEachTimeSlot["none"].push(event);
            break;
        }
      } else {
        eventsForEachTimeSlot.none.push(event);
      };
    });

    const sortedTimeSlots = sortDayViewEventTimeSlots(eventsForEachTimeSlot);

    return sortedTimeSlots;
  };

  const buildEventTimeSlot = (event: calendarEventWithCalendarName) => {
    const convertedTime = getCalendarEventTimeForLocal(event);
    let eventHour = convertedTime.slice(0, 2);
    const timeOfDay = convertedTime.split(" ")[1]; // grab the AM / PM part of time
    if (eventHour.slice(0, 1) === '0') { // remove leading zero in hour format
      eventHour = eventHour.slice(1);
    };
    const eventTimeSlotFormat = `${eventHour} ${timeOfDay}`;
    return eventTimeSlotFormat; 
  };

  const sortDayViewEventTimeSlots = (timeSlots: timeSlotObject) => {  
    Object.keys(timeSlots).forEach(key => {
      (timeSlots as any)[key].sort(compareEventTimes);
    });

    return timeSlots;
  };

  const generateBlockSchedule = () => {
    const scheduleBlock = [
      "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM",
      "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM",
    ];

    const amBlock = scheduleBlock
      .filter((item) => item.split(' ')[1] === 'AM')
      .map((item) => item.split(' ')[0]);

    const pmBlock = scheduleBlock
      .filter((item) => item.split(' ')[1] === 'PM')
      .map((item) => item.split(' ')[0]);

    return {
      am: amBlock,
      pm: pmBlock,
    };
  };

  const handleMouseEnterEventContainer = (eventId: string) => {
    setEventActivelyHovered(eventId);
  };

  const handleMouseLeaveEventContainer = () => {
    setEventActivelyHovered('');
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

  const blockSchedule = generateBlockSchedule();

  return (
    <section className={styles.dayViewContainer}>
      <p className={styles.currentDateText}>
        <strong>{getDateForCurrentYear(currentViewingYear)}</strong>
      </p>
      {eventViewStatus.set === true &&
        <EventViewer 
          event={dayEvents.find(event => event._id === eventViewStatus.eventId)} 
          handleCloseEventViewerRequest={handleCloseEventViewerRequest}
          handleEditEventRequest={handleEditEventRequest}
          verifyUserAuthorizationOfCalendar={verifyUserAuthorizationOfCalendar}
          updateCalendarInUser={updateCalendarInUser}
        />
      }
      <h2 className={styles.dayViewHeaderText}>
        Day View
      </h2>
      <div className={styles.dayViewItemsContainer}>
        <div className={styles.AMDayScheduleContainer}>
          <p className={styles.AMDayScheduleHeaderText}>
            AM
          </p>
          <div className={styles.AMBlockContainer}>
            {blockSchedule.am.map((block) => {
              return <div
                className={styles.AMDayScheduleItem}
                key={`day-view${block}-AM`}
                onClick={(event) => {
                  if (
                    (event.target as any).id === 'day-view-block-text'
                    || (event.target as any).id === 'day-view-block-container'
                  ) {
                    handleOpenAddEventFormClick('day-view-item-block-am', block);
                  };
                }}
              >
              <p 
                id="day-view-block-text"
                className={styles.AMDayScheduleText}
              >
                {block}
              </p>
              <div 
                id="day-view-block-container"
                className={styles.AMDayScheduleBlock}
              >
                {(dayViewEvents as any)[`${block} AM`].map((event: calendarEventWithCalendarName) => {
                  // marking as any the styles are very visibly being applied here
                  const eventStyle: any = {};
                  if (event.event_background_color) {
                    eventStyle.backgroundColor = event.event_background_color;
                  };
                  if (event.event_font_color) {
                    eventStyle.color = event.event_font_color;
                  };

                  return <div 
                    id="day-view-event-item"
                    key={`day-view-event-${event._id}`}
                    style={getEventColorScheme(event)}
                    onMouseEnter={() => handleMouseEnterEventContainer(event._id)}
                    onMouseLeave={() => handleMouseLeaveEventContainer()}
                    onClick={() => handleEventClickToOpenEventMenu(event._id)}
                    className={styles.AMEventContainer}
                  >
                    {eventActivelyHovered.includes(event._id) ? (
                     <span>
                      {getCalendarEventTimeForLocal(event)}
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
            })}
          </div>
        </div>
        <div className={styles.PMDayScheduleContainer}>
          <p className={styles.PMDayScheduleHeaderText}>
            PM
          </p>
          <div className={styles.PMBlockContainer}>
            {blockSchedule.pm.map((block) => {
              return <div
                className={styles.PMDayScheduleItem}
                key={`day-view${block}-PM`}
                onClick={(event) => {
                  if (
                    (event.target as any).id === 'day-view-block-text'
                    || (event.target as any).id === 'day-view-block-container'
                  ) {
                    handleOpenAddEventFormClick('day-view-item-block-am', block);
                  };
                }}
              >
              <p 
                id="day-view-block-text"
                className={styles.PMDayScheduleText}
              >
                {block}
              </p>
              <div 
                id="day-view-block-container"
                className={styles.PMDayScheduleBlock}
              >
                {(dayViewEvents as any)[`${block} PM`].map((event: calendarEventWithCalendarName) => {
                  return <div 
                    id="day-view-event-item"
                    key={`day-view-event-${event._id}`}
                    style={getEventColorScheme(event)}
                    onMouseEnter={() => handleMouseEnterEventContainer(event._id)}
                    onMouseLeave={() => handleMouseLeaveEventContainer()}
                    onClick={() => handleEventClickToOpenEventMenu(event._id)}
                    className={styles.PMEventContainer}
                  >
                    {eventActivelyHovered.includes(event._id) ? (
                     <span className={styles.eventDetailSpanText}>
                      {getCalendarEventTimeForLocal(event)}
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
            })}
          </div>
        </div>
      </div>
      <div className={styles.dayViewNotesContainer}>
        {Array.isArray(activeCalendars) && activeCalendars.length !== 0 &&  (
          <NotesForCalendar 
            userId={userId}
            calendarNotes={dayViewNotes}
            handleNotesForCalendarRequestToAddNewNote={handleNotesForCalendarRequestToAddNewNote}
            handleCalendarNoteModificationRequest={handleCalendarNoteModificationRequest}
            removeCalendarNoteFromCalendar={removeCalendarNoteFromCalendar}
          />
        )}
      </div>
    </section>
  );
};

export default DayView;