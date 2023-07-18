import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {

  // conditional logic for if user has visited the site before and has an account and whether the user is visiting for the first time

  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/calendar'>Calendar</Link>
        </li>
        <li>
          <Link to='/class-manager'>Class Manager</Link>
        </li>
        <li>
          <Link to='/task-manager'>Task Manager</Link>
        </li>
        <li>
          <Link to='/note-taker'>Note Taker</Link>
        </li>
        <li>
          <Link to='/team-messaging'>Team Messaging</Link>
        </li>
        <li>
          <Link to='/jenkins-ai'>Jenkins AI</Link>
        </li>
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
          <Link to='/sign-up'>Sign Up</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;