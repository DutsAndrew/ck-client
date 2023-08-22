import React, { FC } from "react";
import styles from '../../styles/components/Header/header.module.css';
import NavBar from "./NavBar";
import logo from '../../assets/classKeeperLogo.png';
import { HeaderProps } from "../../types/interfaces";

const Header:FC<HeaderProps> = (props): JSX.Element => {

  const { auth, handleSignOut } = props;

  return (
    <section className={styles.headerContainer}>
      <img className={styles.logoIcon} src={logo} alt="ClassKeeper Logo"></img>
      <NavBar auth={auth} handleSignOut={handleSignOut} />
    </section>
  );
};

export default Header;