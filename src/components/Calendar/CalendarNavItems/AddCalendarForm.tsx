import React, { FC, useEffect, useState } from "react";
import styles from '../../../styles/components/Calendar/calendar.module.css';
import { addCalendarFormProps, addCalendarFormState, calendarUserQueryResults } from "../../../types/interfaces";
import toast from 'react-hot-toast'
import uniqid from "uniqid";

const AddCalendarForm:FC<addCalendarFormProps> = (props): JSX.Element => {

  const { 
    userId,
    appendNewCalendarToUser,
    handleCloseModalRequest,
  } = props;

  const [apiRequestSent, setApiRequestSent] = useState(false)
  const [userLookup, setUserLookup] = useState("");
  const [userLookupResults, setUserLookupResults] = useState<calendarUserQueryResults>([]);
  const [formData, setFormData] = useState<addCalendarFormState>({
    calendarName: '',
    createdBy: userId,
    authorizedUsers: [],
    viewOnlyUsers: [],
  });

  useEffect(() => {
    setFormData({
      ...formData,
      ['createdBy']: userId,
    })
  }, [userId]);

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

  const handleUserKeyClickOnSearchBarEntry = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.code === 'Enter') {
      handleUserSearchRequest();
    } else {
      return;
    };
  };

  const handleUserSearchRequest = async () => {
    toast.loading('Finding Users', {id: 'fetchingUsers'})
    const authToken = localStorage.getItem('auth-token');
    if (typeof authToken === 'undefined') {
      return toast.error('You need to be signed in or not in incognito to perform this action', {id: 'fetchingUsers'});
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
      if (!request.ok && request.status !== 200 && !jsonResponse.user_results) {
        setUserLookupResults([]);
        setUserLookup('');
        return toast.error(`${jsonResponse.detail}`, {id: 'fetchingUsers'});
      } else {
        setUserLookupResults(jsonResponse.user_results);
        return toast.success('Users found', {id: 'fetchingUsers'});
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
    toast.loading('Adding user to "View Only"', {id: 'viewOnlyUserRequest'});
    // exit if user is already in list
    if (formData.viewOnlyUsers.includes(user)) {
      return toast.error('User already marked to View Only', {id: 'viewOnlyUserRequest'});
    };
    // if the other invited user list has user, remove it and add it to this one instead
    if (formData.authorizedUsers.includes(user)) {
      toast.success('User moved from "Authorized" to "View Only"', {id: 'viewOnlyUserRequest'});
      return setFormData({
        ...formData,
        authorizedUsers: formData.authorizedUsers.filter((invitedUser) => invitedUser !== user),
        viewOnlyUsers: [...formData.viewOnlyUsers, user],
      });
    } else {
      toast.success('User added to "View Only', {id: 'viewOnlyUserRequest'});
      setFormData({
        ...formData,
        viewOnlyUsers: [...formData.viewOnlyUsers, user],
      });
    };
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
    toast.loading('Uploading calendar', {id: 'uploadingCalendar'});
    const authToken = localStorage.getItem('auth-token');
    if (typeof authToken === 'undefined') {
      return toast.error('You must be signed in or not in incognito to perform this action', {id: 'uploadingCalendar'});
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
      const jsonResponse = await request.json();
      if (!request.ok && request.status !== 200 && !jsonResponse.calendar) {
        return toast.error(`${jsonResponse.detail}`, {id: 'uploadingCalendar'});
      } else {
        appendNewCalendarToUser(jsonResponse.calendar);
        toast.success('Calendar Uploaded', {id: 'uploadingCalendar'});
        return handleCloseModalRequest();
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
            onKeyDown={(e) => handleUserKeyClickOnSearchBarEntry(e)}
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