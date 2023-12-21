import React, { FC } from 'react';
import { accountProps } from '../../types/calendarTypes';

const Account:FC<accountProps> = (props): JSX.Element => {

  const { user } = props;

  return (
    <main>
      <p>
        Account
      </p>
    </main>
  );
};

export default Account;