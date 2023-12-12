import React, { FC, useEffect, useState } from "react";
import styles from '../../styles/components/Calendar/calendar.module.css';
import { 
  calendarNoteWithCalendarInfo,
  calendarNotesWithInfo,
  calendarViewStateForCalendarNotes,
  dayViewProps,
} from "../../types/interfaces";
import NotesForCalendar from "./NotesForCalendar";
import uniqid from "uniqid";

const DayView:FC<dayViewProps> = (props): JSX.Element => {

  const { 
    userId,
    currentDay,
    activeCalendars,
    handleNotesForCalendarRequestToAddNewNote,
    handleCalendarNoteModificationRequest,
    removeCalendarNoteFromCalendar,
    dayNotes,
    dayEvents,
  } = props;

  console.log(dayEvents)

  const [dayViewNotes, setDayViewNotes] = useState<calendarViewStateForCalendarNotes>([]);

  useEffect(() => {
    setDayViewNotes(getDayViewNotes())
  }, [activeCalendars, dayNotes]);

  const getDayViewNotes = () => {
    const todaysNotes: calendarNotesWithInfo = [];
    const today = new Date(currentDay);

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

  const blockSchedule = generateBlockSchedule();

  return (
    <section className={styles.dayViewContainer}>
      <p className={styles.currentDateText}>
        <strong>{currentDay}</strong>
      </p>
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
                This is some boiler text to test this thing.
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
                This is some boiler text to test this thing.
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