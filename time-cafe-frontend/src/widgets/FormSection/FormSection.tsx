"use client"
import { AdminButton } from "@/shared/ui/AdminButton";
import { redirect, useRouter } from "next/navigation";
import styles from "./FormSection.module.scss"

interface FormSectionProps {
  form?: React.ReactNode;
  title: string;
}

export const FormSection = ({ form, title }: FormSectionProps) => {
  const router = useRouter();

  return (
    <section className={styles.FormSection}>
      <div className={styles.FormSection__Header}>
        <AdminButton onClick={() => router.back()} variant="secondary">Назад</AdminButton>
        <h2>{title}</h2>
      </div> 
      {form}
    </section>
  );
}
