import { useState } from 'react'

export const useForm = <T extends Record<string, any>>(initialState: T) => {
  const [formData, setFormData] = useState<T>(initialState)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const key = name as keyof T
    
    setFormData(prev => ({
      ...prev,
      [key]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
    
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: '' }))
    }
  }

  const resetForm = () => {
    setFormData(initialState)
    setErrors({})
  }

  const setFieldValue = (name: keyof T, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const setFieldError = (name: keyof T, error: string) => {
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  return {
    formData,
    errors,
    handleChange,
    resetForm,
    setFieldValue,
    setFieldError,
    setFormData,
    setErrors
  }
}
