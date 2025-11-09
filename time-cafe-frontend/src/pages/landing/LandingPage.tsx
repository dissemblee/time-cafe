'use client';

import React, { useEffect } from 'react';
import { Header } from '../../widgets/Header/Header';
import { Footer } from '../../widgets/Footer/Footer';
import { HeroSection } from '../../features/hero/ui/HeroSection';
import { CategoriesSection } from '../../features/categories/ui/CategoriesSection';
import { GamesSection } from '../../features/games/ui/GamesSection';
import styles from './LandingPage.module.scss';

export const LandingPage: React.FC = () => {
  useEffect(() => {
    // Enhanced liquid interactions - ТОЧНО КАК В ОРИГИНАЛЕ
    const handleMouseMove = (e: MouseEvent) => {
      const layers = document.querySelectorAll(`.${styles.LandingPage__layer1}, .${styles.LandingPage__layer2}, .${styles.LandingPage__layer3}`);
      const bubbles = document.querySelectorAll(`.${styles.LandingPage__bubble1}, .${styles.LandingPage__bubble2}, .${styles.LandingPage__bubble3}, .${styles.LandingPage__bubble4}`);
      const prisms = document.querySelectorAll(`.${styles.LandingPage__prism1}, .${styles.LandingPage__prism2}, .${styles.LandingPage__prism3}`);
      
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      layers.forEach((layer, index) => {
        const speed = (index + 1) * 0.2;
        const xMove = x * speed * 40;
        const yMove = y * speed * 40;
        
        (layer as HTMLElement).style.transform = `translate(${xMove}px, ${yMove}px)`;
      });
      
      bubbles.forEach((bubble, index) => {
        const speed = (index + 1) * 0.3;
        const xMove = x * speed * 60;
        const yMove = y * speed * 60;
        
        (bubble as HTMLElement).style.transform = `translate(${xMove}px, ${yMove}px)`;
      });
      
      prisms.forEach((prism, index) => {
        const speed = (index + 1) * 0.1;
        const rotate = x * speed * 10;
        
        (prism as HTMLElement).style.transform = `rotate(${rotate}deg)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className={styles.LandingPage}>
      {/* Liquid Universe Background - ТОЧНО КАК В ОРИГИНАЛЕ */}
      <div className={styles.LandingPage__universe}>
        <div className={styles.LandingPage__layer1}></div>
        <div className={styles.LandingPage__layer2}></div>
        <div className={styles.LandingPage__layer3}></div>
        
        <div className={styles.LandingPage__bubble1}></div>
        <div className={styles.LandingPage__bubble2}></div>
        <div className={styles.LandingPage__bubble3}></div>
        <div className={styles.LandingPage__bubble4}></div>
        
        <div className={styles.LandingPage__prism1}></div>
        <div className={styles.LandingPage__prism2}></div>
        <div className={styles.LandingPage__prism3}></div>
      </div>

      <div className={styles.LandingPage__interface}>
        <Header />
        <main className={styles.LandingPage__main}>
          <HeroSection />
          <CategoriesSection />
          <GamesSection />
        </main>
        <Footer />
      </div>
    </div>
  );
};