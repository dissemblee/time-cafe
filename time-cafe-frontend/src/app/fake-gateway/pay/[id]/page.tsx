"use client";

import { useGetMeQuery } from "@/entities/me";
import { useConfirmPaymentMutation } from "@/entities/transaction/transaction.api";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

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
    <div style={{ padding: 20 }}>
      <h1>Фейковый платежный шлюз</h1>
      {success ? (
        <p>Оплата прошла успешно! Перенаправляем...</p>
      ) : (
        <button onClick={handleConfirm} disabled={isLoading}>
          {isLoading ? "Обрабатываем..." : "Подтвердить оплату"}
        </button>
      )}
    </div>
  );
}
