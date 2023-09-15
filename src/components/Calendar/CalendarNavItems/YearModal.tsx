import React, { FC } from "react";
import { yearModalProps } from "../../../types/interfaces";
import styles from '../../../styles/components/Calendar/calendar.module.css';

const YearModal:FC<yearModalProps> = (props): JSX.Element => {

  const { userCalendarYears, handleChangeYearRequest } = props;

  return (
    <nav className={styles.yearModalContainer}>
      
    </nav>
  );
};

export default YearModal;