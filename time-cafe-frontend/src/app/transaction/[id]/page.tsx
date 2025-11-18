"use client";

import { useCreatePaymentSessionMutation } from "@/entities/transaction/transaction.api";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function PayPage() {
  const params = useParams()
  const bookingId = Number(params?.id);
  const [createSession, { data, isLoading }] = useCreatePaymentSessionMutation();
  const router = useRouter();

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

  return (
    <div style={{ padding: 20 }}>
      <h1>Оплата бронирования #{bookingId}</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handlePay} disabled={isLoading}>
        {isLoading ? "Создаем платеж..." : "Оплатить"}
      </button>
    </div>
  );
}
