import React from 'react';
import styles from './MenuPage.module.scss';
import { MenuItems } from '@/features/menuItems/ui/menuItems';

export const MenuPage: React.FC = () => {
  return (
    <div className={styles.MenuPage}>
      <section className={styles.MenuPage__hero}>
        <h1 className={styles.MenuPage__title}>Меню TimeCafe</h1>
        <p className={styles.MenuPage__description}>
          Вкусные напитки и закуски для идеального отдыха
        </p>
      </section>
      <MenuItems />
    </div>
  );
};
