import React, { FC, useState } from "react";
import styles from '../../../styles/components/Calendar/calendar.module.css';
import { addNoteFormProps } from "../../../types/interfaces";

const AddNoteForm:FC<addNoteFormProps> = (props): JSX.Element => {

  const { calendarDatesData } = props;

  const [formData, setFormData] = useState({
    date: '',
    note: '',
  })

  const handleFormInputChange = () => {

  };

  const handleFormSubmit = () => {

  };

  return (
    <div className={styles.addEventFormContainer}>
      <h2 className={styles.addEventHeader}>
        Event
      </h2>
      <form onSubmit={handleFormSubmit} className={styles.addEventForm}>
        <div className={styles.formGroup}>
          <label 
            className={styles.addEventFormLabel}
            htmlFor='note-input'
            >
              *Note:
          </label>
          <textarea
            id='note-input'
            name="note"
            value={formData.note}
            onChange={handleFormInputChange}
            required
            className={styles.addEventFormInput}
          />
        </div>
        {/* SETUP SO THAT USER CAN ASSIGN THE NOTE TO THE FOLLOWING: 
          1) TODAY AND EVERY DAY OF THE CURRENT WEEK
          2) CURRENT WEEK AND ALL WEEKS OF THE YEAR AND THE FOLLOWING YEAR
          3) CURRENT MONTH AND ALL MONTHS FOR THE NEXT 5 YEARS
          4) Current year and any year for the next 10 years
        */}
        {/* <div className={styles.formGroup}>
          <label 
            className={styles.addEventFormLabel}
            htmlFor='date-input'
            >
              *Date:
          </label>
          <input
            type="date"
            id='date-input'
            name="date"
            value={formData.date}
            onChange={handleFormInputChange}
            required
            className={styles.addEventFormInput}
          />
        </div> */}
        <button type="submit" className={styles.addEventFormButton}>Add Note</button>
      </form>
    </div>
  );
};

export default AddNoteForm;