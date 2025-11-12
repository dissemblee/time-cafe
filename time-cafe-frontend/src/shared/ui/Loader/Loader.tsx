import React from 'react';
import styles from './Loader.module.scss';
import { GlassCard } from '../GlassCard';

export const Loader = () => {
  return (
    <GlassCard>
      <div className={styles.Loader}>
        <div className={styles.Loader__spinner} />
      </div>
    </GlassCard>
  );
};
