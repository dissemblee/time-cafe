"use client"
import { FoodType, useCreateFoodItemMutation, useUpdateFoodItemMutation } from '@/entities/foodItem'
import { useForm } from '@/shared/hooks/useForm'
import { AdminButton } from '@/shared/ui/AdminButton'
import { Input, Textarea, Select } from "@/shared/ui/Inputs"
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface CreateFoodItemFormProps {
  editingItem?: {
    id: number
    name: string
    description?: string
    price: number
    type: FoodType
  }
  onSuccess?: () => void
}

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

export const CreateFoodItemForm = ({ editingItem, onSuccess }: CreateFoodItemFormProps) => {
  const router = useRouter()
  const [createFoodItem, { isLoading: isCreating }] = useCreateFoodItemMutation()
  const [updateFoodItem, { isLoading: isUpdating }] = useUpdateFoodItemMutation()
  const { formData, errors, handleChange, resetForm, setErrors, setFormData } = useForm(initialFormData)

  const isLoading = isCreating || isUpdating

  useEffect(() => {
    if (editingItem) {
      setFormData({
        name: editingItem.name,
        description: editingItem.description || '',
        price: editingItem.price.toString(),
        type: editingItem.type
      })
    }
  }, [editingItem, setFormData])

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
      if (editingItem) {
        await updateFoodItem({
          id: editingItem.id,
          data: {
            name: formData.name,
            description: formData.description || undefined,
            price: Number(formData.price),
            type: formData.type as FoodType
          }
        }).unwrap()
      } else {
        await createFoodItem({
          name: formData.name,
          description: formData.description || undefined,
          price: Number(formData.price),
          type: formData.type as FoodType
        }).unwrap()
      }
      
      resetForm()
      if (onSuccess) {
        onSuccess()
      } else {
        router.push("/admin/menu")
      }
    } catch (err) {
      console.error('Ошибка при сохранении продукта:', err)
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
        {isLoading 
          ? (editingItem ? 'Сохранение...' : 'Создание...') 
          : (editingItem ? 'Сохранить изменения' : 'Создать продукт')
        }
      </AdminButton>
    </form>
  )
}