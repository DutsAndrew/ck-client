import React, { FC } from 'react';
import { classesProps } from '../../types/calendarTypes';

const Classes:FC<classesProps> = (props): JSX.Element => {

  const { user } = props;

  return (
    <main>
      <p>
        Classes
      </p>
    </main>
  );
};

export default Classes;