import React, { FC } from "react";
import { yearModalProps } from "../../../types/interfaces";

const YearModal:FC<yearModalProps> = (props): JSX.Element => {

  const { userCalendarYears, handleChangeYearRequest } = props;

  return (
    <p>
      Year Modal
    </p>
  );
};

export default YearModal;