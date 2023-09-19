import React, { FC, useState } from "react";
import styles from '../../../styles/components/Calendar/calendar.module.css';
import menuDownSvg from '../../../assets/menu-down.svg';
import { calendarNavContainerRightProps } from "../../../types/interfaces";
import CalendarModal from "./CalendarModal";
import ViewModal from "./ViewModal";
import YearModal from "./YearModal";

const CalendarNavContainerRight:FC<calendarNavContainerRightProps> = (props): JSX.Element => {

  const {
    userCalendars,
    currentView,
    changeCurrentView
  } = props;

  const getAllPossibleTeamCalendarYears = () => {
    if (userCalendars.allUserCalendars.length === 0) return;

    const allYears: string[] = [];

    userCalendars.allUserCalendars.forEach((calendar) => {
      const currentTeamsCalendarYears = Object.keys(calendar);
      currentTeamsCalendarYears.forEach((calendarYear) => {
        if (allYears.indexOf(calendarYear) === -1) {
          allYears.push(calendarYear);
        };
      });
    });
    
    return allYears;
  };

  const [selectedYear, setSelectedYear] = useState({
    currentYear: new Date().getFullYear(),
    selectedYear: '',
  });

  const [userCalendarYears, setUserCalendarYears] = useState({
    possiblePersonalCalendarYears: Object.keys(userCalendars.personalCalendar.calendar_years_and_dates),
    possibleTeamCalendarYears: getAllPossibleTeamCalendarYears(),
  });

  const [selectedCalendars, setSelectedCalendars] = useState({
    list: [],
  });

  const [modal, setModal] = useState({
    calendar: false,
    view: false,
    year: false,
  });

  const upperCaseFirstLetterOfCurrentView = () => {
    const view = currentView;
    const firstLetter = view.charAt(0).toUpperCase();
    const remainingLetters = view.slice(1);
    return firstLetter + remainingLetters;
  };

  const handleModalToggle = (modalToggleRequest: string): void => {
    if (
      (modalToggleRequest === 'calendar' && modal.calendar === true) ||
      (modalToggleRequest === 'view' && modal.view === true) ||
      (modalToggleRequest === 'year' && modal.year === true)
    ) {
      handleModalDeactivation();
    } else {
      setModal({
        calendar: modalToggleRequest === 'calendar',
        view: modalToggleRequest === 'view',
        year: modalToggleRequest === 'year',
      });
    };
  };

  const handleModalDeactivation = () => {
    const yearDropDownElement = document.querySelector('#year-dropdown');
    yearDropDownElement?.classList.remove('dropdown-active');
    
    setModal({
      calendar: false,
      view: false,
      year: false,
    });
  };

  const handleChangeYearRequest = () => {
    console.log('dropping down year request');
    return;
  };

  const handleChangeActiveCalendars = () => {
    console.log('dropping down calendar request');
    return;
  };

  const handleChangeViewRequest = (viewRequest: string): void => {
    console.log('dropping down view request');
    changeCurrentView(viewRequest);
    return;
  };

  return (
    <div className={styles.calendarNavContainerRight}>
      <div
        id="year-dropdown"
        className={modal.year === true ? styles.yearDropDownContainerActive : styles.yearDropDownContainer}
        onClick={() => handleModalToggle('year')}
      >
        <p className={styles.yearDropDownText}>
          {selectedYear.selectedYear.length === 0 ? selectedYear.currentYear : selectedYear.selectedYear}
        </p>
        <img
          className={styles.yearDropDownSvg}
          alt="down arrow"
          src={menuDownSvg}>
        </img>
      </div>
      <div
        id="calendar-dropdown"
        className={styles.calendarDropDownContainer}
        onClick={() => handleModalToggle('calendar')}
      >
        <p className={styles.calendarDropDownText}>
          Calendars ({selectedCalendars.list.length}/{userCalendars.allUserCalendars.length + 1})
        </p>
        <img
          className={styles.calendarDropDownSvg}
          alt="down arrow"
          src={menuDownSvg}>
        </img>
      </div>
      <div
        id="view-dropdown"
        className={styles.viewDropDownContainer}
        onClick={() => handleModalToggle('view')}
      >
        <p className={styles.viewDropDownText}>
          {upperCaseFirstLetterOfCurrentView()}
        </p>
        <img
          className={styles.viewDropDownSvg}
          alt="down arrow"
          src={menuDownSvg}>
        </img>
      </div>
      {modal.calendar === true && 
        <CalendarModal
          userCalendars={userCalendars} 
          handleChangeActiveCalendars={handleChangeActiveCalendars}
        />
      }
      {modal.view === true && 
        <ViewModal
          handleChangeViewRequest={handleChangeViewRequest}
        />
      }
      {modal.year === true &&
        <YearModal
          userCalendarYears={userCalendarYears}
          handleChangeYearRequest={handleChangeYearRequest}
        />
      }
    </div>
  ); 
};

export default CalendarNavContainerRight;