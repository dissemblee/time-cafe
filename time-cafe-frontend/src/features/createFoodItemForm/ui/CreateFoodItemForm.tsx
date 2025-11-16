"use client"
import { FoodType, useCreateFoodItemMutation } from '@/entities/foodItem'
import { useForm } from '@/shared/hooks/useForm'
import { AdminButton } from '@/shared/ui/AdminButton'
import { Input, Textarea, Select } from "@/shared/ui/Inputs"
import { useRouter } from 'next/navigation'

const initialFormData = {
  name: '',
  description: '',
  price: '',
  type: '' as FoodType | ''
}

const foodTypeOptions = [
  { value: FoodType.DRINK, label: 'Напиток' },
  { value: FoodType.SNACK, label: 'Закуска' },
  { value: FoodType.DESSERT, label: 'Десерт' },
  { value: FoodType.NO, label: 'Другое' }
]

export const CreateFoodItemForm = () => {
  const router = useRouter()
  const [createFoodItem, { isLoading, error }] = useCreateFoodItemMutation()
  const { formData, errors, handleChange, resetForm, setErrors } = useForm(initialFormData)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const newErrors = {
      name: !formData.name ? 'Название обязательно' : '',
      price: !formData.price ? 'Цена обязательна' : 
             isNaN(Number(formData.price)) ? 'Цена должна быть числом' : 
             Number(formData.price) < 0 ? 'Цена не может быть отрицательной' : '',
      type: !formData.type ? 'Тип еды обязателен' : ''
    }

    setErrors(newErrors)

    if (Object.values(newErrors).some(error => error !== '')) {
      return
    }

    try {
      await createFoodItem({
        name: formData.name,
        description: formData.description || undefined,
        price: Number(formData.price),
        type: formData.type as FoodType
      }).unwrap()
      
      resetForm()
      router.push("/admin/menu")
    } catch (err) {
      console.error('Ошибка при создании продукта:', err)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Название *"
        name="name"
        value={formData.name}
        error={errors.name}
        onChange={handleChange}
        disabled={isLoading}
      />

      <Textarea
        label="Описание"
        name="description"
        value={formData.description}
        error={errors.description}
        onChange={handleChange}
        disabled={isLoading}
        rows={3}
      />

      <Input
        label="Цена *"
        name="price"
        type="number"
        value={formData.price}
        error={errors.price}
        onChange={handleChange}
        disabled={isLoading}
        placeholder="0"
        min="0"
        step="0.01"
      />

      <Select
        label="Тип продукта *"
        name="type"
        value={formData.type}
        error={errors.type}
        options={foodTypeOptions}
        onChange={handleChange}
        disabled={isLoading}
      />
  
      <AdminButton type="submit" disabled={isLoading}>
        {isLoading ? 'Создание...' : 'Создать продукт'}
      </AdminButton>
    </form>
  )
}
