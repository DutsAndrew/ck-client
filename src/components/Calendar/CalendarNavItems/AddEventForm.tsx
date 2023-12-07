import React, { FC, useState } from "react";
import styles from '../../../styles/components/Calendar/calendar.module.css';
import { addEventFormProps } from "../../../types/interfaces";

const AddEventForm:FC<addEventFormProps> = (props): JSX.Element => {

  const { 
    userCalendars,
    userId,
    handleCloseModalRequest,
  } = props;

  const [formData, setFormData] = useState({
    date: '',
    repeat: false,
    eventName: '',
    eventDescription: '',
    repeatOption: '',
    selectedCalendar: '',
    selectedTime: '',
  });

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    console.log('Event Data:', formData);

    // save data to db

    // Reset the form
    setFormData({
      date: '',
      repeat: false,
      eventName: '',
      eventDescription: '',
      repeatOption: '',
      selectedCalendar: '',
      selectedTime: '',
    });
  };

  const generateTimeSlots = () => {
    const timeSlots = [];

    for (let hour = 5; hour <= 19; hour++) {
      for (let minute = 0; minute < 60; minute += 5) {
        const amPm = hour < 12 ? 'AM' : 'PM';
        const formattedHour = hour <= 12 ? hour : hour - 12;
        const formattedMinute = minute.toString().padStart(2, "0");
        const time = `${formattedHour}:${formattedMinute} ${amPm}`;
        timeSlots.push(time);
      };
    };
    return timeSlots;
  };

  const getDayOfWeekForRepeatOption = () => {
    const today = new Date().getDay();
    switch(today) {
      case 0:
        return 'Sunday';
      case 1:
        return 'Monday';
      case 2:
        return 'Tuesday';
      case 3:
        return 'Wednesday';
      case 4:
        return 'Thursday';
      case 5:
        return 'Friday';
      case 6:
        return 'Saturday';
    };
  };

  const getDayOfMonthForRepeatOption = () => {
    const today = new Date().getDate().toString();
    switch(today.slice(-1)) {
      case '1':
        return `${today}st`;
      case '2':
        return `${today}nd`;
      case '3':
        return `${today}rd`;
      default:
        return `${today}th`;
    };
  };

  return (
    <div className={styles.addEventFormContainer}>
      <h2 className={styles.addEventHeader}>
        Event
      </h2>
      <form onSubmit={handleSubmit} className={styles.addEventForm}>
        <div className={styles.formGroup}>
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
            onChange={handleInputChange}
            required
            className={styles.addEventFormInput}
          />
        </div>
        <div className={styles.formGroup}>
          <label 
            htmlFor='event-input'
            className={styles.addEventFormLabel}
          >
            *Event Name:
          </label>
          <input
            id='event-input'
            type="text"
            name="eventName"
            value={formData.eventName}
            onChange={handleInputChange}
            required
            className={styles.addEventFormInput}
          />
        </div>
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
            value={formData.selectedTime}
            onChange={handleInputChange}
            className={styles.addEventFormSelect}
          >
            <option value="">Select Time</option>
            {generateTimeSlots().map((timeSlot) => (
              <option key={timeSlot} value={timeSlot}>
                {timeSlot}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label 
            htmlFor='event-description-input'
            className={styles.addEventFormLabel}
          >
            Event Description (optional):
          </label>
          <textarea
            id='event-description-input'
            name="eventDescription"
            value={formData.eventDescription}
            onChange={handleInputChange}
            className={styles.addEventFormTextArea}
          />
        </div>
        <div className={styles.formGroup}>
          <label
            htmlFor='repeats-input'
            className={styles.addEventFormLabel}
          >
            Repeats:
          </label>
          <input
            id='repeats-input'
            type="checkbox"
            name="repeat"
            checked={formData.repeat}
            onChange={handleInputChange}
            className={styles.addEventFormCheckbox}
          />
        </div>
        {formData.repeat && ( // Render the repeat options if 'repeat' is true
          <div className={styles.formGroup}>
            <label 
              htmlFor='repeat-option-input'
              className={styles.addEventFormLabel}
            >
              Repeat Option:
            </label>
            <select
              id='repeat-option-input'
              name="repeatOption"
              value={formData.repeatOption}
              onChange={handleInputChange}
              className={styles.addEventFormSelect}
            >
              <option value="">Select Repeat Option</option>
              <option value="daily">Every day</option>
              <option value="weekly">Every {getDayOfWeekForRepeatOption()}</option>
              <option value="monthly">The {getDayOfMonthForRepeatOption()} of each month</option>
              <option value="yearly">On this day every year</option>
            </select>
          </div>
        )}
        {/* {calendars && calendars.length > 0 && (
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
              value={(formData as any).selectedCalendar}
              onChange={handleInputChange}
              className={styles.addEventFormSelect}
              required
            >
              {calendars.map((calendar) => (
                <option key={calendar} value={calendar} className={styles.addEventFormOption}>
                  {calendar}
                </option>
              ))}
            </select>
          </div>
        )} */}
        <button type="submit" className={styles.addEventFormButton}>Add Event</button>
      </form>
    </div>
  );
};

export default AddEventForm;