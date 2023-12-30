import React, { FC } from "react";
import styles from '../../styles/components/Calendar/calendar.module.css';
import { calendarNavProps } from "../../types/calendarTypes";
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
    calendarNoteEditRequest,
    calendarEventEditRequest,
    changeCurrentView,
    handleCalendarTimeChangeRequest,
    handleActiveCalendarChange,
    handleActivateCalendarEditor,
    appendNewCalendarToUser,
    addNewCalendarNoteToCalendar,
    handleCalendarFormDataCleanup,
    updateCalendarNote,
    updateCalendarInUser,
    storeSelectedViewingYear,
  } = props;

  return (
    <nav className={styles.calendarNavContainer}>
      <NavLeftContainer
        currentView={currentView}
        userCalendars={userCalendars}
        userId={userId}
        calendarFormStatus={calendarFormStatus}
        calendarNoteEditRequest={calendarNoteEditRequest}
        calendarEventEditRequest={calendarEventEditRequest}
        handleCalendarTimeChangeRequest={handleCalendarTimeChangeRequest}
        appendNewCalendarToUser={appendNewCalendarToUser}
        addNewCalendarNoteToCalendar={addNewCalendarNoteToCalendar}
        handleCalendarFormDataCleanup={handleCalendarFormDataCleanup}
        updateCalendarNote={updateCalendarNote}
        updateCalendarInUser={updateCalendarInUser}
      />
      <NavRightContainer
        userCalendars={userCalendars}
        currentView={currentView}
        activeCalendars={activeCalendars}
        calendarDatesData={calendarDatesData}
        changeCurrentView={changeCurrentView}
        handleActiveCalendarChange={handleActiveCalendarChange}
        handleActivateCalendarEditor={handleActivateCalendarEditor}
        storeSelectedViewingYear={storeSelectedViewingYear}
      />
    </nav>
  )
};

export default CalendarNav;