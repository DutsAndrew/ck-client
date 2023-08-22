import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import styles from '../../styles/components/Header/header.module.css';
import { appNavBarProps } from "../../types/interfaces";
import menuSvg from '../../assets/menu.svg';

const AppNavBar: FC<appNavBarProps> = (props): JSX.Element => {

  const { handleSignOut } = props;

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
        id="menu-svg"
        className={styles.menuSvg}
        onClick={() => modalSwitch()}>
      </img>
    );
  } else {
      return (
        <nav className={styles.appNavBar}>
          <img 
            alt="menu"
            src={menuSvg}
            id="menu-svg"
            className={styles.menuSvgToggled}
            onClick={() => modalSwitch()}>
          </img>
          <ul className={styles.appBarList}>
            <li className={styles.appBarListItem}>
              <Link className={styles.appBarLink} to='/'>Main Page</Link>
            </li>
            <li className={styles.appBarListItem}>
              <Link className={styles.appBarLink} to='/home'>Home</Link>
            </li>
            <li className={styles.appBarListItem}>
              <Link className={styles.appBarLink} to='/calendar'>Calendar</Link>
            </li>
            <li className={styles.appBarListItem}>
              <Link className={styles.appBarLink} to='/lesson-manager'>Lesson Manager</Link>
            </li>
            <li className={styles.appBarListItem}>
              <Link className={styles.appBarLink} to='/task-manager'>Task Manager</Link>
            </li>
            <li className={styles.appBarListItem}>
              <Link className={styles.appBarLink} to='/note-taker'>Note Taker</Link>
            </li>
            <li className={styles.appBarListItem}>
              <Link className={styles.appBarLink} to='/jenkins-ai'>Jenkins AI</Link>
            </li>
            <li className={styles.appBarListItem}>
              <Link className={styles.appBarLink} to='/team-messaging'>Team Messaging</Link>
            </li>
            <li className={styles.appBarListItem}>
              <Link className={styles.appBarLink} to='/account'>Account</Link>
            </li>
            <li 
              className={styles.appBarSignOutListItem}
              onClick={() => handleSignOut()}
            >
              <Link 
                className={styles.appBarLink}
                to='/'>Sign Out
              </Link>
            </li>
          </ul>
        </nav>
      );
  };
};

export default AppNavBar;