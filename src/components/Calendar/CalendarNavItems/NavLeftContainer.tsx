import React, { FC, useEffect, useState } from "react";
import styles from '../../../styles/components/Calendar/calendar.module.css';
import plusSVG from '../../../assets/plus.svg';
import { navLeftContainerProps } from "../../../types/calendarTypes";
import CalendarFormModal from "./CalendarFormModal";

const NavLeftContainer:FC<navLeftContainerProps> = (props): JSX.Element => {

  const {
    currentView,
    userCalendars,
    userId,
    calendarFormStatus,
    calendarNoteEditRequest,
    calendarEventEditRequest,
    appendNewCalendarToUser,
    addNewCalendarNoteToCalendar,
    handleCalendarFormDataCleanup,
    updateCalendarNote,
    updateCalendarInUser,
  } = props;

  useEffect(() => {
    handleOpenFormOnFormShortcut();
  }, [calendarFormStatus]);

  useEffect(() => {
    if (calendarNoteEditRequest.status === true) handleCalendarNoteEditRequest();
    if (calendarEventEditRequest.status === true) handleCalendarEventEditRequest();
  }, [calendarNoteEditRequest, calendarEventEditRequest]);

  const [modal, setModal] = useState({
    open: false,
  });

  const handleFormModalRequest = () => {
    if (modal.open === false) {
      setModal({
        open: true,
      });
    } else {
      setModal({
        open: false,
      });
    };
    return;
  };

  const handleCloseModalRequest = () => {
    setModal({
      open: false,
    });
    return handleCalendarFormDataCleanup();
  };

  const handleOpenFormOnFormShortcut = () => {
    if (
      calendarFormStatus.event === true
      || calendarFormStatus.note === true
      || calendarFormStatus.calendar === true
    ) {
      setModal({
        open: true,
      });
    };
  };

  const handleCalendarNoteEditRequest = () => {
    if (calendarNoteEditRequest.status === true) {
      setModal({
        open: true,
      });
    } else {
      setModal({
        open: false,
      });
    };
  };

  const handleCalendarEventEditRequest = () => {
    if (calendarEventEditRequest.status === true) {
      setModal({
        open: true,
      });
    } else {
      setModal({
        open: false,
      });
    };
  };

  if (modal.open === true && currentView === 'All') {
    return (
      <div className={styles.calendarNavContainerLeft}>
        <img
          className={styles.plusSvg}
          alt="plus icon"
          src={plusSVG}
          onClick={() => handleFormModalRequest()}>
        </img>
        <CalendarFormModal
          userCalendars={userCalendars}
          userId={userId}
          calendarFormStatus={calendarFormStatus}
          calendarNoteEditRequest={calendarNoteEditRequest}
          calendarEventEditRequest={calendarEventEditRequest}
          handleCloseModalRequest={handleCloseModalRequest}
          appendNewCalendarToUser={appendNewCalendarToUser}
          addNewCalendarNoteToCalendar={addNewCalendarNoteToCalendar}
          updateCalendarNote={updateCalendarNote}
          updateCalendarInUser={updateCalendarInUser}
        />
      </div>
    );
  } else if (modal.open === false && currentView === 'All') {
    return (
      <div className={styles.calendarNavContainerLeft}>
        <img
          className={styles.plusSvg}
          alt="plus icon"
          src={plusSVG}
          onClick={() => handleFormModalRequest()}>
        </img>
      </div>
    );
  } else if (modal.open === true && currentView !== 'All') {
    return (
      <div className={styles.calendarNavContainerLeft}>
        <img
          className={styles.plusSvg}
          alt="plus icon"
          src={plusSVG}
          onClick={() => handleFormModalRequest()}>
        </img>
        <CalendarFormModal
          userCalendars={userCalendars}
          userId={userId}
          calendarFormStatus={calendarFormStatus}
          calendarNoteEditRequest={calendarNoteEditRequest}
          calendarEventEditRequest={calendarEventEditRequest}
          handleCloseModalRequest={handleCloseModalRequest}
          appendNewCalendarToUser={appendNewCalendarToUser}
          addNewCalendarNoteToCalendar={addNewCalendarNoteToCalendar}
          updateCalendarNote={updateCalendarNote}
          updateCalendarInUser={updateCalendarInUser}
        />
      </div>
    );
  } else {
    // user is using a certain calendar view and needs to be able to use back and forward arrows to navigate time
    return (
      <div className={styles.calendarNavContainerLeft}>
        <img
          className={styles.plusSvg}
          alt="plus icon"
          src={plusSVG}
          onClick={() => handleFormModalRequest()}>
        </img>
      </div>
    ); 
  };
};

export default NavLeftContainer;