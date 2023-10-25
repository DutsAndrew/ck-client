import React, { FC } from "react";
import { yearModalProps } from "../../../types/interfaces";
import styles from '../../../styles/components/Calendar/calendar.module.css';
import uniqid from 'uniqid';

const YearModal:FC<yearModalProps> = (props): JSX.Element => {

  const {
    calendarYears,
    handleChangeYearRequest
  } = props;

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

  if (Array.isArray(calendarYears) && calendarYears.length > 0) {
    return (
      <nav className={styles.yearModalContainer} style={getParentContainersRightEdgeForStyling()}>
        <div className={styles.yearModalYearListContainer}>
          {calendarYears.map((year: any) => {
            return <div 
              key={uniqid()}
              onClick={() => handleChangeYearRequest(year)}
              className={styles.yearModalYearListItemContainer}
            >
              <p className={styles.yearModalYearListItemText}>
                {year}
              </p>
            </div>
          })}
        </div>
      </nav>
    );
  } else {
    return (
      <nav className={styles.yearModalContainer} style={getParentContainersRightEdgeForStyling()}>
        <div className={styles.yearModalYearListContainer}>
          <div 
            className={styles.yearModalYearListItemContainer}
          >
            <p className={styles.yearModalYearListItemText}>
              Loading Data...
            </p>
          </div>
        </div>
      </nav>
    );
  };
};

export default YearModal;