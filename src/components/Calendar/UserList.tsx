// component for rendering user lists in Edit Calendar
import React, { FC, useEffect, useState } from "react";
import styles from '../../styles/components/Calendar/calendar.module.css';
import uniqid from "uniqid";
import AddUserToCalendarList from "./AddUserToCalendarList";
import toast from 'react-hot-toast'
import { 
  calendarObject, 
  userCalendarInstance, 
  userCalendarPendingUserInstance, 
  userInstance, 
  userListProps, 
  userListState ,
} from "../../types/calendarTypes";


const UserList:FC<userListProps> = (props): JSX.Element => {

  const { 
    users,
    type,
    userId,
    authUserIds,
    selectedCalendarId,
    updateCalendarInUser,
    handleCalendarEditorChange,
  } = props;

  const [userActivated, setUserActivated] = useState<userListState>({});
  const [addUserActivated, setAddUserActivated] = useState(false);
  const [changingUserPermissions, setChangingUserPermissions] = useState(false);
  const [selectedUserPermissions, setSelectedUserPermissions] = useState('');

  useEffect(() => {
    if (changingUserPermissions === false) setSelectedUserPermissions('');
  }, [changingUserPermissions]);

  const idString = `${type.toLowerCase()}-user-list-container`;
  const idRef = styles[idString];

  const identifyUserIdFromDifferentTypes = (user: userCalendarInstance) => {
    let selectedUserId;
    if (type === 'Pending') {
      selectedUserId = (user as unknown as userCalendarPendingUserInstance)['user']._id;
    } else {
      selectedUserId = user._id;
    };
    return selectedUserId;
  };

  const handleUserItemClick = (user: userCalendarInstance, e: React.MouseEvent<HTMLLIElement, MouseEvent>): void => {
    if ( // check if user is changing permissions, if so, ignore removing or adding selected user
      (e.target as any).id === 'calendar-editor-user-permissions-button' 
      || (e.target as any).id === 'calendar-editor-permissions-button-authorized'
      || (e.target as any).id === 'calendar-editor-permissions-button-view-only'
    ) {
      return;
    };

    // handle user either selecting or deselecting a user
    setChangingUserPermissions(false);
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
    toast.loading('Attempting to remove user', {id: 'removingUser'});
    const convertedUserId = identifyUserIdFromDifferentTypes(user);
    const authToken = localStorage.getItem('auth-token');
    if (authUserIds.includes(userId)) {
      if (typeof authToken === 'undefined') {
        toast.error('You must be signed in or not in incognito to make this request', {id: 'removingUser'});
      } else {
        const typeConversion = type.toLowerCase() === 'view-only' ? 'view_only' : type.toLowerCase();
        const apiUrl = `http://127.0.0.1:8000/calendar/${selectedCalendarId}/${typeConversion}/removeUserFromCalendar/${convertedUserId}`;
        const request = await fetch(apiUrl, {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
          method: 'DELETE',
        });
        const jsonResponse = await request.json();
        if (request.status === 200 && request.ok && jsonResponse.updated_calendar) {
          handleSuccessfulUserRemovalFromCalendar(jsonResponse.updated_calendar);
          toast.success('User removed!', {id: 'removingUser'});
        } else {
          toast.error(`${jsonResponse.detail}`, {id: 'removingUser'});
        }
      };
    } else {
      toast.error('You are not authorized to make that change', {id: 'removingUser'});
    };
  };

  const handleSuccessfulUserRemovalFromCalendar = (updatedCalendar: calendarObject) => {
    updateCalendarInUser(updatedCalendar);
    handleCalendarEditorChange(updatedCalendar);
  };

  const handleOpenUserPermissionsList = (): void => {
    const permissionsSwitch = changingUserPermissions === false ? true : false;
    setChangingUserPermissions(permissionsSwitch);
  };

  const handleUserPermissionChange = (type: string): void => {
    setSelectedUserPermissions(type);
  };

  const handleAddUserClick = () => {
    const userSwitch = addUserActivated === false ? true : false;
    setAddUserActivated(userSwitch);
  };

  if (Array.isArray(users) && users.length > 0) {
    return (
      <ul
        id={idRef} 
        className={styles.calendarEditorUsersList}
      >
        <h4 className={styles.calendarEditorUserListHeaderText}>
          {type} Users
        </h4>
        <AddUserToCalendarList 
          handleAddUserClick={handleAddUserClick}
          addUserActivated={addUserActivated}
          selectedCalendarId={selectedCalendarId}
          type={type}
          updateCalendarInUser={updateCalendarInUser}
          handleCalendarEditorChange={handleCalendarEditorChange}
        />
        {Array.isArray(users) && users.map((user) => {
          return <li
            key={uniqid()}
            onClick={(e) => handleUserItemClick(user, e)}
            id="calendar-editor-user-item-container"
            className={styles.calendarEditorUserItemContainer}
          >
            <p 
              id="calendar-editor-user-text"
              className={styles.calendarEditorUserText}
            >
              {(
                (user.first_name || (user as unknown as userCalendarPendingUserInstance)['user'].first_name)
                && (user.last_name || (user as unknown as userCalendarPendingUserInstance)['user'].last_name)
                && (user.job_title || (user as unknown as userCalendarPendingUserInstance)['user'].job_title)
                && (user.company || (user as unknown as userCalendarPendingUserInstance)['user'].company)
              ) ? (
                <>
                  {(user.first_name 
                    ? user.first_name 
                    : (user as unknown as userCalendarPendingUserInstance)['user'].first_name) 
                    || ''
                  },&nbsp;
                  {(user.last_name 
                    ? user.last_name 
                    : (user as unknown as userCalendarPendingUserInstance)['user'].last_name) 
                    || ''
                  } -&nbsp;
                  {(user.job_title 
                    ? user.job_title 
                    : (user as unknown as userCalendarPendingUserInstance)['user'].job_title)
                    || ''
                  },&nbsp;
                  {(user.company 
                    ? user.company 
                    : (user as unknown as userCalendarPendingUserInstance)['user'].company) 
                    || ''
                  }
                </>
              ) : ''}
            </p>
            <p 
              id="calendar-editor-user-email-text"
              className={styles.calendarEditorUserEmailText}
            >
              {user.email ? user.email : (user as unknown as userCalendarPendingUserInstance)['user'].email}
            </p>
            {(user as unknown as userCalendarPendingUserInstance).type ? 
              <p 
                id="calendar-editor-user-permissions-text"
                className={styles.calendarEditorUserPendingUserText}
              >
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
            {Object.keys(userActivated).length > 0 &&
              <button 
                onClick={() => handleOpenUserPermissionsList()}
                id="calendar-editor-user-permissions-button"
                className={styles.calendarEditorUserEditPermissionsButton}>
                Change Permissions
              </button>
            }
            {Object.keys(userActivated).length > 0 && changingUserPermissions === true &&
              <div className={styles.addUserToCalendarListPendingUserOptionsContainer}>
                <button 
                  type='button'
                  onClick={() => handleUserPermissionChange('authorized')}
                  id="calendar-editor-permissions-button-authorized"
                  className={selectedUserPermissions === 'authorized' ? 
                    styles.AddUserToCalendarListPendingUserOptionsButtonActive : 
                    styles.AddUserToCalendarListPendingUserOptionsButton
                  }>
                    Authorized
                </button>
                <button 
                  type='button'
                  onClick={() => handleUserPermissionChange('view-only')}
                  id="calendar-editor-permissions-button-view-only"
                  className={selectedUserPermissions === 'view-only' ? 
                    styles.AddUserToCalendarListPendingUserOptionsButtonActive : 
                    styles.AddUserToCalendarListPendingUserOptionsButton
                  }>
                    View Only
                </button>
              </div>
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
        <AddUserToCalendarList 
          handleAddUserClick={handleAddUserClick}
          addUserActivated={addUserActivated}
          selectedCalendarId={selectedCalendarId}
          type={type}
          updateCalendarInUser={updateCalendarInUser}
          handleCalendarEditorChange={handleCalendarEditorChange}
        />
        <p className={styles.calendarEditorUserItemContainerEmpty}>
          No users to report
        </p>
      </div>
    );
  };
};

export default UserList;