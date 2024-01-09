import React, { FC } from "react";
import styles from '../../styles/components/Header/header.module.css';
import NavBar from "./NavBar";
import logo from '../../assets/classKeeperLogo.png';
import { HeaderProps } from "../../types/calendarTypes";
import ClassKeeperText from "./ClassKeeperText";

const Header:FC<HeaderProps> = (props): JSX.Element => {

  const { auth, handleSignOut } = props;

  return (
    <section className={styles.headerContainer}>
      <div className={styles.appHeaderContainer}>
        <ClassKeeperText />
      </div>
      <NavBar auth={auth} handleSignOut={handleSignOut} />
    </section>
  );
};

export default Header;