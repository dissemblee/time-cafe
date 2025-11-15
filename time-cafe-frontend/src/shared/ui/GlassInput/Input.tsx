import React from 'react';
import styles from './Input.module.scss';
import clsx from 'clsx';

type NativeInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
>;

interface InputProps extends NativeInputProps {
  label?: string;
  value: string;
  placeholder?: string;
  error?: string;
  // onChange: (value: string) => void;
}

export const Input = ({ label, value, placeholder, error, /*onChange,*/ className, ...props }: InputProps) => {
  return (
    <div className={styles.Input}>
      {label && <label className={styles.Input__label}>{label}</label>}

      <input
        {...props}
        className={clsx(styles.Input__field, className, error && styles['Input__field--error'])}
        value={value}
        placeholder={placeholder}
        // onChange={(e) => onChange(e.target.value)}
      />

      {error && <div className={styles.Input__errorText}>{error}</div>}
    </div>
  );
};
