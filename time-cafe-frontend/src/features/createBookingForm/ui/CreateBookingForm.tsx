"use client"

import { BookingStatus, useCreateBookingMutation } from "@/entities/booking"
import { useForm } from "@/shared/hooks/useForm"
import { GlassInput } from "@/shared/ui/GlassInput"
import { LiquidButton } from "@/shared/ui/LiquidButton"
import { useGetMeQuery } from "@/entities/me"
import styles from "./CreateBookingForm.module.scss"
import { useRouter } from "next/navigation"

const initialFormData = {
  start_time: "",
  end_time: ""
}

export const CreateBookingForm = ({ tableId }: { tableId: number }) => {
  const route = useRouter()
  const { data: me } = useGetMeQuery()
  const clientId = me?.id ?? null

  const [createBooking, { isLoading }] = useCreateBookingMutation()
  const { formData, errors, handleChange, setErrors, resetForm } = useForm(initialFormData)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!clientId || !tableId) return

    try {
      const start = new Date(formData.start_time)
      const end = new Date(formData.end_time)

      const booking = await createBooking({
        client_id: clientId,
        table_id: tableId,
        start_time: start.toISOString(),
        end_time: end.toISOString(),
        status: BookingStatus.Active
      }).unwrap()

      resetForm()
      route.push("/transaction/" + booking.id)
    } catch (err: any) {
      console.error("Ошибка при создании бронирования:", err)
      if (err?.data) console.error("Детали ошибки от сервера:", err.data)
    }
  }


  return (
    <form onSubmit={handleSubmit} className={styles.CreateBookingForm}>
      <h1 className={styles.CreateBookingForm__Title}>Бронирование</h1>

      <GlassInput
        label="Начало *"
        name="start_time"
        type="datetime-local"
        value={formData.start_time}
        onChange={handleChange}
        error={errors.start_time}
        disabled={isLoading}
      />

      <GlassInput
        label="Окончание *"
        name="end_time"
        type="datetime-local"
        value={formData.end_time}
        onChange={handleChange}
        error={errors.end_time}
        disabled={isLoading}
      />

      <LiquidButton type="submit" disabled={isLoading}>
        {isLoading ? "Создание..." : "Создать бронирование"}
      </LiquidButton>
    </form>
  )
}
