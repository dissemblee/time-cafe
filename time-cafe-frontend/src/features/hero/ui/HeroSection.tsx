'use client';

import React from 'react';
import { GlassCard } from '../../../shared/ui/GlassCard/GlassCard';
import { LiquidButton } from '../../../shared/ui/LiquidButton/LiquidButton';
import styles from './HeroSection.module.scss';

export const HeroSection: React.FC = () => {
  const handleBookTable = () => {
    alert('Забронировать стол');
  };

  const handleViewGames = () => {
    alert('Смотреть игры');
  };

  return (
    <section className={styles.HeroSection}>
      {/* Liquid Universe Background */}
      <div className={styles.HeroSection__background}>
        <div className={styles.HeroSection__layer1}></div>
        <div className={styles.HeroSection__layer2}></div>
        <div className={styles.HeroSection__layer3}></div>
        
        <div className={styles.HeroSection__bubble1}></div>
        <div className={styles.HeroSection__bubble2}></div>
        <div className={styles.HeroSection__bubble3}></div>
        <div className={styles.HeroSection__bubble4}></div>
      </div>

      <div className={styles.HeroSection__content}>
        <div className={styles.HeroSection__text}>
          <div className={styles.HeroSection__badge}>
            <div className={styles.HeroSection__badgeRefraction}></div>
            <span>Игровая вселенная</span>
          </div>
          
          <h1 className={styles.HeroSection__title}>
            <span className={styles.HeroSection__titleLine}>Погрузитесь в мир</span>
            <span className={styles.HeroSection__titleAccent}>виртуальных приключений</span>
          </h1>
          
          <p className={styles.HeroSection__description}>
            Откройте для себя более 100 настольных и консольных игр в уникальной атмосфере нашего антикафе
          </p>
          
          <div className={styles.HeroSection__stats}>
            <div className={styles.HeroSection__stat}>
              <div className={styles.HeroSection__statGlass}>
                <div className={styles.HeroSection__statDistortion}></div>
              </div>
              <div className={styles.HeroSection__statValue}>50+</div>
              <div className={styles.HeroSection__statLabel}>Настольных игр</div>
            </div>
            
            <div className={styles.HeroSection__stat}>
              <div className={styles.HeroSection__statGlass}>
                <div className={styles.HeroSection__statDistortion}></div>
              </div>
              <div className={styles.HeroSection__statValue}>60+</div>
              <div className={styles.HeroSection__statLabel}>Консольных игр</div>
            </div>
            
            <div className={styles.HeroSection__stat}>
              <div className={styles.HeroSection__statGlass}>
                <div className={styles.HeroSection__statDistortion}></div>
              </div>
              <div className={styles.HeroSection__statValue}>3</div>
              <div className={styles.HeroSection__statLabel}>Игровые консоли</div>
            </div>
          </div>
          
          <div className={styles.HeroSection__actions}>
            <LiquidButton variant="primary" onClick={handleBookTable}>
              <span>Забронировать стол</span>
              <i className="fas fa-arrow-right"></i>
            </LiquidButton>
            
            <LiquidButton variant="secondary" onClick={handleViewGames}>
              <span>Смотреть игры</span>
            </LiquidButton>
          </div>
        </div>

        <div className={styles.HeroSection__visual}>
          <GlassCard className={styles.HeroSection__consoleCard1}>
            <div className={styles.HeroSection__consoleContent}>
              <div className={styles.HeroSection__consoleIcon}>
                <i className="fab fa-playstation"></i>
              </div>
              <div className={styles.HeroSection__consoleTitle}>PS5 Pro</div>
            </div>
          </GlassCard>
          
          <GlassCard className={styles.HeroSection__consoleCard2}>
            <div className={styles.HeroSection__consoleContent}>
              <div className={styles.HeroSection__consoleIcon}>
                <i className="fab fa-xbox"></i>
              </div>
              <div className={styles.HeroSection__consoleTitle}>Xbox Series X</div>
            </div>
          </GlassCard>
          
          <GlassCard className={styles.HeroSection__consoleCard3}>
            <div className={styles.HeroSection__consoleContent}>
              <div className={styles.HeroSection__consoleIcon}>
                <i className="fas fa-gamepad"></i>
              </div>
              <div className={styles.HeroSection__consoleTitle}>Nintendo Switch</div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};