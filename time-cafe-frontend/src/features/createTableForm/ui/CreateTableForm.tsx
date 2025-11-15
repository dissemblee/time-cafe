"use client"
import { useCreateTableMutation } from '@/entities/table'
import { useForm } from '@/shared/hooks/useForm'
import { Input, Select } from "@/shared/ui/Inputs"
import { TableStatus } from '@/entities/table'
import { redirect } from 'next/navigation'
import { Checkbox } from '@/shared/ui/Inputs/Inputs'

const initialFormData = {
  room_id: '',
  name: '',
  seats: '',
  sofas: '',
  has_console: false,
  has_tv: false
}

export const CreateTableForm = () => {
  const [createTable, { isLoading, error }] = useCreateTableMutation()
  const { formData, errors, handleChange, resetForm, setErrors } = useForm(initialFormData)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const newErrors = {
      room_id: !formData.room_id ? 'ID комнаты обязательно' : 
              isNaN(Number(formData.room_id)) ? 'ID комнаты должен быть числом' : 
              Number(formData.room_id) <= 0 ? 'ID комнаты должен быть положительным числом' : '',
      name: !formData.name ? 'Название стола обязательно' : '',
      seats: !formData.seats ? 'Количество мест обязательно' : 
             isNaN(Number(formData.seats)) ? 'Количество мест должно быть числом' : 
             Number(formData.seats) < 0 ? 'Количество мест не может быть отрицательным' : 
             !Number.isInteger(Number(formData.seats)) ? 'Количество мест должно быть целым числом' : '',
      sofas: !formData.sofas ? 'Количество диванов обязательно' : 
             isNaN(Number(formData.sofas)) ? 'Количество диванов должно быть числом' : 
             Number(formData.sofas) < 0 ? 'Количество диванов не может быть отрицательным' : 
             !Number.isInteger(Number(formData.sofas)) ? 'Количество диванов должно быть целым числом' : ''
    }

    setErrors(newErrors)

    if (Object.values(newErrors).some(error => error !== '')) {
      return
    }

    try {
      await createTable({
        room_id: Number(formData.room_id),
        name: formData.name,
        seats: Number(formData.seats),
        sofas: Number(formData.sofas),
        has_console: formData.has_console,
        has_tv: formData.has_tv,
        status: TableStatus.FREE
      }).unwrap()
      
      resetForm()
      redirect("/")
    } catch (err) {
      console.error('Ошибка при создании стола:', err)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="ID комнаты *"
        name="room_id"
        type="number"
        value={formData.room_id}
        error={errors.room_id}
        onChange={handleChange}
        disabled={isLoading}
        placeholder="1"
        min="1"
        step="1"
      />

      <Input
        label="Название стола *"
        name="name"
        value={formData.name}
        error={errors.name}
        onChange={handleChange}
        disabled={isLoading}
        placeholder="Например: Стол у окна, Угловой стол"
      />

      <Input
        label="Количество мест *"
        name="seats"
        type="number"
        value={formData.seats}
        error={errors.seats}
        onChange={handleChange}
        disabled={isLoading}
        placeholder="4"
        min="0"
        step="1"
      />

      <Input
        label="Количество диванов *"
        name="sofas"
        type="number"
        value={formData.sofas}
        error={errors.sofas}
        onChange={handleChange}
        disabled={isLoading}
        placeholder="2"
        min="0"
        step="1"
      />

      <Checkbox
        label="Есть телевизор"
        name="has_tv"
        checked={formData.has_tv}
        onChange={handleChange}
        disabled={isLoading}
      />

      <Checkbox
        label="Есть игровая консоль"
        name="has_console"
        checked={formData.has_console}
        onChange={handleChange}
        disabled={isLoading}
      />

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Создание...' : 'Создать стол'}
      </button>
    </form>
  )
}
