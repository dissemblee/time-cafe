"use client";
import { useState } from "react";
import { DataTableSection } from "@/widgets/DataTableSection";
import { BookingStatus, getStatusLabel, getStatusStyle, statusMap, useGetAllBookingsQuery } from "@/entities/booking";

export const ArchiveBookingPage = () => {
  const [page, setPage] = useState(1);
  const { data: bookings, isLoading } = useGetAllBookingsQuery({ page, per_page: 10 });

  return (
    <DataTableSection
      data={bookings?.data}
      columns={{
        ID: "id",
        Клиент: {
          view: (booking) => {
            return (
              <div>
                <span>ID: {booking.client?.id || "Не указан"}</span> <br />
                <span>Имя: {booking.client?.name || "Не указан"}</span> <br />
                <span>Телефон: {booking.client?.phone || "Не указан"}</span>
              </div>
            )
          }
        },
        "Цена ₽": "price",
        Статус: {
          view: (booking) => {
            const label = getStatusLabel(booking.status);
            const style = getStatusStyle(booking.status);
            return (
              <span style={{
                padding: "2px 6px",
                borderRadius: "4px",
                fontWeight: 500,
                ...style
              }}>
                {label}
              </span>
            );
          }
        },
        Стол: {
          view: (booking) => {
            return (
              <div>
                <span>ID: {booking.table?.id || "Не указан"}</span> <br />
                <span>название: {booking.table?.name || "Не указан"}</span> <br />
                <span>ID Комнаты: {booking.table?.room_id || "Не указан"}</span>
              </div>
            )
          }
        },
        "Время начала": {
          view(data) {
            return (
              <span>
                {new Date(data.start_time).toLocaleString() || "Не указано"}
              </span>
            );
          },
        },
        "Время окончания": {
          view(data) {
            return (
              <span>
                {new Date(data.end_time).toLocaleString() || "Не указано"}
              </span>
            );
          },
        },
        "Часы": "hours",
      }}
      isLoading={isLoading}
      meta={bookings?.meta}
      onPageChange={setPage}
    />
  );
};
