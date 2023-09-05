import React, { FC } from "react";
import styles from '../../../styles/components/Calendar/calendar.module.css';
import menuDownSvg from '../../../assets/menu-down.svg';
import { calendarNavContainerRightProps } from "../../../types/interfaces";

const CalendarNavContainerRight:FC<calendarNavContainerRightProps> = (props): JSX.Element => {

  const { currentView, changeCurrentView } = props;

  return (
    <div className={styles.calendarNavContainerRight}>
        <div className={styles.yearDropDownContainer}>
          <p className={styles.yearDropDownText}>
            Year
          </p>
          <img
            className={styles.yearDropDownSvg}
            alt="down arrow"
            src={menuDownSvg}>
          </img>
        </div>
        <div className={styles.calendarDropDownContainer}>
          <p className={styles.calendarDropDownText}>
            (0) Calendars
          </p>
          <img
            className={styles.calendarDropDownSvg}
            alt="down arrow"
            src={menuDownSvg}>
          </img>
        </div>
        <div className={styles.viewDropDownContainer}>
          <p className={styles.viewDropDownText}>
            All
          </p>
          <img
            className={styles.viewDropDownSvg}
            alt="down arrow"
            src={menuDownSvg}>
          </img>
        </div>
      </div>
  ); 
};

export default CalendarNavContainerRight;