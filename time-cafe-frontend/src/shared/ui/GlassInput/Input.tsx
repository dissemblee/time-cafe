import React from 'react';
import styles from './Input.module.scss';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  value: string;
  error?: string;
}

export const GlassInput = ({ label, value, error, ...props }: InputProps) => {
  return (
    <div className={styles.Input}>
      {label && <label className={styles.Input__label}>{label}</label>}

      <input
        {...props}
        className={clsx(styles.Input__field, error && styles['Input__field--error'])}
        value={value}
      />

      {error && <div className={styles.Input__errorText}>{error}</div>}
    </div>
  );
};
