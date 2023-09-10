import React, { FC, useEffect } from "react";
import styles from '../../styles/components/Calendar/calendar.module.css';
import { yearViewProps } from "../../types/interfaces";

const YearView:FC<yearViewProps> = (props): JSX.Element => {

  const { personalCalendar } = props;

  useEffect(() => {
    renderMonthHeaders();
  }, []);

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

  const getCurrentYearFromUserCalendar = () => {
    const year = getTodaysYear();
    return personalCalendar.calendar_years_and_dates[year];
  };

  const generateCurrentYearView = () => {
    const yearView: any[] = [];

    const userCalendar = getCurrentYearFromUserCalendar();
    
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
        monthLayout.push(`${week[i]}`);
      };

      // add all month's week days
      let weekLoopIndex = weekStartIndex;
      for (let i = 0; i < monthNumberOfDays + 1; i++) {
        monthLayout.push(`${i}-${week[weekLoopIndex]}`);
        if (weekLoopIndex === week.length - 1) {
          weekLoopIndex = 0;
        } else {
          weekLoopIndex++
        };
      };

      // add remaining days of week
      for (let i = weekLoopIndex; i < week.length; i++) {
        monthLayout.push(`${week[i]}`);
      };

      yearView.push(monthLayout);
    });

    return yearView;
  };

  const renderMonthHeaders = () => {

  };

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
          <div key={month} className={styles.monthContainer}>
            <h3 className={styles.yearViewMonthHeaderText}>
              {calendarMonths[yearView.indexOf(month)]}
            </h3>
            <div className={styles.yearViewMonthItemsContainer}>
              {month.map((day: any) => {
                const isAccurateMonthDate = day.includes('-');
                const containerClass = isAccurateMonthDate
                  ? styles.monthItemValidDateContainer
                  : styles.monthItemInvalidDateContainer;

                return (
                  <div
                    key={day}
                    className={`${styles.YearViewMonthItemContainer} ${containerClass}`}
                  >
                    <p className={styles.yearViewMonthItemDateNumberText}>
                      {day.includes('-') ? day.split('-')[0] : ''}
                    </p>
                    <p className={styles.yearViewMonthItemWeekDayText}>
                      {day.includes('-') ? day.split('-')[1] : day}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default YearView;