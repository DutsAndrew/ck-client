import { 
  calendarEventWithCalendarName, 
  calendarObject, 
  eventObject, 
  userColorPreferences 
} from '../types/calendarTypes';

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

const getDateForCurrentYear = (currentYear: string) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  const today = new Date();
  const date = new Date(Number(currentYear), today.getMonth(), today.getDate());
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
  return formattedDate;
};

const getCalendarObjectTimeForLocal = (dateTimeString: string) => {
  const [datePart, timePart] = dateTimeString.split(' '); // format example: "2023-12-12 12:00:00"
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
    if (selectedCalendar.created_by === userId) return true;
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

const applyCalendarBackgroundColor = (
    calendarColor: string, 
    calendarId: string, 
    usersPreferredCalendarColors: userColorPreferences,
  ): string => {
    // check if calendar has a set color, if so store it
    let setCalendarColor = '';
    if (calendarColor && calendarColor.length > 0) setCalendarColor = calendarColor;

    // check if user has a preferred color set, if so store and return it, otherwise return calendar color, which is defaulted to none
    if (Array.isArray(usersPreferredCalendarColors.calendars) && usersPreferredCalendarColors.calendars.length > 0) {
      let preferredCalendarColor = '';
      const colorPreference = usersPreferredCalendarColors.calendars.find(colorScheme => colorScheme.apply_to_which_object_id === calendarId);
      if (typeof colorPreference !== 'undefined' && colorPreference.background_color.length > 0) {
        preferredCalendarColor = colorPreference.background_color;
        return preferredCalendarColor
      } else {
        return setCalendarColor;
      };
    } else {
      return setCalendarColor;
    };
};

export {
  getTodaysDate,
  getDateForCurrentYear,
  getCalendarObjectTimeForLocal,
  getLocalDateAndTimeForEvent,
  getDayOfWeekLocalTime,
  getEventDate,
  isUserAuthorized,
  compareEventTimes,
  getEventColorScheme,
  applyCalendarBackgroundColor,
};