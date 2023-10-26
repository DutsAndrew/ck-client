import React, { FC, useState } from "react";
import styles from '../../../styles/components/Calendar/calendar.module.css';
import menuDownSvg from '../../../assets/menu-down.svg';
import { CalendarDatesData, navRightContainerProps, calendarObject } from "../../../types/interfaces";
import SelectedCalendarModal from "./SelectedCalendarModal";
import ViewModal from "./ViewModal";
import YearModal from "./YearModal";

const NavContainerRight:FC<navRightContainerProps> = (props): JSX.Element => {

  const {
    userCalendars,
    currentView,
    activeCalendars,
    calendarDatesData,
    changeCurrentView,
    handleActiveCalendarChange,
    handleActivateCalendarEditor,
  } = props;

  console.log(userCalendars)

  const getCalendarYears = (): any[] => {
    if (Object.keys(calendarDatesData).length > 0) {
      const calendarYearsObj = (calendarDatesData as CalendarDatesData).calendar_dates;
      const calendarYearsList: any[] = [];
      for (const year in calendarYearsObj) {
        calendarYearsList.push(year);
      }
      return calendarYearsList;
    } else {
      return [];
    };
  };

  const [selectedYear, setSelectedYear] = useState({
    currentYear: new Date().getFullYear(),
    selectedYear: '',
  });

  const [modal, setModal] = useState({
    calendar: false,
    view: false,
    year: false,
  });

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

  const handleChangeYearRequest = (year: string): void => {
    setSelectedYear({
      currentYear: selectedYear.currentYear,
      selectedYear: year,
    });
    handleModalDeactivation();
  };

  const handleCalendarEditRequest = (selectedCalendar: calendarObject): void => {
    handleModalDeactivation();
    return handleActivateCalendarEditor(selectedCalendar);
  };

  const handleChangeViewRequest = (viewRequest: string): void => {
    handleModalDeactivation();
    return changeCurrentView(viewRequest);
  };

  return (
    <div className={styles.calendarNavContainerRight}>
      <div
        id="year-dropdown"
        className={modal.year === true ? styles.yearDropDownContainerActive : styles.yearDropDownContainer}
        onClick={() => handleModalToggle('year')}
      >
        <p 
          id="userSelectedYear"
          className={styles.yearDropDownText}
        >
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
        className={modal.calendar === true ? styles.calendarDropDownContainerActive : styles.calendarDropDownContainer}
        onClick={() => handleModalToggle('calendar')}
      >
        <p className={styles.calendarDropDownText}>
          Calendars ({activeCalendars.length}/{userCalendars.teamCalendars.length + userCalendars.pendingCalendars.length + 1})
        </p>
        <img
          className={styles.calendarDropDownSvg}
          alt="down arrow"
          src={menuDownSvg}>
        </img>
      </div>
      <div
        id="view-dropdown"
        className={modal.view === true ? styles.viewDropDownContainerActive : styles.viewDropDownContainer}
        onClick={() => handleModalToggle('view')}
      >
        <p className={styles.viewDropDownText}>
          {currentView}
        </p>
        <img
          className={styles.viewDropDownSvg}
          alt="down arrow"
          src={menuDownSvg}>
        </img>
      </div>
      {modal.year === true &&
        <YearModal
          calendarYears={getCalendarYears()}
          handleChangeYearRequest={handleChangeYearRequest}
        />
      }
      {modal.calendar === true && 
        <SelectedCalendarModal
          userCalendars={userCalendars}
          activeCalendars={activeCalendars}
          handleChangeActiveCalendars={handleActiveCalendarChange}
          handleCalendarEditRequest={handleCalendarEditRequest}
        />
      }
      {modal.view === true && 
        <ViewModal
          handleChangeViewRequest={handleChangeViewRequest}
        />
      }
    </div>
  ); 
};

export default NavContainerRight;