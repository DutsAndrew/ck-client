import React, { FC, useEffect, useState } from "react";
import styles from '../../styles/components/Calendar/calendar.module.css';
import { userCalendars, weekViewProps } from "../../types/interfaces";

const WeekView: FC<weekViewProps> = (props): JSX.Element => {

  const { currentDay, calendars } = props;

  const week = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
  ];

  const calendarMonthsAbbr = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const [weekSnapshot, setWeekSnapShot] = useState('');

  useEffect(() => {
    getWeekSnapShot();
  }, [currentDay, calendars]);

  const getWeekSnapShot = () => {
    // shared variables to get accurate week snapshot
    const dayOfWeek = currentDay.split(',')[0];
    const day = currentDay.split(',')[1].split(',')[0].split(' ')[2];
    const dayNumber = Number(day);
    const dayOfWeekIndex = week.indexOf(dayOfWeek);
    const month = currentDay.split(',')[1].split(' ')[1];
    const monthIndex = calendarMonthsAbbr.indexOf(month.slice(0, 3));

    // getter functions to retrieve week format for snapshot
    const priorDays = getPriorWeekDays(
      dayOfWeekIndex,
      dayNumber,
      monthIndex,
      week,
      calendarMonthsAbbr
    );

    const latterDays = getLatterWeekDays(
      calendars,
      month,
      dayOfWeekIndex,
      dayNumber,
      calendarMonthsAbbr,
      monthIndex,
      week
    );

    return generateSnapshot(dayNumber, month, priorDays, latterDays);
  };

  const getPriorWeekDays = (
    dayOfWeekIndex: number,
    dayNumber: number,
    monthIndex: number,
    week: string[],
    calendarMonthsAbbr: string[]
  ) => {
    const prependedDays = [];
    // check if today is early in month
    if (dayOfWeekIndex + 1 > dayNumber) {
      // Handle edge case when prior month is from the previous year
      if (monthIndex === 0) {
        prependedDays.push(calendarMonthsAbbr[calendarMonthsAbbr.length - 1]); // previous month abbrev.
      } else {
        prependedDays.push(calendarMonthsAbbr[monthIndex - 1]); // previous month abbrev.
      };
    } else {
      // Can prepend all the way up to the current day (exclusive)
      for (let i = 0; i < dayOfWeekIndex; i++) {
        prependedDays.push(week[i]);
      };
    };
    return prependedDays;
  };

  const getLatterWeekDays = (
    calendars: userCalendars,
    month: string,
    dayOfWeekIndex: number,
    dayNumber: number,
    calendarMonthsAbbr: string[],
    monthIndex: number,
    week: string[]
  ) => {
    const appendedDays = [];
    // Get the selected year from the DOM
    const selectedYear = document.querySelector('#userSelectedYear')?.textContent;

    if (selectedYear) {
      // Access the user's calendar data for the selected year
      const userCalendarYear: any = calendars.personalCalendar.calendar_years_and_dates[Number(selectedYear)];

      // find current month using abbreviated month format
      let foundKey = null;
      for (const key in userCalendarYear) {
        if (userCalendarYear.hasOwnProperty(key)) {
          if (key.startsWith(month)) {
            foundKey = key;
          };
        };
      };

      if (foundKey !== null) {
        // if key is found it will be the full month name
        const amountOfDaysInMonth = Number(userCalendarYear[foundKey].days)
        if ((7 - dayOfWeekIndex + 1) + dayNumber > amountOfDaysInMonth) {
          // Appending the missing calendar days will exceed the month limit, find the next month and add it
          if (monthIndex === 11) {
            appendedDays.push(calendarMonthsAbbr[0]); // January of the next year
          } else {
            appendedDays.push(calendarMonthsAbbr[monthIndex + 1]); // Next month
          };
        } else {
          // fill remaining weekdays
          for (let i = dayOfWeekIndex + 1; i < 7; i++) {
            appendedDays.push(week[i]);
          };
        };
      };
    };
    return appendedDays;
  };

  const generateSnapshot = (dayNumber: number, month: string, priorDays: string[], latterDays: string[]) => {
    // check if there is no prepend or append
    const noPrepend = priorDays.length === 0;
    const noAppend = latterDays.length === 0;

    let snapshot = '';

    if (noPrepend === true) {
      const prependData = dayNumber;
      // append data is month
      if (latterDays[0].length === 3) {
        snapshot = `hey${month} ${prependData} - ${latterDays[0]}`;
      } else {
        snapshot = `${month} ${prependData} - ${dayNumber + latterDays.length}`;
      };
    } else if (noAppend === true) {
      const appendData = dayNumber;
      // prepend data is month
      if (priorDays[0].length === 3) {
        snapshot = `${priorDays[0]} - ${month} ${appendData}`;
      } else {
        snapshot = `${month} ${dayNumber - priorDays.length} - ${appendData}`;
      };
    };

    // check either snapshot list has a first item that is less than 3 in length, if so a month is being appended and needs to not be calculated
    const prependIsMonth = priorDays[0].length === 3
    const appendIsMonth = latterDays[0].length === 3; 
    
    if (prependIsMonth === true && appendIsMonth === true) {
      snapshot = `${priorDays[0]} - ${latterDays[0]}`;
    } else if (prependIsMonth === true) {
      snapshot = `${priorDays[0]} - ${dayNumber + latterDays.length}`;
    } else if (appendIsMonth === true) {
      snapshot = `${month} ${dayNumber - priorDays.length} - ${latterDays[0]}`;
    } else {
      snapshot = `${month} ${dayNumber - priorDays.length} - ${dayNumber + latterDays.length}`;
    };

    setWeekSnapShot(snapshot);
  };

  return (
    <section className={styles.weekViewContainer}>
      <p className={styles.currentDateText}>
        <strong>{weekSnapshot}</strong>
      </p>
      <h2 className={styles.weekViewHeaderText}>
        Week View
      </h2>
      <div className={styles.weekDayContainer}>
        {week.map((day) => {
          return <div
            className={styles.weekDayItem}
            key={day}
          >
            <p className={styles.weekDayItemText}>
              <strong><em>{day}</em></strong>
            </p>
            <div className={styles.weekDayItemBlock}>
              {/* Render API events here */} This is some boiler plate text to see how it looks
            </div>
          </div>
        })}
      </div>
    </section>
  );
};

export default WeekView;