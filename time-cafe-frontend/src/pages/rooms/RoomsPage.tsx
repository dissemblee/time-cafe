'use client';

import React from 'react';
import { Header } from '../../widgets/Header/Header';
import { Footer } from '../../widgets/Footer/Footer';
import { GlassCard } from '../../shared/ui/GlassCard/GlassCard';
import { LiquidButton } from '../../shared/ui/LiquidButton/LiquidButton';
import styles from './RoomsPage.module.scss';

export const RoomsPage: React.FC = () => {
  const rooms = [
    {
      name: 'Игровая зона PS5',
      description: 'Мощная консоль нового поколения с 4K HDR',
      capacity: '2-4 человека',
      price: '500₽/час',
      features: ['4K HDR', 'DualSense', '100+ игр']
    },
    {
      name: 'Xbox Lounge',
      description: 'Комфортная зона с Xbox Series X и кинопроектором',
      capacity: '3-6 человек', 
      price: '600₽/час',
      features: ['Xbox Series X', 'Проектор', 'Game Pass']
    },
    {
      name: 'VR Комната',
      description: 'Полное погружение в виртуальную реальность',
      capacity: '1-2 человека',
      price: '700₽/час',
      features: ['Oculus Quest 2', '5x5м зона', '30+ VR игр']
    }
  ];

  const handleBookRoom = (roomName: string) => {
    alert(`Забронирована комната: ${roomName}`);
  };

  return (
    <div className={styles.RoomsPage}>
      <div className={styles.RoomsPage__universe}>
        <div className={styles.RoomsPage__layer1}></div>
        <div className={styles.RoomsPage__layer2}></div>
        <div className={styles.RoomsPage__layer3}></div>
        
        <div className={styles.RoomsPage__bubble1}></div>
        <div className={styles.RoomsPage__bubble2}></div>
        <div className={styles.RoomsPage__bubble3}></div>
        <div className={styles.RoomsPage__bubble4}></div>
        
        <div className={styles.RoomsPage__prism1}></div>
        <div className={styles.RoomsPage__prism2}></div>
        <div className={styles.RoomsPage__prism3}></div>
      </div>

      <div className={styles.RoomsPage__interface}>
        <Header />
        <main className={styles.RoomsPage__main}>
          <div className={styles.RoomsPage__hero}>
            <h1 className={styles.RoomsPage__title}>Игровые комнаты</h1>
            <p className={styles.RoomsPage__description}>
              Уютные пространства для игр и отдыха с друзьями
            </p>
          </div>
          
          <div className={styles.RoomsPage__grid}>
            {rooms.map((room, index) => (
              <GlassCard key={index} className={styles.RoomsPage__card}>
                <div className={styles.RoomsPage__cardContent}>
                  <h3 className={styles.RoomsPage__roomName}>{room.name}</h3>
                  <p className={styles.RoomsPage__roomDescription}>{room.description}</p>
                  
                  <div className={styles.RoomsPage__details}>
                    <div className={styles.RoomsPage__detail}>
                      <i className="fas fa-users"></i>
                      <span>{room.capacity}</span>
                    </div>
                    <div className={styles.RoomsPage__detail}>
                      <i className="fas fa-tag"></i>
                      <span>{room.price}</span>
                    </div>
                  </div>
                  
                  <div className={styles.RoomsPage__features}>
                    {room.features.map((feature, featureIndex) => (
                      <span key={featureIndex} className={styles.RoomsPage__feature}>
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <LiquidButton 
                    variant="primary" 
                    onClick={() => handleBookRoom(room.name)}
                    className={styles.RoomsPage__bookButton}
                  >
                    <span>Забронировать</span>
                    <i className="fas fa-arrow-right"></i>
                  </LiquidButton>
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