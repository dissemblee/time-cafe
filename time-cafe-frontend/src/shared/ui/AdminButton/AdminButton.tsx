import React, { ButtonHTMLAttributes } from 'react';
import styles from './AdminButton.module.scss';

interface AdminButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export const AdminButton = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  ...props
}: AdminButtonProps) => {
  return (
    <button 
      className={`${styles.AdminButton} ${styles[`AdminButton--${variant}`]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};