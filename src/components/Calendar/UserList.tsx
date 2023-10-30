// component for rendering user lists in Edit Calendar
import React, { FC, useState } from "react";
import styles from '../../styles/components/Calendar/calendar.module.css';
import { calendarObject, userCalendarInstance, userCalendarPendingUserInstance, userInstance, userListProps, userListState } from "../../types/interfaces";
import uniqid from "uniqid";
import { json } from "stream/consumers";

const UserList:FC<userListProps> = (props): JSX.Element => {

  const { 
    users,
    type,
    userId,
    authUserIds,
    selectedCalendarId,
  } = props;

  const [userActivated, setUserActivated] = useState<userListState>({});

  const idString = `${type.toLowerCase()}-user-list-container`;
  const idRef = styles[idString];

  const identifyUserIdFromDifferentTypes = (user: userCalendarInstance) => {
    let userId;
    if (type === 'Pending') {
      userId = (user as unknown as userCalendarPendingUserInstance)['user']._id;
    } else {
      userId = user._id;
    };
    return userId;
  };

  const handleUserItemClick = (user: userCalendarInstance): void => {
    const userId = identifyUserIdFromDifferentTypes(user);
    if ((userActivated as userInstance)._id === userId) {
      return setUserActivated({});
    } else {
      if (type === 'Pending') {
        return setUserActivated((user as unknown as userCalendarPendingUserInstance)['user']);
      } else {
        return setUserActivated(user);
      };
    };
  };

  const handleRemoveUser = async (user: userCalendarInstance): Promise<void> => {
    const userId = identifyUserIdFromDifferentTypes(user);
    if (authUserIds.includes(userId)) {
      const authToken = localStorage.getItem('auth-token');
      if (typeof authToken === 'undefined') {
        return alert('You must be signed in and not in incognito to remain authorized')
      } else {
        const apiUrl = `http://127.0.0.1:8000/calendar/${selectedCalendarId}/removeUserFromCalendar/${type.toLowerCase()}/?user=${userId}`;
        const request = await fetch(apiUrl, {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
          method: 'DELETE',
        });
        const jsonResponse = await request.json();
        if (jsonResponse.updated_calendar) {
          handleSuccessfulUserRemovalFromCalendar(jsonResponse.updated_calendar)
        } else {
          alert(`Whoops, ${jsonResponse.detail}`);
        };
      };
      return;
    } else {
      return alert('You do not have the permissions to perform this action');
    };
  };

  const handleSuccessfulUserRemovalFromCalendar = (updatedCalendar: calendarObject) => {
    return; // setup API to send populated object back and then save it to calendar root
  };

  const handleChangeUserPermissions = (user: userCalendarInstance): void => {
    if (authUserIds.includes(userId)) {
      return;
    } else {
      return alert('You do not have the permissions to perform this action');
    };
  };

  if (Array.isArray(users) && users.length > 0) {
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
        {Array.isArray(users) && users.map((user) => {
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