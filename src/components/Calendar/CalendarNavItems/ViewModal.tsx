import React, { FC } from "react";
import { calendarViewModalProps } from "../../../types/interfaces";
import styles from '../../../styles/components/Calendar/calendar.module.css';

const ViewModal:FC<calendarViewModalProps> = (props): JSX.Element => {

  const { 
    handleChangeViewRequest,
    handleModalDeactivation,
  } = props;

  const viewOptions = [
    "All",
    "Day",
    "Week",
    "Month",
    "Year",
  ];

  const getParentContainersRightEdgeForStyling = () => {
    const yearDropDownElement = document.querySelector('#view-dropdown');
    if (yearDropDownElement) {
      const targetRightEdge = yearDropDownElement.getBoundingClientRect().right;
      return {
        right: `${window.innerWidth - targetRightEdge}px`
      };
    }
    return {
      right: '0px'
    };
  };

  const sendViewChangeRequest = (view: string) => {
    return handleChangeViewRequest(view);
  };

  const handleBackgroundOffClick = (e: React.MouseEvent) => {
    if ((e.target as any).id === 'calendar-modal-background') {
      handleModalDeactivation();
    } else {
      return;
    };
  };

  return (
    <div 
      onClick={(e) => handleBackgroundOffClick(e)}
      id='calendar-modal-background'
      className={styles.navContainerRightDropDownBackground}
    >
      <nav className={styles.viewModalContainer} style={getParentContainersRightEdgeForStyling()}>
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
    </div>
  );
};

export default ViewModal;