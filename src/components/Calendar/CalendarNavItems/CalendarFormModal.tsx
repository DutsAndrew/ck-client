import React, { FC, useEffect } from "react";
import styles from '../../../styles/components/Calendar/calendar.module.css';
import closeSvg from '../../../assets/close.svg';
import { addFormModalProps } from "../../../types/interfaces";
import CalendarFormSwitch from "./CalendarFormSwitch";

const CalendarFormModal:FC<addFormModalProps> = (props): JSX.Element => {

  const {
    userCalendars,
    userId,
    handleCloseModalRequest,
    appendNewCalendarToUser,
    addNewCalendarNoteToCalendar,
  } = props;

  useEffect(() => {
    temporarilyDisableScrollBar();

    return () => {
      reEnableScrollBar();
    };
  }, []);

  const verifyModalBackgroundOffClick = (e: React.MouseEvent) => {
    if ((e.target as any).id === 'calendar-form-modal-background') {
      handleCloseModalRequest();
    };
  };

  const temporarilyDisableScrollBar = () => {
    const body = document.body;
    body.classList.add('disableScrollbar');
  };

  const reEnableScrollBar = () => {
    const body = document.body;
    body.classList.remove('disableScrollbar');
  };

  return (
    <section
      id="calendar-form-modal-background"
      onClick={(e) => verifyModalBackgroundOffClick(e)}
      className={styles.calendarFormModalBackground}
    >
      <div className={styles.calendarFormModalContainer}>
        <img
          className={styles.calendarFormModalCloseIcon}
          alt="close icon"
          src={closeSvg}
          onClick={() => handleCloseModalRequest()}>
        </img>
        <CalendarFormSwitch
          userCalendars={userCalendars}
          userId={userId}
          appendNewCalendarToUser={appendNewCalendarToUser}
          addNewCalendarNoteToCalendar={addNewCalendarNoteToCalendar}
          handleCloseModalRequest={handleCloseModalRequest}
        />
      </div>
    </section>
  );
};

export default CalendarFormModal;