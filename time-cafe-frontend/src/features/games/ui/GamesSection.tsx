'use client';

import React from 'react';
import { LiquidButton } from '../../../shared/ui/LiquidButton/LiquidButton';
import styles from './GamesSection.module.scss';

export const GamesSection: React.FC = () => {
  const games = [
    {
      platform: 'PS5',
      title: 'Spider-Man 2',
      description: 'Захватывающее приключение с Питером Паркером и Майлзом Моралесом',
      players: '1-2 игрока',
      genre: 'Приключение'
    },
    {
      platform: 'XBOX',
      title: 'Halo Infinite',
      description: 'Эпическая научно-фантастическая сага с мастером Чифом',
      players: '1-4 игрока',
      genre: 'Шутер'
    },
    {
      platform: 'SWITCH',
      title: 'Zelda: Tears of the Kingdom',
      description: 'Легендарное приключение Линка в огромном открытом мире',
      players: '1 игрок',
      genre: 'Приключение'
    }
  ];

  const handleBookGame = (gameTitle: string) => {
    alert(`Забронировано: ${gameTitle}`);
  };

  return (
    <section className={styles.GamesSection}>
      <div className={styles.GamesSection__header}>
        <div className={styles.GamesSection__glass}>
          <div className={styles.GamesSection__prism}></div>
        </div>
        <h2 className={styles.GamesSection__title}>Популярные игры</h2>
        <p className={styles.GamesSection__description}>
          Самые востребованные игры нашего антикафе
        </p>
      </div>
      
      <div className={styles.GamesSection__grid}>
        {games.map((game, index) => (
          <div key={index} className={styles.GamesSection__card}>
            <div className={styles.GamesSection__image}>
              <div className={styles.GamesSection__platform}>{game.platform}</div>
              <div className={styles.GamesSection__imageRefraction}></div>
            </div>
            <div className={styles.GamesSection__content}>
              <h3 className={styles.GamesSection__gameTitle}>{game.title}</h3>
              <p className={styles.GamesSection__gameDescription}>
                {game.description}
              </p>
              <div className={styles.GamesSection__details}>
                <span className={styles.GamesSection__detail}>{game.players}</span>
                <span className={styles.GamesSection__detail}>{game.genre}</span>
              </div>
              <LiquidButton 
                variant="primary" 
                onClick={() => handleBookGame(game.title)}
                className={styles.GamesSection__button}
              >
                <span>Забронировать</span>
                <i className="fas fa-arrow-right"></i>
              </LiquidButton>
            </div>
            <div className={styles.GamesSection__glow}></div>
          </div>
        ))}
      </div>
    </section>
  );
};