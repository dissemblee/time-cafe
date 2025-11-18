'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.scss';
import { FaUser, FaClock } from "react-icons/fa"
import { useGetMeQuery } from '@/entities/me';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  const { data: me, isLoading } = useGetMeQuery();

  const handleProfileClick = (e: React.MouseEvent) => {
    if (!me?.client?.id) {
      e.preventDefault();
      window.location.href = '/registration';
    }
  };

  return (
    <div className={styles.Header}>
      <nav className={styles.Header__nav}>
        <Link href={'/'}>
          <div className={styles.Header__logo}>
            <div className={styles.Header__logoCore}>
              <FaClock className={styles.Header__logoIcon} />
            </div>
            <span className={styles.Header__logoText}>TimeCafe</span>
          </div>
        </Link>
        
        <div className={styles.Header__links}>
          <Link 
            href="/" 
            className={`${styles.Header__link} ${isActive('/') ? styles['Header__link--active'] : ''}`}
          >
            <div className={styles.Header__linkLiquid}></div>
            <span className={styles.Header__linkText}>Главная</span>
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
          <Link 
            href={me?.client?.id ? `/profile/${me.client.id}` : '/registration'} 
            className={styles.Header__actionButton}
            onClick={handleProfileClick}
          >
            <FaUser />
          </Link>
        </div>
      </nav>
    </div>
  );
};