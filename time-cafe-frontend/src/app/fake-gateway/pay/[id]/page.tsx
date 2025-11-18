"use client";

import { useGetMeQuery } from "@/entities/me";
import { useConfirmPaymentMutation } from "@/entities/transaction/transaction.api";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./fakeGateway.module.scss";

export default function GatewayPage() {
  const params = useParams()
  const txId = Number(params?.id);
  const [confirmPayment, { isLoading }] = useConfirmPaymentMutation();
  const { data: user } = useGetMeQuery()
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  const handleConfirm = async () => {
    await confirmPayment({ id: txId }).unwrap();
    setSuccess(true);
    setTimeout(() => {
      router.push("/profile/" + user?.client?.id);
    }, 1500);
  };

  return (
    <div className={styles.Gateway}>
      <div className={styles.Gateway__card}>
        <h1 className={styles.Gateway__title}>Платежный шлюз</h1>
        
        <div className={styles.Gateway__bankInfo}>
          <div className={styles.Gateway__bankLabel}>Счет списания:</div>
          <div className={styles.Gateway__bankNumber}>{user?.client?.bank_number}</div>
        </div>

        {success ? (
          <div className={styles.Gateway__success}>
            <div className={styles.Gateway__successIcon}>✓</div>
            <div className={styles.Gateway__successText}>Оплата прошла успешно!</div>
            <div className={styles.Gateway__redirectText}>Перенаправляем в личный кабинет...</div>
          </div>
        ) : (
          <button 
            onClick={handleConfirm} 
            disabled={isLoading}
            className={`${styles.Gateway__button} ${
              isLoading ? "styles.Gateway__button--disabled" : ''
            }`}
          >
            {isLoading ? (
              <>
                <span className={styles.Gateway__loader}></span>
                Обрабатываем оплату...
              </>
            ) : (
              'Подтвердить оплату'
            )}
          </button>
        )}
      </div>
    </div>
  );
}
