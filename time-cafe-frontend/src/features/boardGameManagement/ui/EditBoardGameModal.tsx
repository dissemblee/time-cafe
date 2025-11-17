"use client"
import { Modal } from '@/shared/ui/Modal'
import { CreateBoardGameForm } from '../../createboardGameForm'
import { BoardGameDto } from '@/entities/boardGame'

interface EditBoardGameModalProps {
  isOpen: boolean
  onClose: () => void
  editingItem: BoardGameDto | null
}

export const EditBoardGameModal = ({ isOpen, onClose, editingItem }: EditBoardGameModalProps) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      title="Редактировать игру"
    >
      {editingItem && (
        <CreateBoardGameForm 
          editingItem={editingItem}
          onSuccess={onClose}
        />
      )}
    </Modal>
  )
}