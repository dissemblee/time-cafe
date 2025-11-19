"use client";
import { useState } from "react";
import { DataTableSection } from "@/widgets/DataTableSection";
import { BookingStatus, getStatusLabel, getStatusStyle, statusMap, useGetAllBookingsQuery, useCancelBookingMutation } from "@/entities/booking";

export const ArchiveBookingPage = () => {
  const [page, setPage] = useState(1);
  const { data: bookings, isLoading: isBookingsLoading, error: bookingsError } = useGetAllBookingsQuery({ page, per_page: 10 });
  const [cancelBooking, { isLoading: cancelLoading, error: cancelError }] = useCancelBookingMutation();

  const handleCancel = async (id: number) => {
    try { 
      await cancelBooking(id).unwrap();
    } catch(e) {
      console.log(e);
    } 
  };

  return (
    <>
      {bookingsError && <div>Упс... Ошибка</div>}
      
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
          Действие: {
            view(data) {
              return (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {data.status === BookingStatus.Cancelled || data.status === BookingStatus.Completed ? (
                    <>Нет действий</>
                  ) : (
                    <button 
                      onClick={() => handleCancel(data.id)}
                      disabled={cancelLoading}
                      style={{
                        padding: "6px 12px",
                        backgroundColor: "#ff6b6b",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "14px"
                      }}
                    >
                      {cancelError ? "Упс... Ошибка" : (cancelLoading ? "Отмена..." : "Отменить")}
                    </button>
                  )}
                </div>
              )
            },
          }
        }}
        isLoading={isBookingsLoading}
        meta={bookings?.meta}
        onPageChange={setPage}
      />
    </>
  );
};