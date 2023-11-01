import React, { FC, useState } from "react";
import styles from '../../styles/components/Calendar/calendar.module.css';
import { AddUserToCalendarListProps } from "../../types/interfaces";
import searchSvg from '../../assets/magnify.svg';
import { json } from "stream/consumers";

const AddUserToCalendarList:FC<AddUserToCalendarListProps> = (props): JSX.Element => {

  const { 
    handleAddUserClick, 
    addUserActivated 
  } = props;

  const [userLookup, setUserLookup] = useState('');
  const [userQueryResults, setUserQueryResults] = useState([]);

  const handleSearchBarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (userLookup.length === 1) setUserQueryResults([]); // when user deletes entry, search results are removed
    return setUserLookup(event.currentTarget.value);
  };

  const handleSearchBarEnterClick = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.code === 'Enter') { // user wants to search
      return handleUserQueryToDb()
    } else {
      return;
    };
  };

  const handleUserQueryToDb = async () => {
    if (userLookup.length < 2) return alert('Your user lookup is too short');
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
      if (jsonResponse.user_results) {
        return setUserQueryResults(jsonResponse.user_results);
      } else {
        alert('We could not find the user you were looking for')
        setUserQueryResults([]);
        setUserLookup('');
      };
    };
  };

  return (
    <>
      <button 
        onClick={() => handleAddUserClick()}
        className={styles.calendarEditorAddUserButton}>
        {addUserActivated === false ? 'Add User' : 'Close'}
      </button>
      {addUserActivated === true && 
        <div className={styles.addUserToCalendarMainContainer}>
          <div className={styles.addUserToCalendarSearchContainer}>
            <input 
              type="text"
              aria-label="search"
              className={styles.addUserToCalendarListInput}
              placeholder="Search a user..."
              onChange={(e) => handleSearchBarChange(e)}
              onKeyDown={(e) => handleSearchBarEnterClick(e)}>

            </input>
            <img 
              src={searchSvg}
              className={styles.searchIconSvg}
              alt="search icon"
              onClick={() => handleUserQueryToDb()}>
            </img>
          </div>
          <ul className={styles.addUserToCalendarSearchResultsList}>

          </ul>
        </div>
      }
    </>
  );
};

export default AddUserToCalendarList;