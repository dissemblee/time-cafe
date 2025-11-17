"use client"
import { Modal } from '@/shared/ui/Modal'
import { CreateFoodItemForm } from '../../createFoodItemForm'
import { FoodItemDto } from '@/entities/foodItem'

interface EditFoodItemModalProps {
  isOpen: boolean
  onClose: () => void
  editingItem: FoodItemDto | null
}

export const EditFoodItemModal = ({ isOpen, onClose, editingItem }: EditFoodItemModalProps) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      title="Редактировать блюдо"
    >
      {editingItem && (
        <CreateFoodItemForm 
          editingItem={editingItem}
          onSuccess={onClose}
        />
      )}
    </Modal>
  )
}