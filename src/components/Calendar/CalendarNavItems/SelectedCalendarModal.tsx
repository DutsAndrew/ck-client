import React, { FC, useState, useEffect } from "react";
import { selectedCalendarModalProps, calendarModalState, calendarObject } from "../../../types/interfaces";
import styles from '../../../styles/components/Calendar/calendar.module.css';
import DropDownCalendarItems from "./DropDownCalendarItems";

const SelectedCalendarModal:FC<selectedCalendarModalProps> = (props): JSX.Element => {

  const { 
    userCalendars,
    activeCalendars,
    handleChangeActiveCalendars,
    handleCalendarEditRequest,
    handleModalDeactivation,
  } = props;

  // calendarModal only stores what the user currently modifies, actual state is stored in Calendar root component
  const [selectedCalendars, setSelectedCalendars] = useState<calendarModalState>({
    list: activeCalendars,
  });

  useEffect(() => {
    window.addEventListener('scroll', handleScrollStatus);
    return () => window.removeEventListener('scroll', handleScrollStatus);
  }, []);

  useEffect(() => {
    handleChangeActiveCalendars(selectedCalendars.list);
  }, [selectedCalendars.list]);

  const handleScrollStatus = () => {
    const topOfPage = window.scrollY;
    if (topOfPage > 300) {
      handleModalDeactivation();
    };
  };

  const getParentContainersRightEdgeForStyling = () => {
    const yearDropDownElement = document.querySelector('#calendar-dropdown');
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

  const handleUserSelection = (
    calendar: calendarObject,
    e: React.MouseEvent<HTMLLIElement, MouseEvent> | React.ChangeEvent<HTMLInputElement>
  ): void => {
    e.preventDefault();
    return modifySelectedCalendars(calendar);
  };

  const modifySelectedCalendars = (calendar: calendarObject): void => {
    setSelectedCalendars((prevSelectedCalendars) => {
      const isCalendarAdded = prevSelectedCalendars.list.some((currentCalendar) => {
        return currentCalendar._id === calendar._id
      });

      if (isCalendarAdded) {
        // Create a new array without the calendar
        const updatedList = prevSelectedCalendars.list.filter((currentCalendar) => {
          return currentCalendar._id !== calendar._id
        });
        return {
          list: updatedList,
        };
      } else {
        return {
          list: [...prevSelectedCalendars.list, calendar],
        };
      };
    });
  };

  const handleClearAllSelectedCalendars = () => {
    setSelectedCalendars({
      list: [],
    });
  };

  const handleSelectAllCalendars = () => {
    setSelectedCalendars({
      list: [userCalendars.personalCalendar, ...userCalendars.pendingCalendars, ...userCalendars.teamCalendars]
    });
  };

  const handleEditRequestForSelectedCalendar = (selectedCalendar: calendarObject) => {
    return handleCalendarEditRequest(selectedCalendar);
  };

  const handleBackgroundOffClick = (e: React.MouseEvent) => {
    if ((e.target as any).id === 'calendar-modal-background') {
      handleModalDeactivation();
    } else {
      return;
    }
  };

  const dropDownCalendarItemsProps = {
    selectedCalendars,
    handleUserSelection,
    handleEditRequestForSelectedCalendar,
  }

  return (
    <div 
      onClick={(e) => handleBackgroundOffClick(e)}
      id='calendar-modal-background'
      className={styles.navContainerRightDropDownBackground}>
      <nav className={styles.calendarModalContainer} style={getParentContainersRightEdgeForStyling()}>
        <ul className={styles.calendarModalListContainer}>
          <div className={styles.calendarModalButtonContainer}>
            <button 
              onClick={() => handleClearAllSelectedCalendars()}
              className={styles.calendarModalDeselectAllButton}>
              Clear All
            </button>
            <button 
              onClick={() => handleSelectAllCalendars()}
              className={styles.calendarModalSelectAllButton}>
              Select All
            </button>
          </div>
          <DropDownCalendarItems 
            {...dropDownCalendarItemsProps}
            calendars={[userCalendars.personalCalendar]} // converted to array beforehand to not mess up map render
          />
          <DropDownCalendarItems 
            {...dropDownCalendarItemsProps}
            calendars={userCalendars.teamCalendars}
          />
          <DropDownCalendarItems 
            {...dropDownCalendarItemsProps}
            calendars={userCalendars.pendingCalendars}
          />
        </ul>
      </nav>
    </div>
  );
};

export default SelectedCalendarModal;