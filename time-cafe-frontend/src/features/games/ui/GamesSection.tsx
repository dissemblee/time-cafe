'use client';

import React from 'react';
import { LiquidButton } from '../../../shared/ui/LiquidButton/LiquidButton';
import styles from './GamesSection.module.scss';
import { Loader } from '@/shared/ui/Loader';
import { Error } from "@/shared/ui/Error";
import { useGetAllBoardGamesQuery } from '@/entities/boardGame';

export const GamesSection: React.FC = () => {
  const { data: gameData, isLoading, error } = useGetAllBoardGamesQuery({page: 1, per_page: 10});
    
  if (isLoading) return <Loader />;
  if (error) return <Error />;

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
        {gameData!.data?.length > 0 ? (
          gameData!.data.map((game) => (
            <div key={game.id} className={styles.GamesSection__card}>
              <div className={styles.GamesSection__image}>
                <div className={styles.GamesSection__imageRefraction}></div>
              </div>
              <div className={styles.GamesSection__content}>
                <h3 className={styles.GamesSection__gameTitle}>{game.name}</h3>
                <p className={styles.GamesSection__gameDescription}>
                  {game.description}
                </p>
                <div className={styles.GamesSection__details}>
                  <span className={styles.GamesSection__detail}>
                    {game.quantity ? `Количество: ${game.quantity}` : "Нет в наличии"}
                  </span>
                </div>
              </div>
              <div className={styles.GamesSection__glow}></div>
            </div>
          ))
        ) : (
          <div className={styles.GamesSection__card}>
            <div className={styles.GamesSection__details}>
              <span className={styles.GamesSection__detail}>Упс... Игр нет</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};