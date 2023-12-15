import React, { FC, useEffect } from "react";
import { eventObject, eventViewerProps } from "../../types/interfaces";
import styles from '../../styles/components/Calendar/calendar.module.css';
import pencilSvg from '../../assets/pencil-outline.svg';
import trashSvg from '../../assets/delete.svg';
import { getCalendarEventTimeForLocal } from "../../scripts/calendarHelpers";

const EventViewer:FC<eventViewerProps> = (props): JSX.Element => {

  const { 
    event, // event could be passed as undefined, handle appropriately
    handleCloseEventViewerRequest,
    handleEditEventRequest,
  } = props;

  useEffect(() => {
    temporarilyDisableScrollBar();

    return () => {
      reEnableScrollBar();
    };
  }, []);

  const handleEventViewerOffClick = (e: React.MouseEvent) => {
    if ((e.target as any).id === 'event-viewer-background') {
      handleCloseEventViewerRequest();
    };
  };

  const temporarilyDisableScrollBar = () => {
    const body = document.body;
    body.classList.add('disableScrollbar');
  };

  const reEnableScrollBar = () => {
    const body = document.body;
    body.classList.remove('disableScrollbar');
  };

  const handleEditEventIconClick = () => {
    return handleEditEventRequest((event as eventObject));
  };

  const handleDeleteIconClick = () => {

  };

  if (typeof event === 'undefined') {
    return (
      <></>
    );
  } else {
    return (
      <section 
        onClick={(e) => handleEventViewerOffClick(e)}
        id="event-viewer-background"
        className={styles.eventViewerSectionContainer}
      >
        <div className={styles.eventViewContainer}>
          <div className={styles.eventViewSvgContainer}>
            <img 
              onClick={() => handleEditEventIconClick()}
              className={styles.eventViewEditSvg} 
              alt="edit icon" 
              src={pencilSvg}>
            </img>
            <img 
              onClick={() => handleDeleteIconClick()}
              className={styles.eventViewDeleteSvg} 
              alt="delete icon" 
              src={trashSvg}>
            </img>
          </div>
          <div className={styles.eventViewDetailContainer}>
            <p className={styles.eventViewNameText}>
              <strong>Name: </strong>{event.event_name}
            </p>
            <p className={styles.eventViewDescriptionText}>
              <strong>{event.event_description.length > 0 ? 'Description: ' : ''}</strong>
              {event.event_description.length > 0 ? <br></br> : ''}
              {event.event_description.length > 0 ? `${event.event_description}` : ''}
            </p>
            <p className={styles.eventViewDateText}>
              <strong>Date: </strong>{event.event_date.split(" ")[0]}
            </p>
            <p className={styles.eventViewTimeText}>
              <strong>{event.event_time.length > 0 ? 'Time: ' : ''}</strong>
              {event.event_time.length > 0 ? `${getCalendarEventTimeForLocal(event)}` : ''}
            </p>
            <p className={styles.eventViewRepeatText}>
              <strong>{event.repeats === true ? 'Repeats: ' : ''}</strong>
              {event.repeats === true ? `${event.repeat_option}` : ''}
            </p>
            <p className={styles.eventViewCreatedByText}>
              <strong>Created by:</strong> {event.created_by.first_name}, {event.created_by.last_name}
            </p>
          </div>
        </div>
      </section>
    )
  }
};

export default EventViewer;