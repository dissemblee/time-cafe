"use client"
import { CreateBookingForm } from "@/features/createBookingForm"
import { TableInfo } from "@/features/tableInfo"
import styles from "./BookingProcess.module.scss"
import { useParams } from "next/navigation"

export const BookingProcess = () => {
  const params = useParams()
  const tableId = Number(params?.tableId)
  console.log(tableId)
  return (
    <section className={styles.BookingProcess}>
      <CreateBookingForm tableId={tableId} />
      <TableInfo tableId={tableId} />
    </section>
  )
}