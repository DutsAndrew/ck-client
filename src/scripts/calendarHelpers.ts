import { calendarEventWithCalendarName, calendarObject, eventObject } from '../types/calendarTypes';

const getTodaysDate = () => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  const date = new Date();
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
  return formattedDate;
};

const getCalendarEventTimeForLocal = (event: eventObject) => {
  const [datePart, timePart] = event.combined_date_and_time.split(' ');
  const [year, month, day] = datePart.split('-').map(Number);
  const [hour, minute, second] = timePart.split(':').map(Number);

  // Create a new Date object in UTC using components
  const dateObject = new Date(Date.UTC(year, month - 1, day, hour, minute, second));

  // Get the time components in the local timezone
  const localTime = dateObject.toLocaleTimeString('en-US', {
    hour12: true,
    hour: '2-digit',
    minute: '2-digit',
  });

  return localTime;
};

const getLocalDateAndTimeForEvent = (event: eventObject) => {
  const [datePart, timePart] = event.combined_date_and_time.split(' ');
  const [year, month, day] = datePart.split('-').map(Number);

  if (event.event_time.length === 0) { // handle early return for no time set
    const dateObject = new Date(year, month - 1, day, 0, 0, 0);

    const timelessLocalDateAndTime = dateObject.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    return timelessLocalDateAndTime;
  };

  const [hour, minute, second] = timePart.split(':').map(Number);

  const dateObject = new Date(Date.UTC(year, month - 1, day, hour, minute, second));
  const localDateAndTime = dateObject.toLocaleTimeString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return localDateAndTime;
};

const getDayOfWeekLocalTime = (event: eventObject) => {
  const [datePart, timePart] = event.combined_date_and_time.split(' ');
  const [year, month, day] = datePart.split('-').map(Number);

  if (event.event_time.length === 0) { // handle early return for no time set
    const dateObject = new Date(year, month - 1, day, 0, 0, 0);
    const dayOfWeek = dateObject.getDay();

    return dayOfWeek;
  };

  const [hour, minute, second] = timePart.split(':').map(Number);
  const dateObject = new Date(Date.UTC(year, month - 1, day, hour, minute, second));
  const dayOfWeek = dateObject.getDay();

  return dayOfWeek;
};

const getEventDate = (event: eventObject) => {
  const [datePart, timePart] = event.combined_date_and_time.split(' ');
  const [year, month, day] = datePart.split('-').map(Number);

  if (event.event_time.length === 0) { // handle early return for no time set
    const dateObject = new Date(year, month - 1, day, 0, 0, 0);
    const dateOfEvent = dateObject.getDate();

    return dateOfEvent;
  };

  const [hour, minute, second] = timePart.split(':').map(Number);
  const dateObject = new Date(Date.UTC(year, month - 1, day, hour, minute, second));
  const dateOfEvent = dateObject.getDate();

  return dateOfEvent;
};

const isUserAuthorized = (calendars: calendarObject[], calendarId: string, userId: string) => {
  const selectedCalendar = calendars.find(calendar => calendar._id === calendarId);

  if (selectedCalendar) {
    const authorizedUsers = selectedCalendar.authorized_users;
    return authorizedUsers.some(user => user._id === userId);
  };

  return false;
};

const compareEventTimes = (eventA: eventObject, eventB: eventObject) => {
  const dateA = eventA.combined_date_and_time;
  const dateB = eventB.combined_date_and_time;

  const timeA = dateA ? new Date(dateA).getTime() : 0;
  const timeB = dateB ? new Date(dateB).getTime() : 0;

  if (timeA === 0 && timeB === 0) {
    return 0; // If both dates have no time, consider them equal
  } else if (timeA === 0) {
    return 1; // Put events with no time in dateA at the end
  } else if (timeB === 0) {
    return -1; // Put events with no time in dateB at the end
  } else {
    return timeA - timeB; // Compare by timestamps for events with specific times
  };
};

const getEventColorScheme = (event: calendarEventWithCalendarName) => {
  // marking as any the styles are very visibly being applied here
  const eventStyle: any = {};

  if (event.event_background_color) {
    eventStyle.backgroundColor = event.event_background_color;
  };
  if (event.event_font_color) {
    eventStyle.color = event.event_font_color;
  };

  return eventStyle;
};

export {
  getTodaysDate,
  getCalendarEventTimeForLocal,
  getLocalDateAndTimeForEvent,
  getDayOfWeekLocalTime,
  getEventDate,
  isUserAuthorized,
  compareEventTimes,
  getEventColorScheme,
};