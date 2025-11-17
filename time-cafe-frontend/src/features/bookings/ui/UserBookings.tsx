'use client';

import { useParams } from 'next/navigation';
import { GlassTable } from '@/shared/ui/GlassTable/GlassTable';
import { useGetAllBookingsQuery } from '@/entities/booking';
import { BookingDto, getStatusLabel, getStatusStyle } from '@/entities/booking';

export const UserBookings = () => {
  const params = useParams();
  const idParam = params?.id;
  const id = Array.isArray(idParam) ? idParam[0] : idParam;
  const clientId = Number(id);

  const { data: bookingsData, isLoading } = useGetAllBookingsQuery({ 
    page: 1, 
    per_page: 10 
  });

  // Фильтруем бронирования по client_id
  const userBookings = bookingsData?.data?.filter(
    (booking: BookingDto) => booking.client_id === clientId
  ) || [];

  console.log('All bookings:', bookingsData);
  console.log('Filtered bookings:', userBookings);

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

  const columns = {
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
  };

  const handlePageChange = (page: number) => {
    console.log('Page changed to:', page);
  };

    return (
    <div style={{ marginTop: '2rem' }}>
        <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        padding: '2rem',
        margin: '0 -1rem', 
        boxShadow: '0 0 30px rgba(100, 200, 255, 0.2)' 
        }}>
        <h2 style={{ 
            fontSize: '1.5rem', 
            marginBottom: '1rem',
            background: 'linear-gradient(45deg, #64C8FF, #B464FF)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent'
        }}>
            Мои бронирования
        </h2>
        <GlassTable 
            columns={columns} 
            data={userBookings}
            isLoading={isLoading}
            meta={bookingsData?.meta}
            onPageChange={handlePageChange}
        />
        </div>
    </div>
    );
};