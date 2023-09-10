import React, { FC } from "react";
import styles from '../../../styles/components/Calendar/calendar.module.css';
import closeSvg from '../../../assets/close.svg';
import { addEventModalProps } from "../../../types/interfaces";
import AddEventForm from "./AddEventForm";

const AddEventModal:FC<addEventModalProps> = (props): JSX.Element => {

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
        <AddEventForm />
      </div>
    </section>
  );
};

export default AddEventModal;