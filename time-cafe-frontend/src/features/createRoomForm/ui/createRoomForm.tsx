"use client"
import { useCreateRoomMutation } from '@/entities/room'
import { useForm } from '@/shared/hooks/useForm'
import { Input, Select, Textarea } from '@/shared/ui/Inputs'
import { redirect } from 'next/navigation'

const smokingOptions = [
  { value: 'true', label: 'Да' },
  { value: 'false', label: 'Нет' }
]

const initialFormData = {
  name: '',
  type: '',
  smoking_allowed: '',
  description: '',
  features: '',
  min_price: ''
}

export const CreateRoomForm = () => {
  const [createRoom, { isLoading, error }] = useCreateRoomMutation()
  const { formData, errors, handleChange, resetForm, setErrors } = useForm(initialFormData)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const newErrors = {
      name: !formData.name ? 'Название комнаты обязательно' : '',
      type: !formData.type ? 'Тип комнаты обязателен' : '',
      smoking_allowed: !formData.smoking_allowed ? 'Укажите разрешено ли курение' : '',
      description: !formData.description ? 'Описание обязательно' : '',
      min_price: !formData.min_price ? 'Минимальная цена обязательна' : 
                 isNaN(Number(formData.min_price)) ? 'Цена должна быть числом' : 
                 Number(formData.min_price) < 0 ? 'Цена не может быть отрицательной' : '',
      features: ''
    }

    setErrors(newErrors)

    if (Object.values(newErrors).some(error => error !== '')) {
      return
    }

    try {
      await createRoom({
        ...formData,
        smoking_allowed: formData.smoking_allowed === 'true',
        min_price: Number(formData.min_price),
        features: formData.features.split(',').map(f => f.trim()).filter(Boolean)
      }).unwrap()
      
      resetForm()
      
      redirect("/")
    } catch (err) {
      console.error('Ошибка при создании комнаты:', err)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Название комнаты *"
        name="name"
        value={formData.name}
        error={errors.name}
        onChange={handleChange}
        disabled={isLoading}
      />

      <Input
        label="Тип комнаты *"
        name="type"
        value={formData.type}
        error={errors.type}
        onChange={handleChange}
        disabled={isLoading}
      />

      <Select
        label="Курение разрешено *"
        name="smoking_allowed"
        value={formData.smoking_allowed}
        error={errors.smoking_allowed}
        options={smokingOptions}
        onChange={handleChange}
        disabled={isLoading}
      />

      <Input
        label="Минимальная цена *"
        name="min_price"
        type="number"
        value={formData.min_price}
        error={errors.min_price}
        onChange={handleChange}
        disabled={isLoading}
      />

      <Textarea
        label="Описание *"
        name="description"
        value={formData.description}
        error={errors.description}
        onChange={handleChange}
        disabled={isLoading}
        rows={4}
      />

      <Input
        label="Особенности (через запятую)"
        name="features"
        value={formData.features}
        error={errors.features}
        onChange={handleChange}
        disabled={isLoading}
      />
  
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Создание...' : 'Создать комнату'}
      </button>
    </form>
  )
}
