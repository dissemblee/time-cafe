import styles from './Error.module.scss';
import { GlassCard } from '../GlassCard';
import { FaExclamationTriangle } from 'react-icons/fa';

export const Error = ({ message = "Упс... Видимо возникла ошибка", hint }: { message?: string; hint?: string }) => {
  return (
    <GlassCard>
      <div className={styles.Error}>
        <div className={styles.Error__icon}>
          <FaExclamationTriangle />
        </div>
        <div className={styles.Error__message}>{message}</div>
        {hint && <div className={styles.Error__hint}>{hint}</div>}
      </div>
    </GlassCard>
  );
};
