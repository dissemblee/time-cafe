"use client"
import { Modal } from '@/shared/ui/Modal'
import { CreateRoomForm } from '@/features/createRoomForm'
import { RoomDto } from '@/entities/room'

interface EditRoomModalProps {
  isOpen: boolean
  onClose: () => void
  editingItem: RoomDto | null
}

export const EditRoomModal = ({ isOpen, onClose, editingItem }: EditRoomModalProps) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      title="Редактировать комнату"
    >
      {editingItem && (
        <CreateRoomForm 
          editingItem={editingItem}
          onSuccess={onClose}
        />
      )}
    </Modal>
  )
}