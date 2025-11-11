'use client';

import React from 'react';
import { GlassCard } from '../../shared/ui/GlassCard/GlassCard';
import styles from './MenuPage.module.scss';

export const MenuPage: React.FC = () => {
  const menuCategories = [
    {
      title: 'Напитки',
      items: ['Кофе латте - 250₽', 'Капучино - 230₽', 'Чай зеленый - 180₽', 'Молочный коктейль - 320₽'],
    },
    {
      title: 'Десерты',
      items: ['Чизкейк - 280₽', 'Тирамису - 300₽', 'Макаруны - 200₽', 'Мороженое - 250₽'],
    },
    {
      title: 'Закуски',
      items: ['Картофель фри - 220₽', 'Начос - 350₽', 'Сырные палочки - 280₽', 'Крылышки - 420₽'],
    },
  ];

  return (
    <div className={styles.MenuPage}>
      <section className={styles.MenuPage__hero}>
        <h1 className={styles.MenuPage__title}>Меню TimeCafe</h1>
        <p className={styles.MenuPage__description}>
          Вкусные напитки и закуски для идеального отдыха
        </p>
      </section>

      <section className={styles.MenuPage__grid}>
        {menuCategories.map((category, index) => (
          <GlassCard key={index} className={styles.MenuPage__card}>
            <div className={styles.MenuPage__cardContent}>
              <h3 className={styles.MenuPage__cardTitle}>{category.title}</h3>
              <ul className={styles.MenuPage__items}>
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex} className={styles.MenuPage__item}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </GlassCard>
        ))}
      </section>
    </div>
  );
};
