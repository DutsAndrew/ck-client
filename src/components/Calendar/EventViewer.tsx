import React, { FC, useEffect } from "react";
import { eventViewerProps } from "../../types/interfaces";
import styles from '../../styles/components/Calendar/calendar.module.css';

const EventViewer:FC<eventViewerProps> = (props): JSX.Element => {

  const { 
    event,
    handleCloseEventViewerRequest,
  } = props; // event could be passed as undefined, handle appropriately

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
          {event.event_name}
        </div>
      </section>
    )
  }
};

export default EventViewer;