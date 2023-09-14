import React, { FC } from "react";
import { calendarModalProps } from "../../../types/interfaces";

const CalendarModal:FC<calendarModalProps> = (props): JSX.Element => {

  const { userCalendars, handleChangeActiveCalendars } = props;

  return (
    <p>
      Calendar Modal
    </p>
  );
};

export default CalendarModal;