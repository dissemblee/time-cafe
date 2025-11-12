  import React from 'react';
import styles from './GamesPage.module.scss';
import { HeroSection } from '@/shared/ui/HeroSection';

export const GamesPage: React.FC = () => {
  return (
    <>
      <HeroSection title="Игровая библиотека" description="Более 100 настольных, консольных и VR игр для любого настроения" />
      <section className={styles.GamesPage__content}>
        <p>Страница игр в разработке...</p>
        <p>Здесь будут фильтры по платформам, жанрам, количеству игроков</p>
      </section>
    </>
  );
};
