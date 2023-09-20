import React, { useState } from 'react';
import styles from '../../../styles/components/Calendar/calendar.module.css';

const AddEventForm = (): JSX.Element => {

  const calendars = ["personal", "team"];

  const [formData, setFormData] = useState({
    date: '',
    repeat: false,
    eventName: '',
    eventDescription: '',
    repeatOption: '',
    selectedCalendar: calendars && calendars.length > 0 ? calendars[0] : null, // Default to the first calendar if available
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
      selectedCalendar: calendars && calendars.length > 0 ? calendars[0] : null,
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

  return (
    <div className={styles.addEventFormContainer}>
      <h2>Create Calendar Event</h2>
      <form onSubmit={handleSubmit} className={styles.addEventForm}>
        <div className={styles.formGroup}>
          <label className={styles.addEventFormLabel}>*Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
            className={styles.addEventFormInput}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.addEventFormLabel}>Select Time:</label>
          <select
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
          <label className={styles.addEventFormLabel}>Repeats:</label>
          <input
            type="checkbox"
            name="repeat"
            checked={formData.repeat}
            onChange={handleInputChange}
            className={styles.addEventFormCheckbox}
          />
        </div>
        {formData.repeat && ( // Render the repeat options if 'repeat' is true
          <div className={styles.formGroup}>
            <label className={styles.addEventFormLabel}>Repeat Option:</label>
            <select
              name="repeatOption"
              value={formData.repeatOption}
              onChange={handleInputChange}
              className={styles.addEventFormSelect}
            >
              <option value="">Select Repeat Option</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        )}
        <div className={styles.formGroup}>
          <label className={styles.addEventFormLabel}>*Event Name:</label>
          <input
            type="text"
            name="eventName"
            value={formData.eventName}
            onChange={handleInputChange}
            required
            className={styles.addEventFormInput}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.addEventFormLabel}>Event Description (Optional):</label>
          <textarea
            name="eventDescription"
            value={formData.eventDescription}
            onChange={handleInputChange}
            className={styles.addEventFormTextArea}
          />
        </div>
        {calendars && calendars.length > 0 && (
          <div className={styles.formGroup}>
            <label className={styles.addEventFormLabel}>*Select Calendar:</label>
            <select
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
        )}
        <button type="submit" className={styles.addEventFormButton}>Create Event</button>
      </form>
    </div>
  );
};

export default AddEventForm;