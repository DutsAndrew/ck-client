import { eventObject } from '../types/interfaces';

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

export {
  getTodaysDate,
  getCalendarEventTimeForLocal,
};