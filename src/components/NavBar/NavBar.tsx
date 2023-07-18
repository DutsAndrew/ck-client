import React from 'react';
import { Link } from 'react-router-dom';
import AppNavBar from './AppNavBar';
import WelcomeNavBar from './WelcomeNavBar';

const NavBar = () => {

  let auth;

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