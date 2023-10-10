import React, { FC } from "react";
import styles from '../../../styles/components/Calendar/calendar.module.css';
import closeSvg from '../../../assets/close.svg';
import { addFormModalProps } from "../../../types/interfaces";
import CalendarForm from "./CalendarForm";

const AddFormModal:FC<addFormModalProps> = (props): JSX.Element => {

  const { handleCloseModalRequest } = props;

  return (
    <section
      className={styles.addEventModalBackground}
    >
      <div className={styles.addEventModalContainer}>
        <img
          className={styles.addEventModalCloseIcon}
          alt="close icon"
          src={closeSvg}
          onClick={() => handleCloseModalRequest()}>
        </img>
        <CalendarForm />
      </div>
    </section>
  );
};

export default AddFormModal;