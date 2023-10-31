import React, { FC } from "react";
import styles from '../../styles/components/Calendar/calendar.module.css';
import { AddUserToCalendarListProps } from "../../types/interfaces";

const AddUserToCalendarList:FC<AddUserToCalendarListProps> = (props): JSX.Element => {

  const { 
    handleAddUserClick, 
    addUserActivated 
  } = props;

  return (
    <>
      <button 
        onClick={() => handleAddUserClick()}
        className={styles.calendarEditorAddUserButton}>
        {addUserActivated === false ? 'Add User' : 'Close'}
      </button>
      {addUserActivated === true && 
        // render search bar with search icon inside, placeholder text for searching
        // handle search when user clicks search icon or clicks enter
        // render searched users below search bar with blue plus sign to add
        <p></p>
      }
    </>
  );
};

export default AddUserToCalendarList;