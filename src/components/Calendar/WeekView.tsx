import React, { FC, useEffect, useState } from "react";
import styles from '../../styles/components/Calendar/calendar.module.css';
import { calendarNote, weekViewProps } from "../../types/interfaces";
import NotesForCalendar from "./NotesForCalendar";
import uniqid from "uniqid";

const WeekView: FC<weekViewProps> = (props): JSX.Element => {

  const { 
    currentDay,
    activeCalendars,
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
    const thisWeeksNotes: calendarNote[] = [];

    const currentYear = new Date().getFullYear();
    const beginningOfWeekSnap = weekSnapshot.split(' - ')[0];
    const endOfWeekSnap = weekSnapshot.split(' - ')[1];

    const beginningOfWeekDate = new Date(`${beginningOfWeekSnap}, ${currentYear}`);
    const endOfWeekDate = new Date(`${endOfWeekSnap}, ${currentYear}`);

    activeCalendars.forEach((calendar) => {
      calendar.calendar_notes.forEach((calendarNote: calendarNote) => {
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
      <div className={styles.dayViewNotesContainer}>
        {Array.isArray(activeCalendars) && activeCalendars.length !== 0 && activeCalendars.map((calendar) => {
          return <NotesForCalendar 
            calendarNotes={getWeekViewNotes()}
          />
        })}
      </div>
    </section>
  );
};

export default WeekView;