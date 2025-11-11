'use client';

import React from 'react';
import styles from './GamesPage.module.scss';

export const GamesPage: React.FC = () => {
  return (
    <main className={styles.GamesPage}>
      <section className={styles.GamesPage__hero}>
        <h1 className={styles.GamesPage__title}>Игровая библиотека</h1>
        <p className={styles.GamesPage__description}>
          Более 100 настольных, консольных и VR игр для любого настроения
        </p>
      </section>

      <section className={styles.GamesPage__content}>
        <p>Страница игр в разработке...</p>
        <p>Здесь будут фильтры по платформам, жанрам, количеству игроков</p>
      </section>
    </main>
  );
};
