import React from "react";
import { Link } from "react-router-dom";

const WelcomeNavBar = () => {

  // conditional logic for if user has visited the site before and has an account and whether the user is visiting for the first time
  // once user is logged in the WelcomeNavBar should be moved to the left side of the page

  return (
    <nav>
      <ul>
        <li>
          <Link to='/about'>About</Link>
        </li>
        <li>
          <Link to='/contact'>Contact</Link>
        </li>
        <li>
          <Link to='/pricing'>Pricing</Link>
        </li>
        <li>
          <Link to='/signup'>Sign Up</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default WelcomeNavBar;