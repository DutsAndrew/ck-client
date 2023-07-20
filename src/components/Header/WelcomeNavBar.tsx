import React from "react";
import { Link } from "react-router-dom";
import styles from '../../styles/components/Header/header.module.css';

const WelcomeNavBar = () => {

  // conditional logic for if user has visited the site before and has an account and whether the user is visiting for the first time
  // once user is logged in the WelcomeNavBar should be moved to the left side of the page

  return (
    <nav className={styles.welcomeNavBar}>
      <ul className={styles.navBarList}>
        <li className={styles.navBarListItem}>
          <Link className={styles.navBarLink} to='/about'>About</Link>
        </li>
        <li className={styles.navBarListItem}>
          <Link className={styles.navBarLink} to='/contact'>Contact</Link>
        </li>
        <li className={styles.navBarListItem}>
          <Link className={styles.navBarLink} to='/pricing'>Pricing</Link>
        </li>
        <li className={styles.navBarListItem}>
          <Link className={styles.navBarLink} to='/signup'>Sign Up</Link>
        </li>
        <li className={styles.navBarListItem}>
          <Link className={styles.navBarLink} to='/login'>Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default WelcomeNavBar;