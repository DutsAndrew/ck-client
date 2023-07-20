import React from "react";
import { Link } from "react-router-dom";
import styles from '../../styles/components/Header/header.module.css';

const AppNavBar = () => {

  // conditional logic for if user has visited the site before and has an account and whether the user is visiting for the first time
  // once user is logged in the AppNavBar should be moved to the left side of the page

  return (
    <nav className={styles.appNavBar}>
      <ul className={styles.navBarList}>
        <li className={styles.navBarListItem}>
          <Link className={styles.navBarLink} to='/'>Main Page</Link>
        </li>
        <li className={styles.navBarListItem}>
          <Link className={styles.navBarLink} to='/home'>Home</Link>
        </li>
        <li className={styles.navBarListItem}>
          <Link className={styles.navBarLink} to='/calendar'>Calendar</Link>
        </li>
        <li className={styles.navBarListItem}>
          <Link className={styles.navBarLink} to='/lesson-manager'>Lesson Manager</Link>
        </li>
        <li className={styles.navBarListItem}>
          <Link className={styles.navBarLink} to='/task-manager'>Task Manager</Link>
        </li>
        <li className={styles.navBarListItem}>
          <Link className={styles.navBarLink} to='/note-taker'>Note Taker</Link>
        </li>
        <li className={styles.navBarListItem}>
          <Link className={styles.navBarLink} to='/jenkins-ai'>Jenkins AI</Link>
        </li>
        <li className={styles.navBarListItem}>
          <Link className={styles.navBarLink} to='/team-messaging'>Team Messaging</Link>
        </li>
        <li className={styles.navBarListItem}>
          <Link className={styles.navBarLink} to='/account'>Account</Link>
        </li>
      </ul>
    </nav>
  );
};

export default AppNavBar;