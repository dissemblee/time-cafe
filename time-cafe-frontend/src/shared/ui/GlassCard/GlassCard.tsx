import React from 'react';
import styles from './GlassCard.module.scss';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  hover = true 
}) => {
  return (
    <div className={`${styles.GlassCard} ${hover ? styles['GlassCard--hover'] : ''} ${className}`}>
      <div className={styles.GlassCard__reflections}>
        <div className={styles.GlassCard__reflection1}></div>
        <div className={styles.GlassCard__reflection2}></div>
      </div>
      <div className={styles.GlassCard__liquid}></div>
      <div className={styles.GlassCard__content}>
        {children}
      </div>
    </div>
  );
};