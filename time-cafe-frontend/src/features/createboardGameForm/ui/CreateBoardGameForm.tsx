"use client"
import { useCreateBoardGameMutation, useUpdateBoardGameMutation } from '@/entities/boardGame'
import { useForm } from '@/shared/hooks/useForm'
import { AdminButton } from '@/shared/ui/AdminButton'
import { Input, Textarea } from "@/shared/ui/Inputs"
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface CreateBoardGameFormProps {
  editingItem?: {
    id: number
    name: string
    description: string
    quantity: number
  }
  onSuccess?: () => void
}

const initialFormData = {
  name: '',
  description: '',
  quantity: ''
}

export const CreateBoardGameForm = ({ editingItem, onSuccess }: CreateBoardGameFormProps) => {
  const router = useRouter()
  const [createBoardGame, { isLoading: isCreating }] = useCreateBoardGameMutation()
  const [updateBoardGame, { isLoading: isUpdating }] = useUpdateBoardGameMutation()
  const { formData, errors, handleChange, resetForm, setErrors, setFormData } = useForm(initialFormData)

  const isLoading = isCreating || isUpdating

  useEffect(() => {
    if (editingItem) {
      setFormData({
        name: editingItem.name,
        description: editingItem.description,
        quantity: editingItem.quantity.toString()
      })
    }
  }, [editingItem, setFormData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const newErrors = {
      name: !formData.name ? 'Название игры обязательно' : '',
      description: !formData.description ? 'Описание обязательно' : '',
      quantity: !formData.quantity ? 'Количество обязательно' : 
               isNaN(Number(formData.quantity)) ? 'Количество должно быть числом' : 
               Number(formData.quantity) < 0 ? 'Количество не может быть отрицательным' : 
               !Number.isInteger(Number(formData.quantity)) ? 'Количество должно быть целым числом' : ''
    }

    setErrors(newErrors)

    if (Object.values(newErrors).some(error => error !== '')) {
      return
    }

    try {
      if (editingItem) {
        await updateBoardGame({
          id: editingItem.id,
          data: {
            name: formData.name,
            description: formData.description,
            quantity: Number(formData.quantity)
          }
        }).unwrap()
      } else {
        await createBoardGame({
          name: formData.name,
          description: formData.description,
          quantity: Number(formData.quantity)
        }).unwrap()
      }
      
      resetForm()
      if (onSuccess) {
        onSuccess()
      } else {
        router.push("/admin/game")
      }
    } catch (err) {
      console.error('Ошибка при сохранении игры:', err)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Название игры *"
        name="name"
        value={formData.name}
        error={errors.name}
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
        label="Количество *"
        name="quantity"
        type="number"
        value={formData.quantity}
        error={errors.quantity}
        onChange={handleChange}
        disabled={isLoading}
        placeholder="0"
        min="0"
        step="1"
      />
  
      <AdminButton type="submit" disabled={isLoading} style={{width: '100%'}}>
        {isLoading 
          ? (editingItem ? 'Сохранение...' : 'Создание...') 
          : (editingItem ? 'Сохранить изменения' : 'Создать игру')
        }
      </AdminButton>
    </form>
  )
}