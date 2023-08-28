import React, { FC } from 'react';
import { lessonsProps } from '../../types/interfaces';

const Lessons:FC<lessonsProps> = (props): JSX.Element => {

  const { user } = props;

  return (
    <main>
      <p>
        Lessons
      </p>
    </main>
  );
};

export default Lessons;