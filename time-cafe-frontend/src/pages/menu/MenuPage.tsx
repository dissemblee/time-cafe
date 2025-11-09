'use client';

import React from 'react';
import { Header } from '../../widgets/Header/Header';
import { Footer } from '../../widgets/Footer/Footer';
import { GlassCard } from '../../shared/ui/GlassCard/GlassCard';
import styles from './MenuPage.module.scss';

export const MenuPage: React.FC = () => {
  const menuCategories = [
    {
      title: 'Напитки',
      items: ['Кофе латте - 250₽', 'Капучино - 230₽', 'Чай зеленый - 180₽', 'Молочный коктейль - 320₽']
    },
    {
      title: 'Десерты', 
      items: ['Чизкейк - 280₽', 'Тирамису - 300₽', 'Макаруны - 200₽', 'Мороженое - 250₽']
    },
    {
      title: 'Закуски',
      items: ['Картофель фри - 220₽', 'Начос - 350₽', 'Сырные палочки - 280₽', 'Крылышки - 420₽']
    }
  ];

  return (
    <div className={styles.MenuPage}>
      <div className={styles.MenuPage__universe}>
        <div className={styles.MenuPage__layer1}></div>
        <div className={styles.MenuPage__layer2}></div>
        <div className={styles.MenuPage__layer3}></div>
        
        <div className={styles.MenuPage__bubble1}></div>
        <div className={styles.MenuPage__bubble2}></div>
        <div className={styles.MenuPage__bubble3}></div>
        <div className={styles.MenuPage__bubble4}></div>
        
        <div className={styles.MenuPage__prism1}></div>
        <div className={styles.MenuPage__prism2}></div>
        <div className={styles.MenuPage__prism3}></div>
      </div>

      <div className={styles.MenuPage__interface}>
        <Header />
        <main className={styles.MenuPage__main}>
          <div className={styles.MenuPage__hero}>
            <h1 className={styles.MenuPage__title}>Меню TimeCafe</h1>
            <p className={styles.MenuPage__description}>
              Вкусные напитки и закуски для идеального отдыха
            </p>
          </div>
          
          <div className={styles.MenuPage__grid}>
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
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};