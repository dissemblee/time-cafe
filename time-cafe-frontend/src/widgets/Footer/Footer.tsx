'use client';

import React from 'react';
import { FaVk, FaTelegram, FaInstagram, FaClock, FaCoffee } from '../../shared/ui/Icons';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  return (
    <div className={styles.Footer}>
      <div className={styles.Footer__content}>
        <div className={styles.Footer__brand}>
          <div className={styles.Footer__logo}>
            <div className={styles.Footer__logoCore}>
              <div className={styles.Footer__iconCombo}>
                <FaClock className={styles.Footer__logoIcon} />
              </div>
              <div className={styles.Footer__liquidAnimation}></div>
            </div>
            <span className={styles.Footer__logoText}>TimeCafe</span>
          </div>
          <p className={styles.Footer__description}>
            Лучшее место для отдыха, работы и игр
          </p>
          <div className={styles.Footer__social}>
            <a href="#" className={styles.Footer__socialLink}>
              <FaVk className={styles.Footer__socialIcon} />
            </a>
            <a href="#" className={styles.Footer__socialLink}>
              <FaTelegram className={styles.Footer__socialIcon} />
            </a>
            <a href="#" className={styles.Footer__socialLink}>
              <FaInstagram className={styles.Footer__socialIcon} />
            </a>
          </div>
        </div>
        
        <div className={styles.Footer__links}>
          <div className={styles.Footer__column}>
            <h4 className={styles.Footer__columnTitle}>Навигация</h4>
            <a href="/" className={styles.Footer__link}>Главная</a>
            <a href="/games" className={styles.Footer__link}>Игры</a>
            <a href="/rooms" className={styles.Footer__link}>Комнаты</a>
            <a href="/menu" className={styles.Footer__link}>Меню</a>
          </div>
          
          <div className={styles.Footer__column}>
            <h4 className={styles.Footer__columnTitle}>Контакты</h4>
            <a href="tel:+79999999999" className={styles.Footer__link}>+7 (999) 999-99-99</a>
            <a href="mailto:info@timecafe.ru" className={styles.Footer__link}>info@timecafe.ru</a>
            <span className={styles.Footer__link}>Москва, ул. Примерная, 123</span>
          </div>
          
          <div className={styles.Footer__column}>
            <h4 className={styles.Footer__columnTitle}>Часы работы</h4>
            <span className={styles.Footer__link}>Пн-Чт: 10:00 - 23:00</span>
            <span className={styles.Footer__link}>Пт-Вс: 10:00 - 02:00</span>
          </div>
        </div>
      </div>
      
      <div className={styles.Footer__bottom}>
        <p>&copy; 2024 TimeCafe. Все права защищены.</p>
      </div>
    </div>
  );
};