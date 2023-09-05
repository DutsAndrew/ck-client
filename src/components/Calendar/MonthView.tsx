import React, { FC } from "react";
import { monthViewProps } from "../../types/interfaces";

const MonthView:FC<monthViewProps> = (props): JSX.Element => {

  const { personalCalendar, currentDay } = props;

  console.log(personalCalendar);

  // 1. Identify current date
  // 2. Find current year in personalCalendar
  // 3. Identify index of the first month we're on
  // 4. Check if the remaining months in that list are less than 3
  // 5. If there are 3 or more months left in the current year render the next 3 months including the current month
  // 6. If there's less than 3 months left in the current year render 1-2 remaining months and the 1-2 next in the following year's calendar
  // 7. Search through calendar holiday's and check if any matches for the current calendar cycle, render them if needed
  // 8. Search through events array, find matches, render them to current calendar cycle

  const calendarMonths = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const getTodaysYear = () => {
    const year = new Date().getFullYear();
    return year;
  };

  const getTodaysMonth = () => {
    const month = new Date().getMonth();
    return month;
  };

  const getThreeMonthPreview = () => {
    const todaysYear = getTodaysYear();
    const currentYearAndDates = personalCalendar.calendar_years_and_dates[`${todaysYear}`];

    const month = getTodaysMonth();
    const currentMonth = calendarMonths[month];

    console.log(todaysYear, currentYearAndDates, currentMonth);
  };

  getThreeMonthPreview();

  return (
    <section>

    </section>
  );
};

export default MonthView;