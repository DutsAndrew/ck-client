// component for rendering user lists in Edit Calendar
import React, { FC } from "react";
import styles from '../../styles/components/Calendar/calendar.module.css';
import { userListProps } from "../../types/interfaces";

const UserList:FC<userListProps> = (props): JSX.Element => {

  const { calendar, type } = props;

  if (Array.isArray(calendar) && calendar.length > 0) {
    return (
      <ul className={styles.calendarEditorUsersList}>
        <h4 className={styles.calendarEditorUserListHeaderText}>
          {type} Users
        </h4>
        <button className={styles.calendarEditorAddUserButton}>
          Add User
        </button>
        {Array.isArray(calendar) && calendar.map((user) => {
          return <li
            key={user._id}
            className={styles.calendarEditorUserItemContainer}
          >
            <p className={styles.calendarEditorUserNameText}>
              {user.first_name} {user.last_name}
            </p>
            <p className={styles.calendarEditorUserEmailText}>
              {user.email}
            </p>
            <p className={styles.calendarEditorUserCompanyText}>
              {user.job_title} {user.company}
            </p>
          </li>
        })}
      </ul>
    );
  } else {
    return (
      <div className={styles.calendarEditorUsersListEmpty}>
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