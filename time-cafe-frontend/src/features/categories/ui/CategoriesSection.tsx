'use client';

import React from 'react';
import { GlassCard } from '../../../shared/ui/GlassCard/GlassCard';
import styles from './CategoriesSection.module.scss';

export const CategoriesSection: React.FC = () => {
  const categories = [
    {
      icon: 'fas fa-chess-board',
      title: 'Настольные игры',
      description: 'Классические и современные настолки для компании',
      count: '50+ игр'
    },
    {
      icon: 'fas fa-tv',
      title: 'Консольные игры',
      description: 'Новейшие хиты на мощных игровых консолях',
      count: '60+ игр'
    },
    {
      icon: 'fas fa-vr-cardboard',
      title: 'VR игры',
      description: 'Полное погружение в виртуальную реальность',
      count: '15+ игр'
    },
    {
      icon: 'fas fa-users',
      title: 'Мультиплеер',
      description: 'Игры для большой компании друзей',
      count: '30+ игр'
    }
  ];

  return (
    <section className={styles.CategoriesSection}>
      <div className={styles.CategoriesSection__header}>
        <div className={styles.CategoriesSection__glass}>
          <div className={styles.CategoriesSection__prism}></div>
        </div>
        <h2 className={styles.CategoriesSection__title}>Категории игр</h2>
        <p className={styles.CategoriesSection__description}>
          Выберите тип развлечений по вашему вкусу
        </p>
      </div>
      
      <div className={styles.CategoriesSection__grid}>
        {categories.map((category, index) => (
          <GlassCard key={index} className={styles.CategoriesSection__card}>
            <div className={styles.CategoriesSection__content}>
              <div className={styles.CategoriesSection__icon}>
                <i className={category.icon}></i>
              </div>
              <h3 className={styles.CategoriesSection__cardTitle}>{category.title}</h3>
              <p className={styles.CategoriesSection__cardDescription}>
                {category.description}
              </p>
              <div className={styles.CategoriesSection__count}>
                {category.count}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
};