import React, { FC, useState } from "react";
import styles from '../../../styles/components/Calendar/calendar.module.css';
import { addNoteFormProps, calendarObject } from "../../../types/interfaces";

const AddNoteForm:FC<addNoteFormProps> = (props): JSX.Element => {

  const { userCalendars } = props;

  const [formElements, setFormElements] = useState({
    specificDay: false,
    specificWeek: false,
    specificMonth: false,
    specificYear: false,
  });

  const [formData, setFormData] = useState({
    note: '',
    selectedDay: '',
    selectedWeek: '',
    selectedMonth: '',
    selectedYear: '',
    selectedCalendar: '',
  });

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
    for (let i = 0; i < 11; i++) {
      years.push(year + i);
    };
    return years;
  };

  const handleFormInputChange = (
    typeOfChange: string,
    e: React.ChangeEvent<HTMLInputElement> 
    | React.ChangeEvent<HTMLTextAreaElement> 
    | React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (typeOfChange === 'checkbox') return handleCheckBoxSelection(e);
    if (
      typeOfChange === 'note' 
      || typeOfChange === 'day'
      || typeOfChange === 'week'
      || typeOfChange === 'month'
      || typeOfChange === 'year'
      || typeOfChange === 'calendar'
    ) return handleFormDataEntry(e);
  };

  const handleCheckBoxSelection = (
    e: React.ChangeEvent<HTMLInputElement> 
    | React.ChangeEvent<HTMLTextAreaElement> 
    | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const inputId = e.target.id;
    const checkStatus = (e.target as any).checked;
    setFormElements((prevFormElements) => ({
      specificDay: inputId === 'day-checkbox' ? checkStatus : false,
      specificWeek: inputId === 'week-checkbox' ? checkStatus : false,
      specificMonth: inputId === 'month-checkbox' ? checkStatus : false,
      specificYear: inputId === 'year-checkbox' ? checkStatus : false,
    }));
  };

  const handleFormDataEntry = (
    e: React.ChangeEvent<HTMLInputElement> 
    | React.ChangeEvent<HTMLTextAreaElement> 
    | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const inputId = e.target.id;
    const value = e.target.value;
    setFormData((prevFormData) => ({
      note: inputId === 'note-input' ? value : prevFormData.note,
      selectedDay: inputId === 'day-input' ? value : '',
      selectedWeek: inputId === 'week-input' ? value : '',
      selectedMonth: inputId === 'month-input' ? value : '',
      selectedYear: inputId === 'year-input' ? value : '',
      selectedCalendar: inputId === 'calendar-selection-input' ? value : prevFormData.selectedCalendar,
    }));
  };

  const handleFormKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' || e.code === 'Enter') {
      e.preventDefault();
    };
  };

  const handleAddNoteSubmitClick = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    
  };

  return (
    <div className={styles.addEventFormContainer}>
      <h2 className={styles.addEventHeader}>
        Note
      </h2>

      <form 
        onKeyDown={(e) => handleFormKeyDown(e)}
        className={styles.addEventForm}>
        <div className={styles.formGroup}>
          <textarea
            id='note-input'
            name="note"
            value={formData.note}
            minLength={1}
            maxLength={255}
            onChange={(e) => handleFormInputChange('note', e)}
            placeholder="Write a note for your calendar..."
            required
            className={styles.addEventFormInput}
          />
        </div>
  
        <div className={styles.formGroup}>
          <label
            htmlFor='date-checkbox'
            className={styles.addEventFormLabel}
          >
            Note for a specific date?
          </label>
          <input
            id='day-checkbox'
            type="checkbox"
            name="day-checkbox"
            checked={formElements.specificDay}
            onChange={(e) => handleFormInputChange('checkbox', e)}
            className={styles.addEventFormCheckbox}
          />
          {formElements.specificDay === true && 
            <div className={styles.formGroup}>
              <input
                type="date"
                id='day-input'
                name="day"
                value={formData.selectedDay}
                onChange={(e) => handleFormInputChange('day', e)}
                className={styles.addEventFormInput}
              />
            </div>
          }
        </div>

        <div className={styles.formGroup}>
          <label
            htmlFor='week-input'
            className={styles.addEventFormLabel}
          >
            Note for a specific week?
          </label>
          <input
            id='week-checkbox'
            type="checkbox"
            name="week-checkbox"
            checked={formElements.specificWeek}
            onChange={(e) => handleFormInputChange('checkbox', e)}
            className={styles.addEventFormCheckbox}
          />
          {formElements.specificWeek === true && 
            <div className={styles.formGroup}>
              <select
                id='week-input'
                name="week"
                value={formData.selectedWeek}
                onChange={(e) => handleFormInputChange('week', e)}
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

        <div className={styles.formGroup}>
          <label
            htmlFor='month-input'
            className={styles.addEventFormLabel}
          >
            Note for a specific month?
          </label>
          <input
            id='month-checkbox'
            type="checkbox"
            name="month-checkbox"
            checked={formElements.specificMonth}
            onChange={(e) => handleFormInputChange('checkbox', e)}
            className={styles.addEventFormCheckbox}
          />
          {formElements.specificMonth === true && 
            <div className={styles.formGroup}>
              <select
                id='month-input'
                name="month"
                value={formData.selectedMonth}
                onChange={(e) => handleFormInputChange('month', e)}
                className={styles.addEventFormSelect}
              >
                <option value="">Select Month</option>
                {generateMonthSnapShotsForFiveYears().map((monthSnapshot) => (
                  <option key={monthSnapshot} value={monthSnapshot}>
                    {monthSnapshot}
                  </option>
                ))}
              </select>
            </div>
          }
        </div>

        <div className={styles.formGroup}>
          <label
            htmlFor='month-input'
            className={styles.addEventFormLabel}
          >
            Note for a specific year?
          </label>
          <input
            id='year-checkbox'
            type="checkbox"
            name="year-checkbox"
            checked={formElements.specificYear}
            onChange={(e) => handleFormInputChange('checkbox', e)}
            className={styles.addEventFormCheckbox}
          />
          {formElements.specificYear === true && 
            <div className={styles.formGroup}>
              <select
                id='year-input'
                name="year"
                value={formData.selectedYear}
                onChange={(e) => handleFormInputChange('year', e)}
                className={styles.addEventFormSelect}
              >
                <option value="">Select Year</option>
                {generateYearSnapshotForTenYears().map((yearSnapshot) => (
                  <option key={yearSnapshot} value={yearSnapshot}>
                    {yearSnapshot}
                  </option>
                ))}
              </select>
            </div>
          }
        </div>

        {/* SETUP SO USER HAS TO SELECT WHICH CALENDAR TO ADD NOTES TOO */}
        {userCalendars && (
          <div className={styles.formGroup}>
            <label
              htmlFor='calendar-selection-input'
              className={styles.addEventFormLabel}
            >
              *Select Calendar:
            </label>
            <select
              id='calendar-selection-input'
              name="selectedCalendar"
              value={formData.selectedCalendar}
              onChange={(e) => handleFormInputChange('calendar', e)}
              className={styles.addEventFormSelect}
              required
            >
              {[userCalendars.personalCalendar].map((personalCalendar: calendarObject) => (
                <option key={personalCalendar._id} value={personalCalendar.name} className={styles.addEventFormOption}>
                  {personalCalendar.name}
                </option>
              ))}
              {userCalendars.teamCalendars.map((teamCalendar: calendarObject) => (
                <option key={teamCalendar._id} value={teamCalendar.name} className={styles.addEventFormOption}>
                  {teamCalendar.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <button 
          type="submit" 
          onClick={(e) => handleAddNoteSubmitClick(e)}
          className={styles.addEventFormButton}>
            Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNoteForm;