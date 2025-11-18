'use client';
import { GlassTable } from '@/shared/ui/GlassTable/GlassTable';
import { BookingStatus, useCancelBookingMutation, useGetMyBookingsQuery } from '@/entities/booking';
import { BookingDto, getStatusLabel, getStatusStyle } from '@/entities/booking';
import styles from "./UserBookings.module.scss"
import { useState } from 'react';
import { LiquidButton } from '@/shared/ui/LiquidButton';

export const UserBookings = () => {
  const [page, setPage] = useState(1);

  const { data: bookingsData, isLoading } = useGetMyBookingsQuery({ 
    page, 
    per_page: 10 
  });

  const [ cancelBooking, { isLoading: cancelLoading }] = useCancelBookingMutation()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU');
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getDuration = (start: string, end: string) => {
    const startTime = new Date(start);
    const endTime = new Date(end);
    const hours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
    return `${hours} часа`;
  };

  const handleCancel = async (id: number) => {
    try { 
      await cancelBooking(id)
    } catch(e) {
      console.log(e)
    } 
  }

  return (
    <div className={styles.UserBookings}>
      <h2 className={styles.UserBookings__Title}>
        Мои бронирования
      </h2>
      <GlassTable 
        columns={{
          'Дата': { view: (data: BookingDto) => formatDate(data.start_time) },
          'Время': { view: (data: BookingDto) => `${formatTime(data.start_time)} - ${formatTime(data.end_time)}` },
          'Стол': { view: (data: BookingDto) => data.table?.name || `Стол ${data.table_id}` },
          'Длительность': { view: (data: BookingDto) => getDuration(data.start_time, data.end_time) },
          'Сумма': { view: (data: BookingDto) => `${data.price} ₽` },
          'Статус': { 
            view: (data: BookingDto) => {
              const label = getStatusLabel(data.status);
              const style = getStatusStyle(data.status);
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
          Действие: {
            view(data) {
              return (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {data.status === BookingStatus.Cancelled || data.status === BookingStatus.Completed ? (
                    <>Нет действий</>
                  ) : (
                    <LiquidButton 
                      onClick={() => handleCancel(data.id)}
                      disabled={cancelLoading}
                    >
                      {cancelLoading ? "Отмена" : "Отменить"}
                    </LiquidButton>
                  )}
                </div>
              )
            },
          }
        }}
        data={bookingsData?.data}
        isLoading={isLoading}
        meta={bookingsData?.meta}
        onPageChange={setPage}

      />
    </div>
  );
};
