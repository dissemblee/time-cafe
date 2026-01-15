  import React from 'react';
import styles from './GamesPage.module.scss';
import { HeroSection } from '@/shared/ui/HeroSection';
import { GamesSection } from '@/features/games/ui/GamesSection';

export const GamesPage: React.FC = () => {
  return (
    <>
      <HeroSection title="Игровая библиотека" description="Более 100 настольных, консольных и VR игр для любого настроения" />
      <section className={styles.GamesPage__content}>
        <GamesSection />
      </section>
    </>
  );
};
