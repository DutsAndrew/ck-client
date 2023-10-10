import React, { FC, useState } from "react";
import styles from '../../../styles/components/Calendar/calendar.module.css';
import plusSVG from '../../../assets/plus.svg';
import leftArrowSvg from '../../../assets/chevron-left.svg';
import rightArrowSvg from '../../../assets/chevron-right.svg';
import { navLeftContainerProps } from "../../../types/interfaces";
import AddFormModal from "./AddFormModal";

const NavLeftContainer:FC<navLeftContainerProps> = (props): JSX.Element => {

  const { currentView, handleCalendarTimeChangeRequest } = props;

  const [modal, setModal] = useState({
    open: false,
  });

  const handleAddEventRequest = () => {
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
          onClick={() => handleAddEventRequest()}>
        </img>
        <AddFormModal
          handleCloseModalRequest={handleCloseModalRequest}
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
          onClick={() => handleAddEventRequest()}>
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
          onClick={() => handleAddEventRequest()}>
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
        <AddFormModal
          handleCloseModalRequest={handleCloseModalRequest}
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
          onClick={() => handleAddEventRequest()}>
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