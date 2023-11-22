import React, { FC } from "react";
import styles from '../../styles/components/Calendar/calendar.module.css';
import { calendarNavProps } from "../../types/interfaces";
import NavLeftContainer from "./CalendarNavItems/NavLeftContainer";
import NavRightContainer from "./CalendarNavItems/NavRightContainer";

const CalendarNav:FC<calendarNavProps> = (props): JSX.Element => {

  const { 
    userCalendars,
    currentView,
    activeCalendars,
    calendarDatesData,
    userId,
    calendarFormStatus,
    changeCurrentView,
    handleCalendarTimeChangeRequest,
    handleActiveCalendarChange,
    handleActivateCalendarEditor,
    appendNewCalendarToUser,
    addNewCalendarNoteToCalendar,
    handleRemoveCalendarShortcutRequest,
  } = props;

  return (
    <nav className={styles.calendarNavContainer}>
      <NavLeftContainer
        currentView={currentView}
        userCalendars={userCalendars}
        userId={userId}
        calendarFormStatus={calendarFormStatus}
        handleCalendarTimeChangeRequest={handleCalendarTimeChangeRequest}
        appendNewCalendarToUser={appendNewCalendarToUser}
        addNewCalendarNoteToCalendar={addNewCalendarNoteToCalendar}
        handleRemoveCalendarShortcutRequest={handleRemoveCalendarShortcutRequest}
      />
      <NavRightContainer
        userCalendars={userCalendars}
        currentView={currentView}
        activeCalendars={activeCalendars}
        calendarDatesData={calendarDatesData}
        changeCurrentView={changeCurrentView}
        handleActiveCalendarChange={handleActiveCalendarChange}
        handleActivateCalendarEditor={handleActivateCalendarEditor}
      />
    </nav>
  )
};

export default CalendarNav;