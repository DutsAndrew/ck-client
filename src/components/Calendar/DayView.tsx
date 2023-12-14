import React, { FC, useEffect, useState } from "react";
import styles from '../../styles/components/Calendar/calendar.module.css';
import { 
  calendarNoteWithCalendarInfo,
  calendarNotesWithInfo,
  calendarViewStateForCalendarEvents,
  calendarViewStateForCalendarNotes,
  dayViewProps,
  eventObject,
  timeSlotObject,
} from "../../types/interfaces";
import NotesForCalendar from "./NotesForCalendar";
import EventViewer from "./EventViewer";
import uniqid from "uniqid";
import { getTodaysDate, getCalendarEventTimeForLocal } from "../../scripts/calendarHelpers";

const DayView:FC<dayViewProps> = (props): JSX.Element => {

  const { 
    userId,
    activeCalendars,
    handleNotesForCalendarRequestToAddNewNote,
    handleCalendarNoteModificationRequest,
    removeCalendarNoteFromCalendar,
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
    setDayViewEvents(getDayViewTimeSlots());
  }, [activeCalendars, dayNotes, dayEvents]);

  const getDayViewNotes = () => {
    const todaysNotes: calendarNotesWithInfo = [];
    const today = new Date(getTodaysDate());

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

  const getDayViewTimeSlots = () => {
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

  const buildEventTimeSlot = (event: eventObject) => {
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
      (timeSlots as any)[key].sort(compareDates);
    });

    return timeSlots;
  };

  const compareDates = (eventA: eventObject, eventB: eventObject) => {
    const dateA = eventA.combined_date_and_time ? new Date(eventA.combined_date_and_time) : new Date(eventA.event_date);
    const dateB = eventB.combined_date_and_time ? new Date(eventB.combined_date_and_time) : new Date(eventA.event_date);
  
    if (dateA && dateB) {
      return dateA.getTime() - dateB.getTime();
    } else if (dateA) {
      return -1; // Put events with dateA first
    } else if (dateB) {
      return 1; // Put events with dateB first
    } else {
      return 0; // If both dates are missing, consider them equal
    }
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
    setEventViewStatus({
      set: false,
      eventId: '',
    });
  };

  const blockSchedule = generateBlockSchedule();

  return (
    <section className={styles.dayViewContainer}>
      <p className={styles.currentDateText}>
        <strong>{getTodaysDate()}</strong>
      </p>
      {eventViewStatus.set === true &&
        <EventViewer 
          event={dayEvents.find(event => event._id === eventViewStatus.eventId)} 
          handleCloseEventViewerRequest={handleCloseEventViewerRequest}
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
                key={uniqid()}
              >
              <p className={styles.AMDayScheduleText}>
                {block}
              </p>
              <div className={styles.AMDayScheduleBlock}>
                {(dayViewEvents as any)[`${block} AM`].map((event: eventObject) => {
                  return <div 
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
                key={uniqid()}
              >
              <p className={styles.PMDayScheduleText}>
                {block}
              </p>
              <div className={styles.PMDayScheduleBlock}>
                {(dayViewEvents as any)[`${block} PM`].map((event: eventObject) => {
                  return <div 
                    onMouseEnter={() => handleMouseEnterEventContainer(event._id)}
                    onMouseLeave={() => handleMouseLeaveEventContainer()}
                    onClick={() => handleEventClickToOpenEventMenu(event._id)}
                    className={styles.PMEventContainer}
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