import React, { FC } from 'react';
import { notesProps } from '../../types/calendarTypes';

const Notes:FC<notesProps> = (props): JSX.Element => {

  const { user } = props;

  return (
    <main>
      <p>
        Notes
      </p>
    </main>
  );
};

export default Notes;