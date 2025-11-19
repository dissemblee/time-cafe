"use client";

import { useGetBookingQuery } from "@/entities/booking";
import { useGetMeQuery } from "@/entities/me";
import { useCreatePaymentSessionMutation } from "@/entities/transaction/transaction.api";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./transaction.module.scss"

export default function PayPage() {
  const params = useParams()
  const bookingId = Number(params?.id);
  const { data: booking, isLoading: isBookingLoading } = useGetBookingQuery(bookingId);
  const [createSession, { isLoading }] = useCreatePaymentSessionMutation();
  const router = useRouter();
  const { data: user, isLoading: isUserLoading } = useGetMeQuery()
  const [error, setError] = useState<string | null>(null);

  const handlePay = async () => {
    try {
      const clientId = 1;
      const res = await createSession({ booking_id: bookingId, client_id: clientId }).unwrap();
      router.push(res.payment_url);
    } catch (e: any) {
      setError(e.message || "Ошибка при создании платежа");
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleString('ru-RU');
  };

  return (
    <div className={styles.PayPage}>
      <div className={styles.PayPage__card}>
        <h1 className={styles.PayPage__title}>Оплата бронирования</h1>
        
        <div className={styles.PayPage__section}>
          <h2 className={styles.PayPage__sectionTitle}>Банковские реквизиты</h2>
          <div className={styles.PayPage__infoGrid}>
            <div className={styles.PayPage__infoRow}>
              <span className={styles.PayPage__infoLabel}>Счет списания:</span>
              {isUserLoading ? (
                <div className={styles.PayPage__skeleton} style={{ width: '200px' }}></div>
              ) : (
                <span className={styles.PayPage__bankNumber}>{user?.client?.bank_number}</span>
              )}
            </div>
          </div>
        </div>

        <div className={styles.PayPage__section}>
          <h2 className={styles.PayPage__sectionTitle}>Детали бронирования</h2>
          <div className={styles.PayPage__infoGrid}>
            <div className={styles.PayPage__infoRow}>
              <span className={styles.PayPage__infoLabel}>ID бронирования:</span>
              <span className={styles.PayPage__infoValue}>#{bookingId}</span>
            </div>
            
            <div className={styles.PayPage__infoRow}>
              <span className={styles.PayPage__infoLabel}>Стоимость:</span>
              {isBookingLoading ? (
                <div className={styles.PayPage__skeleton} style={{ width: '100px' }}></div>
              ) : (
                <span className={styles.PayPage__price}>{booking?.price} ₽</span>
              )}
            </div>
            
            <div className={styles.PayPage__infoRow}>
              <span className={styles.PayPage__infoLabel}>Начало:</span>
              {isBookingLoading ? (
                <div className={styles.PayPage__skeleton} style={{ width: '180px' }}></div>
              ) : (
                <span className={styles.PayPage__infoValue}>{formatDate(booking?.start_time)}</span>
              )}
            </div>
            
            <div className={styles.PayPage__infoRow}>
              <span className={styles.PayPage__infoLabel}>Конец:</span>
              {isBookingLoading ? (
                <div className={styles.PayPage__skeleton} style={{ width: '180px' }}></div>
              ) : (
                <span className={styles.PayPage__infoValue}>{formatDate(booking?.end_time)}</span>
              )}
            </div>
            
            <div className={styles.PayPage__infoRow}>
              <span className={styles.PayPage__infoLabel}>Стол:</span>
              {isBookingLoading ? (
                <div className={styles.PayPage__skeleton} style={{ width: '120px' }}></div>
              ) : (
                <span className={styles.PayPage__infoValue}>{booking?.table?.name}</span>
              )}
            </div>
          </div>
        </div>

        {error && (
          <div className={styles.PayPage__error}>
            {error}
          </div>
        )}

        <button 
          onClick={handlePay} 
          disabled={isLoading || isBookingLoading || isUserLoading}
          className={`${styles.PayPage__button} ${
            (isLoading || isBookingLoading || isUserLoading) ? "styles.PayPage__button--disabled" : ''
          }`}
        >
          {isLoading ? (
            <>
              <span className={styles.PayPage__loader}></span>
              Создаем платеж...
            </>
          ) : (
            'Перейти к оплате'
          )}
        </button>
      </div>
    </div>
  );
}
