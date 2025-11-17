"use client"
import { useGetTableQuery } from "@/entities/table"
import { GlassCard } from "@/shared/ui/GlassCard/GlassCard"
import styles from "./TableInfo.module.scss"
import { Loader } from "@/shared/ui/Loader"
import { Error } from "@/shared/ui/Error"

export const TableInfo = ({ tableId }: { tableId: number }) => {
  const { data: table, isLoading, error } = useGetTableQuery(tableId)

  if (isLoading) return <Loader />
  if (error || !table) return <Error />

  return (
    <div className={styles.TableInfo__content}>
      <div>
      <h3 className={styles.TableInfo__title}>{table.name}</h3>

      <p className={styles.TableInfo__detail}>Номер стола: {table.id}</p>
      <p className={styles.TableInfo__detail}>Диваны: {table.sofas ? table.sofas : "Нет"}</p>
      <p className={styles.TableInfo__detail}>Сиденья: {table.seats ? table.seats : "Нет"}</p>
      <p className={styles.TableInfo__detail}>Статус: {table.status ? table.status : "Нет"}</p>
      <div className={styles.TableInfo__features}>
        <span className={styles.TableInfo__feature}>
          Консоль: {table.has_console ? "Есть" : "Нет"}
        </span>

        <span className={styles.TableInfo__feature}>
          Телевизор: {table.has_tv ? "Есть" : "Нет"}
        </span>
      </div>
      </div>
    </div>
  )
}
