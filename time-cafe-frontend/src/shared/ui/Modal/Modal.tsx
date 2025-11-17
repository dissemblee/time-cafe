"use client";
import { ReactNode, useEffect } from "react";
import styles from "./Modal.module.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

export const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.ModalOverlay} onClick={onClose}>
      <div className={styles.ModalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.ModalHeader}>
          {title && <h2 className={styles.ModalTitle}>{title}</h2>}
          <button className={styles.ModalClose} onClick={onClose}>
            ×
          </button>
        </div>
        <div className={styles.ModalBody}>
          {children}
        </div>
      </div>
    </div>
  );
};