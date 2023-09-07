import React, { FC } from "react";
import styles from '../../../styles/components/Calendar/calendar.module.css';
import closeSvg from '../../../assets/close.svg';
import { addEventModalProps } from "../../../types/interfaces";

const AddEventModal:FC<addEventModalProps> = (props): JSX.Element => {

  const { handleCloseModalRequest } = props;

  return (
    <section className={styles.addEventModalContainer}>
      <img
        className={styles.addEventModalCloseIcon}
        alt="close icon"
        src={closeSvg}
        onClick={() => handleCloseModalRequest()}>
      </img>
      <p>
        Add Event Modal
      </p>
    </section>
  );
};

export default AddEventModal;