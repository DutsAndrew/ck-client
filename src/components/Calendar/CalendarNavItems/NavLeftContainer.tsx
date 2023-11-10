import React, { FC, useState } from "react";
import styles from '../../../styles/components/Calendar/calendar.module.css';
import plusSVG from '../../../assets/plus.svg';
import leftArrowSvg from '../../../assets/chevron-left.svg';
import rightArrowSvg from '../../../assets/chevron-right.svg';
import { navLeftContainerProps } from "../../../types/interfaces";
import CalendarFormModal from "./CalendarFormModal";

const NavLeftContainer:FC<navLeftContainerProps> = (props): JSX.Element => {

  const {
    currentView,
    userCalendars,
    userId,
    handleCalendarTimeChangeRequest,
    appendNewCalendarToUser,
  } = props;

  const [modal, setModal] = useState({
    open: false,
  });

  const handleFormModalRequest = () => {
    if (modal.open === false) {
      setModal({
        open: true,
      });
    } else {
      setModal({
        open: false,
      });
    };
    return;
  };

  const handleCloseModalRequest = () => {
    setModal({
      open: false,
    });
  };

  if (modal.open === true && currentView === 'All') {
    return (
      <div className={styles.calendarNavContainerLeft}>
        <img
          className={styles.plusSvg}
          alt="plus icon"
          src={plusSVG}
          onClick={() => handleFormModalRequest()}>
        </img>
        <CalendarFormModal
          userCalendars={userCalendars}
          userId={userId}
          handleCloseModalRequest={handleCloseModalRequest}
          appendNewCalendarToUser={appendNewCalendarToUser}
        />
      </div>
    );
  } else if (modal.open === false && currentView === 'All') {
    return (
      <div className={styles.calendarNavContainerLeft}>
        <img
          className={styles.plusSvg}
          alt="plus icon"
          src={plusSVG}
          onClick={() => handleFormModalRequest()}>
        </img>
      </div>
    );
  } else if (modal.open === true && currentView !== 'All') {
    return (
      <div className={styles.calendarNavContainerLeft}>
        <img
          className={styles.plusSvg}
          alt="plus icon"
          src={plusSVG}
          onClick={() => handleFormModalRequest()}>
        </img>
        <div className={styles.navigationArrowsContainer}>
          <img
            className={styles.navigationArrowSvg}
            alt="left arrow"
            src={leftArrowSvg}
            onClick={() => handleCalendarTimeChangeRequest('back')}>
          </img>
          <img
            className={styles.navigationArrowSvg}
            alt="right arrow"
            src={rightArrowSvg}
            onClick={() => handleCalendarTimeChangeRequest('forward')}>
          </img>
        </div>
        <CalendarFormModal
          userCalendars={userCalendars}
          userId={userId}
          handleCloseModalRequest={handleCloseModalRequest}
          appendNewCalendarToUser={appendNewCalendarToUser}
        />
      </div>
    );
  } else {
    // user is using a certain calendar view and needs to be able to use back and forward arrows to navigate time
    return (
      <div className={styles.calendarNavContainerLeft}>
        <img
          className={styles.plusSvg}
          alt="plus icon"
          src={plusSVG}
          onClick={() => handleFormModalRequest()}>
        </img>
        <div className={styles.navigationArrowsContainer}>
          <img
            className={styles.navigationArrowSvg}
            alt="left arrow"
            src={leftArrowSvg}
            onClick={() => handleCalendarTimeChangeRequest('back')}>
          </img>
          <img
            className={styles.navigationArrowSvg}
            alt="right arrow"
            src={rightArrowSvg}
            onClick={() => handleCalendarTimeChangeRequest('forward')}>
          </img>
        </div>
      </div>
    ); 
  };
};

export default NavLeftContainer;