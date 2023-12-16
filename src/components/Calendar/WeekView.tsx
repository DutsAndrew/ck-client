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
import { getDayOfWeekLocalTime, getLocalDateAndTimeForEvent } from "../../scripts/calendarHelpers";

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

    console.log(sortedCurrentWeekEvents);

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

  return (
    <section className={styles.weekViewContainer}>
      <p className={styles.currentDateText}>
        <strong>{weekSnapshot}</strong>
      </p>
      <h2 className={styles.weekViewHeaderText}>Week View</h2>
      <div className={styles.weekDayContainer}>
        {week.map((day) => (
          <div className={styles.weekDayItem} key={uniqid()}>
            <p className={styles.weekDayItemText}>
              <strong><em>{day}</em></strong>
            </p>
            <div className={styles.weekDayItemBlock}>
              {/* Render API events here */}
              This is some boilerplate text to see how it looks
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