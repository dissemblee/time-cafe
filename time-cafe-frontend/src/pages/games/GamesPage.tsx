'use client';

import React from 'react';
import { Header } from '../../widgets/Header/Header';
import { Footer } from '../../widgets/Footer/Footer';
import styles from './GamesPage.module.scss';

export const GamesPage: React.FC = () => {
  return (
    <div className={styles.GamesPage}>
      {/* Тот же фон что на главной */}
      <div className={styles.GamesPage__universe}>
        <div className={styles.GamesPage__layer1}></div>
        <div className={styles.GamesPage__layer2}></div>
        <div className={styles.GamesPage__layer3}></div>
        
        <div className={styles.GamesPage__bubble1}></div>
        <div className={styles.GamesPage__bubble2}></div>
        <div className={styles.GamesPage__bubble3}></div>
        <div className={styles.GamesPage__bubble4}></div>
        
        <div className={styles.GamesPage__prism1}></div>
        <div className={styles.GamesPage__prism2}></div>
        <div className={styles.GamesPage__prism3}></div>
      </div>

      <div className={styles.GamesPage__interface}>
        <Header />
        <main className={styles.GamesPage__main}>
          <div className={styles.GamesPage__hero}>
            <h1 className={styles.GamesPage__title}>Игровая библиотека</h1>
            <p className={styles.GamesPage__description}>
              Более 100 настольных, консольных и VR игр для любого настроения
            </p>
          </div>
          
          <div className={styles.GamesPage__content}>
            <p>Страница игр в разработке...</p>
            <p>Здесь будут фильтры по платформам, жанрам, количеству игроков</p>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};