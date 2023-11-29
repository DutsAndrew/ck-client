import React, { FC, useState, useEffect } from "react";
import { 
  CalendarDatesData,
  calendarNoteWithCalendarInfo,
  calendarNotesWithInfo,
  calendarViewStateForCalendarNotes,
  monthViewProps 
} from "../../types/interfaces";
import styles from '../../styles/components/Calendar/calendar.module.css';
import NotesForCalendar from "./NotesForCalendar";
import uniqid from "uniqid";

const MonthView:FC<monthViewProps> = (props): JSX.Element => {

  const { 
    userId,
    currentDay,
    activeCalendars,
    calendarDatesData,
    handleNotesForCalendarRequestToAddNewNote,
    handleCalendarNoteModificationRequest,
    monthNotes,
  } = props;

  const [monthViewNotes, setMonthViewNotes] = useState<calendarViewStateForCalendarNotes>([]);

  useEffect(() => {
    setMonthViewNotes(getMonthViewNotes())
  }, [activeCalendars]);

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

  return (
    <section className={styles.monthViewContainer}>
      <h2 className={styles.monthViewHeaderText}>
        Month View
      </h2>
      <h2 className={styles.currentMonthText}>
        {calendarMonths[new Date().getMonth()]}
      </h2>
      <div className={styles.monthItemsContainer}>
        {Object.keys(calendarDatesData).length > 0 ? generateMonthCalendar().map((item) => {
          const isAccurateMonthDate = item.includes('-');
          const containerClass = isAccurateMonthDate
          ? styles.monthItemValidDateContainer
          : styles.monthItemInvalidDateContainer;

          return <div 
            key={uniqid()}
            className={`${styles.monthItemContainer} ${containerClass}`}
          >
            <p className={styles.monthItemDateNumberText}>
              {item.includes('-') ? item.split('-')[0] : ''}
            </p>
            <p className={styles.monthItemWeekDayText}>
              {item.includes('-') ? item.split('-')[1] : item}
            </p>
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
          />
        )}
      </div>
    </section>
  );
};

export default MonthView;