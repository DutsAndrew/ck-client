import React, { FC } from "react";
import styles from '../../../styles/components/Calendar/calendar.module.css';
import plusSVG from '../../../assets/plus.svg';
import leftArrowSvg from '../../../assets/chevron-left.svg';
import rightArrowSvg from '../../../assets/chevron-right.svg';
import { calendarNavContainerLeftProps } from "../../../types/interfaces";

const CalendarNavContainerLeft:FC<calendarNavContainerLeftProps> = (props): JSX.Element => {

  const { currentView, handleCalendarTimeChangeRequest } = props;

  return (
    <div className={styles.calendarNavContainerLeft}>
        <img
          className={styles.plusSvg}
          alt="plus icon"
          src={plusSVG}>
        </img>
        <div className={styles.navigationArrowsContainer}>
          <img
            className={styles.navigationArrowSvg}
            alt="left arrow"
            src={leftArrowSvg}>
          </img>
          <img
            className={styles.navigationArrowSvg}
            alt="right arrow"
            src={rightArrowSvg}>
          </img>
        </div>
      </div>
  ); 
};

export default CalendarNavContainerLeft;