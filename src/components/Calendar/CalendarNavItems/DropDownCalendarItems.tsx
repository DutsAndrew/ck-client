import React, { FC } from "react";
import calendarEditSvg from '../../../assets/calendar-edit.svg';
import styles from '../../../styles/components/Calendar/calendar.module.css';
import { dropDownCalendarItemsProps } from "../../../types/calendarTypes";
import uniqid from "uniqid";

const DropDownCalendarItems:FC<dropDownCalendarItemsProps> = (props): JSX.Element => {

  const {
    selectedCalendars,
    handleUserSelection,
    handleEditRequestForSelectedCalendar,
    calendars,
  } = props;

  return (
      <>
        {calendars.map((calendar) => {
          return <li
          key={uniqid()}
          onClick={(e) => handleUserSelection(calendar, e)}
          className={styles.calendarModalCalendarsContainer}
        >
          <div className={styles.calendarModalFormGroup}>
            <input 
              id="calendar-checkbox"
              type="checkbox"
              checked={selectedCalendars.list.some(
                (selectedCalendar) => selectedCalendar._id === calendar._id
              )}
              onChange={(e) => handleUserSelection(calendar, e)}
            />
            <label 
              htmlFor="calendar-checkbox"
              className={styles.calendarModalCalendarsItemText}
            >
              {calendar.name ? calendar.name : 'Loading...'}
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
      </>
  );
};

export default DropDownCalendarItems;