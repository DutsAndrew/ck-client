import { calendarObject, eventObject } from '../types/interfaces';

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

const isUserAuthorized = (calendars: calendarObject[], calendarId: string, userId: string) => {
  const selectedCalendar = calendars.find(calendar => calendar._id === calendarId);

  if (selectedCalendar) {
    const authorizedUsers = selectedCalendar.authorized_users;
    return authorizedUsers.some(user => user._id === userId);
  };

  return false;
};

export {
  getTodaysDate,
  getCalendarEventTimeForLocal,
  getLocalDateAndTimeForEvent,
  getDayOfWeekLocalTime,
  isUserAuthorized,
};