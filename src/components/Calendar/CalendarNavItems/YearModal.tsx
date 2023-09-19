import React, { FC } from "react";
import { yearModalProps } from "../../../types/interfaces";
import styles from '../../../styles/components/Calendar/calendar.module.css';

const YearModal:FC<yearModalProps> = (props): JSX.Element => {

  const { userCalendarYears, handleChangeYearRequest } = props;

  (function applyStylesToParentContainer() {
    const yearDropDownElement = document.querySelector('#year-dropdown');
    yearDropDownElement?.classList.add('dropdown-active');
  })();

  const getAllUniqueYears = () => {
    const uniqueYears: string[] = [];

    userCalendarYears.possiblePersonalCalendarYears.forEach((year) => {
      if (uniqueYears.indexOf(year) === -1) {
        uniqueYears.push(year);
      };
    });

    if (typeof userCalendarYears.possibleTeamCalendarYears !== 'undefined') {
      userCalendarYears.possibleTeamCalendarYears.forEach((year) => {
        if (uniqueYears.indexOf(year) === -1) {
          uniqueYears.push(year);
        };
      });
    };

    return uniqueYears;
  };

  const getParentContainersRightEdgeForStyling = () => {
    const yearDropDownElement = document.querySelector('#year-dropdown');
    if (yearDropDownElement) {
      const targetRightEdge = yearDropDownElement.getBoundingClientRect().right;
      if (targetRightEdge) {
        return {
          right: `${window.innerWidth - targetRightEdge}px`
        };
      } else {
        return {
          right: '0px'
        };
      };
    };
  };

  return (
    <nav className={styles.yearModalContainer} style={getParentContainersRightEdgeForStyling()}>
      <div className={styles.yearModalYearListContainer}>
        {getAllUniqueYears().map((year) => {
          return <div className={styles.yearModalYearListItemContainer}>
            <p className={styles.yearModalYearListItemText}>
              {year}
            </p>
          </div>
        })}
      </div>
    </nav>
  );
};

export default YearModal;