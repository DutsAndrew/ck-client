// component for rendering user lists in Edit Calendar
import React, { FC } from "react";
import styles from '../../styles/components/Calendar/calendar.module.css';
import { userCalendarPendingUserInstance, userListProps } from "../../types/interfaces";
import uniqid from "uniqid";

const UserList:FC<userListProps> = (props): JSX.Element => {

  const { calendar, type } = props;

  const idString = `${type.toLowerCase()}-user-list-container`;
  const idRef = styles[idString];

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
          It's looking pretty empty right now
        </p>
      </div>
    );
  };
};

export default UserList;