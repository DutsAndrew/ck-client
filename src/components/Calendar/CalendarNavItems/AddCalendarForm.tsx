import React, { useState } from "react";
import styles from '../../../styles/components/Calendar/calendar.module.css';
import { addCalendarFormProps, calendarUserQueryResults } from "../../../types/interfaces";
import uniqid from "uniqid";

const AddCalendarForm = (): JSX.Element => {

  const [apiRequestSent, setApiRequestSent] = useState(false)
  const [userLookup, setUserLookup] = useState("");
  const [userLookupResults, setUserLookupResults] = useState<calendarUserQueryResults>([]);
  const [formData, setFormData] = useState<addCalendarFormProps>({
    calendarName: '',
    invitedUsers: [],
  });

  const handleCalendarNameChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUserSearchBarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserLookup(event.target.value);
  };

  const handleUserSearchRequest = async () => {
    const authToken = localStorage.getItem('auth-token');
    if (typeof authToken === 'undefined') {
      return alert('You must be signed in and not in incognito to remain authorized');
    } else {
      const apiUrl = `http://127.0.0.1:8000/calendar/userQuery?user=${userLookup}`;
      const request = await fetch(apiUrl, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        method: 'GET',
      });
      const jsonResponse = await request.json();
      if (!request.ok) {
        return alert('We were unable to lookup that user, please try again later');
      } else {
        if (jsonResponse.user_results) {
          // handle good fetch
          setUserLookupResults(jsonResponse.user_results);
          setApiRequestSent(true);
        } else {
          alert('We could not find the user you were looking for');
        };
      };
    };
  };

  const handleAddUserToCalendarChange = (user: any) => {
    setFormData({
      ...formData,
      invitedUsers: [...formData.invitedUsers, user],
    })
  };

  const handleRemoveUserFromCalendarChange = (user: any) => {
    // clean up filter logic to match API return results
    setFormData({
      ...formData,
      invitedUsers: formData.invitedUsers.filter((invitedUser) => invitedUser !== user)
    })
  };

  const handleSubmit = () => {
    // run error handling
    // sanitize
    // upload to db
  };

  const checkForFormErrors = () => {

  };

  const sanitizeData = () => {

  };

  const uploadNewCalendarToDb = () => {

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
            onChange={handleCalendarNameChange}
            className={styles.addCalendarFormInput}
            required>
          </input>
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor='user-search-input' className={styles.addCalendarFormLabel}>
            Search Users (first-name, last-name, or email):
          </label>
          <input
            type="text"
            id='user-search-input'
            value={userLookup}
            onChange={handleUserSearchBarChange}
            className={styles.addCalendarFormInput}
          />
          <button 
            type="button"
            onClick={() => handleUserSearchRequest()}>
            Search
          </button>
        </div>

        <div className={styles.addCalendarUserQueryResultsContainer}>
          <h3>Search Results:</h3>
          <ul>
            {userLookupResults.length > 0 && Array.isArray(userLookupResults) && userLookupResults.map((user) => (
                <li 
                  className={styles.userLookUpResultsListItem}
                  key={uniqid()}
                >
                  <p className={styles.userLookUpResultsMainText}>
                    {user.user.first_name} {user.user.last_name}, {user.user.job_title} - {user.user.company}
                  </p>
                  <p className={styles.userLookUpResultsEmailText}>
                    {user.user.email}
                  </p>
                  <button onClick={() => handleAddUserToCalendarChange(user)}>Add</button>
                </li>
            ))}
          </ul>
            {apiRequestSent === true && userLookupResults.length === 0 && <p>No results</p>}
        </div>

        <div className={styles.addCalendarSelectedUsersContainer}>
          <h3>Selected Users:</h3>
          <ul>
            {formData.invitedUsers.map((user) => (
              <li
                className={styles.userLookUpResultsListItem} 
                key={uniqid()}
              >
                {user.user}
                <button onClick={() => handleRemoveUserFromCalendarChange(user)}>X</button>
              </li>
            ))}
          </ul>
        </div>
      </form>
    </div>
  );
};

export default AddCalendarForm;