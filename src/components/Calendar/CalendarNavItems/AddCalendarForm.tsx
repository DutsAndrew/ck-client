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
    authorizedUsers: [],
    viewOnlyUsers: [],
  });

  const handleCalendarNameChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUserSearchBarEntry = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (userLookup.length === 1) setUserLookupResults([]); // when user deletes entry, search results are removed
    return setUserLookup(event.currentTarget.value);
  };

  const handleUserSearchRequest = async () => {
    const authToken = localStorage.getItem('auth-token');
    if (typeof authToken === 'undefined') {
      return alert('You must be signed in and not in incognito to search for users in the database');
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
      setApiRequestSent(true);
      if (!request.ok) {
        return alert('We were unable to lookup that user, please try again later');
      } else {
        if (jsonResponse.user_results) {
          // handle good fetch
          setUserLookupResults(jsonResponse.user_results);
        } else {
          alert('We could not find the user you were looking for');
          setUserLookupResults([]);
          setUserLookup('');
        };
      };
    };
  };

  const handleAddUserToAuthorizedUsersList = (user: any) => {
    // exit if user is already in list
    if (formData.authorizedUsers.includes(user)) {
      return;
    };
    // if the other invited user list has user, remove it and add it to this one instead
    if (formData.viewOnlyUsers.includes(user)) {
      return setFormData({
        ...formData,
        viewOnlyUsers: formData.viewOnlyUsers.filter((invitedUser) => invitedUser !== user),
        authorizedUsers: [...formData.authorizedUsers, user],
      });
    };
    setFormData({
      ...formData,
      authorizedUsers: [...formData.authorizedUsers, user],
    });
  };

  const handleAddUserToViewOnlyUsersList = (user: any) => {
    // exit if user is already in list
    if (formData.viewOnlyUsers.includes(user)) {
      return;
    };
    // if the other invited user list has user, remove it and add it to this one instead
    if (formData.authorizedUsers.includes(user)) {
      return setFormData({
        ...formData,
        authorizedUsers: formData.authorizedUsers.filter((invitedUser) => invitedUser !== user),
        viewOnlyUsers: [...formData.viewOnlyUsers, user],
      });
    };
    setFormData({
      ...formData,
      viewOnlyUsers: [...formData.viewOnlyUsers, user],
    });
  };

  const handleRemoveUserFromAuthorizedUsersList = (user: any) => {
    setFormData({
      ...formData,
      authorizedUsers: formData.authorizedUsers.filter((invitedUser) => invitedUser !== user)
    });
  };

  const handleRemoveUserFromViewOnlyUsersList = (user: any) => {
    setFormData({
      ...formData,
      viewOnlyUsers: formData.viewOnlyUsers.filter((invitedUser) => invitedUser !== user)
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    uploadNewCalendarToDb();
  };

  const uploadNewCalendarToDb = async () => {
    const authToken = localStorage.getItem('auth-token');
    if (typeof authToken === 'undefined') {
      alert('You must be signed in and or not in incognito mode to send requests');
    } else {
      const apiUrl = 'http://127.0.0.1:8000/calendar/uploadCalendar';
      const request = await fetch(apiUrl, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(formData),
      });
      const response = await request.json();
      console.log(response);
      if (!response.ok) {
        // handle bad request
      } else {
        // handle good request
      };
    };
  };

  return (
    <div className={styles.addCalendarFormContainer}>
      <h2 className={styles.addCalendarHeader}>
        Calendar
      </h2>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.addCalendarForm}>
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
            minLength={1}
            maxLength={50}
            required>
          </input>
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor='user-search-input' className={styles.addCalendarFormLabel}>
            Add Users (first-name, last-name, or email):
          </label>
          <input
            type="text"
            id='user-search-input'
            value={userLookup}
            onChange={(e) => handleUserSearchBarEntry(e)}
            className={styles.addCalendarFormInput}
          />
          <button 
            className={styles.addCalendarUserSearchButton}
            type="button"
            onClick={() => handleUserSearchRequest()}>
            Search
          </button>
        </div>

        <div className={styles.addCalendarUserQueryResultsContainer}>
          <h3>Search Results:</h3>
          <ul className={styles.addCalendarUserQueryList}>
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
                  <div className={styles.addCalendarUserButtonContainer}>
                    <button 
                      className={styles.addCalendarUserAddButton}
                      onClick={() => handleAddUserToViewOnlyUsersList(user)}>
                      Add as View-Only
                    </button>
                    <button 
                      className={styles.addCalendarUserAddButton}
                      onClick={() => handleAddUserToAuthorizedUsersList(user)}>
                      Add as Authorized
                    </button>
                  </div>
                </li>
            ))}
          </ul>
          {apiRequestSent === true && userLookupResults.length === 0 && <p>No results</p>}
        </div>

        <div className={styles.addCalendarSelectedUsersContainer}>
          <h3>Authorized Users:</h3>
          <ul className={styles.addCalendarUserQueryList}>
            {formData.authorizedUsers.map((user) => (
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
                <button 
                  className={styles.addCalendarRemoveUserFromListButton}
                  onClick={() => handleRemoveUserFromAuthorizedUsersList(user)}>
                    X
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.addCalendarSelectedUsersContainer}>
          <h3>View-Only Users:</h3>
          <ul className={styles.addCalendarUserQueryList}>
            {formData.viewOnlyUsers.map((user) => (
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
                <button 
                  className={styles.addCalendarRemoveUserFromListButton}
                  onClick={() => handleRemoveUserFromViewOnlyUsersList(user)}>
                    X
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button type="submit" className={styles.addCalendarFormButton}>Create Calendar</button>
      </form>
    </div>
  );
};

export default AddCalendarForm;