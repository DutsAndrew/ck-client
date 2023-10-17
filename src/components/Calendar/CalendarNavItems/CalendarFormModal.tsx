import React, { FC } from "react";
import styles from '../../../styles/components/Calendar/calendar.module.css';
import closeSvg from '../../../assets/close.svg';
import { addFormModalProps } from "../../../types/interfaces";
import CalendarFormSwitch from "./CalendarFormSwitch";

const CalendarFormModal:FC<addFormModalProps> = (props): JSX.Element => {

  const {
    userCalendars,
    handleCloseModalRequest
  } = props;

  return (
    <section
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
        />
      </div>
    </section>
  );
};

export default CalendarFormModal;