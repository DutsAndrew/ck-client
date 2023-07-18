import React from "react";
import { Link } from "react-router-dom";

const AppNavBar = () => {

  // conditional logic for if user has visited the site before and has an account and whether the user is visiting for the first time
  // once user is logged in the AppNavBar should be moved to the left side of the page

  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Main Page</Link>
        </li>
        <li>
          <Link to='/home'>Home</Link>
        </li>
        <li>
          <Link to='/calendar'>Calendar</Link>
        </li>
        <li>
          <Link to='/lesson-manager'>Lesson Manager</Link>
        </li>
        <li>
          <Link to='/task-manager'>Task Manager</Link>
        </li>
        <li>
          <Link to='/note-taker'>Note Taker</Link>
        </li>
        <li>
          <Link to='/jenkins-ai'>Jenkins AI</Link>
        </li>
        <li>
          <Link to='/team-messaging'>Team Messaging</Link>
        </li>
        <li>
          <Link to='/account'>Account</Link>
        </li>
      </ul>
    </nav>
  );
};

export default AppNavBar;