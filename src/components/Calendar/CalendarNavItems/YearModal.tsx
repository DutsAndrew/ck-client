import React, { FC, useEffect } from "react";
import { yearModalProps } from "../../../types/calendarTypes";
import styles from '../../../styles/components/Calendar/calendar.module.css';
import uniqid from 'uniqid';

const YearModal:FC<yearModalProps> = (props): JSX.Element => {

  const {
    calendarYears,
    handleChangeYearRequest,
    handleModalDeactivation,
  } = props;

  useEffect(() => {
    window.addEventListener('scroll', handleScrollStatus);
    return () => window.removeEventListener('scroll', handleScrollStatus);
  }, []);

  const handleScrollStatus = () => {
    const topOfPage = window.scrollY;
    if (topOfPage > 300) {
      handleModalDeactivation();
    };
  };

  const getParentContainersRightEdgeForStyling = () => {
    const yearDropDownElement = document.querySelector('#year-dropdown');
    if (yearDropDownElement) {
      const targetRightEdge = yearDropDownElement.getBoundingClientRect().right;
      return {
        right: `${window.innerWidth - targetRightEdge}px`
      };
    }
    return {
      right: '0px'
    };
  };

  const handleBackgroundOffClick = (e: React.MouseEvent) => {
    if ((e.target as any).id === 'calendar-modal-background') {
      handleModalDeactivation();
    } else {
      return;
    };
  };

  if (Array.isArray(calendarYears) && calendarYears.length > 0) {
    return (
      <div 
        onClick={(e) => handleBackgroundOffClick(e)}
        id='calendar-modal-background'
        className={styles.navContainerRightDropDownBackground}
      >
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
      </div>
    );
  } else {
    return (
      <div
        onClick={(e) => handleBackgroundOffClick(e)}
        id='calendar-modal-background'
        className={styles.navContainerRightDropDownBackground}
      >
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
      </div>
    );
  };
};

export default YearModal;