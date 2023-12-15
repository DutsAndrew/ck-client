import React, { FC, useState } from "react";
import styles from '../../../styles/components/Calendar/calendar.module.css';
import { addEventFormProps, newEventCreatedApiResponse } from "../../../types/interfaces";
import toast from "react-hot-toast";

const AddEventForm:FC<addEventFormProps> = (props): JSX.Element => {

  const { 
    userCalendars,
    userId,
    handleCloseModalRequest,
    updateCalendarInUser,
    calendarEventEditRequest,
  } = props;

  const [formData, setFormData] = useState({
    combinedDateAndTime: '',
    date: '',
    eventName: '',
    eventDescription: '',
    repeat: false,
    repeatOption: '',
    selectedCalendar: '',
    selectedCalendarId: '',
    selectedTime: '',
  });

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

  const combineDateAndTime = (dateString: string, timeString: string) => {
    const [year, month, day] = dateString.split('-').map(Number);
    const [time, amPm] = timeString.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
  
    let hours24Format = hours;
    if (amPm === 'PM' && hours !== 12) {
      hours24Format += 12;
    } else if (amPm === 'AM' && hours === 12) {
      hours24Format = 0;
    };
  
    const combinedDate = new Date(year, month - 1, day, hours24Format, minutes);
    return combinedDate.toISOString();
  };

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
  
    let checkedValue: boolean | undefined = undefined;
    if (type === 'checkbox') {
      if (e.target instanceof HTMLInputElement) {
        checkedValue = e.target.checked;
      };
    };
  
    let calendarId = '';
    if (e.target instanceof HTMLSelectElement) {
      calendarId = e.target.options[e.target.selectedIndex].getAttribute('data-calendarid') || '';
    };
  
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checkedValue : value,
      selectedCalendarId: calendarId,
    });
  };  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toast.loading('Creating event...', {id: 'creatingEvent'});

    const formDataConverted = formData;
    formDataConverted.combinedDateAndTime = combineDateAndTime(formData.date, formData.selectedTime);

    const userAuth = isUserAuthorized();
    if (!userAuth) return toast.error('You are not authorized to modify this calendar', {id: 'creatingEvent'});

    return await uploadEventToDb(formDataConverted);
  };

  const isUserAuthorized = () => {
    const calendars = [userCalendars.personalCalendar, ...userCalendars.teamCalendars];
    const selectedCalendar = calendars.find(calendar => calendar._id === formData.selectedCalendarId);
  
    if (selectedCalendar) {
      const authorizedUsers = selectedCalendar.authorized_users;
      return authorizedUsers.some(user => user._id === userId);
    };
  
    return false;
  };
  

  const uploadEventToDb = async (formDataConverted: Object) => {
    const authToken = localStorage.getItem('auth-token');
    if (typeof authToken === 'undefined') {
      return toast.error('You must be signed in or not in incognito to perform this action', {id: 'creatingEvent'});
    } else {
      const apiUrl = `http://127.0.0.1:8000/calendar/${formData.selectedCalendarId}/createEvent`;
      const request = await fetch(apiUrl, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(formDataConverted),
      });
      const jsonResponse = await request.json();
      if (!request.ok && request.status !== 200 && !jsonResponse.calendar) {
        return toast.error(`${jsonResponse.detail}`, {id: 'creatingEvent'});
      } else {
        toast.success('Event created!', {id: 'creatingEvent'});
        resetFormState();
        handleGoodApiRequest(jsonResponse);
        return handleCloseModalRequest();
      };
    };
  };

  const resetFormState = () => {
    setFormData({
      combinedDateAndTime: '',
      date: '',
      repeat: false,
      eventName: '',
      eventDescription: '',
      repeatOption: '',
      selectedCalendar: '',
      selectedCalendarId: '',
      selectedTime: '',
    });
  };

  const handleGoodApiRequest = (jsonResponse: newEventCreatedApiResponse) => {
    return updateCalendarInUser(jsonResponse.updated_calendar);
  };

  return (
    <div className={styles.addEventFormContainer}>
      <h2 className={styles.addEventHeader}>
        Event
      </h2>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.addEventForm}>
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
            onChange={(e) => handleInputChange(e)}
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
            onChange={(e) => handleInputChange(e)}
            minLength={1}
            maxLength={250}
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
            onChange={(e) => handleInputChange(e)}
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
            onChange={(e) => handleInputChange(e)}
            maxLength={250}
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
            onChange={(e) => handleInputChange(e)}
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
              onChange={(e) => handleInputChange(e)}
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
        {[userCalendars.personalCalendar, ...userCalendars.teamCalendars] && (
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
              onChange={(e) => handleInputChange(e)}
              className={styles.addEventFormSelect}
              required
            >
              <option value="">Select Calendar</option>
              {[userCalendars.personalCalendar, ...userCalendars.teamCalendars].map((calendar) => (
                <option 
                  key={calendar._id} 
                  value={calendar.name} 
                  className={styles.addEventFormOption}
                  data-calendarid={calendar._id}
                >
                  {calendar.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <button 
          type="button" 
          className={styles.addEventFormButton}
          onClick={(e) => handleSubmit(e)}
        >
          Add Event
        </button>
      </form>
    </div>
  );
};

export default AddEventForm;