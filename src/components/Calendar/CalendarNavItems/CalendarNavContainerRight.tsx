import React, { FC } from "react";
import styles from '../../../styles/components/Calendar/calendar.module.css';
import menuDownSvg from '../../../assets/menu-down.svg';
import { calendarNavContainerRightProps } from "../../../types/interfaces";

const CalendarNavContainerRight:FC<calendarNavContainerRightProps> = (props): JSX.Element => {

  const { currentView, changeCurrentView } = props;

  const handleChangeYearRequest = () => {
    console.log('dropping down year request');
    return;
  };

  const handleChangeActiveCalendars = () => {
    console.log('dropping down calendar request');
    return;
  };

  const handleChangeViewRequest = () => {
    console.log('dropping down view request');
    return;
  };

  return (
    <div className={styles.calendarNavContainerRight}>
        <div
          className={styles.yearDropDownContainer}
          onClick={() => handleChangeYearRequest()}
        >
          <p className={styles.yearDropDownText}>
            Year
          </p>
          <img
            className={styles.yearDropDownSvg}
            alt="down arrow"
            src={menuDownSvg}>
          </img>
        </div>
        <div
          className={styles.calendarDropDownContainer}
          onClick={() => handleChangeActiveCalendars()}
        >
          <p className={styles.calendarDropDownText}>
            (0) Calendars
          </p>
          <img
            className={styles.calendarDropDownSvg}
            alt="down arrow"
            src={menuDownSvg}>
          </img>
        </div>
        <div
          className={styles.viewDropDownContainer}
          onClick={() => handleChangeViewRequest()}
        >
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