import React, { FC } from "react";
import styles from '../../styles/components/Calendar/calendar.module.css';
import { CalendarDatesData, calendarNote, yearViewProps } from "../../types/interfaces";
import NotesForCalendar from "./NotesForCalendar";
import uniqid from 'uniqid';

const YearView:FC<yearViewProps> = (props): JSX.Element => {

  const { 
    currentDay,
    activeCalendars,
    calendarDatesData,
  } = props;

  const week = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
  ];

  const calendarMonths = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const getTodaysYear = () => {
    return new Date().getFullYear();
  };

  const getCurrentYearFromAppData = () => {
    const year = getTodaysYear();
    return (calendarDatesData as CalendarDatesData).calendar_dates[Number(year)];
  };

  const generateCurrentYearView = () => {
    const yearView: any[] = [];

    const userCalendar = getCurrentYearFromAppData();
    
    // loop through all months
    calendarMonths.forEach((month) => {
      const userCalendarMonth: any = userCalendar[month];
      const monthStartsOn = userCalendarMonth.month_starts_on;
      const monthNumberOfDays = userCalendarMonth.days;

      const monthLayout = [];

      const weekStartIndex = week.indexOf(monthStartsOn);
      const numberOfPrecedingDays = week.slice(0, weekStartIndex).length;

      // add preceding week days
      for (let i = 0; i < numberOfPrecedingDays; i++) {
        monthLayout.push('');
      };

      // add all month's week days
      let weekLoopIndex = weekStartIndex;
      for (let i = 1; i < monthNumberOfDays + 1; i++) {
        monthLayout.push(`${i}`);
        if (weekLoopIndex === week.length - 1) {
          weekLoopIndex = 0;
        } else {
          weekLoopIndex++
        };
      };

      // add remaining days of week
      for (let i = weekLoopIndex; i < week.length; i++) {
        if (week[i] === 'Monday') break;
        monthLayout.push('');
      };

      yearView.push(monthLayout);
    });

    return yearView;
  };

  const getYearViewNotes = () => {
    const thisYearsNotes: calendarNote[] = [];

    const currentYear = new Date().getFullYear();

    Array.isArray(activeCalendars) && activeCalendars.forEach((calendar) => {
      Array.isArray(calendar.calendar_notes) && calendar.calendar_notes.forEach((calendarNote: calendarNote) => {
        const startDate = new Date(calendarNote.start_date);
        if (
         startDate.getFullYear() === currentYear
         && calendarNote.type === 'year'
        ) {
          thisYearsNotes.push(calendarNote);
        };
      });
    });

    return thisYearsNotes;
  };

  if (Object.keys(calendarDatesData).length > 0) { // if calendarData has been mounted in "App" from "Calendar parent component"
    const yearView = generateCurrentYearView();
    return (
      <section className={styles.yearViewContainer}>
        <h2 className={styles.yearViewHeaderText}>
          Year View
        </h2>
        <h2 className={styles.currentYearText}>
          {getTodaysYear()}
        </h2>
        <div className={styles.yearItemsContainer}>
          {yearView.map((month) => (
            <div
              key={uniqid()}
              className={styles.yearMonthContainer}
            >
              <h3 className={styles.yearViewMonthHeaderText}>
                {calendarMonths[yearView.indexOf(month)]}
              </h3>
              <div className={styles.yearViewMonthItemsContainer}>
                <div className={styles.dayOfWeekListContainer}>
                  {week.map((day) => {
                    return (
                      <div 
                        key={day}
                        className={styles.dayOfWeekListItemContainer}
                      >
                        <p 
                          className={styles.dayOfWeekListItemText}
                          key={uniqid()}
                        >
                          {day.slice(0,1)}
                        </p>
                      </div>
                    )
                  })}
                </div>
                {month.map((day: any) => {
                  const isAccurateMonthDate = day.length > 0;
                  const containerClass = isAccurateMonthDate
                    ? styles.monthItemValidDateContainer
                    : styles.monthItemInvalidDateContainer;

                  return (
                    <div
                      key={uniqid()}
                      className={`${styles.yearViewMonthItemContainer} ${containerClass}`}
                    >
                      <p className={styles.yearViewMonthItemDateNumberText}>
                        {day.length > 0 ? day : ''}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.yearViewNotesContainer}>
        {Array.isArray(activeCalendars) && activeCalendars.length !== 0 && (
          <NotesForCalendar 
            calendarNotes={getYearViewNotes()}
          />
        )}
      </div>
      </section>
    );
  } else { // for when calendarData hasn't been mounted from "Calendar" to "App"
    return (
      <section className={styles.yearViewContainer}>
        <h2 className={styles.yearViewHeaderText}>
          Year View
        </h2>
        <h2 className={styles.currentYearText}>
          {getTodaysYear()}
        </h2>
        <div className={styles.yearItemsContainer}>
          <p>Loading Data...</p>
        </div>
      </section>
    );
  };
};

export default YearView;