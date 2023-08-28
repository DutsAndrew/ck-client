import React, { FC } from 'react';
import { calendarProps } from '../../types/interfaces';


const Calendar:FC<calendarProps> = (props): JSX.Element => {

  const { user } = props;

  console.log(user);

  return (
    <main>
      <p>
        Calendar
      </p>
    </main>
  );
};

export default Calendar;