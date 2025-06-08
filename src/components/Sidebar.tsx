import React from 'react';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <nav className={styles.sidebar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <span className={styles.navIcon}>📊</span>
          <span className={styles.navText}>Dashboard</span>
        </li>
        <li className={styles.navItem}>
          <span className={styles.navIcon}>👥</span>
          <span className={styles.navText}>Teams</span>
        </li>
        <li className={styles.navItem}>
          <span className={styles.navIcon}>👤</span>
          <span className={styles.navText}>Members</span>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;