import React, { FC, useState, useEffect } from 'react';
import { calendarProps, userInstance } from '../../types/interfaces';
import styles from '../../styles/components/Calendar/calendar.module.css';
import CalendarNav from './CalendarNav';
import YearView from './YearView';
import MonthView from './MonthView';
import WeekView from './WeekView';
import DayView from './DayView';

const Calendar:FC<calendarProps> = (props): JSX.Element => {

  const { user } = props;

  const [calendarData, setCalendarData] = useState({}),
        [currentView, setCurrentView] = useState('all');

  useEffect(() => {
    // on mount get all of the following to save in state for easy accessability for user switching views
    // 1. today's date
    // 2. holidays for today, week, and next 3 months
    // 3. events for today, week, and next 3 months
    const today = getTodaysDate();
  }, []);

  const getTodaysDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };

    const date = new Date();
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    return formattedDate;
  }

  const changeCurrentView = (viewRequest: string): void => {
    setCurrentView(viewRequest);
  };
  
  const handleCalendarTimeChangeRequest = () => {
    return;
  };

  const handleAddEventRequest = () => {
    return;
  };

  // on default have the following views render: 1) Day, 2) Week, 3) Month
  // users can switch to only viewing one of them or two of their choice
  // if user chooses to render only on version the styling should be different to make use
  // of screen real estate

  // users should be able to select up to 10 calendars to view at once
  // all events should be accessible to render
  // conflicting or duplicate events should still render
  // user should be able to easily adjust and save their calendar color preferences to their user profile
  // existing color preferences should render at load

  // setup calendar nav to deactivate forward and backward arrows unless client is only viewing day, week, or month. If they're viewing
  // two or more they shouldn't be able to rotate the calendar in any capacity

  if (Object.keys(user).length !== 0) {

    const userRef = user as userInstance;
    const commonProps = {
      currentView,
      changeCurrentView,
      handleCalendarTimeChangeRequest
    }

    const renderCalendarView = () => {
      if (currentView === 'all') {
        return (
          <>
            <DayView currentDay={getTodaysDate()} />
            <WeekView />
            <MonthView
              personalCalendar={userRef.personal_calendar}
              currentDay={getTodaysDate()}
            />
            <YearView 
              personalCalendar={userRef.personal_calendar}
            />
          </>
        );
      } else if (currentView === 'day') {
        return <DayView currentDay={getTodaysDate()} />;
      } else if (currentView === 'week') {
        return <WeekView />;
      } else if (currentView === 'month') {
        return (
          <MonthView
            personalCalendar={userRef.personal_calendar}
            currentDay={getTodaysDate()}
          />
        );
      } else if (currentView === 'year') {
        return (
          <YearView 
            personalCalendar={userRef.personal_calendar}
          />
        );
      } else {
        return (
          <h1>Something went terribly wrong, please try again or refresh your page.</h1>
        );
      };
    };

    return (
      <main className={styles.calendarContainer}>
        <CalendarNav {...commonProps} />
        {renderCalendarView()}
      </main>
    );

  } else {
    return (
      <h1>You must be signed in to view your calendars</h1>
    );
  };
};

export default Calendar;