import React, { FC } from "react";
import styles from '../../styles/components/Calendar/calendar.module.css';
import { calendarNavProps } from "../../types/interfaces";
import CalendarNavContainerLeft from "./CalendarNavItems/CalendarNavContainerLeft";
import CalendarNavContainerRight from "./CalendarNavItems/CalendarNavContainerRight";

const CalendarNav:FC<calendarNavProps> = (props): JSX.Element => {

  const { 
    userCalendars,
    currentView,
    changeCurrentView,
    handleCalendarTimeChangeRequest,
    handleActivateCalendarEditor,
  } = props;

  return (
    <nav className={styles.calendarNavContainer}>
      <CalendarNavContainerLeft
        currentView={currentView}
        handleCalendarTimeChangeRequest={handleCalendarTimeChangeRequest}
      />
      <CalendarNavContainerRight
        userCalendars={userCalendars}
        currentView={currentView}
        changeCurrentView={changeCurrentView}
        handleActivateCalendarEditor={handleActivateCalendarEditor}
      />
    </nav>
  )
};

export default CalendarNav;