// component for rendering user lists in Edit Calendar
import React, { FC, useState } from "react";
import styles from '../../styles/components/Calendar/calendar.module.css';
import { userCalendarInstance, userCalendarPendingUserInstance, userInstance, userListProps, userListState } from "../../types/interfaces";
import uniqid from "uniqid";
import { json } from "stream/consumers";

const UserList:FC<userListProps> = (props): JSX.Element => {

  const { calendar, type } = props;

  const [userActivated, setUserActivated] = useState<userListState>({});

  const idString = `${type.toLowerCase()}-user-list-container`;
  const idRef = styles[idString];

  const handleUserItemClick = (user: userCalendarInstance): void => {
    if (type === 'Pending') { // pending users have the user object nested
      if (
        (userActivated as userInstance)._id === 
        (user as unknown as userCalendarPendingUserInstance)['user']._id
      ) {
        return setUserActivated({});
      } else {
        setUserActivated((user as unknown as userCalendarPendingUserInstance)['user']);
      };
    } else {
      if ((userActivated as userInstance)._id === user._id) {
        return setUserActivated({});
      };
      return setUserActivated(user);
    };
  };

  const handleRemoveUser = async (user: userCalendarInstance): Promise<void> => {
    const authToken = localStorage.getItem('auth-token');
    if (typeof authToken === 'undefined') {
      return alert('You must be signed in and not in incognito to remain authorized')
    } else {
      const apiUrl = `http://127.0.0.1:8000/calendar/removeUserFromCalendar?user=${user._id}`;
      const request = await fetch(apiUrl, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        method: 'DELETE',
      });
      const jsonResponse = await request.json();
      console.log(jsonResponse);
    };
    return;
  };

  const handleChangeUserPermissions = (user: userCalendarInstance): void => {
    return;
  };

  if (Array.isArray(calendar) && calendar.length > 0) {
    return (
      <ul
        id={idRef} 
        className={styles.calendarEditorUsersList}>
        <h4 className={styles.calendarEditorUserListHeaderText}>
          {type} Users
        </h4>
        <button className={styles.calendarEditorAddUserButton}>
          Add User
        </button>
        {Array.isArray(calendar) && calendar.map((user) => {
          return <li
            key={uniqid()}
            onClick={() => handleUserItemClick(user)}
            className={styles.calendarEditorUserItemContainer}
          >
            <p className={styles.calendarEditorUserText}>
              {user.first_name ? user.first_name : (user as unknown as userCalendarPendingUserInstance)['user'].first_name},&nbsp;
              {user.last_name ? user.last_name : (user as unknown as userCalendarPendingUserInstance)['user'].last_name} -&nbsp;
              {user.job_title ? user.job_title : (user as unknown as userCalendarPendingUserInstance)['user'].job_title},&nbsp;
              {user.company ? user.company : (user as unknown as userCalendarPendingUserInstance)['user'].company}
            </p>
            <p className={styles.calendarEditorUserEmailText}>
              {user.email ? user.email : (user as unknown as userCalendarPendingUserInstance)['user'].email}
            </p>
            {(user as unknown as userCalendarPendingUserInstance).type ? 
              <p className={styles.calendarEditorUserPendingUserText}>
                Set as: <strong>{(user as unknown as userCalendarPendingUserInstance).type}</strong>
              </p>
              : ''
            }
            {Object.keys(userActivated).length > 0 ? 
              <button 
                onClick={() => handleRemoveUser(user)}
                className={styles.calendarEditorUserRemoveButton}>
                Remove
              </button> 
              : ''
            }
            {Object.keys(userActivated).length > 0 && (user as unknown as userCalendarPendingUserInstance).type ? 
              <button 
                onClick={() => handleChangeUserPermissions(user)}
                className={styles.calendarEditorUserEditPermissionsButton}>
                Change Permissions
              </button> 
              : ''
            }
          </li>
        })}
      </ul>
    );
  } else {
    return (
      <div 
        id={idRef} 
        className={styles.calendarEditorUsersListEmpty}>
        <h4 className={styles.calendarEditorUserListHeaderText}>
          {type} Users
        </h4>
        <button className={styles.calendarEditorAddUserButton}>
          Add User
        </button>
        <p className={styles.calendarEditorUserItemContainerEmpty}>
          No users to report
        </p>
      </div>
    );
  };
};

export default UserList;