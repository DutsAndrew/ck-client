import React, { FC } from "react";
import { calendarViewModalProps } from "../../../types/interfaces";
import styles from '../../../styles/components/Calendar/calendar.module.css';

const ViewModal:FC<calendarViewModalProps> = (props): JSX.Element => {

  const { handleChangeViewRequest } = props;

  return (
    <p>
      View
    </p>
  );
};

export default ViewModal;