"use client"
import { useCreateBoardGameMutation } from '@/entities/boardGame'
import { useForm } from '@/shared/hooks/useForm'
import { AdminButton } from '@/shared/ui/AdminButton'
import { Input, Textarea } from "@/shared/ui/Inputs"
import { useRouter } from 'next/navigation'

const initialFormData = {
  name: '',
  description: '',
  quantity: ''
}

export const CreateBoardGameForm = () => {
  const router = useRouter()
  const [createBoardGame, { isLoading, error }] = useCreateBoardGameMutation()
  const { formData, errors, handleChange, resetForm, setErrors } = useForm(initialFormData)

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
      await createBoardGame({
        name: formData.name,
        description: formData.description,
        quantity: Number(formData.quantity)
      }).unwrap()
      
      resetForm()
      router.push("/admin/game")
    } catch (err) {
      console.error('Ошибка при создании игры:', err)
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
        {isLoading ? 'Создание...' : 'Создать игру'}
      </AdminButton>
    </form>
  )
}
