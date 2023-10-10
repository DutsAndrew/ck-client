import React, { FC, useState, useEffect } from "react";
import { selectedCalendarModalProps, calendarModalState, calendarObject } from "../../../types/interfaces";
import styles from '../../../styles/components/Calendar/calendar.module.css';
import uniqid from "uniqid";
import calendarEditSvg from '../../../assets/calendar-edit.svg';

const SelectedCalendarModal:FC<selectedCalendarModalProps> = (props): JSX.Element => {

  const { 
    userCalendars,
    activeCalendars,
    handleChangeActiveCalendars,
    handleCalendarEditRequest
  } = props;

  // calendarModal only stores what the user currently modifies, actual state is stored in Calendar root component
  const [selectedCalendars, setSelectedCalendars] = useState<calendarModalState>({
    list: [],
  });

  useEffect(() => {
    setSelectedCalendars({
      list: activeCalendars,
    });
  }, []);

  useEffect(() => {
    handleChangeActiveCalendars(selectedCalendars.list);
  }, [selectedCalendars.list]);

  const handleUserSelection = (calendar: calendarObject): void => {
    return modifySelectedCalendars(calendar);
  };

  const modifySelectedCalendars = (calendar: calendarObject): void => {
    setSelectedCalendars((prevSelectedCalendars) => {
      const isCalendarAdded = prevSelectedCalendars.list.some((currentCalendar) => {
        return currentCalendar.name === calendar.name && currentCalendar.calendar_type === calendar.calendar_type
      });

      if (isCalendarAdded) {
        // Create a new array without the calendar
        const updatedList = prevSelectedCalendars.list.filter((currentCalendar) => {
          return currentCalendar.name !== calendar.name || currentCalendar.calendar_type !== calendar.calendar_type
        });
        return {
          list: updatedList,
        };
      } else {
        // Add the calendar to the list by creating a new array
        return {
          list: [...prevSelectedCalendars.list, calendar],
        };
      };
    });
  };

  const handleEditRequestForSelectedCalendar = (selectedCalendar: calendarObject) => {
    return handleCalendarEditRequest(selectedCalendar);
  };

  return (
    <nav className={styles.calendarModalContainer}>
      <ul className={styles.calendarModalListContainer}>
        <li 
          className={styles.calendarModalCalendarsContainer}
        >
          <div className={styles.calendarModalFormGroup}>
            <input
              id="personal-calendar-option"
              type="checkbox"
              checked={selectedCalendars.list.some(
                (calendar) => calendar.calendar_type === 'personal'
              )}
              onChange={() => handleUserSelection(userCalendars.personalCalendar)}
            />
            <label 
              htmlFor="personal-calendar-option"
              className={styles.calendarModalCalendarsItemText}
            >
              Personal Calendar
            </label>
            <img
              className={styles.calendarEditSvg}
              alt="calendar edit icon"
              src={calendarEditSvg}
              onClick={() => handleEditRequestForSelectedCalendar(userCalendars.personalCalendar)}>
            </img>
          </div>
        </li>
        {userCalendars.teamCalendars.map((calendar) => {
          return <li
            key={uniqid()}
            onClick={() => handleUserSelection(calendar as any)}
            className={styles.calendarModalCalendarsContainer}
          >
            <div className={styles.calendarModalFormGroup}>
              <input 
                id="calendar-checkbox"
                type="checkbox"
                checked={selectedCalendars.list.some(
                  (selectedCalendar) => selectedCalendar.name === calendar.name && selectedCalendar.calendar_type !== 'personal'
                )}
                onChange={(calendar) => handleUserSelection(calendar as any)}
              />
              <label 
                htmlFor="calendar-checkbox"
                className={styles.calendarModalCalendarsItemText}
              >
                {calendar.name}
              </label>
              <img
                className={styles.calendarEditSvg}
                alt="calendar edit icon"
                src={calendarEditSvg}
                onClick={() => handleEditRequestForSelectedCalendar(calendar)}>
              </img>
            </div>
          </li>
        })}
      </ul>
    </nav>
  );
};

export default SelectedCalendarModal;