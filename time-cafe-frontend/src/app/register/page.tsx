'use client';

import { useState } from 'react';
import { ClientLayout } from '@/app/clientLayout/ClientLayout';
import { LiquidButton } from '@/shared/ui/LiquidButton/LiquidButton';
import { GlassInput } from '@/shared/ui/GlassInput/Input';
import styles from './register.module.scss';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    date_of_birth: '',
    bank_number: ''
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Register data:', formData);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login data:', loginData);
  };

  return (
    <ClientLayout>
      <div className={styles.RegisterPage}>
        <div className={styles.RegisterPage__grid}>
          {/* Левая колонка - Регистрация */}
          <div className={styles.RegisterPage__card}>
            <h1 className={styles.RegisterPage__title}>Регистрация</h1>
            
            <form onSubmit={handleRegister} className={styles.RegisterPage__form}>
              <GlassInput
                label="Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                type="email"
                required
              />

              <GlassInput
                label="Пароль"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                type="password"
                required
              />

              <GlassInput
                label="Имя"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                type="text"
                required
              />

              <GlassInput
                label="Телефон"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                type="tel"
                required
              />

              <GlassInput
                label="Дата рождения"
                value={formData.date_of_birth}
                onChange={(e) => setFormData({...formData, date_of_birth: e.target.value})}
                type="date"
              />

              <GlassInput
                label="Банковский счет"
                value={formData.bank_number}
                onChange={(e) => setFormData({...formData, bank_number: e.target.value})}
                type="text"
              />

              <LiquidButton variant="primary" type="submit">
                Зарегистрироваться
              </LiquidButton>
            </form>
          </div>

          {/* Правая колонка - Логин */}
          <div className={styles.RegisterPage__card}>
            <h2 className={styles.RegisterPage__loginTitle}>Уже зарегистрированы?</h2>
            <p className={styles.RegisterPage__loginSubtitle}>Войдите!</p>
            
            <form onSubmit={handleLogin} className={styles.RegisterPage__form}>
              <GlassInput
                label="Email"
                value={loginData.email}
                onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                type="email"
                required
              />

              <GlassInput
                label="Пароль"
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                type="password"
                required
              />

              <LiquidButton variant="primary" type="submit">
                Войти
              </LiquidButton>
            </form>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}