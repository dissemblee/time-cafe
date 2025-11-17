"use client"
import { Modal } from '../Modal'
import { AdminButton } from '../AdminButton'
import styles from './ConfirmModal.module.scss'

interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  isLoading?: boolean
}

export const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = "Удалить",
  cancelText = "Отмена",
  isLoading = false
}: ConfirmModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className={styles.ConfirmModal}>
        <p className={styles.ConfirmModal__Message}>{message}</p>
        <div className={styles.ConfirmModal__Actions}>
          <AdminButton 
            variant="secondary" 
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Удаление...' : confirmText}
          </AdminButton>
          <AdminButton 
            variant="primary" 
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelText}
          </AdminButton>
        </div>
      </div>
    </Modal>
  )
}