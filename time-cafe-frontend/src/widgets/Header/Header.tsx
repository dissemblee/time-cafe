'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.scss';
import { FaUser, FaSearch} from "react-icons/fa"

export const Header: React.FC = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className={styles.Header}>
      <nav className={styles.Header__nav}>
        <div className={styles.Header__brand}>
          <div className={styles.Header__logo}>
            <div className={styles.Header__logoCore}>
              <div className={styles.Header__liquidAnimation}></div>
            </div>
            <span className={styles.Header__logoText}>TimeCafe</span>
          </div>
        </div>
        
        <div className={styles.Header__links}>
          <Link 
            href="/" 
            className={`${styles.Header__link} ${isActive('/') ? styles['Header__link--active'] : ''}`}
          >
            <div className={styles.Header__linkLiquid}></div>
            <span className={styles.Header__linkText}>Главная</span>
          </Link>
          
          <Link 
            href="/builder" 
            className={`${styles.Header__link} ${isActive('/builder') ? styles['Header__link--active'] : ''}`}
          >
            <div className={styles.Header__linkLiquid}></div>
            <span className={styles.Header__linkText}>Конструктор</span>
          </Link>
          
          <Link 
            href="/games" 
            className={`${styles.Header__link} ${isActive('/games') ? styles['Header__link--active'] : ''}`}
          >
            <div className={styles.Header__linkLiquid}></div>
            <span className={styles.Header__linkText}>Игры</span>
          </Link>
          
          <Link 
            href="/rooms" 
            className={`${styles.Header__link} ${isActive('/rooms') ? styles['Header__link--active'] : ''}`}
          >
            <div className={styles.Header__linkLiquid}></div>
            <span className={styles.Header__linkText}>Комнаты</span>
          </Link>
          
          <Link 
            href="/menu" 
            className={`${styles.Header__link} ${isActive('/menu') ? styles['Header__link--active'] : ''}`}
          >
            <div className={styles.Header__linkLiquid}></div>
            <span className={styles.Header__linkText}>Меню</span>
          </Link>
        </div>
        
        <div className={styles.Header__actions}>
          <Link href="/register" className={styles.Header__actionButton}>
            <FaUser />
          </Link>
          <button className={styles.Header__actionButton}>
            <FaSearch />
          </button>
        </div>
      </nav>
    </div>
  );
};