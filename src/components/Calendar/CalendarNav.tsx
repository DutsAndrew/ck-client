import React, { FC } from "react";
import styles from '../../styles/components/Calendar/calendar.module.css';
import plusSVG from '../../assets/plus.svg';
import leftArrowSvg from '../../assets/chevron-left.svg';
import rightArrowSvg from '../../assets/chevron-right.svg';
import menuDownSvg from '../../assets/menu-down.svg';
import { calendarNavProps } from "../../types/interfaces";

const CalendarNav:FC<calendarNavProps> = (props): JSX.Element => {

  const { changeCurrentView } = props;

  return (
    <nav className={styles.calendarNavContainer}>
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
    </nav>
  );
};

export default CalendarNav;