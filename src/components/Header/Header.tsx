import React from "react";
import styles from '../../styles/components/Header/header.module.css';
import NavBar from "./NavBar";
import logo from '../../assets/classKeeperLogo.png';

export default function Header() {
  return (
    <section className={styles.headerContainer}>
      <img className={styles.logoIcon} src={logo} alt="ClassKeeper Logo"></img>
      <NavBar />
    </section>
  );
}