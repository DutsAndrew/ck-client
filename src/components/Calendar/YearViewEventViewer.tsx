import React, { FC } from "react";
import { yearViewEventViewerProps } from "../../types/interfaces";

const YearViewEventViewer:FC<yearViewEventViewerProps> = (props): JSX.Element => {

  const {
    events, 
    handleCloseYearViewDateEventViewer
  } = props;

  return (
    <div>
      <button onClick={handleCloseYearViewDateEventViewer}>close</button>
      {events.map((event) => {
        return <div>
          {event.event_name}
        </div>
      })}
    </div>
  );
};

export default YearViewEventViewer;