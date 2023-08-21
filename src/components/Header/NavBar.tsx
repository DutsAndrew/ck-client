import React, { FC } from 'react';
import AppNavBar from './AppNavBar';
import WelcomeNavBar from './WelcomeNavBar';
import { NavBarProps } from '../../types/interfaces';

const NavBar: FC<NavBarProps> = (props): JSX.Element => {

  const { auth } = props;

  // conditional logic for if user has visited the site before and has an account and whether the user is visiting for the first time
  // once user is logged in the navbar should be moved to the left side of the page

  if (auth) {
    return (
      <AppNavBar />
    );
  } else {
    return (
      <WelcomeNavBar />
    );
  };
};

export default NavBar;