"use client"

import { BookingStatus, useCreateBookingMutation } from "@/entities/booking"
import { useForm } from "@/shared/hooks/useForm"
import { LiquidButton } from "@/shared/ui/LiquidButton"
import { useGetMeQuery } from "@/entities/me"
import styles from "./CreateBookingForm.module.scss"
import { useRouter } from "next/navigation"
import { useState, useEffect, useRef } from "react"

const initialFormData = {
  start_time: "",
  end_time: ""
}

export const CreateBookingForm = ({ tableId }: { tableId: number }) => {
  const router = useRouter()
  const { data: me } = useGetMeQuery()
  const clientId = me?.client?.id ?? null

  const [createBooking, { isLoading }] = useCreateBookingMutation()
  const { formData, errors, handleChange, setErrors, resetForm } = useForm(initialFormData)
  
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedStartTime, setSelectedStartTime] = useState<string>("")
  const [selectedEndTime, setSelectedEndTime] = useState<string>("")
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showTimePicker, setShowTimePicker] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const datePickerRef = useRef<HTMLDivElement>(null)
  const timePickerRef = useRef<HTMLDivElement>(null)


  const generateDays = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()
    
    const days = []
    

    const startOffset = startingDay === 0 ? 6 : startingDay - 1
    for (let i = 0; i < startOffset; i++) {
      days.push(null)
    }
    

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }
    
    return days
  }


  const generateTimeSlots = () => {
    if (!selectedDate) return []
    
    const dayOfWeek = selectedDate.getDay()
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 5 || dayOfWeek === 6
    
    const slots = []
    
    if (isWeekend) {

      for (let hour = 10; hour <= 26; hour++) {
        for (let minute of [0, 30]) {
          const effectiveHour = hour % 24
          if (hour === 26 && minute === 30) continue
          const time = `${effectiveHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
          slots.push(time)
        }
      }
    } else {

      for (let hour = 10; hour <= 23; hour++) {
        for (let minute of [0, 30]) {
          if (hour === 23 && minute === 30) continue
          const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
          slots.push(time)
        }
      }
    }
    
    return slots
  }


  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }


  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
      weekday: 'short'
    })
  }


  const getTimeOfDayIcon = (hours: number) => {
    if (hours < 6) return { icon: "🌙", label: "Ночь" }
    if (hours < 12) return { icon: "☀️", label: "Утро" }
    if (hours < 18) return { icon: "🏙️", label: "День" }
    return { icon: "🌆", label: "Вечер" }
  }


  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setSelectedStartTime("")
    setSelectedEndTime("")
    setShowTimePicker(true)
    setShowDatePicker(false)
  }

  const handleTimeSelect = (time: string) => {
    if (!selectedDate) return
    
    const [hours, minutes] = time.split(':').map(Number)
    const startDate = new Date(selectedDate)
    startDate.setHours(hours, minutes, 0, 0)
    
    const endDate = new Date(startDate)
    endDate.setHours(startDate.getHours() + 2)
    
    const dayOfWeek = selectedDate.getDay()
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 5 || dayOfWeek === 6
    const maxHour = isWeekend ? 26 : 23
    
    if (endDate.getHours() + (endDate.getMinutes() > 0 ? 1 : 0) > maxHour) {
      alert(`Внимание: Бронирование заканчивается после закрытия заведения. Максимальное время: ${isWeekend ? '02:00' : '23:00'}`)
      return
    }
    
    setSelectedStartTime(time)
    setSelectedEndTime(`${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`)
    
    handleChange({
      target: {
        name: "start_time",
        value: startDate.toISOString()
      }
    } as React.ChangeEvent<HTMLInputElement>)
    
    handleChange({
      target: {
        name: "end_time",
        value: endDate.toISOString()
      }
    } as React.ChangeEvent<HTMLInputElement>)
    
    setShowTimePicker(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setShowDatePicker(false)
      }
      if (timePickerRef.current && !timePickerRef.current.contains(event.target as Node)) {
        setShowTimePicker(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
  const months = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!clientId || !tableId || !selectedDate || !selectedStartTime || !selectedEndTime) return

    try {
      const [startHours, startMinutes] = selectedStartTime.split(':').map(Number)
      const [endHours, endMinutes] = selectedEndTime.split(':').map(Number)
      
      const startDate = new Date(selectedDate)
      startDate.setHours(startHours, startMinutes, 0, 0)
      
      const endDate = new Date(selectedDate)
      endDate.setHours(endHours, endMinutes, 0, 0)

      const booking = await createBooking({
        client_id: clientId,
        table_id: tableId,
        start_time: startDate.toISOString(),
        end_time: endDate.toISOString(),
        status: BookingStatus.Active
      }).unwrap()

      resetForm()
      setSelectedDate(null)
      setSelectedStartTime("")
      setSelectedEndTime("")
      router.push("/transaction/" + booking.id)
    } catch (err: any) {
      console.error("Ошибка при создании бронирования:", err)
      if (err?.data) console.error("Детали ошибки от сервера:", err.data)
    }
  }

  const timeSlots = generateTimeSlots()
  const days = generateDays()
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return (
    <form onSubmit={handleSubmit} className={styles.CreateBookingForm}>
      <h1 className={styles.CreateBookingForm__Title}>Бронирование стола</h1>

      {/* Overlay для блокировки фона */}
      {(showDatePicker || showTimePicker) && (
        <div 
          className={styles.PickerOverlay}
          onClick={() => {
            setShowDatePicker(false)
            setShowTimePicker(false)
          }}
        />
      )}

      {/* Дата и время */}
      <div className={styles.DateTimeSection}>
        <div className={styles.DateTimeDisplay}>
          <div className={styles.DateDisplay}>
            <div className={styles.DateLabel}>Дата</div>
            <button
              type="button"
              className={styles.DateButton}
              onClick={() => {
                setShowDatePicker(!showDatePicker)
                setShowTimePicker(false)
              }}
            >
              {selectedDate ? formatDate(selectedDate) : "Выберите дату"}
              <span className={styles.DateIcon}>📅</span>
            </button>
          </div>
          
          <div className={styles.TimeDisplay}>
            <div className={styles.TimeLabel}>Время</div>
            <button
              type="button"
              className={styles.TimeButton}
              onClick={() => {
                if (!selectedDate) {
                  setShowDatePicker(true)
                } else {
                  setShowTimePicker(!showTimePicker)
                  setShowDatePicker(false)
                }
              }}
              disabled={!selectedDate}
            >
              {selectedStartTime ? `${selectedStartTime} - ${selectedEndTime}` : "Выберите время"}
              <span className={styles.TimeIcon}>🕐</span>
            </button>
          </div>
        </div>

        {/* календарь */}
        {showDatePicker && (
          <div className={styles.FloatingPicker} ref={datePickerRef}>
            <div className={styles.CalendarHeader}>
              <button 
                type="button" 
                className={styles.NavButton}
                onClick={prevMonth}
              >
                ‹
              </button>
              <div className={styles.MonthYear}>
                {months[currentMonth.getMonth()].slice(0, 3)} {currentMonth.getFullYear()}
              </div>
              <button 
                type="button" 
                className={styles.NavButton}
                onClick={nextMonth}
              >
                ›
              </button>
            </div>
            
            <div className={styles.WeekDays}>
              {weekDays.map(day => (
                <div key={day} className={styles.WeekDay}>{day}</div>
              ))}
            </div>
            
            <div className={styles.CalendarGrid}>
              {days.map((day, index) => {
                if (!day) {
                  return <div key={`empty-${index}`} className={styles.EmptyDay} />
                }
                
                const isToday = day.toDateString() === today.toDateString()
                const isSelected = selectedDate && day.toDateString() === selectedDate.toDateString()
                const isPast = day < today
                
                return (
                  <button
                    key={day.toISOString()}
                    type="button"
                    className={`${styles.Day} ${isToday ? styles.Today : ''} ${isSelected ? styles.Selected : ''} ${isPast ? styles.Past : ''}`}
                    onClick={() => !isPast && handleDateSelect(day)}
                    disabled={isPast}
                  >
                    <div className={styles.DayNumber}>{day.getDate()}</div>
                  </button>
                )
              })}
            </div>
            
            <div className={styles.CalendarFooter}>
              <button 
                type="button" 
                className={styles.TodayButton}
                onClick={() => handleDateSelect(today)}
              >
                Сегодня
              </button>
            </div>
          </div>
        )}

        {/* таймпикер */}
        {showTimePicker && (
          <div className={styles.FloatingPicker} ref={timePickerRef}>
            <div className={styles.TimePickerHeader}>
              <div className={styles.TimePickerTitle}>
                {selectedDate ? formatDate(selectedDate) : "Выберите время"}
              </div>
              <div className={styles.WorkHours}>
                {selectedDate && (selectedDate.getDay() === 0 || selectedDate.getDay() === 5 || selectedDate.getDay() === 6) 
                  ? "Пт-Вс: 10:00 - 02:00" 
                  : "Пн-Чт: 10:00 - 23:00"}
              </div>
            </div>
            
            <div className={styles.TimeGrid}>
              {timeSlots.map(time => {
                const [hours] = time.split(':').map(Number)
                const { icon, label } = getTimeOfDayIcon(hours)
                
                return (
                  <button
                    key={time}
                    type="button"
                    className={`${styles.TimeSlot} ${selectedStartTime === time ? styles.SelectedTime : ''}`}
                    onClick={() => handleTimeSelect(time)}
                  >
                    <div className={styles.TimeValue}>
                      <span className={styles.TimeIcon}>{icon}</span>
                      <span>{time}</span>
                      <span className={styles.TimePeriod}>
                        {label}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
            
            <div className={styles.TimePickerFooter}>
              <div className={styles.DurationInfo}>
                Длительность: 2 часа
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={styles.Hints}>
        <div className={styles.Hint}>
          <div className={styles.HintIcon}>💡</div>
          <div className={styles.HintText}>
            При выборе времени окончание автоматически устанавливается на 2 часа позже
          </div>
        </div>
      </div>

      <LiquidButton 
        type="submit" 
        disabled={isLoading || !selectedDate || !selectedStartTime}
        className={styles.SubmitButton}
      >
        {isLoading ? "Создание..." : "Забронировать стол"}
      </LiquidButton>
    </form>
  )
}