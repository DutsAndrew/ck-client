import React, { FC, useEffect, useState } from "react";
import styles from '../../styles/components/Calendar/calendar.module.css';
import { calendarNote, calendarNoteWithCalendarName, weekViewProps } from "../../types/interfaces";
import NotesForCalendar from "./NotesForCalendar";
import uniqid from "uniqid";

const WeekView: FC<weekViewProps> = (props): JSX.Element => {

  const { 
    currentDay,
    activeCalendars,
    handleNotesForCalendarRequestToAddNewNote,
  } = props;

  const week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [weekSnapshot, setWeekSnapShot] = useState('');

  // console.log('weekView reload')

  useEffect(() => {
    generateSnapShot();
  }, []);

  const generateSnapShot = () => {
    const currentDate = new Date(currentDay);
    const currentDayOfWeek = currentDate.getDay();
    const daysToAdd = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;
    const mondayDate = new Date(currentDate);
    mondayDate.setDate(currentDate.getDate() - daysToAdd); // Start of the week (Monday)

    const endDate = new Date(mondayDate);
    endDate.setDate(mondayDate.getDate() + 6); // End of the week (Sunday)

    const startFormatted = mondayDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const endFormatted = endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    setWeekSnapShot(`${startFormatted} - ${endFormatted}`);
  };

  const getWeekViewNotes = () => {
    const thisWeeksNotes: calendarNoteWithCalendarName[] = [];

    const currentYear = new Date().getFullYear();
    const beginningOfWeekSnap = weekSnapshot.split(' - ')[0];
    const endOfWeekSnap = weekSnapshot.split(' - ')[1];

    const beginningOfWeekDate = new Date(`${beginningOfWeekSnap}, ${currentYear}`);
    const endOfWeekDate = new Date(`${endOfWeekSnap}, ${currentYear}`);

    Array.isArray(activeCalendars) && activeCalendars.forEach((calendar) => {
      Array.isArray(calendar.calendar_notes) && calendar.calendar_notes.forEach((calendarNote: calendarNote) => {
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
          //
          && calendarNote.type === 'week'
        ) {
          const calendarNoteWithCalendarName: calendarNoteWithCalendarName = {
            ...calendarNote, 
            calendar_name: calendar.name,
          };
          thisWeeksNotes.push(calendarNoteWithCalendarName);
        };
      });
    });

    return thisWeeksNotes;
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
            calendarNotes={getWeekViewNotes()}
            handleNotesForCalendarRequestToAddNewNote={handleNotesForCalendarRequestToAddNewNote}
          />
        )}
      </div>
    </section>
  );
};

export default WeekView;