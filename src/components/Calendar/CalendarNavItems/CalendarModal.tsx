import React, { FC, useState, useEffect } from "react";
import { calendarModalProps, calendarModalState, calendarObject } from "../../../types/interfaces";
import styles from '../../../styles/components/Calendar/calendar.module.css';
import uniqid from "uniqid";

const CalendarModal:FC<calendarModalProps> = (props): JSX.Element => {

  const { userCalendars, handleChangeActiveCalendars } = props;

  const [selectedCalendars, setSelectedCalendars] = useState<calendarModalState>({
    list: [],
  });

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

  return (
    <nav className={styles.calendarModalContainer}>
      <ul className={styles.calendarModalListContainer}>
        <li 
          onClick={() => handleUserSelection(userCalendars.personalCalendar)}
          className={styles.calendarModalCalendarsContainer}
        >
          <div className={styles.calendarModalFormGroup}>
              <input 
                type="checkbox"
                checked={selectedCalendars.list.some(
                  (calendar) => calendar.calendar_type === 'personal'
                )}
                onChange={(calendar) => handleUserSelection((calendar as any).name)}
              />
              <p className={styles.calendarModalCalendarsItemText}>
                Personal Calendar
              </p>
            </div>
        </li>
        {userCalendars.allUserCalendars.map((calendar) => {
          return <li
            key={uniqid()}
            onClick={() => handleUserSelection(calendar as any)}
            className={styles.calendarModalCalendarsContainer}
          >
            <div className={styles.calendarModalFormGroup}>
              <input 
                type="checkbox"
                checked={selectedCalendars.list.some(
                  (selectedCalendar) => selectedCalendar.name === calendar.name && selectedCalendar.calendar_type !== 'personal'
                )}
                onChange={(calendar) => handleUserSelection(calendar as any)}
              />
              <p className={styles.calendarModalCalendarsItemText}>
                {calendar.name}
              </p>
            </div>
          </li>
        })}
      </ul>
    </nav>
  );
};

export default CalendarModal;