import React, { FC } from "react";
import { calendarViewModalProps } from "../../../types/interfaces";
import styles from '../../../styles/components/Calendar/calendar.module.css';

const ViewModal:FC<calendarViewModalProps> = (props): JSX.Element => {

  const { handleChangeViewRequest } = props;

  const viewOptions = [
    "All",
    "Day",
    "Week",
    "Month",
    "Year",
  ];

  const sendViewChangeRequest = (view: string) => {
    return handleChangeViewRequest(view);
  };

  return (
    <nav className={styles.viewModalContainer}>
      <div className={styles.viewModalListContainer}>
        {viewOptions.map((view) => {
          return <div 
            key={view}
            className={styles.viewModalListItemContainer}
            onClick={() => sendViewChangeRequest(view as unknown as string)}
          >
            <p className={styles.viewModalListItemText}>
              {view}
            </p>
          </div>
        })}
      </div>
    </nav>
  );
};

export default ViewModal;