import React, { FC } from 'react';
import { calendarProps } from '../../types/interfaces';
import styles from '../../styles/components/Calendar/calendar.module.css';
import CalendarNav from './CalendarNav';
import MonthView from './MonthView';
import WeekView from './WeekView';
import DayView from './DayView';

const Calendar:FC<calendarProps> = (props): JSX.Element => {

  const { user } = props;

  console.log(user);

  // on default have the following views render: 1) Day, 2) Week, 3) Month
  // users can switch to only viewing one of them or two of their choice
  // if user chooses to render only on version the styling should be different to make use
  // of screen real estate

  // users should be able to select up to 10 calendars to view at once
  // all events should be accessible to render
  // conflicting or duplicate events should still render
  // user should be able to easily adjust and save their calendar color preferences to their user profile
  // existing color preferences should render at load

  return (
    <main className={styles.calendarContainer}>
      <CalendarNav />
      <DayView />
      <WeekView />
      <MonthView />
    </main>
  );
};

export default Calendar;