import React from 'react';
import styles from './Input.module.scss';
import clsx from 'clsx';

type AsType = 'input' | 'textarea' | 'select';

interface BaseProps {
  as?: AsType;
  label?: string;
  error?: string;
  className?: string;
}

type InputProps =
  | (BaseProps & React.InputHTMLAttributes<HTMLInputElement>)
  | (BaseProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>)
  | (BaseProps & React.SelectHTMLAttributes<HTMLSelectElement>);

export const Input: React.FC<InputProps> = ({
  as = 'input',
  label,
  error,
  className,
  children,
  ...props
}) => {
  let Component: any = as;

  return (
    <div className={styles.Input}>
      {label && <label className={styles.Input__label}>{label}</label>}

      <Component
        {...props}
        className={clsx(
          styles.Input__field,
          className,
          error && styles['Input__field--error']
        )}
      >
        {as === 'select' && children}
      </Component>

      {error && <div className={styles.Input__errorText}>{error}</div>}
    </div>
  );
};

export default Input;
