'use client';

import { ClientLayout } from '@/app/clientLayout/ClientLayout';
import { LiquidButton } from '@/shared/ui/LiquidButton/LiquidButton';
import { GlassInput } from '@/shared/ui/GlassInput/Input';
import styles from './profile.module.scss';

export default function ProfilePage() {
  // Заглушка данных пользователя
  const userData = {
    email: 'user@example.com',
    name: 'Иван Иванов',
    phone: '+7 (999) 123-45-67',
    date_of_birth: '1990-01-01',
    bank_number: '1234 5678 9012 3456',
    discount_percent: 10,
    status: 'Активный'
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Save profile data');
  };

  return (
    <ClientLayout>
      <div className={styles.ProfilePage}>
        <div className={styles.ProfilePage__card}>
          <h1 className={styles.ProfilePage__title}>Профиль</h1>
          
          <form onSubmit={handleSave} className={styles.ProfilePage__form}>
            <div className={styles.ProfilePage__grid}>
              <GlassInput
                label="Email"
                value={userData.email}
                onChange={() => {}}
                type="email"
                disabled
              />

              <GlassInput
                label="Имя"
                value={userData.name}
                onChange={() => {}}
                type="text"
              />

              <GlassInput
                label="Телефон"
                value={userData.phone}
                onChange={() => {}}
                type="tel"
              />

              <GlassInput
                label="Дата рождения"
                value={userData.date_of_birth}
                onChange={() => {}}
                type="date"
              />

              <GlassInput
                label="Банковский счет"
                value={userData.bank_number}
                onChange={() => {}}
                type="text"
              />

              <div className={styles.ProfilePage__info}>
                <label>Скидка</label>
                <div className={styles.ProfilePage__value}>{userData.discount_percent}%</div>
              </div>

              <div className={styles.ProfilePage__info}>
                <label>Статус</label>
                <div className={styles.ProfilePage__value}>{userData.status}</div>
              </div>
            </div>

            <LiquidButton variant="primary" type="submit">
              Сохранить изменения
            </LiquidButton>
          </form>
        </div>
      </div>
    </ClientLayout>
  );
}