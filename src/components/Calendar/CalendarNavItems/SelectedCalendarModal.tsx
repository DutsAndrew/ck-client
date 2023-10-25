import React, { FC, useState, useEffect } from "react";
import { selectedCalendarModalProps, calendarModalState, calendarObject } from "../../../types/interfaces";
import styles from '../../../styles/components/Calendar/calendar.module.css';
import DropDownCalendarItems from "./DropDownCalendarItems";

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

  const handleEditRequestForSelectedCalendar = (selectedCalendar: calendarObject) => {
    return handleCalendarEditRequest(selectedCalendar);
  };

  const dropDownCalendarItemsProps = {
    selectedCalendars,
    handleUserSelection,
    handleEditRequestForSelectedCalendar,
  }

  return (
    <nav className={styles.calendarModalContainer}>
      <ul className={styles.calendarModalListContainer}>
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
  );
};

export default SelectedCalendarModal;