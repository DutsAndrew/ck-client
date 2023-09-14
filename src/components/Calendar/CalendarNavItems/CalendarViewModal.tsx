import React, { FC } from "react";
import { calendarViewModalProps } from "../../../types/interfaces";

const CalendarViewModal:FC<calendarViewModalProps> = (props): JSX.Element => {

  const { handleChangeViewRequest } = props;

  return (
    <p>
      View Modal
    </p>
  );
};

export default CalendarViewModal;