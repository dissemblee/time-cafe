import React, { ButtonHTMLAttributes } from 'react';
import styles from './LiquidButton.module.scss';

interface LiquidButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export const LiquidButton: React.FC<LiquidButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  ...props
}) => {
  return (
    <button 
      className={`${styles.LiquidButton} ${styles[`LiquidButton--${variant}`]} ${className}`}
      onClick={onClick}
      {...props}
    >
      <div className={styles.LiquidButton__wave}></div>
      {children}
    </button>
  );
};