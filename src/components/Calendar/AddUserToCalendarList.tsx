import React, { FC, useState } from "react";
import styles from '../../styles/components/Calendar/calendar.module.css';
import { AddUserToCalendarListProps, calendarUserQueryResults, userQuery } from "../../types/interfaces";
import searchSvg from '../../assets/magnify.svg';
import plusSvg from '../../assets/plus.svg';
import uniqid from "uniqid";

const AddUserToCalendarList:FC<AddUserToCalendarListProps> = (props): JSX.Element => {

  const { 
    handleAddUserClick, 
    addUserActivated,
    selectedCalendarId,
    type,
  } = props;

  const [apiRequestSent, setApiRequestSent] = useState(false);
  const [userLookup, setUserLookup] = useState('');
  const [userQueryResults, setUserQueryResults] = useState<calendarUserQueryResults>([]);
  const [typeOfPendingUser, setTypeOfPendingUser] = useState('');

  const handleSearchBarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (userLookup.length === 1) setUserQueryResults([]); // when user deletes entry, search results are removed
    return setUserLookup(event.currentTarget.value);
  };

  const handleSearchBarEnterClick = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.code === 'Enter') { // user wants to search
      return handleUserQueryToDb()
    } else {
      handleSearchBarChange((e as any));
    };
  };

  const handlePendingUserButtonActivation = (typeOfAuth: string) => {
    setTypeOfPendingUser(typeOfAuth);
  };

  const handleUserQueryToDb = async () => {
    if (userLookup.length === 0) return alert('Your user lookup is too short');
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
      console.log(jsonResponse);
      setApiRequestSent(true);
      if (jsonResponse.user_results) {
        return setUserQueryResults(jsonResponse.user_results);
      } else {
        alert('We could not find the user you were looking for')
        setUserQueryResults([]);
        setUserLookup('');
      };
    };
  };

  const handleAddUserClickRequest = async (user: userQuery) => {
    if (type.toLowerCase() === 'pending' && typeOfPendingUser.length === 0) {
      alert('You cannot add a pending user, without marking the user as "Authorized" or "View Only"');
    };
    const authToken = localStorage.getItem('auth-token');
    if (typeof authToken === 'undefined') {
      return alert('You must be signed in and not in incognito to search for users in the database');
    } else {
      const typeConversion = type.toLowerCase() === 'view-only' ? 'view_only' : type.toLowerCase();
      const apiUrl = `
        http://127.0.0.1:8000/calendar/${selectedCalendarId}/addUser/${user.user._id}/${typeConversion}/${typeOfPendingUser}`;
      const request = await fetch(apiUrl, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        method: 'POST',
      });
      const jsonResponse = await request.json();
      console.log(jsonResponse);
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
              onKeyDown={(e) => handleSearchBarEnterClick(e)}
              value={userLookup}>

            </input>
            <img 
              src={searchSvg}
              className={styles.searchIconSvg}
              alt="search icon"
              onClick={() => handleUserQueryToDb()}>
            </img>
          </div>
          {userQueryResults.length > 0 && 
            <ul className={styles.addUserToCalendarSearchResultsList}>
              {userQueryResults.map((user) => {
                return <li 
                  className={styles.addUserToCalendarListItem}
                  key={uniqid()}
                >
                  <div className={styles.addUserToCalendarListItemTextContainer}>
                    <p className={styles.addUserToCalendarListText}>
                      {user.user.first_name ? user.user.first_name : ''}&nbsp;
                      {user.user.last_name ? user.user.last_name : ''} -&nbsp;
                      {user.user.job_title ? user.user.job_title : ''},&nbsp;
                      {user.user.company ? user.user.company : ''}
                    </p>
                    <p className={styles.addUserToCalendarEmailText}>
                      {user.user.email ? user.user.email : ''}
                    </p>
                    {type.toLowerCase() === 'pending' &&
                      <div className={styles.addUserToCalendarListPendingUserOptionsContainer}>
                        <button 
                          type='button'
                          onClick={() => handlePendingUserButtonActivation('authorized')}
                          className={typeOfPendingUser === 'authorized' ? 
                            styles.AddUserToCalendarListPendingUserOptionsButtonActive : 
                            styles.AddUserToCalendarListPendingUserOptionsButton
                          }>
                            Authorized
                        </button>
                        <button 
                          type='button'
                          onClick={() => handlePendingUserButtonActivation('view-only')}
                          className={typeOfPendingUser === 'view-only' ? 
                            styles.AddUserToCalendarListPendingUserOptionsButtonActive : 
                            styles.AddUserToCalendarListPendingUserOptionsButton
                          }>
                            View Only
                        </button>
                      </div>
                    }
                  </div>
                  <div className={styles.addCalendarUserButtonContainer}>
                    <img 
                      src={plusSvg} 
                      alt="plus icon" 
                      className={styles.addCalendarUserButton}
                      onClick={() => handleAddUserClickRequest((user as unknown as userQuery))}
                    >
                    </img>
                  </div>
                </li>
              })}
            </ul>
          }
          {apiRequestSent === true && userQueryResults.length === 0 && <p>No results</p>}
        </div>
      }
    </>
  );
};

export default AddUserToCalendarList;