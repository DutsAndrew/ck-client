import React, { FC, useState } from "react";
import styles from '../../../styles/components/Calendar/calendar.module.css';
import { addNoteFormProps } from "../../../types/interfaces";

const AddNoteForm:FC<addNoteFormProps> = (props): JSX.Element => {

  const { calendarDatesData } = props;

  const [formElements, setFormElements] = useState({
    specificDay: false,
    specificWeek: false,
    specificMonth: false,
    specificYear: false,
  })

  const [formData, setFormData] = useState({
    date: '',
    note: '',
    selectedDay: '',
    selectedWeek: '',
    selectedMonth: '',
    selectedYear: '',
  })

  const generateDaySnapshotsForWeek = () => {
    const today = new Date();
    const currentDay = today.getDay();

    // calc Monday of week
    const monday = new Date(today);
    monday.setDate(today.getDate() - currentDay + 1);
    const mondayFormatted = monday.toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric' }); // keep it in MM DD format

    // init array for week
    const datesOfWeek = [mondayFormatted];

    // fill remainder of week
    for (let i = 1; i < 7; i++) {
      const nextDay = new Date(monday);
      nextDay.setDate(monday.getDate() + i);
      const nextDayFormatted = nextDay.toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric' }); // keep it in MM DD format
      datesOfWeek.push(nextDayFormatted);
    };

    return datesOfWeek;
  };

  const generateWeekSnapshotsForYear = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    const startOfWeek = (date: Date) => {
      const day = date.getDay();
      return new Date(date.getFullYear(), date.getMonth(), date.getDate() - (day === 0 ? 6 : day - 1));
    };

    const endOfWeek = (date: Date) => {
      const start = startOfWeek(date);
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      return end;
    };

    const weekSnapshots: string[] = [];

    let currentDatePointer = new Date(currentYear, 0, 1); // Start from January 1st of the current year

    while (currentDatePointer.getFullYear() === currentYear) {
      const startDate = startOfWeek(currentDatePointer);
      const endDate = endOfWeek(currentDatePointer);
      
      const startFormatted = startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const endFormatted = endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const dateFormatted = `${startFormatted} - ${endFormatted}`;
      
      weekSnapshots.push(dateFormatted);
      
      // Move to the next week
      currentDatePointer.setDate(currentDatePointer.getDate() + 7);
    }

    return weekSnapshots;
  };

  const generateMonthSnapShotsForFiveYears = () => {
    const calendarMonths = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];

    const fiveYearList: string[] = [];
    let year = new Date().getFullYear();

    for (let i = 0; i < 6; i++) {
      calendarMonths.forEach((month) => {
        const appendYearToMonth = `${month} ${year + i}`
        fiveYearList.push(appendYearToMonth);
      });
    };

    return fiveYearList;
  };

  const generateYearSnapshotForTenYears = () => {
    const years: number[] = [];
    let year = new Date().getFullYear();
    for (let i = 0; i < 10; i++) {
      years.push(year + i);
    };
    return years;
  };

  const handleFormInputChange = () => {

  };

  const handleFormSubmit = () => {

  };

  return (
    <div className={styles.addEventFormContainer}>
      <h2 className={styles.addEventHeader}>
        Note
      </h2>
      <form onSubmit={handleFormSubmit} className={styles.addEventForm}>
        <div className={styles.formGroup}>
          <textarea
            id='note-input'
            name="note"
            value={formData.note}
            onChange={handleFormInputChange}
            placeholder="Write a note to self..."
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
        <div className={styles.formGroup}>
          <label
            htmlFor='repeats-input'
            className={styles.addEventFormLabel}
          >
            Not for a specific date?
          </label>
          <input
            id='repeats-input'
            type="checkbox"
            name="repeat"
            checked={formElements.specificDay}
            onChange={handleFormInputChange}
            className={styles.addEventFormCheckbox}
          />
          {formElements.specificDay === true && 
            <div className={styles.formGroup}>
              <input
                type="date"
                id='date-input'
                name="date"
                value={formData.date}
                onChange={handleFormInputChange}
                required
                className={styles.addEventFormInput}
              />
            </div>
          }
        </div>

        <div className={styles.formGroup}>
          <label
            htmlFor='repeats-input'
            className={styles.addEventFormLabel}
          >
            Not for a specific week?
          </label>
          <input
            id='repeats-input'
            type="checkbox"
            name="repeat"
            checked={formElements.specificDay}
            onChange={handleFormInputChange}
            className={styles.addEventFormCheckbox}
          />
          {formElements.specificWeek === true && 
            <div className={styles.formGroup}>
              <label
                htmlFor='time-input'
                className={styles.addEventFormLabel}
              >
                Select Time (optional):
              </label>
              <select
                id='time-input'
                name="selectedTime"
                value={formData.selectedWeek}
                onChange={handleInputChange}
                className={styles.addEventFormSelect}
              >
                <option value="">Select Week</option>
                {generateWeekSnapshotsForYear().map((weekSnapShot) => (
                  <option key={weekSnapShot} value={weekSnapShot}>
                    {weekSnapShot}
                  </option>
                ))}
              </select>
            </div>
          }
        </div>
        <button type="submit" className={styles.addEventFormButton}>Add Note</button>
      </form>
    </div>
  );
};

export default AddNoteForm;