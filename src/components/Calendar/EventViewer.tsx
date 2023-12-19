import React, { FC, useEffect } from "react";
import { eventObject, eventViewerProps } from "../../types/interfaces";
import styles from '../../styles/components/Calendar/calendar.module.css';
import pencilSvg from '../../assets/pencil-outline.svg';
import trashSvg from '../../assets/delete.svg';
import { getCalendarEventTimeForLocal } from "../../scripts/calendarHelpers";
import toast from "react-hot-toast";

const EventViewer:FC<eventViewerProps> = (props): JSX.Element => {

  const { 
    event, // event could be passed as undefined, handle appropriately, event is conditional
    events, // // event could be passed as undefined, handle appropriately, events is conditional
    handleCloseEventViewerRequest,
    handleEditEventRequest,
    verifyUserAuthorizationOfCalendar,
    updateCalendarInUser,
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

  const getCurrenTopOfClientScreen = () => {
    const yPosition = window.scrollY || document.documentElement.scrollTop;
    return {
      top: `${yPosition}px`,
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

  const handleDeleteIconClick = async () => {
    const calendarId = event?.calendar_id;

    if (typeof calendarId === 'undefined') {
      return;
    };
    
    if (verifyUserAuthorizationOfCalendar(calendarId)) {
      return await deleteEventRequest();
    };
  };

  const deleteEventRequest = async () => {
    const authToken = localStorage.getItem('auth-token');
    if (typeof authToken === 'undefined') {
      return toast.error('You must be signed in or not in incognito to perform this action', {id: 'deletingEvent'});
    } else {
      if (event?.calendar_id && event?._id) {
        const apiUrl = `http://127.0.0.1:8000/calendar/${event.calendar_id}/deleteEvent/${event._id}`;
        const request = await fetch(apiUrl, {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          },
          method: 'DELETE',
        });
        const jsonResponse = await request.json();
        if (!request.ok && request.status !== 200 && !jsonResponse.updated_calendar) {
          return toast.error(`${jsonResponse.detail}`, {id: 'deletingEvent'});
        } else {
          toast.success('Event Deleted!', {id: 'deletingEvent'});
          reEnableScrollBar();
          return updateCalendarInUser(jsonResponse.updated_calendar);
        };
      } else {
        return;
      };
    };
  };

  if (typeof event !== 'undefined' && Object.keys(event).length > 0) {
    return (
      <section 
        onClick={(e) => handleEventViewerOffClick(e)}
        id="event-viewer-background"
        style={getCurrenTopOfClientScreen()}
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
    );
  } else if (typeof events !== 'undefined' && events.length > 0) {
    return (
      <section className={styles.eventsViewerSectionContainer}>
        
      </section>
    );
  } else {
    return (
      <></>
    );
  };
};

export default EventViewer;