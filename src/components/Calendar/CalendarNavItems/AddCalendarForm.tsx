import React, { useState } from "react";
import styles from '../../../styles/components/Calendar/calendar.module.css';

const AddCalendarForm = (): JSX.Element => {

  const [userLookup, setUserLookup] = useState('');
  const [userLookupResults, setUserLookupResults] = useState([]);

  const [formData, setFormData] = useState({
    date: '',
    repeat: false,
    calendarName: '',
    invitedUsers: [],
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddUser = (user: any) => {

  };

  const handleRemoveUser = (user: any) => {

  };

  const handleSubmit = () => {

  };

  return (
    <div className={styles.addCalendarFormContainer}>
      <h2>Calendar</h2>
      <form onSubmit={handleSubmit} className={styles.addCalendarForm}>
        <div className={styles.formGroup}>
          <label 
            htmlFor='calendar-name-input'
            className={styles.addCalendarFormLabel}
          >
            **Calendar Name:
          </label>
          <input
            id='calendar-name-input'
            name="calendarName"
            value={formData.calendarName}
            onChange={handleInputChange}
            className={styles.addCalendarFormInput}
            required>
          </input>
        </div>
        
        <div className={styles.addCalendarUserInviteContainer}>
          <div className={styles.formGroup}>
            <label htmlFor='user-search-input' className={styles.addCalendarFormLabel}>
              Search Users:
            </label>
            <input
              type="text"
              id='user-search-input'
              value={userLookup}
              onChange={handleInputChange}
              className={styles.addCalendarFormInput}
            />
            <button type="submit">Search</button>
          </div>
        </div>

        <div className={styles.addCalendarUserQueryResultsContainer}>
          <h3>Search Results:</h3>
          <ul>
            {userLookupResults.map((user) => (
              <li key={user}>
                {user}
                <button onClick={() => handleAddUser(user)}>Add</button>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.addCalendarSelectedUsersContainer}>
          <h3>Selected Users:</h3>
          <ul>
            {userLookupResults.map((user) => (
              <li key={user}>
                {user}
                <button onClick={() => handleRemoveUser(user)}>X</button>
              </li>
            ))}
          </ul>
        </div>
      </form>
    </div>
  );
};

export default AddCalendarForm;