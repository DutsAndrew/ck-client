import React, { FC, useState, useEffect } from "react";
import styles from '../../styles/components/Calendar/calendar.module.css';
import uniqid from "uniqid";
import NotesForCalendar from "./NotesForCalendar";
import circleSvg from '../../assets/circle-small.svg';
import EventViewer from "./EventViewer";
import { 
  CalendarDatesData,
  calendarNoteWithCalendarInfo,
  calendarNotesWithInfo,
  calendarViewStateForCalendarNotes,
  calendarEventWithCalendarName,
  yearViewProps, 
  yearViewSelectedDateState
} from "../../types/calendarTypes";
import { 
  compareEventTimes, 
  getLocalDateAndTimeForEvent, 
  isUserAuthorized 
} from "../../scripts/calendarHelpers";


const YearView:FC<yearViewProps> = (props): JSX.Element => {

  const { 
    userId,
    activeCalendars,
    calendarDatesData,
    handleNotesForCalendarRequestToAddNewNote,
    handleCalendarNoteModificationRequest,
    removeCalendarNoteFromCalendar,
    handleCalendarEventModificationRequest,
    updateCalendarInUser,
    handleOpenAddEventFormClick,
    yearNotes,
    yearEvents,
  } = props;

  const [yearViewNotes, setYearViewNotes] = useState<calendarViewStateForCalendarNotes>([]);
  const [yearViewEvents, setYearViewEvents] = useState<Map<string, any[]>[]>();
  const [selectedDate, setSelectedDate] = useState<yearViewSelectedDateState>({
    status: false,
    events: [],
  });

  useEffect(() => {
    setYearViewNotes(getYearViewNotes())
    setYearViewEvents(getYearViewEvents());
  }, [activeCalendars, yearNotes, yearEvents]);

  const getYearViewNotes = () => {
    const thisYearsNotes: calendarNotesWithInfo = [];

    const currentYear = new Date().getFullYear();

    Array.isArray(yearNotes) && yearNotes.forEach((calendarNote: calendarNoteWithCalendarInfo) => {
      const startDate = new Date(calendarNote.start_date);
      if (
       startDate.getFullYear() === currentYear
      ) {
        thisYearsNotes.push(calendarNote);
      };
    });

    return thisYearsNotes;
  };

  const week = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
  ];

  const calendarMonths = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const getTodaysYear = () => {
    return new Date().getFullYear();
  };

  const getCurrentYearFromAppData = () => {
    const year = getTodaysYear();
    return (calendarDatesData as CalendarDatesData).calendar_dates[Number(year)];
  };

  const generateCurrentYearView = () => {
    if (Object.keys(calendarDatesData).length === 0) return [];

    const yearView: any[] = [];

    const userCalendar = getCurrentYearFromAppData();
    
    // loop through all months
    calendarMonths.forEach((month) => {
      const userCalendarMonth: any = userCalendar[month];
      const monthStartsOn = userCalendarMonth.month_starts_on;
      const monthNumberOfDays = userCalendarMonth.days;

      const monthLayout = [];

      const weekStartIndex = week.indexOf(monthStartsOn);
      const numberOfPrecedingDays = week.slice(0, weekStartIndex).length;

      // add preceding week days
      for (let i = 0; i < numberOfPrecedingDays; i++) {
        monthLayout.push('');
      };

      // add all month's week days
      let weekLoopIndex = weekStartIndex;
      for (let i = 1; i < monthNumberOfDays + 1; i++) {
        monthLayout.push(`${i}`);
        if (weekLoopIndex === week.length - 1) {
          weekLoopIndex = 0;
        } else {
          weekLoopIndex++
        };
      };

      // add remaining days of week
      for (let i = weekLoopIndex; i < week.length; i++) {
        if (week[i] === 'Monday') break;
        monthLayout.push('');
      };

      yearView.push(monthLayout);
    });

    return yearView;
  };

  const getYearViewEvents = () => {
    if (Object.keys(calendarDatesData).length === 0) return [];

    const yearViewArray = generateYearViewArray();
    const eventsAddedToArray = addEventsToYearViewArray(yearViewArray);
    const sortEventsInEachArray = sortEventsInMonthArray(eventsAddedToArray);
    return sortEventsInEachArray;
  };

  const generateYearViewArray = () => {
    const yearView = generateCurrentYearView();
    const yearEventArray = [
      new Map<string, any[]>(),
      new Map<string, any[]>(),
      new Map<string, any[]>(),
      new Map<string, any[]>(),
      new Map<string, any[]>(),
      new Map<string, any[]>(),
      new Map<string, any[]>(),
      new Map<string, any[]>(),
      new Map<string, any[]>(),
      new Map<string, any[]>(),
      new Map<string, any[]>(),
      new Map<string, any[]>(),
    ]

    yearView.forEach((month: string[]) => { // O(n^2) complexity, this will run rather slow, but is looping through less than 400 items, so isn't terrible
      const monthIndex = yearView.indexOf(month);
      month.forEach((day: string) => {
        if (day.length > 0) { // date is valid and not filler
          yearEventArray[monthIndex].set(day, []);
        };
      });
    });

    return yearEventArray;
  };

  const addEventsToYearViewArray = (yearViewArray: Map<string, any[]>[]): Map<string, any[]>[] => {
    yearEvents.forEach((event) => {
      const eventDate = getLocalDateAndTimeForEvent(event);
      const dateConversion = new Date(eventDate);
      const month = dateConversion.getMonth();
      const day = dateConversion.getDate();

      const arrayEventBelongsTo = yearViewArray[month].get(day.toString());

      arrayEventBelongsTo?.push(event);
    });

    return yearViewArray;
  };

  const sortEventsInMonthArray = (yearViewArray: Map<string, any[]>[]) => {
    yearViewArray.forEach((month) => {
      month.forEach((dayArrayOfEvents: calendarEventWithCalendarName[]) => {
        dayArrayOfEvents.sort(compareEventTimes);
      });
    });

    return yearViewArray;
  };

  const handleCalendarDateSelectionClick = (month: number, day: string) => {
    if (day.length === 0) return; // invalid date, do not engage options

    if ( // return if yearViewEvents is not initialized, or there are no events on that day
      !Array.isArray(yearViewEvents)
      || yearViewEvents.length === 0
      || !yearViewEvents[month]
      || !yearViewEvents[month].get(day)
      || yearViewEvents[month].get(day)!.length === 0 // ! non-null assertion operator used, there has to be a length of that map value if it can be retrieved in the previous check
    ) {
      return;
    } else {
      const eventsList = yearViewEvents[month].get(day);
      if (eventsList && eventsList.length > 0) {
        handleOpenYearViewDateEventViewer(eventsList);
      };
    };
  };

  const handleOpenYearViewDateEventViewer = (eventsList: calendarEventWithCalendarName[]) => {
    setSelectedDate({
      status: true,
      events: eventsList,
    });
  };

  const handleCloseEventViewerRequest = () => {
    setSelectedDate({
      status: false,
      events: [],
    });
  };

  const handleEditEventRequest = (event: calendarEventWithCalendarName) => {
    handleCloseEventViewerRequest();
    handleCalendarEventModificationRequest(event.calendar_id, event);
  };

  const verifyUserAuthorizationOfCalendar = (calendarId: string) => {
    return isUserAuthorized(activeCalendars, calendarId, userId);
  };

  if (Object.keys(calendarDatesData).length > 0) { // if calendarData has been mounted in "App" from "Calendar parent component"
    const yearView = generateCurrentYearView();
    return (
      <section className={styles.yearViewContainer}>
        <h2 className={styles.yearViewHeaderText}>
          Year View
        </h2>
        {selectedDate.status === true &&
          <EventViewer
            events={selectedDate.events}
            handleCloseEventViewerRequest={handleCloseEventViewerRequest}
            handleEditEventRequest={handleEditEventRequest}
            verifyUserAuthorizationOfCalendar={verifyUserAuthorizationOfCalendar}
            updateCalendarInUser={updateCalendarInUser}
          />
        }
        <h2 className={styles.currentYearText}>
          {getTodaysYear()}
        </h2>
        <div className={styles.yearItemsContainer}>
          {yearView.map((month) => (
            <div
              key={uniqid()}
              className={styles.yearMonthContainer}
            >
              <h3 className={styles.yearViewMonthHeaderText}>
                {calendarMonths[yearView.indexOf(month)]}
              </h3>
              <div className={styles.yearViewMonthItemsContainer}>
                <div className={styles.dayOfWeekListContainer}>
                  {week.map((day) => {
                    return (
                      <div 
                        key={uniqid()}
                        className={styles.dayOfWeekListItemContainer}
                      >
                        <p 
                          className={styles.dayOfWeekListItemText}
                        >
                          {day.slice(0,1)}
                        </p>
                      </div>
                    )
                  })}
                </div>
                {month.map((day: any) => {
                  const monthIndex = yearView.indexOf(month);
                  const isAccurateMonthDate = day.length > 0;
                  const containerClass = isAccurateMonthDate
                    ? styles.monthItemValidDateContainer
                    : styles.monthItemInvalidDateContainer;
                  const doesDayHaveEvents = (Array.isArray(yearViewEvents) &&
                    yearViewEvents.length > 0 &&
                    yearViewEvents[monthIndex] &&
                    yearViewEvents[monthIndex].get(day) &&
                    yearViewEvents[monthIndex].get(day)!.length > 0) // ! non-null assertion operator used, there has to be a length of that map value if it can be retrieved in the previous check
                    ? true
                    : false;

                  return (
                    <div
                      id={`${doesDayHaveEvents === true ? '' : 'year-view-item-block'}`}
                      onClick={(e) => {
                        handleCalendarDateSelectionClick(monthIndex, day);
                        handleOpenAddEventFormClick('year-view-item-block', day, monthIndex);
                      }}
                      key={uniqid()}
                      className={`${styles.yearViewMonthItemContainer} ${containerClass} ${doesDayHaveEvents === true ? styles.yearViewDateHasEvents : ''}`}
                    >
                      <p 
                        id={`${doesDayHaveEvents === true ? '' : 'year-view-item-block'}`}
                        className={styles.yearViewMonthItemDateNumberText}
                      >
                        {day.length > 0 ? day : ''}
                      </p>
                      {Array.isArray(yearViewEvents) &&
                        yearViewEvents.length > 0 &&
                        yearViewEvents[monthIndex] &&
                        yearViewEvents[monthIndex].get(day) ? (
                        yearViewEvents[monthIndex].get(day)!.length > 0 ? ( // ! non-null assertion operator used, there has to be a length of that map value if it can be retrieved in the previous check
                          <img 
                            className={styles.yearViewEventsFoundForDateSvg}
                            src={circleSvg}
                            alt="circle icon">
                          </img>
                        ) : (
                          <></>
                        )
                      ) : (
                        <></>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.yearViewNotesContainer}>
        {Array.isArray(activeCalendars) && activeCalendars.length !== 0 && (
          <NotesForCalendar 
            userId={userId}
            calendarNotes={yearViewNotes}
            handleNotesForCalendarRequestToAddNewNote={handleNotesForCalendarRequestToAddNewNote}
            handleCalendarNoteModificationRequest={handleCalendarNoteModificationRequest}
            removeCalendarNoteFromCalendar={removeCalendarNoteFromCalendar}
          />
        )}
      </div>
      </section>
    );
  } else { // for when calendarData hasn't been mounted from "Calendar" to "App"
    return (
      <section className={styles.yearViewContainer}>
        <h2 className={styles.yearViewHeaderText}>
          Year View
        </h2>
        <h2 className={styles.currentYearText}>
          {getTodaysYear()}
        </h2>
        <div className={styles.yearItemsContainer}>
          <p>Loading Data...</p>
        </div>
      </section>
    );
  };
};

export default YearView;