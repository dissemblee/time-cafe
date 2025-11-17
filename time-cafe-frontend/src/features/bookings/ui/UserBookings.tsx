'use client';

import { useParams } from 'next/navigation';
import { GlassTable } from '@/shared/ui/GlassTable/GlassTable';
import { useGetAllBookingsQuery, useGetMyBookingsQuery } from '@/entities/booking';
import { BookingDto, getStatusLabel, getStatusStyle } from '@/entities/booking';
import styles from "./UserBookings.module.scss"
import { useState } from 'react';

export const UserBookings = () => {
  const [page, setPage] = useState(1);

  const { data: bookingsData, isLoading } = useGetMyBookingsQuery({ 
    page, 
    per_page: 10 
  });
  console.log(bookingsData?.data)
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
              const style = getStatusStyle(data.status);
              return (
                <span style={style}>
                  {getStatusLabel(data.status)}
                </span>
              );
            }
          },
        }}
        data={bookingsData?.data}
        isLoading={isLoading}
        meta={bookingsData?.meta}
        onPageChange={setPage}
      />
    </div>
  );
};