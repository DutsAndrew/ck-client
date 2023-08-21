import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import styles from '../../styles/components/Header/header.module.css';
import { appNavBarProps } from "../../types/interfaces";
import menuSvg from '../../assets/menu.svg';

const AppNavBar: FC<appNavBarProps> = (props): JSX.Element => {

  const [modal, setModal] = useState({
    open: false,
  });

  const modalSwitch = () => {
    if (modal.open === false) {
      setModal({
        open: true,
      });
    } else {
      setModal({
        open: false,
      });
    };
  };

  if (modal.open === false) {
    return (
      <img 
        alt="menu"
        src={menuSvg}
        className={styles.menuSvg}
        onClick={() => modalSwitch()}>
      </img>
    );
  } else {
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
};

export default AppNavBar;